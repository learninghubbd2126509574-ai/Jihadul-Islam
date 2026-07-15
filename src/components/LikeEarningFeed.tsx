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
  const [comments, setComments] = useState<Record<string, string>>({});

  const handleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-full w-full bg-slate-50 rounded-3xl overflow-hidden relative animate-fade-in flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white shadow-sm z-20">
        <button onClick={onBack} className="text-slate-800 p-2 hover:bg-slate-100 rounded-full">
          <Icons.ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-slate-800 font-bold text-lg">
          {lang === 'bn' ? 'লাইক আর্নিং' : 'Like Earning'}
        </h2>
        <div />
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-scroll p-4 space-y-6">
        {DUMMY_IMAGES.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                {item.uploader[0]}
              </div>
              <span className="text-sm font-semibold text-slate-700">{item.uploader}</span>
            </div>
            
            <img 
              src={item.url} 
              alt="Content" 
              className="w-full h-64 object-cover rounded-xl mb-3 bg-slate-200" 
              onLoad={(e) => e.currentTarget.classList.remove('bg-slate-200')}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Loading...'; }}
            />
            
            <p className="text-sm text-slate-600 mb-3">
              {lang === 'bn' ? `এই ছবিতে লাইক করলে পাবেন: ৳${item.reward}` : `Like this image to earn: ৳${item.reward}`}
            </p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleLike(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${liked[item.id] ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                <Icons.Heart className={`w-5 h-5 ${liked[item.id] ? 'fill-current' : ''}`} />
                {liked[item.id] ? (lang === 'bn' ? 'লাইকড' : 'Liked') : (lang === 'bn' ? 'লাইক করুন' : 'Like')}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-700">
                <Icons.MessageCircle className="w-5 h-5" />
                {lang === 'bn' ? 'কমেন্ট' : 'Comment'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
