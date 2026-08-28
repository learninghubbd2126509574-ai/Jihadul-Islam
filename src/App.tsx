import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Job, UserProfile, TaskLog, ShopItem } from './types';
import { INITIAL_JOBS, INITIAL_PROFILE, SHOP_ITEMS, DEFAULT_TASK_LOGS } from './data/jobs';
import { getLocalMicroTasks } from './data/microJobs';
import BottomNav from './components/BottomNav';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import ProfileTab from './components/ProfileTab';
import RankingTab from './components/RankingTab';
import ShopTab from './components/ShopTab';
import MicroTab from './components/MicroTab';
import QuizTab from './components/QuizTab';
import DailyWorkTab from './components/DailyWorkTab';
import GiftOfferWidget from './components/GiftOfferWidget';
import SupportModal from './components/SupportModal';
import NotificationModal from './components/NotificationModal';
import TopNotificationToast from './components/TopNotificationToast';
import LoginPortal from './components/LoginPortal';

const toBnNum = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

export default function App() {
  // Global States
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [shopItems, setShopItems] = useState<ShopItem[]>(SHOP_ITEMS);
  const [taskLogs, setTaskLogs] = useState<TaskLog[]>(DEFAULT_TASK_LOGS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showWarningBanner, setShowWarningBanner] = useState(true);

  // Auth / Portal States
  const [isPortalLoggedIn, setIsPortalLoggedIn] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPass, setAuthPass] = useState('');

  // Scroll Header state
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Support Tab Modal State
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  // Scroll visibility effect
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load state from localStorage on init
  useEffect(() => {
    const savedProfile = localStorage.getItem('ue_profile');
    const savedLogs = localStorage.getItem('ue_logs');
    const savedShop = localStorage.getItem('ue_shop');
    const savedAuth = localStorage.getItem('ue_is_logged_in');

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      if (!parsed.fullName || parsed.fullName !== 'Habiba Akter' || !parsed.balance || parsed.totalIncome !== 66400 || parsed.tasksCompleted < 600 || !parsed.points || parsed.level === 'Silver Rank') {
        setProfile(INITIAL_PROFILE);
        localStorage.setItem('ue_profile', JSON.stringify(INITIAL_PROFILE));
      } else {
        setProfile(parsed);
      }
    } else {
      setProfile(INITIAL_PROFILE);
      localStorage.setItem('ue_profile', JSON.stringify(INITIAL_PROFILE));
    }

    // Per user request: Task logs are fixed to the default 40 items. Never load dynamic/old logs.
    setTaskLogs(DEFAULT_TASK_LOGS);
    localStorage.setItem('ue_logs', JSON.stringify(DEFAULT_TASK_LOGS));

    if (savedShop) {
      setShopItems(JSON.parse(savedShop));
    } else {
      localStorage.setItem('ue_shop', JSON.stringify(SHOP_ITEMS));
    }
    
    if (savedAuth) setIsLoggedIn(JSON.parse(savedAuth));
  }, []);

  // Persistence for shop items
  useEffect(() => {
    if (shopItems !== SHOP_ITEMS) {
      localStorage.setItem('ue_shop', JSON.stringify(shopItems));
    }
  }, [shopItems]);

  // Sync helpers
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    const next = { ...profile, ...updated };
    
    // Per user request: Points are strictly fixed at 3250 and cannot be changed
    next.points = 3250;

    if (updated.balance !== undefined && updated.totalIncome === undefined) {
      const diff = updated.balance - profile.balance;
      if (diff > 0) {
        next.totalIncome = (profile.totalIncome ?? profile.balance) + diff;
      }
    }
    setProfile(next);
    localStorage.setItem('ue_profile', JSON.stringify(next));
  };

  const handleAddLog = (newLog: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => {
    // Per user request: Task logs are fixed and should not be updated.
    return;
  };

  const handleMockRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName || !authEmail || !authPhone) return;

    const newProfile: UserProfile = {
      uid: `UE-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
      fullName: authName,
      email: authEmail,
      phone: authPhone,
      bio: lang === 'bn' ? 'নতুন জয়েন করা গর্বিত ফ্রিল্যান্সার।' : 'Newly registered proud freelancer.',
      address: lang === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      balance: 10.00, // starting gift!
      totalIncome: 10.00,
      tasksCompleted: 0,
      level: 'Bronze Member',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setProfile(newProfile);
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setShowWarningBanner(false);

    localStorage.setItem('ue_profile', JSON.stringify(newProfile));
    localStorage.setItem('ue_is_logged_in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowWarningBanner(true);
    localStorage.setItem('ue_is_logged_in', 'false');
  };

  const handleMockLogin = () => {
    setIsLoggedIn(true);
    setShowWarningBanner(false);
    localStorage.setItem('ue_is_logged_in', 'true');
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSubmitted(true);
    setSupportMessage('');
    setTimeout(() => {
      setSupportSubmitted(false);
      setShowSupportModal(false);
    }, 2500);
  };

  if (!isPortalLoggedIn) {
    return (
      <LoginPortal
        lang={lang}
        onLoginSuccess={() => setIsPortalLoggedIn(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased pb-24">
      {/* Top Banner Notification on Site Load/Refresh (Only after Portal Login) */}
      <TopNotificationToast lang={lang} />

      {/* --- CORE NAVIGATION HEADER (from screenshots) --- */}
      <header 
        className={`bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-30 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border-b border-slate-800/80 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-500 flex items-center justify-center font-black text-white text-lg shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(37,99,235,0.3)] border border-blue-400/40">
              U
            </div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-tight text-white leading-tight">
                Unity Earning
              </h1>
              <span className="text-[9px] text-blue-400 uppercase tracking-widest font-extrabold">E-learning Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="bg-slate-800/90 hover:bg-slate-700 text-[10px] uppercase font-bold px-2.5 py-1.5 rounded-xl border border-slate-700/80 tracking-wider flex items-center gap-1 transition-all text-blue-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1)] active:scale-95"
              title="Toggle Language"
            >
              <Icons.Globe className="w-3.5 h-3.5 text-blue-400" />
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>

            {/* Ranking Button - Golden/Amber Theme */}
            <button
              onClick={() => setCurrentTab('ranking')}
              className="flex flex-col items-center justify-center p-1.5 px-2 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 transition-all active:scale-95 shadow-2xs"
              id="ranking-header-btn"
            >
              <Icons.Trophy className="w-4 h-4 text-amber-400 drop-shadow-[0_2px_6px_rgba(251,191,36,0.6)]" />
              <span className="text-[9px] font-extrabold mt-0.5">{lang === 'bn' ? 'র‍্যাঙ্কিং' : 'Ranking'}</span>
            </button>

            {/* Support Button - Emerald/Green Theme */}
            <button
              onClick={() => setShowSupportModal(true)}
              className="flex flex-col items-center justify-center p-1.5 px-2 rounded-xl bg-emerald-400/15 hover:bg-emerald-400/25 border border-emerald-400/40 text-emerald-300 transition-all active:scale-95 shadow-2xs"
              id="support-header-btn"
            >
              <Icons.Headphones className="w-4 h-4 text-emerald-400 drop-shadow-[0_2px_6px_rgba(52,211,153,0.6)]" />
              <span className="text-[9px] font-extrabold mt-0.5">{lang === 'bn' ? 'সাপোর্ট' : 'Support'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- APP CONTAINER WITH MAX-WIDTH PRESET FOR FAITHFUL PHONE LAYOUT --- */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pt-5 pb-24">
        {/* TAB RENDERING */}

        {/* 1. HOME TAB */}
        {currentTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Welcome block - Beautiful Eye-Pleasing Color Gradient & Design */}
            <div className="rounded-2xl p-5 md:p-6 bg-[linear-gradient(110deg,#3b82f6,45%,#6366f1,55%,#3b82f6)] bg-[length:250%_auto] text-white relative overflow-hidden shadow-[0_6px_20px_rgba(59,130,246,0.3)] border border-blue-400/40 animate-[bg-shimmer_3s_linear_infinite] transition-all">
              {/* Soft decorative background circles */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none mix-blend-overlay animate-pulse" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-cyan-300/30 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none mix-blend-overlay animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/30 shrink-0 shadow-inner">
                    <Icons.Briefcase className="w-4.5 h-4.5 text-amber-300" />
                  </div>
                  <h2 className="text-lg md:text-xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                    Unity Earning {lang === 'bn' ? 'কমিশন কাজ' : 'Commission Jobs'}
                  </h2>
                </div>
                <p className="text-blue-100/90 text-xs md:text-sm font-medium leading-relaxed pl-0.5">
                  {lang === 'bn'
                    ? 'কাজের তালিকা থেকে প্রজেক্ট সম্পন্ন করে সাথে সাথে নির্ধারিত কমিশন লাভ করুন।'
                    : 'Complete simple projects from the list below and earn verified cash commissions.'}
                </p>
              </div>
            </div>

            {/* Rank and Points Card - Simple, Clean & Aesthetic Gold Design */}
            <div className="clay-card bg-white p-4 md:p-4.5 rounded-2xl border border-amber-200/80 flex items-center justify-between shadow-[0_2px_12px_rgba(245,158,11,0.06)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0 shadow-xs">
                  <Icons.Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">{lang === 'bn' ? 'র‍্যাংক' : 'Member Level'}</span>
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <span className="text-sm font-black text-amber-700 tracking-tight">
                      {profile.level === 'Gold Rank' ? (lang === 'bn' ? 'গোল্ড র‍্যাংক' : 'Gold Rank') : profile.level}
                    </span>
                    <span className="bg-amber-100/80 text-amber-900 text-[11px] px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1 border border-amber-300/70">
                      <Icons.Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      {lang === 'bn' ? `${toBnNum((profile.points || 5320).toLocaleString('en-US'))} পয়েন্ট` : `${(profile.points || 5320).toLocaleString('en-US')} Pts`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs flex items-center gap-1.5 font-bold shrink-0">
                <Icons.Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'সক্রিয়' : 'Active'}</span>
              </div>
            </div>

            {/* List of Jobs Header */}
            <div className="flex flex-col gap-1 px-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#0f172a] text-base md:text-lg flex items-center gap-1.5">
                  <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
                  {lang === 'bn' ? 'টুডে ওয়ার্ক (আজকের কাজ):' : "Today's Work (Active Jobs):"}
                </h3>
                <span className="text-slate-400 text-xs font-bold font-mono bg-slate-100 px-2.5 py-1 rounded-full">
                  {lang === 'bn' ? '৩৬৫ টি উপলব্ধ' : '365 Active'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold italic">
                {lang === 'bn' ? '* প্রতিদিন সকাল ৯টায় নতুন কাজ যুক্ত হয়।' : '* New tasks are added daily at 9:00 AM.'}
              </p>
            </div>

            {/* Job Cards Array */}
            <div className="space-y-4">
              {INITIAL_JOBS.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => {
                    setSelectedJob(job);
                  }}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. MY WORK TAB */}
        {currentTab === 'work' && (
          <div className="space-y-5 animate-fade-in">

            {/* Top Featured Work Cards (Requested: ফর্ম ফিলআপ ২৫০, ইমেইল সেল ৪০, মাইক্রো জব ৫৫) */}
            <div className="clay-card bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 md:p-5 border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <h2 className="text-base md:text-lg font-black text-amber-400 flex items-center gap-2">
                  <Icons.Briefcase className="w-5 h-5 text-amber-400" />
                  {lang === 'bn' ? 'আজকের কাজ ও রেট' : "Today's Featured Work"}
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  {lang === 'bn' ? 'সক্রিয় কাজ' : 'Active'}
                </span>
              </div>

              {/* 3 Main Work Rate Cards */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {/* Form Fillup 250 Taka */}
                <div className="bg-slate-800/90 hover:bg-slate-800 p-2.5 rounded-2xl border border-emerald-400/40 flex flex-col items-center justify-between transition-all">
                  <span className="text-[10px] font-bold text-slate-300">
                    {lang === 'bn' ? 'ফর্ম ফিলআপ' : 'Form Fillup'}
                  </span>
                  <span className="text-base md:text-lg font-black text-emerald-400 font-mono mt-1">
                    ৳২৫০
                  </span>
                </div>

                {/* Email Sale 40 Taka */}
                <div className="bg-slate-800/90 hover:bg-slate-800 p-2.5 rounded-2xl border border-blue-400/40 flex flex-col items-center justify-between transition-all">
                  <span className="text-[10px] font-bold text-slate-300">
                    {lang === 'bn' ? 'ই-মেইল সেল' : 'Email Sale'}
                  </span>
                  <span className="text-base md:text-lg font-black text-blue-400 font-mono mt-1">
                    ৳৪০
                  </span>
                </div>

                {/* Micro Job 55 Taka */}
                <div className="bg-slate-800/90 hover:bg-slate-800 p-2.5 rounded-2xl border border-amber-400/40 flex flex-col items-center justify-between transition-all">
                  <span className="text-[10px] font-bold text-slate-300">
                    {lang === 'bn' ? 'মাইক্রো জব' : 'Micro Job'}
                  </span>
                  <span className="text-base md:text-lg font-black text-amber-400 font-mono mt-1">
                    ৳৫৫
                  </span>
                </div>
              </div>
            </div>

            {/* Task Stats Card (Requested: মোট কাজ ৬৪০, সফল কাজ ৬৩২, পেন্ডিং ৮) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Icons.CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                  {lang === 'bn' ? 'আমার কাজের বিবরণী ও রেকর্ড' : 'Work Status Summary'}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">
                    {lang === 'bn' ? 'মোট কাজ' : 'Total'}
                  </span>
                  <span className="text-base font-black text-slate-800 font-mono">৬৪০</span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block mb-0.5">
                    {lang === 'bn' ? 'সফল কাজ' : 'Successful'}
                  </span>
                  <span className="text-base font-black text-emerald-700 font-mono">৬৩২</span>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block mb-0.5">
                    {lang === 'bn' ? 'পেন্ডিং' : 'Pending'}
                  </span>
                  <span className="text-base font-black text-amber-700 font-mono">৮</span>
                </div>
              </div>
            </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm px-1">
              {lang === 'bn' ? 'সাম্প্রতিক সাবমিশন রেকর্ডস:' : 'Recent Submission Ledger:'}
            </h3>

                {taskLogs.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs md:text-sm">
                    {lang === 'bn' ? 'এখনো কোনো প্রজেক্ট প্র্যাকটিস করা হয়নি! হোম ট্যাব থেকে কাজ শুরু করুন।' : 'Workspace empty. Go to Home and click on a job to begin simulated work!'}
                  </div>
                ) : (
              <div className="space-y-3">
                    {taskLogs
                      .map((log) => (
                        <div key={log.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex justify-between items-center hover:border-blue-400 transition-colors duration-200">
                          <div className="space-y-1">
                            <h4 className="font-bold text-slate-800 text-sm">
                              {lang === 'bn' ? log.jobTitleBn : log.jobTitleEn}
                            </h4>
                            <div className="flex gap-2 text-[10px] text-slate-400 font-medium">
                              <span className="font-mono">{log.date}</span>
                              <span>•</span>
                              <span className="text-indigo-600 font-bold">UID Match: Valid</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-black text-emerald-600 block">
                              {lang === 'bn' ? `+৳${(log.reward * 100).toFixed(0)}` : `+$${log.reward.toFixed(2)}`}
                            </span>
                            <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-800 font-bold text-[9px] px-1.5 py-0.5 rounded uppercase">
                              ✓ {lang === 'bn' ? 'অনুমোদিত' : 'Approved'}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
          </div>
        )}

        {/* 3. SHOP TAB */}
        {currentTab === 'shop' && (
          <ShopTab
            profile={profile}
            updateProfile={handleUpdateProfile}
            lang={lang}
          />
        )}

        {/* 3.5 DAILY WORK TAB */}
        {currentTab === 'daily-work' && (
          <DailyWorkTab
            lang={lang}
            profile={profile}
            updateProfile={handleUpdateProfile}
            addLog={handleAddLog}
          />
        )}

        {/* 3.6 RANKING TAB (Accessible from Header) */}
        {currentTab === 'ranking' && (
          <RankingTab
            profile={profile}
            lang={lang}
          />
        )}

        {/* 4. MICRO JOB TAB */}
        {currentTab === 'micro' && (
          <MicroTab
            profile={profile}
            updateProfile={handleUpdateProfile}
            addLog={handleAddLog}
            lang={lang}
          />
        )}

        {/* 4.5 QUIZ COMPETITION TAB */}
        {currentTab === 'quiz' && (
          <QuizTab
            profile={profile}
            updateProfile={handleUpdateProfile}
            addLog={handleAddLog}
            lang={lang}
          />
        )}

        {/* 5. PROFILE TAB */}
        {currentTab === 'profile' && (
          <ProfileTab
            profile={profile}
            updateProfile={handleUpdateProfile}
            addLog={handleAddLog}
            taskLogs={taskLogs}
            lang={lang}
            onLogout={() => setIsPortalLoggedIn(false)}
            onOpenNotifications={() => setShowNotificationModal(true)}
          />
        )}
      </main>

      {/* --- RECONSTRUCTED BOTTOM TAB NAVIGATION CONTROL BAR (from screenshots) --- */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} lang={lang} />

      {/* --- MOCK JOB DETAIL MODAL SLIDEOVER/MODAL --- */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          lang={lang}
          profile={profile}
          updateProfile={handleUpdateProfile}
          addLog={handleAddLog}
        />
      )}

      {/* --- SUPPORT / HELP MODAL --- */}
      {showSupportModal && (
        <SupportModal
          onClose={() => setShowSupportModal(false)}
          lang={lang}
        />
      )}

      {/* --- NOTIFICATION HUB MODAL --- */}
      {showNotificationModal && (
        <NotificationModal
          lang={lang}
          onClose={() => setShowNotificationModal(false)}
        />
      )}

      {/* Floating Gift Box Offer Widget */}
      <GiftOfferWidget lang={lang} onStartWork={() => setCurrentTab('work')} />

    </div>
  );
}
