import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import LikeEarningFeed from './LikeEarningFeed';
import LuckySpinFeed from './LuckySpinFeed';
import { UserProfile, TaskLog } from '../types';

interface DailyWorkTabProps {
  lang: 'bn' | 'en';
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog?: (log: TaskLog) => void;
}

export default function DailyWorkTab({ lang, profile, updateProfile, addLog }: DailyWorkTabProps) {
  const [activeSubTaskId, setActiveSubTaskId] = useState<string | null>(null);

  if (activeSubTaskId === 'dw-like-earning') {
    return <LikeEarningFeed lang={lang} onBack={() => setActiveSubTaskId(null)} />;
  }

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

  const projects = [
    { id: 'dw-like-earning', nameEn: 'Like Earning', nameBn: 'লাইক আর্নিং', icon: 'Heart', color: 'text-rose-500 fill-rose-500/20', bgGradient: 'from-rose-50 to-pink-100/80', borderColor: 'border-rose-200/70', badge: 'হট' },
    { id: 'dw-lucky-spin', nameEn: 'Lucky Spin', nameBn: 'লাকি স্পিন', icon: 'Dices', color: 'text-amber-500 fill-amber-500/20', bgGradient: 'from-amber-50 to-yellow-100/80', borderColor: 'border-amber-200/70', badge: 'বিজয়ী' },
    { id: 'dw-mobile-recharge', nameEn: 'Mobile Recharge', nameBn: 'মোবাইল রিচার্জ', icon: 'Smartphone', color: 'text-blue-600', bgGradient: 'from-blue-50 to-sky-100/80', borderColor: 'border-blue-200/70' },
    { id: 'dw-drive-offer', nameEn: 'Drive Offer', nameBn: 'ড্রাইভ অফার', icon: 'Radio', color: 'text-purple-600', bgGradient: 'from-purple-50 to-indigo-100/80', borderColor: 'border-purple-200/70', badge: 'অফার' },
    { id: 'dw-online-shop', nameEn: 'Online Shop', nameBn: 'অনলাইন শপ', icon: 'ShoppingCart', color: 'text-emerald-600', bgGradient: 'from-emerald-50 to-teal-100/80', borderColor: 'border-emerald-200/70' },
    { id: 'dw-ads-view', nameEn: 'Ads View', nameBn: 'এডস ভিউ', icon: 'Video', color: 'text-red-600 fill-red-500/10', bgGradient: 'from-red-50 to-rose-100/80', borderColor: 'border-red-200/70' },
    { id: 'dw-micro-job', nameEn: 'Micro Job', nameBn: 'মাইক্রো জব', icon: 'ListChecks', color: 'text-cyan-600', bgGradient: 'from-cyan-50 to-blue-100/80', borderColor: 'border-cyan-200/70', badge: 'জনপ্রিয়' },
    { id: 'dw-job-post', nameEn: 'Job Post', nameBn: 'জব পোস্ট', icon: 'Upload', color: 'text-orange-600', bgGradient: 'from-orange-50 to-amber-100/80', borderColor: 'border-orange-200/70' },
    { id: 'dw-social-marketing', nameEn: 'Social Marketing', nameBn: 'সোশ্যাল মার্কেটিং', icon: 'Store', color: 'text-violet-600', bgGradient: 'from-violet-50 to-fuchsia-100/80', borderColor: 'border-violet-200/70' },
    { id: 'dw-smart-earning', nameEn: 'Smart Earning', nameBn: 'স্মার্ট আর্নিং', icon: 'Wallet', color: 'text-teal-600', bgGradient: 'from-teal-50 to-emerald-100/80', borderColor: 'border-teal-200/70' },
    { id: 'dw-learning-earning', nameEn: 'Learning & Earning', nameBn: 'লার্নিং & আর্নিং', icon: 'BookOpen', color: 'text-sky-600', bgGradient: 'from-sky-50 to-blue-100/80', borderColor: 'border-sky-200/70' },
    { id: 'dw-leadership', nameEn: 'Leadership', nameBn: 'লিডারশিপ', icon: 'Trophy', color: 'text-amber-500 fill-amber-500/20', bgGradient: 'from-amber-50 to-yellow-100/80', borderColor: 'border-amber-200/70' },
    { id: 'dw-target-bonus', nameEn: 'Target Bonus', nameBn: 'টার্গেট বোনাস', icon: 'Target', color: 'text-fuchsia-600', bgGradient: 'from-fuchsia-50 to-pink-100/80', borderColor: 'border-fuchsia-200/70', badge: 'বোনাস' },
    { id: 'dw-monthly-salary', nameEn: 'Monthly Salary', nameBn: 'মাসিক বেতন', icon: 'Coins', color: 'text-green-600', bgGradient: 'from-green-50 to-emerald-100/80', borderColor: 'border-green-200/70' },
    { id: 'dw-quran-education', nameEn: 'Quran Education', nameBn: 'কোরআন শিক্ষা', icon: 'Book', color: 'text-emerald-700', bgGradient: 'from-emerald-50 to-teal-100/80', borderColor: 'border-emerald-200/70' },
    { id: 'dw-football-game', nameEn: 'Football Game', nameBn: 'ফুটবল খেলা', icon: 'Gamepad2', color: 'text-indigo-600', bgGradient: 'from-indigo-50 to-violet-100/80', borderColor: 'border-indigo-200/70' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {!activeSubTaskId ? (
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-5 md:p-6 shadow-[0_12px_30px_rgba(37,99,235,0.35),inset_0_2px_4px_rgba(255,255,255,0.35)] border border-blue-400/40 relative overflow-hidden animate-fade-in">
          {/* Ambient Clay Glow Effects */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-900/30 rounded-full blur-2xl pointer-events-none -ml-12 -mb-12" />
          
          {/* Title Header */}
          <div className="flex items-center justify-between mb-6 relative z-10 border-b border-blue-400/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(0,0,0,0.15)] border border-white/30">
                <Icons.Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight drop-shadow-sm">
                  {lang === 'bn' ? 'আমাদের প্রজেক্ট সমূহ' : 'Our Projects'}
                </h2>
                <p className="text-blue-100 text-xs mt-0.5">
                  {lang === 'bn' ? 'পছন্দের প্রজেক্ট সিলেক্ট করে কাজ শুরু করুন' : 'Select a project to start working'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-blue-900 bg-white/90 px-3 py-1 rounded-full shadow-sm">
              {lang === 'bn' ? '১৫টি প্রজেক্ট' : '15 Projects'}
            </span>
          </div>

          {/* Grid of Clay Project Cards */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4 relative z-10">
            {projects.map((item) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons] as React.ElementType;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveSubTaskId(item.id)}
                  className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl bg-white cursor-pointer group transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-[4px_6px_14px_rgba(0,0,0,0.15),-2px_-2px_8px_rgba(255,255,255,0.4),inset_2px_2px_3px_rgba(255,255,255,0.9),inset_-2px_-2px_4px_rgba(0,0,0,0.03)] border border-white/80 relative"
                >
                  {/* Badge if available */}
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-1.5 text-[9px] font-extrabold text-white bg-gradient-to-r from-rose-500 to-red-600 px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
                      {item.badge}
                    </span>
                  )}

                  {/* Icon Circle */}
                  <div className={`w-13 h-13 md:w-15 md:h-15 rounded-2xl bg-gradient-to-br ${item.bgGradient} flex items-center justify-center shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.06),inset_2px_2px_4px_rgba(255,255,255,0.95),0_4px_10px_rgba(0,0,0,0.05)] border ${item.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 md:w-7 md:h-7 ${item.color} drop-shadow-xs`} />
                  </div>

                  {/* Title */}
                  <span className="text-slate-800 text-[11px] md:text-xs font-bold text-center leading-tight mt-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {lang === 'bn' ? item.nameBn : item.nameEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden min-h-[300px]">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-5 shadow-sm">
            <Icons.Settings className="w-10 h-10 animate-spin-slow" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">
            {lang === 'bn' ? 'প্রজেক্টটি প্রক্রিয়াধীন আছে' : 'Project Under Maintenance'}
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
            {lang === 'bn' 
              ? 'এই সার্ভিসটির কাজ বর্তমানে মেইনটেনেন্স এবং আপডেটের অধীনে আছে। অনুগ্রহ করে পরবর্তী আপডেটের জন্য অপেক্ষা করুন।' 
              : 'This specific service module is currently undergoing updates and maintenance. Please check back later.'}
          </p>
          
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setActiveSubTaskId(null)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all active:scale-95"
            >
              {lang === 'bn' ? 'ফিরে যান' : 'Go Back'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
