import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile } from '../types';
import { MicroTask, getLocalMicroTasks, saveLocalMicroTasks } from '../data/microJobs';

interface MicroTabProps {
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog: (log: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => void;
  lang: 'bn' | 'en';
}

export default function MicroTab({ profile, updateProfile, addLog, lang }: MicroTabProps) {
  const [tasks, setTasks] = useState<MicroTask[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [visibleCount, setVisibleCount] = useState(15); // Show 15 initially, can load more

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Load from local storage on mount
  useEffect(() => {
    setTasks(getLocalMicroTasks());
  }, []);

  const startTask = (task: MicroTask) => {
    if (task.completed || activeTaskId !== null) return;
    setActiveTaskId(task.id);
    setProgress(0);

    const step = 100 / (task.timeSec * 10); // updates every 100ms
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += step;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);

        // Mark as completed
        setTasks((prev) => {
          const updated = prev.map((t) => {
            if (t.id === task.id) {
              return { ...t, completed: true, completedCount: t.completedCount + 1 };
            }
            return t;
          });
          saveLocalMicroTasks(updated);
          return updated;
        });

        // Add reward
        updateProfile({
          balance: profile.balance + task.reward,
          tasksCompleted: profile.tasksCompleted + 1,
        });

        // Add to log
        addLog({
          jobId: task.id,
          jobTitleBn: `[মাইক্রো] ${task.titleBn}`,
          jobTitleEn: `[Micro] ${task.titleEn}`,
          reward: task.reward,
        });

        setTimeout(() => {
          setActiveTaskId(null);
          setProgress(0);
        }, 1000);
      } else {
        setProgress(currentProgress);
      }
    }, 100);
  };

  // Convert numbers to Bengali if language is BN
  const toBnNum = (num: number | string) => {
    if (lang !== 'bn') return String(num);
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/\d/g, (d) => bnDigits[parseInt(d)]);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.titleEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'All' || task.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const displayedTasks = filteredTasks.slice(0, visibleCount);

  const platforms = [
    { key: 'All', labelBn: 'সব টাস্ক', labelEn: 'All Tasks', icon: 'Layers' },
    { key: 'Facebook', labelBn: 'ফেসবুক', labelEn: 'Facebook', icon: 'Facebook' },
    { key: 'YouTube', labelBn: 'ইউটিউব', labelEn: 'YouTube', icon: 'Youtube' },
    { key: 'Telegram', labelBn: 'টেলিগ্রাম', labelEn: 'Telegram', icon: 'Send' },
    { key: 'WhatsApp', labelBn: 'হোয়াটসঅ্যাপ', labelEn: 'WhatsApp', icon: 'MessageSquare' },
    { key: 'TikTok', labelBn: 'টিকটক', labelEn: 'TikTok', icon: 'Video' }
  ];

  return (
    <div className="space-y-6 pb-24 animate-fade-in" id="micro-container">
      {/* Intro block */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
          <Icons.Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
          {lang === 'bn' ? '⚡ ইন্সট্যান্ট মাইক্রো টাস্কস' : '⚡ Instant Micro Tasks'}
        </h2>
        <p className="text-slate-500 text-xs mt-1 leading-relaxed">
          {lang === 'bn'
            ? 'ফেসবুক লাইক, কমেন্ট, শেয়ার, ইউটিউব ওয়াচ, টেলিগ্রাম এবং হোয়াটসঅ্যাপ গ্রুপে জয়েন করে ২ টাকা, ৫ টাকা ও ১০ টাকা করে ব্যালেন্স আর্ন করুন।'
            : 'Complete simple tasks like Liking, Commenting on Facebook, Subscribing to YouTube, or Joining groups to instantly earn ৳2, ৳5, ৳6, or ৳10.'}
        </p>

        {/* Short Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-center">
          <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[9px] text-slate-400 block font-bold uppercase">{lang === 'bn' ? 'মোট কাজ উপলব্ধ' : 'Total Available'}</span>
            <span className="text-sm font-extrabold text-slate-800 font-mono">{toBnNum(tasks.length)}</span>
          </div>
          <div className="p-2 bg-emerald-50/40 rounded-xl border border-emerald-100">
            <span className="text-[9px] text-emerald-600 block font-bold uppercase">{lang === 'bn' ? 'আপনার সম্পন্ন কাজ' : 'Your Completed'}</span>
            <span className="text-sm font-extrabold text-emerald-700 font-mono">{toBnNum(tasks.filter(t => t.completed).length)}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="space-y-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        {/* Search */}
        <div className="relative">
          <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'bn' ? 'টাস্ক কিওয়ার্ড সার্চ করুন...' : 'Search tasks...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-700 focus:bg-white focus:border-amber-400 outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <Icons.X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Platform Categories Pill Buttons */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {platforms.map((plat) => {
            const PlatIcon = (Icons as any)[plat.icon] || Icons.Layers;
            const isSelected = selectedPlatform === plat.key;
            return (
              <button
                key={plat.key}
                onClick={() => {
                  setSelectedPlatform(plat.key);
                  setVisibleCount(15); // Reset load more
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f172a] text-white shadow-sm'
                    : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <PlatIcon className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? plat.labelBn : plat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task Listing */}
      <div className="space-y-3">
        {displayedTasks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
            <Icons.Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-400 text-xs font-bold">
              {lang === 'bn' ? 'কোনো কাজ খুঁজে পাওয়া যায়নি!' : 'No matching tasks found!'}
            </p>
          </div>
        ) : (
          displayedTasks.map((task) => {
            const IconComponent = (Icons as any)[task.iconName] || Icons.Zap;
            const isRunning = activeTaskId === task.id;
            const progressPercent = Math.round((task.completedCount / task.maxTarget) * 100);

            return (
              <div
                key={task.id}
                className={`bg-white rounded-2xl border p-4.5 flex flex-col transition-all duration-300 ${
                  task.completed
                    ? 'border-emerald-200 bg-emerald-50/5'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${task.bgColor} ${task.iconColor} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-[#0f172a] text-xs md:text-sm leading-snug truncate">
                        {lang === 'bn' ? task.titleBn : task.titleEn}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-emerald-600 text-xs font-extrabold font-mono">
                          +৳{toBnNum((task.reward * 100).toFixed(0))}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400 text-[10px] font-bold">
                          {lang === 'bn' ? `${toBnNum(task.timeSec)} সেকেন্ড` : `${task.timeSec}s`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-2">
                    {task.completed ? (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1">
                        <Icons.Check className="w-3.5 h-3.5" />
                        {lang === 'bn' ? 'সম্পন্ন' : 'Claimed'}
                      </span>
                    ) : isRunning ? (
                      <span className="text-[10px] font-extrabold text-amber-500 bg-amber-50 px-2.5 py-1.5 rounded-xl animate-pulse">
                        {lang === 'bn' ? 'চলছে...' : 'Running...'}
                      </span>
                    ) : (
                      <button
                        onClick={() => startTask(task)}
                        disabled={activeTaskId !== null}
                        className="bg-[#0f172a] text-white font-bold px-4 py-1.5 rounded-xl text-xs hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
                      >
                        {lang === 'bn' ? 'ক্লেম করুন' : 'Claim'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress bar inside task - ACTIVE EXECUTION */}
                {isRunning && (
                  <div className="mt-3.5 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>{lang === 'bn' ? 'সরাসরি ভেরিফিকেশন চলছে...' : 'Validating redirection...'}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Task Community Completion Progress Ratio (e.g. 300 / 1000 completed) */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-semibold">
                    {lang === 'bn' ? 'কমিউনিটি এনগেজমেন্ট রেশিও:' : 'Community ratio:'}
                  </span>
                  <span className="font-mono font-bold text-slate-500">
                    {toBnNum(task.completedCount)} / {toBnNum(task.maxTarget)} ({toBnNum(progressPercent)}%)
                  </span>
                </div>
                {/* Horizontal Progress bar for community engagement */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-slate-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {filteredTasks.length > visibleCount && (
        <div className="text-center pt-2">
          <button
            onClick={() => setVisibleCount((prev) => prev + 15)}
            className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs border border-slate-200 hover:border-slate-300 transition-all active:scale-95 shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Icons.ChevronDown className="w-4 h-4" />
            <span>{lang === 'bn' ? 'আরো লোড করুন' : 'Load More Tasks'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
