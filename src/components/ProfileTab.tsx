import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile, TaskLog } from '../types';

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

type TransferMethodType = 'main-portal' | 'bkash' | 'nagad' | 'rocket' | 'p2p';

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

  const handleDownloadApp = () => {
    if (downloadProgress !== null) return;
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            alert(
              lang === 'bn'
                ? 'পুরো অ্যাপটি আপনার ফোনে ইনস্টল করতে ব্রাউজারের মেনু (⋮) থেকে "Add to Home screen" বা "Install App" এ ক্লিক করুন।'
                : 'To install the full app on your phone, click "Add to Home screen" or "Install App" from your browser menu (⋮).'
            );
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
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
          {/* Avatar Section with Notification Bell on Left */}
          <div className="relative group flex items-center justify-center">
            {/* Notification Bell Button next to Avatar */}
            {onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                className="absolute -left-14 sm:-left-20 top-2 w-9 h-9 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
                title="Notifications"
                id="profile-notification-btn"
                type="button"
              >
                <Icons.Bell className="w-4 h-4 text-blue-600" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  12
                </span>
              </button>
            )}

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
            {/* 2-Column Row for Financial Balances */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
              {/* Current Balance Card */}
              <div className="bg-emerald-50/50 border border-emerald-200/80 p-3 sm:p-4 rounded-xl flex flex-col justify-between text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs text-emerald-800 font-bold uppercase tracking-tight">
                    {lang === 'bn' ? 'চলতি ব্যালেন্স' : 'Available Balance'}
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Icons.Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-base sm:text-xl font-bold text-emerald-900 font-mono tabular-nums tracking-tight leading-none whitespace-nowrap overflow-x-auto no-scrollbar">
                  {lang === 'bn' ? `৳${toBnNum(profile.balance.toLocaleString('en-US'))}` : `৳${profile.balance.toLocaleString('en-US')}`}
                </div>
              </div>

              {/* Total Income Card */}
              <div className="bg-blue-50/50 border border-blue-200/80 p-3 sm:p-4 rounded-xl flex flex-col justify-between text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs text-blue-800 font-bold uppercase tracking-tight">
                    {lang === 'bn' ? 'টোটাল ইনকাম' : 'Total Earnings'}
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Icons.TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-base sm:text-xl font-bold text-blue-900 font-mono tabular-nums tracking-tight leading-none whitespace-nowrap overflow-x-auto no-scrollbar">
                  {lang === 'bn' ? `৳${toBnNum((profile.totalIncome ?? profile.balance).toLocaleString('en-US'))}` : `৳${(profile.totalIncome ?? profile.balance).toLocaleString('en-US')}`}
                </div>
              </div>
            </div>

            {/* 2-Column Row for Completed Tasks and Total Withdrawals */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
              {/* Completed Tasks Card */}
              <div className="bg-purple-50/50 border border-purple-200/80 p-3 sm:p-4 rounded-xl flex flex-col justify-between text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs text-purple-800 font-bold uppercase tracking-tight">
                    {lang === 'bn' ? 'মোট সম্পন্ন কাজ' : 'Tasks Done'}
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Icons.CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="text-sm sm:text-lg font-bold text-purple-900 font-mono tabular-nums">
                  {lang === 'bn' ? toBnNum(profile.tasksCompleted) : profile.tasksCompleted} {lang === 'bn' ? 'টি' : 'Tasks'}
                </div>
              </div>

              {/* Total Withdrawals Card */}
              <div className="bg-slate-50 border border-slate-200/80 p-3 sm:p-4 rounded-xl flex flex-col justify-between text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs text-slate-700 font-bold uppercase tracking-tight">
                    {lang === 'bn' ? 'মোট উত্তোলন / স্থানান্তরিত' : 'Total Transferred'}
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700">
                    <Icons.ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                  </div>
                </div>
                <div className="text-sm sm:text-lg font-bold text-slate-900 font-mono tabular-nums">
                  ৳{toBnNum(totalWithdrawn.toLocaleString('en-US'))}
                </div>
              </div>
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

      {/* --- UPGRADED BALANCE TRANSFER WIDGET --- */}
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

        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          {lang === 'bn'
            ? 'আপনার অর্জিত ব্যালেন্স সরাসরি ইউনিটি মেইন অ্যাকাউন্ট, বিকাশ, নগদ, রকেট অথবা অন্য যেকোনো ইউজার অ্যাকাউন্টে দ্রুত ও নিরাপদে ট্রান্সফার করুন।'
            : 'Transfer your wallet earnings instantly to your main portal registration, bKash, Nagad, Rocket, or another user account.'}
        </p>

        {/* Transfer Method Selector Chips */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-600 block uppercase tracking-wider">
            {lang === 'bn' ? 'ট্রান্সফার মাধ্যম নির্বাচন করুন:' : 'Select Transfer Destination:'}
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'main-portal', labelBn: 'মেইন অ্যাকাউন্ট', labelEn: 'Main UID', icon: Icons.Zap, color: 'text-indigo-600' },
              { id: 'bkash', labelBn: 'বিকাশ (bKash)', labelEn: 'bKash', icon: Icons.Smartphone, color: 'text-pink-600' },
              { id: 'nagad', labelBn: 'নগদ (Nagad)', labelEn: 'Nagad', icon: Icons.Flame, color: 'text-orange-600' },
              { id: 'rocket', labelBn: 'রকেট (Rocket)', labelEn: 'Rocket', icon: Icons.Radio, color: 'text-purple-600' },
              { id: 'p2p', labelBn: 'P2P ইউজার', labelEn: 'Peer UID', icon: Icons.Users, color: 'text-emerald-600' }
            ].map((method) => {
              const IconComp = method.icon;
              const isSelected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(method.id as TransferMethodType);
                    setTransferSuccess(false);
                    setTransferError(null);
                  }}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-[1.02]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : method.color}`} />
                  <span className="text-[11px]">{lang === 'bn' ? method.labelBn : method.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 md:p-5 space-y-4 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dynamic Target Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Icons.User className="w-3.5 h-3.5 text-indigo-500" />
                {selectedMethod === 'main-portal' || selectedMethod === 'p2p'
                  ? (lang === 'bn' ? 'রিসিভার ইউজার আইডি (UID):' : 'Receiver User ID (UID):')
                  : (lang === 'bn' ? 'রিসিভার মোবাইল নম্বর (017...):' : 'Receiver Mobile Number:')}
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
                className="w-full clay-input bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 font-mono"
                placeholder={
                  selectedMethod === 'main-portal'
                    ? 'e.g. UE-MAIN-7701'
                    : selectedMethod === 'p2p'
                    ? 'e.g. UE-2026-8942'
                    : 'e.g. 017xxxxxxxx'
                }
              />
            </div>

            {/* Amount Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Icons.Coins className="w-3.5 h-3.5 text-emerald-500" />
                  {lang === 'bn' ? 'ট্রান্সফার পরিমাণ (টাকা):' : 'Transfer Amount (BDT):'}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTransferAmount(profile.balance.toFixed(0));
                    setTransferSuccess(false);
                    setTransferError(null);
                  }}
                  disabled={transferring || profile.balance <= 0}
                  className="text-[10px] font-extrabold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
                >
                  {lang === 'bn' ? 'সবটুকু পাঠান' : 'Send All'}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => {
                    setTransferAmount(e.target.value);
                    setTransferSuccess(false);
                    setTransferError(null);
                  }}
                  disabled={transferring}
                  className="w-full clay-input bg-white border border-slate-200 rounded-xl p-3 pl-8 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 font-mono"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Quick Amount Selector Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-slate-400 mr-1">
              {lang === 'bn' ? 'কুইক অ্যামাউন্ট:' : 'Quick Select:'}
            </span>
            {[500, 1000, 2000, 5000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setTransferAmount(amt.toString());
                  setTransferSuccess(false);
                  setTransferError(null);
                }}
                className="text-[10px] font-bold font-mono px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 transition-all cursor-pointer"
              >
                +৳{toBnNum(amt)}
              </button>
            ))}
          </div>

          {/* Messages & Actions */}
          {transferError && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold animate-shake">
              <Icons.AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{transferError}</span>
            </div>
          )}

          {transferSuccess && latestTrxData && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 animate-scale-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
                  <Icons.CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'bn' ? 'ব্যালেন্স ট্রান্সফার সফল হয়েছে!' : 'Transfer Completed Successfully!'}</span>
                </div>
                <span className="text-xs font-black text-emerald-700 font-mono">
                  -৳{toBnNum(latestTrxData.amountBDT.toLocaleString('en-US'))}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] bg-white p-2.5 rounded-xl border border-emerald-100">
                <div className="font-mono text-slate-600">
                  <span className="font-bold text-slate-400">TRX:</span> {latestTrxData.trxId}
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
              {lang === 'bn' ? '০% ট্রানজেকশন ফি (ইনস্ট্যান্ট সেটেলমেন্ট)' : '0% Fee Instant Settlement'}
            </span>

            <button
              onClick={handleBalanceTransfer}
              disabled={transferring || !transferTarget || !transferAmount}
              className="min-w-[160px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow cursor-pointer"
            >
              {transferring ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'bn' ? 'প্রসেসিং হচ্ছে...' : 'Processing...'}</span>
                </>
              ) : (
                <>
                  <Icons.ArrowRightLeft className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'কনফার্ম ও ট্রান্সফার করুন' : 'Confirm & Transfer'}</span>
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
    </div>
  );
}
