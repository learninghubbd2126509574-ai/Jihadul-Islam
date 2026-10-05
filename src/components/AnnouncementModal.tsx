import React from 'react';
import * as Icons from 'lucide-react';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'bn' | 'en';
}

export default function AnnouncementModal({ isOpen, onClose, lang = 'bn' }: AnnouncementModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in select-none">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Shorter, Compact Modal Container */}
      <div className="relative z-10 bg-white rounded-2xl sm:rounded-3xl max-w-sm sm:max-w-md w-full shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[84vh] animate-scale-up">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-slate-100 bg-slate-50/90">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base">🎉</span>
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight leading-tight">
              {lang === 'bn' ? 'Unity Earning এ স্বাগতম!' : 'Welcome to Unity Earning!'}
            </h3>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-7 h-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
            aria-label="Close Announcement"
          >
            <Icons.X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Compact Scrollable Content */}
        <div className="p-3 sm:p-3.5 overflow-y-auto space-y-2.5 text-slate-800 text-xs">
          
          {/* Official Promo Banner Image */}
          <div className="w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-xs bg-slate-950 relative aspect-[16/9]">
            <img
              src="/unity_banner_promo.jpg"
              alt="Unity Earning Promo Banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/unity_earning_logo.jpg';
              }}
            />
            <div className="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              🔥 20% EXTRA
            </div>
          </div>

          {/* 20% Extra Commission Box */}
          <div className="bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/5 border border-amber-300/80 p-2.5 rounded-xl space-y-0.5 text-slate-900">
            <div className="flex items-center justify-between gap-1">
              <span className="text-amber-900 font-extrabold text-[11px] sm:text-xs flex items-center gap-1">
                <span>🚀</span>
                <span>{lang === 'bn' ? 'শিখুন | আয় করুন | বৃদ্ধি করুন' : 'Learn | Earn | Grow'}</span>
              </span>
              <span className="bg-rose-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded uppercase">
                {lang === 'bn' ? 'লিমিটেড অফার' : 'Limited'}
              </span>
            </div>
            <div className="text-amber-900 font-black text-xs sm:text-sm">
              {lang === 'bn' ? '🔥 ২০% এক্সট্রা কমিশন বিশেষ অফার!' : '🔥 20% Extra Commission Special Offer!'}
            </div>
          </div>

          {/* Offer Details */}
          <div className="space-y-1 text-xs leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200/90 text-slate-700">
            <p className="font-bold text-slate-900 flex items-center gap-1 text-[11.5px]">
              <span className="text-blue-600">📢</span>
              <span>{lang === 'bn' ? 'টানা ৪ দিন বিশেষ অফার চলছে!' : 'Special 4-Day Bonus Active!'}</span>
            </p>
            <p className="text-slate-600 text-[11px] leading-normal">
              {lang === 'bn'
                ? 'ইমেইল সেলিং এবং টাইপিং জবে পাচ্ছেন ২০% এক্সট্রা কমিশন। এখনই কাজ শুরু করুন।'
                : 'Get 20% extra commission on Email Selling & Typing jobs. Start working now.'}
            </p>
          </div>

          {/* Quick Links & Info row */}
          <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
            <div className="bg-blue-50/70 border border-blue-200/70 p-2 rounded-lg flex items-center gap-1.5 font-bold text-blue-900">
              <span>💰</span>
              <span className="truncate">{lang === 'bn' ? '৩০+ ভেরিফাইড প্রজেক্ট' : '30+ Verified Projects'}</span>
            </div>
            <a
              href="https://unityearning.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200/70 p-2 rounded-lg flex items-center gap-1.5 font-bold text-emerald-900 truncate"
            >
              <Icons.Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">unityearning.com</span>
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-3.5 py-2.5 border-t border-slate-100 bg-slate-50/90 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 font-bold text-xs px-2.5 py-1.5 rounded-lg cursor-pointer hover:bg-slate-200/60 transition-colors"
          >
            {lang === 'bn' ? 'আজকের জন্য বন্ধ' : 'Skip for today'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-black text-xs sm:text-sm px-5 py-2 rounded-xl shadow-xs cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Icons.Check className="w-4 h-4" />
            <span>{lang === 'bn' ? 'ঠিক আছে' : 'Close'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
