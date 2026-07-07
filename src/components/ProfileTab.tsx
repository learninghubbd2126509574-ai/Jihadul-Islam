import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile, TaskLog } from '../types';

interface ProfileTabProps {
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog?: (newLog: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => void;
  taskLogs: TaskLog[];
  lang: 'bn' | 'en';
}

export default function ProfileTab({ profile, updateProfile, addLog, taskLogs, lang }: ProfileTabProps) {
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
          
          // Instead of downloading a fake broken APK, we instruct the user to use Add to Home Screen
          setTimeout(() => {
            alert(lang === 'bn' ? 'পুরো অ্যাপটি আপনার ফোনে ইনস্টল করতে ব্রাউজারের মেনু (⋮) থেকে "Add to Home screen" বা "Install App" এ ক্লিক করুন।' : 'To install the full app on your phone, click "Add to Home screen" or "Install App" from your browser menu (⋮).');
          }, 500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // 6 beautiful avatars for quick selection
  const avatarPresets = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150'
  ];

  const [editBalance, setEditBalance] = useState((profile.balance * 100).toFixed(0));
  const [editTotalIncome, setEditTotalIncome] = useState(((profile.totalIncome ?? profile.balance) * 100).toFixed(0));
  const [editTasksCompleted, setEditTasksCompleted] = useState(profile.tasksCompleted.toString());

  // Balance transfer states
  const [transferUID, setTransferUID] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);
  const [transferring, setTransferring] = useState(false);

  const startEditing = () => {
    setName(profile.fullName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setBio(profile.bio);
    setAddress(profile.address);
    setEditBalance((profile.balance * 100).toFixed(0));
    setEditTotalIncome(((profile.totalIncome ?? profile.balance) * 100).toFixed(0));
    setEditTasksCompleted(profile.tasksCompleted.toString());
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
      balance: parsedBalance / 100,
      totalIncome: parsedTotalIncome / 100,
      tasksCompleted: parsedTasksCompleted
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

    if (!transferUID.trim()) {
      setTransferError(lang === 'bn' ? 'দয়া করে একটি সঠিক ইউজার আইডি (UID) প্রবেশ করান।' : 'Please enter a valid User ID (UID).');
      return;
    }

    const amountInBDT = parseFloat(transferAmount) || 0;
    const availableBDT = profile.balance * 100;

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
      const deductionInUSD = amountInBDT / 100;
      const nextBalance = Math.max(0, profile.balance - deductionInUSD);

      // Perform updates
      updateProfile({ balance: nextBalance });

      // Add log
      if (addLog) {
        addLog({
          jobId: 'balance-transfer',
          jobTitleBn: `মেইন অ্যাকাউন্টে ব্যালেন্স ট্রান্সফার (UID: ${transferUID.trim()})`,
          jobTitleEn: `Balance Transfer to Main Account (UID: ${transferUID.trim()})`,
          reward: -deductionInUSD
        });
      }

      setTransferSuccess(true);
      setTransferAmount('');
      setTransferring(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in" id="profile-container">
      {/* Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl -ml-6 -mb-6" />

        <div className="flex flex-col items-center text-center relative z-10">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-indigo-500 to-violet-600 shadow-md">
              <img
                src={profile.avatarUrl}
                alt="Profile Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="absolute bottom-0 right-0 bg-[#0f172a] text-white p-2 rounded-full border-2 border-white hover:bg-blue-600 transition-all active:scale-90"
              aria-label="Change Avatar"
            >
              <Icons.Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar Presets Dropdown */}
          {showAvatarPicker && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl w-full max-w-sm">
              <span className="text-xs font-bold text-slate-500 block mb-2">
                {lang === 'bn' ? 'একটি প্রোফাইল ছবি নির্বাচন করুন:' : 'Choose a Profile Avatar Preset:'}
              </span>
              <div className="grid grid-cols-6 gap-2">
                {avatarPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectPreset(preset)}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:border-blue-500 transition-all flex-shrink-0"
                  >
                    <img src={preset} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="mt-3 border-t border-slate-200 pt-3 space-y-3">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">
                    {lang === 'bn' ? 'অথবা নিজের কম্পিউটার থেকে ছবি আপলোড করুন:' : 'Or upload from your computer:'}
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
                    className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-slate-900 file:text-white hover:file:bg-slate-800 file:cursor-pointer cursor-pointer border border-dashed border-slate-200 p-2 rounded-xl"
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
                      className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User ID and Verification Badge */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-slate-500 font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-lg">
              UID: {profile.uid}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-lg font-extrabold flex items-center gap-0.5">
              <Icons.ShieldCheck className="w-3.5 h-3.5 fill-emerald-100" />
              {lang === 'bn' ? 'ভেরিফাইড' : 'VERIFIED'}
            </span>
          </div>

          <h2 className="mt-2 text-xl font-bold text-slate-800 leading-tight">
            {profile.fullName}
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">{profile.email}</p>

          <p className="mt-2.5 text-slate-600 text-xs md:text-sm max-w-sm italic leading-relaxed">
            "{profile.bio}"
          </p>

          {/* Performance stats bento block */}
          <div className="grid grid-cols-3 gap-2.5 w-full mt-6">
            <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-tight block mb-0.5">
                {lang === 'bn' ? 'চলতি ব্যালেন্স' : 'Available Balance'}
              </span>
              <span className="text-sm font-black text-emerald-700 truncate max-w-full">
                {lang === 'bn' ? `৳${(profile.balance * 100).toFixed(0)}` : `$${profile.balance.toFixed(2)}`}
              </span>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[9px] text-blue-600 font-bold uppercase tracking-tight block mb-0.5">
                {lang === 'bn' ? 'টোটাল ইনকাম' : 'Total Earnings'}
              </span>
              <span className="text-sm font-black text-blue-700 truncate max-w-full">
                {lang === 'bn' ? `৳${((profile.totalIncome ?? profile.balance) * 100).toFixed(0)}` : `$${(profile.totalIncome ?? profile.balance).toFixed(2)}`}
              </span>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[9px] text-indigo-600 font-bold uppercase tracking-tight block mb-0.5">
                {lang === 'bn' ? 'সম্পন্ন কাজ' : 'Completed Tasks'}
              </span>
              <span className="text-sm font-black text-indigo-700 truncate max-w-full">
                {profile.tasksCompleted}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form Details View */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-2">
          <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
            <Icons.UserPen className="w-5 h-5 text-blue-600" />
            {lang === 'bn' ? 'ব্যক্তিগত বিবরণ' : 'Personal Details'}
          </h3>
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                startEditing();
              }
            }}
            className="text-xs bg-[#0f172a] text-white font-bold px-4 py-2 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-1.5"
            id="edit-profile-btn"
          >
            {isEditing ? (
              <>
                <Icons.Save className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Info'}
              </>
            ) : (
              <>
                <Icons.Edit3 className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'তথ্য পরিবর্তন' : 'Edit Profile'}
              </>
            )}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'পুরো নাম:' : 'Full Name:'}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'ইমেইল এড্রেস:' : 'Email Address:'}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
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
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'ঠিকানা:' : 'Full Address:'}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
                />
              </div>
            </div>

            {/* Editable Balance, Total Earnings, and Completed Tasks section */}
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
                    className="w-full border border-slate-200 rounded-xl p-3 pl-8 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 font-mono"
                    placeholder="e.g. 1550"
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
                    className="w-full border border-slate-200 rounded-xl p-3 pl-8 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 font-mono"
                    placeholder="e.g. 2550"
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
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50 font-mono"
                  placeholder="e.g. 10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">{lang === 'bn' ? 'আপনার বায়ো / ভূমিকা:' : 'Bio / Short Description:'}</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-20 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3.5 text-xs md:text-sm">
            <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'মোবাইল নাম্বার' : 'Phone'}</span>
              <span className="text-slate-700 font-bold">{profile.phone}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'ঠিকানা' : 'Address'}</span>
              <span className="text-slate-700 font-bold text-right">{profile.address}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'যোগদানের তারিখ' : 'Member Since'}</span>
              <span className="text-slate-700 font-bold">{profile.joinedDate}</span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-slate-400 font-medium">{lang === 'bn' ? 'মেম্বারশিপ লেভেল' : 'Rank'}</span>
              <span className="text-blue-600 font-extrabold bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
                {profile.level}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --- BALANCE TRANSFER WIDGET --- */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 relative overflow-hidden" id="balance-transfer-card">
        {/* Subtle accent border */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
            <Icons.Send className="w-5 h-5 text-emerald-600" />
            {lang === 'bn' ? 'মেইন অ্যাকাউন্টে ব্যালেন্স ট্রান্সফার' : 'Balance Transfer to Main Account'}
          </h3>
          <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 px-2 py-1 rounded-md uppercase font-mono self-start sm:self-auto">
            {lang === 'bn' ? `আপনার UID: ${profile.uid}` : `Your UID: ${profile.uid}`}
          </span>
        </div>

        <p className="text-xs text-slate-400 font-medium">
          {lang === 'bn'
            ? 'আপনার অর্জিত ব্যালেন্স সরাসরি আপনার মেইন অ্যাকাউন্টে বা অন্য যেকোনো ইউজার অ্যাকাউন্টে ট্রান্সফার করতে নিচের ফর্মটি পূরণ করুন। ট্রান্সফার সাথে সাথে সম্পন্ন হয়ে যাবে।'
            : 'Transfer your earnings directly to your main registration account or any other user account using the form below. Transfers are processed instantly.'}
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 md:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UID Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Icons.User className="w-3.5 h-3.5 text-indigo-500" />
                {lang === 'bn' ? 'রিসিভার ইউজার আইডি (UID):' : 'Receiver User ID (UID):'}
              </label>
              <input
                type="text"
                value={transferUID}
                onChange={(e) => {
                  setTransferUID(e.target.value);
                  setTransferSuccess(false);
                  setTransferError(null);
                }}
                disabled={transferring}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white placeholder-slate-300 font-mono"
                placeholder="e.g. UE-2026-8942"
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
                    const availableBDT = (profile.balance * 100).toFixed(0);
                    setTransferAmount(availableBDT);
                    setTransferSuccess(false);
                    setTransferError(null);
                  }}
                  disabled={transferring || profile.balance <= 0}
                  className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
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
                  className="w-full border border-slate-200 rounded-xl p-3 pl-8 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white font-mono"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Messages & Actions */}
          {transferError && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold animate-shake">
              <Icons.AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{transferError}</span>
            </div>
          )}

          {transferSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-bold animate-scale-up">
              <Icons.CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>
                {lang === 'bn'
                  ? `সফলভাবে মেইন অ্যাকাউন্টে ব্যালেন্স ট্রান্সফার হয়েছে! রিসিভার UID: ${transferUID}`
                  : `Successfully transferred balance to UID: ${transferUID}!`}
              </span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleBalanceTransfer}
              disabled={transferring || !transferUID || !transferAmount}
              className="w-full md:w-auto min-w-[160px] bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow cursor-pointer"
            >
              {transferring ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'bn' ? 'ভেরিফাই হচ্ছে...' : 'Verifying...'}</span>
                </>
              ) : (
                <>
                  <Icons.ArrowRightLeft className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'ব্যালেন্স ট্রান্সফার করুন' : 'Confirm & Transfer'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- RECONSTRUCTED DEMO VIDEO PLAYER --- */}
      {/* As requested: "ভিডিওটা যেন থাকি" -> "The video must be there" */}
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
        {/* Decorative Circles */}
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
