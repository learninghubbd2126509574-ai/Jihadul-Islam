import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface NotificationItem {
  id: string;
  titleBn: string;
  titleEn: string;
  bodyBn: string;
  bodyEn: string;
  time: string;
  iconType: 'bonus' | 'login' | 'rank' | 'logout' | 'system';
  unread: boolean;
}

interface NotificationModalProps {
  lang: 'bn' | 'en';
  onClose: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    titleBn: 'ইমেইল সেল বোনাস প্রাপ্তি! 🎉',
    titleEn: 'Email Sale Bonus Received! 🎉',
    bodyBn: 'আপনার ইমেইল মার্কেটিং সেল থেকে ৮০ টাকা বোনাস সফলভাবে অ্যাকাউন্টে জমা হয়েছে।',
    bodyEn: '৳80 bonus from your email marketing sale has been credited to your account.',
    time: 'আজ, সকাল ০৭:১৫',
    iconType: 'bonus',
    unread: true
  },
  {
    id: 'notif-2',
    titleBn: 'অ্যাকাউন্ট সিকিউরিটি লগইন সফল 🔐',
    titleEn: 'Account Security Login Success 🔐',
    bodyBn: 'আপনার অ্যাকাউন্টে নতুন সিকিউরিটি পিন সেশন (UID: UE-2026-9842) দিয়ে সফলভাবে লগইন করা হয়েছে।',
    bodyEn: 'Successful login detected with security PIN session (UID: UE-2026-9842).',
    time: 'আজ, সকাল ০৭:১০',
    iconType: 'login',
    unread: true
  },
  {
    id: 'notif-3',
    titleBn: 'র‍্যাঙ্কিং আপডেট! 🏆',
    titleEn: 'Ranking Updated! 🏆',
    bodyBn: 'অভিনন্দন! বাংলাদেশ ফ্রিল্যান্সার র‍্যাঙ্কিংয়ে আপনার বর্তমান অবস্থান ১৭৬ তম।',
    bodyEn: 'Congratulations! Your current rank in the Bangladesh Freelancer leaderboard is 176.',
    time: 'গতকাল, রাত ১০:৩০',
    iconType: 'rank',
    unread: false
  },
  {
    id: 'notif-4',
    titleBn: 'টাস্ক কমিশন বোনাস ✨',
    titleEn: 'Task Commission Bonus ✨',
    bodyBn: 'মাইক্রো টাস্ক এবং সোশ্যাল মিডিয়া প্রমোশন থেকে অতিরিক্ত ৫০ টাকা বোনাস যুক্ত হয়েছে।',
    bodyEn: 'An extra ৳50 bonus has been added from micro-tasks and social media promotion.',
    time: 'গতকাল, দুপুর ০২:১৫',
    iconType: 'bonus',
    unread: false
  },
  {
    id: 'notif-5',
    titleBn: 'সেশন লগ আউট সম্পন্ন 🚪',
    titleEn: 'Session Logged Out 🚪',
    bodyBn: 'আপনার প্রিভিয়াস ডিভাইস সেশন সিকিউরডভাবে লগ আউট করা হয়েছে। পুনরায় পিন দিয়ে প্রবেশ করুন।',
    bodyEn: 'Your previous device session was securely logged out. Enter PIN to resume.',
    time: '২৬ আগস্ট, সন্ধা ০৬:০০',
    iconType: 'logout',
    unread: false
  },
  {
    id: 'notif-6',
    titleBn: 'গোল্ড মেম্বারশিপ স্ট্যাটাস সক্রিয় 👑',
    titleEn: 'Gold Membership Status Active 👑',
    bodyBn: 'আপনার অ্যাকাউন্টটি এখন গোল্ড মেম্বারশিপের আওতায় রয়েছে। সকল কাজের রেট ২০% বেশি!',
    bodyEn: 'Your account is now under Gold Membership. All task commissions have a 20% boost!',
    time: '২৬ আগস্ট, দুপুর ১২:০০',
    iconType: 'system',
    unread: false
  },
  {
    id: 'notif-7',
    titleBn: 'ডেইলি চেক-ইন বোনাস 🎁',
    titleEn: 'Daily Check-in Bonus 🎁',
    bodyBn: 'আজকের দৈনিক উপস্থিতি বোনাস হিসেবে ১০ টাকা রিসিভ করেছেন।',
    bodyEn: 'You have received ৳10 as today\'s daily attendance check-in bonus.',
    time: '২৫ আগস্ট, সকাল ০৯:০০',
    iconType: 'bonus',
    unread: false
  },
  {
    id: 'notif-8',
    titleBn: 'নিরাপত্তা সতর্কতা অ্যালার্ট 🛡️',
    titleEn: 'Security Alert 🛡️',
    bodyBn: 'আপনার প্রোফাইল তথ্য এবং ব্যাংক পেমেন্ট মেথড ভেরিফাইড ও সুরক্ষিত রয়েছে।',
    bodyEn: 'Your profile information and bank payout method are fully verified and secure.',
    time: '২৪ আগস্ট, রাত ০৮:৪৫',
    iconType: 'system',
    unread: false
  },
  {
    id: 'notif-9',
    titleBn: 'রেফারেল কমিশন প্রাপ্তি 💸',
    titleEn: 'Referral Commission Received 💸',
    bodyBn: 'আপনার রেফারেল লিঙ্কের মাধ্যমে নতুন ফ্রিল্যান্সার যুক্ত হওয়ায় ৪০ টাকা কমিশন পেয়েছেন।',
    bodyEn: 'You received ৳40 commission as a new freelancer joined via your referral link.',
    time: '২৪ আগস্ট, দুপুর ০১:২০',
    iconType: 'bonus',
    unread: false
  },
  {
    id: 'notif-10',
    titleBn: 'সাপোর্ট টিকিট সমাধান হয়েছে ✅',
    titleEn: 'Support Ticket Resolved ✅',
    bodyBn: 'আপনার বিকাশ পেমেন্ট সংক্রান্ত সাপোর্ট টিকিট সফলভাবে সমাধান করা হয়েছে।',
    bodyEn: 'Your support ticket regarding BKash payout has been successfully resolved.',
    time: '২৩ আগস্ট, বিকেল ০৪:১০',
    iconType: 'system',
    unread: false
  },
  {
    id: 'notif-11',
    titleBn: 'উইথড্র সফল নোটিফিকেশন 🏦',
    titleEn: 'Withdrawal Success Notification 🏦',
    bodyBn: 'আপনার ৳৫০০ টাকার পেমেন্ট রিকোয়েস্ট নগদ ওয়ালেটে সাকসেসফুল হয়েছে।',
    bodyEn: 'Your ৳500 payout request to Nagad wallet has been successfully processed.',
    time: '২২ আগস্ট, রাত ০৯:০০',
    iconType: 'bonus',
    unread: false
  },
  {
    id: 'notif-12',
    titleBn: 'সিস্টেম আপডেট নোটিশ 🚀',
    titleEn: 'System Update Notice 🚀',
    bodyBn: 'ইউনিটি আর্নিং প্ল্যাটফর্মে নতুন এন্টারপ্রাইজ সিকিউরিটি ফিচার আপডেট করা হয়েছে।',
    bodyEn: 'New enterprise security features have been updated on Unity Earning platform.',
    time: '২১ আগস্ট, সকাল ১০:০০',
    iconType: 'system',
    unread: false
  }
];

export default function NotificationModal({ lang, onClose }: NotificationModalProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const getIcon = (type: NotificationItem['iconType']) => {
    switch (type) {
      case 'bonus':
        return <Icons.Gift className="w-4 h-4 text-emerald-600" />;
      case 'login':
        return <Icons.ShieldCheck className="w-4 h-4 text-blue-600" />;
      case 'rank':
        return <Icons.Trophy className="w-4 h-4 text-amber-600" />;
      case 'logout':
        return <Icons.LogOut className="w-4 h-4 text-rose-600" />;
      default:
        return <Icons.Bell className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getBgColor = (type: NotificationItem['iconType']) => {
    switch (type) {
      case 'bonus': return 'bg-emerald-50 border-emerald-200';
      case 'login': return 'bg-blue-50 border-blue-200';
      case 'rank': return 'bg-amber-50 border-amber-200';
      case 'logout': return 'bg-rose-50 border-rose-200';
      default: return 'bg-indigo-50 border-indigo-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Icons.Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                {lang === 'bn' ? 'সিস্টেম নোটিফিকেশন হাব' : 'Notification Hub'}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {lang === 'bn' ? 'বোনাস, লগইন ও র‍্যাঙ্কিং আপডেট' : 'Bonus, Login & Ranking Updates'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              {lang === 'bn' ? 'সব পঠিত করুন' : 'Mark Read'}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50/50">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all flex gap-3.5 items-start ${
                item.unread
                  ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-500/10'
                  : 'bg-white/70 border-slate-200/80'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${getBgColor(item.iconType)}`}>
                {getIcon(item.iconType)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="text-xs font-black text-slate-900 truncate">
                    {lang === 'bn' ? item.titleBn : item.titleEn}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0 font-mono">
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {lang === 'bn' ? item.bodyBn : item.bodyEn}
                </p>
              </div>

              {item.unread && (
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0 mt-1 shadow-xs" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-slate-100 text-center">
          <p className="text-[11px] font-bold text-slate-400">
            {lang === 'bn' ? 'সর্বমোট ১২টি সাম্প্রতিক সিস্টেম নোটিফিকেশন উপলব্ধ' : 'Showing all 12 recent system notifications'}
          </p>
        </div>

      </div>
    </div>
  );
}
