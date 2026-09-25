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
      if (!parsed.fullName || parsed.fullName !== 'Habiba Akter' || !parsed.balance || parsed.totalIncome !== 66400 || parsed.tasksCompleted < 600 || !parsed.points || parsed.level === 'Silver Rank' || !parsed.avatarUrl || parsed.avatarUrl.includes('dicebear')) {
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Banner Notification on Site Load/Refresh (Only after Portal Login) */}
      <TopNotificationToast lang={lang} />

      {/* --- CORE NAVIGATION HEADER --- */}
      <header 
        className={`bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-30 shadow-sm border-b border-slate-800/80 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-2xl sm:max-w-3xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-base sm:text-lg shadow-sm">
              U
            </div>
            <div className="flex flex-col">
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white leading-tight">
                Unity Earning
              </h1>
              <span className="text-[9px] sm:text-[10px] text-blue-400 uppercase tracking-wider font-bold">E-learning Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="h-8 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 text-[11px] font-bold border border-slate-700/80 flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
              title="Toggle Language"
              type="button"
            >
              <Icons.Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'bn' ? 'EN' : 'বাং'}</span>
            </button>

            {/* Ranking Button - Golden/Amber Theme */}
            <button
              onClick={() => setCurrentTab('ranking')}
              className="h-8 px-2.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
              id="ranking-header-btn"
              type="button"
            >
              <Icons.Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'র‍্যাঙ্কিং' : 'Ranking'}</span>
            </button>

            {/* Support Button - Emerald/Green Theme */}
            <button
              onClick={() => setShowSupportModal(true)}
              className="h-8 px-2.5 rounded-lg bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
              id="support-header-btn"
              type="button"
            >
              <Icons.Headphones className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'bn' ? 'সাপোর্ট' : 'Support'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- APP CONTAINER WITH CLEAN BALANCED VIEWPORT --- */}
      <main className="flex-1 w-full max-w-2xl sm:max-w-3xl mx-auto p-4 sm:p-5 pb-28">
        {/* TAB RENDERING */}

        {/* 1. HOME TAB */}
        {currentTab === 'home' && (
          <div className="space-y-4">
            {/* Hero Welcome block */}
            <div className="rounded-[1.25rem] p-4 sm:p-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white relative overflow-hidden shadow-md border border-blue-500/30">
              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20 shrink-0 shadow-sm">
                    <Icons.Briefcase className="w-4.5 h-4.5 text-amber-300" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
                    Unity Earning {lang === 'bn' ? 'কমিশন কাজ' : 'Commission Jobs'}
                  </h2>
                </div>
                <p className="text-blue-100/90 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                  {lang === 'bn'
                    ? 'কাজের তালিকা থেকে প্রজেক্ট সম্পন্ন করে সাথে সাথে নির্ধারিত কমিশন লাভ করুন।'
                    : 'Complete simple projects from the list below and earn verified cash commissions.'}
                </p>
              </div>
            </div>

            {/* Rank and Points Card - Clean, Formal & Aesthetic Gold Design */}
            <div className="bg-white p-4 rounded-[1.25rem] border border-slate-200/80 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center shrink-0">
                  <Icons.Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block leading-tight">{lang === 'bn' ? 'র‍্যাংক' : 'Member Level'}</span>
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <span className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
                      {profile.level === 'Gold Rank' ? (lang === 'bn' ? 'গোল্ড র‍্যাংক' : 'Gold Rank') : profile.level}
                    </span>
                    <span className="bg-amber-50 text-amber-800 text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 border border-amber-200/80 font-mono tabular-nums leading-none">
                      <Icons.Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {lang === 'bn' ? `${toBnNum((profile.points || 3250).toLocaleString('en-US'))} পয়েন্ট` : `${(profile.points || 3250).toLocaleString('en-US')} Pts`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200/80 text-xs flex items-center gap-1.5 font-bold shrink-0 leading-tight">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{lang === 'bn' ? 'সক্রিয়' : 'Active'}</span>
              </div>
            </div>

            {/* List of Jobs Header */}
            <div className="flex flex-col gap-0.5 pt-1 px-0.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-600 rounded-full" />
                  <span>{lang === 'bn' ? 'টুডে ওয়ার্ক (আজকের কাজ):' : "Today's Work (Active Jobs):"}</span>
                </h3>
                <span className="text-slate-500 text-xs font-semibold font-mono tabular-nums bg-slate-100 border border-slate-200/60 px-2.5 py-0.5 rounded-full leading-normal">
                  {lang === 'bn' ? '৩৬৫ টি উপলব্ধ' : '365 Active'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-normal">
                {lang === 'bn' ? '* প্রতিদিন সকাল ৯টায় নতুন কাজ যুক্ত হয়।' : '* New tasks are added daily at 9:00 AM.'}
              </p>
            </div>

            {/* Job Cards Array */}
            <div className="space-y-3">
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
          <div className="space-y-4 animate-fade-in">

            {/* Top Featured Work Cards (Requested: ফর্ম ফিলআপ ২৫০, ইমেইল সেল ৪০, মাইক্রো জব ৫৫) */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[1.25rem] p-4 sm:p-5 border border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <h2 className="text-sm sm:text-base font-bold text-amber-400 flex items-center gap-2 leading-snug">
                  <Icons.Briefcase className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'bn' ? 'আজকের কাজ ও রেট' : "Today's Featured Work"}</span>
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1 leading-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{lang === 'bn' ? 'সক্রিয় কাজ' : 'Active'}</span>
                </span>
              </div>

              {/* 3 Main Work Rate Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                {/* Form Fillup 250 Taka */}
                <div className="bg-slate-800/80 hover:bg-slate-800 p-3 rounded-xl border border-emerald-400/30 flex flex-col items-center justify-center transition-colors">
                  <span className="text-[11px] font-medium text-slate-300 leading-tight">
                    {lang === 'bn' ? 'ফর্ম ফিলআপ' : 'Form Fillup'}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono tabular-nums mt-1 leading-snug">
                    ৳২৫০
                  </span>
                </div>

                {/* Email Sale 40 Taka */}
                <div className="bg-slate-800/80 hover:bg-slate-800 p-3 rounded-xl border border-blue-400/30 flex flex-col items-center justify-center transition-colors">
                  <span className="text-[11px] font-medium text-slate-300 leading-tight">
                    {lang === 'bn' ? 'ই-মেইল সেল' : 'Email Sale'}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-blue-400 font-mono tabular-nums mt-1 leading-snug">
                    ৳৪০
                  </span>
                </div>

                {/* Micro Job 55 Taka */}
                <div className="bg-slate-800/80 hover:bg-slate-800 p-3 rounded-xl border border-amber-400/30 flex flex-col items-center justify-center transition-colors">
                  <span className="text-[11px] font-medium text-slate-300 leading-tight">
                    {lang === 'bn' ? 'মাইক্রো জব' : 'Micro Job'}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-amber-400 font-mono tabular-nums mt-1 leading-snug">
                    ৳৫৫
                  </span>
                </div>
              </div>
            </div>

            {/* Task Stats Card (Requested: মোট কাজ ৬৪০, সফল কাজ ৬৩২, পেন্ডিং ৮) */}
            <div className="bg-white rounded-[1.25rem] p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 leading-snug">
                  <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'bn' ? 'আমার কাজের বিবরণী ও রেকর্ড' : 'Work Status Summary'}</span>
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5 leading-tight">
                    {lang === 'bn' ? 'মোট কাজ' : 'Total'}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-900 font-mono tabular-nums leading-snug">৬৪০</span>
                </div>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block mb-0.5 leading-tight">
                    {lang === 'bn' ? 'সফল কাজ' : 'Successful'}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-emerald-700 font-mono tabular-nums leading-snug">৬৩২</span>
                </div>
                <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block mb-0.5 leading-tight">
                    {lang === 'bn' ? 'পেন্ডিং' : 'Pending'}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-amber-700 font-mono tabular-nums leading-snug">৮</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm px-1 flex items-center justify-between leading-snug">
                <span>{lang === 'bn' ? 'সাম্প্রতিক সাবমিশন রেকর্ডস:' : 'Recent Submission Ledger:'}</span>
                <span className="text-[11px] text-slate-400 font-mono tabular-nums">40 records</span>
              </h3>

              {taskLogs.length === 0 ? (
                <div className="bg-white rounded-[1.25rem] border border-slate-200/80 p-8 text-center text-slate-400 text-xs sm:text-sm">
                  {lang === 'bn' ? 'এখনো কোনো প্রজেক্ট প্র্যাকটিস করা হয়নি! হোম ট্যাব থেকে কাজ শুরু করুন।' : 'Workspace empty. Go to Home and click on a job to begin simulated work!'}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {taskLogs.map((log) => (
                    <div key={log.id} className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-xs flex justify-between items-center hover:border-blue-400/80 transition-colors">
                      <div className="space-y-0.5 min-w-0 pr-3">
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug truncate">
                          {lang === 'bn' ? log.jobTitleBn : log.jobTitleEn}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                          <span className="font-mono tabular-nums">{log.date}</span>
                          <span>•</span>
                          <span className="text-indigo-600 font-semibold">UID Match: Valid</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-emerald-600 font-mono tabular-nums block leading-tight">
                          {lang === 'bn' ? `+৳${(log.reward * 100).toFixed(0)}` : `+$${log.reward.toFixed(2)}`}
                        </span>
                        <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 font-bold text-[9px] px-1.5 py-0.5 rounded border border-emerald-200/60 uppercase leading-normal">
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
