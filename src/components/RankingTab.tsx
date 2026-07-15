import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

const names = [
  'Jihadul Islam', 'Habiba Sekh', 'Jannat Akter', 'Foysal Hasan', 'Amena Akter', 'Nurjahan Akter', 'Mim Akter', 'Arif Hasan', 'রহিম (Rahim)', 'করিম (Karim)',
  'সালাম (Salam)', 'বারকাত (Barkat)', 'রফিক (Rafiq)', 'জব্বার (Jabbar)', 'শফিক (Shafiq)', 'আরিফ (Arif)', 'নাহিদ (Nahid)', 'সানি (Sunny)',
  'আয়েশা (Ayesha)', 'ফাতেমা (Fatema)', 'খাদিজা (Khadija)', 'সাবিহা (Sabiha)', 'নূরী (Nuri)', 'জুলেখা (Zulekha)', 'মরিয়ম (Mariam)', 'সাইমা (Saima)', 'তানিয়া (Tania)', 'রোকসানা (Roksana)',
  'মিজান (Mizan)', 'হিমেল (Himel)', 'রাশেদ (Rashed)', 'মাসুম (Masum)', 'সুমন (Sumon)', 'ইমরান (Imran)', 'রাসেল (Rasel)', 'লিটন (Liton)', 'ফারুক (Faruk)', 'বিল্লাল (Billal)',
  'নিপা (Nipa)', 'ববিতা (Babita)', 'সুমি (Sumi)', 'মায়া (Maya)', 'শিলা (Shila)', 'জুঁই (Jui)', 'লিপি (Lipi)', 'পপি (Popi)', 'কাজল (Kajol)', 'নীলা (Nila)',
  'শাকিল (Shakil)', 'বাবু (Babu)', 'সাগর (Sagar)', 'আকাশ (Akash)', 'রনি (Rony)', 'তুষার (Tushar)', 'সায়েম (Sayem)', 'ইফতি (Ifti)', 'অয়ন (Ayan)', 'শুভ (Shuvo)',
  'ফাহমিদা (Fahmida)', 'নাসরিন (Nasrin)', 'শাবানা (Shabana)', 'মমতা (Momota)', 'সুরাইয়া (Suraiya)', 'রেহানা (Rehana)', 'সুলতানা (Sultana)', 'শিরিন (Shirin)', 'তাসলিমা (Taslima)', 'রুবিনা (Rubina)',
  'হৃদয় (Hridoy)', 'রাব্বি (Rabbi)', 'শান্ত (Shanto)', 'পলাশ (Polash)', 'আশিক (Ashik)', 'সোহেল (Sohel)', 'রিয়াজ (Riaz)', 'মিঠুন (Mithun)', 'সাদ্দাম (Saddam)', 'জনি (Johnny)',
  'মিতু (Mitu)', 'পিঙ্কি (Pinki)', 'জারা (Zara)', 'মুন (Moon)', 'দিলরুবা (Dilruba)', 'নাতাশা (Natasha)', 'ফারিয়া (Faria)', 'সেতু (Setu)', 'সীমা (Seema)', 'রেখা (Rekha)',
  'জসিম (Josim)', 'জামাল (Jamal)', 'কামাল (Kamal)', 'হেলাল (Helal)', 'মানিক (Manik)', 'সুজন (Sujon)', 'মনির (Monir)', 'জাহিদুল (Jahidul)', 'সাইফুল (Saiful)', 'আনোয়ার (Anwar)',
  'মাহি (Mahi)', 'তুলি (Tuli)', 'শ্রাবণী (Shraboni)', 'স্মৃতি (Smriti)', 'তিথি (Tithi)', 'বৃষ্টি (Brishti)', 'আশা (Asha)', 'বন্যা (Bonya)', 'কনক (Konok)', 'সোহানা (Sohana)'
];

const generateRanking = () => {
  let earnings = 873;
  return names.map((name, index) => {
    const item = {
      rank: index + 1,
      name: name,
      uid: `UID-${1000 + index}`,
      earnings: earnings,
    };
    earnings -= Math.floor(Math.random() * 5) + 2;
    return item;
  });
};

const rankingData = generateRanking();

interface RankingTabProps {
  lang: 'bn' | 'en';
}

export default function RankingTab({ lang }: RankingTabProps) {
  return (
    <div className="space-y-6 pb-20">
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
          <Trophy className="w-6 h-6 text-amber-400" />
          {lang === 'bn' ? 'শীর্ষ আয়কারী র‍্যাঙ্কিং' : 'Top Earner Ranking'}
        </h2>
        <p className="text-slate-400 text-sm">
          {lang === 'bn' ? 'আজকের সেরা ১০০ আয়কারী' : 'Top 100 earners today'}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {rankingData.map((person, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-4 ${index < 3 ? 'bg-amber-50' : 'border-b border-slate-100'}`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index < 3 ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-500'}`}>
                {person.rank}
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800">{person.name}</span>
                <span className="text-xs text-slate-500 font-mono">{person.uid}</span>
              </div>
            </div>
            <span className="font-bold text-emerald-600 font-mono">
              {lang === 'bn' ? `৳${person.earnings}` : `$${(person.earnings/100).toFixed(2)}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
