import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile, TaskLog } from '../types';
import SocialLinksBar from './SocialLinksBar';

interface ProfileTabProps {
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog?: (newLog: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => void;
  taskLogs: TaskLog[];
  lang: 'bn' | 'en';
  onLogout?: () => void;
  onOpenNotifications?: () => void;
}

const toBnNum = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

type TransferMethodType = 
  | 'main-portal' 
  | 'p2p' 
  | 'bkash' 
  | 'nagad' 
  | 'rocket' 
  | 'upay' 
  | 'binance' 
  | 'upi' 
  | 'gpay' 
  | 'paytm' 
  | 'bank';

interface TransferRecord {
  id: string;
  trxId: string;
  amountBDT: number;
  receiver: string;
  method: string;
  methodType: TransferMethodType;
  date: string;
  status: string;
}

export default function ProfileTab({ profile, updateProfile, addLog, taskLogs, lang, onLogout, onOpenNotifications }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [bio, setBio] = useState(profile.bio);
  const [address, setAddress] = useState(profile.address);
  const [customAvatar, setCustomAvatar] = useState(profile.avatarUrl);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [showAppInstallModal, setShowAppInstallModal] = useState<boolean>(false);

  const handleDownloadApp = () => {
    if (downloadProgress !== null) return;
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowAppInstallModal(true);
            setDownloadProgress(null);
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const avatarPresets = [
    'https://api.dicebear.com/7.x/adventurer/svg?seed=HabibaAkter',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Sumaiya',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Nusrat',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150'
  ];

  const [editBalance, setEditBalance] = useState(profile.balance.toString());
  const [editTotalIncome, setEditTotalIncome] = useState((profile.totalIncome ?? profile.balance).toString());
  const [editTasksCompleted, setEditTasksCompleted] = useState(profile.tasksCompleted.toString());
  const [editLevel, setEditLevel] = useState(profile.level || 'Gold Rank');

  // Balance transfer states
  const [hubAction, setHubAction] = useState<'transfer' | 'withdraw'>('transfer');
  const [selectedMethod, setSelectedMethod] = useState<TransferMethodType>('main-portal');
  const [transferTarget, setTransferTarget] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [latestTrxData, setLatestTrxData] = useState<TransferRecord | null>(null);
  const [transferError, setTransferError] = useState<string | null>(null);
  const [transferring, setTransferring] = useState(false);
  const [copiedTrxId, setCopiedTrxId] = useState<string | null>(null);
  const [historyFilter, setHistoryFilter] = useState<string>('all');
  const [historySearch, setHistorySearch] = useState<string>('');

  // Initial transactions summing to 63,000 BDT
  const [transferHistory, setTransferHistory] = useState<TransferRecord[]>([
    {
      id: 'trx-1',
      trxId: 'TRX-98421001',
      amountBDT: 25000,
      receiver: 'UE-MAIN-7701',
      method: 'মেইন অ্যাকাউন্ট (Unity Portal)',
      methodType: 'main-portal',
      date: '2026-08-26 18:30',
      status: 'সফল'
    },
    {
      id: 'trx-2',
      trxId: 'TRX-87425002',
      amountBDT: 18000,
      receiver: '01712-884910',
      method: 'বিকাশ ওয়ালেট (bKash)',
      methodType: 'bkash',
      date: '2026-08-25 14:15',
      status: 'সফল'
    },
    {
      id: 'trx-3',
      trxId: 'TRX-63912003',
      amountBDT: 10000,
      receiver: '01823-991203',
      method: 'নগদ ওয়ালেট (Nagad)',
      methodType: 'nagad',
      date: '2026-08-24 11:05',
      status: 'সফল'
    },
    {
      id: 'trx-4',
      trxId: 'TRX-51203914',
      amountBDT: 5000,
      receiver: 'UE-2026-3392',
      method: 'ইউজার-টু-ইউজার (P2P)',
      methodType: 'p2p',
      date: '2026-08-22 09:40',
      status: 'সফল'
    },
    {
      id: 'trx-5',
      trxId: 'TRX-99823415',
      amountBDT: 3000,
      receiver: '01911-554433',
      method: 'রকেট ওয়ালেট (Rocket)',
      methodType: 'rocket',
      date: '2026-08-20 20:10',
      status: 'সফল'
    },
    {
      id: 'trx-6',
      trxId: 'TRX-77612089',
      amountBDT: 2000,
      receiver: 'UE-MAIN-7701',
      method: 'মেইন অ্যাকাউন্ট (Unity Portal)',
      methodType: 'main-portal',
      date: '2026-08-18 16:25',
      status: 'সফল'
    }
  ]);

  const startEditing = () => {
    setName(profile.fullName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setBio(profile.bio);
    setAddress(profile.address);
    setEditBalance(profile.balance.toString());
    setEditTotalIncome((profile.totalIncome ?? profile.balance).toString());
    setEditTasksCompleted(profile.tasksCompleted.toString());
    setEditLevel(profile.level || 'Gold Rank');
    setIsEditing(true);
  };

  const handleSave = () => {
    const parsedBalance = parseFloat(editBalance) || 0;
    const parsedTotalIncome = parseFloat(editTotalIncome) || 0;
    const parsedTasksCompleted = parseInt(editTasksCompleted) || 0;

    updateProfile({
      fullName: name,
      email: email,
      phone: phone,
      bio: bio,
      address: address,
      avatarUrl: customAvatar,
      balance: parsedBalance,
      totalIncome: parsedTotalIncome,
      tasksCompleted: parsedTasksCompleted,
      level: editLevel,
      points: 3250 // Strictly fixed at 3250
    });
    setIsEditing(false);
  };

  const handleSelectPreset = (url: string) => {
    setCustomAvatar(url);
    updateProfile({ avatarUrl: url });
    setShowAvatarPicker(false);
  };

  const handleBalanceTransfer = () => {
    setTransferError(null);
    setTransferSuccess(false);

    if (!transferTarget.trim()) {
      setTransferError(
        selectedMethod === 'main-portal' || selectedMethod === 'p2p'
          ? (lang === 'bn' ? 'দয়া করে একটি সঠিক ইউজার আইডি (UID) প্রবেশ করান।' : 'Please enter a valid User ID (UID).')
          : selectedMethod === 'bank'
          ? (lang === 'bn' ? 'দয়া করে আপনার ব্যাংক অ্যাকাউন্ট নম্বর ও বিবরণ দিন।' : 'Please enter your bank account details.')
          : selectedMethod === 'binance'
          ? (lang === 'bn' ? 'দয়া করে আপনার বাইনেন্স পে আইডি বা USDT এড্রেস দিন।' : 'Please enter your Binance Pay ID or USDT address.')
          : selectedMethod === 'upi' || selectedMethod === 'gpay' || selectedMethod === 'paytm'
          ? (lang === 'bn' ? 'দয়া করে সঠিক নম্বর বা UPI ID প্রবেশ করান।' : 'Please enter a valid number or UPI ID.')
          : (lang === 'bn' ? 'দয়া করে সঠিক মোবাইল নম্বর দিন।' : 'Please enter a valid mobile number.')
      );
      return;
    }

    const amountInBDT = parseFloat(transferAmount) || 0;
    const availableBDT = profile.balance;

    if (amountInBDT <= 0) {
      setTransferError(lang === 'bn' ? 'দয়া করে ট্রান্সফারের সঠিক পরিমাণ (টাকা) প্রবেশ করুন।' : 'Please enter a valid transfer amount.');
      return;
    }

    if (amountInBDT > availableBDT) {
      setTransferError(lang === 'bn' ? 'আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই!' : 'Insufficient account balance!');
      return;
    }

    setTransferring(true);

    setTimeout(() => {
      const nextBalance = Math.max(0, profile.balance - amountInBDT);
      updateProfile({ balance: nextBalance });

      const methodNames: Record<TransferMethodType, { bn: string; en: string }> = {
        'main-portal': { bn: 'মেইন অ্যাকাউন্ট (Unity Portal)', en: 'Main Portal Account' },
        'bkash': { bn: 'বিকাশ ওয়ালেট (bKash)', en: 'bKash Wallet' },
        'nagad': { bn: 'নগদ ওয়ালেট (Nagad)', en: 'Nagad Wallet' },
        'rocket': { bn: 'রকেট ওয়ালেট (Rocket)', en: 'Rocket Wallet' },
        'upay': { bn: 'উপায় ওয়ালেট (Upay)', en: 'Upay Wallet' },
        'binance': { bn: 'বাইনেন্স পে (Binance USDT)', en: 'Binance Pay (USDT)' },
        'upi': { bn: 'ইউপিআই (UPI)', en: 'UPI (India)' },
        'gpay': { bn: 'গুগল পে (Google Pay)', en: 'Google Pay (GPay)' },
        'paytm': { bn: 'পেটিএম (Paytm)', en: 'Paytm Wallet' },
        'bank': { bn: 'ব্যাংক ট্রান্সফার (Bank Transfer)', en: 'Bank Transfer' },
        'p2p': { bn: 'ইউজার-টু-ইউজার (P2P)', en: 'Peer-to-Peer UID' }
      };

      const randomTrxNumber = Math.floor(10000000 + Math.random() * 90000000);
      const newTrx: TransferRecord = {
        id: `trx-${Date.now()}`,
        trxId: `TRX-${randomTrxNumber}`,
        amountBDT: amountInBDT,
        receiver: transferTarget.trim(),
        method: lang === 'bn' ? methodNames[selectedMethod].bn : methodNames[selectedMethod].en,
        methodType: selectedMethod,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: lang === 'bn' ? 'সফল' : 'Completed'
      };

      setTransferHistory((prev) => [newTrx, ...prev]);

      if (addLog) {
        addLog({
          jobId: 'balance-transfer',
          jobTitleBn: `ব্যালেন্স ট্রান্সফার (${newTrx.method}): ${transferTarget.trim()}`,
          jobTitleEn: `Balance Transfer (${newTrx.method}): ${transferTarget.trim()}`,
          reward: -amountInBDT
        });
      }

      setLatestTrxData(newTrx);
      setTransferSuccess(true);
      setTransferAmount('');
      setTransferring(false);
    }, 1200);
  };

  const handleCopyTrx = (trxId: string) => {
    navigator.clipboard.writeText(trxId);
    setCopiedTrxId(trxId);
    setTimeout(() => setCopiedTrxId(null), 2000);
  };

  // Filtered History
  const filteredTransactions = transferHistory.filter((trx) => {
    const matchesFilter = historyFilter === 'all' || trx.methodType === historyFilter;
    const matchesSearch =
      trx.trxId.toLowerCase().includes(historySearch.toLowerCase()) ||
      trx.receiver.toLowerCase().includes(historySearch.toLowerCase()) ||
      trx.method.toLowerCase().includes(historySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalWithdrawn = transferHistory.reduce((acc, curr) => acc + curr.amountBDT, 0);

  return (
    <div className="space-y-4 sm:space-y-5 pb-24 animate-fade-in" id="profile-container">
      {/* Top Logout Bar */}
      <div className="flex justify-between items-center bg-white rounded-2xl p-3 sm:p-4 px-4 sm:px-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Icons.ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800">
              {lang === 'bn' ? 'সেশন ও সিকিউরিটি হাব' : 'Session & Security Hub'}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">
              {lang === 'bn' ? 'নিরাপদে অ্যাকাউন্ট থেকে বের হতে লগ আউট করুন' : 'Click log out to securely end session'}
            </p>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs active:scale-95 cursor-pointer"
            id="profile-logout-btn"
            type="button"
          >
            <Icons.LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'লগ আউট' : 'Log Out'}</span>
          </button>
        )}
      </div>

      {/* Profile Summary Card */}
      <div className="bg-white rounded-[1.25rem] border border-slate-200/80 p-4 sm:p-5 shadow-sm relative overflow-hidden">
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Avatar Section */}
          <div className="relative group flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md">
              <img
                src={profile.avatarUrl}
                alt="Profile Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            
            {/* Camera / Edit Avatar Button */}
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 sm:p-2 rounded-full border-2 border-white hover:bg-blue-700 transition-colors active:scale-90 shadow-xs cursor-pointer"
              aria-label="Change Avatar"
              type="button"
            >
              <Icons.Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Quick Avatar Selector Drawer */}
          {showAvatarPicker && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl w-full max-w-md space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">
                  {lang === 'bn' ? 'প্রোফাইল ছবি নির্বাচন করুন:' : 'Choose Avatar Preset:'}
                </span>
                <button
                  onClick={() => setShowAvatarPicker(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="flex justify-center gap-2 flex-wrap">
                {avatarPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(preset)}
                    className="w-11 h-11 rounded-full border-2 border-blue-500/40 hover:border-blue-600 overflow-hidden hover:scale-105 transition-all"
                  >
                    <img src={preset} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">
                    {lang === 'bn' ? 'নিজের ডিভাইস থেকে ছবি আপলোড করুন:' : 'Upload from your device:'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') {
                            setCustomAvatar(reader.result);
                            updateProfile({ avatarUrl: reader.result });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer border border-dashed border-slate-200 p-2 rounded-xl"
                  />
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">
                    {lang === 'bn' ? 'অথবা কাস্টম ইমেজ URL লিংক দিন:' : 'Or paste your custom Image URL:'}
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customAvatar}
                      onChange={(e) => setCustomAvatar(e.target.value)}
                      placeholder="https://..."
                      className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white outline-none"
                    />
                    <button
                      onClick={() => {
                        updateProfile({ avatarUrl: customAvatar });
                        setShowAvatarPicker(false);
                      }}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User ID, Verification, Gold Rank, and Fixed Points Badges */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-slate-700 font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              UID: {profile.uid}
            </span>

            {/* Verification Badge */}
            <span className="bg-emerald-50 text-emerald-700 text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 border border-emerald-200">
              <Icons.ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? 'ভেরিফাইড' : 'VERIFIED'}</span>
            </span>

            {/* Gold Rank Badge */}
            <span className="bg-amber-50 text-amber-900 text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 border border-amber-200">
              <Icons.Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{profile.level === 'Gold Rank' || profile.level === 'গোল্ড র‍্যাংক' ? (lang === 'bn' ? 'গোল্ড র‍্যাংক' : 'Gold Rank') : profile.level}</span>
            </span>

            {/* Fixed Points Badge (Strictly 3,250 points) */}
            <span className="bg-amber-50 text-amber-900 text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 border border-amber-300 font-mono tabular-nums">
              <Icons.Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{lang === 'bn' ? `${toBnNum((profile.points || 3250).toLocaleString('en-US'))} পয়েন্ট` : `${(profile.points || 3250).toLocaleString('en-US')} Pts`}</span>
            </span>
          </div>

          <h2 className="mt-2.5 text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            {profile.fullName}
          </h2>
          <p className="text-slate-500 text-xs mt-0.5 font-medium">{profile.email}</p>

          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-md italic leading-relaxed bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
            "{profile.bio}"
          </p>

          {/* Performance stats bento block */}
          <div className="w-full mt-4 space-y-2.5 sm:space-y-3">
            {/* 1. Main Hero Available Balance Card - Elegant Executive Layout */}
            <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50/40 border border-emerald-300/80 p-3 sm:p-3.5 rounded-2xl shadow-xs text-left relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Icons.Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs text-emerald-950 font-black uppercase tracking-wider block leading-tight">
                      Available Balance
                    </span>
                    <span className="text-[9.5px] text-emerald-700 font-medium">
                      {lang === 'bn' ? 'উত্তোলনযোগ্য মেইন ব্যালেন্স' : 'Withdrawable Main Balance'}
                    </span>
                  </div>
                </div>

                <span className="bg-emerald-600/10 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-400/50 shrink-0">
                  {lang === 'bn' ? '০% ক্যাশআউট ফি' : '0% Cashout Fee'}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2 pt-1 border-t border-emerald-200/60">
                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">৳</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-950 font-mono tabular-nums tracking-tight">
                    {profile.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold font-mono">
                  BDT • Instant Ready
                </span>
              </div>
            </div>

            {/* 2. 3-in-a-Row Single Line for Total Earnings, Total Transactions, and Tasks Done */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full">
              {/* Total Income / Earnings */}
              <div className="bg-blue-50/70 border border-blue-200/80 p-2 sm:p-3 rounded-xl flex flex-col justify-between text-left shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] sm:text-[10.5px] text-blue-900 font-bold uppercase tracking-tight truncate">
                    Total Earnings
                  </span>
                  <Icons.TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                </div>
                <div className="text-xs sm:text-base font-black text-blue-950 font-mono tabular-nums truncate">
                  ৳{(profile.totalIncome ?? profile.balance).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </div>
              </div>

              {/* Total Transferred / Transactions */}
              <div className="bg-slate-50 border border-slate-200/90 p-2 sm:p-3 rounded-xl flex flex-col justify-between text-left shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] sm:text-[10.5px] text-slate-800 font-bold uppercase tracking-tight truncate">
                    Total Cashout
                  </span>
                  <Icons.ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <div className="text-xs sm:text-base font-black text-slate-900 font-mono tabular-nums truncate">
                  ৳{totalWithdrawn.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </div>
              </div>

              {/* Tasks Completed */}
              <div className="bg-purple-50/70 border border-purple-200/80 p-2 sm:p-3 rounded-xl flex flex-col justify-between text-left shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] sm:text-[10.5px] text-purple-900 font-bold uppercase tracking-tight truncate">
                    Tasks Done
                  </span>
                  <Icons.CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                </div>
                <div className="text-xs sm:text-base font-black text-purple-950 font-mono tabular-nums truncate">
                  {profile.tasksCompleted} Tasks
                </div>
              </div>
            </div>

            {/* Direct Quick Action Buttons for Balance Transfer & Withdraw */}
            <div className="grid grid-cols-2 gap-2 w-full pt-1">
              <button
                type="button"
                onClick={() => {
                  setHubAction('transfer');
                  document.getElementById('balance-transfer-card')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200/80 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <Icons.ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" />
                <span>{lang === 'bn' ? 'ব্যালেন্স ট্রান্সফার' : 'Balance Transfer'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setHubAction('withdraw');
                  document.getElementById('balance-transfer-card')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200/80 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <Icons.Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'ক্যাশ আউট (উইথড্র)' : 'Cash Out (Withdraw)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PROFILE DETAILS SECTION & EDIT --- */}
      <div className="bg-white rounded-[1.25rem] border border-slate-200/80 p-4 sm:p-5 space-y-4 shadow-sm" id="profile-details-card">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug tracking-tight flex items-center gap-2">
            <Icons.User className="w-5 h-5 text-blue-600" />
            {lang === 'bn' ? 'অ্যাকাউন্ট ও ব্যক্তিগত তথ্য' : 'Account & Personal Details'}
          </h3>
          <button
            onClick={isEditing ? handleSave : startEditing}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
              isEditing
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80'
            }`}
          >
            {isEditing ? (
              <>
                <Icons.Save className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes'}
              </>
            ) : (
              <>
                <Icons.Edit3 className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'তথ্য এডিট করুন' : 'Edit Profile'}
              </>
            )}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4 text-xs md:text-sm animate-scale-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'পুরো নাম:' : 'Full Name:'}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full clay-input bg-slate-50/70 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'ইমেইল এড্রেস:' : 'Email Address:'}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full clay-input bg-slate-50/70 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'মোবাইল নাম্বার:' : 'Phone Number:'}</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full clay-input bg-slate-50/70 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'ঠিকানা:' : 'Full Address:'}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full clay-input bg-slate-50/70 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-500"
                />
              </div>
            </div>

            {/* Editable Balance, Total Earnings, Completed Tasks and Rank section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">
                  {lang === 'bn' ? 'চলতি ব্যালেন্স (টাকা):' : 'Account Balance (BDT):'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                  <input
                    type="number"
                    value={editBalance}
                    onChange={(e) => setEditBalance(e.target.value)}
                    className="w-full clay-input bg-slate-50/70 border border-slate-200 rounded-xl p-3 pl-8 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-500 font-mono"
                    placeholder="e.g. 3400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">
                  {lang === 'bn' ? 'টোটাল ইনকাম (টাকা):' : 'Total Earnings (BDT):'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                  <input
                    type="number"
                    value={editTotalIncome}
                    onChange={(e) => setEditTotalIncome(e.target.value)}
                    className="w-full clay-input bg-slate-50/70 border border-slate-200 rounded-xl p-3 pl-8 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-500 font-mono"
                    placeholder="e.g. 66400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">
                  {lang === 'bn' ? 'সম্পন্ন কাজ (টি):' : 'Completed Tasks (count):'}
                </label>
                <input
                  type="number"
                  value={editTasksCompleted}
                  onChange={(e) => setEditTasksCompleted(e.target.value)}
                  className="w-full clay-input bg-slate-50/70 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-500 font-mono"
                  placeholder="e.g. 632"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">
                {lang === 'bn' ? 'র‍্যাংক মেম্বারশিপ:' : 'Rank Level:'}
              </label>
              <select
                value={editLevel}
                onChange={(e) => setEditLevel(e.target.value)}
                className="w-full clay-input bg-slate-50/70 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="Gold Rank">Gold Rank (গোল্ড র‍্যাংক)</option>
                <option value="Silver Rank">Silver Rank (সিলভার র‍্যাংক)</option>
                <option value="Bronze Rank">Bronze Rank (ব্রোঞ্জ র‍্যাংক)</option>
                <option value="Platinum Rank">Platinum Rank (প্ল্যাটিনাম র‍্যাংক)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'আপনার বায়ো / ভূমিকা:' : 'Bio / Short Description:'}</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-20 clay-input bg-slate-50/70 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs md:text-sm">
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">{lang === 'bn' ? 'মোবাইল নাম্বার' : 'Phone'}</span>
              <span className="text-slate-800 font-bold font-mono">{profile.phone}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">{lang === 'bn' ? 'ঠিকানা' : 'Address'}</span>
              <span className="text-slate-800 font-bold text-right">{profile.address}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">{lang === 'bn' ? 'যোগদানের তারিখ' : 'Member Since'}</span>
              <span className="text-slate-800 font-bold">{profile.joinedDate}</span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-slate-500 font-medium">{lang === 'bn' ? 'মেম্বারশিপ লেভেল' : 'Rank'}</span>
              <span className="text-amber-950 font-black bg-gradient-to-r from-amber-300 to-yellow-400 px-3.5 py-1 rounded-xl border border-amber-400 shadow-xs flex items-center gap-1.5">
                <Icons.Crown className="w-3.5 h-3.5 text-amber-950 fill-amber-950" />
                {profile.level === 'Gold Rank' || profile.level === 'গোল্ড র‍্যাংক' ? (lang === 'bn' ? 'গোল্ড র‍্যাংক' : 'Gold Rank') : profile.level}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --- UPGRADED BALANCE TRANSFER & WITHDRAW WIDGET --- */}
      <div className="bg-white rounded-[1.25rem] border border-emerald-100/90 p-4 sm:p-5 space-y-4 relative overflow-hidden shadow-sm" id="balance-transfer-card">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug tracking-tight flex items-center gap-2">
            <Icons.Send className="w-5 h-5 text-emerald-600" />
            {lang === 'bn' ? 'ব্যালেন্স ট্রান্সফার ও উত্তোলন হাব' : 'Balance Transfer & Payout Portal'}
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl uppercase font-mono self-start sm:self-auto border border-emerald-200 leading-none">
            {lang === 'bn' ? `আপনার UID: ${profile.uid}` : `Your UID: ${profile.uid}`}
          </span>
        </div>

        {/* Two Main Option Tabs (Requested: ব্যালেন্স ট্রান্সফার এবং উইথড্র) */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setHubAction('transfer');
              setSelectedMethod('main-portal');
              setTransferTarget('');
              setTransferSuccess(false);
              setTransferError(null);
            }}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hubAction === 'transfer'
                ? 'bg-blue-600 text-white shadow-md scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Icons.ArrowRightLeft className="w-4 h-4" />
            <span>{lang === 'bn' ? 'ব্যালেন্স ট্রান্সফার' : 'Balance Transfer'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setHubAction('withdraw');
              setSelectedMethod('bkash');
              setTransferTarget('');
              setTransferSuccess(false);
              setTransferError(null);
            }}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hubAction === 'withdraw'
                ? 'bg-emerald-600 text-white shadow-md scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Icons.Download className="w-4 h-4" />
            <span>{lang === 'bn' ? 'উইথড্র (ক্যাশ আউট)' : 'Withdraw (Cash Out)'}</span>
          </button>
        </div>

        {/* 1. WITHDRAWAL VIEW (Requested: বিকাশ, নগদ, রকেট, উপায়, বাইনেন্স, ইউপিআই, গুগল পে, পেটিএম, ব্যাংক ট্রান্সফার - আরও চিকন ডিজাইন) */}
        {hubAction === 'withdraw' && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between px-0.5">
              <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                {lang === 'bn' ? 'উইথড্র মাধ্যম নির্বাচন করুন (ক্যাশ আউট):' : 'Select Cashout Method:'}
              </label>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {lang === 'bn' ? '০% চার্জ • ৫-১৫ মিনিটে পেআউট' : '0% Fee • 5-15 Min Payout'}
              </span>
            </div>

            {/* Vertically Stacked Withdrawal Options (One below another - Slim "চিকন" Layout) */}
            <div className="space-y-1.5">
              {[
                {
                  id: 'bkash',
                  nameBn: 'বিকাশ (bKash)',
                  nameEn: 'bKash Mobile Wallet',
                  descBn: 'পার্সোনাল বিকাশ ওয়ালেট • ৫-১০ মিনিটে ইনস্ট্যান্ট ক্যাশআউট',
                  descEn: 'Personal bKash wallet • Instant payout (0% fee)',
                  color: 'text-pink-600 bg-pink-50 border-pink-200',
                  icon: Icons.Smartphone,
                  badge: 'দ্রুততম',
                  minBn: '৫০৳',
                  minEn: '৳50',
                },
                {
                  id: 'nagad',
                  nameBn: 'নগদ (Nagad)',
                  nameEn: 'Nagad Mobile Wallet',
                  descBn: 'পার্সোনাল নগদ ওয়ালেট • কোনো ফি নেই (০% চার্জ)',
                  descEn: 'Personal Nagad wallet • 0% Cashout fee',
                  color: 'text-orange-600 bg-orange-50 border-orange-200',
                  icon: Icons.Flame,
                  badge: 'জনপ্রিয়',
                  minBn: '৫০৳',
                  minEn: '৳50',
                },
                {
                  id: 'rocket',
                  nameBn: 'রকেট (Rocket)',
                  nameEn: 'Rocket (DBBL)',
                  descBn: 'ডাচ-বাংলা ব্যাংক রকেট ওয়ালেট ক্যাশআউট',
                  descEn: 'DBBL Rocket account cashout (0% fee)',
                  color: 'text-purple-600 bg-purple-50 border-purple-200',
                  icon: Icons.Radio,
                  badge: 'ডিবিবিএল',
                  minBn: '৫০৳',
                  minEn: '৳50',
                },
                {
                  id: 'upay',
                  nameBn: 'উপায় (Upay)',
                  nameEn: 'Upay Wallet (UCB)',
                  descBn: 'ইউসিবি উপায় পার্সোনাল ওয়ালেট পেআউট',
                  descEn: 'UCB Upay personal wallet payout',
                  color: 'text-amber-600 bg-amber-50 border-amber-200',
                  icon: Icons.Zap,
                  badge: 'ইউসিবি',
                  minBn: '৫০৳',
                  minEn: '৳50',
                },
                {
                  id: 'binance',
                  nameBn: 'বাইনেন্স (Binance Pay / USDT)',
                  nameEn: 'Binance Pay (USDT)',
                  descBn: 'বাইনেন্স পে আইডি বা USDT (BEP20 / TRC20)',
                  descEn: 'Binance Pay ID or USDT crypto address',
                  color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
                  icon: Icons.Coins,
                  badge: 'ক্রিপ্টো',
                  minBn: '$১ (৳১২০)',
                  minEn: '$1 (৳120)',
                },
                {
                  id: 'upi',
                  nameBn: 'ইউপিআই (UPI)',
                  nameEn: 'UPI (India / Cross-border)',
                  descBn: 'ভারত ও প্রবাসী ইউপিআই ভার্চুয়াল আইডি (VPA)',
                  descEn: 'Instant UPI Virtual Payment Address',
                  color: 'text-teal-600 bg-teal-50 border-teal-200',
                  icon: Icons.QrCode,
                  badge: 'ইউপিআই',
                  minBn: '₹৫০ (৳৭০)',
                  minEn: '₹50 (৳70)',
                },
                {
                  id: 'gpay',
                  nameBn: 'গুগল পে (Google Pay)',
                  nameEn: 'Google Pay (GPay)',
                  descBn: 'গুগল পে রেজিস্টার্ড মোবাইল বা জিপে আইডি',
                  descEn: 'Google Pay mobile or GPay ID',
                  color: 'text-blue-600 bg-blue-50 border-blue-200',
                  icon: Icons.CreditCard,
                  badge: 'গুগল পে',
                  minBn: '₹৫০ (৳৭০)',
                  minEn: '₹50 (৳70)',
                },
                {
                  id: 'paytm',
                  nameBn: 'পেটিএম (Paytm)',
                  nameEn: 'Paytm Wallet / UPI',
                  descBn: 'পেটিএম ওয়ালেট বা পেমেন্টস ব্যাংক নম্বর',
                  descEn: 'Paytm wallet or payments bank number',
                  color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
                  icon: Icons.Wallet,
                  badge: 'পেটিএম',
                  minBn: '₹৫০ (৳৭০)',
                  minEn: '₹50 (৳70)',
                },
                {
                  id: 'bank',
                  nameBn: 'ব্যাংক ট্রান্সফার (Bank Transfer)',
                  nameEn: 'Bank Transfer (All Banks)',
                  descBn: 'যেকোনো বাংলাদেশি ব্যাংকের একাউন্টে সরাসরি ডিপোজিট',
                  descEn: 'Direct bank account transfer (All Banks)',
                  color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                  icon: Icons.Building2,
                  badge: 'সকল ব্যাংক',
                  minBn: '৫০০৳',
                  minEn: '৳500',
                },
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = selectedMethod === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedMethod(item.id as TransferMethodType);
                      setTransferSuccess(false);
                      setTransferError(null);
                    }}
                    className={`rounded-xl border p-2.5 sm:py-2 sm:px-3 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-500/30 shadow-xs'
                        : 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : `${item.color} border-slate-200/80`
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug truncate">
                            {lang === 'bn' ? item.nameBn : item.nameEn}
                          </h4>
                          <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.2 rounded-md leading-none shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-[10.5px] text-slate-500 font-normal leading-tight mt-0.5 truncate">
                          {lang === 'bn' ? item.descBn : item.descEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-semibold text-slate-500 font-mono">
                        {lang === 'bn' ? `মিনিমাম ${item.minBn}` : `Min ${item.minEn}`}
                      </span>
                      <div
                        className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Icons.Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. BALANCE TRANSFER DESTINATION VIEW */}
        {hubAction === 'transfer' && (
          <div className="space-y-3 animate-fade-in">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
              {lang === 'bn' ? 'ট্রান্সফার গন্তব্য নির্বাচন করুন:' : 'Select Transfer Destination:'}
            </label>

            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  id: 'main-portal',
                  labelBn: 'মেইন অ্যাকাউন্ট',
                  labelEn: 'Main Account UID',
                  descBn: 'ইউনিটি পোর্টাল সেন্ট্রাল ওয়ালেট',
                  icon: Icons.Zap,
                  color: 'text-indigo-600',
                },
                {
                  id: 'p2p',
                  labelBn: 'P2P মেম্বার ওয়ালেট',
                  labelEn: 'Peer Member UID',
                  descBn: 'অন্য ফ্রিল্যান্সার বা বন্ধুর একাউন্ট',
                  icon: Icons.Users,
                  color: 'text-emerald-600',
                },
              ].map((m) => {
                const IconComp = m.icon;
                const isSelected = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedMethod(m.id as TransferMethodType);
                      setTransferSuccess(false);
                      setTransferError(null);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {lang === 'bn' ? m.labelBn : m.labelEn}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {m.descBn}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* INPUT FIELDS SECTION - Slim "চিকন" Aesthetic */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 sm:p-4 space-y-3.5 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Dynamic Target Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                {hubAction === 'transfer' ? (
                  <>
                    <Icons.User className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      {selectedMethod === 'main-portal'
                        ? (lang === 'bn' ? 'মেইন অ্যাকাউন্ট ইউজার আইডি (UID):' : 'Main Portal User ID (UID):')
                        : (lang === 'bn' ? 'রিসিভার ইউজার আইডি (UID):' : 'Receiver Member User ID (UID):')}
                    </span>
                  </>
                ) : (
                  <>
                    {selectedMethod === 'bank' ? (
                      <Icons.Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : selectedMethod === 'binance' ? (
                      <Icons.Coins className="w-3.5 h-3.5 text-yellow-600" />
                    ) : selectedMethod === 'upi' ? (
                      <Icons.QrCode className="w-3.5 h-3.5 text-teal-600" />
                    ) : selectedMethod === 'gpay' ? (
                      <Icons.CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    ) : selectedMethod === 'paytm' ? (
                      <Icons.Wallet className="w-3.5 h-3.5 text-cyan-600" />
                    ) : (
                      <Icons.Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    <span>
                      {selectedMethod === 'bkash'
                        ? (lang === 'bn' ? 'বিকাশ পার্সোনাল মোবাইল নম্বর:' : 'bKash Personal Mobile Number:')
                        : selectedMethod === 'nagad'
                        ? (lang === 'bn' ? 'নগদ পার্সোনাল মোবাইল নম্বর:' : 'Nagad Personal Mobile Number:')
                        : selectedMethod === 'rocket'
                        ? (lang === 'bn' ? 'রকেট অ্যাকাউন্ট নম্বর:' : 'Rocket Account Number:')
                        : selectedMethod === 'upay'
                        ? (lang === 'bn' ? 'উপায় অ্যাকাউন্ট নম্বর:' : 'Upay Account Number:')
                        : selectedMethod === 'binance'
                        ? (lang === 'bn' ? 'বাইনেন্স পে আইডি বা USDT এড্রেস:' : 'Binance Pay ID or USDT Address:')
                        : selectedMethod === 'upi'
                        ? (lang === 'bn' ? 'ইউপিআই আইডি (UPI ID / VPA):' : 'UPI ID (Virtual Payment Address):')
                        : selectedMethod === 'gpay'
                        ? (lang === 'bn' ? 'গুগল পে নম্বর বা UPI ID:' : 'Google Pay Mobile / UPI ID:')
                        : selectedMethod === 'paytm'
                        ? (lang === 'bn' ? 'পেটিএম নম্বর বা UPI ID:' : 'Paytm Mobile / UPI ID:')
                        : selectedMethod === 'bank'
                        ? (lang === 'bn' ? 'ব্যাংক একাউন্ট নম্বর, ব্যাংক ও ব্রাঞ্চ নাম:' : 'Bank Account No, Bank Name & Branch:')
                        : (lang === 'bn' ? 'হিসাব নম্বর বা রিসিভার আইডি:' : 'Account Number / Receiver ID:')}
                    </span>
                  </>
                )}
              </label>

              <input
                type="text"
                value={transferTarget}
                onChange={(e) => {
                  setTransferTarget(e.target.value);
                  setTransferSuccess(false);
                  setTransferError(null);
                }}
                disabled={transferring}
                className="w-full clay-input bg-white border border-slate-200/90 rounded-xl px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 font-mono shadow-2xs"
                placeholder={
                  hubAction === 'transfer'
                    ? selectedMethod === 'main-portal'
                      ? 'e.g. UE-MAIN-7701'
                      : 'e.g. UE-2026-8942'
                    : selectedMethod === 'bkash'
                    ? '০১৭XXXXXXXX (১১ ডিজিটের বিকাশ নম্বর)'
                    : selectedMethod === 'nagad'
                    ? '০১৮XXXXXXXX (১১ ডিজিটের নগদ নম্বর)'
                    : selectedMethod === 'rocket'
                    ? '০১৯XXXXXXXXX (১২ ডিজিটের রকেট নম্বর)'
                    : selectedMethod === 'upay'
                    ? '০১৬XXXXXXXX (১১ ডিজিটের উপায় নম্বর)'
                    : selectedMethod === 'binance'
                    ? 'Binance Pay ID (যেমন: 29847192) বা USDT Address'
                    : selectedMethod === 'upi'
                    ? 'username@oksbi বা username@okhdfcbank'
                    : selectedMethod === 'gpay'
                    ? 'গুগল পে মোবাইল নম্বর বা GPay ID'
                    : selectedMethod === 'paytm'
                    ? 'পেটিএম নম্বর বা @paytm UPI'
                    : selectedMethod === 'bank'
                    ? 'হিসাব নং: ২০৫০... | ব্যাংক: ইসলামী ব্যাংক | ব্রাঞ্চ: মতিঝিল'
                    : '017xxxxxxxx'
                }
              />
            </div>

            {/* Amount Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <Icons.Coins className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {hubAction === 'withdraw'
                      ? (lang === 'bn' ? 'উত্তোলনের পরিমাণ (টাকা):' : 'Withdrawal Amount (BDT):')
                      : (lang === 'bn' ? 'ট্রান্সফারের পরিমাণ (টাকা):' : 'Transfer Amount (BDT):')}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTransferAmount(profile.balance.toFixed(0));
                    setTransferSuccess(false);
                    setTransferError(null);
                  }}
                  disabled={transferring || profile.balance <= 0}
                  className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
                >
                  {lang === 'bn' ? 'সব ব্যালেন্স পাঠান' : 'Send All Balance'}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => {
                    setTransferAmount(e.target.value);
                    setTransferSuccess(false);
                    setTransferError(null);
                  }}
                  disabled={transferring}
                  className="w-full clay-input bg-white border border-slate-200/90 rounded-xl px-3 py-2 sm:py-2.5 pl-7 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 font-mono shadow-2xs"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Quick Amount Selector Chips - Slim & Compact */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span className="text-[10px] font-bold text-slate-400 mr-0.5">
              {lang === 'bn' ? 'কুইক সিলেক্ট:' : 'Quick Select:'}
            </span>
            {[100, 200, 500, 1000, 2000, 5000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setTransferAmount(amt.toString());
                  setTransferSuccess(false);
                  setTransferError(null);
                }}
                className="text-[10px] font-bold font-mono px-2 py-0.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-md border border-slate-200 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                +৳{amt}
              </button>
            ))}
          </div>

          {/* Messages & Actions */}
          {transferError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold animate-shake">
              <Icons.AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{transferError}</span>
            </div>
          )}

          {transferSuccess && latestTrxData && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 animate-scale-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
                  <Icons.CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>
                    {hubAction === 'withdraw'
                      ? (lang === 'bn' ? 'উইথড্র রিকোয়েস্ট সফল হয়েছে! ৫-১৫ মিনিটে টাকা পৌঁছাবে।' : 'Withdrawal Request Submitted! Arriving in 5-15 mins.')
                      : (lang === 'bn' ? 'ব্যালেন্স ট্রান্সফার সফল হয়েছে!' : 'Transfer Completed Successfully!')}
                  </span>
                </div>
                <span className="text-xs font-black text-emerald-700 font-mono">
                  -৳{latestTrxData.amountBDT.toLocaleString('en-US')}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] bg-white p-2.5 rounded-xl border border-emerald-100">
                <div className="font-mono text-slate-600">
                  <span className="font-bold text-slate-400">TRX ID:</span> {latestTrxData.trxId}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyTrx(latestTrxData.trxId)}
                  className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedTrxId === latestTrxData.trxId ? (
                    <>
                      <Icons.Check className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Icons.Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'কপি TRX' : 'Copy TRX'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <Icons.ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? '০% ট্রানজেকশন ফি (ইনস্ট্যান্ট সেটেলমেন্ট)' : '0% Fee Instant Settlement'}</span>
            </span>

            <button
              onClick={handleBalanceTransfer}
              disabled={transferring || !transferTarget || !transferAmount}
              className={`min-w-[150px] text-white font-extrabold px-5 py-2.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow cursor-pointer ${
                hubAction === 'withdraw'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              }`}
            >
              {transferring ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'bn' ? 'প্রসেসিং হচ্ছে...' : 'Processing...'}</span>
                </>
              ) : (
                <>
                  {hubAction === 'withdraw' ? (
                    <>
                      <Icons.Download className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'উইথড্র কনফার্ম করুন' : 'Confirm Withdrawal'}</span>
                    </>
                  ) : (
                    <>
                      <Icons.ArrowRightLeft className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'ব্যালেন্স ট্রান্সফার করুন' : 'Confirm & Transfer'}</span>
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- BALANCE TRANSFER HISTORY CARD --- */}
      <div className="bg-white rounded-[1.25rem] border border-slate-200/90 p-4 sm:p-5 space-y-4 shadow-sm" id="transfer-history-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug tracking-tight flex items-center gap-2">
            <Icons.History className="w-5 h-5 text-emerald-600" />
            {lang === 'bn' ? 'ট্রান্সফার ও উত্তোলন হিস্টোরি' : 'Payout & Transfer History'}
          </h3>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200/80 self-start sm:self-auto leading-none">
            {lang === 'bn' ? `${filteredTransactions.length} টি লেনদেন` : `${filteredTransactions.length} Transactions`}
          </span>
        </div>

        {/* Filter Chips & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: lang === 'bn' ? 'সব' : 'All' },
              { id: 'main-portal', label: 'মেইন UID' },
              { id: 'bkash', label: 'বিকাশ' },
              { id: 'nagad', label: 'নগদ' },
              { id: 'rocket', label: 'রকেট' },
              { id: 'upay', label: 'উপায়' },
              { id: 'p2p', label: 'P2P' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setHistoryFilter(tab.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  historyFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Icons.Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder={lang === 'bn' ? 'TRX ID খুঁজুন...' : 'Search TRX...'}
              className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-700 outline-none focus:bg-white focus:border-emerald-500 w-full sm:w-40"
            />
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredTransactions.map((trx) => (
            <div
              key={trx.id}
              className="p-3.5 bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleCopyTrx(trx.trxId)}
                    className="font-mono text-xs font-black text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200/60 flex items-center gap-1 shadow-2xs cursor-pointer transition-all"
                  >
                    <Icons.Receipt className="w-3.5 h-3.5 text-indigo-500" />
                    TRX: {trx.trxId}
                    {copiedTrxId === trx.trxId && <Icons.Check className="w-3 h-3 text-emerald-600 ml-0.5" />}
                  </button>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
                    <Icons.CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {trx.status}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-700 flex items-center gap-2 mt-1">
                  <span>{trx.method}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-mono text-[11px]">{trx.receiver}</span>
                </div>

                <div className="text-[10px] text-slate-400 font-medium font-mono flex items-center gap-1">
                  <Icons.Clock className="w-3 h-3 text-slate-400" />
                  {trx.date}
                </div>
              </div>

              <div className="text-right sm:self-center bg-rose-50/60 px-3 py-1.5 rounded-xl border border-rose-100/80">
                <span className="text-sm md:text-base font-black text-rose-600 font-mono block">
                  -৳{toBnNum(trx.amountBDT.toLocaleString('en-US'))}
                </span>
                <span className="text-[9px] text-rose-700 font-extrabold uppercase tracking-wider block">
                  {lang === 'bn' ? 'স্থানান্তরিত' : 'Debited'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Website Link Button */}
      <a 
        href="https://unityearning.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-base flex items-center justify-center gap-2 shadow-md cursor-pointer mb-2"
      >
        <Icons.Globe className="w-5 h-5" />
        <span>{lang === 'bn' ? 'মেইন ওয়েবসাইট' : 'Main Website'}</span>
        <Icons.ExternalLink className="w-4 h-4 ml-1 opacity-70" />
      </a>

      {/* Training Video Player */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
          <Icons.Video className="w-5 h-5 text-blue-600" />
          {lang === 'bn' ? 'অনলাইন আয়ের ট্রেনিং ভিডিও' : 'Core Platform Tutorial Class'}
        </h3>
        <div className="w-full aspect-video rounded-2xl bg-slate-900 overflow-hidden relative border border-slate-800 shadow-md">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/8BDa9vuxjdE?si=wlk75FhBqmMPrNAm"
            title="Training Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-[11px] text-slate-500 font-medium leading-relaxed bg-blue-50 p-3 rounded-xl border border-blue-100">
          {lang === 'bn' 
            ? 'উপরে দেওয়া ভিডিওটি সম্পূর্ণ মনোযোগ দিয়ে দেখুন। এই ভিডিওতে আপনি শিখতে পারবেন কীভাবে সঠিকভাবে কাজ করতে হয় এবং কীভাবে বেশি ইনকাম করতে হয়।'
            : 'Watch the video above carefully. In this video, you will learn how to work correctly and maximize your earnings.'}
        </p>
      </div>

      {/* Download App Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl -mr-8 -mt-8" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left flex-1">
            <h3 className="font-extrabold text-lg leading-tight flex items-center justify-center md:justify-start gap-2">
              <Icons.Smartphone className="w-5 h-5 animate-pulse text-blue-200" />
              {lang === 'bn' ? 'অফিসিয়াল মোবাইল অ্যাপ ডাউনলোড' : 'Download Official Mobile App'}
            </h3>
            <p className="text-xs text-blue-100 font-medium max-w-lg">
              {lang === 'bn' ? 'ফোনে সরাসরি অ্যাপ হিসেবে ইন্সটল করে আরো দ্রুত ও সহজে কাজ করুন। এক ক্লিকে অফলাইন সাপোর্ট সহ।' : 'Install as a fast native app on your phone for immediate access, smoother performance, and offline support.'}
            </p>
          </div>
          
          <div className="w-full md:w-auto min-w-[200px]">
            {downloadProgress === null ? (
              <button
                onClick={handleDownloadApp}
                className="w-full bg-white hover:bg-blue-50 text-indigo-700 font-black text-xs px-6 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Icons.Download className="w-4 h-4 text-indigo-600" />
                {lang === 'bn' ? 'অ্যাপ ডাউনলোড করুন' : 'Download Now'}
              </button>
            ) : downloadProgress < 100 ? (
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>{lang === 'bn' ? 'ডাউনলোড হচ্ছে...' : 'Downloading...'}</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-150"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-emerald-500 text-white p-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs shadow-inner animate-scale-up">
                <Icons.CheckCircle className="w-4 h-4 text-white" />
                <span>{lang === 'bn' ? 'ডাউনলোড সম্পূর্ণ! (v2.4.0)' : 'App Downloaded! (v2.4.0)'}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Completion Log history */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
          <Icons.History className="w-5 h-5 text-indigo-600" />
          {lang === 'bn' ? 'আর্নিং ও কাজের হিস্ট্রি' : 'Task Submission History'}
        </h3>

        {taskLogs.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs md:text-sm">
            {lang === 'bn' ? 'এখনো কোনো টাস্ক সম্পন্ন হয়নি!' : 'No tasks submitted yet.'}
          </div>
        ) : (
          <div className="space-y-3">
            {taskLogs.map((log) => {
              const isDebit = log.reward < 0;
              return (
                <div key={log.id} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <h4 className="font-bold text-xs text-slate-700">
                      {lang === 'bn' ? log.jobTitleBn : log.jobTitleEn}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">{log.date}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-black block ${isDebit ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {isDebit
                        ? (lang === 'bn' ? `-৳${Math.abs(log.reward * 100).toFixed(0)}` : `-$${Math.abs(log.reward).toFixed(2)}`)
                        : (lang === 'bn' ? `+৳${(log.reward * 100).toFixed(0)}` : `+$${log.reward.toFixed(2)}`)}
                    </span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                      isDebit 
                        ? 'text-rose-700 bg-rose-50' 
                        : 'text-emerald-700 bg-emerald-50'
                    }`}>
                      {isDebit 
                        ? (lang === 'bn' ? 'স্থানান্তরিত' : 'TRANSFERRED') 
                        : 'SUCCESS'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Official Community Channels (Facebook, WhatsApp, Telegram, YouTube) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col items-center justify-center">
        <SocialLinksBar
          title={lang === 'bn' ? 'অফিসিয়াল কমিউনিটি ও সাপোর্ট চ্যানেল' : 'Official Community & Support Channels'}
          variant="light"
        />
      </div>

      {/* App Installation Guide Modal */}
      {showAppInstallModal && (
        <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in select-none">
          <div className="bg-white rounded-[1.25rem] max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-scale-up text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Icons.Smartphone className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                {lang === 'bn' ? 'অ্যাপ ইনস্টল নির্দেশিকা' : 'Install App on Your Device'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'পুরো অ্যাপ্লিকেশনটি আপনার মোবাইল স্ক্রিনে লাইটওয়েট অ্যাপ আকারে যুক্ত করতে ব্রাউজারের ওপরের ডানদিকের মেনু (⋮ বা Share) থেকে "Add to Home screen" বা "Install App" অপশনে ট্যাপ করুন।'
                  : 'To add Unity Earning directly to your home screen, tap the browser menu (⋮ or Share) and select "Add to Home screen" or "Install App".'}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11.5px] text-slate-700 text-left space-y-1.5 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <span>{lang === 'bn' ? 'ব্রাউজারের মেনু বোতামে (⋮) ক্লিক করুন' : 'Tap browser menu (⋮)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <span>{lang === 'bn' ? '"Add to Home screen" সিলেক্ট করুন' : 'Select "Add to Home screen"'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <span>{lang === 'bn' ? 'হোম স্ক্রিন থেকে ১-ক্লিকে ওপেন করুন' : 'Launch anytime with 1 tap'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAppInstallModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {lang === 'bn' ? 'বুঝেছি (Close)' : 'Got it (Close)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
