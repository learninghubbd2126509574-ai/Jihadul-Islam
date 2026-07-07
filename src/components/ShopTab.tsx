import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ShopItem, UserProfile } from '../types';

interface ShopTabProps {
  shopItems: ShopItem[];
  setShopItems: React.Dispatch<React.SetStateAction<ShopItem[]>>;
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  lang: 'bn' | 'en';
}

export default function ShopTab({ shopItems, setShopItems, profile, updateProfile, lang }: ShopTabProps) {
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const handleBuy = (item: ShopItem) => {
    if (item.purchased) return;

    if (profile.balance < item.price) {
      setPurchaseError(
        lang === 'bn'
          ? `আপনার ব্যালেন্স অপর্যাপ্ত! এই আইটেমটির দাম ৳${(item.price * 100).toFixed(0)} কিন্তু আপনার ব্যালেন্স ৳${(profile.balance * 100).toFixed(0)}।`
          : `Insufficient balance! This item costs $${item.price.toFixed(2)} but your current balance is $${profile.balance.toFixed(2)}.`
      );
      setPurchaseSuccess(null);
      return;
    }

    // Purchase successful
    setPurchaseError(null);
    setPurchaseSuccess(lang === 'bn' ? `অভিনন্দন! আপনি সফলভাবে "${item.nameBn}" আনলক করেছেন!` : `Congratulations! You unlocked "${item.nameEn}" successfully!`);

    // Update Profile Balance
    updateProfile({
      balance: profile.balance - item.price,
      level: item.id === 'premium-badge' ? 'Golden VIP Rank' : profile.level
    });

    // Update Shop Items array
    const updatedItems = shopItems.map((i) => (i.id === item.id ? { ...i, purchased: true } : i));
    setShopItems(updatedItems);

    // Clear alert after 4 seconds
    setTimeout(() => {
      setPurchaseSuccess(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in" id="shop-container">
      {/* Shop Intro Card */}
      <div className="bg-[#0f172a] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] bg-blue-600 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {lang === 'bn' ? 'ইউনিটি প্রিমিয়াম শপ' : 'Unity Premium Shop'}
          </span>
          <h2 className="text-xl font-bold">
            {lang === 'bn' ? 'আর্নিং ব্যালেন্স দিয়ে টুলস কিনুন!' : 'Unlock Premium Earn Boosters!'}
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            {lang === 'bn'
              ? 'আপনার সংগৃহীত ডেমো ইনকাম ব্যালেন্স ব্যবহার করে আপনার আর্নিং ক্ষমতা বৃদ্ধি করার প্রফেশনাল কিট এবং মেম্বারশিপ আনলক করুন।'
              : 'Use your simulated earnings balance to purchase custom booster packs, elite gold rank licenses, and templates.'}
          </p>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">{lang === 'bn' ? 'আপনার ব্যালেন্স:' : 'Your Balance:'}</span>
            <span className="text-emerald-400 font-black text-sm">
              {lang === 'bn' ? `৳${(profile.balance * 100).toFixed(0)}` : `$${profile.balance.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {purchaseSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <Icons.CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{purchaseSuccess}</span>
        </div>
      )}

      {purchaseError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <Icons.AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{purchaseError}</span>
        </div>
      )}

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shopItems.map((item) => {
          const IconComponent = (Icons as any)[item.iconName] || Icons.ShoppingBag;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 flex flex-col justify-between shadow-sm transition-all duration-300 ${
                item.purchased
                  ? 'border-emerald-200 bg-emerald-50/10'
                  : 'border-slate-200 hover:border-blue-400'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-11 h-11 rounded-2xl ${item.purchased ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-700'} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-sm font-black text-[#0f172a]">
                    {lang === 'bn' ? `৳${(item.price * 100).toFixed(0)}` : `$${item.price.toFixed(2)}`}
                  </span>
                </div>

                <h3 className="font-bold text-[#0f172a] text-sm md:text-base leading-tight">
                  {lang === 'bn' ? item.nameBn : item.nameEn}
                </h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  {lang === 'bn' ? item.descBn : item.descEn}
                </p>

                <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5 text-[10px] text-slate-600 font-bold">
                  <Icons.Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>
                    {lang === 'bn' ? item.benefitBn : item.benefitEn}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200">
                {item.purchased ? (
                  <button
                    disabled
                    className="w-full bg-emerald-100 text-emerald-800 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                  >
                    <Icons.Check className="w-4 h-4" />
                    {lang === 'bn' ? 'ইতিমধ্যে আনলকড' : 'Unlocked / Activated'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    className="w-full bg-[#0f172a] text-white hover:bg-slate-800 font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Icons.LockOpen className="w-3.5 h-3.5" />
                    {lang === 'bn' ? 'ব্যালেন্স দিয়ে আনলক করুন' : 'Unlock with Balance'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
