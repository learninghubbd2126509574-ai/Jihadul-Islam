import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

interface Question {
  id: number;
  questionBn: string;
  questionEn: string;
  optionsBn: string[];
  optionsEn: string[];
  answerIndex: number;
}

interface QuizTabProps {
  profile: {
    balance: number;
    tasksCompleted: number;
    level: string;
  };
  updateProfile: (data: { balance: number; tasksCompleted: number }) => void;
  addLog: (log: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => void;
  lang: 'bn' | 'en';
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    questionBn: "Unity Earning E-learning Platform এ ডাটা এন্ট্রি লিমিট কত?",
    questionEn: "What is the data entry limit in Unity Earning E-learning Platform?",
    optionsBn: ["আনলিমিটেড", "প্রতিদিন ৫০ টি", "প্রতিদিন ১০০ টি", "প্রতিদিন ২০০ টি"],
    optionsEn: ["Unlimited", "50 per day", "100 per day", "200 per day"],
    answerIndex: 0
  },
  {
    id: 2,
    questionBn: "লিড জেনারেশন জবে প্রতি ডাটা-লিস্টে কত টাকা পর্যন্ত আয় করা যায়?",
    questionEn: "How much can you earn per data list in the Lead Generation job?",
    optionsBn: ["৳২০০ - ৳৩০০", "৳৪৫০ - ৳৭০০", "৳৮০০ - ৳১০০০", "৳১২০০ - ৳১৫০০"],
    optionsEn: ["৳200 - ৳300", "৳450 - ৳700", "৳800 - ৳1000", "৳1200 - ৳1500"],
    answerIndex: 1
  },
  {
    id: 3,
    questionBn: "প্রোডাক্ট রিসেলিং অ্যান্ড কমিশন জবে প্রতিটি সফল অর্ডারে কত টাকা কমিশন পাওয়া যায়?",
    questionEn: "How much commission can you earn per successful order in the Product Reselling job?",
    optionsBn: ["৳১০০ - ৳৩০০", "৳২০০ - ৳৫০০", "৳৪৫০ - ৳১২০০", "৳১৫০০ - ৳২০০০"],
    optionsEn: ["৳100 - ৳300", "৳200 - ৳500", "৳450 - ৳1200", "৳1500 - ৳2000"],
    answerIndex: 2
  },
  {
    id: 4,
    questionBn: "ইমেইল মার্কেটিং জবে প্রতি ক্যাম্পেইনে কত টাকা আয় করা সম্ভব?",
    questionEn: "How much can you earn per campaign in the Email Marketing job?",
    optionsBn: ["৳১০০ - ৳২৫০", "৳৩০০ - ৳৪০০", "৳৪২০ - ৳৬৫০", "৳৭০০ - ৳৯০০"],
    optionsEn: ["৳100 - ৳250", "৳300 - ৳400", "৳420 - ৳650", "৳700 - ৳900"],
    answerIndex: 2
  },
  {
    id: 5,
    questionBn: "ডিজিটাল মার্কেটিং জবে প্রতি কাস্টমার ক্যাম্পেইন এডিটিং এ কত কমিশন দেওয়া হয়?",
    questionEn: "How much commission is given per customer campaign editing in the Digital Marketing job?",
    optionsBn: ["৳১৫০ - ৳২৫০", "৳৩৮০ - ৳৫৫০", "৳৬০০ - ৳৭৫০", "৳৮০০ - ৳১০০০"],
    optionsEn: ["৳150 - ৳250", "৳380 - ৳550", "৳600 - ৳750", "৳800 - ৳1000"],
    answerIndex: 1
  },
  {
    id: 6,
    questionBn: "ইনভেন্টরি লেজার ডাটা এন্ট্রি কাজের প্রতি স্প্রেডশিটে কত কমিশন দেওয়া হয়?",
    questionEn: "How much commission is paid per spreadsheet in the Inventory Ledger Data Entry job?",
    optionsBn: ["৳১০০ - ৳২০০", "৳২০০ - ৳৩০০", "৳৩০০ - ৳৫০০", "৳৬০০ - ৳৮০০"],
    optionsEn: ["৳100 - ৳200", "৳200 - ৳300", "৳300 - ৳500", "৳600 - ৳800"],
    answerIndex: 2
  },
  {
    id: 7,
    questionBn: "ফটো এডিটিং কাজে প্রতি ছবির কালার অ্যাডজাস্টমেন্ট ও এডিটিং এ কত টাকা পর্যন্ত পাওয়া যায়?",
    questionEn: "How much can you get per photo color adjustment and editing in the Photo Editing job?",
    optionsBn: ["৳৫০ - ৳১৫০", "৳১৫০ - ৳২৫০", "৳৩০০ - ৳৫৫০", "৳৬০০ - ৳৮০০"],
    optionsEn: ["৳50 - ৳150", "৳150 - ৳250", "৳300 - ৳550", "৳600 - ৳800"],
    answerIndex: 2
  },
  {
    id: 8,
    questionBn: "ভিডিও এডিটিং জবে প্রতি ক্লিপ সাজিয়ে এবং ট্রানজিশন যোগ করে কত টাকা কমিশন পাওয়া যায়?",
    questionEn: "How much commission do you get for arranging clips and adding transitions in the Video Editing job?",
    optionsBn: ["৳১০০ - ৳৩০০", "৳৩০০ - ৳৪০০", "৳৪৫০ - ৳৮০০", "৳১০০০ - ৳১৫০০"],
    optionsEn: ["৳100 - ৳300", "৳300 - ৳400", "৳450 - ৳800", "৳1000 - ৳1500"],
    answerIndex: 2
  },
  {
    id: 9,
    questionBn: "কম্পিউটার ট্রেইনিং জবে প্রতি ল্যাব সম্পন্ন করার জন্য কত টাকা commission বা কমিশন বরাদ্দ থাকে?",
    questionEn: "How much commission is allocated per completed lab in the Computer Training job?",
    optionsBn: ["৳১০০ - ৳২০০", "৳২০০ - ৳৩০০", "৳৩৫০ - ৳৬০০", "৳৭০০ - ৳১০০০"],
    optionsEn: ["৳100 - ৳200", "৳200 - ৳300", "৳350 - ৳600", "৳700 - ৳1000"],
    answerIndex: 2
  },
  {
    id: 10,
    questionBn: "অনলাইন ফরম সাবমিশন ও ডাটা এন্ট্রি কাজের প্রতি সাবমিশনে কত টাকা কমিশন পাওয়া যায়?",
    questionEn: "How much commission do you earn per submission in the Online Form Submission job?",
    optionsBn: ["৳৫০ - ৳১০০", "৳১০০ - ৳১৫০", "৳১৮০ - ৳৩০০", "৳৩৫০ - ৳৫০০"],
    optionsEn: ["৳50 - ৳100", "৳100 - ৳150", "৳180 - ৳300", "৳350 - ৳500"],
    answerIndex: 2
  },
  {
    id: 11,
    questionBn: "মিডিয়া ক্যাম্পেইন এবং রিভিউ কাজে অন্তত কত সেকেন্ড ভিডিও দেখতে হয়?",
    questionEn: "For how many seconds must you watch the video in the Media Campaign & Review job?",
    optionsBn: ["১০ সেকেন্ড", "২০ সেকেন্ড", "৩০ সেকেন্ড", "৬০ সেকেন্ড"],
    optionsEn: ["10 seconds", "20 seconds", "30 seconds", "60 seconds"],
    answerIndex: 2
  },
  {
    id: 12,
    questionBn: "টাইপিং কাজের প্রজেক্ট ভ্যালিডেশনের জন্য কমপক্ষে কত শতাংশ নির্ভুলতা প্রয়োজন?",
    questionEn: "What is the minimum accuracy rate required for the Typing Job project validation?",
    optionsBn: ["৮০%", "৮৫%", "৯০%", "৯৫%"],
    optionsEn: ["80%", "85%", "90%", "95%"],
    answerIndex: 3
  },
  {
    id: 13,
    questionBn: "বিটুবি (B2B) লিড জেনারেশন কাজে নিচের কোন তথ্যটি সংগ্রহ করা হয়?",
    questionEn: "Which of the following information is compiled in B2B Lead Generation?",
    optionsBn: ["ফেসবুক পাসওয়ার্ড", "ব্যবসায়িক ইমেল ও কন্টাক্ট ডাটা", "ব্যক্তিগত ব্যাংক অ্যাকাউন্ট নম্বর", "ক্রেডিট কার্ডের পিন নম্বর"],
    optionsEn: ["Facebook Password", "Business Email & Contact Data", "Personal Bank Account", "Credit Card Pin"],
    answerIndex: 1
  },
  {
    id: 14,
    questionBn: "ইমেইল মার্কেটিংয়ের প্রচারণার শুরুতে নিচের কোনটি ক্লিক এবং ওপেন রেট বৃদ্ধিতে সবচেয়ে বেশি সহায়তা করে?",
    questionEn: "At the start of email marketing, which of the following helps most to increase open rates?",
    optionsBn: ["বড় বডি প্যারাগ্রাফ", "আকর্ষণীয় সাবজেক্ট লাইন (Subject Line)", "ফুটার সোশ্যাল লিঙ্কস", "ইমেইলের টেক্সট কালার"],
    optionsEn: ["Long Body Paragraph", "Attractive Subject Line", "Footer Social Links", "Email Text Color"],
    answerIndex: 1
  },
  {
    id: 15,
    questionBn: "ডিজিটাল মার্কেটিং বিজ্ঞাপনে অডিয়েন্স টার্গেট করার সময় নিচের কোন বিষয়টি ফিল্টার করা হয়?",
    questionEn: "When targeting an audience in Digital Marketing, which factors are filtered?",
    optionsBn: ["গ্রাহকের উচ্চতা ও ওজন", "গ্রাহকের বয়স, লোকেশন এবং ইন্টারেস্ট (পছন্দ)", "গ্রাহকের কম্পিউটারের ব্র্যান্ড", "গ্রাহকের প্রিয় খাবারের তালিকা"],
    optionsEn: ["Height & Weight", "Age, Location, and Interests", "Computer Brand", "Favorite Foods List"],
    answerIndex: 1
  },
  {
    id: 16,
    questionBn: "এক্সেল বা স্প্রেডশিটে নির্দিস্ট সেল রেঞ্জের যোগ করার জন্য কোন ফর্মুলাটি ব্যবহার করা হয়?",
    questionEn: "Which formula is used to sum a specific cell range in Excel or Spreadsheets?",
    optionsBn: ["=ADD(A1:A5)", "=SUM(A1:A5)", "=TOTAL(A1:A5)", "=COUNT(A1:A5)"],
    optionsEn: ["=ADD(A1:A5)", "=SUM(A1:A5)", "=TOTAL(A1:A5)", "=COUNT(A1:A5)"],
    answerIndex: 1
  },
  {
    id: 17,
    questionBn: "ভিডিও এডিটিং টাইমলাইনে ক্লিপগুলোর মাঝে ফেইড (Fade) বা স্লাইড (Slide) দেওয়াকে কী বলা হয়?",
    questionEn: "What is it called when you apply a Fade or Slide effect between clips on a video editing timeline?",
    optionsBn: ["কাটিং ইফেক্ট", "মিউজিক ব্যাকগ্রাউন্ড", "ট্রানজিশন ইফেক্ট (Transition Effect)", "কালার গ্রেডিং"],
    optionsEn: ["Cutting Effect", "Music Background", "Transition Effect", "Color Grading"],
    answerIndex: 2
  },
  {
    id: 18,
    questionBn: "কম্পিউটার ট্রেইনিং ল্যাবে নতুন ডিরেক্টরি বা ফোল্ডার তৈরি করার সঠিক কমান্ড কোনটি?",
    questionEn: "What is the correct command to create a new directory or folder in the Computer Training lab?",
    optionsBn: ["cd", "dir", "mkdir", "cls"],
    optionsEn: ["cd", "dir", "mkdir", "cls"],
    answerIndex: 2
  },
  {
    id: 19,
    questionBn: "কম্পিউটার শর্টকাটে ফাইল সেভ (Save) করার স্ট্যান্ডার্ড কীবোর্ড কমান্ড কোনটি?",
    questionEn: "What is the standard keyboard shortcut to save a file in computer training?",
    optionsBn: ["Ctrl + C", "Ctrl + V", "Ctrl + Z", "Ctrl + S"],
    optionsEn: ["Ctrl + C", "Ctrl + V", "Ctrl + Z", "Ctrl + S"],
    answerIndex: 3
  },
  {
    id: 20,
    questionBn: "ফটো এডিটিং কাজে ছবির সাদা-কালো রূপ দেওয়ার জন্য কোন স্লাইডার ফিল্টারটি ১০০% করা হয়?",
    questionEn: "Which filter slider is set to 100% to turn a photo into black and white?",
    optionsBn: ["ব্রাইটনেস (Brightness)", "কন্ট্রাস্ট (Contrast)", "সেপিয়া (Sepia)", "গ্রেস্কেল (Grayscale)"],
    optionsEn: ["Brightness", "Contrast", "Sepia", "Grayscale"],
    answerIndex: 3
  },
  {
    id: 21,
    questionBn: "কীবোর্ডে কোনো টেক্সট কপি করার শর্টকাট কমান্ড কোনটি?",
    questionEn: "What is the keyboard shortcut to copy text?",
    optionsBn: ["Ctrl + P", "Ctrl + C", "Ctrl + X", "Ctrl + V"],
    optionsEn: ["Ctrl + P", "Ctrl + C", "Ctrl + X", "Ctrl + V"],
    answerIndex: 1
  },
  {
    id: 22,
    questionBn: "কীবোর্ডে কোনো কপি করা টেক্সট পেস্ট করার শর্টকাট কমান্ড কোনটি?",
    questionEn: "What is the keyboard shortcut to paste copied text?",
    optionsBn: ["Ctrl + P", "Ctrl + V", "Ctrl + Z", "Ctrl + S"],
    optionsEn: ["Ctrl + P", "Ctrl + V", "Ctrl + Z", "Ctrl + S"],
    answerIndex: 1
  },
  {
    id: 23,
    questionBn: "এসইও (SEO)-এর পূর্ণরূপ কী?",
    questionEn: "What is the full form of SEO?",
    optionsBn: ["Search Engine Optimization", "Social Engine Operation", "Secure External Online", "System Enterprise Option"],
    optionsEn: ["Search Engine Optimization", "Social Engine Operation", "Secure External Online", "System Enterprise Option"],
    answerIndex: 0
  },
  {
    id: 24,
    questionBn: "পেশাদার নেটওয়ার্কিং এবং চাকরি খোঁজার জন্য নিচের কোন সোশ্যাল মিডিয়া প্ল্যাটফর্মটি সবচেয়ে জনপ্রিয়?",
    questionEn: "Which of the following social media platforms is most popular for professional networking and job search?",
    optionsBn: ["ফেসবুক (Facebook)", "ইনস্টাগ্রাম (Instagram)", "লিঙ্কডইন (LinkedIn)", "টিকটক (TikTok)"],
    optionsEn: ["Facebook", "Instagram", "LinkedIn", "TikTok"],
    answerIndex: 2
  },
  {
    id: 25,
    questionBn: "মাইক্রোসফট এক্সেলে (Excel) যেকোনো ফর্মুলা কোন চিহ্ন দিয়ে শুরু করতে হয়?",
    questionEn: "In Microsoft Excel, any formula must start with which symbol?",
    optionsBn: ["+", "-", "@", "="],
    optionsEn: ["+", "-", "@", "="],
    answerIndex: 3
  },
  {
    id: 26,
    questionBn: "বাংলাদেশের রাজধানী নিচের কোন শহরটি?",
    questionEn: "Which of the following cities is the capital of Bangladesh?",
    optionsBn: ["চট্টগ্রাম", "ঢাকা", "সিলেট", "খুলনা"],
    optionsEn: ["Chittagong", "Dhaka", "Sylhet", "Khulna"],
    answerIndex: 1
  },
  {
    id: 27,
    questionBn: "পৃথিবীর বৃহত্তম মহাসাগরের নাম কী?",
    questionEn: "What is the name of the largest ocean in the world?",
    optionsBn: ["আটলান্টিক মহাসাগর", "ভারত মহাসাগর", "প্রশান্ত মহাসাগর", "উত্তর মহাসাগর"],
    optionsEn: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answerIndex: 2
  },
  {
    id: 28,
    questionBn: "পিডিএফ (PDF)-এর পূর্ণরূপ কী?",
    questionEn: "What is the full form of PDF?",
    optionsBn: ["Portable Document Format", "Personal Data File", "Printed Document Folder", "Public Document File"],
    optionsEn: ["Portable Document Format", "Personal Data File", "Printed Document Folder", "Public Document File"],
    answerIndex: 0
  },
  {
    id: 29,
    questionBn: "বাংলাদেশে নিচের কোনটি একটি জনপ্রিয় মোবাইল ফিনান্সিয়াল সার্ভিস বা পেমেন্ট গেটওয়ে?",
    questionEn: "Which of the following is a popular mobile financial service or payment gateway in Bangladesh?",
    optionsBn: ["পেপাল (PayPal)", "বিকাশ (bKash)", "স্ট্রাইপ (Stripe)", "উইচ্যাট পে (WeChat Pay)"],
    optionsEn: ["PayPal", "bKash", "Stripe", "WeChat Pay"],
    answerIndex: 1
  },
  {
    id: 30,
    questionBn: "গুগলের জনপ্রিয় এবং বহুল ব্যবহৃত ইমেইল সার্ভিসটির নাম কী?",
    questionEn: "What is the name of Google's popular and widely used email service?",
    optionsBn: ["আউটলুক (Outlook)", "ইয়াহু (Yahoo)", "জিবক্স (GBox)", "জিমেইল (Gmail)"],
    optionsEn: ["Outlook", "Yahoo", "GBox", "Gmail"],
    answerIndex: 3
  },
  {
    id: 31,
    questionBn: "কম্পিউটারে শেষ করা কোনো কাজ বাতিল বা আনডু (Undo) করার কীবোর্ড শর্টকাট কোনটি?",
    questionEn: "What is the keyboard shortcut to undo the last action on a computer?",
    optionsBn: ["Ctrl + Y", "Ctrl + Z", "Ctrl + U", "Ctrl + X"],
    optionsEn: ["Ctrl + Y", "Ctrl + Z", "Ctrl + U", "Ctrl + X"],
    answerIndex: 1
  },
  {
    id: 32,
    questionBn: "সাধারণত ডিজিটাল ছবির জন্য স্ট্যান্ডার্ড ফাইল ফরম্যাট কোনটি?",
    questionEn: "What is the standard file format for digital photos?",
    optionsBn: ["JPEG / JPG", "TXT", "MP3", "PDF"],
    optionsEn: ["JPEG / JPG", "TXT", "MP3", "PDF"],
    answerIndex: 0
  },
  {
    id: 33,
    questionBn: "নিচের কোনটি একটি অত্যন্ত জনপ্রিয় ইন্টারনেট ওয়েব ব্রাউজার?",
    questionEn: "Which of the following is a highly popular internet web browser?",
    optionsBn: ["গুগল ক্রোম (Google Chrome)", "অ্যাডোবি ফটোশপ (Photoshop)", "মাইক্রোসফট এক্সেলে (Excel)", "উইন্ডোজ ডিফেন্ডার"],
    optionsEn: ["Google Chrome", "Adobe Photoshop", "Microsoft Excel", "Windows Defender"],
    answerIndex: 0
  },
  {
    id: 34,
    questionBn: "র‍্যাম (RAM)-এর পূর্ণরূপ কী?",
    questionEn: "What does RAM stand for?",
    optionsBn: ["Read Access Memory", "Random Access Memory", "Real Active Memory", "Rapid Access Module"],
    optionsEn: ["Read Access Memory", "Random Access Memory", "Real Active Memory", "Rapid Access Module"],
    answerIndex: 1
  },
  {
    id: 35,
    questionBn: "বাংলাদেশের জাতীয় ফলের নাম কী?",
    questionEn: "What is the national fruit of Bangladesh?",
    optionsBn: ["আম", "কাঁঠাল", "লিচু", "কলা"],
    optionsEn: ["Mango", "Jackfruit", "Litchi", "Banana"],
    answerIndex: 1
  },
  {
    id: 36,
    questionBn: "ডকুমেন্ট লেখালেখি এবং ডিজাইন করার জন্য কোন জনপ্রিয় সফটওয়্যারটি ব্যবহৃত হয়?",
    questionEn: "Which popular software is used to write and design documents?",
    optionsBn: ["এমএস ওয়ার্ড (MS Word)", "এমএস পাওয়ারপয়েন্ট (PowerPoint)", "এমএস এক্সেস (Access)", "এমএস পেইন্ট (Paint)"],
    optionsEn: ["MS Word", "MS PowerPoint", "MS Access", "MS Paint"],
    answerIndex: 0
  },
  {
    id: 37,
    questionBn: "বাংলাদেশের সরকারি মুদ্রার নাম কী?",
    questionEn: "What is the official currency of Bangladesh?",
    optionsBn: ["টাকা (Taka)", "রুপি (Rupee)", "ডলার (Dollar)", "ইউরো (Euro)"],
    optionsEn: ["Taka", "Rupee", "Dollar", "Euro"],
    answerIndex: 0
  },
  {
    id: 38,
    questionBn: "পৃথিবীর দীর্ঘতম প্রাকৃতিক বালুকাময় সমুদ্র সৈকত কোনটি?",
    questionEn: "Which is the longest natural sandy sea beach in the world?",
    optionsBn: ["কক্সবাজার সমুদ্র সৈকত", "মিয়ামি বিচ", "পতেঙ্গা বিচ", "কুয়াকাটা বিচ"],
    optionsEn: ["Cox's Bazar Sea Beach", "Miami Beach", "Patenga Beach", "Kuakata Beach"],
    answerIndex: 0
  },
  {
    id: 39,
    questionBn: "ইউআরএল (URL)-এর পূর্ণরূপ কী?",
    questionEn: "What does URL stand for?",
    optionsBn: ["Uniform Resource Locator", "Universal Recovery Link", "Unique Registry Location", "User Resource Line"],
    optionsEn: ["Uniform Resource Locator", "Universal Recovery Link", "Unique Registry Location", "User Resource Line"],
    answerIndex: 0
  },
  {
    id: 40,
    questionBn: "কম্পিউটারের ভাষায় সিপিইউ (CPU)-কে কী বলা হয়?",
    questionEn: "In computer terminology, what is a CPU referred to as?",
    optionsBn: ["Central Processing Unit", "Computer Personal Utility", "Control Power Unit", "Core Program User"],
    optionsEn: ["Central Processing Unit", "Computer Personal Utility", "Control Power Unit", "Core Program User"],
    answerIndex: 0
  },
  {
    id: 41,
    questionBn: "পূর্বে টুইটার (Twitter) নামে পরিচিত মাইক্রো-ব্লগিং প্ল্যাটফর্মটির বর্তমান নাম কী?",
    questionEn: "What is the current name of the micro-blogging platform formerly known as Twitter?",
    optionsBn: ["X", "Facebook", "Pinterest", "Reddit"],
    optionsEn: ["X", "Facebook", "Pinterest", "Reddit"],
    answerIndex: 0
  },
  {
    id: 42,
    questionBn: "কোনো ফাইল বা ফোল্ডারের সমস্ত লেখা একসাথে সিলেক্ট করার শর্টকাট কোনটি?",
    questionEn: "What is the shortcut key to select all items in a document or folder?",
    optionsBn: ["Ctrl + A", "Ctrl + S", "Ctrl + X", "Ctrl + D"],
    optionsEn: ["Ctrl + A", "Ctrl + S", "Ctrl + X", "Ctrl + D"],
    answerIndex: 0
  },
  {
    id: 43,
    questionBn: "নিচের কোনটি বিশ্বের সবচেয়ে জনপ্রিয় এবং বহুল ব্যবহৃত ভিডিও শেয়ারিং প্ল্যাটফর্ম?",
    questionEn: "Which of the following is the world's most popular video-sharing platform?",
    optionsBn: ["ইউটিউব (YouTube)", "স্পটিফাই (Spotify)", "ওয়ার্ড (Word)", "হোয়াটসঅ্যাপ (WhatsApp)"],
    optionsEn: ["YouTube", "Spotify", "Word", "WhatsApp"],
    answerIndex: 0
  },
  {
    id: 44,
    questionBn: "নিচের কোন প্রোগ্রামিং ভাষাটিকে 'ওয়েবের ভাষা' (Language of the web) বলা হয়?",
    questionEn: "Which programming language is known as the 'language of the web'?",
    optionsBn: ["পাইথন (Python)", "জাভা (Java)", "জাভাস্ক্রিপ্ট (JavaScript)", "সি++ (C++)"],
    optionsEn: ["Python", "Java", "JavaScript", "C++"],
    answerIndex: 2
  },
  {
    id: 45,
    questionBn: "এক্সেলে গড় মান বের করার জন্য কোন ফাংশনটি ব্যবহার করা হয়?",
    questionEn: "In Excel, which function is used to find the average value of a range of cells?",
    optionsBn: ["AVERAGE", "AVG", "MEAN", "SUM"],
    optionsEn: ["AVERAGE", "AVG", "MEAN", "SUM"],
    answerIndex: 0
  },
  {
    id: 46,
    questionBn: "কম্পিউটার মাউস (Mouse) কোন ধরণের ডিভাইস?",
    questionEn: "What type of device is a computer mouse?",
    optionsBn: ["ইনপুট ডিভাইস (Input)", "আউটপুট ডিভাইস (Output)", "স্টোরেজ ডিভাইস", "পাওয়ার ডিভাইস"],
    optionsEn: ["Input device", "Output device", "Storage device", "Power device"],
    answerIndex: 0
  },
  {
    id: 47,
    questionBn: "কম্পিউটার মনিটর (Monitor) কোন ধরণের ডিভাইস?",
    questionEn: "What type of device is a computer monitor?",
    optionsBn: ["ইনপুট ডিভাইস (Input)", "আউটপুট ডিভাইস (Output)", "প্রসেসিং ডিভাইস", "মেমোরি ডিভাইস"],
    optionsEn: ["Input device", "Output device", "Processing device", "Memory device"],
    answerIndex: 1
  },
  {
    id: 48,
    questionBn: "কোনো ডকুমেন্ট প্রিন্ট (Print) করার স্ট্যান্ডার্ড শর্টকাট কী?",
    questionEn: "What is the standard keyboard shortcut to print a document?",
    optionsBn: ["Ctrl + P", "Ctrl + S", "Ctrl + Shift + P", "Ctrl + Alt + P"],
    optionsEn: ["Ctrl + P", "Ctrl + S", "Ctrl + Shift + P", "Ctrl + Alt + P"],
    answerIndex: 0
  },
  {
    id: 49,
    questionBn: "গুগল ক্রোম ব্রাউজারের ডিফল্ট সার্চ ইঞ্জিন নিচের কোনটি?",
    questionEn: "Which of the following is the default search engine of the Google Chrome web browser?",
    optionsBn: ["বিং (Bing)", "ইয়াহু (Yahoo)", "গুগল (Google)", "ডাকডাকগো (DuckDuckGo)"],
    optionsEn: ["Bing", "Yahoo", "Google", "DuckDuckGo"],
    answerIndex: 2
  },
  {
    id: 50,
    questionBn: "অনলাইনে বিশ্বজুড়ে মিটিং বা ক্লাসের জন্য বহুল ব্যবহৃত ভিডিও কনফারেন্সিং প্ল্যাটফর্ম কোনটি?",
    questionEn: "Which video conferencing platform is widely used worldwide for online meetings or classes?",
    optionsBn: ["জুম (Zoom)", "ফটোশপ (Photoshop)", "ইলাস্ট্রেটর", "এক্সেল (Excel)"],
    optionsEn: ["Zoom", "Photoshop", "Illustrator", "Excel"],
    answerIndex: 0
  }
];

export default function QuizTab({ profile, updateProfile, addLog, lang }: QuizTabProps) {
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'completed'>('playing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answersHistory, setAnswersHistory] = useState<Array<{ qIndex: number; selected: number | null; correct: boolean }>>([]);
  const [claimed, setClaimed] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restart Quiz State
  const handleStartQuiz = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(20);
    setAnswersHistory([]);
    setClaimed(false);
  };

  // Timer Effect
  useEffect(() => {
    if (gameState === 'playing' && !isAnswered) {
      setTimeLeft(20);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, gameState, isAnswered]);

  const handleTimeOut = () => {
    setSelectedOption(null);
    setIsAnswered(true);
    setAnswersHistory((prev) => [
      ...prev,
      { qIndex: currentIndex, selected: null, correct: false }
    ]);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (isAnswered || selectedOption === null) return;
    setIsAnswered(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const correct = selectedOption === QUESTIONS[currentIndex].answerIndex;
    if (correct) {
      setScore((prev) => prev + 1);
    }

    setAnswersHistory((prev) => [
      ...prev,
      { qIndex: currentIndex, selected: selectedOption, correct }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(20);
    } else {
      setGameState('completed');
    }
  };

  const getRewardAmount = () => {
    // Reward is 2 Taka per correct answer or $0.02
    return score * (lang === 'bn' ? 2 : 0.02);
  };

  const handleClaimReward = () => {
    if (claimed) return;
    const reward = score * 0.02; // Reward is calculated in standard $ currency internally for the profile model, then scaled in UI if Bengali
    updateProfile({
      balance: profile.balance + reward,
      tasksCompleted: profile.tasksCompleted + 1
    });

    addLog({
      jobId: 'quiz-competition',
      jobTitleBn: `কুইজ প্রতিযোগিতা (প্রাপ্ত নম্বর: ${score}/${QUESTIONS.length})`,
      jobTitleEn: `Quiz Competition (Score: ${score}/${QUESTIONS.length})`,
      reward: reward
    });

    setClaimed(true);
  };

  const activeQuestion = QUESTIONS[currentIndex];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER HERO CARD */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl -mr-12 -mt-12" />
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] bg-indigo-500/30 text-indigo-300 font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider border border-indigo-400/20">
              {lang === 'bn' ? 'অনলাইন প্রতিযোগিতা' : 'Online Tournament'}
            </span>
            <h2 className="text-xl font-black tracking-tight pt-1">
              {lang === 'bn' ? 'কুইজ মেগা প্রতিযোগিতা' : 'Mega Quiz Competition'}
            </h2>
            <p className="text-xs text-slate-300">
              {lang === 'bn' ? '৫০টি প্রশ্নের সঠিক উত্তর দিয়ে জিতে নিন আকর্ষণীয় প্রাইজ!' : 'Answer 50 MCQ questions to claim instant bonus!'}
            </p>
          </div>
          <Icons.Trophy className="w-12 h-12 text-amber-400 drop-shadow-[0_4px_10px_rgba(251,191,36,0.3)] shrink-0 ml-3 animate-pulse" />
        </div>
      </div>

      {/* TOURNAMENT ANNOUNCEMENT BANNER */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-500/30 rounded-2xl p-4.5 flex items-start gap-3.5 shadow-md">
        <div className="bg-amber-500/20 p-2.5 rounded-xl text-amber-700 shrink-0">
          <Icons.Trophy className="w-5.5 h-5.5 animate-bounce" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-extrabold text-amber-950 text-xs md:text-sm uppercase tracking-wider flex items-center gap-1.5">
            {lang === 'bn' ? '🏆 স্পেশাল কুইজ প্রতিযোগিতা অফার!' : '🏆 Special Quiz Competition Offer!'}
          </h4>
          <p className="text-[11px] md:text-xs text-amber-900 font-extrabold leading-relaxed">
            {lang === 'bn' 
              ? '৫০টি কুইজের এই প্রতিযোগিতায় অংশগ্রহণকারী প্রথম ১০ জন বিজয়ী সরাসরি পাবেন ১৫০ টাকা করে বোনাস!' 
              : 'The first 10 winners to successfully complete this 50-question competition will receive ৳150 bonus each!'}
          </p>
        </div>
      </div>

      {/* 1. WELCOME SCREEN */}
      {gameState === 'welcome' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          {/* Rules: super short and concise */}
          <div className="space-y-1">
            <h3 className="font-extrabold text-[#0f172a] text-xs uppercase tracking-wide flex items-center gap-1">
              <Icons.Award className="w-4 h-4 text-indigo-600" />
              {lang === 'bn' ? 'কুইজ তথ্য ও কমিশন রেট:' : 'Quiz Info & Commission Rate:'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'bn'
                ? 'কাজ, সাধারণ জ্ঞান ও আইটি বিষয়ক ৫০টি প্রশ্নের কুইজ খেলুন। প্রতি সঠিক উত্তরে পাবেন ২ টাকা বোনাস!'
                : 'Play 50 questions regarding jobs, general knowledge & IT. Earn ৳2 bonus per correct answer!'}
            </p>
          </div>

          {/* Job Commissions List directly addressing: "কোন কাজে কত টাকা এটা লিখ" */}
          <div className="bg-slate-50/60 rounded-xl p-3 border border-slate-100 space-y-2">
            <h4 className="text-[11px] font-bold text-slate-700 border-b border-slate-200/60 pb-1 flex justify-between">
              <span>{lang === 'bn' ? 'কাজের তালিকা' : 'Job Title'}</span>
              <span>{lang === 'bn' ? 'কমিশন / টাকা' : 'Commission Rate'}</span>
            </h4>
            <div className="grid grid-cols-1 divide-y divide-slate-100 text-[11px] text-slate-600">
              <div className="py-1 flex justify-between">
                <span className="font-medium">{lang === 'bn' ? '• টাইপিং জব (Typing)' : '• Typing Job'}</span>
                <span className="font-bold text-indigo-600">৳২৫০ - ৳৪০০</span>
              </div>
              <div className="py-1 flex justify-between">
                <span className="font-medium">{lang === 'bn' ? '• লিড জেনারেশন (Lead Gen)' : '• Lead Gen'}</span>
                <span className="font-bold text-indigo-600">৳৪৫০ - ৳৭০০</span>
              </div>
              <div className="py-1 flex justify-between">
                <span className="font-medium">{lang === 'bn' ? '• প্রোডাক্ট রিসেলিং (Reselling)' : '• Reselling'}</span>
                <span className="font-bold text-indigo-600">৳৪৫০ - ৳১২০০</span>
              </div>
              <div className="py-1 flex justify-between">
                <span className="font-medium">{lang === 'bn' ? '• ইমেইল MARKETING (Email)' : '• Email Marketing'}</span>
                <span className="font-bold text-indigo-600">৳৪২০ - ৳৬৫০</span>
              </div>
              <div className="py-1 flex justify-between">
                <span className="font-medium">{lang === 'bn' ? '• ডিজিটাল মার্কেটিং (Digital)' : '• Digital Marketing'}</span>
                <span className="font-bold text-indigo-600">৳৩৮০ - ৳৫৫০</span>
              </div>
              <div className="py-1 flex justify-between">
                <span className="font-medium">{lang === 'bn' ? '• ফটো এডিটিং (Photo Edit)' : '• Photo Editing'}</span>
                <span className="font-bold text-indigo-600">৳৩০০ - ৳৫৫০</span>
              </div>
              <div className="py-1 flex justify-between">
                <span className="font-medium">{lang === 'bn' ? '• ভিডিও এডিটিং (Video Edit)' : '• Video Editing'}</span>
                <span className="font-bold text-indigo-600">৳৪৫০ - ৳৮০০</span>
              </div>
              <div className="py-1 flex justify-between">
                <span className="font-medium">{lang === 'bn' ? '• কম্পিউটার ট্রেইনিং (Training)' : '• Computer Training'}</span>
                <span className="font-bold text-indigo-600">৳৩৫০ - ৳৬০০</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-xl text-xs tracking-wider transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icons.Play className="w-4 h-4 fill-white" />
            {lang === 'bn' ? 'কুইজ প্রতিযোগিতা শুরু করুন' : 'Start Quiz Competition'}
          </button>
        </div>
      )}

      {/* 2. PLAYING SCREEN */}
      {gameState === 'playing' && (
        <div className="space-y-4">
          
          <div className="bg-emerald-100 border-2 border-emerald-500 rounded-xl p-3 flex justify-center items-center shadow-sm animate-pulse">
            <span className="text-emerald-800 font-black text-sm md:text-base text-center">
              {lang === 'bn' ? 'প্রত্যেকটি সঠিক উত্তরের জন্য পাবেন ২ টাকা করে বোনাস!' : 'You will get 2 Taka bonus for each correct answer!'}
            </span>
          </div>

          {/* Progress Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 flex justify-between items-center shadow-sm">
            <span className="text-xs font-bold text-slate-500">
              {lang === 'bn' ? `প্রশ্ন: ${currentIndex + 1} / ${QUESTIONS.length}` : `Question: ${currentIndex + 1} of ${QUESTIONS.length}`}
            </span>
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-full text-xs">
              <Icons.Timer className="w-3.5 h-3.5 text-amber-600" />
              <span>{timeLeft}s</span>
            </div>
            <span className="text-xs font-bold text-indigo-600">
              {lang === 'bn' ? `স্কোর: ${score}` : `Score: ${score}`}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-relaxed">
              {lang === 'bn' ? activeQuestion.questionBn : activeQuestion.questionEn}
            </h3>

            {/* Options Grid */}
            <div className="space-y-2.5">
              {(lang === 'bn' ? activeQuestion.optionsBn : activeQuestion.optionsEn).map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === activeQuestion.answerIndex;

                let optClass = "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700";
                let icon = null;

                if (isAnswered) {
                  if (isCorrectOption) {
                    optClass = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
                    icon = <Icons.CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
                  } else if (isSelected) {
                    optClass = "border-rose-500 bg-rose-50 text-rose-800 font-bold";
                    icon = <Icons.XCircle className="w-4 h-4 text-rose-600 shrink-0" />;
                  } else {
                    optClass = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                  }
                } else if (isSelected) {
                  optClass = "border-indigo-500 bg-indigo-50 text-indigo-800 font-bold";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs flex justify-between items-center transition-all duration-200 cursor-pointer ${optClass}`}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Submit Button (Before Answered) */}
            {!isAnswered && (
              <div className="pt-2 animate-fade-in flex justify-end border-t border-slate-100 mt-4">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {lang === 'bn' ? 'উত্তর সাবমিট করুন' : 'Submit Answer'}
                  <Icons.Check className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Next Button / Feedback */}
            {isAnswered && (
              <div className="pt-2 animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 mt-4">
                <div className="text-xs">
                  {selectedOption === null ? (
                    <span className="text-amber-600 font-semibold">
                      ⚠️ {lang === 'bn' ? 'সময় শেষ হয়ে গেছে!' : 'Time is up!'}
                    </span>
                  ) : selectedOption === activeQuestion.answerIndex ? (
                    <span className="text-emerald-600 font-bold">
                      🎉 {lang === 'bn' ? 'সঠিক উত্তর! অভিনন্দন।' : 'Correct answer! Excellent.'}
                    </span>
                  ) : (
                    <span className="text-rose-600 font-semibold">
                      ❌ {lang === 'bn' ? 'ভুল উত্তর! সঠিকটি চিহ্নিত করা হলো।' : 'Incorrect answer! Correct option highlighted.'}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleNext}
                  className="bg-[#0f172a] hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer self-end"
                >
                  {currentIndex === QUESTIONS.length - 1 ? (
                    lang === 'bn' ? 'ফলাফল দেখুন' : 'View Results'
                  ) : (
                    <>
                      {lang === 'bn' ? 'পরবর্তী প্রশ্ন' : 'Next Question'}
                      <Icons.ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. COMPLETED RESULT SCREEN */}
      {gameState === 'completed' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center space-y-5">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-inner border border-amber-100">
              <Icons.Award className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-800">
                {lang === 'bn' ? 'অভিনন্দন! কুইজ সম্পন্ন হয়েছে' : 'Congratulations! Quiz Completed'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'আপনার দক্ষতা পরীক্ষা সফলভাবে শেষ হয়েছে।' : 'Your skill validation session completed successfully.'}
              </p>
            </div>

            {/* Scoreboard stats */}
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto py-3">
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">
                  {lang === 'bn' ? 'প্রাপ্ত নম্বর' : 'Final Score'}
                </span>
                <span className="text-lg font-black text-indigo-600">{score} / {QUESTIONS.length}</span>
              </div>
              <div className="bg-emerald-50/40 border border-emerald-100 p-3 rounded-xl">
                <span className="text-[10px] text-emerald-600 font-bold block uppercase tracking-wide">
                  {lang === 'bn' ? 'অর্জিত কমিশন' : 'Earnings'}
                </span>
                <span className="text-lg font-black text-emerald-600">
                  {lang === 'bn' ? `৳${getRewardAmount().toFixed(0)}` : `$${getRewardAmount().toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Claim Reward Section */}
            {!claimed ? (
              <button
                onClick={handleClaimReward}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Icons.CheckCircle2 className="w-4 h-4" />
                {lang === 'bn' ? 'ব্যালেন্স অ্যাকাউন্টে টাকা যোগ করুন' : 'Claim Reward & Add to Balance'}
              </button>
            ) : (
              <div className="bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold rounded-xl py-3 text-xs flex items-center justify-center gap-1.5">
                <Icons.CheckCircle2 className="w-4.5 h-4.5" />
                <span>
                  {lang === 'bn'
                    ? 'টাকা ব্যালেন্সে সফলভাবে যোগ করা হয়েছে!'
                    : 'Bonus credited to your account balance successfully!'}
                </span>
              </div>
            )}

            {/* Retake buttons */}
            <div className="pt-2">
              <button
                onClick={handleStartQuiz}
                className="text-slate-500 hover:text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 mx-auto py-2 hover:underline cursor-pointer"
              >
                <Icons.RotateCcw className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'আবার চেষ্টা করুন (রি-টেক)' : 'Try Again (Retake)'}
              </button>
            </div>
          </div>

          {/* Quick Quiz History Details review */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
            <h4 className="font-extrabold text-[#0f172a] text-xs uppercase tracking-wide">
              {lang === 'bn' ? 'আপনার উত্তর পর্যালোচনা:' : 'Your Answer Sheet Review:'}
            </h4>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {QUESTIONS.map((q, idx) => {
                const userAns = answersHistory[idx];
                const isCorrect = userAns?.correct;
                const userOptIndex = userAns?.selected;

                return (
                  <div key={q.id} className="p-3 border-b border-slate-100 last:border-none flex items-start gap-2.5 justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">
                        Q{q.id}.
                      </span>
                      <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                        {lang === 'bn' ? q.questionBn : q.questionEn}
                      </p>
                      <div className="text-[10px] space-y-0.5">
                        <div className="text-slate-400 font-medium">
                          {lang === 'bn' ? 'আপনার উত্তর: ' : 'Your answer: '}
                          <span className={isCorrect ? 'text-emerald-600 font-bold' : userOptIndex === null ? 'text-amber-600' : 'text-rose-600 font-bold'}>
                            {userOptIndex === null || userOptIndex === undefined
                              ? (lang === 'bn' ? 'সময় শেষ (উত্তর দেওয়া হয়নি)' : 'Timed Out')
                              : (lang === 'bn' ? q.optionsBn[userOptIndex] : q.optionsEn[userOptIndex])}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-600 font-medium">
                            {lang === 'bn' ? 'সঠিক উত্তর: ' : 'Correct answer: '}
                            <span className="font-bold">
                              {lang === 'bn' ? q.optionsBn[q.answerIndex] : q.optionsEn[q.answerIndex]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 pt-0.5">
                      {isCorrect ? (
                        <Icons.CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Icons.XCircle className="w-4 h-4 text-rose-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
