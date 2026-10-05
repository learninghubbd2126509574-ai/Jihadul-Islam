export interface ChatMsg {
  id: string;
  senderName: string;
  avatarSeed: string;
  avatarBg: string;
  text: string;
  timeStr: string;
  badge?: string;
  isSelf?: boolean;
}

export const CHAT_MESSAGES_POOL: { sender: string; text: string; badge?: string }[] = [
  { sender: 'Faisal Ahmed', text: 'Hello everyone, how long does it take for bKash withdrawal to arrive?', badge: 'Member' },
  { sender: 'আমেনা আক্তার', text: 'ভাইয়া সাধারণত ৫ থেকে ১০ মিনিটের মধ্যেই বিকাশে টাকা চলে আসে।', badge: 'ভেরিফাইড' },
  { sender: 'Tanvir Rahman', text: 'Got my ৳700 payout in Nagad just 6 minutes ago! Alhamdulillah 🔥', badge: 'Top Earner' },
  { sender: 'ইব্রাহিম খান', text: 'উইথড্র দিতে কি কোনো চার্জ কাটে কারো?', badge: 'সদস্য' },
  { sender: 'Arif Hasan', text: 'না ভাইয়া, একদম ০% চার্জ। কোনো বাড়তি ফি কাটে না।' },
  { sender: 'Sarah Khan', text: 'Can anyone guide me where to start? Just joined today!', badge: 'New Student' },
  { sender: 'তানজিলা হক', text: 'হোম পেজ থেকে টাইপিং জব আর ডেইলি ওয়ার্ক দিয়ে শুরু করুন আপু, খুব সহজ।' },
  { sender: 'Md Rakibul', text: 'How do I transfer my balance to another member UID?', badge: 'Member' },
  { sender: 'ফারজানা ববি', text: 'প্রোফাইলে গিয়ে Balance Transfer অপশনে ফ্রেন্ডের UID আর অ্যামাউন্ট দিলেই ইনস্ট্যান্ট ট্রান্সফার হয়ে যাবে।' },
  { sender: 'Mehedi Hasan', text: 'Completed 4 data entry tasks today, ৳60 added to balance.' },
  { sender: 'নুসরাত জাহান', text: 'লাকি স্পিনে আজকে ৫০ পয়েন্ট জিতলাম! পয়েন্ট দিয়ে কি করব ভাইয়া?' },
  { sender: 'Sakib Mahmud', text: 'পয়েন্ট দিয়ে শপ থেকে ডিসকাউন্ট নিতে পারবেন অথবা ক্যাশ কনভার্ট করতে পারবেন।' },
  { sender: 'Sumi Akter', text: 'Are new tasks added daily?' },
  { sender: 'কামরুল হাসান', text: 'হ্যাঁ আপু, প্রতিদিন সকাল ৯টায় নতুন ফ্রেশ টাস্ক যুক্ত হয়।' },
  { sender: 'Shahriar Kabir', text: 'Just withdrew ৳1,000 to bKash! Thanks Unity Earning team.' },
  { sender: 'জান্নাতুল ফেরদৌস', text: 'সাপোর্ট টিম অনেক ফ্রেন্ডলি, আমার পাসওয়ার্ড রিসেট করতে হেল্প করেছে।' },
  { sender: 'Rifat Hossain', text: 'ফর্ম ফিলআপ কাজটা শেষ করতে কয় মিনিট লাগে?' },
  { sender: 'সাদিয়া ইসলাম', text: 'মাত্র ৩-৪ মিনিট লাগে ভাই, নিয়ম দেখে নির্ভুলভাবে সাবমিট করবেন।' },
  { sender: 'Ashraful Alam', text: 'Is there any minimum withdrawal limit?', badge: 'Student' },
  { sender: 'Sharmin Sultana', text: 'Minimum withdraw is only ৳50, very convenient for students!' },
  { sender: 'জাহিদ হাসান', text: 'পেমেন্ট প্রুফ দেখে কাজ শুরু করেছিলাম, এখন আমিও প্রতিদিন নিয়মিত কাজ করছি।' },
  { sender: 'Rumana Akter', text: 'রেফারেল লিংক শেয়ার করে বন্ধুদের ইনভাইট করেছি, ১৫% টিম বোনাস পাচ্ছি।' },
  { sender: 'Hasibur Rahman', text: 'Rocket wallet payout was super fast today.' },
  { sender: 'Layla Nazneen', text: 'সবাইকে আসসালামু আলাইকুম, আজকের স্পেশাল অফারটা কেউ ট্রাই করেছেন?' },
  { sender: 'Muntasir Mamun', text: 'ওয়ালাইকুমুস সালাম! হ্যাঁ আপু, অফার সেকশনে ১০টি ইমেইলে এক্সট্রা ৮০ টাকা বোনাস দিচ্ছে।' },
  { sender: 'শামীমা নাসরিন', text: 'কুইজ সেকশনে খুব সুন্দর সাধারণ জ্ঞানের প্রশ্ন থাকে, খেলতে অনেক মজা লাগে।' },
  { sender: 'Imran Nazir', text: 'Can I work from both mobile and laptop?', badge: 'Member' },
  { sender: 'তাহমিনা খাতুন', text: 'Yes brother, both mobile and laptop are 100% supported smoothly.' },
  { sender: 'Bappi Chowdhury', text: 'আজকে মোট ১,৫০০ টাকা উইথড্র কমপ্লিট করলাম।' },
  { sender: 'ফারহানা মিলি', text: 'গৃহিণী হিসেবে ঘরে বসেই প্রতিদিন অবসর সময়ে ইনকাম করতে পেরে খুব ভালো লাগছে।' },
  { sender: 'Sohail Rana', text: 'Don’t forget to check in daily for bonus points everyone!' },
  { sender: 'তাসলিমা জাহান', text: 'অ্যাকাউন্ট ভেরিফিকেশন হতে কতক্ষণ সময় লাগে?' },
  { sender: 'Abid Hasan', text: 'Usually instant or within 30 minutes. Profile e blue tick dekhabe.' },
  { sender: 'সায়মা ইসলাম', text: 'আজকের সব কয়টি কাজ কমপ্লিট করেছি, আলহামদুলিল্লাহ।' },
];
