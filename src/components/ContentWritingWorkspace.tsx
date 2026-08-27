import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile } from '../types';

interface ContentWritingWorkspaceProps {
  lang: 'bn' | 'en';
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog?: (newLog: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => void;
  onBack?: () => void;
}

interface StoryTopic {
  id: string;
  categoryBn: string;
  categoryEn: string;
  titleBn: string;
  titleEn: string;
  themeBn: string;
  themeEn: string;
  rewardBDT: number;
  rewardUSD: number;
  minWords: number;
  starterPromptBn: string;
  starterPromptEn: string;
  keywordsBn: string[];
  keywordsEn: string[];
}

const STORY_TOPICS: StoryTopic[] = [
  {
    id: 'topic-1',
    categoryBn: 'অনুপ্রেরণামূলক গল্প',
    categoryEn: 'Inspirational Story',
    titleBn: 'কঠোর পরিশ্রম ও অধ্যবসায়ে ঘুরে দাঁড়ানোর বাস্তব গল্প',
    titleEn: 'A Real Story of Overcoming Obstacles with Hard Work',
    themeBn: 'একজন সাধারণ যুবকের শূন্য থেকে শুরু করে আত্মবিশ্বাস ও সততার জোরে সফলতা পাওয়ার বাস্তব কাহিনী।',
    themeEn: 'A story of a determined person rising from humble beginnings to success through grit and discipline.',
    rewardBDT: 650,
    rewardUSD: 6.50,
    minWords: 35,
    starterPromptBn: 'রাকিবের পকেটে তখন মাত্র পঞ্চাশ টাকা ছিল, কিন্তু চোখে ছিল এক আকাশ স্বপ্ন। প্রতিদিনের ব্যর্থতা যখন তাকে পিছু টানত, তখনই...',
    starterPromptEn: 'With only empty pockets but a heart full of relentless dreams, Liam decided that failure was not an option...',
    keywordsBn: ['পরিশ্রম', 'আত্মবিশ্বাস', 'ধৈর্য', 'সাফল্য', 'শিক্ষা'],
    keywordsEn: ['Hard work', 'Resilience', 'Discipline', 'Success']
  },
  {
    id: 'topic-2',
    categoryBn: 'স্মৃতিচারণ ও গ্রামীণ প্রকৃতি',
    categoryEn: 'Childhood & Nostalgia',
    titleBn: 'শৈশবের সোনালী দিন ও বৃষ্টির দিনের স্মৃতি',
    titleEn: 'Golden Memories of Village Life and Rainy Afternoons',
    themeBn: 'গ্রামীণ প্রকৃতির স্নিগ্ধ রূপ, কাদামাটি মেখে বন্ধুদের সাথে শৈশবের ফেলে আসা সোনালী স্মৃতি।',
    themeEn: 'Reflections on carefree village childhood, monsoon rains, paper boats, and timeless memories.',
    rewardBDT: 550,
    rewardUSD: 5.50,
    minWords: 30,
    starterPromptBn: 'টিনের চালে যখন ঝুমঝুম করে আষাঢ়ের বৃষ্টি নামত, তখন আমরা সব বন্ধুরা দলবেঁধে মেঠোপথ ধরে...',
    starterPromptEn: 'Whenever the monsoon raindrops echoed upon the tin roof, we rushed outside toward the green fields...',
    keywordsBn: ['গ্রামের প্রকৃতি', 'শৈশব', 'বৃষ্টির দিন', 'কাগজের নৌকা', 'স্মৃতি'],
    keywordsEn: ['Village life', 'Childhood', 'Monsoon', 'Nostalgia']
  },
  {
    id: 'topic-3',
    categoryBn: 'প্রযুক্তি ও ভবিষ্যৎ',
    categoryEn: 'Technology & AI',
    titleBn: 'কৃত্রিম বুদ্ধিমত্তা (AI) ও আগামী পৃথিবীর কর্মসংস্থান',
    titleEn: 'Artificial Intelligence and the Future of Digital Careers',
    themeBn: 'এআই প্রযুক্তি কীভাবে আমাদের দৈনন্দিন কাজ সহজ করছে এবং তরুণদের নতুন স্কিল গড়ার সুযোগ দিচ্ছে।',
    themeEn: 'How artificial intelligence is empowering freelancers and shaping future productivity.',
    rewardBDT: 750,
    rewardUSD: 7.50,
    minWords: 35,
    starterPromptBn: 'গত কয়েক বছরে প্রযুক্তির দ্রুত অগ্রগতি আমাদের জীবনযাত্রাকে আমূল বদলে দিয়েছে। বিশেষ করে কৃত্রিম বুদ্ধিমত্তা আজ...',
    starterPromptEn: 'Over the last decade, AI innovations have transformed modern workflows by enabling anyone to create...',
    keywordsBn: ['কৃত্রিম বুদ্ধিমত্তা', 'ডিজিটাল স্কিল', 'ভবিষ্যৎ কর্মসংস্থান', 'ফ্রিল্যান্সিং'],
    keywordsEn: ['Artificial Intelligence', 'Future of Work', 'Automation', 'Creativity']
  },
  {
    id: 'topic-4',
    categoryBn: 'তরুণ উদ্যোক্তা ও বিজনেস',
    categoryEn: 'Young Entrepreneurship',
    titleBn: 'অনলাইন ব্যবসার প্রাথমিক চ্যালেঞ্জ ও জয়ের গল্প',
    titleEn: 'Overcoming Startup Obstacles: A Young Entrepreneur Journey',
    themeBn: 'স্বল্প পুঁজিতে ঘরে বসে ডিজিটাল ব্যবসা শুরু করার স্ট্রাগল এবং কাস্টমার সন্তুষ্টি অর্জনের পথচলা।',
    themeEn: 'The real challenges of starting a small online venture and building loyal customer trust.',
    rewardBDT: 850,
    rewardUSD: 8.50,
    minWords: 40,
    starterPromptBn: 'চাকরির পেছনে না ছুটে ছোট একটি ইউনিক আইডিয়া নিয়ে ব্যবসা শুরু করার সিদ্ধান্ত নেওয়া সহজ ছিল না। প্রথম প্রথম কোনো অর্ডার না পেলেও...',
    starterPromptEn: 'Deciding to launch an independent venture required immense courage. Even during the initial dry weeks...',
    keywordsBn: ['উদ্যোক্তা', 'ই-কমার্স', 'কাস্টমার সেবা', 'ব্র্যান্ডিং'],
    keywordsEn: ['Entrepreneurship', 'E-commerce', 'Strategy', 'Growth']
  },
  {
    id: 'topic-5',
    categoryBn: 'কাস্টম গল্প / উন্মুক্ত টপিক',
    categoryEn: 'Custom Free Story',
    titleBn: 'আপনার নিজের পছন্দের গল্প বা শিক্ষণীয় ব্লগ লিখুন',
    titleEn: 'Write Your Own Creative Story or Educational Blog',
    themeBn: 'আপনার মন থেকে যে কোনো শিক্ষণীয়, উপদেশমূলক বা জীবনমুখী গল্প লিখে সাবমিট করুন।',
    themeEn: 'Express your creativity with any original short story, lifestyle advice, or article.',
    rewardBDT: 600,
    rewardUSD: 6.00,
    minWords: 30,
    starterPromptBn: 'প্রতিটি মানুষের জীবনের কোনো না কোনো অধ্যায়ে এমন একটি শিক্ষণীয় অভিজ্ঞতা থাকে যা...',
    starterPromptEn: 'Life is filled with unexpected lessons that teach us valuable truths about human kindness and perseverance...',
    keywordsBn: ['জীবনবোধ', 'গল্প', 'শিক্ষা', 'অনুপ্রেরণা'],
    keywordsEn: ['Life story', 'Wisdom', 'Morals', 'Inspiration']
  }
];

const toBnNum = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

export default function ContentWritingWorkspace({
  lang,
  profile,
  updateProfile,
  addLog,
  onBack
}: ContentWritingWorkspaceProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-1');
  const [storyTitle, setStoryTitle] = useState<string>('');
  const [storyContent, setStoryContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submittedReward, setSubmittedReward] = useState<number | null>(null);
  const [submittedCount, setSubmittedCount] = useState<number>(3);
  const [showPromptHint, setShowPromptHint] = useState<boolean>(false);

  const selectedTopic = STORY_TOPICS.find((t) => t.id === selectedTopicId) || STORY_TOPICS[0];

  // Calculate word count
  const words = storyContent.trim() ? storyContent.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const charCount = storyContent.length;
  const isLengthAdequate = wordCount >= selectedTopic.minWords;

  const handleApplyPrompt = () => {
    if (!storyTitle) {
      setStoryTitle(lang === 'bn' ? selectedTopic.titleBn : selectedTopic.titleEn);
    }
    const starter = lang === 'bn' ? selectedTopic.starterPromptBn : selectedTopic.starterPromptEn;
    if (!storyContent.includes(starter)) {
      setStoryContent((prev) => (prev ? `${prev}\n\n${starter}` : starter));
    }
    setShowPromptHint(false);
  };

  const handleInsertTag = (tagType: 'bold' | 'quote' | 'heading' | 'break') => {
    switch (tagType) {
      case 'bold':
        setStoryContent((prev) => `${prev} **গুরুত্বপূর্ণ কথা** `);
        break;
      case 'quote':
        setStoryContent((prev) => `${prev}\n> "জীবন মানেই নতুন সম্ভাবনার হাতছানি..."\n`);
        break;
      case 'heading':
        setStoryContent((prev) => `${prev}\n\n## গল্পের মূল শিক্ষা:\n`);
        break;
      case 'break':
        setStoryContent((prev) => `${prev}\n\n---\n\n`);
        break;
    }
  };

  const handleSubmitStory = () => {
    setErrorMessage('');

    if (!storyTitle.trim()) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে গল্পের একটি সুন্দর শিরোনাম দিন!' : 'Please enter a title for your story/article!');
      return;
    }

    if (wordCount < selectedTopic.minWords) {
      setErrorMessage(
        lang === 'bn'
          ? `আপনার গল্পে আরও শব্দ প্রয়োজন! কমপক্ষে ${toBnNum(selectedTopic.minWords)}টি শব্দ লিখুন (বর্তমান: ${toBnNum(wordCount)}টি শব্দ)।`
          : `Please write at least ${selectedTopic.minWords} words (Currently: ${wordCount} words).`
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const rewardTaka = selectedTopic.rewardBDT;
      const newBalance = profile.balance + rewardTaka;
      const newIncome = (profile.totalIncome ?? profile.balance) + rewardTaka;
      const newTasksDone = profile.tasksCompleted + 1;

      updateProfile({
        balance: newBalance,
        totalIncome: newIncome,
        tasksCompleted: newTasksDone
      });

      if (addLog) {
        addLog({
          jobId: 'content-writing',
          jobTitleBn: `কন্টেন্ট রাইটিং: "${storyTitle.slice(0, 30)}..." (${toBnNum(wordCount)} শব্দ)`,
          jobTitleEn: `Content Writing: "${storyTitle.slice(0, 30)}..." (${wordCount} words)`,
          reward: rewardTaka / 100
        });
      }

      setIsSubmitting(false);
      setSubmittedReward(rewardTaka);
      setSubmittedCount((prev) => prev + 1);
    }, 1500);
  };

  const handleResetForNextStory = () => {
    setSubmittedReward(null);
    setStoryTitle('');
    setStoryContent('');
    setErrorMessage('');
    // Switch to next topic
    const currentIndex = STORY_TOPICS.findIndex((t) => t.id === selectedTopicId);
    const nextTopic = STORY_TOPICS[(currentIndex + 1) % STORY_TOPICS.length];
    setSelectedTopicId(nextTopic.id);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="content-writing-workspace">
      {/* Banner Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 md:p-6 rounded-3xl relative overflow-hidden shadow-lg border border-emerald-700/50">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
          <Icons.PenTool className="w-56 h-56" />
        </div>
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Icons.Sparkles className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'আর্টিকেল ও ক্রিয়েটিভ গল্প রাইটিং হাব' : 'Creative Story & Article Writing Hub'}
            </span>
            <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
              {lang === 'bn' ? 'ইনস্ট্যান্ট ভেরিফিকেশন ও বোনাস' : 'Instant Review & Reward'}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black leading-tight text-white">
            {lang === 'bn' ? 'গল্প ও কন্টেন্ট লিখে সরাসরি আয় করুন' : 'Write Inspiring Stories & Earn BDT Rewards'}
          </h3>
          <p className="text-emerald-100/90 text-xs md:text-sm max-w-xl leading-relaxed">
            {lang === 'bn'
              ? 'নিচের তালিকা থেকে আপনার পছন্দের যেকোনো গল্পের টপিক বেছে নিন অথবা নিজের মন মতো চমৎকার গল্প লিখে নির্ধারিত শব্দ পূরণ করে সাবমিট করুন।'
              : 'Choose any creative storytelling prompt from the curated list or craft your own original piece to earn instant cash.'}
          </p>
        </div>
      </div>

      {/* Success Celebration Modal / State */}
      {submittedReward !== null ? (
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 md:p-8 text-center space-y-5 shadow-lg animate-scale-up">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
            <Icons.CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {lang === 'bn' ? 'গল্পটি সফলভাবে অনুমোদিত হয়েছে' : 'Story Verified & Published'}
            </span>
            <h3 className="text-xl font-black text-slate-800">
              {lang === 'bn' ? 'অভিনন্দন! আপনার লেখা সাবমিট হয়েছে' : 'Congratulations! Content Approved'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'bn'
                ? `"${storyTitle}" গল্পটি ডিরেক্টরি পাবলিশিং প্যানেলে এপ্রুভ হয়েছে এবং আপনার মূল অ্যাকাউন্টে রিওয়ার্ড যুক্ত হয়েছে।`
                : `Your story "${storyTitle}" has been verified and registered. Earnings have been deposited into your wallet.`}
            </p>
          </div>

          {/* Reward Amount Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl max-w-xs mx-auto shadow-xs">
            <span className="text-xs text-emerald-700 font-bold block mb-0.5">
              {lang === 'bn' ? 'অর্জিত কন্টেন্ট রাইটিং আয়' : 'Earned Reward'}
            </span>
            <span className="text-3xl font-black text-emerald-700 font-mono">
              +৳{toBnNum(submittedReward)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetForNextStory}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-2xl text-xs transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Icons.PenTool className="w-4 h-4" />
              <span>{lang === 'bn' ? 'আরেকটি নতুন গল্প লিখুন' : 'Write Another Story'}</span>
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-2xl text-xs transition-all cursor-pointer"
              >
                {lang === 'bn' ? 'টাস্ক লিস্টে ফিরুন' : 'Back to Tasks'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Step 1: Select Story Topic Chips */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                <Icons.BookOpen className="w-4 h-4 text-emerald-600" />
                {lang === 'bn' ? '১. লেখার জন্য গল্পের বিষয় / টপিক নির্বাচন করুন:' : '1. Choose Story / Article Topic:'}
              </label>
              <span className="text-[10px] text-slate-400 font-bold">
                {lang === 'bn' ? `${toBnNum(STORY_TOPICS.length)}টি টপিক উপলব্ধ` : `${STORY_TOPICS.length} Topics Available`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {STORY_TOPICS.map((topic) => {
                const isSelected = selectedTopicId === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      setErrorMessage('');
                      if (!storyTitle) {
                        setStoryTitle(lang === 'bn' ? topic.titleBn : topic.titleEn);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all relative cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                          {lang === 'bn' ? topic.categoryBn : topic.categoryEn}
                        </span>
                        <span className="text-[11px] font-black font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                          ৳{toBnNum(topic.rewardBDT)}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-800 line-clamp-2 leading-snug">
                        {lang === 'bn' ? topic.titleBn : topic.titleEn}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{lang === 'bn' ? `কমপক্ষে ${toBnNum(topic.minWords)} শব্দ` : `Min ${topic.minWords} words`}</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                        {isSelected ? (
                          <>
                            <Icons.CheckCircle className="w-3.5 h-3.5" />
                            {lang === 'bn' ? 'সিলেক্টেড' : 'Selected'}
                          </>
                        ) : (
                          <span>{lang === 'bn' ? 'সিলেক্ট করুন' : 'Select'}</span>
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Topic Theme & Guidelines Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 md:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                  {lang === 'bn' ? 'সিলেক্টেড টপিক গাইডলাইন' : 'Selected Topic Guidelines'}
                </span>
                <h4 className="font-extrabold text-sm text-slate-800">
                  {lang === 'bn' ? selectedTopic.titleBn : selectedTopic.titleEn}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-600 text-white font-extrabold px-3 py-1.5 rounded-xl shadow-xs">
                  {lang === 'bn' ? `রিওয়ার্ড: ৳${toBnNum(selectedTopic.rewardBDT)}` : `Reward: ৳${selectedTopic.rewardBDT}`}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn' ? selectedTopic.themeBn : selectedTopic.themeEn}
            </p>

            {/* Target Keywords */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400">
                {lang === 'bn' ? 'পরামর্শিত কিওয়ার্ডস:' : 'Suggested Keywords:'}
              </span>
              {(lang === 'bn' ? selectedTopic.keywordsBn : selectedTopic.keywordsEn).map((kw, i) => (
                <span key={i} className="text-[10px] font-medium bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                  #{kw}
                </span>
              ))}
            </div>

            {/* Prompt Helper Button */}
            <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowPromptHint(!showPromptHint)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80 cursor-pointer transition-all"
              >
                <Icons.Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{lang === 'bn' ? '💡 লেখার শুরু করার চমৎকার আইডিয়া দেখুন' : '💡 View Creative Story Starter'}</span>
              </button>

              <button
                type="button"
                onClick={handleApplyPrompt}
                className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all"
              >
                <Icons.Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{lang === 'bn' ? 'আইডিয়াটি লেখার ঘরে বসান' : 'Apply Prompt to Editor'}</span>
              </button>
            </div>

            {showPromptHint && (
              <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 leading-relaxed animate-fade-in space-y-1.5">
                <span className="font-bold block text-[11px] text-amber-800">
                  {lang === 'bn' ? 'গল্পের সূচনা বাক্য আইডিয়া:' : 'Story Starter Idea:'}
                </span>
                <p className="italic bg-white p-2.5 rounded-lg border border-amber-100">
                  "{lang === 'bn' ? selectedTopic.starterPromptBn : selectedTopic.starterPromptEn}"
                </p>
              </div>
            )}
          </div>

          {/* Step 2: Live Writing Editor */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Icons.PenTool className="w-4 h-4 text-emerald-600" />
                {lang === 'bn' ? '২. আপনার গল্প বা আর্টিকেল লিখুন:' : '2. Write Your Story / Content:'}
              </label>

              {/* Formatting Toolbar */}
              <div className="hidden sm:flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleInsertTag('bold')}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold cursor-pointer"
                  title="Bold text"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertTag('quote')}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold cursor-pointer"
                  title="Quote"
                >
                  " "
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertTag('heading')}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold cursor-pointer"
                  title="Heading"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertTag('break')}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold cursor-pointer"
                  title="Divider"
                >
                  ---
                </button>
              </div>
            </div>

            {/* Story Title Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 block">
                {lang === 'bn' ? 'গল্পের শিরোনাম (Title):' : 'Story Title / Headline:'}
              </label>
              <input
                type="text"
                value={storyTitle}
                onChange={(e) => {
                  setStoryTitle(e.target.value);
                  setErrorMessage('');
                }}
                placeholder={lang === 'bn' ? 'যেমন: বৃষ্টির দিনে এক নতুন দিগন্তের সূচনা...' : 'e.g. A New Dawn on a Rainy Afternoon...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs md:text-sm font-bold text-slate-800 focus:bg-white focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            {/* Story Textarea */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-500 block">
                  {lang === 'bn' ? 'মূল গল্প / লেখার বডি (Paragraphs):' : 'Story Content / Paragraphs:'}
                </label>
                <span className="text-[10px] text-slate-400">
                  {lang === 'bn' ? 'বাংলা অথবা ইংরেজি উভয় ভাষায় লিখতে পারেন' : 'You can write in Bengali or English'}
                </span>
              </div>

              <textarea
                rows={9}
                value={storyContent}
                onChange={(e) => {
                  setStoryContent(e.target.value);
                  setErrorMessage('');
                }}
                placeholder={
                  lang === 'bn'
                    ? 'এখানে আপনার গল্পটি সুন্দর ভাষায় লিখুন... (যেমন: গল্পের শুরু, মূল ঘটনা, এবং শিক্ষণীয় সমাপ্তি বা মেসেজ)...'
                    : 'Craft your story here with introduction, development, and a meaningful conclusion...'
                }
                className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl p-4 text-xs md:text-sm text-slate-800 leading-relaxed focus:bg-white focus:border-emerald-500 outline-none transition-all font-sans resize-y"
              />
            </div>

            {/* Live Stats Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">{lang === 'bn' ? 'শব্দ সংখ্যা:' : 'Words:'}</span>
                  <span className={`font-black ${isLengthAdequate ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {toBnNum(wordCount)} / {toBnNum(selectedTopic.minWords)}
                  </span>
                </div>

                <div className="text-slate-300">•</div>

                <div className="flex items-center gap-1 text-slate-500">
                  <span>{lang === 'bn' ? 'অক্ষর:' : 'Chars:'}</span>
                  <span className="font-bold">{toBnNum(charCount)}</span>
                </div>
              </div>

              <div>
                {isLengthAdequate ? (
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    {lang === 'bn' ? 'পর্যাপ্ত শব্দ হয়েছে ✅' : 'Word Count Target Met ✅'}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Icons.AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {lang === 'bn'
                      ? `আরও ${toBnNum(selectedTopic.minWords - wordCount)}টি শব্দ লিখুন`
                      : `Write ${selectedTopic.minWords - wordCount} more words`}
                  </span>
                )}
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold animate-shake">
                <Icons.AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Action Button */}
            <button
              type="button"
              onClick={handleSubmitStory}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-black py-4 rounded-2xl text-xs md:text-sm transition-all active:scale-[0.99] shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Icons.Loader2 className="w-5 h-5 animate-spin" />
                  <span>{lang === 'bn' ? 'গল্পের মান ও শব্দসংখ্যা যাচাই হচ্ছে...' : 'Validating & Publishing Story...'}</span>
                </>
              ) : (
                <>
                  <Icons.CheckCircle2 className="w-5 h-5 text-emerald-200" />
                  <span>
                    {lang === 'bn'
                      ? `গল্পটি সাবমিট করুন ও ৳${toBnNum(selectedTopic.rewardBDT)} আয় গ্রহণ করুন`
                      : `Submit Story & Claim ৳${selectedTopic.rewardBDT}`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
