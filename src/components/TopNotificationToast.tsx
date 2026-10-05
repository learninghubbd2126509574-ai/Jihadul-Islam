import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

interface TopNotificationToastProps {
  lang: 'bn' | 'en';
}

export default function TopNotificationToast({ lang }: TopNotificationToastProps) {
  const [visible, setVisible] = useState<boolean>(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState<boolean>(false);
  const [notificationIndex, setNotificationIndex] = useState<number>(0);

  const notificationsBn = [
    { title: 'অভিনন্দন! 🎉', body: 'আপনার ই-মেইল সেলের ৮০ টাকা অ্যাকাউন্টে সফলভাবে যুক্ত হয়েছে।' },
    { title: 'কমিশন ক্রেডিট! 💵', body: 'হাবিব ১০ টাকা টাস্ক বোনাস কমিশন অর্জন করেছেন।' },
    { title: 'গোল্ড মেম্বার বোনাস! ⭐', body: 'আপনার ৩,২৫০ পয়েন্ট গোল্ড রেটিং রিওয়ার্ড সক্রিয় রয়েছে।' },
    { title: 'উইথড্র সফল! ✅', body: 'আরিয়ান বিকাশ পেমেন্ট ৳৫০০ সফলভাবে রিসিভ করেছেন।' }
  ];

  const notificationsEn = [
    { title: 'Congratulations! 🎉', body: 'Your ৳80 for Email Sale has been credited to your account.' },
    { title: 'Commission Received! 💵', body: 'Habib earned ৳10 task bonus commission.' },
    { title: 'Gold Member Bonus! ⭐', body: 'Your 3,250 points Gold tier reward is active.' },
    { title: 'Withdrawal Success! ✅', body: 'Ariyan successfully withdrew ৳500 to bKash.' }
  ];

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    const showNotification = () => {
      setVisible(true);
      setIsAnimatingOut(false);

      // Hide after 5 seconds
      hideTimer = setTimeout(() => {
        setIsAnimatingOut(true);
        setTimeout(() => {
          setVisible(false);
          setNotificationIndex((prev) => (prev + 1) % notificationsBn.length);
        }, 400);
      }, 5000);
    };

    // Show initial notification
    showNotification();

    // Repeat every 120 seconds
    const interval = setInterval(() => {
      showNotification();
    }, 120000);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  const currentNotif = (lang === 'bn' ? notificationsBn : notificationsEn)[notificationIndex];

  return (
    <div
      style={{
        transform: `translate(-50%, ${isAnimatingOut ? '-150%' : '0px'})`,
        opacity: isAnimatingOut ? 0 : 1,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
      }}
      className="fixed top-3.5 left-1/2 w-[94%] max-w-md z-[120] select-none"
    >
      {/* High-Contrast, Professional Top Toast */}
      <div className="bg-white/98 text-slate-900 rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_36px_rgba(15,23,42,0.18)] border-2 border-indigo-500/40 flex items-center justify-between gap-3 backdrop-blur-xl ring-1 ring-slate-900/5">
        
        <div className="flex items-center gap-3 min-w-0">
          {/* Notification Icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-500 text-white flex items-center justify-center font-black text-base shadow-xs shrink-0">
            <Icons.Sparkles className="w-5 h-5 text-white fill-white" />
          </div>

          {/* Text Content with high legibility */}
          <div className="min-w-0">
            <h4 className="font-black text-xs sm:text-sm text-slate-950 leading-tight tracking-tight">
              {currentNotif.title}
            </h4>
            
            <p className="text-xs sm:text-[13px] text-slate-700 font-semibold leading-snug mt-0.5">
              {currentNotif.body}
            </p>
          </div>
        </div>

        {/* Quick Close Button */}
        <button
          type="button"
          onClick={() => {
            setIsAnimatingOut(true);
            setTimeout(() => setVisible(false), 300);
          }}
          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          aria-label="Dismiss Notification"
        >
          <Icons.X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
