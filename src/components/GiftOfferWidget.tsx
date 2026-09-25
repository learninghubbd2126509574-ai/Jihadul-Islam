import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface GiftOfferWidgetProps {
  lang: 'bn' | 'en';
  onStartWork?: () => void;
}

export default function GiftOfferWidget({ lang, onStartWork }: GiftOfferWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <>
      {/* Floating Bouncing Gift Box Widget */}
      <div className="fixed bottom-20 right-4 z-40 flex items-center justify-center">
        <div className="relative group">
          {/* Dismiss (Cross) Button on Top Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="absolute -top-1.5 -right-1.5 bg-red-600 hover:bg-red-700 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-md z-50 border border-white transition-all active:scale-90"
            title={lang === 'bn' ? 'বন্ধ করুন' : 'Dismiss'}
            id="dismiss-gift-btn"
          >
            <Icons.X className="w-3 h-3 stroke-[3]" />
          </button>

          {/* Bouncing Gift Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="animate-bounce hover:animate-none group-hover:scale-110 active:scale-95 transition-all duration-300 relative cursor-pointer focus:outline-none"
            id="gift-box-btn"
            aria-label="Special Offer Gift"
          >
            {/* Glow Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 via-rose-500 to-red-500 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Claymorphic 3D Gift Container */}
            <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-rose-500 via-red-600 to-amber-500 flex items-center justify-center text-white shadow-[0_6px_14px_rgba(225,29,72,0.4),inset_1.5px_1.5px_3px_rgba(255,255,255,0.4),inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.2)] border border-amber-300/80">
              <Icons.Gift className="w-5 h-5 md:w-6 md:h-6 text-amber-200 fill-amber-300/30 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] animate-pulse" />
              
              {/* Special Offer Ribbon Badge */}
              <span className="absolute -bottom-1 text-[7px] font-black uppercase text-amber-900 bg-amber-300 px-1 py-0 rounded-full shadow-xs tracking-tighter border border-amber-400 leading-tight">
                OFFER
              </span>
            </div>
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
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md border-2 border-amber-200 mb-3 animate-bounce">
              <Icons.Gift className="w-7 h-7 sm:w-8 sm:h-8 text-amber-100" />
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
