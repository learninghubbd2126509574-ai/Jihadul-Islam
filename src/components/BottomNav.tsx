import React from 'react';
import { Home as HomeIcon, Briefcase, ShoppingBag, Zap, User, Trophy, Award, LayoutGrid } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
}

export default function BottomNav({ currentTab, setCurrentTab, lang }: BottomNavProps) {
  const tabs = [
    { id: 'home', labelBn: 'হোম', labelEn: 'Home', icon: HomeIcon, color: 'blue' },
    { id: 'work', labelBn: 'কাজ', labelEn: 'Work', icon: Briefcase, color: 'violet' },
    { id: 'quiz', labelBn: 'কুইজ', labelEn: 'Quiz', icon: Trophy, color: 'orange' },
    { id: 'daily-work', labelBn: 'ডেইলি', labelEn: 'Daily', icon: LayoutGrid, color: 'amber' },
    { id: 'micro', labelBn: 'মাইক্রো', labelEn: 'Micro', icon: Zap, color: 'teal' },
    { id: 'shop', labelBn: 'শপ', labelEn: 'Shop', icon: ShoppingBag, color: 'pink' },
    { id: 'profile', labelBn: 'প্রোফাইল', labelEn: 'Profile', icon: User, color: 'emerald' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-2 pt-1">
      <div className="max-w-md mx-auto clay-nav px-2 py-1.5 flex justify-around items-center rounded-2xl bg-white/95 backdrop-blur-md border border-blue-100 shadow-[0_8px_20px_rgba(59,130,246,0.12),inset_0_2px_4px_rgba(255,255,255,0.9)]">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-[0_4px_10px_rgba(37,99,235,0.35),inset_-1px_-1px_2px_rgba(0,0,0,0.2),inset_1px_1px_2px_rgba(255,255,255,0.4)] scale-105'
                  : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
              id={`nav-tab-${tab.id}`}
            >
              <IconComponent
                className={`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-all ${
                  isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'
                }`}
              />
              <span className={`text-[9px] md:text-[10px] leading-tight font-medium mt-0.5 whitespace-nowrap ${
                isActive ? 'text-white font-bold' : 'text-slate-500'
              }`}>
                {lang === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
