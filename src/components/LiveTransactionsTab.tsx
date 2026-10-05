import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { INITIAL_TRANSACTIONS, LiveTransaction, MIXED_NAMES } from '../data/liveTransactions';

interface LiveTransactionsTabProps {
  lang?: 'bn' | 'en';
}

export default function LiveTransactionsTab({ lang = 'en' }: LiveTransactionsTabProps) {
  const [transactions, setTransactions] = useState<LiveTransaction[]>(INITIAL_TRANSACTIONS);
  const [newHighlightId, setNewHighlightId] = useState<string | null>(null);

  // Auto-generate fresh live transaction every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const selectedPerson = MIXED_NAMES[Math.floor(Math.random() * MIXED_NAMES.length)];
      const amounts = [250, 300, 500, 530, 700, 750, 850, 1000, 1200, 1500, 2000, 2500];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      
      const methods: ('bKash' | 'Nagad' | 'Rocket' | 'Upay' | 'P2P')[] = [
        'bKash',
        'Nagad',
        'bKash',
        'Nagad',
        'Rocket',
        'P2P',
      ];
      const randomMethod = methods[Math.floor(Math.random() * methods.length)];
      const isTransfer = randomMethod === 'P2P';

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newTx: LiveTransaction = {
        id: `tx-${Date.now()}`,
        name: selectedPerson.name,
        amount: randomAmount,
        method: randomMethod,
        type: isTransfer ? 'transfer' : 'withdraw',
        minutesAgo: 0,
        timeStr: timeStr,
        phoneOrUid: isTransfer
          ? 'UE-MAIN-7701'
          : `01${Math.floor(3 + Math.random() * 6)}${Math.floor(10 + Math.random() * 89)}-***${Math.floor(100 + Math.random() * 899)}`,
        avatarUrl: selectedPerson.avatarUrl,
      };

      setNewHighlightId(newTx.id);
      setTransactions((prev) => [newTx, ...prev.slice(0, 200)]);

      setTimeout(() => {
        setNewHighlightId(null);
      }, 3500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getMethodStyle = (method: LiveTransaction['method']) => {
    switch (method) {
      case 'bKash':
        return { bg: 'bg-pink-50 text-pink-700 border-pink-200', name: 'bKash' };
      case 'Nagad':
        return { bg: 'bg-orange-50 text-orange-700 border-orange-200', name: 'Nagad' };
      case 'Rocket':
        return { bg: 'bg-purple-50 text-purple-700 border-purple-200', name: 'Rocket' };
      case 'Upay':
        return { bg: 'bg-amber-50 text-amber-700 border-amber-200', name: 'Upay' };
      case 'Bank':
        return { bg: 'bg-blue-50 text-blue-700 border-blue-200', name: 'Bank Transfer' };
      case 'P2P':
        return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', name: 'Main Account Transfer' };
      default:
        return { bg: 'bg-slate-50 text-slate-700 border-slate-200', name: method };
    }
  };

  return (
    <div className="space-y-3 pb-24 animate-fade-in" id="live-transactions-container">
      {/* Sleek Professional Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-3.5 sm:p-4 border border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Icons.Receipt className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                {lang === 'bn' ? 'লেনদেন হিস্ট্রি' : 'Transactions Feed'}
              </h2>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-none mt-1">
              {lang === 'bn' ? 'সরাসরি রিয়েল-টাইম ক্যাশআউট ও ব্যালেন্স স্থানান্তর' : 'Real-time verified cashouts & account transfers'}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/80 shrink-0">
            {transactions.length}+ Records
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 font-mono">
            Auto-sync: 8s
          </span>
        </div>
      </div>

      {/* Transaction List (English typography, mixed Bengali/English names, with or without freelancer avatar) */}
      <div className="space-y-2">
        {transactions.map((tx) => {
          const badge = getMethodStyle(tx.method);
          const isHighlighted = newHighlightId === tx.id;

          const actionDescription =
            tx.type === 'transfer'
              ? `Transferred ৳${tx.amount.toLocaleString()} to Main Account`
              : `Withdrew ৳${tx.amount.toLocaleString()} via ${badge.name}`;

          return (
            <div
              key={tx.id}
              className={`bg-white rounded-2xl p-3 sm:p-3.5 border transition-all duration-300 shadow-2xs flex items-center justify-between gap-3 ${
                isHighlighted
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 scale-[1.01]'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {/* Left Side: Avatar (Freelancer photo or Initial Box) + Details */}
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                {tx.avatarUrl ? (
                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-emerald-500 to-teal-500 shrink-0 shadow-2xs">
                    <img
                      src={tx.avatarUrl}
                      alt={tx.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                    {tx.name.charAt(0)}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">
                      {tx.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      ({tx.phoneOrUid})
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-slate-600 truncate mt-0.5">
                    {actionDescription}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border leading-none ${badge.bg}`}>
                      {badge.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {tx.minutesAgo === 0 ? 'Just now' : `${tx.minutesAgo}m ago`} • {tx.timeStr}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Amount and Completed Badge */}
              <div className="text-right shrink-0">
                <div className="text-xs sm:text-sm font-bold text-emerald-600 font-mono tabular-nums leading-none">
                  +৳{tx.amount.toLocaleString()}
                </div>
                <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full mt-1.5 leading-none">
                  <Icons.CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Completed</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
