import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile, TaskLog } from '../types';
import { TOURNAMENT_GAMES_LIST, TournamentMatch } from '../data/gamingTournaments';

interface GamingTournamentWorkspaceProps {
  lang: 'bn' | 'en';
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog?: (log: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => void;
  onBack?: () => void;
}

interface RegistrationRecord {
  tournamentId: string;
  gameNameBn: string;
  gameNameEn: string;
  inGameName: string;
  inGameId: string;
  teamName: string;
  phone: string;
  registeredAt: string;
  entryFee: number;
  prizePool: string;
  roomId: string;
  roomPass: string;
  status: 'registered' | 'result_submitted' | 'claimed';
  matchScore?: string;
  rewardEarned?: number;
}

export default function GamingTournamentWorkspace({
  lang,
  profile,
  updateProfile,
  addLog,
  onBack,
}: GamingTournamentWorkspaceProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'battle_royale' | 'board' | 'sports' | 'strategy' | 'my_matches'>('all');
  const [selectedMatch, setSelectedMatch] = useState<TournamentMatch | null>(null);
  
  // Registration Form State
  const [inGameName, setInGameName] = useState('');
  const [inGameId, setInGameId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [playerPhone, setPlayerPhone] = useState('');
  const [paymentOption, setPaymentOption] = useState<'balance' | 'promo'>('balance');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regSuccessMatch, setRegSuccessMatch] = useState<TournamentMatch | null>(null);

  // Result Claim State inside Modal
  const [matchScoreInput, setMatchScoreInput] = useState('');
  const [isClaimingReward, setIsClaimingReward] = useState(false);
  const [claimedRewardAmount, setClaimedRewardAmount] = useState<number | null>(null);

  // Local storage / state of registered matches
  const [myRegistrations, setMyRegistrations] = useState<RegistrationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('user_gaming_tournaments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Copy helper
  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Filter matches
  const filteredMatches = TOURNAMENT_GAMES_LIST.filter((m) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'my_matches') return false;
    return m.category === activeCategory;
  });

  // Handle Match Click
  const handleOpenMatch = (match: TournamentMatch) => {
    setSelectedMatch(match);
    setErrorMessage('');
    setRegSuccessMatch(null);
    setMatchScoreInput('');
    setClaimedRewardAmount(null);

    // Check if already registered
    const existing = myRegistrations.find((r) => r.tournamentId === match.id);
    if (existing) {
      setInGameName(existing.inGameName);
      setInGameId(existing.inGameId);
      setTeamName(existing.teamName);
      setPlayerPhone(existing.phone);
    } else {
      setInGameName('');
      setInGameId('');
      setTeamName('');
      setPlayerPhone('');
    }
  };

  // Handle Game ID Submission & Registration
  const handleSubmitGameId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch) return;

    if (!inGameName.trim()) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে আপনার ইন-গেম গেমার নাম লিখুন!' : 'Please enter your In-Game name!');
      return;
    }

    if (!inGameId.trim()) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে সঠিক গেম আইডি / UID নম্বর লিখুন!' : 'Please enter your Game UID / Player ID!');
      return;
    }

    if (!playerPhone.trim()) {
      setErrorMessage(lang === 'bn' ? 'রুম পাসওয়ার্ড নোটিফিকেশনের জন্য ফোন নম্বর দিন!' : 'Please enter your contact phone number!');
      return;
    }

    // Check wallet balance if paymentOption is balance
    const feeInDollars = (selectedMatch.entryFeeNum / 100);
    if (paymentOption === 'balance' && profile.balance < feeInDollars) {
      setErrorMessage(
        lang === 'bn' 
          ? `আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই (প্রয়োজন: $${feeInDollars.toFixed(2)} / ${selectedMatch.entryFeeBn})। অনুগ্রহ করে ওয়ালেট রিচার্জ করুন বা প্রোমোশনাল ফ্রি এন্ট্রি সিলেক্ট করুন।`
          : `Insufficient wallet balance (Requires $${feeInDollars.toFixed(2)} / ${selectedMatch.entryFeeEn}). Please top up or select promotional entry.`
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);

      // Deduct balance if applicable
      if (paymentOption === 'balance') {
        updateProfile({
          balance: Math.max(0, profile.balance - feeInDollars),
        });
      }

      const newRecord: RegistrationRecord = {
        tournamentId: selectedMatch.id,
        gameNameBn: selectedMatch.gameNameBn,
        gameNameEn: selectedMatch.gameNameEn,
        inGameName: inGameName.trim(),
        inGameId: inGameId.trim(),
        teamName: teamName.trim() || 'Solo Player',
        phone: playerPhone.trim(),
        registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        entryFee: selectedMatch.entryFeeNum,
        prizePool: selectedMatch.prizePoolBn,
        roomId: selectedMatch.roomId,
        roomPass: selectedMatch.roomPass,
        status: 'registered'
      };

      const updated = [newRecord, ...myRegistrations.filter(r => r.tournamentId !== selectedMatch.id)];
      setMyRegistrations(updated);
      try {
        localStorage.setItem('user_gaming_tournaments', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }

      setRegSuccessMatch(selectedMatch);
    }, 1000);
  };

  // Claim match prize / submit score
  const handleClaimReward = () => {
    if (!selectedMatch) return;
    if (!matchScoreInput.trim()) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে ম্যাচ রেজাল্ট / কিল সংখ্যা অথবা পজিশন লিখুন!' : 'Please enter your match result/kills/position!');
      return;
    }

    setIsClaimingReward(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsClaimingReward(false);
      // Reward calculation based on entry fee
      const rewardDollar = selectedMatch.entryFeeNum >= 100 ? 5.00 : 3.50;
      setClaimedRewardAmount(rewardDollar);

      // Update profile
      updateProfile({
        balance: profile.balance + rewardDollar,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      if (addLog) {
        addLog({
          jobId: 'gaming-tournament',
          jobTitleBn: `${selectedMatch.gameNameBn} - ${selectedMatch.tournamentTitleBn}`,
          jobTitleEn: `${selectedMatch.gameNameEn} - ${selectedMatch.tournamentTitleEn}`,
          reward: rewardDollar,
        });
      }

      // Update local storage
      const updated = myRegistrations.map((r) => {
        if (r.tournamentId === selectedMatch.id) {
          return {
            ...r,
            status: 'claimed' as const,
            matchScore: matchScoreInput,
            rewardEarned: rewardDollar
          };
        }
        return r;
      });
      setMyRegistrations(updated);
      try {
        localStorage.setItem('user_gaming_tournaments', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-scale-up pb-10">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 border border-indigo-900/60 shadow-xl">
        {/* Background glow & shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-black uppercase tracking-wider">
              <Icons.Gamepad2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{lang === 'bn' ? 'অফিশিয়াল গেমিং টুর্নামেন্ট প্ল্যাটফর্ম' : 'Official Esports Tournament Hub'}</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
              <span>{lang === 'bn' ? 'গেম খেলুন, স্কিল দেখান ও ক্যাশ প্রাইজ জিতুন' : 'Play Esports, Win Cash Prize Pools'}</span>
              <span className="text-amber-400 text-sm font-bold bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-lg">
                {lang === 'bn' ? '১০টি লাইভ গেম' : '10 Live Games'}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === 'bn' 
                ? 'ফ্রি ফায়ার, পাবজি, কল অফ ডিউটি, লুডু ও ক্ল্যাশ অফ ক্ল্যানস সহ প্রিয় গেমে নিজের গেম আইডি সাবমিট করে টুর্নামেন্টে জয়েন করুন। প্রতিটি ম্যাচে রয়েছে বিশাল প্রাইজপুল ও পার-কিল ক্যাশ রিওয়ার্ড!'
                : 'Join top esports matches like Free Fire, PUBG, COD Mobile, Ludo & Clash of Clans by submitting your Game UID. Win huge prize pools and per-kill cash bonuses!'}
            </p>
          </div>

          {/* Highlights Widget */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 shrink-0">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                {lang === 'bn' ? 'মোট প্রাইজপুল' : 'Total Prize Pool'}
              </span>
              <span className="text-base sm:text-lg font-black text-amber-400 font-mono">
                ৳২২,৫০০+
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                {lang === 'bn' ? 'অ্যাক্টিভ গেমার' : 'Active Players'}
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-400 font-mono flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                ৩৬৫+ জন
              </span>
            </div>
          </div>
        </div>

        {/* Info Strip */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Icons.ShieldCheck className="w-3.5 h-3.5" />
              {lang === 'bn' ? '১০০% ইনস্ট্যান্ট ওয়ালেট ক্যাশআউট' : '100% Instant Wallet Cashout'}
            </span>
            <span className="flex items-center gap-1.5 text-indigo-300 font-semibold">
              <Icons.Zap className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'এন্ট্রি ফি: ৫০৳, ১০০৳, ২০০৳' : 'Entry Fees: ৳50, ৳100, ৳200'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">{lang === 'bn' ? 'আপনার ব্যালেন্স:' : 'Your Balance:'}</span>
            <span className="font-mono font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              ${profile.balance.toFixed(2)} (৳{Math.round(profile.balance * 100)})
            </span>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeCategory === 'all'
              ? 'bg-slate-900 text-white shadow-sm ring-2 ring-indigo-500/30'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Icons.Gamepad className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'সকল ১০টি গেমস' : 'All 10 Games'}</span>
        </button>

        <button
          onClick={() => setActiveCategory('battle_royale')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeCategory === 'battle_royale'
              ? 'bg-slate-900 text-white shadow-sm ring-2 ring-indigo-500/30'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Icons.Crosshair className="w-3.5 h-3.5 text-rose-500" />
          <span>{lang === 'bn' ? 'ব্যাটল রয়্যাল (ফ্রি ফায়ার, পাবজি, COD)' : 'Battle Royale (FF, PUBG, COD)'}</span>
        </button>

        <button
          onClick={() => setActiveCategory('board')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeCategory === 'board'
              ? 'bg-slate-900 text-white shadow-sm ring-2 ring-indigo-500/30'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Icons.Dice5 className="w-3.5 h-3.5 text-amber-500" />
          <span>{lang === 'bn' ? 'বোর্ড ও লুডু (লুডু কিং, ক্যারম)' : 'Board & Casual (Ludo, Carrom)'}</span>
        </button>

        <button
          onClick={() => setActiveCategory('strategy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeCategory === 'strategy'
              ? 'bg-slate-900 text-white shadow-sm ring-2 ring-indigo-500/30'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Icons.Swords className="w-3.5 h-3.5 text-indigo-500" />
          <span>{lang === 'bn' ? 'স্ট্র্যাটেজি (COC, MLBB, চেস)' : 'Strategy & MOBA'}</span>
        </button>

        <button
          onClick={() => setActiveCategory('sports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeCategory === 'sports'
              ? 'bg-slate-900 text-white shadow-sm ring-2 ring-indigo-500/30'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Icons.Trophy className="w-3.5 h-3.5 text-emerald-500" />
          <span>{lang === 'bn' ? 'স্পোর্টস (eFootball, 8 Ball Pool)' : 'Sports (PES, 8 Ball)'}</span>
        </button>

        <button
          onClick={() => setActiveCategory('my_matches')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ml-auto ${
            activeCategory === 'my_matches'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
          }`}
        >
          <Icons.CheckCircle2 className="w-3.5 h-3.5" />
          <span>
            {lang === 'bn' ? `আমার যুক্ত হওয়া ম্যাচ (${myRegistrations.length})` : `My Matches (${myRegistrations.length})`}
          </span>
        </button>
      </div>

      {/* 3. MY REGISTERED MATCHES VIEW */}
      {activeCategory === 'my_matches' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <Icons.ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bn' ? 'আপনার রেজিস্ট্রি করা টুর্নামেন্ট রুম ও ম্যাচের তালিকা' : 'Your Registered Tournaments & Room Details'}</span>
            </h3>
            <button
              onClick={() => setActiveCategory('all')}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              {lang === 'bn' ? 'নতুন টুর্নামেন্ট খুঁজুন →' : 'Browse New Matches →'}
            </button>
          </div>

          {myRegistrations.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-3">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <Icons.Gamepad2 className="w-7 h-7" />
              </div>
              <h4 className="font-extrabold text-slate-800 text-sm">
                {lang === 'bn' ? 'আপনি এখনো কোনো টুর্নামেন্টে জয়েন করেননি!' : 'You have not joined any tournament yet!'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {lang === 'bn'
                  ? 'নিচের যেকোনো গেম কার্ডে ক্লিক করে আপনার গেম আইডি সাবমিট করুন এবং টুর্নামেন্ট রুমে যুক্ত হন।'
                  : 'Click on any game card below to submit your Game UID and get custom room credentials.'}
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
              >
                {lang === 'bn' ? 'টুর্নামেন্ট তালিকা দেখুন' : 'View Tournaments'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myRegistrations.map((reg) => {
                const matchData = TOURNAMENT_GAMES_LIST.find((m) => m.id === reg.tournamentId);
                return (
                  <div
                    key={reg.tournamentId}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3 hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {lang === 'bn' ? reg.gameNameBn : reg.gameNameEn}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm mt-1">
                          {matchData ? (lang === 'bn' ? matchData.tournamentTitleBn : matchData.tournamentTitleEn) : reg.gameNameBn}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                        reg.status === 'claimed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-indigo-100 text-indigo-800 border border-indigo-200 animate-pulse'
                      }`}>
                        {reg.status === 'claimed' 
                          ? (lang === 'bn' ? '✓ রিওয়ার্ড ক্লেইমড' : '✓ Reward Claimed')
                          : (lang === 'bn' ? '● রুম নিশ্চিত' : '● Room Active')}
                      </span>
                    </div>

                    {/* Room Pass & ID Box */}
                    <div className="bg-slate-900 text-white p-3 rounded-xl space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-sans">
                          {lang === 'bn' ? 'কাস্টম রুম আইডি:' : 'Custom Room ID:'}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-amber-400">{reg.roomId}</span>
                          <button
                            onClick={() => handleCopy(reg.roomId, `id-${reg.tournamentId}`)}
                            className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-slate-300"
                          >
                            {copiedField === `id-${reg.tournamentId}` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                        <span className="text-slate-400 text-[11px] font-sans">
                          {lang === 'bn' ? 'রুম পাসওয়ার্ড:' : 'Room Password:'}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-emerald-400">{reg.roomPass}</span>
                          <button
                            onClick={() => handleCopy(reg.roomPass, `pass-${reg.tournamentId}`)}
                            className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-slate-300"
                          >
                            {copiedField === `pass-${reg.tournamentId}` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* User submitted credentials info */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                      <div>
                        <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'ইন-গেম নেম:' : 'In-Game Name:'}</span>
                        <span className="font-bold text-slate-800">{reg.inGameName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'গেম আইডি / UID:' : 'Game UID:'}</span>
                        <span className="font-bold text-indigo-700 font-mono">{reg.inGameId}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => matchData && handleOpenMatch(matchData)}
                      className="w-full py-2 bg-slate-100 hover:bg-indigo-50 text-indigo-700 hover:text-indigo-900 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Icons.Award className="w-3.5 h-3.5" />
                      <span>
                        {reg.status === 'claimed' 
                          ? (lang === 'bn' ? 'ম্যাচ হিস্ট্রি ও ডিটেইলস দেখুন' : 'View Match Details')
                          : (lang === 'bn' ? 'ম্যাচ রেজাল্ট সাবমিট ও প্রাইজ ক্লেইম করুন' : 'Submit Result & Claim Prize')}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : null}

      {/* 4. ALL TOURNAMENT CARDS GRID */}
      {activeCategory !== 'my_matches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <Icons.Flame className="w-4 h-4 text-rose-500" />
              <span>
                {lang === 'bn' 
                  ? `জনপ্রিয় টুর্নামেন্টস (${filteredMatches.length}টি গেমস উপলব্ধ)` 
                  : `Active Esports Tournaments (${filteredMatches.length} Games Available)`}
              </span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {lang === 'bn' ? 'ক্লিক করে আপনার গেম আইডি সাবমিট করুন' : 'Click any card to submit Game UID'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredMatches.map((match) => {
              const isJoined = myRegistrations.some((r) => r.tournamentId === match.id);
              const fillPercentage = Math.round((match.filledSlots / match.totalSlots) * 100);
              const remainingSlots = match.totalSlots - match.filledSlots;

              return (
                <div
                  key={match.id}
                  onClick={() => handleOpenMatch(match)}
                  className="group relative bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  {/* Top Image Banner */}
                  <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                    <img
                      src={match.gameBanner}
                      alt={match.gameNameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                    {/* Status badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-slate-900/90 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        {lang === 'bn' ? match.scheduleBn : match.scheduleEn}
                      </span>
                    </div>

                    {/* Entry fee pill */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-xl shadow-md flex items-center gap-1">
                        <Icons.Coins className="w-3 h-3 text-slate-950" />
                        <span>{lang === 'bn' ? `ফি: ${match.entryFeeBn}` : `Fee: ${match.entryFeeEn}`}</span>
                      </span>
                    </div>

                    {/* Game Title on banner */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                          {match.modeBn}
                        </span>
                        <h4 className="text-white font-black text-base sm:text-lg leading-snug drop-shadow-md">
                          {lang === 'bn' ? match.gameNameBn : match.gameNameEn}
                        </h4>
                        <p className="text-slate-300 text-[11px] font-medium drop-shadow-xs">
                          {lang === 'bn' ? match.tournamentTitleBn : match.tournamentTitleEn}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    {/* Prize and Mode stats */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-150 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">
                          {lang === 'bn' ? 'মোট প্রাইজপুল' : 'Prize Pool'}
                        </span>
                        <span className="font-extrabold text-indigo-700 text-sm font-mono flex items-center gap-1">
                          <Icons.Trophy className="w-3.5 h-3.5 text-amber-500" />
                          {lang === 'bn' ? match.prizePoolBn : match.prizePoolEn}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">
                          {lang === 'bn' ? 'বোনাস / সুবিধা' : 'Bonus'}
                        </span>
                        <span className="font-bold text-slate-700 text-[11px] truncate block">
                          {lang === 'bn' ? match.perKillBonusBn : match.perKillBonusEn}
                        </span>
                      </div>
                    </div>

                    {/* Player Ratio Bar & Count (খেলোয়াড় অনুপাত) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-600 flex items-center gap-1.5">
                          <Icons.Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lang === 'bn' ? 'খেলোয়াড় অনুপাত:' : 'Player Capacity:'}</span>
                          <span className="text-slate-900 font-mono font-black">
                            {match.filledSlots} / {match.totalSlots} {lang === 'bn' ? 'জন' : ''}
                          </span>
                        </span>
                        
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          remainingSlots <= 2 
                            ? 'bg-rose-100 text-rose-700 animate-pulse' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {remainingSlots === 0 
                            ? (lang === 'bn' ? 'রুম সম্পূর্ণ পূর্ণ' : 'Room Full') 
                            : (lang === 'bn' ? `স্লট বাকি: ${remainingSlots}টি` : `${remainingSlots} Slots Left`)}
                        </span>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            fillPercentage >= 90
                              ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                              : 'bg-gradient-to-r from-indigo-500 to-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, fillPercentage)}%` }}
                        />
                      </div>
                    </div>

                    {/* Join / Submit ID Action Button */}
                    <div className="pt-1">
                      {isJoined ? (
                        <div className="w-full py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs">
                          <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{lang === 'bn' ? 'গেম আইডি সাবমিট করা আছে (রুম দেখুন)' : 'ID Submitted (View Room)'}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="w-full py-2.5 bg-slate-900 group-hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Icons.Gamepad2 className="w-4 h-4 text-amber-400" />
                          <span>{lang === 'bn' ? 'গেম আইডি সাবমিট ও জয়েন করুন' : 'Submit Game UID & Join Match'}</span>
                          <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. MATCH DETAILS & GAME ID SUBMISSION MODAL */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header with Game Banner */}
            <div className="relative h-32 sm:h-36 bg-slate-900 shrink-0">
              <img
                src={selectedMatch.gameBanner}
                alt={selectedMatch.gameNameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedMatch(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center text-sm font-bold backdrop-blur-md cursor-pointer border border-white/10 transition-transform active:scale-95"
              >
                ✕
              </button>

              {/* Header Title */}
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                  {selectedMatch.modeBn} • {selectedMatch.mapBn}
                </span>
                <h3 className="text-white font-black text-lg sm:text-xl drop-shadow-md leading-tight">
                  {lang === 'bn' ? selectedMatch.gameNameBn : selectedMatch.gameNameEn}
                </h3>
                <p className="text-slate-300 text-xs font-semibold">
                  {lang === 'bn' ? selectedMatch.tournamentTitleBn : selectedMatch.tournamentTitleEn}
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {/* If user just registered or was already registered */}
              {regSuccessMatch || myRegistrations.some(r => r.tournamentId === selectedMatch.id) ? (
                <div className="space-y-4 animate-scale-up">
                  {/* Success Banner */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-2xl shadow-sm text-center space-y-1">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1">
                      <Icons.CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-black text-base">
                      {lang === 'bn' ? 'আপনার গেম আইডি সফলভাবে সাবমিট হয়েছে!' : 'Game UID Submitted Successfully!'}
                    </h4>
                    <p className="text-xs text-emerald-100">
                      {lang === 'bn'
                        ? 'নিচের রুম আইডি ও পাসওয়ার্ড দিয়ে নির্ধারিত সময়ে গেমে যুক্ত হোন।'
                        : 'Use the custom Room ID & Password below to enter match lobby.'}
                    </p>
                  </div>

                  {/* Room Credentials Box */}
                  <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs shadow-inner">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-sans">
                          {lang === 'bn' ? 'কাস্টম রুম আইডি (Room ID):' : 'Custom Room ID:'}
                        </span>
                        <span className="text-base font-black text-amber-400 tracking-wider">
                          {selectedMatch.roomId}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(selectedMatch.roomId, 'modal-room-id')}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        <Icons.Copy className="w-3.5 h-3.5" />
                        <span>{copiedField === 'modal-room-id' ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-sans">
                          {lang === 'bn' ? 'রুম পাসওয়ার্ড (Password):' : 'Room Passcode:'}
                        </span>
                        <span className="text-base font-black text-emerald-400 tracking-wider">
                          {selectedMatch.roomPass}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(selectedMatch.roomPass, 'modal-room-pass')}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        <Icons.Copy className="w-3.5 h-3.5" />
                        <span>{copiedField === 'modal-room-pass' ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Match Claim / Result Submission Section */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <h5 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
                      <Icons.Trophy className="w-4 h-4 text-amber-500" />
                      <span>{lang === 'bn' ? 'ম্যাচ শেষে স্কোর সাবমিট ও ক্যাশ প্রাইজ ক্লেইম করুন:' : 'Submit Match Result & Claim Cash:'}</span>
                    </h5>

                    {claimedRewardAmount !== null ? (
                      <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-center space-y-1">
                        <span className="text-xs font-black block">
                          🎉 {lang === 'bn' ? `অভিনন্দন! আপনার ওয়ালেটে $${claimedRewardAmount.toFixed(2)} যোগ হয়েছে` : `Congratulations! $${claimedRewardAmount.toFixed(2)} added to wallet`}
                        </span>
                        <p className="text-[11px] text-emerald-800">
                          {lang === 'bn' ? 'টুর্নামেন্ট প্রাইজ সফলভাবে ক্রেডিট করা হয়েছে।' : 'Tournament prize pool reward has been credited.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={matchScoreInput}
                          onChange={(e) => setMatchScoreInput(e.target.value)}
                          placeholder={lang === 'bn' ? 'যেমন: Rank #1 (12 Kills) / ম্যাচ উইনার' : 'e.g. Rank #1 with 8 Kills'}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                        {errorMessage && (
                          <p className="text-[11px] text-rose-600 font-bold">{errorMessage}</p>
                        )}
                        <button
                          onClick={handleClaimReward}
                          disabled={isClaimingReward}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {isClaimingReward ? (
                            <>
                              <Icons.Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>{lang === 'bn' ? 'ভেরিফাই হচ্ছে...' : 'Verifying...'}</span>
                            </>
                          ) : (
                            <>
                              <Icons.Award className="w-4 h-4" />
                              <span>{lang === 'bn' ? 'ম্যাচ স্কোর সাবমিট ও প্রাইজ ক্লেইম করুন' : 'Submit Result & Claim Prize'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedMatch(null)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                  >
                    {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                  </button>
                </div>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleSubmitGameId} className="space-y-4">
                  {/* Quick Summary Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                      <span className="text-[10px] text-slate-400 font-bold block">{lang === 'bn' ? 'এন্ট্রি ফি' : 'Entry Fee'}</span>
                      <span className="font-extrabold text-indigo-700 font-mono">{selectedMatch.entryFeeBn}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                      <span className="text-[10px] text-slate-400 font-bold block">{lang === 'bn' ? 'প্রাইজপুল' : 'Prize Pool'}</span>
                      <span className="font-extrabold text-emerald-600 font-mono">{selectedMatch.prizePoolBn}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                      <span className="text-[10px] text-slate-400 font-bold block">{lang === 'bn' ? 'স্লট ক্যাপাসিটি' : 'Slots'}</span>
                      <span className="font-extrabold text-slate-800 font-mono">
                        {selectedMatch.filledSlots}/{selectedMatch.totalSlots}
                      </span>
                    </div>
                  </div>

                  {/* Prize split preview */}
                  <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl text-xs space-y-1 text-amber-950">
                    <span className="text-[11px] font-black flex items-center gap-1 text-amber-800">
                      <Icons.Trophy className="w-3.5 h-3.5 text-amber-600" />
                      <span>{lang === 'bn' ? 'পুরস্কার বণ্টন বিবরণী:' : 'Prize Distribution:'}</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1 text-[11px] font-semibold">
                      <span className="text-emerald-800">🏆 {selectedMatch.firstPrizeBn}</span>
                      <span className="text-slate-700">🥈 {selectedMatch.secondPrizeBn}</span>
                      <span className="text-amber-800">🥉 {selectedMatch.thirdPrizeBn}</span>
                    </div>
                  </div>

                  {/* Input 1: In Game Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block flex items-center justify-between">
                      <span>{lang === 'bn' ? '১. আপনার ইন-গেম গেমার নাম (In-Game Name):' : '1. In-Game Player Name:'}</span>
                      <span className="text-[10px] text-rose-500 font-bold">*আবশ্যক</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={inGameName}
                      onChange={(e) => setInGameName(e.target.value)}
                      placeholder={lang === 'bn' ? 'যেমন: ProGamer_BD, Killer99' : 'e.g. ApexPredator_BD'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800"
                    />
                  </div>

                  {/* Input 2: Game UID / ID */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block flex items-center justify-between">
                      <span>{lang === 'bn' ? `২. ${selectedMatch.idFieldLabelBn}` : `2. ${selectedMatch.idFieldLabelEn}`}</span>
                      <span className="text-[10px] text-indigo-600 font-bold font-mono">UID / ID</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={inGameId}
                      onChange={(e) => setInGameId(e.target.value)}
                      placeholder={selectedMatch.idPlaceholder}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-black tracking-wider focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 uppercase"
                    />
                  </div>

                  {/* Input 3: Squad / Team Name (Optional) */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {lang === 'bn' ? '৩. স্কোয়াড / টিম নাম (ঐচ্ছিক):' : '3. Squad / Team Name (Optional):'}
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder={lang === 'bn' ? 'যেমন: Team Bengal Tigers' : 'e.g. Team BD Warriors'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                    />
                  </div>

                  {/* Input 4: Phone / WhatsApp */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block flex items-center justify-between">
                      <span>{lang === 'bn' ? '৪. হোয়াটসঅ্যাপ / যোগাযোগ মোবাইল নম্বর:' : '4. WhatsApp / Contact Phone:'}</span>
                      <span className="text-[10px] text-slate-400">{lang === 'bn' ? 'রুম পাস এসএমএস এর জন্য' : 'For SMS updates'}</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={playerPhone}
                      onChange={(e) => setPlayerPhone(e.target.value)}
                      placeholder="017xxxxxxxx"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                    />
                  </div>

                  {/* Payment Selection Option */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {lang === 'bn' ? '৫. এন্ট্রি ফি পেমেন্ট মেথড:' : '5. Entry Fee Payment Method:'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        onClick={() => setPaymentOption('balance')}
                        className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          paymentOption === 'balance'
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-2 ring-indigo-300'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span>{lang === 'bn' ? 'ওয়ালেট ব্যালেন্স' : 'Wallet Balance'}</span>
                          {paymentOption === 'balance' && <Icons.Check className="w-3.5 h-3.5 text-indigo-600" />}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {selectedMatch.entryFeeBn} (${(selectedMatch.entryFeeNum / 100).toFixed(2)})
                        </span>
                      </div>

                      <div
                        onClick={() => setPaymentOption('promo')}
                        className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          paymentOption === 'promo'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-300'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span>{lang === 'bn' ? 'ফ্রি ট্রায়াল পাস' : 'Free Trial Pass'}</span>
                          {paymentOption === 'promo' && <Icons.Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold block">
                          {lang === 'bn' ? 'প্রথমবার সম্পূর্ণ ফ্রি' : '100% Free Entry'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Icons.Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                          <span>{lang === 'bn' ? 'গেম আইডি রেকর্ড ও ভেরিফাই হচ্ছে...' : 'Submitting Game UID...'}</span>
                        </>
                      ) : (
                        <>
                          <Icons.ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>{lang === 'bn' ? 'গেম আইডি সাবমিট ও কনফার্ম করুন' : 'Submit Game UID & Confirm Registration'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
