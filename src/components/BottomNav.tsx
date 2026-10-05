import React from 'react';
import { 
  Home, 
  Briefcase, 
  CalendarCheck, 
  BadgeDollarSign, 
  MessageSquareText, 
  Flame, 
  User 
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
}

export default function BottomNav({ currentTab, setCurrentTab, lang }: BottomNavProps) {
  const tabs = [
    { id: 'home', labelBn: 'হোম', labelEn: 'Home', icon: Home },
    { id: 'work', labelBn: 'কাজ', labelEn: 'Work', icon: Briefcase },
    { id: 'daily-work', labelBn: 'ডেইলি', labelEn: 'Daily', icon: CalendarCheck },
    { id: 'live-tx', labelBn: 'লেনদেন', labelEn: 'Transactions', icon: BadgeDollarSign },
    { id: 'live-chat', labelBn: 'লাইভ চ্যাট', labelEn: 'Live Chat', icon: MessageSquareText },
    { id: 'offers', labelBn: 'অফারস', labelEn: 'Offers', icon: Flame },
    { id: 'profile', labelBn: 'প্রোফাইল', labelEn: 'Profile', icon: User },
  ];

  return (
    <nav 
      aria-label="Bottom Navigation" 
      className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-3px_16px_rgba(15,23,42,0.06)] select-none"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        transform: 'none',
      }}
    >
      <div className="max-w-2xl sm:max-w-3xl mx-auto px-1 sm:px-3 py-1.5 flex items-center justify-between gap-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl cursor-pointer select-none relative transition-colors duration-150 ${
                isActive
                  ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xs shadow-blue-500/25 ring-1 ring-blue-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
              id={`nav-tab-${tab.id}`}
              type="button"
              aria-label={lang === 'bn' ? tab.labelBn : tab.labelEn}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <IconComponent
                  className={`w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 ${
                    isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.id === 'live-chat' && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
                {tab.id === 'offers' && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                )}
              </div>
              <span className={`text-[9px] sm:text-[9.5px] leading-tight mt-1 tracking-tight truncate max-w-full text-center ${
                isActive ? 'text-white font-black' : 'text-slate-600 font-semibold'
              }`}>
                {lang === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
