import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface GiftOfferWidgetProps {
  lang: 'bn' | 'en';
  onStartWork?: () => void;
}

// 3D Isometric Golden Gift Box with Glossy Red Bow matching user reference photo
export const LuxuryGiftBox3D = () => (
  <svg viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-18 h-18 sm:w-20 sm:h-20 select-none overflow-visible drop-shadow-xl cursor-pointer">
    <style>{`
      @keyframes boxFloating {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
        }
        30% {
          transform: translateY(-6px) rotate(-2deg);
        }
        70% {
          transform: translateY(-2px) rotate(1.5deg);
        }
      }

      @keyframes lidLifting {
        0%, 26% {
          transform: translate(0px, 0px) rotate(0deg);
        }
        38% {
          transform: translate(-4px, -18px) rotate(-24deg);
        }
        64% {
          transform: translate(-4px, -18px) rotate(-24deg);
        }
        74% {
          transform: translate(0px, 0px) rotate(0deg);
        }
        78% {
          transform: translate(0px, 2px) scale(1.02, 0.98);
        }
        84%, 100% {
          transform: translate(0px, 0px) scale(1, 1);
        }
      }

      @keyframes giftGlowBurst {
        0%, 26% {
          opacity: 0;
          transform: translateY(10px) scale(0.5);
        }
        38% {
          opacity: 1;
          transform: translateY(-8px) scale(1.05);
        }
        52% {
          transform: translateY(-12px) scale(1.1);
        }
        62% {
          opacity: 1;
          transform: translateY(-9px) scale(1.02);
        }
        72% {
          opacity: 0;
          transform: translateY(4px) scale(0.6);
        }
        100% {
          opacity: 0;
          transform: translateY(10px) scale(0.5);
        }
      }

      .anim-gift-float {
        animation: boxFloating 3.2s ease-in-out infinite;
        transform-origin: 55px 85px;
      }

      .anim-gift-lid {
        animation: lidLifting 3.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        transform-origin: 22px 35px;
      }

      .anim-glow-burst {
        animation: giftGlowBurst 3.2s ease-in-out infinite;
        transform-origin: 55px 45px;
      }
    `}</style>

    <defs>
      {/* Background Ambient Aura */}
      <radialGradient id="box-aura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
        <stop offset="60%" stopColor="#ef4444" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>

      {/* Box Face Gradients - Golden Yellow (Matches Reference) */}
      <linearGradient id="gold-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
      <linearGradient id="gold-left" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="60%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="gold-right" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="60%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>

      {/* Red Ribbon Gradients (Vibrant Ruby & Glossy Highlight) */}
      <linearGradient id="ribbon-red-left" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="ribbon-red-right" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="50%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      <linearGradient id="bow-red" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="35%" stopColor="#ef4444" />
        <stop offset="80%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>

      {/* Gold Coin / Surprise Glow */}
      <radialGradient id="inner-burst" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#facc15" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="coin-gold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="35%" stopColor="#fef08a" />
        <stop offset="70%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>

      {/* 3D Drop Shadow */}
      <filter id="box-3d-shadow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#1e1b4b" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Ambient Glow */}
    <circle cx="55" cy="55" r="50" fill="url(#box-aura)" />

    {/* Entire Floating Gift Box (Animates gently up and down) */}
    <g className="anim-gift-float" filter="url(#box-3d-shadow)">

      {/* Inner Box Opening (Dark cavity visible when lid lifts) */}
      <g transform="translate(55, 47)">
        <polygon points="0,-12 28,-1 0,10 -28,-1" fill="#451a03" />
      </g>

      {/* Surprise Burst from open box: Golden Light Rays & Shiny Coins */}
      <g className="anim-glow-burst">
        <ellipse cx="55" cy="38" rx="26" ry="16" fill="url(#inner-burst)" />
        {/* Floating Gold Coin with $ symbol */}
        <g transform="translate(48, 18)">
          <ellipse cx="7" cy="7" rx="7" ry="7" fill="#854d0e" />
          <circle cx="7" cy="6.2" r="6.5" fill="url(#coin-gold)" stroke="#fef08a" strokeWidth="0.8" />
          <text x="7" y="9.2" fontSize="7.5" fontWeight="900" fill="#78350f" textAnchor="middle" fontFamily="sans-serif">$</text>
        </g>
        {/* Floating Sparkle Stars */}
        <polygon points="28,24 29.5,27.5 33,28.5 29.5,29.5 28,33 26.5,29.5 23,28.5 26.5,27.5" fill="#fef08a" />
        <polygon points="80,22 81.5,25.5 85,26.5 81.5,27.5 80,31 78.5,27.5 75,26.5 78.5,25.5" fill="#fef08a" />
        <circle cx="39" cy="18" r="1.5" fill="#ffffff" />
        <circle cx="71" cy="17" r="1.8" fill="#ffffff" />
      </g>

      {/* 3D Isometric Golden Box Base Body */}
      <g>
        {/* Left Side Face (Amber Gradient) */}
        <polygon points="25,48 55,60 55,87 25,75" fill="url(#gold-left)" stroke="#b45309" strokeWidth="0.6" />
        {/* Left Face Red Ribbon (Vertical band down center of left face) */}
        <polygon points="37,53 43,55.4 43,82.4 37,80" fill="url(#ribbon-red-left)" />

        {/* Right Side Face (Deeper Amber/Bronze Gradient) */}
        <polygon points="55,60 85,48 85,75 55,87" fill="url(#gold-right)" stroke="#92400e" strokeWidth="0.6" />
        {/* Right Face Red Ribbon (Vertical band down center of right face) */}
        <polygon points="67,55.4 73,53 73,80 67,82.4" fill="url(#ribbon-red-right)" />

        {/* Bottom Seam Corner Highlight */}
        <line x1="55" y1="60" x2="55" y2="87" stroke="#fbbf24" strokeWidth="0.8" opacity="0.4" />
      </g>

      {/* 3D Isometric Golden Lid + Big Red Bow (Animates Opening and Closing) */}
      <g className="anim-gift-lid">
        {/* Lid Lip / Overhang Rim Left */}
        <polygon points="22,43 55,56 55,63 22,50" fill="#d97706" stroke="#b45309" strokeWidth="0.6" />
        {/* Left Rim Red Ribbon */}
        <polygon points="35,48.2 42,50.8 42,57.8 35,55.2" fill="url(#ribbon-red-left)" />

        {/* Lid Lip / Overhang Rim Right */}
        <polygon points="55,56 88,43 88,50 55,63" fill="#b45309" stroke="#92400e" strokeWidth="0.6" />
        {/* Right Rim Red Ribbon */}
        <polygon points="68,50.8 75,48.2 75,55.2 68,57.8" fill="url(#ribbon-red-right)" />

        {/* Lid Top Diamond Face (Bright Golden Yellow) */}
        <polygon points="55,30 88,43 55,56 22,43" fill="url(#gold-top)" stroke="#fef08a" strokeWidth="0.8" />

        {/* Diagonal Crossed Red Ribbons on Top Face */}
        {/* Ribbon 1: Upper-left to Lower-right */}
        <polygon points="35,35 41,32.5 75,51 69,53.5" fill="url(#ribbon-red-left)" />
        {/* Ribbon 2: Upper-right to Lower-left */}
        <polygon points="69,32.5 75,35 41,53.5 35,51" fill="url(#ribbon-red-right)" />

        {/* --- BIG 3D GLOSSY RED BOW (Matches user reference photo exactly) --- */}
        <g transform="translate(0, 0)">
          {/* Left Bow Loop */}
          <path
            d="M55,35 C48,22 30,16 31,31 C31,39 46,41 55,35 Z"
            fill="url(#bow-red)"
            stroke="#b91c1c"
            strokeWidth="0.8"
          />
          {/* Big White Specular Glossy Highlight on Left Loop (Key Reference Detail!) */}
          <path
            d="M34,25 C33,21 40,20 44,24 C45,26 43,28 37,28 C34,28 34,26 34,25 Z"
            fill="#ffffff"
            opacity="0.92"
          />

          {/* Right Bow Loop */}
          <path
            d="M55,35 C62,22 80,16 79,31 C79,39 64,41 55,35 Z"
            fill="url(#bow-red)"
            stroke="#b91c1c"
            strokeWidth="0.8"
          />
          {/* Big White Specular Glossy Highlight on Right Loop (Key Reference Detail!) */}
          <path
            d="M76,25 C77,21 70,20 66,24 C65,26 67,28 73,28 C76,28 76,26 76,25 Z"
            fill="#ffffff"
            opacity="0.92"
          />

          {/* Ribbon Tails hanging down onto box */}
          <path d="M52,36 C47,44 42,47 43,51 C45,51 49,46 54,39 Z" fill="#b91c1c" />
          <path d="M58,36 C63,44 68,47 67,51 C65,51 61,46 56,39 Z" fill="#991b1b" />

          {/* Center Bow Knot */}
          <ellipse cx="55" cy="35" rx="6.5" ry="6" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
          {/* Knot Specular Highlight */}
          <ellipse cx="53.5" cy="33" rx="2.5" ry="1.8" fill="#ffffff" opacity="0.9" />
        </g>
      </g>
    </g>
  </svg>
);

export default function GiftOfferWidget({ lang, onStartWork }: GiftOfferWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <>
      {/* Floating 3D Gift Box Widget - Positioned slightly lower as requested */}
      <div className="fixed bottom-14 sm:bottom-15 right-3 sm:right-4 z-40 flex items-center justify-center">
        <div className="relative group">
          {/* Dismiss (Cross) Button on Top Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="absolute -top-1 -right-1 bg-slate-700/90 hover:bg-slate-900 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-md z-50 border border-slate-500 transition-all active:scale-90 cursor-pointer"
            title={lang === 'bn' ? 'বন্ধ করুন' : 'Dismiss'}
            id="dismiss-gift-btn"
          >
            <Icons.X className="w-3 h-3 stroke-[2.5]" />
          </button>

          {/* 3D Animated Gift Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="hover:scale-110 active:scale-95 transition-all duration-300 relative cursor-pointer focus:outline-none"
            id="gift-box-btn"
            aria-label="Special Offer Gift"
          >
            <LuxuryGiftBox3D />
          </button>
        </div>
      </div>

      {/* Offer Details Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[1.25rem] border border-rose-200 shadow-2xl max-w-sm w-full p-4 sm:p-5 relative overflow-hidden text-center">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-400/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -ml-10 -mb-10" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-all active:scale-90 cursor-pointer"
              id="close-gift-modal-btn"
            >
              <Icons.X className="w-4 h-4" />
            </button>

            {/* Header Gift Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-md border-2 border-amber-200 mb-3 animate-bounce">
              <Icons.Gift className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>

            {/* Modal Title */}
            <h3 className="text-base sm:text-lg font-bold text-rose-600 tracking-tight leading-snug">
              🎉 আজকের বিশেষ অফার! 🎉
            </h3>

            {/* Offer Content Box */}
            <div className="mt-3.5 space-y-2 bg-slate-50 p-3 rounded-xl border border-rose-100 text-left text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {/* Bullet 1 */}
              <div className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-rose-100/80 shadow-2xs">
                <span className="text-base shrink-0">📝</span>
                <div>
                  <span className="font-bold text-slate-900">৫টি ফর্ম ফিলআপের কাজ</span> সম্পন্ন করলেই পাচ্ছেন <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-xs border border-emerald-200">২০০ টাকা বোনাস!</span> 💰🔥
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-amber-100/80 shadow-2xs">
                <span className="text-base shrink-0">📧</span>
                <div>
                  আর <span className="font-bold text-slate-900">১০টি ই-মেইল সেল</span> সম্পন্ন করলে ২০০ টাকার পেমেন্টের সাথে অতিরিক্ত <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-xs border border-emerald-200">৮০ টাকা বোনাস!</span> 🎁💸
                </div>
              </div>

              {/* Expiry Notice */}
              <div className="flex items-center gap-1.5 pt-1 text-xs font-semibold text-amber-800">
                <Icons.Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>অফারটি শুধুমাত্র আজকের জন্য!</span>
              </div>
            </div>

            {/* Call to action message */}
            <p className="mt-3 text-xs font-semibold text-slate-600 leading-snug">
              🚀 তাই দেরি না করে এখনই কাজ শুরু করুন এবং বোনাসটি জিতে নিন!
            </p>

            {/* Action Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-all active:scale-95 cursor-pointer"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onStartWork) onStartWork();
                }}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                id="start-work-from-gift-btn"
              >
                <span>কাজ শুরু করুন</span>
                <Icons.ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
