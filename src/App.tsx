import React, { useState, useEffect } from 'react';
import {
  Shield,
  LifeBuoy,
  LogOut,
  LogIn,
  AlertCircle,
  X,
  XCircle,
  CheckCircle,
  Clock,
  Briefcase,
  HelpCircle,
  TrendingUp,
  Globe,
  Star
} from 'lucide-react';
import { Job, UserProfile, TaskLog, ShopItem } from './types';
import { INITIAL_JOBS, INITIAL_PROFILE, SHOP_ITEMS, DEFAULT_TASK_LOGS } from './data/jobs';
import { getLocalMicroTasks } from './data/microJobs';
import BottomNav from './components/BottomNav';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import ProfileTab from './components/ProfileTab';
import ShopTab from './components/ShopTab';
import MicroTab from './components/MicroTab';
import QuizTab from './components/QuizTab';

export default function App() {
  // Global States
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [shopItems, setShopItems] = useState<ShopItem[]>(SHOP_ITEMS);
  const [taskLogs, setTaskLogs] = useState<TaskLog[]>(DEFAULT_TASK_LOGS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showWarningBanner, setShowWarningBanner] = useState(true);

  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in for premium demo feel
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPass, setAuthPass] = useState('');

  // Support Tab Modal State
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  // Load state from localStorage on init
  useEffect(() => {
    const savedProfile = localStorage.getItem('ue_profile');
    const savedLogs = localStorage.getItem('ue_logs');
    const savedShop = localStorage.getItem('ue_shop');
    const savedAuth = localStorage.getItem('ue_is_logged_in');

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      if (!parsed.tasksCompleted || parsed.tasksCompleted < 50) {
        parsed.tasksCompleted = 50;
        localStorage.setItem('ue_profile', JSON.stringify(parsed));
      }
      setProfile(parsed);
    } else {
      localStorage.setItem('ue_profile', JSON.stringify(INITIAL_PROFILE));
    }

    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs) as TaskLog[];
      const hasVideoJob = parsedLogs.some((l) => l.jobId === 'video-job' || (l.jobTitleBn && l.jobTitleBn.includes('ভিডিও')));
      if (!hasVideoJob || parsedLogs.length < 50) {
        setTaskLogs(DEFAULT_TASK_LOGS);
        localStorage.setItem('ue_logs', JSON.stringify(DEFAULT_TASK_LOGS));
      } else {
        setTaskLogs(parsedLogs);
      }
    } else {
      setTaskLogs(DEFAULT_TASK_LOGS);
      localStorage.setItem('ue_logs', JSON.stringify(DEFAULT_TASK_LOGS));
    }

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
    const logItem: TaskLog = {
      id: `log-${Date.now()}`,
      jobId: newLog.jobId,
      jobTitleBn: newLog.jobTitleBn,
      jobTitleEn: newLog.jobTitleEn,
      reward: newLog.reward,
      date: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Completed'
    };
    const nextLogs = [logItem, ...taskLogs];
    setTaskLogs(nextLogs);
    localStorage.setItem('ue_logs', JSON.stringify(nextLogs));
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased pb-24">
      {/* --- CORE NAVIGATION HEADER (from screenshots) --- */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-black text-slate-950 text-base shadow-sm">
              U
            </div>
            <h1 className="font-extrabold text-lg md:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
              Unity Earning
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="bg-slate-800 hover:bg-slate-700 text-[10px] uppercase font-black px-2.5 py-1.5 rounded-lg border border-slate-700 tracking-wider flex items-center gap-1 transition-all"
              title="Toggle Language"
            >
              <Globe className="w-3 h-3" />
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>

            {/* Support button (from first screenshot) */}
            <button
              onClick={() => setShowSupportModal(true)}
              className="flex flex-col items-center justify-center text-slate-300 hover:text-amber-400 transition-colors"
              id="support-header-btn"
            >
              <LifeBuoy className="w-5 h-5 text-amber-500" />
              <span className="text-[9px] font-bold mt-0.5">{lang === 'bn' ? 'সাপোর্ট' : 'Support'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- APP CONTAINER WITH MAX-WIDTH PRESET FOR FAITHFUL PHONE LAYOUT --- */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-5 pb-24">
        {/* TAB RENDERING */}

        {/* 1. HOME TAB */}
        {currentTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Welcome block (from first screenshot) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden animate-fade-in">
              {/* Decorative circle glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative z-10 space-y-1">
                <h2 className="text-xl font-black text-[#0f172a] tracking-tight leading-tight">
                  Unity Earning {lang === 'bn' ? 'কমিশন ভিত্তিক কাজ' : 'Commission Jobs'}
                </h2>
                <p className="text-slate-500 text-xs">
                  {lang === 'bn'
                    ? 'নিচের কাজের তালিকা থেকে প্রজেক্ট সম্পন্ন করে সাথে সাথে নির্ধারিত ক্যাশ কমিশন আয় করুন।'
                    : 'Complete simple training projects from the list below and earn verified cash commissions.'}
                </p>
              </div>


            </div>

            {/* Simulated Earnings stats card */}
            <div className="bg-[#0f172a] text-white p-5 rounded-2xl shadow-sm border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{lang === 'bn' ? 'র‍্যাংক এবং ব্যাজ' : 'Member Level'}</span>
                  <span className="text-xs font-bold text-blue-400">{profile.level}</span>
                </div>
              </div>
              <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/50 text-[10px] text-slate-300 flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{lang === 'bn' ? 'সক্রিয় সেশন' : 'Active'}</span>
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
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                {lang === 'bn' ? 'আমার ডেমো কাজের অগ্রগতি' : 'Active Training Workspace'}
              </h2>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                {lang === 'bn'
                  ? 'আপনার ইতিমধ্যে সাবমিট করা কাজ এবং রিয়েল-টাইম পেন্ডিং ডেমো ট্র্যাকিং দেখতে নিচের লিস্টটি পর্যবেক্ষণ করুন।'
                  : 'Check status, verify completion tokens, and inspect detailed campaign analytics ledger below.'}
              </p>

            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-200 text-center">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">{lang === 'bn' ? 'মোট কাজ' : 'Total'}</span>
                <span className="text-base font-black text-slate-800">305</span>
              </div>
              <div className="p-3 bg-emerald-50/40 border border-emerald-200 rounded-xl">
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block mb-0.5">{lang === 'bn' ? 'সফল' : 'Verified'}</span>
                <span className="text-base font-black text-emerald-700">{profile.tasksCompleted}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">{lang === 'bn' ? 'পেন্ডিং' : 'Pending'}</span>
                <span className="text-base font-black text-slate-500">2</span>
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
                    {taskLogs.map((log) => (
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
        <div className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-slate-200 animate-slide-up">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-extrabold text-base text-[#0f172a] flex items-center gap-1.5">
                <LifeBuoy className="w-5 h-5 text-blue-600" />
                {lang === 'bn' ? '২৪/৭ লাইভ হেল্পডেস্ক সাপোর্ট' : 'Unity Support Center'}
              </h3>
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-[11px] text-emerald-800 font-medium leading-relaxed text-center">
                {lang === 'bn'
                  ? 'আপনার কাজ বা পেমেন্ট সংক্রান্ত যেকোনো সমস্যায় আমাদের সাপোর্ট টিমের সাহায্য নিন। নিচে দেওয়া যেকোনো একজন কাউন্সিলরের সাথে হোয়াটসঅ্যাপে যোগাযোগ করুন।'
                  : 'Having queries with typing speeds or lead sheets? Contact our live support counselors on WhatsApp.'}
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <a
                  href="https://wa.me/message/YOUR_WHATSAPP_LINK_1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  {lang === 'bn' ? 'কাউন্সিলর ১ (WhatsApp)' : 'Counselor 1 (WhatsApp)'}
                </a>

                <a
                  href="https://wa.me/message/YOUR_WHATSAPP_LINK_2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  {lang === 'bn' ? 'কাউন্সিলর ২ (WhatsApp)' : 'Counselor 2 (WhatsApp)'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
