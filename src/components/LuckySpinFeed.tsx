import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile, TaskLog } from '../types';

interface LuckySpinFeedProps {
  lang: 'bn' | 'en';
  onBack: () => void;
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog?: (log: TaskLog) => void;
}

interface WheelItem {
  id: number;
  labelBn: string;
  labelEn: string;
  type: 'points' | 'cash' | 'gift' | 'zero';
  amount: number;
  color: string;
  textColor: string;
  iconName: string;
}

const WHEEL_ITEMS: WheelItem[] = [
  { id: 1, labelBn: '৫০ পয়েন্ট', labelEn: '50 Points', type: 'points', amount: 50, color: '#e11d48', textColor: '#ffffff', iconName: 'Coins' },
  { id: 2, labelBn: '৫০ পয়েন্ট', labelEn: '50 Points', type: 'points', amount: 50, color: '#06b6d4', textColor: '#ffffff', iconName: 'Coins' },
  { id: 3, labelBn: 'পাওয়ার ব্যাংক', labelEn: 'Power Bank', type: 'gift', amount: 0, color: '#8b5cf6', textColor: '#ffffff', iconName: 'BatteryCharging' },
  { id: 4, labelBn: '০ টাকা', labelEn: '0 Taka', type: 'zero', amount: 0, color: '#64748b', textColor: '#ffffff', iconName: 'Frown' },
  { id: 5, labelBn: '৳৫০০ টাকা', labelEn: '৳500 Cash', type: 'cash', amount: 500, color: '#f59e0b', textColor: '#ffffff', iconName: 'Gift' },
  { id: 6, labelBn: 'ইয়ারবাডস', labelEn: 'AirBuds', type: 'gift', amount: 0, color: '#6366f1', textColor: '#ffffff', iconName: 'Headphones' },
  { id: 7, labelBn: '৳১০০ টাকা', labelEn: '৳100 Cash', type: 'cash', amount: 100, color: '#10b981', textColor: '#ffffff', iconName: 'Banknote' },
  { id: 8, labelBn: '৫০ পয়েন্ট', labelEn: '50 Points', type: 'points', amount: 50, color: '#0284c7', textColor: '#ffffff', iconName: 'Coins' },
  { id: 9, labelBn: '৳৫০ টাকা', labelEn: '৳50 Cash', type: 'cash', amount: 50, color: '#f43f5e', textColor: '#ffffff', iconName: 'Sparkles' },
  { id: 10, labelBn: '৳১০০ টাকা', labelEn: '৳100 Cash', type: 'cash', amount: 100, color: '#059669', textColor: '#ffffff', iconName: 'Banknote' },
];

export default function LuckySpinFeed({
  lang,
  onBack,
  profile,
  updateProfile,
  addLog,
}: LuckySpinFeedProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [winningItem, setWinningItem] = useState<WheelItem | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  
  // Point exchange state
  const [exchangePoints, setExchangePoints] = useState<number>(100);
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const numSlices = WHEEL_ITEMS.length;
  const sliceAngle = 360 / numSlices;

  // Show temporary toast message
  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => {
      setToastMsg(null);
    }, 4000);
  };

  // Handle spin click
  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinningItem(null);

    // Target index: Per user request, make it land on index 1 or 7 (50 Points!)
    // Let's alternate or select index 1 (50 Points)
    const targetIndex = 1; // Index 1 is WHEEL_ITEMS[1] = "50 Points"
    const targetItem = WHEEL_ITEMS[targetIndex];

    // Calculate rotation angle
    // Each slice is 36 deg. The top pointer is at 270 degrees in SVG circle or 0 deg top.
    // To land on targetIndex, offset angle so top pointer points to target slice.
    const sliceCenterAngle = targetIndex * sliceAngle + sliceAngle / 2;
    // Extra full turns (e.g. 6 turns = 2160 deg) plus offset to place slice center at top (270 deg)
    const extraTurns = 360 * 6;
    const targetDegree = extraTurns + (360 - sliceCenterAngle);

    // Accumulated total rotation to ensure forward spin animation
    const currentRotMod = rotationAngle % 360;
    const finalDegree = rotationAngle + (targetDegree - currentRotMod) + extraTurns;

    setRotationAngle(finalDegree);

    // Wait for spin animation to finish (4.5s)
    setTimeout(() => {
      setIsSpinning(false);
      setWinningItem(targetItem);
      setShowWinModal(true);
    }, 4500);
  };

  const handleClaimReward = () => {
    if (!winningItem) return;

    // Per user request: Task logs and points are fixed and should not be updated by spin.

    triggerToast(
      lang === 'bn'
        ? `অভিনন্দন! আপনার ${winningItem.labelBn} গিফট ক্লেইম সফল হয়েছে!`
        : `Congrats! ${winningItem.labelEn} claimed!`,
      'success'
    );

    setShowWinModal(false);
  };

  // Execute Point Exchange (100 Points = ৳10 Taka)
  const handleExecuteExchange = (pts: number) => {
    const currentPts = profile.points || 3250;
    if (currentPts < pts) {
      triggerToast(
        lang === 'bn'
          ? `দুঃখিত! পয়েন্ট এক্সচেঞ্জ করতে আপনার অন্তত ${pts} পয়েন্ট প্রয়োজন।`
          : `Sorry! You need at least ${pts} points to exchange.`,
        'error'
      );
      return;
    }

    const takaEarned = Math.floor((pts / 100) * 10);
    // Per user request: Points are fixed at 3250 and do not decrease upon exchange
    const newBalance = profile.balance + takaEarned;

    updateProfile({
      balance: newBalance,
      points: 3250,
    });

    triggerToast(
      lang === 'bn'
        ? `সফলভাবে ${pts} পয়েন্ট এক্সচেঞ্জ করে ৳${takaEarned} মেইন ব্যালেন্সে রিডিম করা হয়েছে!`
        : `Successfully exchanged ${pts} points for ৳${takaEarned}!`,
      'success'
    );

    setShowExchangeModal(false);
  };

  // Helper to draw SVG pie slices
  const renderWheelSlices = () => {
    const radius = 180;
    const center = 200;

    return WHEEL_ITEMS.map((item, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      const x1 = center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180);
      const y1 = center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180);
      const x2 = center + radius * Math.cos((Math.PI * (endAngle - 90)) / 180);
      const y2 = center + radius * Math.sin((Math.PI * (endAngle - 90)) / 180);

      const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
      const midAngle = startAngle + sliceAngle / 2;
      const textRadius = 115;
      const textX = center + textRadius * Math.cos((Math.PI * (midAngle - 90)) / 180);
      const textY = center + textRadius * Math.sin((Math.PI * (midAngle - 90)) / 180);

      const IconComp = Icons[item.iconName as keyof typeof Icons] as React.ElementType || Icons.Gift;

      return (
        <g key={item.id}>
          {/* Slice Path */}
          <path
            d={pathData}
            fill={item.color}
            stroke="#ffffff"
            strokeWidth="2.5"
            className="transition-opacity duration-300 hover:opacity-90"
          />

          {/* Label Text & Icon inside slice */}
          <g
            transform={`translate(${textX}, ${textY}) rotate(${midAngle})`}
            className="pointer-events-none select-none"
          >
            <text
              x="0"
              y="-4"
              textAnchor="middle"
              fill={item.textColor}
              fontSize="12"
              fontWeight="900"
              className="font-black drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
            >
              {lang === 'bn' ? item.labelBn : item.labelEn}
            </text>

            <foreignObject x="-10" y="4" width="20" height="20">
              <div className="w-full h-full flex items-center justify-center text-white drop-shadow-md">
                <IconComp className="w-4 h-4" />
              </div>
            </foreignObject>
          </g>
        </g>
      );
    });
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto animate-fade-in">
      {/* Toast Alert */}
      {toastMsg && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-bold flex items-center gap-3 transition-all animate-bounce ${
            toastMsg.type === 'success'
              ? 'bg-emerald-900/95 text-emerald-200 border-emerald-500/50'
              : 'bg-rose-900/95 text-rose-200 border-rose-500/50'
          }`}
        >
          {toastMsg.type === 'success' ? (
            <Icons.CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <Icons.AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 rounded-[1.25rem] p-4 sm:p-5 text-white shadow-md border border-amber-300/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

        <div className="flex items-center justify-between relative z-10 gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-950 bg-white/90 hover:bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-sm transition-all active:scale-95 shrink-0 leading-none"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            <span>{lang === 'bn' ? 'ফিরে যান' : 'Back'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-amber-950/30 text-amber-100 border border-amber-200/40 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase leading-tight">
              <Icons.Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>{lang === 'bn' ? 'লাকি স্পিন' : 'Lucky Spin'}</span>
            </span>
          </div>
        </div>

        <div className="mt-4 relative z-10">
          <h2 className="text-base sm:text-xl font-bold text-amber-950 tracking-tight leading-snug drop-shadow-xs">
            {lang === 'bn' ? 'স্পিন করে জিতে নিন যেকোনো পুরস্কার!' : 'Spin & Win Awesome Prizes!'}
          </h2>
          <p className="text-amber-950/80 text-xs sm:text-sm font-medium mt-1 leading-relaxed">
            {lang === 'bn'
              ? 'প্রতিদিন একটি করে স্পিন করে পয়েন্ট ও আকর্ষণীয় পুরষ্কার সংগ্রহ করুন।'
              : 'Spin once every day to collect points and exciting rewards.'}
          </p>
        </div>
      </div>

      {/* User Points & Balance Info Bar */}
      <div className="bg-slate-900 text-white rounded-[1.25rem] p-4 sm:p-5 border border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md border border-cyan-400/30 shrink-0">
            <Icons.Coins className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
          </div>
          <div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium leading-tight">{lang === 'bn' ? 'আপনার মোট পয়েন্ট' : 'Your Total Points'}</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono tabular-nums tracking-wide flex items-center gap-1.5 leading-snug mt-0.5">
              <span>3250</span>
              <span className="text-xs text-amber-300/80 font-sans font-semibold">{lang === 'bn' ? 'পয়েন্ট (স্থির)' : 'pts (fixed)'}</span>
            </div>
          </div>
        </div>

        {/* Point Exchange Button */}
        <button
          onClick={() => setShowExchangeModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 border border-emerald-400/30 shrink-0 cursor-pointer leading-none"
        >
          <Icons.RefreshCw className="w-4 h-4 text-emerald-200" />
          <span>{lang === 'bn' ? 'পয়েন্ট এক্সচেঞ্জ' : 'Exchange Points'}</span>
        </button>
      </div>

      {/* Lucky Wheel Main Interactive Container */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 rounded-[1.25rem] p-4 sm:p-5 border border-indigo-900/60 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Wheel Frame (Compact Size for mobile responsiveness) */}
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center my-2">
          {/* Top Indicator Arrow / Needle */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-amber-400" />
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full mx-auto -mt-5 border border-amber-200" />
          </div>

          {/* Outer Ring with LED Bulbs */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 p-2.5 shadow-[0_0_25px_rgba(245,158,11,0.4)] border-4 border-amber-300/80 flex items-center justify-center">
            {/* LED Bulbs Around the Rim */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              const r = 132; // scaled radius from center
              const x = r * Math.cos((Math.PI * angle) / 180);
              const y = r * Math.sin((Math.PI * angle) / 180);
              return (
                <div
                  key={i}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className={`absolute w-2.5 h-2.5 rounded-full border border-white shadow-md ${
                    i % 2 === 0 ? 'bg-yellow-300 animate-pulse' : 'bg-red-500'
                  }`}
                />
              );
            })}
          </div>

          {/* Rotating SVG Wheel */}
          <div
            className="w-full h-full relative z-10 rounded-full overflow-hidden shadow-inner"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              transition: isSpinning
                ? 'transform 4.5s cubic-bezier(0.15, 0.85, 0.25, 1)'
                : 'none',
            }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {renderWheelSlices()}
            </svg>
          </div>

          {/* Center SPIN Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`absolute z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 border-4 border-white shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_2px_2px_5px_rgba(255,255,255,0.8)] flex flex-col items-center justify-center text-amber-950 font-black cursor-pointer transition-transform duration-200 active:scale-90 ${
              isSpinning ? 'opacity-80 cursor-not-allowed scale-95' : 'hover:scale-105'
            }`}
          >
            <Icons.RotateCw
              className={`w-5 h-5 text-amber-950 ${isSpinning ? 'animate-spin' : ''}`}
            />
            <span className="text-[11px] sm:text-xs font-black tracking-tight">
              {isSpinning ? 'ঘুরছে...' : 'স্পিন'}
            </span>
          </button>
        </div>

        {/* Spin Rule Footer Note */}
        <div className="mt-4 text-center max-w-sm">
          <p className="text-xs text-slate-300 font-medium bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/60 inline-flex items-center gap-2">
            <Icons.Info className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>{lang === 'bn' ? 'প্রতিদিন ১টি ফ্রি স্পিন পাবেন' : '1 Free Spin Available Daily'}</span>
          </p>
        </div>
      </div>

      {/* Prize List Grid Showcase */}
      <div className="bg-slate-900 rounded-[1.25rem] p-4 sm:p-5 border border-slate-800 shadow-lg">
        <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          <Icons.Award className="w-4 h-4 text-amber-400" />
          <span>{lang === 'bn' ? 'স্পিন পুরষ্কারের তালিকা (১০টি আইটেম)' : 'Spin Reward Items (10 Items)'}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {WHEEL_ITEMS.map((item) => {
            const IconComp = Icons[item.iconName as keyof typeof Icons] as React.ElementType || Icons.Gift;
            return (
              <div
                key={item.id}
                className="bg-slate-800/90 border border-slate-700/60 p-2.5 rounded-2xl flex flex-col items-center text-center shadow-xs"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white mb-1.5 shadow-xs"
                  style={{ backgroundColor: item.color }}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-200">
                  {lang === 'bn' ? item.labelBn : item.labelEn}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Winning Celebration Modal */}
      {showWinModal && winningItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-400/80 rounded-[1.25rem] p-4 sm:p-6 max-w-md w-full text-center relative shadow-[0_0_50px_rgba(245,158,11,0.4)] animate-scale-up">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl border-4 border-amber-200 animate-bounce">
              <Icons.Trophy className="w-8 h-8 text-amber-950" />
            </div>

            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-1.5 leading-none">
              🎉 {lang === 'bn' ? 'বিজয়ী পুরষ্কার' : 'Winning Reward'}
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-snug">
              {lang === 'bn' ? 'অভিনন্দন!' : 'Congratulations!'}
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm mb-3.5 font-medium leading-relaxed">
              {lang === 'bn'
                ? `আপনি স্পিন করে পেয়েছেন:`
                : `You spun and won:`}
            </p>

            <div className="bg-amber-500/10 border-2 border-amber-400/40 rounded-xl p-3.5 mb-5 text-amber-300 font-bold text-xl flex items-center justify-center gap-2">
              <Icons.Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span>{lang === 'bn' ? winningItem.labelBn : winningItem.labelEn}</span>
            </div>

            <button
              onClick={handleClaimReward}
              className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-amber-950 font-bold py-3 rounded-xl text-sm shadow-xl transition-all active:scale-95 border border-yellow-200 cursor-pointer leading-none"
            >
              {lang === 'bn' ? 'পুরষ্কার সংগ্রহ করুন' : 'Collect Reward'}
            </button>
          </div>
        </div>
      )}

      {/* Point Exchange Modal */}
      {showExchangeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-[1.25rem] p-4 sm:p-6 max-w-md w-full relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowExchangeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-xl transition-all cursor-pointer"
            >
              <Icons.X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Icons.RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  {lang === 'bn' ? 'পয়েন্ট এক্সচেঞ্জ করুন' : 'Exchange Points'}
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-tight">
                  {lang === 'bn' ? '১০০ পয়েন্ট = ৳১০ টাকা মেইন ব্যালেন্স' : '100 Points = ৳10 Taka Main Balance'}
                </p>
              </div>
            </div>

            {/* Current Balance & Points */}
            <div className="bg-slate-800/90 rounded-xl p-3.5 border border-slate-700/70 mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block leading-tight">{lang === 'bn' ? 'অবশিষ্ট পয়েন্ট' : 'Available Points'}</span>
                <span className="text-base sm:text-lg font-bold text-amber-400 font-mono tabular-nums leading-snug">
                  3250 {lang === 'bn' ? 'পয়েন্ট (স্থির)' : 'pts (fixed)'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block leading-tight">{lang === 'bn' ? 'বর্তমান ব্যালেন্স' : 'Current Balance'}</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono tabular-nums leading-snug">
                  ৳{profile.balance}
                </span>
              </div>
            </div>

            {/* Exchange Option Quick Cards */}
            <div className="space-y-2.5 mb-5">
              <label className="text-xs font-bold text-slate-300 block leading-tight">
                {lang === 'bn' ? 'পয়েন্ট এক্সচেঞ্জ প্যাকেজ বেছে নিন:' : 'Select Point Exchange Package:'}
              </label>

              {[
                { pts: 100, taka: 10 },
                { pts: 200, taka: 20 },
                { pts: 500, taka: 50 },
                { pts: 1000, taka: 100 },
              ].map((pkg) => (
                <div
                  key={pkg.pts}
                  onClick={() => setExchangePoints(pkg.pts)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    exchangePoints === pkg.pts
                      ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icons.Coins className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-xs sm:text-sm">
                      {pkg.pts} {lang === 'bn' ? 'পয়েন্ট' : 'Points'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-400 text-xs sm:text-sm tabular-nums">
                      ৳{pkg.taka} {lang === 'bn' ? 'টাকা' : 'Taka'}
                    </span>
                    <input
                      type="radio"
                      checked={exchangePoints === pkg.pts}
                      onChange={() => setExchangePoints(pkg.pts)}
                      className="accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleExecuteExchange(exchangePoints)}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-lg transition-all active:scale-95 border border-emerald-400/30 flex items-center justify-center gap-2 cursor-pointer leading-none"
            >
              <Icons.CheckCircle2 className="w-4 h-4" />
              <span>
                {lang === 'bn'
                  ? `${exchangePoints} পয়েন্ট দিয়ে ৳${Math.floor((exchangePoints / 100) * 10)} টাকা রিডিম করুন`
                  : `Redeem ${exchangePoints} pts for ৳${Math.floor((exchangePoints / 100) * 10)}`}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
