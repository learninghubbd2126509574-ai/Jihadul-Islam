import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import LikeEarningFeed from './LikeEarningFeed';
import LuckySpinFeed from './LuckySpinFeed';
import { UserProfile, TaskLog } from '../types';
import { DAILY_PROJECTS, DailyProject } from '../data/dailyProjects';

interface DailyWorkTabProps {
  lang: 'bn' | 'en';
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog?: (log: TaskLog) => void;
}

export default function DailyWorkTab({ lang, profile, updateProfile, addLog }: DailyWorkTabProps) {
  const [activeSubTaskId, setActiveSubTaskId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<DailyProject | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'daily' | 'micro' | 'marketing' | 'bonus'>('all');
  
  // Interactive mini-task states inside modal
  const [isAdPlaying, setIsAdPlaying] = useState<boolean>(false);
  const [adSecondsLeft, setAdSecondsLeft] = useState<number>(15);
  const [adWatched, setAdWatched] = useState<boolean>(false);
  const [adClaimed, setAdClaimed] = useState<boolean>(false);

  const [surveyAnswered, setSurveyAnswered] = useState<boolean>(false);
  const [surveyClaimed, setSurveyClaimed] = useState<boolean>(false);

  const [dataEntryInput, setDataEntryInput] = useState({ name: '', phone: '', city: '' });
  const [dataEntrySubmitted, setDataEntrySubmitted] = useState<boolean>(false);

  const [referralCopied, setReferralCopied] = useState<boolean>(false);
  const [genericSuccessMsg, setGenericSuccessMsg] = useState<string | null>(null);

  // If Like Earning is selected, launch dedicated feed
  if (activeSubTaskId === 'dw-like-earning') {
    return <LikeEarningFeed lang={lang} onBack={() => setActiveSubTaskId(null)} />;
  }

  // If Lucky Spin is selected, launch dedicated feed
  if (activeSubTaskId === 'dw-lucky-spin') {
    return (
      <LuckySpinFeed
        lang={lang}
        onBack={() => setActiveSubTaskId(null)}
        profile={profile}
        updateProfile={updateProfile}
        addLog={addLog}
      />
    );
  }

  // Handle project click
  const handleProjectClick = (project: DailyProject) => {
    if (project.id === 'dw-like-earning' || project.id === 'dw-lucky-spin') {
      setActiveSubTaskId(project.id);
      return;
    }
    // Reset mini-task states
    setIsAdPlaying(false);
    setAdSecondsLeft(15);
    setAdWatched(false);
    setAdClaimed(false);
    setSurveyAnswered(false);
    setSurveyClaimed(false);
    setDataEntrySubmitted(false);
    setReferralCopied(false);
    setGenericSuccessMsg(null);

    setSelectedProject(project);
  };

  // Start watching ad
  const handleStartAd = () => {
    setIsAdPlaying(true);
    setAdSecondsLeft(15);
    setAdWatched(false);

    const timer = setInterval(() => {
      setAdSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsAdPlaying(false);
          setAdWatched(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Claim Ad reward
  const handleClaimAdReward = () => {
    const reward = 5.0;
    const newBal = Number((profile.balance + reward).toFixed(2));
    updateProfile({
      balance: newBal,
      totalIncome: Number((profile.totalIncome + reward).toFixed(2)),
      tasksCompleted: (profile.tasksCompleted || 0) + 1,
    });
    if (addLog) {
      addLog({
        id: `log-${Date.now()}`,
        jobId: 'dw-ads-view',
        jobTitleBn: 'এডস ভিউ রিওয়ার্ড',
        jobTitleEn: 'Ads View Reward',
        reward: reward,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
      });
    }
    setAdClaimed(true);
  };

  // Claim Survey reward
  const handleClaimSurveyReward = () => {
    const reward = 20.0;
    const newBal = Number((profile.balance + reward).toFixed(2));
    updateProfile({
      balance: newBal,
      totalIncome: Number((profile.totalIncome + reward).toFixed(2)),
      tasksCompleted: (profile.tasksCompleted || 0) + 1,
    });
    if (addLog) {
      addLog({
        id: `log-${Date.now()}`,
        jobId: 'dw-online-survey',
        jobTitleBn: 'অনলাইন সার্ভে রিওয়ার্ড',
        jobTitleEn: 'Online Survey Reward',
        reward: reward,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
      });
    }
    setSurveyClaimed(true);
  };

  // Claim Data Entry reward
  const handleDataEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataEntryInput.name || !dataEntryInput.phone) return;
    const reward = 15.0;
    const newBal = Number((profile.balance + reward).toFixed(2));
    updateProfile({
      balance: newBal,
      totalIncome: Number((profile.totalIncome + reward).toFixed(2)),
      tasksCompleted: (profile.tasksCompleted || 0) + 1,
    });
    if (addLog) {
      addLog({
        id: `log-${Date.now()}`,
        jobId: 'dw-data-entry',
        jobTitleBn: 'ডাটা এন্ট্রি অনুমোদন',
        jobTitleEn: 'Data Entry Approved',
        reward: reward,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
      });
    }
    setDataEntrySubmitted(true);
  };

  // Generic Task Activation
  const handleActivateGenericTask = () => {
    setGenericSuccessMsg(
      lang === 'bn'
        ? 'আপনার টাস্ক আবেদন সফলভাবে গ্রহণ করা হয়েছে! কাজের লিংক প্রস্তুত হচ্ছে।'
        : 'Task application received! Preparing workspace contract.'
    );
  };

  // Filter projects
  const filteredProjects = DAILY_PROJECTS.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 animate-fade-in" id="daily-work-container">
      {/* --- PREMIUM APP-STYLE PROJECT HERO CONTAINER --- */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-[1.25rem] p-4 sm:p-5 shadow-lg border border-blue-400/40 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-950/40 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        {/* Header Title & Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10 border-b border-white/15 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-sm shrink-0">
              <Icons.Layers className="w-6 h-6 text-white drop-shadow-xs" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-xs">
                  {lang === 'bn' ? 'আমাদের প্রজেক্ট সমূহ' : 'Our Projects'}
                </h2>
                <span className="flex items-center gap-1 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs leading-none">
                  <Icons.Sparkles className="w-3 h-3 text-amber-950" />
                  LIVE
                </span>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm mt-0.5 font-medium leading-relaxed">
                {lang === 'bn' ? 'পছন্দের প্রজেক্ট সিলেক্ট করে কাজ শুরু করুন' : 'Select a project to start working'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-blue-950 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs shrink-0 flex items-center gap-1.5 border border-white/40">
              <Icons.Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {lang === 'bn' ? `${DAILY_PROJECTS.length}টি প্রজেক্ট` : `${DAILY_PROJECTS.length} Projects`}
              </span>
            </span>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none relative z-10 mb-3.5">
          {[
            { id: 'all', labelBn: 'সব প্রজেক্ট', labelEn: 'All Projects', icon: 'LayoutGrid' },
            { id: 'daily', labelBn: 'দৈনিক কাজ', labelEn: 'Daily Tasks', icon: 'Clock' },
            { id: 'micro', labelBn: 'মাইক্রো জবস', labelEn: 'Micro Jobs', icon: 'ListChecks' },
            { id: 'marketing', labelBn: 'মার্কেটিং', labelEn: 'Marketing', icon: 'TrendingUp' },
            { id: 'bonus', labelBn: 'বোনাস ও রিওয়ার্ড', labelEn: 'Bonuses', icon: 'Award' },
          ].map((cat) => {
            const CatIcon = (Icons as any)[cat.icon] || Icons.Circle;
            const isActive = filterCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer select-none leading-none ${
                  isActive
                    ? 'bg-white text-blue-900 shadow-sm border border-white'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                }`}
                type="button"
              >
                <CatIcon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-blue-200'}`} />
                <span>{lang === 'bn' ? cat.labelBn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* --- BALANCED RESPONSIVE GRID (Mobile: 3 cols, Tablet: 4 cols, Desktop: 5 cols) --- */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3 relative z-10">
          {filteredProjects.map((item) => {
            const IconComponent = (Icons as any)[item.icon] || Icons.Layers;
            return (
              <div
                key={item.id}
                onClick={() => handleProjectClick(item)}
                className="group relative bg-white hover:bg-slate-50/95 rounded-[1.25rem] p-2.5 sm:p-3 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 border border-slate-200/90 hover:border-blue-400 shadow-[0_2px_8px_rgba(15,23,42,0.06)] min-h-[114px] sm:min-h-[124px]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(item);
                  }
                }}
              >
                {/* Floating Micro Badge */}
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-1 text-[8.5px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs leading-none tracking-tight border border-white z-20 ${
                      item.badgeColor || 'bg-rose-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* 3D App-Style Squircle Icon Box */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center shrink-0 shadow-sm ${item.shadow} border border-white/30 relative overflow-hidden transition-transform duration-300 group-hover:scale-105`}
                >
                  {/* Glossy Sheen Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/5 to-transparent pointer-events-none" />
                  
                  {/* Crisp High-Contrast Icon */}
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2px] relative z-10 drop-shadow-xs" />
                </div>

                {/* Title */}
                <div className="w-full mt-1.5">
                  <h3 className="text-slate-800 text-[11px] sm:text-xs font-bold text-center leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {lang === 'bn' ? item.nameBn : item.nameEn}
                  </h3>
                  
                  {/* Reward / Commission Badge */}
                  <div className="mt-1 flex items-center justify-center">
                    <span className="text-[9px] sm:text-[9.5px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md font-semibold border border-emerald-200/60 leading-none truncate max-w-full">
                      {lang === 'bn' ? item.rewardBn : item.rewardEn}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- INTERACTIVE PROJECT DETAIL & WORK ACTION MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[1.25rem] w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-scale-up">
            {/* Modal Header */}
            <div className={`p-4 bg-gradient-to-r ${selectedProject.gradient} text-white flex items-center justify-between relative shadow-md shrink-0`}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-sm shrink-0">
                  {React.createElement(
                    (Icons as any)[selectedProject.icon] || Icons.Layers,
                    { className: 'w-6 h-6 stroke-[2.2px]' }
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base sm:text-lg leading-snug tracking-tight text-white drop-shadow-xs">
                      {lang === 'bn' ? selectedProject.nameBn : selectedProject.nameEn}
                    </h3>
                    <span className="bg-white/25 text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">
                      {lang === 'bn' ? selectedProject.estimatedTimeBn : selectedProject.estimatedTimeEn}
                    </span>
                  </div>
                  <p className="text-white/90 text-xs font-medium mt-0.5 leading-tight">
                    {lang === 'bn' ? selectedProject.subBn : selectedProject.subEn}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                aria-label="Close"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-slate-50/50">
              {/* Earning Rate Bar */}
              <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200 shrink-0">
                    ৳
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium leading-tight">
                      {lang === 'bn' ? 'কমিশন ও ইনকাম রেট' : 'Commission Rate'}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-emerald-600 font-mono">
                      {lang === 'bn' ? selectedProject.rewardBn : selectedProject.rewardEn}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {lang === 'bn' ? 'সক্রিয় কাজ' : 'Active Task'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Icons.Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>{lang === 'bn' ? 'কাজের বিবরণী' : 'Task Overview'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {lang === 'bn' ? selectedProject.descriptionBn : selectedProject.descriptionEn}
                </p>
              </div>

              {/* Step By Step Instructions */}
              <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Icons.CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'bn' ? 'সহজ ৩টি ধাপ' : '3 Easy Steps'}</span>
                </h4>
                <div className="space-y-2">
                  {(lang === 'bn' ? selectedProject.stepsBn : selectedProject.stepsEn).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- DYNAMIC INTERACTIVE TASK MODULES FOR REAL WORKING EXPERIENCE --- */}
              {selectedProject.id === 'dw-ads-view' && (
                <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <Icons.PlayCircle className="w-4 h-4 text-rose-400" />
                      {lang === 'bn' ? 'স্পন্সরড ভিডিও বিজ্ঞাপন' : 'Sponsored Video Ad'}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {isAdPlaying ? `${adSecondsLeft}s` : adWatched ? (lang === 'bn' ? 'সম্পন্ন' : 'Finished') : '15s'}
                    </span>
                  </div>

                  <div className="h-32 bg-slate-950 rounded-lg flex flex-col items-center justify-center border border-slate-800 relative overflow-hidden text-center p-3">
                    {isAdPlaying ? (
                      <div className="space-y-2">
                        <Icons.Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
                        <p className="text-xs text-slate-300 font-medium">
                          {lang === 'bn' ? `বিজ্ঞাপন চলছে... অপেক্ষা করুন (${adSecondsLeft} সেকেন্ড)` : `Ad playing... please wait (${adSecondsLeft}s)`}
                        </p>
                      </div>
                    ) : adWatched ? (
                      <div className="space-y-1">
                        <Icons.CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                        <p className="text-xs text-emerald-300 font-bold">
                          {lang === 'bn' ? 'ভিডিও দেখা সম্পন্ন হয়েছে!' : 'Video viewing completed!'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <button
                          onClick={handleStartAd}
                          className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 mx-auto cursor-pointer transition-all active:scale-95"
                        >
                          <Icons.Play className="w-4 h-4 fill-current" />
                          <span>{lang === 'bn' ? 'বিজ্ঞাপন শুরু করুন' : 'Start Video Ad'}</span>
                        </button>
                        <p className="text-[11px] text-slate-400">
                          {lang === 'bn' ? '১৫ সেকেন্ড বিজ্ঞাপন দেখলে ৫ টাকা পাবেন' : 'Watch 15s to earn ৳5.00'}
                        </p>
                      </div>
                    )}
                  </div>

                  {adWatched && !adClaimed && (
                    <button
                      onClick={handleClaimAdReward}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Icons.Gift className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'টাকা সংগ্রহ করুন (+৳৫.০০)' : 'Claim Reward (+৳5.00)'}</span>
                    </button>
                  )}

                  {adClaimed && (
                    <div className="bg-emerald-950/80 border border-emerald-500/40 p-2.5 rounded-xl text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{lang === 'bn' ? '৳৫.০০ সরাসরি আপনার ব্যালেন্সে যোগ হয়েছে!' : '৳5.00 credited to your main balance!'}</span>
                    </div>
                  )}
                </div>
              )}

              {selectedProject.id === 'dw-online-survey' && (
                <div className="bg-white rounded-xl p-4 border border-indigo-200 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <Icons.HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>{lang === 'bn' ? 'আজকের কুইক সার্ভে প্রশ্ন' : 'Daily Quick Survey Question'}</span>
                  </h4>

                  {!surveyClaimed ? (
                    <div className="space-y-2.5">
                      <p className="text-xs text-slate-700 font-semibold">
                        {lang === 'bn' ? 'অনলাইন উপার্জনে আপনার কোন কাজটি বেশি পছন্দ?' : 'Which online task do you prefer most?'}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {['ডাটা এন্ট্রি', 'এডস ভিউ', 'লাইক আর্নিং', 'কন্টেন্ট রাইটিং'].map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => setSurveyAnswered(true)}
                            className="p-2 rounded-lg border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-xs font-medium text-slate-800 text-left transition-colors cursor-pointer"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {surveyAnswered && (
                        <button
                          onClick={handleClaimSurveyReward}
                          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Icons.Sparkles className="w-4 h-4 text-amber-300" />
                          <span>{lang === 'bn' ? 'সার্ভে জমা দিন ও ২০ টাকা গ্রহণ করুন' : 'Submit Survey & Claim ৳20'}</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'bn' ? 'সার্ভে সম্পন্ন! ২০ টাকা যুক্ত হয়েছে।' : 'Survey completed! ৳20.00 credited.'}</span>
                    </div>
                  )}
                </div>
              )}

              {selectedProject.id === 'dw-data-entry' && (
                <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Icons.FileSpreadsheet className="w-4 h-4 text-blue-600" />
                    <span>{lang === 'bn' ? 'লাইভ ডাটা এন্ট্রি ফর্ম' : 'Live Data Entry Sheet'}</span>
                  </h4>

                  {!dataEntrySubmitted ? (
                    <form onSubmit={handleDataEntrySubmit} className="space-y-2.5">
                      <input
                        type="text"
                        placeholder={lang === 'bn' ? 'গ্রাহকের নাম (যেমন: আরিফ হাসান)' : 'Customer Name'}
                        value={dataEntryInput.name}
                        onChange={(e) => setDataEntryInput({ ...dataEntryInput, name: e.target.value })}
                        required
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 bg-slate-50"
                      />
                      <input
                        type="tel"
                        placeholder={lang === 'bn' ? 'মোবাইল নম্বর (যেমন: 017XXXXXXXX)' : 'Mobile Number'}
                        value={dataEntryInput.phone}
                        onChange={(e) => setDataEntryInput({ ...dataEntryInput, phone: e.target.value })}
                        required
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 bg-slate-50"
                      />
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Icons.Check className="w-4 h-4" />
                        <span>{lang === 'bn' ? 'ডাটা সাবমিট করুন (+৳১৫.০০)' : 'Submit Data Entry (+৳15.00)'}</span>
                      </button>
                    </form>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'bn' ? 'ডাটা এন্ট্রি ভেরিফাইড! ১৫ টাকা ব্যালেন্সে যুক্ত হয়েছে।' : 'Data Entry verified! ৳15.00 credited.'}</span>
                    </div>
                  )}
                </div>
              )}

              {selectedProject.id === 'dw-network-marketing' && (
                <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                    <Icons.Share2 className="w-4 h-4 text-purple-600" />
                    <span>{lang === 'bn' ? 'আপনার রেফারেল লিংক ও কোড' : 'Your Referral Link & Code'}</span>
                  </h4>
                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="font-mono font-bold text-xs text-purple-700 flex-1 truncate">
                      https://unityearning.com/ref/{profile.uid}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`https://unityearning.com/ref/${profile.uid}`);
                        setReferralCopied(true);
                        setTimeout(() => setReferralCopied(false), 2000);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer"
                    >
                      {referralCopied ? (lang === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (lang === 'bn' ? 'কপি করুন' : 'Copy')}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {lang === 'bn' ? 'বন্ধুদের সাথে শেয়ার করে প্রতি কাজে ১৫% আজীবন রেফারেল কমিশন উপভোগ করুন।' : 'Earn 15% lifetime referral bonus from team work.'}
                  </p>
                </div>
              )}

              {genericSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                  <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{genericSuccessMsg}</span>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-200/80 bg-white flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all active:scale-95 cursor-pointer text-center"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>

              <button
                onClick={handleActivateGenericTask}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Icons.ArrowRight className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'কাজ শুরু করুন' : 'Start Project'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
