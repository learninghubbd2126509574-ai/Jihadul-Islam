import React from 'react';
import { Home as HomeIcon, Briefcase, ShoppingBag, Zap, User, Trophy } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
}

export default function BottomNav({ currentTab, setCurrentTab, lang }: BottomNavProps) {
  const tabs = [
    { id: 'home', labelBn: 'হোম', labelEn: 'Home', icon: HomeIcon },
    { id: 'work', labelBn: 'আমার কাজ', labelEn: 'My Work', icon: Briefcase },
    { id: 'quiz', labelBn: 'কুইজ', labelEn: 'Quiz', icon: Trophy },
    { id: 'micro', labelBn: 'মাইক্রো টাস্ক', labelEn: 'Micro Job', icon: Zap },
    { id: 'shop', labelBn: 'শপ', labelEn: 'Shop', icon: ShoppingBag },
    { id: 'profile', labelBn: 'প্রোফাইল', labelEn: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto flex justify-between items-center px-4 py-2">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-blue-600 font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              id={`nav-tab-${tab.id}`}
            >
              <IconComponent
                className={`w-5 h-5 mb-1 transition-transform duration-300 ${
                  isActive ? 'stroke-[2.5px] drop-shadow-[0_2px_4px_rgba(37,99,235,0.2)]' : 'stroke-[1.8px]'
                }`}
              />
              <span className="text-[10px] md:text-xs tracking-tight transition-colors">
                {lang === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
