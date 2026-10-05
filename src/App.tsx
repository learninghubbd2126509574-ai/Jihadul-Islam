import React, { useState, useEffect, useRef } from 'react';
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
import LiveTransactionsTab from './components/LiveTransactionsTab';
import LiveChatTab from './components/LiveChatTab';
import OffersTab from './components/OffersTab';
import SideDrawerMenu from './components/SideDrawerMenu';
import GiftOfferWidget from './components/GiftOfferWidget';
import SupportModal from './components/SupportModal';
import NotificationModal from './components/NotificationModal';
import TopNotificationToast from './components/TopNotificationToast';
import LoginPortal from './components/LoginPortal';
import AnnouncementModal from './components/AnnouncementModal';

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
  const [jobCategoryFilter, setJobCategoryFilter] = useState<'all' | 'typing-data' | 'marketing' | 'media'>('all');

  // Auth / Portal States
  const [isPortalLoggedIn, setIsPortalLoggedIn] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPass, setAuthPass] = useState('');

  // Support Tab Modal State
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  // Smart Header Scroll State (Hide on scroll down, show on scroll up)
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        // Scrolling DOWN
        setIsHeaderHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP
        setIsHeaderHidden(false);
      }
      lastScrollY.current = currentScrollY;
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
        onLoginSuccess={() => {
          setIsPortalLoggedIn(true);
          setShowAnnouncementModal(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Banner Notification on Site Load/Refresh (Only after Portal Login) */}
      <TopNotificationToast lang={lang} />

      {/* --- CORE NAVIGATION HEADER WITH SLEEK ROUNDED CORNERS & SMART SCROLL --- */}
      <header
        className={`sticky top-0 z-30 px-2.5 sm:px-4 pt-2 pb-1 bg-slate-50/80 backdrop-blur-xs transition-all duration-300 ease-in-out ${
          isHeaderHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-2xl sm:max-w-3xl mx-auto px-3.5 sm:px-5 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between shadow-lg shadow-black/15 border border-slate-800/90 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            {/* Official Unity Earning Logo Asset on Crisp White Rounded Box */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white border border-slate-700/80 shadow-md shrink-0 flex items-center justify-center p-0.5">
              <img
                src="/unity_earning_logo.jpg"
                alt="Unity Earning Logo"
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white leading-tight">
                Unity Earning
              </h1>
              <span className="text-[9px] sm:text-[10px] text-blue-400 uppercase tracking-wider font-bold">
                E-learning Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Notification Bell with Permanent "7" Badge */}
            <button
              onClick={() => setShowNotificationModal(true)}
              className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700/90 transition-all cursor-pointer active:scale-95 flex items-center justify-center shadow-xs"
              title={lang === 'bn' ? 'নোটিফিকেশন (৭টি নতুন)' : 'Notifications (7 new)'}
              type="button"
              id="header-notification-btn"
              aria-label="Notifications"
            >
              <Icons.Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-400" />
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-xs leading-none">
                7
              </span>
            </button>

            {/* 3-Line Hamburger Menu Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/90 transition-all cursor-pointer active:scale-95 flex items-center justify-center shadow-xs"
              title={lang === 'bn' ? 'মেনু' : 'Menu'}
              type="button"
              id="header-menu-btn"
              aria-label="Open Menu"
            >
              <Icons.Menu className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* --- APP CONTAINER WITH CLEAN BALANCED VIEWPORT --- */}
      <main className={`flex-1 w-full max-w-2xl sm:max-w-3xl mx-auto ${currentTab === 'live-chat' ? 'p-2 sm:p-3 pb-16' : 'p-3.5 sm:p-5 pb-20 sm:pb-24'}`}>
        {/* TAB RENDERING */}

        {/* 1. HOME TAB */}
        {currentTab === 'home' && (
          <div className="space-y-3 sm:space-y-3.5">
            {/* Vibrant Green Hero Card (User Requested Green Background) */}
            <div className="rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white border border-emerald-400/50 shadow-lg shadow-emerald-950/20 relative overflow-hidden">
              {/* Subtle Ambient Radial Lighting */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-3">
                {/* Left Section: White/Emerald Icon + Clean Text */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Icon Tile */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-xs border border-white/30 shadow-xs flex items-center justify-center shrink-0 text-white">
                    <Icons.Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-xs" />
                  </div>

                  {/* Clean Text Formatting */}
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h2 className="text-xs sm:text-sm font-extrabold text-white tracking-tight leading-tight">
                        Unity Earning
                      </h2>
                      <span className="text-[9px] font-bold text-emerald-950 bg-white/90 px-1.5 py-0.2 rounded-md shadow-2xs">
                        {lang === 'bn' ? 'ভেরিফাইড' : 'VERIFIED'}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-emerald-100 font-medium leading-tight">
                      {lang === 'bn' ? 'স্বচ্ছ মাইক্রো-টাস্ক প্ল্যাটফর্ম • ইনস্ট্যান্ট পে-আউট' : 'Transparent Micro-Task Platform • Instant Payout'}
                    </p>
                  </div>
                </div>

                {/* Right Side: Trust Badge */}
                <div className="shrink-0">
                  <span className="text-[9.5px] sm:text-[10px] font-extrabold text-white bg-emerald-950/40 border border-emerald-300/50 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-2xs flex items-center gap-1">
                    <Icons.ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                    <span>{lang === 'bn' ? '১০০% নিশ্চিত' : '100% Verified'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Rank and Points Card - 100% In English per user instruction */}
            <div className="bg-gradient-to-r from-amber-500/15 via-yellow-400/10 to-amber-500/5 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-amber-300/80 flex items-center justify-between shadow-xs transition-all hover:border-amber-400">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-white flex items-center justify-center shrink-0 shadow-xs border border-amber-300/80">
                  <Icons.Crown className="w-4.5 h-4.5 text-white fill-white drop-shadow-xs" />
                </div>
                <div>
                  <span className="text-[9.5px] sm:text-[10px] text-amber-800 font-extrabold uppercase tracking-wider block leading-tight">
                    Member Level & Rank
                  </span>
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug">
                      Gold Rank
                    </span>
                    <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white text-[10.5px] sm:text-[11px] px-2 py-0.5 rounded-md font-black flex items-center gap-1 font-mono tabular-nums leading-none shadow-2xs border border-amber-400/50">
                      <Icons.Sparkles className="w-3 h-3 text-yellow-200 fill-yellow-200" />
                      3,250 Points
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 text-emerald-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-emerald-300/90 text-[11px] sm:text-xs flex items-center gap-1.5 font-black shrink-0 leading-tight shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active</span>
              </div>
            </div>

            {/* List of Jobs Header - Clean & Minimal (Subtext and Category Buttons Removed) */}
            <div className="pt-1 px-0.5">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-600 rounded-full" />
                  <span>{lang === 'bn' ? 'লাইভ প্রজেক্ট ডিরেক্টরি (আজকের নির্ধারিত কাজ):' : "Live Project Directory (Active Tasks):"}</span>
                </h3>
                <span className="text-slate-600 text-xs font-bold font-mono tabular-nums bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full leading-normal shrink-0">
                  {lang === 'bn' ? '৩৬৫ টি সক্রিয়' : '365 Active'}
                </span>
              </div>
            </div>

            {/* Job Cards Array - Clean, distinct box separation with Neumorphism */}
            <div className="space-y-4 sm:space-y-4.5">
              {INITIAL_JOBS.filter((job) => {
                if (jobCategoryFilter === 'all') return true;
                if (jobCategoryFilter === 'typing-data') {
                  return ['typing-job', 'data-entry-work', 'form-fillup-work', 'code-entry', 'computer-training'].includes(job.id);
                }
                if (jobCategoryFilter === 'marketing') {
                  return ['email-marketing', 'facebook-marketing', 'lead-generation', 'product-selling-work', 'drop-shipping', 'social-media-management'].includes(job.id);
                }
                if (jobCategoryFilter === 'media') {
                  return ['video-submit-work', 'photo-editing', 'video-editing', 'content-writing', 'gaming-tournament', 'website-visit'].includes(job.id);
                }
                return true;
              }).map((job) => (
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
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-amber-400 flex items-center gap-2 leading-snug">
                    <Icons.Briefcase className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'bn' ? 'আজকের ফিচার্ড কাজের রেট ও পারিশ্রমিক' : "Today's Featured Rates & Payouts"}</span>
                  </h2>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {lang === 'bn' ? 'মার্কেট স্ট্যান্ডার্ড অনুযায়ী নির্ধারিত শীর্ষ ৩টি ভেরিফাইড কাজের পারিশ্রমিক' : 'Top 3 verified high-demand tasks per market standard'}
                  </p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1 leading-normal shrink-0">
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
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 leading-snug">
                    <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'bn' ? 'কাজের সামগ্রিক পারফরম্যান্স ও অনুমোদন মেট্রিক্স' : 'Overall Performance & Verification Metrics'}</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {lang === 'bn' ? 'আপনার অ্যাকাউন্টের সম্পূর্ণ সাবমিশন ও ভেরিফাইড অনুমোদন হিসেব' : 'Lifetime submission count and approval verification ledger'}
                  </p>
                </div>
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
              <div className="flex items-center justify-between px-1">
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 leading-snug">
                  <Icons.FileText className="w-4 h-4 text-blue-600" />
                  <span>{lang === 'bn' ? 'ভেরিফাইড সাবমিশন ও ট্রানজেকশন লেজার:' : 'Verified Submission & Payout Ledger:'}</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-bold font-mono tabular-nums bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">40 records</span>
              </div>

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

        {/* 5. LIVE TRANSACTIONS TAB (Requested: কুইজের জায়গায় লাইভ ট্রানজেকশন) */}
        {currentTab === 'live-tx' && (
          <LiveTransactionsTab lang={lang} />
        )}

        {/* 5.5 LIVE CHAT TAB (Requested: মাইক্রোজবের জায়গায় লাইভ চ্যাট) */}
        {currentTab === 'live-chat' && (
          <LiveChatTab lang={lang} profile={profile} />
        )}

        {/* 5.8 OFFERS TAB */}
        {currentTab === 'offers' && (
          <OffersTab lang={lang} onNavigateWork={() => setCurrentTab('work')} />
        )}

        {/* 6. PROFILE TAB */}
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

      {/* --- SIDE DRAWER MENU (Requested: 3-line options drawer) --- */}
      <SideDrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        profile={profile}
        lang={lang}
        onNavigate={(tabId) => {
          if (tabId === 'support') {
            setShowSupportModal(true);
          } else {
            setCurrentTab(tabId);
          }
        }}
        onOpenNotifications={() => setShowNotificationModal(true)}
        onLogout={() => {
          setIsPortalLoggedIn(false);
        }}
        onToggleLang={() => setLang(lang === 'bn' ? 'en' : 'bn')}
      />

      {/* Floating Gift Box Offer Widget */}
      <GiftOfferWidget lang={lang} onStartWork={() => setCurrentTab('work')} />

      {/* --- LOGIN SPECIAL OFFER ANNOUNCEMENT POPUP MODAL --- */}
      <AnnouncementModal
        isOpen={showAnnouncementModal}
        onClose={() => setShowAnnouncementModal(false)}
        lang={lang}
      />

    </div>
  );
}
