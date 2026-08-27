import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';

interface Profile {
  uid: string;
  fullName: string;
  avatarUrl: string;
  balance: number;
  tasksCompleted: number;
}

interface RankingTabProps {
  profile?: Profile;
  lang: 'bn' | 'en';
}

const toBnNum = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

interface MemberDetail {
  rank: number;
  name: string;
  uid: string;
  earnings: number;
  tasks: number;
  avatar: string | null;
  avatarType: 'photo' | 'cartoon' | 'none';
  isUser?: boolean;
  breakdown?: Array<{ title: string; amount: number; count: number; icon: any; color: string; text: string }>;
}

export default function RankingTab({ profile, lang }: RankingTabProps) {
  const [selectedMember, setSelectedMember] = useState<MemberDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'today' | 'weekly' | 'alltime'>('today');

  // User details
  const userName = profile?.fullName || 'Habiba Akter';
  const userUid = profile?.uid || 'UE-2026-9842';
  const userAvatar = profile?.avatarUrl || 'https://api.dicebear.com/7.x/adventurer/svg?seed=HabibaAkter';

  // User #176 income breakdown: 250 form fillup + 40 email sale + 25 micro job = 315
  const userBreakdown = [
    { title: lang === 'bn' ? 'ফর্ম ফিলআপ কাজ (৫টি)' : 'Form Fillup Tasks (5)', amount: 250, count: 5, icon: Icons.FileText, color: 'bg-emerald-500', text: 'text-emerald-700' },
    { title: lang === 'bn' ? 'ই-মেইল সেল কাজ (১০টি)' : 'Email Sales (10)', amount: 40, count: 10, icon: Icons.Mail, color: 'bg-blue-500', text: 'text-blue-700' },
    { title: lang === 'bn' ? 'মাইক্রো জবস (৩টি)' : 'Micro Jobs (3)', amount: 25, count: 3, icon: Icons.Zap, color: 'bg-violet-500', text: 'text-violet-700' },
  ];

  // Generate complete 215 member list with mixed avatars (photos, cartoons, none)
  const full215List = useMemo(() => {
    const list: MemberDetail[] = [];
    const maleNames = ['Jihadul Islam', 'Tanvir Hasan', 'Foysal Ahmed', 'Arif Chowdhury', 'Shakil Hossain', 'Nahid Islam', 'Mehedi Hasan', 'Kamrul Islam', 'Touhid Alam', 'Saiful Rifat', 'Imran Hossain', 'Rakib Hasan', 'Shamim Reza', 'Mizanur Rahman', 'Ashraful Islam', 'Robiul Awal', 'Shohel Rana', 'Biplob Hossain', 'Moniruzzaman', 'Al-Amin'];
    const femaleNames = ['Sumaiya Akter', 'Nusrat Jahan', 'Sadia Islam', 'Mariam Begum', 'Jannatul Ferdous', 'Habiba Sekh', 'Nurjahan Akter', 'Fatema Khatun', 'Sabrina Yeasmin', 'Sharmin Sultana', 'Taniya Islam', 'Mim Akter', 'Farhana Yasmin', 'Khadija Begum', 'Riya Moni', 'Ayesha Siddika', 'Sultana Razia', 'Tanjila Akter'];

    const photoAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    ];

    const cartoonSeeds = ['Alex', 'Felix', 'Bella', 'Boo', 'Coco', 'Daisy', 'Jack', 'Lola', 'Milo', 'Oliver', 'Penny', 'Sam', 'Toby', 'Zoe', 'Simba', 'Panda', 'Tiger', 'Bunny', 'Robot', 'Alien'];

    for (let r = 1; r <= 215; r++) {
      if (r === 176) {
        // EXACT USER POSITION AT 176
        list.push({
          rank: 176,
          name: userName,
          uid: userUid,
          earnings: 315,
          tasks: 18,
          avatar: userAvatar,
          avatarType: 'cartoon',
          isUser: true,
          breakdown: userBreakdown,
        });
        continue;
      }

      // #1 Jihadul Islam (৳730)
      if (r === 1) {
        list.push({
          rank: 1,
          name: 'Jihadul Islam',
          uid: 'UID-1001',
          earnings: 730,
          tasks: 24,
          avatar: photoAvatars[2],
          avatarType: 'photo',
          breakdown: [
            { title: lang === 'bn' ? 'ফর্ম ফিলআপ কাজ (১০টি)' : 'Form Fillup Tasks', amount: 500, count: 10, icon: Icons.FileText, color: 'bg-emerald-500', text: 'text-emerald-700' },
            { title: lang === 'bn' ? 'ই-মেইল সেল (৩০টি)' : 'Email Sales', amount: 150, count: 30, icon: Icons.Mail, color: 'bg-blue-500', text: 'text-blue-700' },
            { title: lang === 'bn' ? 'মাইক্রো জবস (৮টি)' : 'Micro Jobs', amount: 80, count: 8, icon: Icons.Zap, color: 'bg-violet-500', text: 'text-violet-700' },
          ]
        });
        continue;
      }

      // Calculate decreasing smooth earnings from 725 down to 50
      let earn = 0;
      if (r <= 10) {
        earn = 730 - (r - 1) * 20;
      } else if (r < 176) {
        // Range 11 to 175: 530 down to 316
        const step = (530 - 316) / (175 - 11);
        earn = Math.round(530 - (r - 11) * step);
      } else {
        // Range 177 to 215: 312 down to 55
        const step = (312 - 55) / (215 - 177);
        earn = Math.round(312 - (r - 177) * step);
      }

      const isFemale = r % 2 === 0;
      const pool = isFemale ? femaleNames : maleNames;
      const baseName = pool[(r * 7) % pool.length];

      // Determine Avatar style: photo, cartoon avatar, or no photo (initial icon)
      let avatarType: 'photo' | 'cartoon' | 'none' = 'photo';
      let avatarUrl: string | null = null;

      const mod = r % 10;
      if (mod === 0 || mod === 4) {
        avatarType = 'none';
        avatarUrl = null;
      } else if (mod === 1 || mod === 3 || mod === 7 || mod === 9) {
        avatarType = 'cartoon';
        const seed = cartoonSeeds[r % cartoonSeeds.length];
        avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}_${r}`;
      } else {
        avatarType = 'photo';
        avatarUrl = photoAvatars[r % photoAvatars.length];
      }

      list.push({
        rank: r,
        name: `${baseName}`,
        uid: `UID-${1000 + r}`,
        earnings: earn,
        tasks: Math.max(2, Math.floor(earn / 25)),
        avatar: avatarUrl,
        avatarType: avatarType,
      });
    }

    return list;
  }, [userName, userUid, userAvatar, lang]);

  // Filter list by search query
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return full215List;
    const q = searchQuery.toLowerCase();
    return full215List.filter(
      (m) => m.name.toLowerCase().includes(q) || m.uid.toLowerCase().includes(q) || m.rank.toString() === q
    );
  }, [full215List, searchQuery]);

  const userMember = full215List.find((m) => m.isUser)!;

  const scrollToUserRank = () => {
    const el = document.getElementById('user-rank-row-176');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleMemberClick = (member: MemberDetail) => {
    if (member.isUser) {
      setSelectedMember(member);
    } else {
      const formVal = Math.floor(member.earnings * 0.65);
      const emailVal = Math.floor(member.earnings * 0.25);
      const microVal = member.earnings - formVal - emailVal;
      const customBreakdown = member.breakdown || [
        { title: lang === 'bn' ? 'ফর্ম ফিলআপ কাজ' : 'Form Fillup Tasks', amount: formVal, count: Math.max(1, Math.ceil(formVal / 50)), icon: Icons.FileText, color: 'bg-emerald-500', text: 'text-emerald-700' },
        { title: lang === 'bn' ? 'ই-মেইল সেল কাজ' : 'Email Sales', amount: emailVal, count: Math.max(1, Math.ceil(emailVal / 4)), icon: Icons.Mail, color: 'bg-blue-500', text: 'text-blue-700' },
        { title: lang === 'bn' ? 'মাইক্রো জবস (Micro Jobs)' : 'Micro Jobs', amount: microVal, count: Math.max(1, Math.ceil(microVal / 8)), icon: Icons.Zap, color: 'bg-violet-500', text: 'text-violet-700' },
      ];
      setSelectedMember({
        ...member,
        breakdown: customBreakdown,
      });
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in" id="ranking-container">
      {/* Page Banner Header - Compact & Matching Frame */}
      <div className="clay-card bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl border border-amber-300 text-center shadow-sm flex items-center justify-center gap-2">
        <Icons.Trophy className="w-5 h-5 text-slate-950" />
        <h1 className="text-base md:text-lg font-black text-slate-950 tracking-tight">
          {lang === 'bn' ? 'ইনকাম র‍্যাঙ্কিং' : 'Income Ranking'}
        </h1>
      </div>

      {/* --- FEATURED USER PERSONAL DETAILS CARD (RANK #176) --- */}
      <div 
        onClick={() => handleMemberClick(userMember)}
        className="clay-card bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-indigo-500/10 rounded-2xl border-2 border-amber-400 p-3.5 sm:p-4 shadow-sm relative overflow-hidden cursor-pointer hover:scale-[1.01] transition-all" 
        id="my-position-header-card"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col gap-2.5 relative z-10">
          {/* Main User Details Header Row */}
          <div className="flex items-start justify-between gap-2">
            {/* Left: Avatar & Name */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="relative shrink-0">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-12 h-12 rounded-xl object-cover bg-amber-100 border-2 border-amber-400 shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[8px] font-black px-1 rounded-full border border-white">
                  YOU
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base leading-snug truncate">
                  {userName}
                </h3>
                <span className="text-slate-600 font-mono text-[11px] font-bold block">
                  UID: {userUid}
                </span>
              </div>
            </div>

            {/* Right: Rank Badge & Total Income */}
            <div className="text-right shrink-0 flex flex-col items-end">
              <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-lg text-[11px] font-black shadow-2xs">
                <Icons.Award className="w-3.5 h-3.5 text-slate-950" />
                {lang === 'bn' ? `${toBnNum(176)} নম্বর স্থান` : 'Rank #176'}
              </span>
              <div className="text-lg sm:text-xl font-black text-emerald-800 font-mono leading-tight mt-1">
                {lang === 'bn' ? `৳${toBnNum(315)}` : '৳315'}
              </div>
            </div>
          </div>

          {/* Sub Row: Income Label & Scroll Button */}
          <div className="flex items-center justify-between border-t border-amber-300/50 pt-2 text-xs">
            <span className="text-slate-700 font-extrabold text-[11px] flex items-center gap-1">
              <Icons.Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {lang === 'bn' ? 'আজকের মোট ইনকাম: ৩১৫ টাকা' : "Today's Total Income: ৳315"}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollToUserRank();
              }}
              className="text-[10px] font-black text-amber-950 bg-amber-300 hover:bg-amber-400 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 border border-amber-400 shadow-2xs shrink-0 active:scale-95"
            >
              <span>{lang === 'bn' ? 'তালিকায় দেখুন' : 'Go to List'}</span>
              <Icons.ArrowDown className="w-3 h-3" />
            </button>
          </div>

          {/* 315 Taka Breakdown Quick Pills */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2.5 border border-amber-200 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-black text-slate-900 flex items-center gap-1">
                <Icons.PieChart className="w-3.5 h-3.5 text-amber-600" />
                {lang === 'bn' ? 'আজকের ৩১৫ টাকার কাজের বিবরণী:' : 'Today ৳315 Breakdown:'}
              </span>
              <span className="text-[10px] font-extrabold text-blue-600 underline">
                {lang === 'bn' ? 'হিসাব দেখুন' : 'Details'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold">
              <div className="bg-emerald-50/90 text-emerald-900 p-1.5 rounded-lg border border-emerald-200/80">
                <div className="text-[9px] text-slate-600 font-medium leading-tight">{lang === 'bn' ? 'ফর্ম ফিলআপ' : 'Form Fill'}</div>
                <div className="font-black text-xs font-mono text-emerald-700 mt-0.5">৳২৫০</div>
              </div>
              <div className="bg-blue-50/90 text-blue-900 p-1.5 rounded-lg border border-blue-200/80">
                <div className="text-[9px] text-slate-600 font-medium leading-tight">{lang === 'bn' ? 'ই-মেইল সেল' : 'Email Sale'}</div>
                <div className="font-black text-xs font-mono text-blue-700 mt-0.5">৳৪০</div>
              </div>
              <div className="bg-violet-50/90 text-violet-900 p-1.5 rounded-lg border border-violet-200/80">
                <div className="text-[9px] text-slate-600 font-medium leading-tight">{lang === 'bn' ? 'মাইক্রো জবস' : 'Micro Jobs'}</div>
                <div className="font-black text-xs font-mono text-violet-700 mt-0.5">৳২৫</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Icons.ListOrdered className="w-5 h-5 text-amber-500" />
          {lang === 'bn' ? 'র‍্যাঙ্কিং তালিকা (১ - ২১৫)' : 'Leaderboard (1 - 215)'}
        </h2>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'নাম, UID বা স্থান খুঁজুন...' : 'Search name, UID or rank...'}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:border-amber-400 shadow-xs"
          />
        </div>
      </div>

      {/* --- COMPLETE ALL 215 MEMBERS LIST TABLE (NO TOP 3 PODIUM) --- */}
      <div className="clay-card bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100 max-h-[750px] overflow-y-auto custom-scrollbar">
          {filteredMembers.map((item) => {
            const isUserRow = item.rank === 176 || item.isUser;
            return (
              <div
                key={item.rank}
                id={isUserRow ? 'user-rank-row-176' : `rank-row-${item.rank}`}
                onClick={() => handleMemberClick(item)}
                className={`p-3.5 md:p-4 flex items-center justify-between transition-all cursor-pointer ${
                  isUserRow
                    ? 'bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200/90 border-y-2 border-amber-400 shadow-md font-bold'
                    : 'hover:bg-slate-50/90'
                }`}
              >
                {/* Left Side: Rank, Avatar & Name */}
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 font-mono ${
                    item.rank === 1 ? 'bg-amber-400 text-slate-950 shadow-xs' :
                    item.rank === 2 ? 'bg-slate-300 text-slate-800' :
                    item.rank === 3 ? 'bg-amber-200 text-amber-900' :
                    isUserRow ? 'bg-amber-500 text-white border border-amber-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {lang === 'bn' ? toBnNum(item.rank) : item.rank}
                  </span>

                  {/* Avatar rendering: photo, cartoon, or default icon */}
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className={`w-9 h-9 rounded-full object-cover border shrink-0 ${
                        isUserRow ? 'border-2 border-amber-400' : 'border-slate-200 bg-slate-100'
                      }`}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 border border-slate-200">
                      {item.name.charAt(0)}
                    </div>
                  )}

                  {/* Name and UID */}
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs md:text-sm hover:text-blue-600 flex items-center gap-1.5">
                      {item.name}
                      {isUserRow && (
                        <span className="bg-amber-500 text-white font-black text-[9px] px-1.5 py-0.2 rounded uppercase">
                          YOU (১৭৬)
                        </span>
                      )}
                      {item.rank === 1 && (
                        <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-1 rounded border border-amber-300">
                          👑 ৳730
                        </span>
                      )}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono block">{item.uid}</span>
                  </div>
                </div>

                {/* Right Side: Earnings & Action */}
                <div className="text-right flex items-center gap-2">
                  <div>
                    <span className={`text-xs md:text-sm font-black font-mono block ${isUserRow ? 'text-emerald-900 text-sm md:text-base' : 'text-emerald-600'}`}>
                      {lang === 'bn' ? `৳${toBnNum(item.earnings)}` : `৳${item.earnings}`}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold block">
                      {lang === 'bn' ? `${toBnNum(item.tasks)}টি কাজ` : `${item.tasks} tasks`}
                    </span>
                  </div>
                  <Icons.ChevronRight className={`w-4 h-4 ${isUserRow ? 'text-amber-900' : 'text-slate-300'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MEMBER WORK BREAKDOWN MODAL POPUP --- */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="clay-card bg-white rounded-3xl border border-amber-300 shadow-2xl max-w-sm w-full p-6 relative overflow-hidden text-left space-y-4">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-all active:scale-90"
            >
              <Icons.X className="w-4 h-4" />
            </button>

            {/* Header with User Info */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              {selectedMember.avatar ? (
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-12 h-12 rounded-2xl object-cover bg-amber-50 border-2 border-amber-400 shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm border border-slate-200">
                  {selectedMember.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-slate-900 text-base">
                    {selectedMember.name}
                  </h3>
                  {selectedMember.isUser && (
                    <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded uppercase">
                      YOU
                    </span>
                  )}
                </div>
                <span className="text-xs text-amber-700 font-bold block">
                  {lang === 'bn' ? `র‍্যাঙ্কিং পজিশন: ${toBnNum(selectedMember.rank)} নম্বর` : `Leaderboard Rank #${selectedMember.rank}`}
                </span>
              </div>
            </div>

            {/* Modal Subtitle */}
            <p className="text-xs text-slate-600 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-200/60">
              {selectedMember.isUser
                ? (lang === 'bn'
                    ? 'আপনার আজকের ৩১৫ টাকার অর্জিত কাজের বিস্তারিত হিসাব:'
                    : 'Breakdown of your ৳315 earnings today:')
                : (lang === 'bn'
                    ? `${selectedMember.name}-এর আজকের অর্জিত ৳${toBnNum(selectedMember.earnings)}-এর কাজের হিসাব:`
                    : `Earnings breakdown for ${selectedMember.name}:`)}
            </p>

            {/* Breakdown List */}
            <div className="space-y-3">
              {selectedMember.breakdown?.map((item, idx) => {
                const ItemIcon = item.icon || Icons.CheckCircle;
                return (
                  <div key={idx} className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${item.color} text-white flex items-center justify-center font-bold shadow-xs shrink-0`}>
                        <ItemIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs md:text-sm">{item.title}</h4>
                        <span className="text-[10px] text-slate-500 font-bold block">
                          {lang === 'bn' ? `${toBnNum(item.count)}টি কাজ সম্পন্ন` : `${item.count} completed`}
                        </span>
                      </div>
                    </div>
                    <span className={`text-base font-black ${item.text} font-mono`}>
                      {lang === 'bn' ? `৳${toBnNum(item.amount)}` : `৳${item.amount}`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total Earnings Summary */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  {lang === 'bn' ? 'আজকের মোট অর্জিত ইনকাম' : 'Grand Total Today'}
                </span>
                {selectedMember.isUser && (
                  <span className="text-xs text-amber-300 font-medium">
                    (২৫০ + ৪০ + ২৫) = ৩১৫ টাকা
                  </span>
                )}
              </div>
              <span className="text-xl font-black text-amber-400 font-mono">
                {lang === 'bn' ? `৳${toBnNum(selectedMember.earnings)}` : `৳${selectedMember.earnings}`}
              </span>
            </div>

            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md active:scale-95 text-center"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
