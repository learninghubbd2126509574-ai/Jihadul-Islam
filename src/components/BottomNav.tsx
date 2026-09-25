import React from 'react';
import { Home as HomeIcon, Briefcase, ShoppingBag, Zap, User, Trophy, LayoutGrid } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
}

export default function BottomNav({ currentTab, setCurrentTab, lang }: BottomNavProps) {
  const tabs = [
    { id: 'home', labelBn: 'হোম', labelEn: 'Home', icon: HomeIcon },
    { id: 'work', labelBn: 'কাজ', labelEn: 'Work', icon: Briefcase },
    { id: 'quiz', labelBn: 'কুইজ', labelEn: 'Quiz', icon: Trophy },
    { id: 'daily-work', labelBn: 'ডেইলি', labelEn: 'Daily', icon: LayoutGrid },
    { id: 'micro', labelBn: 'মাইক্রো', labelEn: 'Micro', icon: Zap },
    { id: 'shop', labelBn: 'শপ', labelEn: 'Shop', icon: ShoppingBag },
    { id: 'profile', labelBn: 'প্রোফাইল', labelEn: 'Profile', icon: User },
  ];

  return (
    <nav 
      aria-label="Bottom Navigation" 
      className="fixed bottom-0 left-0 right-0 z-40 px-2 sm:px-4 pb-safe pt-1 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-md sm:max-w-lg mx-auto clay-nav px-1.5 py-1.5 flex items-center justify-between rounded-[1.25rem] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 font-medium'
              }`}
              id={`nav-tab-${tab.id}`}
              type="button"
              aria-label={lang === 'bn' ? tab.labelBn : tab.labelEn}
              aria-current={isActive ? 'page' : undefined}
            >
              <IconComponent
                className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transition-transform ${
                  isActive ? 'scale-105 stroke-[2.4px]' : 'stroke-[1.8px]'
                }`}
              />
              <span className={`text-[9.5px] sm:text-[10px] leading-tight mt-0.5 tracking-tight truncate max-w-full text-center ${
                isActive ? 'text-white font-bold' : 'text-slate-600 font-medium'
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
