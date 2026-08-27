import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile, TaskLog } from '../types';

export interface SimOffer {
  id: string;
  operator: 'GP' | 'Banglalink' | 'Robi' | 'Airtel' | 'Teletalk';
  operatorCode: string;
  nameBn: string;
  nameEn: string;
  type: 'internet' | 'minute' | 'combo';
  typeBn: string;
  typeEn: string;
  dataAmount: string;
  minuteAmount: string;
  validity: string;
  validityBn: string;
  price: number;
  originalPrice: number;
  commission: number; // in BDT
  hotTag?: string;
  hotTagBn?: string;
  circleBn: string;
  bgGradient: string;
  accentColor: string;
}

export const INITIAL_SIM_OFFERS: SimOffer[] = [
  // Grameenphone
  {
    id: 'gp-1',
    operator: 'GP',
    operatorCode: 'Grameenphone',
    nameBn: 'জিপি ৫০ জিবি সুপার ড্রাইভ প্যাক (৩০ দিন)',
    nameEn: 'GP 50 GB Super Drive Pack (30 Days)',
    type: 'internet',
    typeBn: 'ইন্টারনেট',
    typeEn: 'Internet',
    dataAmount: '50 GB',
    minuteAmount: '0 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 499,
    originalPrice: 650,
    commission: 150,
    hotTag: 'BEST SELLER',
    hotTagBn: 'হট ড্রাইভ অফার',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-blue-600 to-sky-700',
    accentColor: 'text-blue-600'
  },
  {
    id: 'gp-2',
    operator: 'GP',
    operatorCode: 'Grameenphone',
    nameBn: 'জিপি ৪০ জিবি + ৮০০ মিনিট কম্বো মেগা ড্রাইভ',
    nameEn: 'GP 40 GB + 800 Min Combo Mega Drive',
    type: 'combo',
    typeBn: 'কম্বো প্যাক',
    typeEn: 'Combo Pack',
    dataAmount: '40 GB',
    minuteAmount: '800 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 598,
    originalPrice: 799,
    commission: 180,
    hotTag: 'SUPER COMBO',
    hotTagBn: 'হাই কমিশন',
    circleBn: 'ঢাকা ও চট্টগ্রাম সার্কেল',
    bgGradient: 'from-blue-700 to-indigo-800',
    accentColor: 'text-blue-700'
  },
  {
    id: 'gp-3',
    operator: 'GP',
    operatorCode: 'Grameenphone',
    nameBn: 'জিপি ১০০০ মিনিট আনলিমিটেড টকটাইম প্যাক',
    nameEn: 'GP 1000 Minutes Talktime Special',
    type: 'minute',
    typeBn: 'মিনিট প্যাক',
    typeEn: 'Minutes',
    dataAmount: '0 GB',
    minuteAmount: '1000 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 399,
    originalPrice: 530,
    commission: 110,
    hotTag: 'VOICE SPECIAL',
    hotTagBn: 'টপ টকটাইম',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-sky-600 to-blue-800',
    accentColor: 'text-sky-600'
  },

  // Banglalink
  {
    id: 'bl-1',
    operator: 'Banglalink',
    operatorCode: 'Banglalink',
    nameBn: 'বাংলালিংক ৬৫ জিবি ধামাকা ইন্টারনেট (৩০ দিন)',
    nameEn: 'Banglalink 65 GB Dhamaka Internet (30 Days)',
    type: 'internet',
    typeBn: 'ইন্টারনেট',
    typeEn: 'Internet',
    dataAmount: '65 GB',
    minuteAmount: '0 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 449,
    originalPrice: 599,
    commission: 140,
    hotTag: 'MEGA GB',
    hotTagBn: 'বাজেট ধামাকা',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-orange-500 to-amber-600',
    accentColor: 'text-orange-500'
  },
  {
    id: 'bl-2',
    operator: 'Banglalink',
    operatorCode: 'Banglalink',
    nameBn: 'বাংলালিংক ৫০ জিবি + ১০০০ মিনিট পাওয়ার কম্বো',
    nameEn: 'Banglalink 50 GB + 1000 Min Power Combo',
    type: 'combo',
    typeBn: 'কম্বো প্যাক',
    typeEn: 'Combo Pack',
    dataAmount: '50 GB',
    minuteAmount: '1000 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 549,
    originalPrice: 749,
    commission: 160,
    hotTag: 'HOT COMBO',
    hotTagBn: 'সেরা কম্বো',
    circleBn: 'রাজশাহী ও খুলনা ডিভিশন',
    bgGradient: 'from-amber-600 to-orange-700',
    accentColor: 'text-amber-600'
  },
  {
    id: 'bl-3',
    operator: 'Banglalink',
    operatorCode: 'Banglalink',
    nameBn: 'বাংলালিংক ৭৫০ মিনিট ফ্রেন্ডস টকটাইম প্যাক',
    nameEn: 'Banglalink 750 Minutes Friends Talktime',
    type: 'minute',
    typeBn: 'মিনিট প্যাক',
    typeEn: 'Minutes',
    dataAmount: '0 GB',
    minuteAmount: '750 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 320,
    originalPrice: 420,
    commission: 90,
    hotTag: 'SAVER',
    hotTagBn: 'সাশ্রয়ী মিনিট',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-orange-600 to-amber-700',
    accentColor: 'text-orange-600'
  },

  // Robi
  {
    id: 'robi-1',
    operator: 'Robi',
    operatorCode: 'Robi',
    nameBn: 'রবি ৪৫ জিবি + ৯০০ মিনিট এলিট ভিআইপি প্যাক',
    nameEn: 'Robi 45 GB + 900 Min Elite VIP Pack',
    type: 'combo',
    typeBn: 'কম্বো প্যাক',
    typeEn: 'Combo Pack',
    dataAmount: '45 GB',
    minuteAmount: '900 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 519,
    originalPrice: 699,
    commission: 155,
    hotTag: 'VIP DRIVE',
    hotTagBn: 'এলিট অফার',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-red-600 to-rose-700',
    accentColor: 'text-red-600'
  },
  {
    id: 'robi-2',
    operator: 'Robi',
    operatorCode: 'Robi',
    nameBn: 'রবি ৬০ জিবি সুপারফাস্ট ফোরজি ডাটা প্যাক',
    nameEn: 'Robi 60 GB Superfast 4G Data Pack',
    type: 'internet',
    typeBn: 'ইন্টারনেট',
    typeEn: 'Internet',
    dataAmount: '60 GB',
    minuteAmount: '0 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 479,
    originalPrice: 620,
    commission: 145,
    hotTag: '4G SPEED',
    hotTagBn: 'সুপার ফাস্ট',
    circleBn: 'ঢাকা ও সিলেট সার্কেল',
    bgGradient: 'from-rose-600 to-red-800',
    accentColor: 'text-rose-600'
  },
  {
    id: 'robi-3',
    operator: 'Robi',
    operatorCode: 'Robi',
    nameBn: 'রবি ৮৫০ মিনিট টকটাইম গোল্ডেন বান্ডেল',
    nameEn: 'Robi 850 Minutes Golden Talktime Bundle',
    type: 'minute',
    typeBn: 'মিনিট প্যাক',
    typeEn: 'Minutes',
    dataAmount: '0 GB',
    minuteAmount: '850 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 360,
    originalPrice: 480,
    commission: 100,
    hotTag: 'POPULAR',
    hotTagBn: 'জনপ্রিয়',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-red-500 to-rose-700',
    accentColor: 'text-red-500'
  },

  // Airtel
  {
    id: 'airtel-1',
    operator: 'Airtel',
    operatorCode: 'Airtel',
    nameBn: 'এয়ারটেল ৪০ জিবি + ৭৫০ মিনিট ইয়ুথ কম্বো',
    nameEn: 'Airtel 40 GB + 750 Min Youth Combo',
    type: 'combo',
    typeBn: 'কম্বো প্যাক',
    typeEn: 'Combo Pack',
    dataAmount: '40 GB',
    minuteAmount: '750 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 448,
    originalPrice: 599,
    commission: 135,
    hotTag: 'YOUTH HIT',
    hotTagBn: 'তারুণ্যের কম্বো',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-red-600 to-orange-600',
    accentColor: 'text-red-600'
  },
  {
    id: 'airtel-2',
    operator: 'Airtel',
    operatorCode: 'Airtel',
    nameBn: 'এয়ারটেল ৫০ জিবি আনলিমিটেড স্ট্রিমিং প্যাক',
    nameEn: 'Airtel 50 GB Unlimited Streaming Pack',
    type: 'internet',
    typeBn: 'ইন্টারনেট',
    typeEn: 'Internet',
    dataAmount: '50 GB',
    minuteAmount: '0 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 398,
    originalPrice: 520,
    commission: 120,
    hotTag: 'STREAMING',
    hotTagBn: 'ভিডিও প্যাক',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-rose-600 to-orange-700',
    accentColor: 'text-rose-600'
  },

  // Teletalk
  {
    id: 'teletalk-1',
    operator: 'Teletalk',
    operatorCode: 'Teletalk',
    nameBn: 'টেলিটক ৩৫ জিবি + ৫০০ মিনিট স্বাধীন বর্ণমালা প্যাক',
    nameEn: 'Teletalk 35 GB + 500 Min Bornomala Special',
    type: 'combo',
    typeBn: 'কম্বো প্যাক',
    typeEn: 'Combo Pack',
    dataAmount: '35 GB',
    minuteAmount: '500 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 349,
    originalPrice: 480,
    commission: 110,
    hotTag: 'GOVT SAVER',
    hotTagBn: 'স্বাধীন প্যাক',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-emerald-600 to-teal-700',
    accentColor: 'text-emerald-600'
  },
  {
    id: 'teletalk-2',
    operator: 'Teletalk',
    operatorCode: 'Teletalk',
    nameBn: 'টেলিটক ৪৫ জিবি সাশ্রয়ী ব্রডব্যান্ড ডাটা প্যাক',
    nameEn: 'Teletalk 45 GB Budget Broadband Data',
    type: 'internet',
    typeBn: 'ইন্টারনেট',
    typeEn: 'Internet',
    dataAmount: '45 GB',
    minuteAmount: '0 Min',
    validity: '30 Days',
    validityBn: '৩০ দিন',
    price: 310,
    originalPrice: 420,
    commission: 95,
    hotTag: 'BUDGET HIT',
    hotTagBn: 'সস্তা ডাটা',
    circleBn: 'সারা বাংলাদেশ (All BD)',
    bgGradient: 'from-teal-600 to-emerald-800',
    accentColor: 'text-teal-600'
  }
];

interface SimOfferWorkspaceProps {
  lang: 'bn' | 'en';
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog?: (log: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => void;
  onBack?: () => void;
}

export default function SimOfferWorkspace({
  lang,
  profile,
  updateProfile,
  addLog,
  onBack
}: SimOfferWorkspaceProps) {
  const [offers, setOffers] = useState<SimOffer[]>(INITIAL_SIM_OFFERS);
  const [selectedOperator, setSelectedOperator] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected Offer & Order Flow
  const [activeOffer, setActiveOffer] = useState<SimOffer | null>(null);
  const [buyerNumber, setBuyerNumber] = useState<string>('');
  const [buyerDivision, setBuyerDivision] = useState<string>('Dhaka');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successOrder, setSuccessOrder] = useState<{
    offer: SimOffer;
    phone: string;
    trxId: string;
    profit: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Filtered offers
  const filteredOffers = offers.filter((item) => {
    if (selectedOperator !== 'ALL' && item.operator !== selectedOperator) return false;
    if (selectedType !== 'ALL' && item.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.nameBn.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.operator.toLowerCase().includes(q) ||
        item.dataAmount.toLowerCase().includes(q) ||
        item.minuteAmount.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleCopyLink = (offer: SimOffer) => {
    const link = `https://unityearning.com/sim-offer/${offer.id}?ref=${profile.uid}&op=${offer.operator}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(offer.id);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleOpenOrder = (offer: SimOffer) => {
    setActiveOffer(offer);
    setBuyerNumber('');
    setBuyerDivision('Dhaka');
    setErrorMessage('');
    setSuccessOrder(null);
  };

  const handleSubmitOrder = () => {
    if (!activeOffer) return;
    
    // Validation
    const cleanNum = buyerNumber.trim().replace(/\D/g, '');
    if (!cleanNum || cleanNum.length < 11) {
      setErrorMessage(
        lang === 'bn' 
          ? 'অনুগ্রহ করে গ্রাহকের সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)' 
          : 'Please enter a valid 11-digit mobile number (e.g. 017XXXXXXXX)'
      );
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const commissionInBalance = activeOffer.commission / 100; // balance is represented in currency units
      const generatedTrxId = `TEL-TX${Math.floor(100000 + Math.random() * 900000)}`;

      // Update User Profile
      updateProfile({
        balance: profile.balance + commissionInBalance,
        totalIncome: profile.totalIncome + commissionInBalance,
        tasksCompleted: profile.tasksCompleted + 1
      });

      // Add Task Log
      if (addLog) {
        addLog({
          jobId: 'product-selling-work',
          jobTitleBn: `সিম অফার সেল: ${activeOffer.nameBn} (${buyerNumber})`,
          jobTitleEn: `SIM Offer Reselling: ${activeOffer.nameEn} (${buyerNumber})`,
          reward: commissionInBalance
        });
      }

      setSuccessOrder({
        offer: activeOffer,
        phone: buyerNumber,
        trxId: generatedTrxId,
        profit: activeOffer.commission
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="sim-offer-workspace">
      {/* Top Banner with Telecommunication Graphic */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] text-white relative overflow-hidden shadow-xl border border-slate-700/60">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 right-10 opacity-10 pointer-events-none">
          <Icons.Radio className="w-48 h-48 text-white" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <Icons.Sparkles className="w-3.5 h-3.5 text-slate-950" />
              {lang === 'bn' ? 'টেলিকম ড্রাইভ ও সিম অফার সেলিং হাব' : 'Telecom SIM Offer Drive Hub'}
            </span>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-xl text-[11px] font-mono text-amber-300 font-bold">
              {lang === 'bn' ? 'সরাসরি ৩০-২০০৳ ইনস্ট্যান্ট কমিশন' : 'Earn ৳30 - ৳200 Cash per Sale'}
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {lang === 'bn' ? 'মোবাইল সিম অফার ও এমবি রিসেলিং' : 'Mobile Operator SIM Offer Reselling'}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'bn'
                ? 'জিপি, বাংলালিংক, রবি, এয়ারটেল ও টেলিটকের ইন্টারনেট, মিনিট এবং স্পেশাল কম্বো প্যাক বিক্রি করুন। কাস্টমারের নম্বর এন্ট্রি করেই সাথে সাথে নগদ কমিশন আপনার অ্যাকাউন্টে যোগ করে নিন।'
                : 'Resell verified high-speed Internet GBs, talktime minutes, and combo drive packs across GP, BL, Robi, Airtel, and Teletalk. Earn instant profit per customer recharge.'}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'মোট একটিভ অফার' : 'Active Offers'}</span>
              <span className="text-base font-black text-white font-mono">{offers.length}+</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'সর্বোচ্চ কমিশন' : 'Max Commission'}</span>
              <span className="text-base font-black text-emerald-400 font-mono">৳১৮০</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'সাপোর্টেড অপারেটর' : 'Operators'}</span>
              <span className="text-base font-black text-amber-300">৫টি সিম</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'পেমেন্ট গতি' : 'Payout Speed'}</span>
              <span className="text-base font-black text-sky-300">{lang === 'bn' ? 'ইনস্ট্যান্ট' : 'Instant'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operator Filter Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Icons.Signal className="w-4 h-4 text-indigo-600" />
            {lang === 'bn' ? 'অপারেটর সিলেক্ট করুন:' : 'Select Mobile Operator:'}
          </label>
          <span className="text-[11px] text-slate-400 font-mono">
            {lang === 'bn' ? `${filteredOffers.length}টি অফার পাওয়া গেছে` : `${filteredOffers.length} offers found`}
          </span>
        </div>

        {/* Operator Pill Chips */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[
            { id: 'ALL', name: lang === 'bn' ? 'সকল অপারেটর' : 'All Sims', icon: 'Layers', color: 'bg-slate-800' },
            { id: 'GP', name: 'Grameenphone', icon: 'Zap', color: 'bg-blue-600' },
            { id: 'Banglalink', name: 'Banglalink', icon: 'Flame', color: 'bg-orange-500' },
            { id: 'Robi', name: 'Robi', icon: 'Activity', color: 'bg-red-600' },
            { id: 'Airtel', name: 'Airtel', icon: 'Wifi', color: 'bg-rose-600' },
            { id: 'Teletalk', name: 'Teletalk', icon: 'Shield', color: 'bg-emerald-600' }
          ].map((op) => {
            const isSelected = selectedOperator === op.id;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => setSelectedOperator(op.id)}
                className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 border ${
                  isSelected
                    ? `${op.color} text-white shadow-lg shadow-slate-900/10 border-transparent scale-[1.02]`
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{op.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Package Type and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Type Filter Buttons */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
          {[
            { id: 'ALL', labelBn: 'সব প্যাকেজ', labelEn: 'All Types' },
            { id: 'internet', labelBn: 'ইন্টারনেট এমবি', labelEn: 'Data (GB)' },
            { id: 'combo', labelBn: 'কম্বো ড্রাইভ', labelEn: 'Combo' },
            { id: 'minute', labelBn: 'টকটাইম মিনিট', labelEn: 'Minutes' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedType === tab.id
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {lang === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative flex-1">
          <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'bn'
                ? 'অফার বা ডাটা খুঁজুন (যেমন: 50 GB, জিপি, 800 মিনিট)...'
                : 'Search offers (e.g. 50 GB, GP, 800 Min)...'
            }
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-700 focus:border-amber-400 outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOffers.map((offer) => {
          return (
            <div
              key={offer.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Top Header */}
              <div className={`p-4 bg-gradient-to-r ${offer.bgGradient} text-white relative overflow-hidden`}>
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="relative z-10 flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        {offer.operator} 4G
                      </span>
                      {offer.hotTagBn && (
                        <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                          {lang === 'bn' ? offer.hotTagBn : offer.hotTag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base leading-snug">
                      {lang === 'bn' ? offer.nameBn : offer.nameEn}
                    </h3>
                  </div>

                  {/* Profit Ribbon */}
                  <div className="bg-white text-slate-900 px-3 py-1.5 rounded-2xl shadow-lg text-center flex-shrink-0">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">
                      {lang === 'bn' ? 'লাভ' : 'Profit'}
                    </span>
                    <span className="text-sm font-black text-emerald-600 font-mono">
                      ৳{offer.commission}
                    </span>
                  </div>
                </div>

                {/* Offer Specs Highlight (Pills) */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/15 text-[11px] font-bold">
                  {offer.dataAmount !== '0 GB' && (
                    <span className="bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-xl flex items-center gap-1">
                      <Icons.Wifi className="w-3.5 h-3.5 text-amber-300" />
                      {offer.dataAmount} ডাটা
                    </span>
                  )}
                  {offer.minuteAmount !== '0 Min' && (
                    <span className="bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-xl flex items-center gap-1">
                      <Icons.PhoneCall className="w-3.5 h-3.5 text-sky-300" />
                      {offer.minuteAmount}
                    </span>
                  )}
                  <span className="bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-xl flex items-center gap-1">
                    <Icons.Calendar className="w-3.5 h-3.5 text-emerald-300" />
                    {lang === 'bn' ? offer.validityBn : offer.validity}
                  </span>
                </div>
              </div>

              {/* Card Body & Action Buttons */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'অফার সার্কেল / এলাকা' : 'Offer Circle'}</span>
                    <span className="font-extrabold text-slate-700 flex items-center gap-1 text-[11px]">
                      <Icons.MapPin className="w-3 h-3 text-slate-400" />
                      {offer.circleBn}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block line-through">৳{offer.originalPrice}</span>
                    <span className="text-base font-black text-slate-900 font-mono">
                      ৳{offer.price}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(offer)}
                    className="py-2.5 px-3 rounded-2xl text-xs font-extrabold border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedLink === offer.id ? (
                      <>
                        <Icons.Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">{lang === 'bn' ? 'লিঙ্ক কপি হয়েছে' : 'Link Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Icons.Link2 className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{lang === 'bn' ? 'লিঙ্ক কপি' : 'Share Link'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenOrder(offer)}
                    className="py-2.5 px-3 rounded-2xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Icons.ShoppingCart className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'অফার সেল করুন' : 'Sell & Recharge'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sell Modal / Customer Number Entry Drawer */}
      {activeOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4.5 bg-slate-900 text-white flex justify-between items-center relative">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs">
                  {activeOffer.operator}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">
                    {lang === 'bn' ? 'সিম অফার সেল ও এক্টিভেশন' : 'SIM Offer Sale Activation'}
                  </h3>
                  <p className="text-[10px] text-slate-300">
                    {lang === 'bn' ? 'কাস্টমারের নম্বরে রিচার্জ নিশ্চিত করুন' : 'Confirm customer phone for instant drive load'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!isSubmitting) {
                    setActiveOffer(null);
                    setSuccessOrder(null);
                  }
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {successOrder ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-3 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Icons.CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-emerald-900">
                      {lang === 'bn' ? 'অফার সেল সফল হয়েছে!' : 'Offer Sale Successful!'}
                    </h4>
                    <p className="text-xs text-emerald-700">
                      {lang === 'bn'
                        ? `আপনার অ্যাকাউন্টে ৳${successOrder.profit} ক্যাশ কমিশন সরাসরি জমা হয়েছে।`
                        : `৳${successOrder.profit} cash commission has been instantly added to your wallet.`}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-3 border border-emerald-100 text-left text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === 'bn' ? 'ট্রানজেকশন আইডি:' : 'Trx ID:'}</span>
                      <span className="font-bold text-slate-800">{successOrder.trxId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === 'bn' ? 'কাস্টমার নম্বর:' : 'Customer Number:'}</span>
                      <span className="font-bold text-slate-800">{successOrder.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lang === 'bn' ? 'অফার প্যাকেজ:' : 'Package:'}</span>
                      <span className="font-bold text-slate-800 truncate max-w-[200px]">{successOrder.offer.nameBn}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveOffer(null);
                      setSuccessOrder(null);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    {lang === 'bn' ? 'নতুন অফার সেল করুন' : 'Sell Another Offer'}
                  </button>
                </div>
              ) : (
                <>
                  {/* Selected Offer Preview Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {activeOffer.operator} 4G
                      </span>
                      <h4 className="text-xs font-black text-slate-800 leading-tight mt-1">
                        {lang === 'bn' ? activeOffer.nameBn : activeOffer.nameEn}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {lang === 'bn' ? `মূল্য: ৳${activeOffer.price} • মেয়াদ: ${activeOffer.validityBn}` : `Price: ৳${activeOffer.price} • ${activeOffer.validity}`}
                      </p>
                    </div>

                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl text-right flex-shrink-0 border border-emerald-200">
                      <span className="text-[9px] font-bold block">{lang === 'bn' ? 'আপনার কমিশন' : 'Your Profit'}</span>
                      <span className="text-sm font-black font-mono">৳{activeOffer.commission}</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1 block">
                        <Icons.Phone className="w-3.5 h-3.5 text-amber-500" />
                        {lang === 'bn' ? 'ক্রেতার মোবাইল নম্বর (১১ ডিজিট):' : 'Buyer Mobile Phone Number:'}
                      </label>
                      <input
                        type="tel"
                        value={buyerNumber}
                        onChange={(e) => setBuyerNumber(e.target.value)}
                        placeholder="যেমন: 01712345678"
                        className="w-full border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 font-mono bg-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1 block">
                        <Icons.MapPin className="w-3.5 h-3.5 text-indigo-500" />
                        {lang === 'bn' ? 'সিম অফারের বিভাগ / সার্কেল:' : 'Regional Circle / Division:'}
                      </label>
                      <select
                        value={buyerDivision}
                        onChange={(e) => setBuyerDivision(e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl px-3 py-2.5 text-xs text-slate-800 bg-white outline-none focus:border-amber-500"
                      >
                        <option value="Dhaka">{lang === 'bn' ? 'ঢাকা বিভাগ' : 'Dhaka Division'}</option>
                        <option value="Chittagong">{lang === 'bn' ? 'চট্টগ্রাম বিভাগ' : 'Chittagong Division'}</option>
                        <option value="Rajshahi">{lang === 'bn' ? 'রাজশাহী বিভাগ' : 'Rajshahi Division'}</option>
                        <option value="Khulna">{lang === 'bn' ? 'খুলনা বিভাগ' : 'Khulna Division'}</option>
                        <option value="Sylhet">{lang === 'bn' ? 'সিলেট বিভাগ' : 'Sylhet Division'}</option>
                        <option value="Rangpur">{lang === 'bn' ? 'রংপুর বিভাগ' : 'Rangpur Division'}</option>
                        <option value="Barisal">{lang === 'bn' ? 'বরিশাল বিভাগ' : 'Barisal Division'}</option>
                        <option value="Mymensingh">{lang === 'bn' ? 'ময়মনসিংহ বিভাগ' : 'Mymensingh Division'}</option>
                        <option value="All BD">{lang === 'bn' ? 'সারা বাংলাদেশ (All BD)' : 'All Bangladesh'}</option>
                      </select>
                    </div>

                    {errorMessage && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-600 p-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                        <Icons.AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#0f172a] to-[#1e293b] hover:from-slate-800 hover:to-slate-900 text-white font-extrabold py-3 rounded-2xl text-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Icons.Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>{lang === 'bn' ? 'ড্রাইভ রিচার্জ প্রসেস হচ্ছে...' : 'Processing Drive Recharge...'}</span>
                      </>
                    ) : (
                      <>
                        <Icons.Send className="w-4 h-4 text-amber-400" />
                        <span>{lang === 'bn' ? `কনফার্ম করুন ও ৳${activeOffer.commission} লাভ নিন` : `Confirm & Earn ৳${activeOffer.commission}`}</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
