import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface OffersTabProps {
  lang: 'bn' | 'en';
  onNavigateWork: () => void;
}

export default function OffersTab({ lang, onNavigateWork }: OffersTabProps) {
  const [claimedOffers, setClaimedOffers] = useState<Record<string, boolean>>({});

  const offers = [
    {
      id: 'offer-1',
      titleBn: 'ফর্ম ফিলাপ ও ডাটা এন্ট্রিতে ২০% এক্সট্রা কমিশন! ⚡',
      titleEn: '20% Extra Commission on Form Fillup & Data Entry! ⚡',
      descBn: 'আজকে যেকোনো ৫টি ফর্ম ফিলাপ বা ডাটা এন্ট্রি কাজ সম্পন্ন করলে নির্ধারিত পারিশ্রমিকের সাথে অতিরিক্ত ২০% এক্সট্রা বোনাস সরাসরি মেইন ব্যালেন্সে যুক্ত হবে।',
      descEn: 'Complete any 5 form fillup or data entry tasks today and receive an automatic 20% bonus boost added to your payout.',
      badge: '২০% বোনাস',
      badgeColor: 'bg-emerald-600 text-white',
      gradient: 'from-emerald-600 to-teal-700',
      icon: 'Percent',
      expiryBn: 'মেয়াদ: আজ রাত ১২টা পর্যন্ত',
      expiryEn: 'Valid: Until Midnight',
    },
    {
      id: 'offer-2',
      titleBn: '১০টি ই-মেইল সেলে অতিরিক্ত ৮০ টাকা বোনাস! 🎁',
      titleEn: 'Bonus ৳80 on 10 Verified Email Sales! 🎁',
      descBn: 'ইমেইল মার্কেটিং সেকশন থেকে ১০টি ভেরিফাইড ইমেইল সেল সম্পন্ন করলেই সাধারণ ২০০ টাকা পেমেন্টের বাইরে অতিরিক্ত ৮০ টাকা মেগা বোনাস লাভ করুন।',
      descEn: 'Sell 10 verified email campaign accounts and get an instant extra ৳80 cash bonus on top of your normal ৳200 commission.',
      badge: 'মেগা বোনাস',
      badgeColor: 'bg-rose-600 text-white',
      gradient: 'from-rose-600 to-pink-700',
      icon: 'Gift',
      expiryBn: 'মেয়াদ: চলতি সপ্তাহ',
      expiryEn: 'Valid: This Week',
    },
    {
      id: 'offer-3',
      titleBn: 'স্পেশাল ড্রাইভ অফার ক্যাশব্যাক মেগা ডিল! 📱',
      titleEn: 'Mega Cashback Deal on Drive Internet Packs! 📱',
      descBn: 'আজ যেকোনো রবি, বাংলালিংক বা গ্রামীণফোন ড্রাইভ ডাটা প্যাক সফলভাবে সেল করলে প্রতিটি সফল সেলে সর্বোচ্চ ৫০ টাকা পর্যন্ত তাৎক্ষণিক ক্যাশব্যাক বোনাস।',
      descEn: 'Earn up to ৳50 direct cashback rewards on every successful telecom internet drive package order today.',
      badge: 'ক্যাশব্যাক ডিল',
      badgeColor: 'bg-blue-600 text-white',
      gradient: 'from-blue-600 to-indigo-700',
      icon: 'Radio',
      expiryBn: 'সীমিত অফার',
      expiryEn: 'Limited Offer',
    },
    {
      id: 'offer-4',
      titleBn: 'রেফারেল টিম বুস্ট: ১৫% আজীবন প্যাসিভ ইনকাম! 👥',
      titleEn: 'Referral Team Boost: 15% Lifetime Passive Income! 👥',
      descBn: 'আপনার বন্ধুদের রেফার করুন। আপনার রেফার করা বন্ধুরা যখনই কোনো কাজ বা টাস্ক সম্পন্ন করবে, তাদের আয়ের ১৫% বোনাস আপনার অ্যাকাউন্টে অটোমেটিক জমা হবে।',
      descEn: 'Invite active friends to Unity Earning and receive a guaranteed 15% lifetime tier reward from all their completed tasks.',
      badge: 'আজীবন কমিশন',
      badgeColor: 'bg-amber-600 text-white',
      gradient: 'from-amber-600 to-orange-700',
      icon: 'Users2',
      expiryBn: 'সবার জন্য উন্মুক্ত',
      expiryEn: 'Open to All',
    },
  ];

  const handleClaim = (id: string) => {
    setClaimedOffers((prev) => ({ ...prev, [id]: true }));
    onNavigateWork();
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in" id="offers-container">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 rounded-[1.25rem] p-4 sm:p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-sm shrink-0">
            <Icons.Flame className="w-6 h-6 text-yellow-300 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-black text-white tracking-tight leading-snug">
                {lang === 'bn' ? 'আজকের স্পেশাল ধামাকা অফার' : 'Today’s Special Hot Offers'}
              </h2>
              <span className="bg-white/25 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                HOT
              </span>
            </div>
            <p className="text-amber-100 text-xs sm:text-sm font-medium mt-0.5">
              {lang === 'bn' ? 'অতিরিক্ত বোনাস ও বাড়তি কমিশন পেতে অফারগুলো গ্রহণ করুন' : 'Unlock boosted bonuses and commissions'}
            </p>
          </div>
        </div>
      </div>

      {/* Offers Cards */}
      <div className="space-y-3.5">
        {offers.map((offer) => {
          const IconComp = (Icons as any)[offer.icon] || Icons.Tag;
          const isClaimed = claimedOffers[offer.id];

          return (
            <div
              key={offer.id}
              className="bg-white rounded-[1.25rem] border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${offer.gradient} text-white flex items-center justify-center shadow-md shrink-0`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full leading-none ${offer.badgeColor}`}>
                        {offer.badge}
                      </span>
                      <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                        <Icons.Clock className="w-3.5 h-3.5" />
                        {lang === 'bn' ? offer.expiryBn : offer.expiryEn}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1.5 leading-snug">
                      {lang === 'bn' ? offer.titleBn : offer.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-medium">
                      {lang === 'bn' ? offer.descBn : offer.descEn}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                  <button
                    onClick={() => handleClaim(offer.id)}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{isClaimed ? (lang === 'bn' ? 'কাজ শুরু হয়েছে' : 'In Progress') : (lang === 'bn' ? 'অফারটি নিন ও কাজ করুন' : 'Claim & Work')}</span>
                    <Icons.ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
