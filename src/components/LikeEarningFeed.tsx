import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface LikeItem {
  id: string;
  uploader: string;
  url: string;
  reward: number;
}

const DUMMY_IMAGES: LikeItem[] = Array.from({ length: 30 }, (_, i) => ({
  id: `like-${i}`,
  uploader: `User ${i + 1}`,
  url: `https://picsum.photos/seed/${i + 100}/400/400`,
  reward: 1 + Math.floor(Math.random() * 2),
}));

export default function LikeEarningFeed({ lang, onBack }: { lang: 'bn' | 'en', onBack: () => void }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-full w-full bg-slate-50 rounded-[1.25rem] overflow-hidden relative animate-fade-in flex flex-col border border-slate-200">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-slate-200/80 z-20">
        <button 
          onClick={onBack} 
          className="text-slate-700 p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
        >
          <Icons.ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-slate-900 font-bold text-base sm:text-lg leading-snug tracking-tight">
          {lang === 'bn' ? 'লাইক আর্নিং' : 'Like Earning'}
        </h2>
        <div className="w-9" />
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {DUMMY_IMAGES.map((item) => (
          <div key={item.id} className="bg-white rounded-[1.25rem] p-4 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                {item.uploader[0]}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">{item.uploader}</span>
            </div>
            
            <img 
              src={item.url} 
              alt="Content" 
              className="w-full h-56 sm:h-64 object-cover rounded-xl mb-3 bg-slate-100 border border-slate-100" 
              onLoad={(e) => e.currentTarget.classList.remove('bg-slate-100')}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Loading...'; }}
            />
            
            <p className="text-xs sm:text-sm text-slate-600 mb-3 font-medium leading-relaxed">
              {lang === 'bn' ? `এই ছবিতে লাইক করলে পাবেন: ৳${item.reward}` : `Like this image to earn: ৳${item.reward}`}
            </p>
            
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => handleLike(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer leading-none ${
                  liked[item.id] 
                    ? 'bg-rose-600 text-white shadow-2xs' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icons.Heart className={`w-4 h-4 ${liked[item.id] ? 'fill-current' : ''}`} />
                <span>{liked[item.id] ? (lang === 'bn' ? 'লাইকড' : 'Liked') : (lang === 'bn' ? 'লাইক করুন' : 'Like')}</span>
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer leading-none">
                <Icons.MessageCircle className="w-4 h-4" />
                <span>{lang === 'bn' ? 'কমেন্ট' : 'Comment'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
