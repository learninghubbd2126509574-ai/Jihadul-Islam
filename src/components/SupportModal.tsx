import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface SupportModalProps {
  onClose: () => void;
  lang: 'bn' | 'en';
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: { label: string; action: string }[];
}

export default function SupportModal({ onClose, lang }: SupportModalProps) {
  const [activeTab, setActiveTab] = useState<'channels' | 'bot'>('channels');
  
  // Chat bot state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: lang === 'bn' 
        ? 'Hi! আমি Unity Chat Bot 🤖। কীভাবে আপনাকে সাহায্য করতে পারি?' 
        : 'Hi! I am Unity Chat Bot 🤖. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: [
        { label: lang === 'bn' ? '💳 পেমেন্ট/উইথড্র সংক্রান্ত' : '💳 Payment & Withdrawal', action: 'payment' },
        { label: lang === 'bn' ? '📝 কাজ জমা ও রিভিউ' : '📝 Task Submission', action: 'task' },
        { label: lang === 'bn' ? '🎁 পয়েন্ট ও গিফট কোড' : '🎁 Points & Redeem', action: 'points' },
        { label: lang === 'bn' ? '📞 লাইভ এজেন্টের সাথে কথা' : '📞 Live Agent Contact', action: 'agent' },
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto replies logic for bot
  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let botReplyText = '';
      let botOptions: { label: string; action: string }[] | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('payment') || lower.includes('পেমেন্ট') || lower.includes('উইথড্র') || text.includes('payment')) {
        botReplyText = lang === 'bn'
          ? 'উইথড্র করার জন্য আপনার প্রোফাইল ব্যালেন্স ন্যূনতম ৳৫০ হতে হবে। বিকাশ, নগদ বা রকেটের মাধ্যমে ১০ মিনিটের মধ্যে পেমেন্ট সম্পন্ন করা হয়।'
          : 'Minimum withdrawal balance is ৳50. Withdrawals via bKash, Nagad, or Rocket are processed within 10 minutes.';
        botOptions = [
          { label: lang === 'bn' ? 'উইথড্র নিয়মসমূহ' : 'Withdrawal Rules', action: 'rules' },
          { label: lang === 'bn' ? 'হোয়াটসঅ্যাপ কাউন্সিলর' : 'WhatsApp Support', action: 'agent' }
        ];
      } else if (lower.includes('task') || lower.includes('কাজ') || lower.includes('জমা') || text.includes('task')) {
        botReplyText = lang === 'bn'
          ? 'কাজ জমা দেওয়ার পর অ্যাডমিন রিভিউ করতে ৫-৩০ মিনিট সময় লাগতে পারে। সঠিক স্ক্রিনশট ও প্রমাণ জমা দিলে পেমেন্ট নিশ্চিত করা হয়।'
          : 'After task submission, admin review takes 5-30 mins. Providing valid proof screenshot guarantees rapid verification.';
      } else if (lower.includes('points') || lower.includes('পয়েন্ট') || lower.includes('গিফট') || text.includes('points')) {
        botReplyText = lang === 'bn'
          ? 'প্রতিদিন অ্যাপে লগইন করে ও কুইজ খেলে পয়েন্ট অর্জন করতে পারবেন। শপ সেকশনে গিয়ে পয়েন্ট রিডিম করে নগদ টাকা বা গিফট কার্ড নিতে পারবেন।'
          : 'Earn daily login & quiz points. Visit the Shop tab to redeem accumulated reward points for cash gifts.';
      } else if (lower.includes('agent') || lower.includes('লাইভ') || lower.includes('কথা') || lower.includes('human')) {
        botReplyText = lang === 'bn'
          ? 'সরাসরি মানব কাউন্সিলরের সাথে কথা বলতে আমাদের যেকোনো হোয়াটসঅ্যাপ বা টেলিগ্রাম লিংকে ক্লিক করুন।'
          : 'To speak directly with a human support officer, please tap any of our WhatsApp or Telegram support channels.';
        botOptions = [
          { label: lang === 'bn' ? 'WhatsApp সাপোর্ট' : 'WhatsApp Help', action: 'goto_whatsapp' }
        ];
      } else {
        botReplyText = lang === 'bn'
          ? `ধন্যবাদ আপনার বার্তার জন্য! "${text}" সম্পর্কিত বিস্তারিত জানতে আমাদের হেল্পডেস্কে মেসেজ রাখা হয়েছে। আপনি সরাসরি কাউন্সিলর ১ বা ২ এর সাথে হোয়াটসঅ্যাপে যুক্ত হতে পারেন।`
          : `Thank you for your inquiry! For detailed assistance on "${text}", feel free to reach out to our online counselors on WhatsApp or Telegram.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: botOptions
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleOptionClick = (option: { label: string; action: string }) => {
    if (option.action === 'goto_whatsapp') {
      setActiveTab('channels');
      return;
    }
    handleSend(option.label);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[1.25rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 flex justify-between items-center shadow-md shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md font-black">
              {activeTab === 'bot' ? (
                <Icons.Bot className="w-5 h-5 text-slate-950 animate-bounce" />
              ) : (
                <Icons.LifeBuoy className="w-5 h-5 text-slate-950" />
              )}
            </div>
            <div>
              <h3 className="font-black text-sm md:text-base leading-tight flex items-center gap-1.5">
                {activeTab === 'bot' 
                  ? (lang === 'bn' ? 'Unity Chat Bot' : 'Unity AI Chat Bot')
                  : (lang === 'bn' ? '২৪/৭ লাইভ হেল্পডেস্ক সাপোর্ট' : '24/7 Live Support Desk')}
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              </h3>
              <p className="text-[10px] text-slate-300 font-medium">
                {activeTab === 'bot'
                  ? (lang === 'bn' ? 'স্বয়ংক্রিয় এআই সহকারী • অনলাইন' : 'Instant AI Assistant • Online')
                  : (lang === 'bn' ? 'দ্রুত সমাধান পেতে নিচের চ্যানেল বেছে নিন' : 'Choose your preferred channel')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all active:scale-95"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Selector Bar (Channels vs AI Bot) */}
        <div className="bg-slate-100 p-1.5 flex gap-1 border-b border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('channels')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'channels'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Icons.Headphones className="w-4 h-4 text-amber-500" />
            <span>{lang === 'bn' ? 'সাপোর্ট চ্যানেল' : 'Support Channels'}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('bot')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 relative ${
              activeTab === 'bot'
                ? 'bg-amber-400 text-slate-950 shadow-sm border border-amber-300'
                : 'text-slate-700 hover:text-slate-950 bg-amber-400/20'
            }`}
          >
            <Icons.Bot className="w-4 h-4 text-amber-600" />
            <span>{lang === 'bn' ? 'Unity Chat Bot' : 'Unity Agent Bot'}</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 py-0.2 rounded-full font-black animate-pulse">
              AI
            </span>
          </button>
        </div>

        {/* TAB CONTENT 1: CHANNELS VIEW */}
        {activeTab === 'channels' && (
          <div className="p-4 overflow-y-auto space-y-4">
            
            {/* Banner message */}
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-[11px] text-emerald-900 font-medium leading-relaxed flex gap-2.5 items-start">
              <Icons.ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                {lang === 'bn'
                  ? 'আপনার কাজ, পেমেন্ট বা একাউন্ট সংক্রান্ত যেকোনো সাহায্যে আমাদের সাপোর্ট টিমের যেকোনো চ্যানেলে সরাসরি কথা বলুন।'
                  : 'Get instant solution for payment or task queries across our official support channels.'}
              </div>
            </div>

            {/* Support Buttons Grid */}
            <div className="space-y-2.5">
              
              {/* 1. Unity Chat Bot Card (Featured) */}
              <button
                onClick={() => setActiveTab('bot')}
                className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black p-3.5 rounded-2xl shadow-sm border border-amber-300 flex items-center justify-between group transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shadow-sm">
                    <Icons.Bot className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black flex items-center gap-1">
                      {lang === 'bn' ? 'Unity Chat Bot (এআই এজেন্ট)' : 'Unity Chat Bot (AI Agent)'}
                      <span className="bg-slate-950 text-amber-300 text-[9px] px-1.5 py-0.2 rounded-full font-extrabold">
                        {lang === 'bn' ? 'ইনস্ট্যান্ট' : 'Instant'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-900 font-bold opacity-90">
                      {lang === 'bn' ? 'স্বয়ংক্রিয় দ্রুত প্রশ্নের উত্তর পাবেন' : 'Instant automated bot answers'}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950 text-white p-1.5 rounded-xl group-hover:translate-x-1 transition-transform">
                  <Icons.ChevronRight className="w-4 h-4 text-amber-400" />
                </div>
              </button>

              {/* 2. WhatsApp Counselor 1 */}
              <a
                href="https://wa.me/message/YOUR_WHATSAPP_LINK_1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold p-3 rounded-2xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icons.MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold">{lang === 'bn' ? 'কাউন্সিলর ১ (WhatsApp)' : 'Counselor 1 (WhatsApp)'}</div>
                    <div className="text-[10px] text-emerald-100 font-medium">{lang === 'bn' ? 'ইনস্ট্যান্ট অনলাইন সাপোর্ট' : 'Online Chat Support'}</div>
                  </div>
                </div>
                <Icons.ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* 3. WhatsApp Counselor 2 */}
              <a
                href="https://wa.me/message/YOUR_WHATSAPP_LINK_2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold p-3 rounded-2xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icons.MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold">{lang === 'bn' ? 'কাউন্সিলর ২ (WhatsApp)' : 'Counselor 2 (WhatsApp)'}</div>
                    <div className="text-[10px] text-emerald-100 font-medium">{lang === 'bn' ? 'দ্বিতীয় হেল্পলাইন ডেস্ক' : 'Secondary Helpline'}</div>
                  </div>
                </div>
                <Icons.ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* 4. Telegram Official Channel */}
              <a
                href="https://t.me/unity_earning_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold p-3 rounded-2xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icons.Send className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold">{lang === 'bn' ? 'অফিসিয়াল টেলিগ্রাম (Telegram)' : 'Official Telegram Group'}</div>
                    <div className="text-[10px] text-cyan-100 font-medium">{lang === 'bn' ? 'গ্রুপ আপডেট ও পেমেন্ট প্রুফ' : 'Group Updates & Payment Proof'}</div>
                  </div>
                </div>
                <Icons.ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* 5. Email Support */}
              <a
                href="mailto:support@unityearning.com"
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold p-3 rounded-2xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-between group border border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center">
                    <Icons.Mail className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold">{lang === 'bn' ? 'ই-মেইল সাপোর্ট (Email)' : 'Official Email Support'}</div>
                    <div className="text-[10px] text-slate-300 font-medium">support@unityearning.com</div>
                  </div>
                </div>
                <Icons.ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* 6. Phone Support */}
              <a
                href="tel:+8801712345678"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-2xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icons.Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold">{lang === 'bn' ? 'সরাসরি কল করুন (Phone)' : 'Direct Phone Call'}</div>
                    <div className="text-[10px] text-blue-100 font-medium">+880 1712-345678</div>
                  </div>
                </div>
                <Icons.ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </a>

            </div>
          </div>
        )}

        {/* TAB CONTENT 2: INTERACTIVE CHAT BOT VIEW */}
        {activeTab === 'bot' && (
          <div className="flex-1 flex flex-col h-[400px] sm:h-[450px] bg-slate-50">
            
            {/* Messages Area */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-1.5 max-w-[85%]">
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs mb-1">
                        🤖
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none font-medium'
                          : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none font-medium'
                      }`}
                    >
                      {msg.text}

                      {/* Bot response options pills */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                          {msg.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(opt)}
                              className="text-left text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1.5 rounded-xl transition-all active:scale-95 flex items-center justify-between"
                            >
                              <span>{opt.label}</span>
                              <Icons.ChevronRight className="w-3 h-3 text-amber-700" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-400 font-mono mt-0.5 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-white p-2 rounded-xl border border-slate-200 w-max">
                  <div className="w-5 h-5 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                    🤖
                  </div>
                  <span>{lang === 'bn' ? 'Unity Bot টাইপ করছে...' : 'Unity Bot is typing...'}</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="p-2.5 bg-white border-t border-slate-200 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'এখানে আপনার প্রশ্ন লিখুন...'
                      : 'Type your message here...'
                  }
                  className="flex-1 bg-slate-100 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-400 focus:bg-white font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-black px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-center active:scale-95 shrink-0 shadow-xs"
                >
                  <Icons.Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
