import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { CHAT_MESSAGES_POOL, ChatMsg } from '../data/liveChatMessages';
import { UserProfile } from '../types';

interface LiveChatTabProps {
  lang: 'bn' | 'en';
  profile: UserProfile;
}

export default function LiveChatTab({ lang, profile }: LiveChatTabProps) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'msg-init-1',
      senderName: 'Faisal Ahmed',
      avatarSeed: 'Faisal',
      avatarBg: 'bg-blue-600',
      text: 'Hello everyone, how long does it take for bKash withdrawal to arrive?',
      timeStr: '12:30 PM',
      badge: 'Member',
    },
    {
      id: 'msg-init-2',
      senderName: 'আমেনা আক্তার',
      avatarSeed: 'Amena',
      avatarBg: 'bg-emerald-600',
      text: 'ভাইয়া সাধারণত ৫ থেকে ১০ মিনিটের মধ্যেই বিকাশে টাকা চলে আসে।',
      timeStr: '12:31 PM',
      badge: 'ভেরিফাইড',
    },
    {
      id: 'msg-init-3',
      senderName: 'Tanvir Rahman',
      avatarSeed: 'Tanvir',
      avatarBg: 'bg-indigo-600',
      text: 'Got my ৳700 payout in Nagad just 6 minutes ago! Alhamdulillah 🔥',
      timeStr: '12:32 PM',
      badge: 'Top Earner',
    },
    {
      id: 'msg-init-4',
      senderName: 'ইব্রাহিম খান',
      avatarSeed: 'Ibrahim',
      avatarBg: 'bg-amber-600',
      text: 'উইথড্র দিতে কি কোনো চার্জ কাটে কারো?',
      timeStr: '12:33 PM',
    },
    {
      id: 'msg-init-5',
      senderName: 'Arif Hasan',
      avatarSeed: 'Arif',
      avatarBg: 'bg-purple-600',
      text: 'না ভাইয়া, একদম ০% চার্জ। কোনো বাড়তি ফি কাটে না।',
      timeStr: '12:34 PM',
    },
    {
      id: 'msg-init-6',
      senderName: 'Sarah Khan',
      avatarSeed: 'Sarah',
      avatarBg: 'bg-rose-600',
      text: 'Can anyone guide me where to start? Just joined today!',
      timeStr: '12:35 PM',
      badge: 'New Student',
    },
    {
      id: 'msg-init-7',
      senderName: 'তানজিলা হক',
      avatarSeed: 'Tanjila',
      avatarBg: 'bg-teal-600',
      text: 'হোম পেজ থেকে টাইপিং জব আর ডেইলি ওয়ার্ক দিয়ে শুরু করুন আপু, খুব সহজ।',
      timeStr: '12:36 PM',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Dynamic message arrival (First after 1s, then 1s, 2s, 3s random delay as requested)
  useEffect(() => {
    let poolIndex = 5;
    let timer: NodeJS.Timeout;

    const scheduleNext = (delayMs?: number) => {
      // Delays: 1s, 2s, 3s (User requested: "এক সেকেন্ড পর মেসেজ আসবে। অনেক সময় দুই সেকেন্ড পর তিন সেকেন্ড পরও মেসেজ আসবে")
      const delays = [1000, 2000, 3000, 1000, 2000, 3000, 1500, 2500];
      const nextDelay = delayMs !== undefined ? delayMs : delays[Math.floor(Math.random() * delays.length)];

      timer = setTimeout(() => {
        const item = CHAT_MESSAGES_POOL[poolIndex % CHAT_MESSAGES_POOL.length];
        poolIndex++;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const bgList = [
          'bg-blue-600',
          'bg-indigo-600',
          'bg-emerald-600',
          'bg-amber-600',
          'bg-purple-600',
          'bg-teal-600',
          'bg-rose-600',
        ];
        const randomBg = bgList[Math.floor(Math.random() * bgList.length)];

        const newMsg: ChatMsg = {
          id: `msg-${Date.now()}-${Math.random()}`,
          senderName: item.sender,
          avatarSeed: item.sender,
          avatarBg: randomBg,
          text: item.text,
          timeStr: timeStr,
          badge: item.badge,
        };

        setMessages((prev) => [...prev.slice(-60), newMsg]);
        scheduleNext();
      }, nextDelay);
    };

    // First message starts in 1 second
    scheduleNext(1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMsg = {
      id: `msg-user-${Date.now()}`,
      senderName: profile.fullName || 'আমি (User)',
      avatarSeed: profile.uid,
      avatarBg: 'bg-blue-600',
      text: inputVal.trim(),
      timeStr: timeStr,
      badge: lang === 'bn' ? 'আপনি' : 'You',
      isSelf: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-7.5rem)] sm:h-[calc(100dvh-8rem)] bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden animate-fade-in">
      {/* Live Chat Header Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-3 sm:p-3.5 flex items-center justify-between border-b border-blue-500/30 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-sm shrink-0">
            <Icons.MessagesSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                {lang === 'bn' ? 'কমিউনিটি লাইভ চ্যাট' : 'Community Live Chat'}
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            </div>
            <p className="text-[10px] sm:text-[11px] text-blue-100 font-medium">
              {lang === 'bn' ? 'সরাসরি অভিজ্ঞতা ও কাজের আপডেট শেয়ার করুন' : 'Real-time discussion & peer updates'}
            </p>
          </div>
        </div>

        {/* Active Members Counter: 173 জন সক্রিয় */}
        <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{lang === 'bn' ? 'সক্রিয় ১৭৩ জন' : 'Active 173'}</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3 sm:p-3.5 overflow-y-auto space-y-2.5 bg-slate-50/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[78%] ${
              m.isSelf ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Sender Avatar */}
            <div
              className={`w-8 h-8 rounded-full ${m.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
            >
              {m.senderName[0]}
            </div>

            {/* Message Bubble */}
            <div
              className={`p-2.5 sm:p-3 rounded-2xl text-xs shadow-2xs leading-relaxed ${
                m.isSelf
                  ? 'bg-blue-600 text-white rounded-tr-xs'
                  : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className={`font-bold text-[11px] truncate ${
                    m.isSelf ? 'text-blue-100' : 'text-slate-900'
                  }`}
                >
                  {m.senderName}
                </span>

                {m.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-none shrink-0 ${
                      m.isSelf
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-50 text-blue-700 border border-blue-200/70'
                    }`}
                  >
                    {m.badge}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-[13px] font-medium whitespace-pre-wrap">{m.text}</p>

              <div
                className={`text-[9.5px] font-mono mt-1 text-right ${
                  m.isSelf ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                {m.timeStr}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input Box - Lowered & properly anchored right above bottom bar */}
      <form onSubmit={handleSend} className="p-2 sm:p-2.5 pb-2.5 sm:pb-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={lang === 'bn' ? 'আপনার মেসেজ লিখুন...' : 'Type your message...'}
          className="flex-1 bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0 shadow-xs"
        >
          <Icons.Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === 'bn' ? 'পাঠান' : 'Send'}</span>
        </button>
      </form>
    </div>
  );
}
