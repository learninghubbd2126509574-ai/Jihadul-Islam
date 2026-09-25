import React, { useState, useEffect } from 'react';

interface TopNotificationToastProps {
  lang: 'bn' | 'en';
}

export default function TopNotificationToast({ lang }: TopNotificationToastProps) {
  const [visible, setVisible] = useState<boolean>(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState<boolean>(false);
  const [notificationIndex, setNotificationIndex] = useState<number>(0);

  const notificationsBn = [
    { title: 'অভিনন্দন! 🎉', body: 'আপনার ই-মেইল সেলের ৮০ টাকা অ্যাকাউন্টে যুক্ত হয়েছে। 💰' },
    { title: 'কমিশন রিসিভড! ✨', body: 'হাবিব ১০ টাকা টাস্ক বোনাস অর্জন করেছেন। 💵' },
    { title: 'গোল্ড মেম্বার বোনাস! 🏆', body: 'আপনার ৫,৩২০ পয়েন্ট রেটিং রিওয়ার্ড অ্যাকাউন্টে যুক্ত আছে। ⭐' },
    { title: 'উইথড্র সাকসেস! 🏦', body: 'আরিয়ান বিকাশ পেমেন্ট ৳৫০০ সফলভাবে রিসিভ করেছেন। ✅' }
  ];

  const notificationsEn = [
    { title: 'Congratulations! 🎉', body: 'Your ৳80 for Email Sale has been credited to your account. 💰' },
    { title: 'Commission Received! ✨', body: 'Habib earned ৳10 task bonus commission. 💵' },
    { title: 'Gold Member Bonus! 🏆', body: 'Your 5,320 points active reward is logged. ⭐' },
    { title: 'Withdrawal Success! 🏦', body: 'Ariyan successfully withdrew ৳500 to BKash. ✅' }
  ];

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    const showNotification = () => {
      setVisible(true);
      setIsAnimatingOut(false);

      // Hide after exactly 5 seconds
      hideTimer = setTimeout(() => {
        setIsAnimatingOut(true);
        setTimeout(() => {
          setVisible(false);
          setNotificationIndex((prev) => (prev + 1) % notificationsBn.length);
        }, 400); // 400ms transition duration
      }, 5000); // 5 seconds display duration
    };

    // Show initial notification
    showNotification();

    // Repeat every 120 seconds (2 minutes)
    const interval = setInterval(() => {
      showNotification();
    }, 120000); // 120,000 ms = 120 seconds = 2 minutes

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
      className="fixed top-3 left-1/2 w-[94%] max-w-md z-[100] pointer-events-none select-none"
    >
      {/* Simple, clean notification card without close button */}
      <div className="bg-slate-900/95 text-white rounded-[1.25rem] p-3.5 sm:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-slate-700/80 flex items-center gap-3 backdrop-blur-md">
        
        {/* Simple Notification Icon */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-bold text-lg shrink-0 shadow-[0_2px_8px_rgba(245,158,11,0.4)]">
          💰
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-xs text-amber-400 leading-snug tracking-tight">
            {currentNotif.title}
          </h4>
          
          <p className="text-xs text-slate-100 font-medium leading-relaxed mt-0.5">
            {currentNotif.body}
          </p>
        </div>
      </div>
    </div>
  );
}

