import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import LikeEarningFeed from './LikeEarningFeed';

interface DailyWorkTabProps {
  lang: 'bn' | 'en';
}

export default function DailyWorkTab({ lang }: DailyWorkTabProps) {
  const [activeSubTaskId, setActiveSubTaskId] = useState<string | null>(null);

  if (activeSubTaskId === 'dw-like-earning') {
    return <LikeEarningFeed lang={lang} onBack={() => setActiveSubTaskId(null)} />;
  }

  return (
    <div className="space-y-6">
      {!activeSubTaskId ? (
        <div className="bg-blue-600 rounded-3xl p-6 shadow-xl relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/5 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <Icons.Layers className="w-8 h-8 text-white" />
            <h2 className="text-xl md:text-2xl font-black text-white">
              {lang === 'bn' ? 'আমাদের প্রজেক্ট সমূহ' : 'Our Projects'}
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-2 relative z-10">
            {[
              { id: 'dw-like-earning', nameEn: 'Like Earning', nameBn: 'লাইক আর্নিং', icon: 'Heart', color: 'text-rose-500' },
              { id: 'dw-mobile-recharge', nameEn: 'Mobile Recharge', nameBn: 'মোবাইল রিচার্জ', icon: 'Smartphone', color: 'text-blue-500' },
              { id: 'dw-drive-offer', nameEn: 'Drive Offer', nameBn: 'ড্রাইভ অফার', icon: 'Radio', color: 'text-teal-500' },
              { id: 'dw-online-shop', nameEn: 'Online Shop', nameBn: 'অনলাইন শপ', icon: 'ShoppingCart', color: 'text-emerald-500' },
              { id: 'dw-ads-view', nameEn: 'Ads View', nameBn: 'এডস ভিউ', icon: 'Video', color: 'text-rose-500' },
              { id: 'dw-micro-job', nameEn: 'Micro Job', nameBn: 'মাইক্রো জব', icon: 'ListChecks', color: 'text-blue-600' },
              { id: 'dw-job-post', nameEn: 'Job Post', nameBn: 'জব পোস্ট', icon: 'Upload', color: 'text-orange-500' },
              { id: 'dw-social-marketing', nameEn: 'Social Marketing', nameBn: 'সোশ্যাল মিডিয়া মার্কেটিং', icon: 'Store', color: 'text-purple-500' },
              { id: 'dw-smart-earning', nameEn: 'Smart Earning', nameBn: 'স্মার্ট আর্নিং', icon: 'Wallet', color: 'text-teal-600' },
              { id: 'dw-learning-earning', nameEn: 'Learning & Earning', nameBn: 'লার্নিং & আর্নিং', icon: 'BookOpen', color: 'text-slate-600' },
              { id: 'dw-leadership', nameEn: 'Leadership', nameBn: 'লিডারশিপ', icon: 'Trophy', color: 'text-yellow-500' },
              { id: 'dw-target-bonus', nameEn: 'Target Bonus', nameBn: 'টার্গেট বোনাস', icon: 'Target', color: 'text-indigo-500' },
              { id: 'dw-monthly-salary', nameEn: 'Monthly Salary', nameBn: 'মাসিক বেতন', icon: 'Coins', color: 'text-green-600' },
              { id: 'dw-quran-education', nameEn: 'Quran Education', nameBn: 'কোরআন শিক্ষা', icon: 'Book', color: 'text-emerald-600' },
              { id: 'dw-football-game', nameEn: 'Football Game', nameBn: 'ফুটবল খেলা', icon: 'Gamepad2', color: 'text-indigo-600' },
            ].map((item) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons] as React.ElementType;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveSubTaskId(item.id)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-all duration-300 relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <IconComponent className={`w-7 h-7 md:w-8 md:h-8 ${item.color}`} />
                  </div>
                  <span className="text-white text-[11px] md:text-xs font-semibold text-center leading-tight">
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
