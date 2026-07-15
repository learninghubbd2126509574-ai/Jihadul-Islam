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
    { id: 'work', labelBn: 'আমার কাজ', labelEn: 'My Work', icon: Briefcase, color: 'violet' },
    { id: 'quiz', labelBn: 'কুইজ', labelEn: 'Quiz', icon: Trophy, color: 'orange' },
    { id: 'daily-work', labelBn: 'ডেইলি ওয়ার্ক', labelEn: 'Daily Work', icon: LayoutGrid, color: 'amber' },
    { id: 'micro', labelBn: 'মাইক্রো টাস্ক', labelEn: 'Micro Job', icon: Zap, color: 'teal' },
    { id: 'shop', labelBn: 'শপ', labelEn: 'Shop', icon: ShoppingBag, color: 'pink' },
    { id: 'profile', labelBn: 'প্রোফাইল', labelEn: 'Profile', icon: User, color: 'emerald' },
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    if (!isActive) return 'text-slate-400 hover:text-slate-600 hover:bg-slate-50';
    switch (color) {
      case 'blue': return 'text-blue-600 font-bold bg-blue-50';
      case 'violet': return 'text-violet-600 font-bold bg-violet-50';
      case 'orange': return 'text-orange-600 font-bold bg-orange-50';
      case 'amber': return 'text-amber-600 font-bold bg-amber-50';
      case 'teal': return 'text-teal-600 font-bold bg-teal-50';
      case 'pink': return 'text-pink-600 font-bold bg-pink-50';
      case 'emerald': return 'text-emerald-600 font-bold bg-emerald-50';
      default: return 'text-blue-600 font-bold bg-blue-50';
    }
  };

  const getIconShadow = (color: string, isActive: boolean) => {
    if (!isActive) return '';
    switch (color) {
      case 'blue': return 'drop-shadow-[0_2px_4px_rgba(37,99,235,0.25)]';
      case 'violet': return 'drop-shadow-[0_2px_4px_rgba(124,58,237,0.25)]';
      case 'orange': return 'drop-shadow-[0_2px_4px_rgba(234,88,12,0.25)]';
      case 'amber': return 'drop-shadow-[0_2px_4px_rgba(217,119,6,0.25)]';
      case 'teal': return 'drop-shadow-[0_2px_4px_rgba(13,148,136,0.25)]';
      case 'pink': return 'drop-shadow-[0_2px_4px_rgba(219,39,119,0.25)]';
      case 'emerald': return 'drop-shadow-[0_2px_4px_rgba(5,150,105,0.25)]';
      default: return 'drop-shadow-[0_2px_4px_rgba(37,99,235,0.25)]';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] rounded-t-2xl">
      <div className="max-w-md mx-auto flex justify-between items-center px-2 h-14">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full rounded-xl transition-all duration-300 ${getColorClasses(tab.color, isActive)}`}
              id={`nav-tab-${tab.id}`}
            >
              <IconComponent
                className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                  isActive ? `stroke-[2.5px] ${getIconShadow(tab.color, isActive)}` : 'stroke-[1.8px]'
                }`}
              />
              <span className="text-[9px] md:text-[10px] leading-tight tracking-tight transition-colors mt-0.5 text-center whitespace-nowrap">
                {lang === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
