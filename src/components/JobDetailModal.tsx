import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Job, UserProfile } from '../types';
import { MicroTask, getLocalMicroTasks, saveLocalMicroTasks } from '../data/microJobs';
import { getSubTasks, productCodeEntryData, clientsData, SubTask } from '../data/jobSubtasks';
import { INITIAL_RESELLING_PRODUCTS, ResellingProduct } from '../data/resellingProducts';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
  lang: 'bn' | 'en';
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog: (log: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => void;
}

export default function JobDetailModal({
  job,
  onClose,
  lang,
  profile,
  updateProfile,
  addLog,
}: JobDetailModalProps) {
  // Common states
  const [activeTab, setActiveTab] = useState<'info' | 'practice'>('info');
  const [taskStatus, setTaskStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingSubmitLink, setEditingSubmitLink] = useState('');
  const [successEarnings, setSuccessEarnings] = useState(0);
  const [activeSubTaskId, setActiveSubTaskId] = useState<string | null>(null);

  // Code entry states
  const [codeCurrentStep, setCodeCurrentStep] = useState(0);
  const [codeInputValue, setCodeInputValue] = useState('');
  const [codeCompletedSteps, setCodeCompletedSteps] = useState<boolean[]>([false, false, false, false]);

  // Micro jobs states for Form Fillup integration
  const [modalMicroTasks, setModalMicroTasks] = useState<MicroTask[]>([]);
  const [modalSearch, setModalSearch] = useState('');
  const [modalPlatform, setModalPlatform] = useState('All');
  const [modalVisibleCount, setModalVisibleCount] = useState(5); // Show 5 by default, expandable
  const [activeMicroId, setActiveMicroId] = useState<string | null>(null);
  const [microProgress, setMicroProgress] = useState(0);

  // Load micro tasks from local storage
  useEffect(() => {
    if (job.id === 'form-fillup-work') {
      setModalMicroTasks(getLocalMicroTasks());
    }
  }, [job.id]);

  const startModalMicroTask = (task: MicroTask) => {
    if (task.completed || activeMicroId !== null) return;
    setActiveMicroId(task.id);
    setMicroProgress(0);

    const step = 100 / (task.timeSec * 10);
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += step;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setMicroProgress(100);

        // Mark as completed in state and save
        setModalMicroTasks((prev) => {
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

        // Add log
        addLog({
          jobId: task.id,
          jobTitleBn: `[মাইক্রো] ${task.titleBn}`,
          jobTitleEn: `[Micro] ${task.titleEn}`,
          reward: task.reward,
        });

        setTimeout(() => {
          setActiveMicroId(null);
          setMicroProgress(0);
        }, 1000);
      } else {
        setMicroProgress(currentProgress);
      }
    }, 100);
  };

  const modalToBnNum = (num: number | string) => {
    if (lang !== 'bn') return String(num);
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/\d/g, (d) => bnDigits[parseInt(d)]);
  };

  // --- JOB SPECIFIC PRACTICE STATES ---

  // 1. Typing Job States
  const demoTexts = {
    en: 'In modern business operations, high accuracy typing and structured transcription are core competencies. Digital databases require meticulous entry protocols to secure absolute data integrity for analytical processing pipelines across enterprise cloud nodes. Every byte of information must be verified for accuracy before it can be used for deep learning models and automated decision-making systems. Ensuring that human-generated data is clean and consistent is the first step towards building reliable artificial intelligence tools that can transform industries and improve lives globally.',
    bn: 'ডিজিটাল যুগে সঠিক উপায়ে তথ্য সংরক্ষণ এবং ডাটা টাইপিং ফ্রিল্যান্স ক্যারিয়ারের জন্য অত্যন্ত প্রয়োজনীয়। ভুলভ্রান্তি মুক্ত কাজ করার মাধ্যমে আপনি আন্তর্জাতিক ক্লায়েন্টদের মন জয় করতে পারবেন এবং প্রফেশনাল ডাটা অপারেটর হিসেবে নিজেকে প্রতিষ্ঠিত করতে সক্ষম হবেন। আধুনিক ব্যবসায়িক কার্যক্রমে টাইপিং স্পিড এবং নির্ভুলতা উভয়ই সমান গুরুত্বপূর্ণ। বড় বড় কোম্পানিগুলো তাদের ডাটাবেজ আপডেট করার জন্য দক্ষ কর্মীদের ওপর নির্ভর করে যারা দ্রুত এবং নিখুঁতভাবে তথ্য ইনপুট দিতে পারে। নিয়মিত অনুশীলনের মাধ্যমে আপনিও এই পেশায় সফল হতে পারেন।'
  };

  const getActiveTypingText = () => {
    if (activeSubTaskId === 'typing-1') {
      return {
        en: 'Property transaction records require exact ledger filing. Double-check client registry logs, parcel IDs, and escrow deposit receipts to avoid any audit flags in the central database. Maintaining a clear trail of ownership and financial obligations is paramount in the real estate sector, where even the smallest clerical error can lead to significant legal disputes and financial losses for all parties involved. Every document must be scanned and indexed with high precision to facilitate quick retrieval during regulatory inspections or internal audits.',
        bn: 'প্রপার্টি ট্রানজ্যাকশন সংক্রান্ত তথ্য নির্ভুলভাবে সংরক্ষণ করা অত্যন্ত জরুরি। ভুলভ্রান্তিমুক্ত অ্যাকাউন্ট ফাইল বা জমির রেকর্ড এন্ট্রি করার মাধ্যমে প্রজেক্টের সফল অনুমোদন নিশ্চিত করুন। রিয়েল এস্টেট খাতে মালিকানা এবং আর্থিক বাধ্যবাধকতার একটি স্পষ্ট রেকর্ড রাখা অত্যন্ত গুরুত্বপূর্ণ, যেখানে একটি ছোটখাটো ভুলও বড় ধরনের আইনি জটিলতা এবং আর্থিক ক্ষতির কারণ হতে পারে। প্রতিটি নথি অত্যন্ত নিখুঁতভাবে স্ক্যান এবং ইনডেক্স করা উচিত যাতে প্রয়োজনে দ্রুত তথ্য খুঁজে পাওয়া যায় এবং প্রজেক্টের স্বচ্ছতা বজায় থাকে।'
      };
    } else if (activeSubTaskId === 'typing-2') {
      return {
        en: 'Commercial corporate directories facilitate global vendor communications. Keep records of enterprise tax identifiers, CEO signatures, and business license registration stamps clean and error-free. As companies expand into international markets, the need for standardized and verified corporate information becomes increasingly critical. Data operators must ensure that all contact details and operational parameters are updated in real-time to prevent supply chain disruptions and maintain seamless business-to-business interactions across different time zones and jurisdictions.',
        bn: 'করপোরেট ডিরেক্টরিগুলি বিভিন্ন কোম্পানির মধ্যকার যোগাযোগ সহজ করতে সাহায্য করে। এই কাজের জন্য লাইসেন্স নাম্বার এবং ট্যাক্স ফাইল সংক্রান্ত বিবরণ নিখুঁতভাবে টাইপ করা আবশ্যক। যখন কোম্পানিগুলি আন্তর্জাতিক বাজারে তাদের বিস্তার ঘটায়, তখন তাদের তথ্যের নির্ভুলতা এবং নির্ভরযোগ্যতা আরও গুরুত্বপূর্ণ হয়ে ওঠে। ডাটা অপারেটরদের অবশ্যই নিশ্চিত করতে হবে যে সমস্ত যোগাযোগের তথ্য এবং ব্যবসায়িক লাইসেন্স নিয়মিত আপডেট করা হচ্ছে যাতে সাপ্লাই চেইনে কোনো সমস্যা না হয় এবং ব্যবসায়িক কার্যক্রম নিরবচ্ছিন্নভাবে চলতে পারে।'
      };
    } else if (activeSubTaskId === 'typing-3') {
      return {
        en: 'E-commerce product listings demand detailed description cataloging. Track SKU codes, merchant stock statuses, pricing spreadsheets, and buyer checkout cart logs accurately. In the fast-paced world of online retail, customer satisfaction depends heavily on the accuracy of product information provided on the storefront. Incorrect pricing or misleading stock levels can lead to order cancellations and negative user reviews. Meticulous data entry ensures that the digital inventory reflects the physical stock, providing a trustworthy shopping experience for millions of users worldwide.',
        bn: 'ই-কমার্স প্রোডাক্ট লিস্টিং এর ক্ষেত্রে ক্যাটাগরি এবং স্টকের সঠিক হিসাব রাখা জরুরি। ডেসক্রিপশন এবং পণ্যের বিবরণ সঠিকভাবে টাইপ করে মার্চেন্টদের ইনভেন্টরি ক্লিয়ার করুন। অনলাইন কেনাকাটার এই দ্রুতগতির যুগে গ্রাহকের সন্তুষ্টি নির্ভর করে আপনি কত নিখুঁতভাবে পণ্যের তথ্য উপস্থাপন করছেন তার ওপর। ভুল মূল্য বা ভুল স্টকের তথ্য গ্রাহককে বিভ্রান্ত করতে পারে এবং অর্ডার বাতিলের কারণ হতে পারে। সঠিক ডাটা এন্ট্রি নিশ্চিত করে যে ডিজিটাল ইনভেন্টরি এবং আসল স্টক একই আছে, যা ক্রেতাদের জন্য একটি বিশ্বস্ত প্ল্যাটফর্ম তৈরি করতে সাহায্য করে।'
      };
    }
    return demoTexts;
  };

  const [typedText, setTypedText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [typingStarted, setTypingStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // 2. Email Marketing States
  const [emailEntries, setEmailEntries] = useState(Array(10).fill({ account: '', password: '' }));

  // 3. Facebook Marketing States
  const [fbCaption, setFbCaption] = useState('');
  const [fbAudience, setFbAudience] = useState('tech');
  const [fbBudget, setFbBudget] = useState('100');
  const [fbAdStats, setFbAdStats] = useState<{ reach: number; clicks: number; costPerClick: string } | null>(null);

  // 4. Lead Gen States
  const [leadIndustry, setLeadIndustry] = useState('software');
  const [leadLocation, setLeadLocation] = useState('usa');
  const [leadCount, setLeadCount] = useState(2);
  const [extractedLeads, setExtractedLeads] = useState<Array<{ name: string; email: string; company: string; verified: boolean }> | null>(null);

  // 5. Form Fillup States
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);
  const [formName, setFormName] = useState('');
  const [formFather, setFormFather] = useState('');
  const [formMother, setFormMother] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formGender, setFormGender] = useState('পুরুষ');
  const [formDob, setFormDob] = useState('');
  const [formNid, setFormNid] = useState('');
  const [formBlood, setFormBlood] = useState('O+');
  const [formDivision, setFormDivision] = useState('');
  const [formDistrict, setFormDistrict] = useState('');
  const [formThana, setFormThana] = useState('');
  const [formPost, setFormPost] = useState('');
  const [formPostcode, setFormPostcode] = useState('');
  const [formVillage, setFormVillage] = useState('');
  const [formEducation, setFormEducation] = useState('মাধ্যমিক');
  const [formOccupation, setFormOccupation] = useState('');
  const [formIncome, setFormIncome] = useState('');
  const [formMarital, setFormMarital] = useState('অবিবাহিত');
  const [formEmergency, setFormEmergency] = useState('');
  const [formNominee, setFormNominee] = useState('');
  const [formNomineeRelation, setFormNomineeRelation] = useState('');
  const [formTerms, setFormTerms] = useState(false);

  // We still provide rawFormSource / getFormSource mock returns to avoid syntax errors if referenced elsewhere
  const rawFormSource = {
    name: 'তানভীর আহমেদ (Tanvir Ahmed)',
    email: 'tanvir.dev@gmail.com',
    phone: '01893-294321',
    address: 'সেক্টর ৪, উত্তরা, ঢাকা',
    country: 'Bangladesh'
  };
  const getFormSource = () => {
    return rawFormSource;
  };

  // 6. Data Entry States (Spreadsheet Inventory with 100 Clients list)
  const [dummyRefresh, setDummyRefresh] = useState(0);
  const [clientsData, setClientsData] = useState(() => {
    const names = [
      'সাকিব হাসান', 'মোসাম্মাৎ তানিয়া', 'মো: আব্দুর রহমান', 'রাফসান আহমেদ', 'কানিজ ফাতেমা',
      'নাসরিন সুলতানা', 'আসিফ মাহমুদ', 'মেহেদী হাসান', 'জান্নাতুল ফেরদৌস', 'রাইহান চৌধুরী',
      'ফারহানা আক্তার', 'মো: রুবেল মিয়া', 'শরিফুল ইসলাম', 'মোসাম্মাৎ আকলিমা', 'কামরুল হাসান',
      'নাজমুল হুদা', 'তসলিমা আক্তার', 'আতিকুর রহমান', 'জেসমিন আক্তার', 'মো: জাহিদুল ইসলাম',
      'সুমন মিয়া', 'ফাতেমা বেগম', 'মাসুদ রানা', 'সালমা আক্তার', 'সজীব আহমেদ',
      'খাদিজা আক্তার', 'তারেক রহমান', 'পারভীন আক্তার', 'মো: এমরান হোসেন', 'শাহনাজ পারভীন',
      'মামুনুর রশীদ', 'লাকী আক্তার', 'রাসেল আহমেদ', 'রুমা আক্তার', 'জাকির হোসেন',
      'মর্জিনা বেগম', 'মো: আরিফুল ইসলাম', 'হোসনে আরা বেগম', 'ইমরান খান', 'শাহীন আলম',
      'সাদিয়া আফরিন', 'রাশেদুল ইসলাম', 'মঞ্জুয়ারা বেগম', 'আজহারুল ইসলাম', 'রোজী আক্তার',
      'মো: আল-আমিন', 'রেশমা আক্তার', 'মনোয়ার হোসেন', 'লিমা আক্তার', 'মো: বেল্লাল হোসেন'
    ];
    const divisions = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];
    const services = [
      { code: 'D-101', name: 'ফেসবুক পেজ অ্যাড সেটআপ' },
      { code: 'D-102', name: 'লোগো ডিজাইন আর্টওয়ার্ক' },
      { code: 'D-103', name: 'কন্টেন্ট রাইটিং ব্লগপোস্ট' },
      { code: 'D-104', name: 'ইউটিউব ভিডিও থাম্বনেইল' },
      { code: 'D-105', name: 'ইনস্টাগ্রাম পোস্ট বুস্টিং' }
    ];

    const list = [];
    for (let i = 1; i <= 100; i++) {
      const nameIndex = (i - 1) % names.length;
      const name = `${names[nameIndex]} (${1000 + i})`;
      const uid = `UID-2026-${2500 + i}`;
      const phone = `01712-${String(100000 + i).slice(1)}`;
      const division = divisions[i % divisions.length];
      
      const clientGrid = [];
      for (let j = 0; j < 20; j++) {
        const s = services[(i + j) % services.length];
        clientGrid.push({
          code: `${s.code}-${100 + j}`,
          name: s.name,
          price: 150 + (i * 2 + j * 5) % 350,
          qty: 1 + ((i + j) % 3),
          total: 0
        });
      }

      clientGrid.forEach(item => {
        item.total = item.price * item.qty;
      });

      list.push({
        uid,
        name,
        phone,
        gender: i % 2 === 0 ? 'পুরুষ' : 'মহিলা',
        division,
        grid: clientGrid,
        submitted: false,
        reportLink: ''
      });
    }
    return list;
  });

  const [gridData, setGridData] = useState([
    { code: 'A101', name: 'Smart Mouse', price: 15, qty: 5, total: 0 },
    { code: 'B204', name: 'USB Hub 4-Port', price: 12, qty: 10, total: 0 },
    { code: 'C309', name: 'Laptop Stand', price: 25, qty: 4, total: 0 },
  ]);

  const [reportLinkInput, setReportLinkInput] = useState('');

  useEffect(() => {
    if (clientsData[selectedClientIndex]) {
      setGridData(JSON.parse(JSON.stringify(clientsData[selectedClientIndex].grid)));
    }
  }, [selectedClientIndex, clientsData]);

  const getGridData = () => {
    if (activeSubTaskId === 'data-1') {
      return [
        { code: 'H201', name: 'Steel Screws M8', price: 8, qty: 50, total: 0 },
        { code: 'H305', name: 'Heavy Duty Drill', price: 85, qty: 3, total: 0 },
        { code: 'H402', name: 'Adjustable Wrench', price: 18, qty: 10, total: 0 },
      ];
    } else if (activeSubTaskId === 'data-2') {
      return [
        { code: 'O110', name: 'Printer Ink Cartridge', price: 45, qty: 4, total: 0 },
        { code: 'O231', name: 'Ergonomic Desk Chair', price: 120, qty: 2, total: 0 },
        { code: 'O302', name: 'A4 Paper Ream Box', price: 28, qty: 5, total: 0 },
      ];
    } else if (activeSubTaskId === 'data-3') {
      return [
        { code: 'I551', name: 'Custom Website Setup', price: 150, qty: 1, total: 0 },
        { code: 'I552', name: 'Consulting Session Hour', price: 75, qty: 3, total: 0 },
        { code: 'I553', name: 'Premium Theme Asset', price: 45, qty: 2, total: 0 },
      ];
    }
    return [
      { code: 'A101', name: 'Smart Mouse', price: 15, qty: 5, total: 0 },
      { code: 'B204', name: 'USB Hub 4-Port', price: 12, qty: 10, total: 0 },
      { code: 'C309', name: 'Laptop Stand', price: 25, qty: 4, total: 0 },
    ];
  };

  // 7. Video Review States
  const [videoRating, setVideoRating] = useState(5);
  const [videoFeedback, setVideoFeedback] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://youtu.be/8BDa9vuxjdE?si=wlk75FhBqmMPrNAm');

  const getVideoDetails = () => {
    if (activeSubTaskId === 'video-1') return { title: 'SaaS Walkthrough Guide & Setup.mp4', url: 'https://youtu.be/8BDa9vuxjdE?si=wlk75FhBqmMPrNAm' };
    if (activeSubTaskId === 'video-2') return { title: 'Corporate Brand Presentation.mp4', url: 'https://youtu.be/8BDa9vuxjdE?si=wlk75FhBqmMPrNAm' };
    if (activeSubTaskId === 'video-3') return { title: 'Unboxing Wireless Charging Hub.mp4', url: 'https://youtu.be/8BDa9vuxjdE?si=wlk75FhBqmMPrNAm' };
    return { title: 'Unity Earning - Job Presentation Class #1', url: 'https://youtu.be/8BDa9vuxjdE?si=wlk75FhBqmMPrNAm' };
  };

  // 8. Product Reselling States
  const [resellingProducts, setResellingProducts] = useState<ResellingProduct[]>(() => {
    const cached = localStorage.getItem('ue_reselling_products_list');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.length > 0 && parsed[0].operator) return parsed;
      } catch (e) {}
    }
    return INITIAL_RESELLING_PRODUCTS;
  });

  const handleTerminalCommand = (cmdInput: string) => {
    const cmd = cmdInput.trim();
    if (!cmd) return;

    const updatedHistory = [...compCommandHistory, cmd];
    setCompCommandHistory(updatedHistory);

    let response = '';
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'mkdir workspace') {
      response = lang === 'bn'
        ? `C:\\Users\\Administrator> mkdir workspace\nডিরেক্টরি 'C:\\Users\\Administrator\\workspace' সফলভাবে তৈরি করা হয়েছে।`
        : `C:\\Users\\Administrator> mkdir workspace\nDirectory 'C:\\Users\\Administrator\\workspace' created successfully.`;
    } else if (lowerCmd === 'cd workspace') {
      response = lang === 'bn'
        ? `C:\\Users\\Administrator> cd workspace\nডিরেক্টরি পরিবর্তন করা হয়েছে: C:\\Users\\Administrator\\workspace>`
        : `C:\\Users\\Administrator> cd workspace\nDirectory changed to: C:\\Users\\Administrator\\workspace>`;
    } else if (lowerCmd === 'npm init' || lowerCmd === 'npm run build' || lowerCmd === 'npm init -y' || lowerCmd === 'npm install') {
      response = lang === 'bn'
        ? `C:\\Users\\Administrator\\workspace> ${cmd}\nপ্রজেক্ট মডিউল আরম্ভ করা হচ্ছে... package.json সফলভাবে সংকলিত হয়েছে।\nঅভিনন্দন! আপনার ল্যাব শেষ হয়েছে, সাবমিট করতে পারেন!`
        : `C:\\Users\\Administrator\\workspace> ${cmd}\nProject modules initialized... package.json successfully compiled.\nSuccess! Your lab is complete. You can now submit the task!`;
    } else {
      response = lang === 'bn'
        ? `C:\\Users\\Administrator> ${cmd}\n'${cmd}' কমান্ডটি সিস্টেম দ্বারা স্বীকৃত নয়। অনুগ্রহ করে প্রজেক্ট গাইডের নির্দেশনা মেনে কমান্ড দিন।`
        : `C:\\Users\\Administrator> ${cmd}\nCommand '${cmd}' not recognized as an operable program. Please check prompt instructions.`;
    }

    setCompTerminalOutput([...compTerminalOutput, response]);
    setCompCurrentCommand('');
  };

  useEffect(() => {
    localStorage.setItem('ue_reselling_products_list', JSON.stringify(resellingProducts));
  }, [resellingProducts]);

  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [generatedLink, setGeneratedLink] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');

  // Custom product state variables
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProdNameBn, setNewProdNameBn] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdLink, setNewProdLink] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdOperator, setNewProdOperator] = useState('GP');
  const [productSearch, setProductSearch] = useState('');

  // 9. Photo Editing States
  const [photoBrightness, setPhotoBrightness] = useState(100);
  const [photoContrast, setPhotoContrast] = useState(100);
  const [photoSaturation, setPhotoSaturation] = useState(100);
  const [photoGrayscale, setPhotoGrayscale] = useState(0);
  const [photoSepia, setPhotoSepia] = useState(0);

  // 10. Video Editing States
  const [videoTracks, setVideoTracks] = useState<Array<{ id: string; titleBn: string; titleEn: string; duration: number }>>([]);
  const [selectedTransition, setSelectedTransition] = useState('fade');
  const [videoEditPlaybackActive, setVideoEditPlaybackActive] = useState(false);
  const [videoEditProgress, setVideoEditProgress] = useState(0);

  // 11. Computer Training States
  const [compCommandHistory, setCompCommandHistory] = useState<string[]>([]);
  const [compCurrentCommand, setCompCurrentCommand] = useState('');
  const [compActiveShortcutIndex, setCompActiveShortcutIndex] = useState(0);
  const [compSpreadsheetFormulas, setCompSpreadsheetFormulas] = useState<Record<string, string>>({
    formula1: '',
    formula2: ''
  });
  const [compTerminalOutput, setCompTerminalOutput] = useState<string[]>([]);

  // Related Subtasks Configuration
  const subTasks = getSubTasks(job.id);
  const activeSubTask = subTasks.find(st => st.id === activeSubTaskId);

  useEffect(() => {
    if (!activeSubTaskId) {
      setTypedText('');
      setWpm(0);
      setAccuracy(100);
      setTypingStarted(false);
      setStartTime(null);
      setEmailEntries(Array(10).fill({ account: '', password: '' }));
      setFbCaption('');
      setExtractedLeads(null);
      setBuyerName('');
      setBuyerAddress('');
      setErrorMessage('');
      setTaskStatus('idle');
      setPhotoBrightness(100);
      setPhotoContrast(100);
      setPhotoSaturation(100);
      setPhotoGrayscale(0);
      setPhotoSepia(0);
      setVideoTracks([]);
      setSelectedTransition('fade');
      setVideoEditPlaybackActive(false);
      setVideoEditProgress(0);
      setCompCommandHistory([]);
      setCompCurrentCommand('');
      setCompTerminalOutput([]);
      setCompActiveShortcutIndex(0);
      setCompSpreadsheetFormulas({ formula1: '', formula2: '' });
      return;
    }

    if (activeSubTaskId.startsWith('typing-')) {
      setTypedText('');
    } else if (activeSubTaskId.startsWith('email-')) {
      setEmailEntries(Array(10).fill({ account: '', password: '' }));
    } else if (activeSubTaskId.startsWith('fb-')) {
      const subObj = subTasks.find(s => s.id === activeSubTaskId);
      setFbCaption(subObj ? (lang === 'bn' ? `${subObj.titleBn} - স্পেশাল প্রমোশন কপি` : `${subObj.titleEn} - Official Campaign Pitch`) : '');
    } else if (activeSubTaskId.startsWith('lead-')) {
      if (activeSubTaskId === 'lead-1') {
        setLeadIndustry('software');
        setLeadLocation('usa');
      } else if (activeSubTaskId === 'lead-2') {
        setLeadIndustry('real-estate');
        setLeadLocation('uk');
      } else if (activeSubTaskId === 'lead-3') {
        setLeadIndustry('retail');
        setLeadLocation('dubai');
      }
    } else if (activeSubTaskId.startsWith('form-')) {
      setSelectedClientIndex(0);
      setFormName('');
      setFormFather('');
      setFormMother('');
      setFormPhone('');
      setFormEmail('');
      setFormGender('পুরুষ');
      setFormDob('');
      setFormNid('');
      setFormBlood('O+');
      setFormDivision('');
      setFormDistrict('');
      setFormThana('');
      setFormPost('');
      setFormPostcode('');
      setFormVillage('');
      setFormEducation('মাধ্যমিক');
      setFormOccupation('');
      setFormIncome('');
      setFormMarital('অবিবাহিত');
      setFormEmergency('');
      setFormNominee('');
      setFormNomineeRelation('');
      setFormTerms(false);
    } else if (activeSubTaskId.startsWith('data-')) {
      setGridData(getGridData());
    } else if (activeSubTaskId.startsWith('video-')) {
      const vid = getVideoDetails();
      setVideoUrl(vid.url);
      setVideoFeedback('');
    } else if (activeSubTaskId.startsWith('sell-')) {
      if (activeSubTaskId === 'sell-1') setSelectedProductIndex(0);
      else if (activeSubTaskId === 'sell-2') setSelectedProductIndex(1);
      else if (activeSubTaskId === 'sell-3') setSelectedProductIndex(2);
      setGeneratedLink('');
    } else if (activeSubTaskId.startsWith('photo-')) {
      setPhotoBrightness(100);
      setPhotoContrast(100);
      setPhotoSaturation(100);
      setPhotoGrayscale(0);
      setPhotoSepia(0);
      setTaskStatus('idle');
      setErrorMessage('');
    } else if (activeSubTaskId.startsWith('video-edit-')) {
      if (activeSubTaskId === 'video-edit-1') {
        setVideoTracks([
          { id: 'track-1', titleBn: '১. ইন্ট্রো হুক ক্লিপ', titleEn: '1. Intro Hook Clip', duration: 12 },
          { id: 'track-2', titleBn: '২. কাস্টমার ক্লোজআপস', titleEn: '2. Product Closeups', duration: 18 },
          { id: 'track-3', titleBn: '৩. এফিলিয়েট আউটরো লোগো', titleEn: '3. Affiliate Outro Logo', duration: 10 }
        ]);
      } else if (activeSubTaskId === 'video-edit-2') {
        setVideoTracks([
          { id: 'track-1', titleBn: '১. কোম্পানি ইন্ট্রো', titleEn: '1. Company Overview', duration: 20 },
          { id: 'track-2', titleBn: '২. ড্যাশবোর্ড স্ক্রিন রেকর্ডিং', titleEn: '2. SaaS Dashboard Tutorial', duration: 30 },
          { id: 'track-3', titleBn: '৩. প্রাইসিং এবং প্রমো অফার', titleEn: '3. Pricing Offer', duration: 15 },
          { id: 'track-4', titleBn: '৪. ফাইনাল কল টু অ্যাকশন', titleEn: '4. Call to Action', duration: 8 }
        ]);
      } else if (activeSubTaskId === 'video-edit-3') {
        setVideoTracks([
          { id: 'track-1', titleBn: '১. ইনফ্লুয়েন্সার সেলফি ভিডিও', titleEn: '1. Influencer Review', duration: 25 },
          { id: 'track-2', titleBn: '২. সিনেম্যাটিক প্রোডাক্ট বি-রোল', titleEn: '2. B-Roll Aesthetics', duration: 15 },
          { id: 'track-3', titleBn: '৩. ডিসকাউন্ট কোড অ্যান্ড লোগো', titleEn: '3. Discount Code Outro', duration: 12 }
        ]);
      }
      setSelectedTransition('fade');
      setVideoEditPlaybackActive(false);
      setVideoEditProgress(0);
      setTaskStatus('idle');
      setErrorMessage('');
    } else if (activeSubTaskId.startsWith('comp-')) {
      setCompCommandHistory([]);
      setCompCurrentCommand('');
      setCompActiveShortcutIndex(0);
      setCompSpreadsheetFormulas({ formula1: '', formula2: '' });
      setTaskStatus('idle');
      setErrorMessage('');
      if (activeSubTaskId === 'comp-1') {
        setCompTerminalOutput([
          lang === 'bn'
            ? 'ভার্চুয়াল উইন্ডোজ পাওয়ারশেল কনসোল [সংস্করণ ১০.০.২২৬২১]'
            : 'Virtual Windows PowerShell Console [Version 10.0.22621]',
          lang === 'bn'
            ? 'ডিফোল্ট ডিরেক্টরি: C:\\Users\\Administrator>'
            : 'Default directory: C:\\Users\\Administrator>',
          lang === 'bn'
            ? 'টাস্ক নির্দেশনা: নতুন ফোল্ডার তৈরি করুন (`mkdir workspace`), ভিতরে ঢুকুন (`cd workspace`), এবং প্রজেক্ট ফাইল শুরু করুন (`npm init`).'
            : 'Task instructions: Create directory (`mkdir workspace`), navigate inside (`cd workspace`), and initialize code (`npm init`).'
        ]);
      } else if (activeSubTaskId === 'comp-2') {
        setCompTerminalOutput([
          lang === 'bn'
            ? 'ভার্চুয়াল এক্সেল ল্যাব মডিউল ৩ সক্রিয় করা হয়েছে।'
            : 'Virtual Excel Lab Module 3 activated.',
          lang === 'bn'
            ? 'একটি কর্পোরেট আর্থিক স্প্রেডশিট লোড হয়েছে। সেলস রেঞ্জ A1 থেকে A5 পর্যন্ত।'
            : 'A corporate financial spreadsheet has been loaded. Sales ranges are from cell A1 to A5.'
        ]);
      } else if (activeSubTaskId === 'comp-3') {
        setCompTerminalOutput([
          lang === 'bn'
            ? 'শর্টকাট কী মাস্টারি টেস্ট ১ চালু হয়েছে।'
            : 'Shortcut Key Mastery Test 1 loaded.',
          lang === 'bn'
            ? 'আপনাকে মোট ৪টি রিয়েল-টাইম আইটি ডেস্কে সঠিক শর্টকাট কী চিহ্নিত করতে হবে।'
            : 'Identify the correct shortcut combination for 4 operational office desk prompts.'
        ]);
      }
    }
  }, [activeSubTaskId, lang]);

  // --- LOGIC IMPLEMENTATIONS ---

  // Typing Job Speed & Accuracy Calculations
  useEffect(() => {
    if (job.id !== 'typing-job' || typedText.length === 0) return;

    if (!typingStarted) {
      setTypingStarted(true);
      setStartTime(Date.now());
    }

    const targetText = lang === 'bn' ? getActiveTypingText().bn : getActiveTypingText().en;
    let correctChars = 0;
    const typedChars = typedText.split('');

    typedChars.forEach((char, i) => {
      if (char === targetText[i]) {
        correctChars++;
      }
    });

    const calculatedAccuracy = typedText.length > 0
      ? Math.round((correctChars / typedText.length) * 100)
      : 100;

    setAccuracy(calculatedAccuracy);

    if (startTime) {
      const timeElapsedMins = (Date.now() - startTime) / 60000;
      if (timeElapsedMins > 0) {
        const wordsTyped = typedText.length / 5;
        setWpm(Math.round(wordsTyped / timeElapsedMins));
      }
    }
  }, [typedText]);

  // Handle Typing Submission
  const handleTypingSubmit = () => {
    const targetText = lang === 'bn' ? getActiveTypingText().bn : getActiveTypingText().en;
    if (typedText.length < targetText.length * 0.7) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে প্যারাগ্রাফের অন্তত ৭০% টাইপ করুন!' : 'Please type at least 70% of the text snippet!');
      return;
    }
    if (accuracy < 92) {
      setErrorMessage(lang === 'bn' ? 'আপনার একুরেসি অনেক কম (কমপক্ষে ৯২% প্রয়োজন)। পুনরায় চেষ্টা করুন!' : 'Your accuracy is too low (minimum 92% required). Check spelling and retry!');
      return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      const reward = activeSubTask ? activeSubTask.rewardNum : 2.50;
      setSuccessEarnings(reward);
      setTaskStatus('success');

      // Update Profile Balance
      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      // Add to Task Logs with specific sub-task title
      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 1500);
  };

  // Handle Email Marketing Campaign Submission
  const handleEmailSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate all entries
    for (const entry of emailEntries) {
      if (entry.account.trim() && !emailRegex.test(entry.account.trim())) {
         setErrorMessage(lang === 'bn' ? 'দয়া করে একটি সঠিক সচল ইমেইল অ্যাড্রেস লিখুন!' : 'Please enter a valid active email address!');
         return;
      }
      if (entry.account.trim() && (!entry.password.trim() || entry.password.trim().length < 4)) {
         setErrorMessage(lang === 'bn' ? 'দয়া করে ইমেইলের সঠিক পাসওয়ার্ডটি টাইপ করুন (কমপক্ষে ৪ অক্ষর)!' : 'Please enter the correct password (at least 4 characters)!');
         return;
      }
    }
    
    // Check if at least one is entered
    if (emailEntries.every(e => !e.account.trim())) {
        setErrorMessage(lang === 'bn' ? 'দয়া করে কমপক্ষে একটি ইমেইল আইডি লিখুন!' : 'Please enter at least one email address!');
        return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      const reward = activeSubTask ? activeSubTask.rewardNum : 0.20;
      setSuccessEarnings(reward);
      setTaskStatus('success');

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 2000);
  };

  // Handle FB Ad Submission
  const handleFbAdSubmit = () => {
    if (!fbCaption.trim() || fbCaption.length < 15) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে একটি আকর্ষণীয় পোস্ট ক্যাপশন লিখুন (কমপক্ষে ১৫ অক্ষর)!' : 'Please write an engaging post caption (at least 15 characters)!');
      return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      const budgetNum = parseInt(fbBudget) || 100;
      const reach = budgetNum * 250 + Math.floor(Math.random() * 1000);
      const clicks = Math.floor(reach * (Math.random() * 0.05 + 0.03));
      setFbAdStats({
        reach,
        clicks,
        costPerClick: `$${(budgetNum / clicks).toFixed(2)}`
      });

      const reward = activeSubTask ? activeSubTask.rewardNum : 3.80;
      setSuccessEarnings(reward);
      setTaskStatus('success');

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 2000);
  };

  // Handle Lead Generation Simulation
  const handleLeadGenSearch = () => {
    setTaskStatus('running');
    setErrorMessage('');

    setTimeout(() => {
      // Create some verified B2B leads dynamically
      const names = ['John Doe', 'Sajid Islam', 'Emily Watson', 'Rahim Uddin', 'Maria Santos', 'Alex Brown', 'Sarah Lee', 'Omar Faruk', 'Elena Petrova', 'David Miller'];
      const companies = ['Software Tech Inc.', 'Dhaka Digital Agency', 'HealthLink Care', 'Bangla Housing Ltd.', 'GrowLeads International', 'Global Solutions', 'Meta Systems', 'Fast Track Ltd.', 'Zenith Corp', 'Apex Group'];
      
      const dummyLeads = [];
      for (let i = 0; i < leadCount; i++) {
        const name = names[i % names.length];
        const company = companies[i % companies.length];
        const email = `${name.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(' ', '').replace('.', '')}.com`;
        dummyLeads.push({ name, email, company, verified: true });
      }

      setExtractedLeads(dummyLeads);
      setTaskStatus('idle');
    }, 1500);
  };

  const handleLeadGenSubmit = () => {
    if (!extractedLeads) return;
    setTaskStatus('running');

    setTimeout(() => {
      // 130 Taka per lead. Let's assume 1 USD = 100 Taka for simplicity in rewardNum
      const reward = leadCount * 1.30; 
      setSuccessEarnings(reward);
      setTaskStatus('success');

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 1200);
  };

  // Handle Form Fillup Verification
  const handleFormSubmit = () => {
    if (!formName.trim()) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে পূর্ণ নাম লিখুন!' : 'Please enter full name!');
      return;
    }
    if (!formPhone.trim() || formPhone.trim().length < 11) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে ১১ ডিজিটের সঠিক মোবাইল নম্বরটি লিখুন!' : 'Please enter a valid 11-digit phone number!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formEmail.trim() || !emailRegex.test(formEmail.trim())) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে একটি সঠিক ইমেইল এড্রেস লিখুন!' : 'Please enter a valid email address!');
      return;
    }
    if (!formFather.trim()) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে পিতার নাম লিখুন!' : 'Please enter father\'s name!');
      return;
    }
    if (!formMother.trim()) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে মাতার নাম লিখুন!' : 'Please enter mother\'s name!');
      return;
    }
    if (!formNid.trim() || formNid.trim().length < 10) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে ১০ ডিজিটের সঠিক NID নম্বরটি লিখুন!' : 'Please enter a valid 10-digit NID number!');
      return;
    }
    if (!formVillage.trim()) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে গ্রাম বা রাস্তার নাম লিখুন!' : 'Please enter village or road details!');
      return;
    }
    if (!formTerms) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে ডিক্লারেশন এবং শর্তাবলী চেক করুন!' : 'Please check the declaration terms checkbox!');
      return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      const reward = activeSubTask ? activeSubTask.rewardNum : 2.00;
      setSuccessEarnings(reward);
      setTaskStatus('success');

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 1500);
  };

  // Handle Excel Sheet Calculations & Submit
  const updateGridValue = (index: number, field: 'price' | 'qty', value: string) => {
    const parsedVal = parseFloat(value) || 0;
    const nextGrid = [...gridData];
    nextGrid[index][field] = parsedVal;
    nextGrid[index].total = nextGrid[index].price * nextGrid[index].qty;
    setGridData(nextGrid);
  };

  const handleGridSubmit = () => {
    // Make sure no totals are 0
    const hasZero = gridData.some(item => item.total === 0);
    if (hasZero) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে সবগুলো কলামে শূন্যের চেয়ে বড় ভ্যালু দিন এবং হিসেব চেক করুন!' : 'Please ensure price and quantity values are greater than zero!');
      return;
    }

    if (!reportLinkInput || !reportLinkInput.startsWith('http')) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে একটি সঠিক রিপোর্ট ড্রাইভ বা ডকুমেন্ট লিঙ্ক সাবমিট করুন!' : 'Please provide a valid report drive or document link!');
      return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      // High reward: random between 70 and 200
      const minReward = 70;
      const maxReward = 200;
      const reward = Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward;
      
      setSuccessEarnings(reward);
      setTaskStatus('success');

      // Update clientsData state to mark as submitted
      const updatedClients = [...clientsData];
      if (updatedClients[selectedClientIndex]) {
        updatedClients[selectedClientIndex].submitted = true;
        updatedClients[selectedClientIndex].reportLink = reportLinkInput;
        // Also save edited grid values
        updatedClients[selectedClientIndex].grid = JSON.parse(JSON.stringify(gridData));
        setClientsData(updatedClients);
      }

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: `${lang === 'bn' ? 'ডাটা এন্ট্রি সাবমিশন' : 'Data Entry Submission'} (${updatedClients[selectedClientIndex]?.uid})`,
        jobTitleEn: `Data Entry Submission (${updatedClients[selectedClientIndex]?.uid})`,
        reward,
      });
      setReportLinkInput('');
    }, 1500);
  };

  // Handle Video Review
  const handleVideoReviewSubmit = () => {
    if (!videoFeedback.trim() || videoFeedback.length < 15) {
      setErrorMessage(lang === 'bn' ? 'দয়া করে কমপক্ষে ১৫টি ক্যারেক্টারে ভিডিও ফিডব্যাক লিখুন!' : 'Please write your video feedback containing at least 15 characters!');
      return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      const reward = activeSubTask ? activeSubTask.rewardNum : 2.20;
      setSuccessEarnings(reward);
      setTaskStatus('success');

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 1200);
  };

  // Handle Affiliate link generation & mock purchase
  const handleResellingLinkGen = () => {
    const targetProd = resellingProducts[selectedProductIndex] || resellingProducts[0];
    setGeneratedLink(`https://unityearning.com/affiliate/ref=${profile.uid}&product=${targetProd.id}`);
  };

  const handleResellingSubmit = () => {
    if (!generatedLink) {
      setErrorMessage(lang === 'bn' ? 'প্রথমে "লিঙ্ক তৈরি করুন" বাটনে চাপ দিন!' : 'Please generate your tracking affiliate link first!');
      return;
    }
    if (!buyerName.trim() || !buyerAddress.trim()) {
      setErrorMessage(lang === 'bn' ? 'ক্রেতার নাম এবং ঠিকানা লিখুন!' : "Please input buyer's name and delivery address!");
      return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      const targetProd = resellingProducts[selectedProductIndex] || resellingProducts[0];
      const reward = targetProd.commission;
      setSuccessEarnings(reward);
      setTaskStatus('success');

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 1500);
  };

  // Handle Photo Editing Submission
  const handlePhotoSubmit = () => {
    if (!editingSubmitLink.trim()) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে আপনার ডিজাইন করা কাজের ক্যানভা (Canva) অথবা শেয়ার লিংকটি নিচে প্রদান করুন!' : 'Please provide your designed Canva or work share link below!');
      return;
    }
    if (!editingSubmitLink.includes('.') || editingSubmitLink.length < 8) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে একটি সঠিক ও কার্যকর ক্যানভা অথবা ওয়ার্ক শেয়ার লিংক প্রদান করুন!' : 'Please provide a valid Canva or work share URL!');
      return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      const reward = activeSubTask ? activeSubTask.rewardNum : 1.50;
      setSuccessEarnings(reward);
      setTaskStatus('success');

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 1500);
  };

  // Handle Video Editing Submission
  const handleVideoEditingSubmit = () => {
    if (!editingSubmitLink.trim()) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে আপনার এডিটিং করা কাজের ক্যানভা (Canva) অথবা শেয়ার লিংকটি নিচে প্রদান করুন!' : 'Please provide your edited Canva or work share link below!');
      return;
    }
    if (!editingSubmitLink.includes('.') || editingSubmitLink.length < 8) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে একটি সঠিক ও কার্যকর ক্যানভা অথবা ভিডিও লিংক প্রদান করুন!' : 'Please provide a valid Canva or work share URL!');
      return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      const reward = activeSubTask ? activeSubTask.rewardNum : 1.80;
      setSuccessEarnings(reward);
      setTaskStatus('success');

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 1500);
  };

  // Handle Code Entry Confirmation & Submission
  const handleCodeConfirm = () => {
    const activeId = activeSubTaskId || 'code-1';
    const dataset = productCodeEntryData[activeId] || productCodeEntryData['code-1'];
    const currentProduct = dataset[codeCurrentStep];

    if (!codeInputValue.trim()) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে কনফার্মেশন কোডটি বসান!' : 'Please enter the confirmation code!');
      return;
    }

    if (codeInputValue.trim().toUpperCase() !== currentProduct.code) {
      setErrorMessage(lang === 'bn' ? 'ভুল কনফার্মেশন কোড! সঠিক কোডটি টাইপ করুন।' : 'Incorrect confirmation code! Please type the correct code.');
      return;
    }

    // Correct
    setErrorMessage('');
    const newCompleted = [...codeCompletedSteps];
    newCompleted[codeCurrentStep] = true;
    setCodeCompletedSteps(newCompleted);

    if (codeCurrentStep < dataset.length - 1) {
      setCodeCurrentStep(prev => prev + 1);
      setCodeInputValue('');
    } else {
      // Completed all products in the dataset! Submit the job.
      setTaskStatus('running');
      setTimeout(() => {
        const reward = activeSubTask ? activeSubTask.rewardNum : 3.50;
        setSuccessEarnings(reward);
        setTaskStatus('success');

        updateProfile({
          balance: profile.balance + reward,
          tasksCompleted: profile.tasksCompleted + 1,
        });

        addLog({
          jobId: job.id,
          jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
          jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
          reward,
        });
      }, 1500);
    }
  };

  // Handle Computer Training Submission
  const handleComputerTrainingSubmit = () => {
    let isCorrect = false;
    let errorEn = '';
    let errorBn = '';

    if (activeSubTaskId === 'comp-1') {
      const hasMkdir = compCommandHistory.some(cmd => cmd.trim().toLowerCase() === 'mkdir workspace');
      const hasCd = compCommandHistory.some(cmd => cmd.trim().toLowerCase() === 'cd workspace');
      const hasNpm = compCommandHistory.some(cmd => {
        const c = cmd.trim().toLowerCase();
        return c === 'npm init' || c === 'npm run build' || c === 'npm init -y' || c === 'npm install';
      });

      if (!hasMkdir) {
        errorEn = 'You must run the command `mkdir workspace` to create the directory!';
        errorBn = 'আপনাকে অবশ্যই `mkdir workspace` কমান্ড রান করে ডিরেক্টরি তৈরি করতে হবে!';
      } else if (!hasCd) {
        errorEn = 'You must navigate inside the folder using `cd workspace`!';
        errorBn = 'আপনাকে অবশ্যই `cd workspace` কমান্ড ব্যবহার করে ফোল্ডারের ভেতরে ঢুকতে হবে!';
      } else if (!hasNpm) {
        errorEn = 'You must initialize project files by running `npm init`!';
        errorBn = 'আপনাকে অবশ্যই `npm init` রান করে প্রজেক্ট ফাইল শুরু করতে হবে!';
      } else {
        isCorrect = true;
      }
    } else if (activeSubTaskId === 'comp-2') {
      const f1 = compSpreadsheetFormulas.formula1.trim().replace(/\s+/g, '').toUpperCase();
      const f2 = compSpreadsheetFormulas.formula2.trim().replace(/\s+/g, '').toUpperCase();

      const isF1Correct = f1 === '=SUM(A1:A5)' || f1 === '=SUM(A1,A2,A3,A4,A5)';
      const isF2Correct = f2 === '=AVERAGE(A1:A5)' || f2 === '=AVERAGE(A1,A2,A3,A4,A5)';

      if (!isF1Correct) {
        errorEn = 'Formula 1 (Total Sales) is incorrect. Try using "=SUM(A1:A5)"';
        errorBn = 'ফর্মুলা ১ (টোটাল সেলস) সঠিক নয়। "=SUM(A1:A5)" ব্যবহার করার চেষ্টা করুন।';
      } else if (!isF2Correct) {
        errorEn = 'Formula 2 (Average Sales) is incorrect. Try using "=AVERAGE(A1:A5)"';
        errorBn = 'ফর্মুলা ২ (গড় সেলস) সঠিক নয়। "=AVERAGE(A1:A5)" ব্যবহার করার চেষ্টা করুন।';
      } else {
        isCorrect = true;
      }
    } else if (activeSubTaskId === 'comp-3') {
      if (compActiveShortcutIndex < 4) {
        errorEn = 'Please complete all 4 keyboard shortcut questions first!';
        errorBn = 'দয়া করে প্রথমে ৪টি কীবোর্ড শর্টকাট টেস্টের সঠিক উত্তর দিন!';
      } else {
        isCorrect = true;
      }
    }

    if (!isCorrect) {
      setErrorMessage(lang === 'bn' ? errorBn : errorEn);
      return;
    }

    setErrorMessage('');
    setTaskStatus('running');

    setTimeout(() => {
      const reward = activeSubTask ? activeSubTask.rewardNum : 3.50;
      setSuccessEarnings(reward);
      setTaskStatus('success');

      updateProfile({
        balance: profile.balance + reward,
        tasksCompleted: profile.tasksCompleted + 1,
      });

      addLog({
        jobId: job.id,
        jobTitleBn: activeSubTask ? activeSubTask.titleBn : job.titleBn,
        jobTitleEn: activeSubTask ? activeSubTask.titleEn : job.titleEn,
        reward,
      });
    }, 1500);
  };

  const IconComponent = (Icons as any)[job.iconName] || Icons.Briefcase;

  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50 md:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full h-full md:h-auto md:max-w-4xl md:rounded-3xl shadow-2xl flex flex-col md:max-h-[95vh] overflow-hidden border border-slate-100 animate-slide-up" id="job-detail-container">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${job.bgColor} flex items-center justify-center`}>
              <IconComponent className={`w-6 h-6 ${job.iconColor}`} />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">
                {lang === 'bn' ? job.titleBn : job.titleEn}
              </h2>
              <span className="text-xs text-amber-400 font-medium tracking-wide">
                {lang === 'bn' ? 'সরাসরি কাজের পোর্টাল' : 'Active Workspace'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all active:scale-95"
            aria-label="Close modal"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 bg-slate-50 p-1">
          <button
            onClick={() => {
              setActiveTab('info');
              setTaskStatus('idle');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 text-center text-sm font-semibold rounded-2xl transition-all ${
              activeTab === 'info'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'bn' ? '📋 প্রজেক্ট গাইডলাইন' : '📋 Project Guidelines'}
          </button>
          <button
            onClick={() => {
              setActiveTab('practice');
              setTaskStatus('idle');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 text-center text-sm font-semibold rounded-2xl transition-all ${
              activeTab === 'practice'
                ? 'bg-white text-slate-800 shadow-sm border border-emerald-200/50'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'bn' ? '⚡ উপলব্ধ কাজসমূহ' : '⚡ Available Contracts'}
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {activeTab === 'info' ? (
            <div className="space-y-6">
              {/* Rewards Summary Card */}
              <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-center p-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    {lang === 'bn' ? 'কমিশন/পুরস্কার' : 'Reward'}
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    {lang === 'bn' ? job.rewardBn : job.rewardEn}
                  </span>
                </div>
                <div className="text-center p-2 border-x border-slate-100">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    {lang === 'bn' ? 'সময় লাগবে' : 'Est. Time'}
                  </span>
                  <span className="text-sm font-bold text-slate-700">
                    {lang === 'bn' ? job.estimatedTimeBn : job.estimatedTimeEn}
                  </span>
                </div>
                <div className="text-center p-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    {lang === 'bn' ? 'কঠিনতা' : 'Difficulty'}
                  </span>
                  <span className={`text-sm font-bold ${
                    job.difficultyEn === 'Easy' ? 'text-emerald-500' :
                    job.difficultyEn === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                  }`}>
                    {lang === 'bn' ? job.difficultyBn : job.difficultyEn}
                  </span>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <h4 className="font-bold text-slate-800 text-base">
                  {lang === 'bn' ? 'কাজের সংক্ষিপ্ত বিবরণ' : 'Project Overview'}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {lang === 'bn' ? job.longDescBn : job.longDescEn}
                </p>
              </div>

              {/* Steps/Instructions */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Icons.ListChecks className="w-5 h-5 text-amber-500" />
                  {lang === 'bn' ? 'ধাপসমূহ (কিভাবে কাজ করতে হবে):' : 'Step-by-Step Instructions:'}
                </h4>
                <ol className="space-y-3">
                  {(lang === 'bn' ? job.instructionsBn : job.instructionsEn).map((inst, index) => (
                    <li key={index} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Required Skills */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <h4 className="font-bold text-slate-800 text-sm">
                  {lang === 'bn' ? 'প্রয়োজনীয় দক্ষতা:' : 'Skills Required:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'bn' ? job.skillsRequiredBn : job.skillsRequiredEn).map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-xl font-medium">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Start Callout */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-950 text-white p-5 rounded-2xl shadow-md text-center space-y-3 border border-slate-700/30">
                <p className="font-bold text-sm md:text-base">
                  {lang === 'bn' ? 'আপনি কি প্রস্তুত? কাজ শুরু করে আপনার ব্যালেন্স বাড়ান!' : 'Ready to work? Enter the active workspace to start!'}
                </p>
                <button
                  onClick={() => setActiveTab('practice')}
                  className="bg-amber-500 text-slate-900 font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-amber-400 transition-all active:scale-95 shadow-sm"
                >
                  {lang === 'bn' ? '⚡ কাজ শুরু করুন' : '⚡ Enter Workspace'}
                </button>
              </div>
            </div>
          ) : (
            // --- LIVE WORK AREA ---
            <div className="space-y-6">
              {!activeSubTaskId ? (
                // Related Tasks Directory
                <div className="space-y-4">
                  <div className="bg-slate-900 text-white p-5 rounded-2xl relative overflow-hidden border border-slate-800 shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                    <span className="text-[10px] bg-emerald-500 text-slate-900 font-extrabold px-2.5 py-1 rounded uppercase tracking-wider mb-2.5 inline-block">
                      {lang === 'bn' ? 'কাজের তালিকা' : 'ACTIVE CONTRACTS'}
                    </span>
                    <h3 className="font-bold text-sm md:text-base mb-1.5">
                      {lang === 'bn' ? `${job.titleBn} ক্যাটাগরি` : `${job.titleEn} Category`}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {lang === 'bn' 
                        ? 'নিচে এই ক্যাটাগরির সমস্ত সরাসরি কাজ ও প্রজেক্টের তালিকা দেওয়া হলো। যেকোনো একটি কাজ বেছে নিয়ে শুরু করুন।'
                        : 'Find active project contracts under this category below. Select a project to enter its workflow.'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {subTasks.map((sub) => (
                      <div 
                        key={sub.id} 
                        className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-slate-800">
                              {lang === 'bn' ? sub.titleBn : sub.titleEn}
                            </h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              sub.difficultyEn === 'Easy' ? 'bg-emerald-50 text-emerald-600' :
                              sub.difficultyEn === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                              {lang === 'bn' ? sub.difficultyBn : sub.difficultyEn}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs">
                            {lang === 'bn' ? 'স্ট্যাটাস: সক্রিয় কাজ' : 'Status: Active Contract'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 pt-3 md:pt-0">
                          <div className="text-left md:text-right">
                            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
                              {lang === 'bn' ? 'কমিশন' : 'PAYOUT'}
                            </span>
                            <span className="text-sm font-black text-emerald-600 font-mono">
                              {lang === 'bn' ? sub.rewardBn : sub.rewardEn}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setActiveSubTaskId(sub.id);
                              setTaskStatus('idle');
                              setErrorMessage('');
                              setEditingSubmitLink('');
                              setCodeCurrentStep(0);
                              setCodeInputValue('');
                              setCodeCompletedSteps([false, false, false, false]);
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                          >
                            {lang === 'bn' ? 'কাজ শুরু করুন' : 'Start Contract'}
                            <Icons.ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : taskStatus === 'success' ? (
                  // Success State View
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg text-center space-y-4 animate-scale-up">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                    <Icons.CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 text-xl">
                      {lang === 'bn' ? 'চমৎকার! কাজ সম্পন্ন হয়েছে!' : 'Excellent! Contract Completed!'}
                    </h3>
                    <p className="text-slate-500 text-sm">
                      {lang === 'bn' ? 'আপনার জমা দেওয়া কাজটি ডিরেক্টরি সিস্টেমে সফলভাবে সাবমিট ও ভেরিফাই হয়েছে।' : 'Your submitted project has been validated and registered successfully.'}
                    </p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl max-w-xs mx-auto">
                    <span className="text-xs text-emerald-600 font-bold block">
                      {lang === 'bn' ? 'আপনার ব্যালেন্স বৃদ্ধি পেয়েছে' : 'Earning Added to Balance'}
                    </span>
                    <span className="text-2xl font-black text-emerald-700 font-mono">
                      {lang === 'bn' ? `+৳${successEarnings * 100}` : `+$${successEarnings.toFixed(2)}`}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'bn' ? '*কাজটি সফলভাবে সম্পূর্ণ হয়ে আপনার মূল ব্যালেন্সে ক্রেডিট যোগ হয়েছে।' : '*Contract finalized. Earnings successfully credited to your main wallet balance.'}
                  </p>
                  <button
                    onClick={() => {
                      setTaskStatus('idle');
                      setTypedText('');
                      setEmailEntries(Array(10).fill({ account: '', password: '' }));
                      setFbCaption('');
                      setExtractedLeads(null);
                      setBuyerName('');
                      setBuyerAddress('');
                      // Cycle to a random subtask for variety
                      const currentIndex = subTasks.findIndex(st => st.id === activeSubTaskId);
                      const nextIndex = (currentIndex + 1) % subTasks.length;
                      setActiveSubTaskId(subTasks[nextIndex]?.id || null);
                    }}
                    className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
                  >
                    {lang === 'bn' ? 'পরের কাজে যান' : 'Proceed to Next Contract'}
                  </button>
                </div>
              ) : (
                // Active Workspace Form Elements depending on ID
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  {/* Contract Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-1 flex-wrap gap-2">
                    <div />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-slate-900 text-white font-extrabold px-2.5 py-1 rounded uppercase tracking-wide flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {lang === 'bn' ? 'সক্রিয় কাজ' : 'ACTIVE CONTRACT'}
                      </span>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md font-bold font-mono">
                        {lang === 'bn' ? activeSubTask?.rewardBn : activeSubTask?.rewardEn}
                      </span>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-xl text-xs flex items-center gap-2 font-medium animate-fade-in">
                      <Icons.AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. TYPING JOB SIMULATION */}
                  {job.id === 'typing-job' && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                          {lang === 'bn' ? 'সোর্স টেক্সট টেমপ্লেট:' : 'Source Text Template:'}
                        </span>
                        <p className="text-slate-700 font-medium text-xs md:text-sm select-none leading-relaxed">
                          {lang === 'bn' ? demoTexts.bn : demoTexts.en}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-bold">{lang === 'bn' ? 'টাইপিং গতি' : 'Typing Speed'}</span>
                          <span className="text-lg font-bold text-slate-800">{wpm} WPM</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-bold">{lang === 'bn' ? 'সঠিকতা (Accuracy)' : 'Accuracy'}</span>
                          <span className={`text-lg font-bold ${accuracy >= 92 ? 'text-emerald-600' : 'text-rose-500'}`}>{accuracy}%</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 block">
                          {lang === 'bn' ? 'নিচে টাইপ করা শুরু করুন:' : 'Start Typing Below:'}
                        </label>
                        <textarea
                          value={typedText}
                          onChange={(e) => setTypedText(e.target.value)}
                          placeholder={lang === 'bn' ? 'উপরের টেক্সটটি নির্ভুলভাবে এখানে টাইপ করুন...' : 'Type the exact words here to verify your speed...'}
                          className="w-full h-28 border border-slate-200 rounded-xl p-3 text-slate-700 text-xs md:text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                        />
                      </div>

                      <button
                        onClick={handleTypingSubmit}
                        disabled={taskStatus === 'running'}
                        className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-xs hover:bg-slate-800 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                      >
                        {taskStatus === 'running' ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            {lang === 'bn' ? 'ডাটা সাবমিট হচ্ছে...' : 'Analyzing Accuracy...'}
                          </>
                        ) : (
                          lang === 'bn' ? 'টাইপিং টাস্ক সাবমিট করুন' : 'Submit Typing Task'
                        )}
                      </button>
                    </div>
                  )}

                  {/* 2. EMAIL MARKETING SIMULATION */}
                  {job.id === 'email-marketing' && (
                    <div className="space-y-4">
                      {/* Notice Banner */}
                      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
                        <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-700">
                          <Icons.Coins className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-emerald-800 leading-snug">
                            {lang === 'bn' ? 'একটি ইমেইল সেল করলে ২০ টাকা করে পাবেন!' : 'Earn ৳20 for every email account sold!'}
                          </h4>
                          <p className="text-xs text-emerald-600 mt-0.5 leading-relaxed">
                            {lang === 'bn' 
                              ? 'নিচে সচল ইমেইল এবং পাসওয়ার্ড সাবমিট করুন। আমাদের সিস্টেম স্বয়ংক্রিয়ভাবে লগইন চেক করে সাথে সাথে আপনার ওয়ালেটে কমিশন যোগ করে দিবে।'
                              : 'Enter a valid working email and password below. Our automated validation engine checks credentials instantly to credit your wallet.'}
                          </p>
                        </div>
                      </div>

                      {/* Input fields */}
                      <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
                        {emailEntries.map((entry, index) => (
                          <div key={index} className="grid grid-cols-2 gap-3">
                            <input
                              type="email"
                              value={entry.account}
                              onChange={(e) => {
                                const next = [...emailEntries];
                                next[index] = { ...next[index], account: e.target.value };
                                setEmailEntries(next);
                              }}
                              placeholder={`${lang === 'bn' ? 'ইমেইল' : 'Email'} ${index + 1}`}
                              className="w-full border border-slate-200 rounded-xl p-3 text-slate-700 text-xs focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none"
                            />
                            <input
                              type="password"
                              value={entry.password}
                              onChange={(e) => {
                                const next = [...emailEntries];
                                next[index] = { ...next[index], password: e.target.value };
                                setEmailEntries(next);
                              }}
                              placeholder={lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                              className="w-full border border-slate-200 rounded-xl p-3 text-slate-700 text-xs focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Submit button */}
                      <button
                        onClick={handleEmailSubmit}
                        disabled={taskStatus === 'running'}
                        className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs md:text-sm hover:bg-indigo-700 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        {taskStatus === 'running' ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            {lang === 'bn' ? 'ইমেইল ভেরিফাই হচ্ছে...' : 'Verifying Credentials...'}
                          </>
                        ) : (
                          <>
                            <Icons.Check className="w-4 h-4" />
                            {lang === 'bn' ? 'ইমেইল সেল সাবমিট করুন' : 'Submit Email Sale'}
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* 3. FACEBOOK MARKETING SIMULATION */}
                  {job.id === 'facebook-marketing' && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 block">{lang === 'bn' ? 'বিজ্ঞাপন ক্যাপশন (Ad Caption):' : 'Social Post/Ad Caption:'}</label>
                        <textarea
                          value={fbCaption}
                          onChange={(e) => setFbCaption(e.target.value)}
                          placeholder={lang === 'bn' ? 'যেমন: আপনার ব্যবসার বিক্রি ডাবল করতে আমাদের সফটওয়্যারটি ব্যবহার করুন...' : 'e.g., Unleash 10x typing efficiency with our all-new premium mechanic keyboard pack! Order today...'}
                          className="w-full h-20 border border-slate-200 rounded-xl p-2.5 text-slate-700 text-xs focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 block">{lang === 'bn' ? 'টার্গেট অডিয়েন্স ইন্টারেস্ট:' : 'Audience Target:'}</label>
                          <select
                            value={fbAudience}
                            onChange={(e) => setFbAudience(e.target.value)}
                            className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-700 text-xs bg-white outline-none"
                          >
                            <option value="tech">{lang === 'bn' ? 'প্রযুক্তি এবং টেক লাভার' : 'Technology & Gadgets'}</option>
                            <option value="fashion">{lang === 'bn' ? 'ফ্যাশন এবং শপিং পছন্দকারী' : 'Fashion & Shopping'}</option>
                            <option value="students">{lang === 'bn' ? 'বিশ্ববিদ্যালয় শিক্ষার্থী' : 'College/University Students'}</option>
                            <option value="business">{lang === 'bn' ? 'ক্ষুদ্র উদ্যোক্তা ও স্টার্টআপ' : 'Small Business Owners'}</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 block">{lang === 'bn' ? 'বিজ্ঞাপন বাজেট ($):' : 'Ad Budget ($):'}</label>
                          <input
                            type="number"
                            value={fbBudget}
                            onChange={(e) => setFbBudget(e.target.value)}
                            placeholder="e.g. 50"
                            className="w-full border border-slate-200 rounded-xl p-2 text-slate-700 text-xs outline-none"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleFbAdSubmit}
                        disabled={taskStatus === 'running'}
                        className="w-full bg-sky-500 text-white font-bold py-3 rounded-xl text-xs hover:bg-sky-600 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                      >
                        {taskStatus === 'running' ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            {lang === 'bn' ? 'বিজ্ঞাপন বুস্ট সক্রিয় হচ্ছে...' : 'Optimizing Pixel Audiences...'}
                          </>
                        ) : (
                          lang === 'bn' ? 'বিজ্ঞাপন ক্যাম্পেইন পাবলিশ করুন' : 'Publish FB Ad Campaign'
                        )}
                      </button>
                    </div>
                  )}

                  {/* 4. LEAD GENERATION SIMULATION */}
                  {job.id === 'lead-generation' && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-extrabold uppercase">{lang === 'bn' ? 'টার্গেট সেক্টর / ইন্ডাস্ট্রি' : 'Target Industry'}</label>
                            <select
                              value={leadIndustry}
                              onChange={(e) => { setLeadIndustry(e.target.value); setExtractedLeads(null); }}
                              className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-700 outline-none"
                            >
                              <option value="software">Software & IT Services</option>
                              <option value="healthcare">Healthcare & Biotech</option>
                              <option value="realestate">Real Estate & Builder</option>
                              <option value="ecommerce">E-Commerce Retails</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-extrabold uppercase">{lang === 'bn' ? 'লোকেশন / এলাকা' : 'Target Country'}</label>
                            <select
                              value={leadLocation}
                              onChange={(e) => { setLeadLocation(e.target.value); setExtractedLeads(null); }}
                              className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-700 outline-none"
                            >
                              <option value="usa">United States (USA)</option>
                              <option value="uk">United Kingdom (UK)</option>
                              <option value="bd">Bangladesh (BD)</option>
                              <option value="sg">Singapore (SG)</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-1 pt-1">
                          <label className="text-[10px] text-slate-400 font-extrabold uppercase flex items-center gap-1.5">
                            <Icons.Hash className="w-3 h-3" />
                            {lang === 'bn' ? 'কতটি লিড সংগ্রহ করতে চান?' : 'Number of leads to extract?'}
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={leadCount}
                            onChange={(e) => { setLeadCount(Math.max(1, parseInt(e.target.value) || 1)); setExtractedLeads(null); }}
                            className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-700 outline-none focus:border-blue-500 transition-all font-bold"
                          />
                          <p className="text-[9px] text-blue-600 font-bold mt-0.5">
                            {lang === 'bn' ? `* প্রতিটি লিডের জন্য ১৩০ টাকা (মোট: ${leadCount * 130} টাকা)` : `* 130 Taka per lead (Total: ${leadCount * 130} Taka)`}
                          </p>
                        </div>
                      </div>

                      {!extractedLeads ? (
                        <button
                          onClick={handleLeadGenSearch}
                          disabled={taskStatus === 'running'}
                          className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                          {taskStatus === 'running' ? (
                            <>
                              <Icons.Loader2 className="w-4 h-4 animate-spin" />
                              {lang === 'bn' ? 'ডাটা মাইনিং এবং স্ক্র্যাপিং হচ্ছে...' : 'Crawling business indexes...'}
                            </>
                          ) : (
                            lang === 'bn' ? '🔍 সম্ভাব্য লিড অনুসন্ধান করুন' : '🔍 Scan & Extract B2B Leads'
                          )}
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wide block">
                            ✓ {lang === 'bn' ? `${leadCount}টি সলিড ভেরিফাইড লিড সংগৃহীত হয়েছে:` : `${leadCount} Verified Leads Extracted Successfully:`}
                          </span>
                          <div className="overflow-x-auto border border-slate-100 rounded-xl max-h-36">
                            <table className="w-full text-[10px] text-left text-slate-600">
                              <thead className="bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
                                <tr>
                                  <th className="p-2">Name</th>
                                  <th className="p-2">Email Address</th>
                                  <th className="p-2">Company Name</th>
                                  <th className="p-2">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {extractedLeads.map((lead, i) => (
                                  <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                    <td className="p-2 font-bold text-slate-700">{lead.name}</td>
                                    <td className="p-2 text-indigo-600 select-all font-mono">{lead.email}</td>
                                    <td className="p-2">{lead.company}</td>
                                    <td className="p-2">
                                      <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-extrabold">VERIFIED</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <button
                            onClick={handleLeadGenSubmit}
                            disabled={taskStatus === 'running'}
                            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs hover:bg-emerald-700 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                          >
                            {taskStatus === 'running' ? (
                              <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              lang === 'bn' ? 'লিড লিস্ট ভেরিফাই করে সাবমিট করুন' : 'Save and Validate Lead sheet'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 5. FORM FILLUP SIMULATION */}
                  {job.id === 'form-fillup-work' && (
                    <div className="space-y-4">
                      {/* Client Selector Cards */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block">
                          {lang === 'bn' ? '১. ক্লায়েন্ট ডাটা শিট নির্বাচন করুন (৬ জন ক্লায়েন্ট উপলব্ধ):' : '1. Select Client Data Sheet (6 Clients available):'}
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {clientsData.map((client, index) => (
                            <button
                              key={client.id}
                              type="button"
                              onClick={() => {
                                setSelectedClientIndex(index);
                                setErrorMessage('');
                              }}
                              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                                selectedClientIndex === index
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <div className="text-[11px] font-bold truncate">{client.name.split(' ')[0]}</div>
                              <div className="text-[9px] opacity-75 font-mono">{client.phone.slice(-4)}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Current Client Card Details */}
                      <div className="bg-slate-950 text-white rounded-2xl p-4 shadow-xl border border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-3">
                          <div>
                            <span className="text-[8px] bg-amber-500/20 text-amber-400 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                              {lang === 'bn' ? 'অফিসিয়াল ক্লায়েন্ট ফাইল' : 'Official Client File'}
                            </span>
                            <h4 className="text-sm font-bold text-slate-100 mt-1">
                              {clientsData[selectedClientIndex].name}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const c = clientsData[selectedClientIndex];
                              setFormName(c.name);
                              setFormFather(c.father);
                              setFormMother(c.mother);
                              setFormPhone(c.phone);
                              setFormEmail(c.email);
                              setFormGender(c.gender);
                              setFormDob(c.dob);
                              setFormNid(c.nid);
                              setFormBlood(c.blood);
                              setFormDivision(c.division);
                              setFormDistrict(c.district);
                              setFormThana(c.thana);
                              setFormPost(c.post);
                              setFormPostcode(c.postcode);
                              setFormVillage(c.village);
                              setFormEducation(c.education);
                              setFormOccupation(c.occupation);
                              setFormIncome(c.income);
                              setFormMarital(c.marital);
                              setFormEmergency(c.emergency);
                              setFormNominee(c.nominee);
                              setFormNomineeRelation(c.nomineeRelation);
                              setFormTerms(true);
                            }}
                            className="text-[10px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 active:scale-[0.98] cursor-pointer"
                          >
                            <span>⚡ {lang === 'bn' ? 'অটো-ফিল করুন' : 'Auto-Fill'}</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-[11px] font-sans">
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">পিতার নাম (Father):</span>
                            <span className="font-semibold text-slate-200">{clientsData[selectedClientIndex].father}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">মাতার নাম (Mother):</span>
                            <span className="font-semibold text-slate-200">{clientsData[selectedClientIndex].mother}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">মোবাইল (Phone):</span>
                            <span className="font-mono font-semibold text-slate-200 select-all">{clientsData[selectedClientIndex].phone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">ইমেইল (Email):</span>
                            <span className="font-mono font-semibold text-slate-200 select-all">{clientsData[selectedClientIndex].email}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">NID কার্ড নং:</span>
                            <span className="font-mono font-semibold text-slate-200 select-all">{clientsData[selectedClientIndex].nid}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">জন্ম তারিখ (DOB):</span>
                            <span className="font-mono font-semibold text-slate-200">{clientsData[selectedClientIndex].dob}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">লিঙ্গ / রক্ত (Gender/Blood):</span>
                            <span className="font-semibold text-slate-200">{clientsData[selectedClientIndex].gender} ({clientsData[selectedClientIndex].blood})</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">পেশা / আয় (Job/Income):</span>
                            <span className="font-semibold text-slate-200">{clientsData[selectedClientIndex].occupation} ({clientsData[selectedClientIndex].income})</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">শিক্ষা / বৈবাহিক:</span>
                            <span className="font-semibold text-slate-200">{clientsData[selectedClientIndex].education} / {clientsData[selectedClientIndex].marital}</span>
                          </div>
                          <div className="col-span-2 sm:col-span-3 border-t border-slate-800 pt-2.5 mt-1">
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">ঠিকানা (Address):</span>
                            <span className="font-semibold text-slate-200">
                              গ্রাম: {clientsData[selectedClientIndex].village}, পোস্ট: {clientsData[selectedClientIndex].post} ({clientsData[selectedClientIndex].postcode}), থানা: {clientsData[selectedClientIndex].thana}, জেলা: {clientsData[selectedClientIndex].district}, বিভাগ: {clientsData[selectedClientIndex].division}
                            </span>
                          </div>
                          <div className="col-span-2 sm:col-span-3 border-t border-slate-800 pt-2.5">
                            <span className="text-slate-400 block text-[9px] uppercase font-mono">জরুরি যোগাযোগ ও নমিনী (Emergency/Nominee):</span>
                            <span className="font-semibold text-slate-200">
                              জরুরি: {clientsData[selectedClientIndex].emergency} | নমিনী: {clientsData[selectedClientIndex].nominee} ({clientsData[selectedClientIndex].nomineeRelation})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Form Submission Sections */}
                      <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm space-y-4 max-h-[480px] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                            <Icons.FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                            {lang === 'bn' ? 'অনলাইন ডাটা এন্ট্রি পোর্টাল' : 'Online Data Entry Portal'}
                          </h4>
                          <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full">
                            {lang === 'bn' ? 'আয়: ২০০ টাকা' : 'Earn: ৳200'}
                          </span>
                        </div>

                        {/* Section 1: Personal Details */}
                        <div className="space-y-3">
                          <h5 className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider border-b border-slate-100 pb-1">
                            {lang === 'bn' ? '১. ব্যক্তিগত তথ্য বিবরণী (Personal Details)' : '1. Personal Details'}
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'আবেদনকারীর নাম (Full Name):' : 'Full Name:'}</label>
                              <input
                                type="text"
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                placeholder="উদাঃ মোঃ আব্দুর রহমান"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'পিতার নাম (Father\'s Name):' : 'Father\'s Name:'}</label>
                              <input
                                type="text"
                                value={formFather}
                                onChange={(e) => setFormFather(e.target.value)}
                                placeholder="উদাঃ মোঃ মজিবুর রহমান"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'মাতার নাম (Mother\'s Name):' : 'Mother\'s Name:'}</label>
                              <input
                                type="text"
                                value={formMother}
                                onChange={(e) => setFormMother(e.target.value)}
                                placeholder="উদাঃ মোসাঃ রহিমা বেগম"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'জন্ম তারিখ (Date of Birth - DD/MM/YYYY):' : 'Date of Birth:'}</label>
                              <input
                                type="text"
                                value={formDob}
                                onChange={(e) => setFormDob(e.target.value)}
                                placeholder="DD/MM/YYYY"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'জাতীয় পরিচয়পত্র নং (NID Number):' : 'NID Number:'}</label>
                              <input
                                type="text"
                                value={formNid}
                                onChange={(e) => setFormNid(e.target.value)}
                                placeholder="১০ ডিজিটের এনআইডি নং"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'লিঙ্গ (Gender):' : 'Gender:'}</label>
                              <select
                                value={formGender}
                                onChange={(e) => setFormGender(e.target.value)}
                                className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-700 outline-none"
                              >
                                <option value="পুরুষ">पुरुष (Male)</option>
                                <option value="নারী">নারী (Female)</option>
                                <option value="অন্যান্য">অন্যান্য (Other)</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'রক্তের গ্রুপ (Blood Group):' : 'Blood Group:'}</label>
                              <select
                                value={formBlood}
                                onChange={(e) => setFormBlood(e.target.value)}
                                className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-700 outline-none font-mono"
                              >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'বৈবাহিক অবস্থা (Marital Status):' : 'Marital Status:'}</label>
                              <select
                                value={formMarital}
                                onChange={(e) => setFormMarital(e.target.value)}
                                className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-700 outline-none"
                              >
                                <option value="অবিবাহিত">অবিবাহিত (Single)</option>
                                <option value="বিবাহিত">বিবাহিত (Married)</option>
                                <option value="অন্যান্য">অন্যান্য (Other)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Contact Details */}
                        <div className="space-y-3 pt-2">
                          <h5 className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider border-b border-slate-100 pb-1">
                            {lang === 'bn' ? '২. যোগাযোগের বিবরণ (Contact Details)' : '2. Contact Details'}
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'মোবাইল নম্বর (Mobile Phone):' : 'Mobile Phone:'}</label>
                              <input
                                type="text"
                                value={formPhone}
                                onChange={(e) => setFormPhone(e.target.value)}
                                placeholder="017xxxxxxxx"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'ইমেইল অ্যাড্রেস (Email Address):' : 'Email Address:'}</label>
                              <input
                                type="email"
                                value={formEmail}
                                onChange={(e) => setFormEmail(e.target.value)}
                                placeholder="email@gmail.com"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'জরুরি যোগাযোগ নম্বর (Emergency Phone):' : 'Emergency Phone:'}</label>
                              <input
                                type="text"
                                value={formEmergency}
                                onChange={(e) => setFormEmergency(e.target.value)}
                                placeholder="জরুরি নাম্বার"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 3: Address Details */}
                        <div className="space-y-3 pt-2">
                          <h5 className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider border-b border-slate-100 pb-1">
                            {lang === 'bn' ? '৩. স্থায়ী ঠিকানা বিবরণী (Permanent Address)' : '3. Permanent Address'}
                          </h5>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'বিভাগ (Division):' : 'Division:'}</label>
                              <input
                                type="text"
                                value={formDivision}
                                onChange={(e) => setFormDivision(e.target.value)}
                                placeholder="উদাঃ ঢাকা"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'জেলা (District):' : 'District:'}</label>
                              <input
                                type="text"
                                value={formDistrict}
                                onChange={(e) => setFormDistrict(e.target.value)}
                                placeholder="উদাঃ গাজীপুর"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'থানা / উপজেলা (Thana/Upazila):' : 'Thana/Upazila:'}</label>
                              <input
                                type="text"
                                value={formThana}
                                onChange={(e) => setFormThana(e.target.value)}
                                placeholder="উদাঃ শ্রীপুর"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'ডাকঘর (Post Office):' : 'Post Office:'}</label>
                              <input
                                type="text"
                                value={formPost}
                                onChange={(e) => setFormPost(e.target.value)}
                                placeholder="উদাঃ মাওনা"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'পোস্ট কোড (Postcode):' : 'Postcode:'}</label>
                              <input
                                type="text"
                                value={formPostcode}
                                onChange={(e) => setFormPostcode(e.target.value)}
                                placeholder="উদাঃ ১৭৪০"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'গ্রাম/মহল্লা/রাস্তা (Village/Road):' : 'Village/Road:'}</label>
                              <input
                                type="text"
                                value={formVillage}
                                onChange={(e) => setFormVillage(e.target.value)}
                                placeholder="উদাঃ উত্তরা পাড়া"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 4: Education, Nominee and Other Details */}
                        <div className="space-y-3 pt-2">
                          <h5 className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider border-b border-slate-100 pb-1">
                            {lang === 'bn' ? '৪. শিক্ষাগত যোগ্যতা ও নমিনী বিবরণ (Education & Nominee Details)' : '4. Education & Nominee Details'}
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'শিক্ষাগত যোগ্যতা (Education):' : 'Education Level:'}</label>
                              <select
                                value={formEducation}
                                onChange={(e) => setFormEducation(e.target.value)}
                                className="w-full border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-700 outline-none"
                              >
                                <option value="মাধ্যমিক">মাধ্যমিক (SSC)</option>
                                <option value="উচ্চ মাধ্যমিক">উচ্চ মাধ্যমিক (HSC)</option>
                                <option value="স্নাতক">স্নাতক (Bachelors)</option>
                                <option value="স্নাতকোত্তর">স্নাতকোত্তর (Masters)</option>
                                <option value="অন্যান্য">অন্যান্য (Other)</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'বর্তমান পেশা (Occupation):' : 'Current Occupation:'}</label>
                              <input
                                type="text"
                                value={formOccupation}
                                onChange={(e) => setFormOccupation(e.target.value)}
                                placeholder="উদাঃ চাকুরীজীবী"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'মাসিক আয় (Monthly Income):' : 'Monthly Income:'}</label>
                              <input
                                type="text"
                                value={formIncome}
                                onChange={(e) => setFormIncome(e.target.value)}
                                placeholder="উদাঃ ৩৫,০০০ টাকা"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'নমিনির পূর্ণ নাম (Nominee Name):' : 'Nominee Name:'}</label>
                              <input
                                type="text"
                                value={formNominee}
                                onChange={(e) => setFormNominee(e.target.value)}
                                placeholder="উদাঃ মোসাঃ রহিমা বেগম"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">{lang === 'bn' ? 'নমিনির সাথে সম্পর্ক (Nominee Relation):' : 'Nominee Relation:'}</label>
                              <input
                                type="text"
                                value={formNomineeRelation}
                                onChange={(e) => setFormNomineeRelation(e.target.value)}
                                placeholder="উদাঃ মাতা / পিতা / স্ত্রী"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-indigo-400 outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 5: Technical Meta-fields (Read-Only) to make 50 sections total */}
                        <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 space-y-2.5 pt-3">
                          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                            <h5 className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                              {lang === 'bn' ? '৫. সিস্টেম ও ডাটাবেজ মেটাডাটা (System & DB Protocols - স্বয়ংক্রিয় সেশন)' : '5. System & DB Protocols (Auto-session):'}
                            </h5>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px] font-mono">
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Form ID:</span>
                              <span className="text-slate-700 font-bold">FRM-9941-TX</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Encryption:</span>
                              <span className="text-slate-700 font-bold">SHA-256 (SALT)</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">API Version:</span>
                              <span className="text-slate-700 font-bold">v3.42-Stable</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">IP Signature:</span>
                              <span className="text-slate-700 font-bold">192.168.12.7</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">DB Cluster:</span>
                              <span className="text-slate-700 font-bold">BD-EAST-MAIN</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Routing Port:</span>
                              <span className="text-slate-700 font-bold">TCP_3000</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Node Status:</span>
                              <span className="text-emerald-600 font-bold">● ACTIVE</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Sync Mode:</span>
                              <span className="text-slate-700 font-bold">ASYNCHRONOUS</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Client Hash:</span>
                              <span className="text-slate-700 font-bold">0x8A9F...2E1C</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Replication:</span>
                              <span className="text-slate-700 font-bold">3x Redundant</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Nationality:</span>
                              <span className="text-slate-700 font-bold">Bangladeshi</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Security Level:</span>
                              <span className="text-slate-700 font-bold">SECURE_LVL_4</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">User Agent ID:</span>
                              <span className="text-slate-700 font-bold">UA-918239</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Country Code:</span>
                              <span className="text-slate-700 font-bold">BD (+880)</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Currency Key:</span>
                              <span className="text-slate-700 font-bold">BDT (৳)</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">System Timeout:</span>
                              <span className="text-slate-700 font-bold">3600 seconds</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Data Channel:</span>
                              <span className="text-slate-700 font-bold">SECURE_SSL</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Session Hash:</span>
                              <span className="text-slate-700 font-bold">SESS-77402B</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Audit Trail Ref:</span>
                              <span className="text-slate-700 font-bold">AUD-TR-8422</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Schema Version:</span>
                              <span className="text-slate-700 font-bold">v9.2_Relational</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Latency Status:</span>
                              <span className="text-emerald-600 font-bold">12 ms (Excellent)</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Replication Sync:</span>
                              <span className="text-emerald-600 font-bold">✓ SYNCHRONIZED</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Flow Rate:</span>
                              <span className="text-slate-700 font-bold">124 kbps</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Clearance Level:</span>
                              <span className="text-slate-700 font-bold">ISO-27001 Certified</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">DB Engine:</span>
                              <span className="text-slate-700 font-bold">PostgreSQL Master</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Cloud Gateway:</span>
                              <span className="text-slate-700 font-bold">GW-CloudRun-BD</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Ingress Protocol:</span>
                              <span className="text-slate-700 font-bold">NGINX Reverse Proxy</span>
                            </div>
                            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                              <span className="text-slate-400 block text-[7px] uppercase">Load Balancer:</span>
                              <span className="text-emerald-600 font-bold">100% HEALTHY</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={formTerms}
                            onChange={(e) => setFormTerms(e.target.checked)}
                            className="w-4 h-4 text-emerald-600 border-slate-300 rounded cursor-pointer"
                          />
                          <label htmlFor="terms" className="text-[10px] text-slate-500 font-medium cursor-pointer">
                            {lang === 'bn' ? 'আমি ঘোষণা করছি যে উপরের সকল তথ্য সোর্স ডাটা শিটের সাথে শতভাগ মিল রেখে পূরণ করা হয়েছে।' : 'I declare that the information is filled accurately matching the source.'}
                          </label>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleFormSubmit}
                        disabled={taskStatus === 'running'}
                        className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-xs hover:bg-emerald-700 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                      >
                        {taskStatus === 'running' ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            {lang === 'bn' ? 'ফরম ফিল্ড এনক্রিপশন ও সিঙ্ক্রোনাইজেশন হচ্ছে...' : 'Verifying Form Fields...'}
                          </>
                        ) : (
                          lang === 'bn' ? 'ফরম সাবমিট করুন (২০০ টাকা পাবেন)' : 'Submit Completed Form (Earn ৳200)'
                        )}
                      </button>

                      {/* Embedded Micro Jobs under Form Fillup as requested */}
                      <div className="mt-8 border-t border-dashed border-slate-200 pt-6 space-y-4">
                        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xs animate-bounce">
                              ⚡
                            </div>
                            <div>
                              <h4 className="font-bold text-xs">
                                {lang === 'bn' ? 'স্পন্সরড কুইক মাইক্রো জবস' : 'Sponsored Quick Micro Jobs'}
                              </h4>
                              <p className="text-[10px] text-slate-300">
                                {lang === 'bn' ? 'ইনস্ট্যান্ট ২, ৫, ৬ বা ১০ টাকা ব্যালেন্সে যুক্ত হবে' : 'Earn ৳2, ৳5, ৳6, ৳10 instantly!'}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-slate-800 text-amber-400 font-bold px-2.5 py-1 rounded-full border border-slate-700">
                            {lang === 'bn' ? '১০০টি কাজ উপলব্ধ' : '100 Active Tasks'}
                          </span>
                        </div>

                        {/* Search and Filters inside Modal */}
                        <div className="grid grid-cols-1 gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                          <div className="relative">
                            <Icons.Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={modalSearch}
                              onChange={(e) => setModalSearch(e.target.value)}
                              placeholder={lang === 'bn' ? 'সোশ্যাল মিডিয়া কাজ খুঁজুন...' : 'Search social tasks...'}
                              className="w-full bg-white border border-slate-200 rounded-xl pl-8.5 pr-3 py-2 text-[11px] text-slate-700 focus:border-amber-400 outline-none"
                            />
                          </div>

                          <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar">
                            {['All', 'Facebook', 'YouTube', 'Telegram', 'WhatsApp', 'TikTok'].map((mPlatform) => (
                              <button
                                key={mPlatform}
                                type="button"
                                onClick={() => {
                                  setModalPlatform(mPlatform);
                                  setModalVisibleCount(5);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                                  modalPlatform === mPlatform
                                    ? 'bg-[#0f172a] text-white'
                                    : 'bg-white text-slate-500 border border-slate-200'
                                }`}
                              >
                                {lang === 'bn'
                                  ? mPlatform === 'All' ? 'সব টাস্ক' : mPlatform === 'Send' ? 'টেলিগ্রাম' : mPlatform
                                  : mPlatform}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* List of Tasks */}
                        <div className="space-y-2.5">
                          {modalMicroTasks
                            .filter((t) => {
                              const matchesSearch =
                                t.titleBn.toLowerCase().includes(modalSearch.toLowerCase()) ||
                                t.titleEn.toLowerCase().includes(modalSearch.toLowerCase());
                              const matchesPlatform = modalPlatform === 'All' || t.platform === modalPlatform;
                              return matchesSearch && matchesPlatform;
                            })
                            .slice(0, modalVisibleCount)
                            .map((task) => {
                              const TaskIcon = (Icons as any)[task.iconName] || Icons.Zap;
                              const isRunning = activeMicroId === task.id;
                              const progressPercent = Math.round((task.completedCount / task.maxTarget) * 100);

                              return (
                                <div
                                  key={task.id}
                                  className={`bg-white rounded-xl border p-3 flex flex-col transition-all duration-200 ${
                                    task.completed ? 'border-emerald-200 bg-emerald-50/5' : 'border-slate-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <div className={`w-8.5 h-8.5 rounded-lg ${task.bgColor} ${task.iconColor} flex items-center justify-center flex-shrink-0`}>
                                        <TaskIcon className="w-4 h-4" />
                                      </div>
                                      <div className="min-w-0">
                                        <h5 className="font-bold text-slate-800 text-[11px] md:text-xs truncate">
                                          {lang === 'bn' ? task.titleBn : task.titleEn}
                                        </h5>
                                        <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-slate-400 font-bold">
                                          <span className="text-emerald-600 font-extrabold font-mono">
                                            +৳{modalToBnNum((task.reward * 100).toFixed(0))}
                                          </span>
                                          <span>•</span>
                                          <span>{lang === 'bn' ? `${modalToBnNum(task.timeSec)} সেকেন্ড` : `${task.timeSec}s`}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex-shrink-0 ml-1.5">
                                      {task.completed ? (
                                        <span className="bg-emerald-100 text-emerald-800 text-[9px] px-2 py-1 rounded-lg font-black flex items-center gap-0.5">
                                          ✓ {lang === 'bn' ? 'সম্পন্ন' : 'Claimed'}
                                        </span>
                                      ) : isRunning ? (
                                        <span className="text-[9px] font-extrabold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg animate-pulse">
                                          {lang === 'bn' ? 'চলছে...' : 'Running...'}
                                        </span>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() => startModalMicroTask(task)}
                                          disabled={activeMicroId !== null}
                                          className="bg-[#0f172a] text-white font-bold px-3 py-1 rounded-lg text-[10px] hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
                                        >
                                          {lang === 'bn' ? 'ক্লেম' : 'Claim'}
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {isRunning && (
                                    <div className="mt-2.5 space-y-1">
                                      <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                                        <span>{lang === 'bn' ? 'লিঙ্ক ভেরিফাই করা হচ্ছে...' : 'Validating redirection...'}</span>
                                        <span>{Math.round(microProgress)}%</span>
                                      </div>
                                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-amber-500 rounded-full transition-all duration-100"
                                          style={{ width: `${microProgress}%` }}
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {/* Progress bar ratio for community engagement */}
                                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-400">
                                    <span className="font-semibold">{lang === 'bn' ? 'এনগেজমেন্ট রেশিও:' : 'Ratio:'}</span>
                                    <span className="font-mono font-bold">
                                      {modalToBnNum(task.completedCount)} / {modalToBnNum(task.maxTarget)} ({modalToBnNum(progressPercent)}%)
                                    </span>
                                  </div>
                                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1">
                                    <div
                                      className="h-full bg-slate-300 rounded-full"
                                      style={{ width: `${progressPercent}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}

                          {/* Show more button in modal micro tasks */}
                          {modalMicroTasks.filter((t) => {
                            const matchesSearch =
                              t.titleBn.toLowerCase().includes(modalSearch.toLowerCase()) ||
                              t.titleEn.toLowerCase().includes(modalSearch.toLowerCase());
                            const matchesPlatform = modalPlatform === 'All' || t.platform === modalPlatform;
                            return matchesSearch && matchesPlatform;
                          }).length > modalVisibleCount && (
                            <button
                              type="button"
                              onClick={() => setModalVisibleCount((prev) => prev + 5)}
                              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-2 rounded-xl text-[10px] border border-slate-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Icons.ChevronDown className="w-3.5 h-3.5" />
                              <span>{lang === 'bn' ? 'আরো সোশ্যাল টাস্ক লোড করুন' : 'Load More Social Tasks'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 6. DATA ENTRY SIMULATION (100 CLIENTS) */}
                  {job.id === 'data-entry-work' && (
                    <div className="space-y-6">
                      {/* Work Instruction Box */}
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                        <h4 className="font-black text-sm text-emerald-900 mb-1 flex items-center gap-2">
                          <Icons.FileSpreadsheet className="w-4 h-4" />
                          {lang === 'bn' ? 'ডাটা এন্ট্রি নির্দেশনাবলী:' : 'Data Entry Instructions:'}
                        </h4>
                        <p className="text-[11px] text-emerald-700 leading-relaxed font-medium">
                          {lang === 'bn' 
                            ? 'বাম পাশের তালিকা থেকে ক্লায়েন্ট সিলেক্ট করুন। এরপর এক্সেল শিটে তাদের সার্ভিসের মূল্য এবং পরিমাণ বসিয়ে সঠিক রিপোর্ট লিঙ্ক সাবমিট করে "ডাটাশিট সাবমিট করুন" বাটনে ক্লিক করুন।' 
                            : 'Select a client from the directory. Enter service prices and quantities in the Excel grid, provide a report link, then click "Submit Client Datasheet".'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 100 Clients Sidebar/List */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-[500px]">
                          <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{lang === 'bn' ? 'ক্লায়েন্ট ডিরেক্টরি (১০০)' : 'Client Directory (100)'}</span>
                            <Icons.Users className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <div className="flex-1 overflow-y-auto no-scrollbar">
                            {clientsData.map((client, idx) => (
                              <button
                                key={client.uid}
                                onClick={() => setSelectedClientIndex(idx)}
                                className={`w-full p-3 text-left hover:bg-slate-50 transition-colors flex items-center justify-between border-b border-slate-100 last:border-0 ${selectedClientIndex === idx ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''}`}
                              >
                                <div>
                                  <h4 className="font-bold text-[11px] text-slate-800 truncate max-w-[120px]">{client.name}</h4>
                                  <p className="text-[9px] text-slate-400">{client.uid}</p>
                                </div>
                                {client.submitted ? (
                                  <Icons.CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-slate-200 shrink-0" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Work Area / Spreadsheet */}
                        <div className="space-y-4">
                          <div className="bg-slate-900 p-4 rounded-2xl text-white shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                                <Icons.User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-black text-sm">{clientsData[selectedClientIndex]?.name}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{clientsData[selectedClientIndex]?.uid}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                                <span className="text-[8px] text-slate-400 font-bold uppercase block mb-0.5">{lang === 'bn' ? 'ফোন নম্বর' : 'Phone'}</span>
                                <span className="text-xs font-bold text-slate-200">{clientsData[selectedClientIndex]?.phone}</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                                <span className="text-[8px] text-slate-400 font-bold uppercase block mb-0.5">{lang === 'bn' ? 'বিভাগ' : 'Division'}</span>
                                <span className="text-xs font-bold text-slate-200">{clientsData[selectedClientIndex]?.division}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                              <table className="w-full text-[10px] text-left text-slate-700">
                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold sticky top-0 z-10">
                                  <tr>
                                    <th className="p-2">Code</th>
                                    <th className="p-2">Item</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Qty</th>
                                    <th className="p-2">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gridData.map((item, index) => (
                                    <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                      <td className="p-2 font-mono text-slate-400">{item.code}</td>
                                      <td className="p-2 font-bold text-slate-600 truncate max-w-[80px]">{item.name}</td>
                                      <td className="p-2">
                                        <input
                                          type="number"
                                          value={item.price || ''}
                                          onChange={(e) => updateGridValue(index, 'price', e.target.value)}
                                          className="w-12 bg-transparent border-b border-slate-200 focus:border-indigo-500 outline-none p-0.5 text-center"
                                        />
                                      </td>
                                      <td className="p-2">
                                        <input
                                          type="number"
                                          value={item.qty || ''}
                                          onChange={(e) => updateGridValue(index, 'qty', e.target.value)}
                                          className="w-8 bg-transparent border-b border-slate-200 focus:border-indigo-500 outline-none p-0.5 text-center"
                                        />
                                      </td>
                                      <td className="p-2 font-black text-indigo-600">${item.total.toFixed(0)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            
                            <div className="bg-slate-900 p-3 flex items-center justify-between text-white">
                              <span className="text-[10px] font-bold uppercase">{lang === 'bn' ? 'গ্র্যান্ড টোটাল' : 'GRAND TOTAL'}</span>
                              <span className="text-sm font-black font-mono">${gridData.reduce((acc, curr) => acc + curr.total, 0).toFixed(0)}</span>
                            </div>
                          </div>

                          {/* Link Submission Field */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block ml-1">
                              {lang === 'bn' ? 'রিপোর্ট সাবমিশন লিঙ্ক (Drive/Doc):' : 'Report Submission Link (Drive/Doc):'}
                            </label>
                            <div className="relative">
                              <Icons.Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={reportLinkInput}
                                onChange={(e) => setReportLinkInput(e.target.value)}
                                placeholder="https://drive.google.com/..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs focus:bg-white focus:border-indigo-500 outline-none transition-all"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleGridSubmit}
                            disabled={taskStatus === 'running' || clientsData[selectedClientIndex]?.submitted}
                            className={`w-full font-black py-3.5 rounded-2xl text-xs transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-md ${
                              clientsData[selectedClientIndex]?.submitted 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                          >
                            {taskStatus === 'running' ? (
                              <>
                                <Icons.Loader2 className="w-4 h-4 animate-spin" />
                                {lang === 'bn' ? 'ডাটাশিট ভেরিফাই হচ্ছে...' : 'Verifying Datasheet...'}
                              </>
                            ) : clientsData[selectedClientIndex]?.submitted ? (
                              <>
                                <Icons.CheckCircle2 className="w-4 h-4" />
                                {lang === 'bn' ? 'ডাটা সাবমিট করা হয়েছে' : 'Data Already Submitted'}
                              </>
                            ) : (
                              <>
                                <Icons.Send className="w-4 h-4" />
                                {lang === 'bn' ? 'ডাটাশিট সাবমিট করুন' : 'Submit Client Datasheet'}
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 7. VIDEO SUBMIT SIMULATION */}
                  {job.id === 'video-submit-work' && (
                    <div className="space-y-4">
                      {/* Real YouTube Video Player */}
                      <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-black">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/8BDa9vuxjdE"
                          title="Training Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>

                      <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 block">{lang === 'bn' ? 'ভিডিও রেটিং (Rating):' : 'Video Rating:'}</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setVideoRating(star)}
                                className="text-amber-400 hover:scale-110 transition-all"
                              >
                                <Icons.Star className={`w-6 h-6 ${star <= videoRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 block">{lang === 'bn' ? 'ভিডিওর ফিডব্যাক রিভিউ (২টি বাক্য):' : 'Your Training Review Feedback (2 sentences):'}</label>
                          <textarea
                            value={videoFeedback}
                            onChange={(e) => setVideoFeedback(e.target.value)}
                            placeholder={lang === 'bn' ? 'যেমন: ভিডিওটি অনেক শিক্ষণীয় ছিল এবং টাইপিং কাজ শুরু করার চমৎকার নিয়মাবলি দেওয়া আছে।' : 'e.g. This training is very explicit. It describes the data validation rules clearly and easily.'}
                            className="w-full h-20 border border-slate-200 rounded-xl p-2.5 text-slate-700 text-xs focus:border-pink-400 focus:ring-1 focus:ring-pink-400 outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 block">{lang === 'bn' ? 'সোশ্যাল মিডিয়া শেয়ার লিঙ্ক (Verification URL):' : 'Verification Share Link:'}</label>
                          <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg p-2 text-xs font-mono text-indigo-600 outline-none bg-slate-100"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleVideoReviewSubmit}
                        disabled={taskStatus === 'running'}
                        className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl text-xs hover:bg-pink-600 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                      >
                        {taskStatus === 'running' ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            {lang === 'bn' ? 'রিভিউ প্রসেস হচ্ছে...' : 'Submitting Training Feedback...'}
                          </>
                        ) : (
                          lang === 'bn' ? 'রিভিউ সাবমিট করুন' : 'Submit Review and Earn'
                        )}
                      </button>
                    </div>
                  )}

                  {/* 8. PRODUCT SELLING WORK SIMULATION */}
                  {job.id === 'product-selling-work' && (
                    <div className="space-y-6">
                      {/* Premium E-commerce Affiliate Banner */}
                      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] text-white p-5 rounded-3xl relative overflow-hidden shadow-lg border border-slate-700/50">
                        <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                          <Icons.Rss className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 space-y-1">
                          <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block shadow-sm">
                            {lang === 'bn' ? '২৫% - ৩৫% মেগা লাভ অফার' : '25% - 35% Mega Profit'}
                          </span>
                          <h3 className="text-lg font-extrabold leading-tight">
                            {lang === 'bn' ? 'টেলিকম সিম অফার ও এমবি রিসেলিং পোর্টাল' : 'Telecom SIM Offer & MB Reselling Portal'}
                          </h3>
                          <p className="text-white/85 text-xs">
                            {lang === 'bn' ? 'জিপি, বাংলালিংক, রবি, এয়ারটেল ও টেলিটকের ইন্টারনেট অফার বিক্রি করে ইনস্ট্যান্ট ডিল কমিশন সরাসরি আয় করুন।' : 'Resell top operator packages below and earn instant commission directly into your account.'}
                          </p>
                        </div>
                      </div>

                      {/* Search Bar & Add Product Toggle Button */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                          <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                            placeholder={lang === 'bn' ? 'অপারেটর বা অফার খুঁজুন (যেমন: GP, Robi, ৩০ জিবি)...' : 'Search operators or offers...'}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-700 focus:bg-white focus:border-amber-400 outline-none transition-all"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddProductForm(!showAddProductForm);
                            setErrorMessage('');
                          }}
                          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            showAddProductForm
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {showAddProductForm ? <Icons.X className="w-4 h-4" /> : <Icons.Plus className="w-4 h-4" />}
                          <span>{lang === 'bn' ? 'কাস্টম অফার এড করুন' : 'Add Custom Offer'}</span>
                        </button>
                      </div>

                      {/* Expandable "Add your own product" Form */}
                      {showAddProductForm && (
                        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 space-y-4 animate-fade-in relative">
                          <div className="absolute top-4 right-4 text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                            {lang === 'bn' ? '৩০% লাভ সিস্টেম' : 'System: 30% Profit'}
                          </div>
                          <h4 className="text-xs font-extrabold text-slate-700 uppercase flex items-center gap-1.5">
                            <Icons.PackagePlus className="w-4 h-4 text-emerald-600" />
                            {lang === 'bn' ? 'নতুন অফার আপলোড ফর্ম' : 'Upload Your Custom SIM Offer'}
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Product Name Bn */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">
                                {lang === 'bn' ? 'অফারের নাম (বাংলা):' : 'Offer Name (Bengali):'}
                              </label>
                              <input
                                type="text"
                                value={newProdNameBn}
                                onChange={(e) => setNewProdNameBn(e.target.value)}
                                placeholder="যেমন: জিপি ৪০ জিবি + ১০০০ মিনিট (৩০ দিন)"
                                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 bg-white focus:border-emerald-400 outline-none"
                              />
                            </div>

                            {/* Product Name En */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">
                                {lang === 'bn' ? 'অফারের নাম (ইংরেজি):' : 'Offer Name (English):'}
                              </label>
                              <input
                                type="text"
                                value={newProdNameEn}
                                onChange={(e) => setNewProdNameEn(e.target.value)}
                                placeholder="e.g. GP 40 GB + 1000 Min (30 Days)"
                                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 bg-white focus:border-emerald-400 outline-none"
                              />
                            </div>

                            {/* Product Price */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">
                                {lang === 'bn' ? 'অফারের মূল্য (টাকা):' : 'Offer Price (BDT):'}
                              </label>
                              <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold font-mono">৳</span>
                                <input
                                  type="number"
                                  value={newProdPrice}
                                  onChange={(e) => setNewProdPrice(e.target.value)}
                                  placeholder="e.g. 499"
                                  className="w-full border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-700 bg-white focus:border-emerald-400 outline-none font-mono"
                                />
                              </div>
                              {newProdPrice && !isNaN(Number(newProdPrice)) && (
                                <p className="text-[10px] text-emerald-600 font-bold mt-1">
                                  {lang === 'bn' 
                                    ? `✨ ৩০% রিসেলার প্রফিট হিসেবে আপনি পাবেন: ৳${modalToBnNum(Math.round(Number(newProdPrice) * 0.3))}`
                                    : `✨ 30% Reseller Profit: ৳${Math.round(Number(newProdPrice) * 0.3)}`}
                                </p>
                              )}
                            </div>

                            {/* Product Link */}
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 block">
                                {lang === 'bn' ? 'ডিলার সোর্স লিংক / ইউআরএল:' : 'Dealer Source Link / URL:'}
                              </label>
                              <input
                                type="text"
                                value={newProdLink}
                                onChange={(e) => setNewProdLink(e.target.value)}
                                placeholder="https://telecom-portal.com/pack"
                                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 bg-white focus:border-emerald-400 outline-none font-mono"
                              />
                            </div>
                          </div>

                          {/* Operator Brand Selection */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 block">
                              {lang === 'bn' ? 'মোবাইল অপারেটর নির্বাচন করুন:' : 'Select Mobile Operator:'}
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                              {[
                                { code: 'GP', name: 'Grameenphone', color: 'bg-blue-600' },
                                { code: 'BL', name: 'Banglalink', color: 'bg-orange-500' },
                                { code: 'Robi', name: 'Robi', color: 'bg-red-500' },
                                { code: 'Airtel', name: 'Airtel', color: 'bg-rose-600' },
                                { code: 'Teletalk', name: 'Teletalk', color: 'bg-emerald-600' }
                              ].map((op) => (
                                <button
                                  type="button"
                                  key={op.code}
                                  onClick={() => {
                                    setNewProdOperator(op.code);
                                    setNewProdImage('');
                                  }}
                                  className={`py-2 px-1 rounded-xl text-[10px] font-extrabold text-white transition-all cursor-pointer text-center ${op.color} ${
                                    newProdOperator === op.code ? 'ring-4 ring-slate-900/30 scale-105' : 'opacity-70'
                                  }`}
                                >
                                  {op.code}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (!newProdNameBn.trim() || !newProdNameEn.trim() || !newProdPrice.trim()) {
                                setErrorMessage(lang === 'bn' ? 'দয়া করে নাম এবং মূল্য প্রদান করুন!' : 'Please fill out product names and price!');
                                return;
                              }
                              const parsedPrice = Number(newProdPrice);
                              if (isNaN(parsedPrice) || parsedPrice <= 0) {
                                setErrorMessage(lang === 'bn' ? 'মূল্য সঠিক সংখ্যা হতে হবে!' : 'Price must be a valid positive number!');
                                return;
                              }

                              const commission = Math.round(parsedPrice * 0.3);
                              const newProduct = {
                                id: `custom_${Date.now()}`,
                                nameBn: newProdNameBn,
                                nameEn: newProdNameEn,
                                price: parsedPrice,
                                commission,
                                image: '',
                                operator: newProdOperator,
                                link: newProdLink.trim() || 'https://telecom-portal.com/pack',
                                custom: true
                              };

                              setResellingProducts((prev) => [newProduct, ...prev]);
                              setNewProdNameBn('');
                              setNewProdNameEn('');
                              setNewProdPrice('');
                              setNewProdLink('');
                              setNewProdImage('');
                              setShowAddProductForm(false);
                              setErrorMessage('');
                            }}
                            className="w-full bg-[#0f172a] text-white font-bold py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Icons.CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span>{lang === 'bn' ? 'অফার যুক্ত করুন' : 'Add SIM Offer to Listing'}</span>
                          </button>
                        </div>
                      )}

                      {/* Product selector - e-Commerce Grid */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 block flex items-center gap-1.5">
                          <Icons.ShoppingBag className="w-4 h-4 text-amber-500" />
                          {lang === 'bn' ? 'পছন্দের সিম অফারটি সিলেক্ট করুন:' : 'Select Mobile Operator SIM Offer:'}
                        </label>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[420px] overflow-y-auto pr-1 no-scrollbar border border-slate-100 p-2 rounded-2xl bg-slate-50/50">
                          {resellingProducts
                            .filter((p) => {
                              const match =
                                p.nameBn.toLowerCase().includes(productSearch.toLowerCase()) ||
                                p.nameEn.toLowerCase().includes(productSearch.toLowerCase()) ||
                                (p.operator && p.operator.toLowerCase().includes(productSearch.toLowerCase()));
                              return match;
                            })
                            .map((p, idx) => {
                              // Find true global index in state array to update selectedProductIndex correctly
                              const originalIdx = resellingProducts.findIndex(item => item.id === p.id);
                              const isSelected = selectedProductIndex === originalIdx;

                              return (
                                <button
                                  type="button"
                                  key={p.id}
                                  onClick={() => {
                                    setSelectedProductIndex(originalIdx);
                                    setGeneratedLink('');
                                  }}
                                  className={`rounded-2xl border text-left flex flex-col overflow-hidden transition-all relative cursor-pointer group ${
                                    isSelected
                                      ? 'bg-amber-50/40 border-amber-400 ring-2 ring-amber-400/25 shadow-sm'
                                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                                  }`}
                                >
                                  {/* Product Card Graphic / Image */}
                                  <div className="relative w-full h-24 flex-shrink-0 overflow-hidden">
                                    {p.operator ? (
                                      <div className={`w-full h-full flex flex-col items-center justify-center p-2 text-white font-black text-center select-none group-hover:scale-105 transition-all duration-300 ${
                                        p.operator === 'GP' ? 'bg-gradient-to-br from-blue-500 to-sky-600' :
                                        p.operator === 'BL' ? 'bg-gradient-to-br from-orange-500 to-amber-600' :
                                        p.operator === 'Robi' ? 'bg-gradient-to-br from-red-500 to-orange-600' :
                                        p.operator === 'Airtel' ? 'bg-gradient-to-br from-red-600 to-rose-700' :
                                        'bg-gradient-to-br from-emerald-600 to-teal-700'
                                      }`}>
                                        <div className="text-[9px] font-extrabold bg-white/20 px-2 py-0.5 rounded-full mb-1 tracking-wider uppercase">
                                          {p.operator} 4G
                                        </div>
                                        <div className="text-[12px] font-black tracking-tight drop-shadow-sm truncate w-full px-1">
                                          {p.nameEn.replace(/GP|BL|Robi|Airtel|Teletalk/g, '').trim()}
                                        </div>
                                        <div className="text-[8px] text-white/90 font-medium mt-0.5">
                                          {p.nameEn.includes('30 Days') || p.nameEn.includes('৩০ দিন') ? '30 Days Validity' : '7 Days Validity'}
                                        </div>
                                      </div>
                                    ) : (
                                      <img
                                        src={p.image}
                                        alt={p.nameEn}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80';
                                        }}
                                      />
                                    )}
                                    <div className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                                      {lang === 'bn' ? `৳${modalToBnNum(p.commission)} লাভ` : `৳${p.commission} Profit`}
                                    </div>
                                    {p.custom && (
                                      <div className="absolute top-1.5 right-1.5 bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase shadow-sm">
                                        {lang === 'bn' ? 'কাস্টম' : 'My'}
                                      </div>
                                    )}
                                  </div>

                                  {/* Details */}
                                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                                    <h4 className="font-extrabold text-[#0f172a] text-[10px] sm:text-xs leading-tight line-clamp-2">
                                      {lang === 'bn' ? p.nameBn : p.nameEn}
                                    </h4>
                                    
                                    <div className="mt-2 space-y-0.5">
                                      <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-slate-400">{lang === 'bn' ? 'অফার মূল্য:' : 'Offer Price:'}</span>
                                        <span className="text-slate-800 font-extrabold font-mono">৳{modalToBnNum(p.price)}</span>
                                      </div>
                                      <div className="flex justify-between items-center text-[10px] bg-emerald-50 px-1 py-0.5 rounded border border-emerald-100 text-emerald-800 font-bold">
                                        <span>{lang === 'bn' ? 'আপনার লাভ:' : 'Your Profit:'}</span>
                                        <span className="font-mono">৳{modalToBnNum(p.commission)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                      </div>

                      {/* Selected product tracking details panel */}
                      {resellingProducts[selectedProductIndex] && (
                        <div className="bg-slate-50 border border-slate-200/80 p-4.5 rounded-3xl space-y-4">
                          <div className="flex gap-3 items-center">
                            {resellingProducts[selectedProductIndex].operator ? (
                              <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-white font-extrabold text-[10px] select-none shadow-sm ${
                                resellingProducts[selectedProductIndex].operator === 'GP' ? 'bg-blue-600' :
                                resellingProducts[selectedProductIndex].operator === 'BL' ? 'bg-orange-500' :
                                resellingProducts[selectedProductIndex].operator === 'Robi' ? 'bg-red-500' :
                                resellingProducts[selectedProductIndex].operator === 'Airtel' ? 'bg-rose-600' :
                                'bg-emerald-600'
                              }`}>
                                {resellingProducts[selectedProductIndex].operator}
                              </div>
                            ) : (
                              <img
                                src={resellingProducts[selectedProductIndex].image}
                                alt="selected"
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                              />
                            )}
                            <div>
                              <span className="text-[9px] text-amber-600 font-extrabold uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                                {lang === 'bn' ? 'নির্বাচিত সিম অফার' : 'Selected SIM Offer'}
                              </span>
                              <h4 className="font-extrabold text-slate-800 text-xs mt-0.5">
                                {lang === 'bn' ? resellingProducts[selectedProductIndex].nameBn : resellingProducts[selectedProductIndex].nameEn}
                              </h4>
                            </div>
                          </div>

                          {/* Generate tracking link */}
                          <div className="space-y-2">
                            <button
                              type="button"
                              onClick={handleResellingLinkGen}
                              className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <Icons.Link2 className="w-4 h-4 text-amber-400" />
                              <span>{lang === 'bn' ? 'ইউনিক অফার ট্র্যাকিং লিঙ্ক তৈরি করুন' : 'Generate Offer Affiliate Link'}</span>
                            </button>

                            {generatedLink && (
                              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 text-[10px] sm:text-xs font-mono select-all text-indigo-600 text-center flex items-center justify-center gap-1">
                                <Icons.ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
                                <span>{generatedLink}</span>
                              </div>
                            )}
                          </div>

                          {/* Sales lead info */}
                          <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-slate-200">
                            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <Icons.UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                              {lang === 'bn' ? 'ক্রেতার বুকিং এন্ট্রি (অফারের বিবরণ):' : 'Buyer Delivery & Order Booking Form:'}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-600 block">{lang === 'bn' ? 'ক্রেতার মোবাইল নম্বর:' : "Buyer's Phone Number:"}</label>
                                <input
                                  type="text"
                                  value={buyerName}
                                  onChange={(e) => setBuyerName(e.target.value)}
                                  placeholder="e.g. 01712345678"
                                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 focus:border-amber-400 outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-600 block">{lang === 'bn' ? 'অপারেটর বিভাগ / ডিভিশন:' : 'Operator Circle / Division:'}</label>
                                <input
                                  type="text"
                                  value={buyerAddress}
                                  onChange={(e) => setBuyerAddress(e.target.value)}
                                  placeholder="e.g. Dhaka, Chittagong, All BD"
                                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 focus:border-amber-400 outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleResellingSubmit}
                        disabled={taskStatus === 'running'}
                        className="w-full bg-amber-500 text-white font-bold py-3.5 rounded-2xl text-xs hover:bg-amber-600 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        {taskStatus === 'running' ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            {lang === 'bn' ? 'অপারেটর পোর্টালে অফার সাকসেসফুলি একটিভেট হচ্ছে...' : 'Activating SIM offer in telecom portal...'}
                          </>
                        ) : (
                          <>
                            <Icons.BadgeCheck className="w-4 h-4" />
                            <span>{lang === 'bn' ? 'সিম অফার অর্ডার সাবমিট ও কমিশন দাবি করুন' : 'Submit SIM Offer Order & Claim Profit'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* 9. PHOTO EDITING SIMULATION */}
                  {job.id === 'photo-editing' && (
                    <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-scale-up">
                      <div className="bg-indigo-50/75 p-5 rounded-xl border border-indigo-100/50 space-y-3">
                        <div className="flex items-center gap-2 text-indigo-700">
                          <Icons.Info className="w-5 h-5" />
                          <span className="font-extrabold text-sm uppercase tracking-wider">
                            {lang === 'bn' ? 'কাজের বিবরণ ও নির্দেশনাবলী' : 'Job Description & Instructions'}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-slate-800 leading-relaxed">
                          {activeSubTask?.descBn}
                        </div>
                        <div className="pt-2.5 border-t border-indigo-100/60 text-xs text-indigo-600 font-medium">
                          <span className="font-bold text-slate-700 block mb-1">
                            {lang === 'bn' ? 'কেন এই কাজ বা ফটো বানানো হয়?' : 'Why is this photo or design made?'}
                          </span>
                          {activeSubTask?.whyBn}
                        </div>
                      </div>

                      {/* URL Submission Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">
                          {lang === 'bn' ? 'কাজের ক্যানভা (Canva) অথবা শেয়ার লিংকটি দিন:' : 'Provide Canva or Work Share Link:'}
                        </label>
                        <div className="relative">
                          <Icons.Link className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="https://canva.com/design/..."
                            value={editingSubmitLink}
                            onChange={(e) => setEditingSubmitLink(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all text-slate-800"
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {lang === 'bn'
                            ? '*আপনি ক্যানভা বা অন্য যেকোনো প্ল্যাটফর্মে ডিজাইনটি তৈরি করে তার শেয়ার লিংকটি এখানে পেস্ট করবেন।'
                            : '*Create your design on Canva or any platform and paste the share/published link here.'}
                        </p>
                      </div>

                      <button
                        onClick={handlePhotoSubmit}
                        disabled={taskStatus === 'running'}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        {taskStatus === 'running' ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            {lang === 'bn' ? 'লিংক ও ফাইল ভেরিফাই করা হচ্ছে...' : 'Verifying link and files...'}
                          </>
                        ) : (
                          lang === 'bn' ? 'এডিটিং সম্পূর্ণ করে প্রজেক্ট সাবমিট করুন' : 'Submit Completed Project'
                        )}
                      </button>
                    </div>
                  )}

                  {job.id === 'video-editing' && (
                    <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-scale-up">
                      <div className="bg-emerald-50/75 p-5 rounded-xl border border-emerald-100/50 space-y-3">
                        <div className="flex items-center gap-2 text-emerald-700">
                          <Icons.Info className="w-5 h-5" />
                          <span className="font-extrabold text-sm uppercase tracking-wider">
                            {lang === 'bn' ? 'কাজের বিবরণ ও নির্দেশনাবলী' : 'Job Description & Instructions'}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-slate-800 leading-relaxed">
                          {activeSubTask?.descBn}
                        </div>
                        <div className="pt-2.5 border-t border-emerald-100/60 text-xs text-emerald-600 font-medium">
                          <span className="font-bold text-slate-700 block mb-1">
                            {lang === 'bn' ? 'কেন এই কাজ বা ভিডিও বানানো হয়?' : 'Why is this video made?'}
                          </span>
                          {activeSubTask?.whyBn}
                        </div>
                      </div>

                      {/* URL Submission Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">
                          {lang === 'bn' ? 'কাজের ভিডিও অথবা ড্রাইভ শেয়ার লিংকটি দিন:' : 'Provide Edited Video or Drive Share Link:'}
                        </label>
                        <div className="relative">
                          <Icons.Link className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="https://youtube.com/shorts/... বা গুগল ড্রাইভ লিংক"
                            value={editingSubmitLink}
                            onChange={(e) => setEditingSubmitLink(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all text-slate-800"
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {lang === 'bn'
                            ? '*আপনি ক্যানভা, ক্যাপকাট বা যেকোনো টুল দিয়ে ভিডিওটি বানিয়ে ইউটিউব শর্টস, রিল অথবা ড্রাইভ লিংক এখানে পেস্ট করবেন।'
                            : '*Create your video using Canva, CapCut or any tool and paste the YouTube shorts, reel, or Drive link here.'}
                        </p>
                      </div>

                      <button
                        onClick={handleVideoEditingSubmit}
                        disabled={taskStatus === 'running'}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        {taskStatus === 'running' ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            {lang === 'bn' ? 'ভিডিও লিংক ও এডিটিং প্রজেক্ট যাচাই করা হচ্ছে...' : 'Verifying video link and editing files...'}
                          </>
                        ) : (
                          lang === 'bn' ? 'ভিডিও প্রজেক্ট সাবমিট করুন' : 'Submit Video Project'
                        )}
                      </button>
                    </div>
                  )}

                  {/* 11. COMPUTER TRAINING SIMULATION */}
                  {job.id === 'computer-training' && (
                    <div className="space-y-4">
                      {/* Active SubTask: Admin Terminal */}
                      {activeSubTaskId === 'comp-1' && (
                        <div className="space-y-3">
                          <div className="bg-slate-950 rounded-2xl p-4 font-mono text-[11px] text-emerald-400 border border-slate-800 shadow-inner h-52 overflow-y-auto space-y-1.5">
                            {compTerminalOutput.map((line, i) => (
                              <div key={i} className="whitespace-pre-line leading-relaxed">
                                {line}
                              </div>
                            ))}
                          </div>

                          <div
                            onClick={(e) => {
                              // Prevent default click propagation if needed
                            }}
                            className="flex gap-2"
                          >
                            <input
                              type="text"
                              value={compCurrentCommand}
                              onChange={(e) => setCompCurrentCommand(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleTerminalCommand(compCurrentCommand);
                                }
                              }}
                              placeholder={lang === 'bn' ? 'এখানে কমান্ড টাইপ করে Enter চাপুন (যেমন: mkdir workspace)' : 'Type command here and press Enter (e.g. mkdir workspace)'}
                              className="flex-1 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-800 outline-none focus:border-indigo-400"
                            />
                            <button
                              type="button"
                              onClick={() => handleTerminalCommand(compCurrentCommand)}
                              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 rounded-xl cursor-pointer"
                            >
                              {lang === 'bn' ? 'রান' : 'Run'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Active SubTask: Excel Formulas */}
                      {activeSubTaskId === 'comp-2' && (
                        <div className="space-y-4">
                          <div className="overflow-x-auto border border-slate-200 rounded-xl">
                            <table className="w-full text-xs text-left text-slate-700 font-mono">
                              <thead className="bg-slate-100 border-b border-slate-200 font-bold">
                                <tr>
                                  <th className="p-2 border-r border-slate-200">Cell</th>
                                  <th className="p-2">Corporate Sales Ledger Value ($)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-slate-100">
                                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-200">A1</td>
                                  <td className="p-2">120</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-200">A2</td>
                                  <td className="p-2">340</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-200">A3</td>
                                  <td className="p-2">210</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-200">A4</td>
                                  <td className="p-2">150</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                  <td className="p-2 bg-slate-50 font-bold border-r border-slate-200">A5</td>
                                  <td className="p-2">180</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600 block">
                                {lang === 'bn' ? '১. টোটাল সেলস ক্যালকুলেট করার ফর্মুলা (A1 থেকে A5):' : '1. Formula to Calculate Total Sales (A1 to A5):'}
                              </label>
                              <input
                                type="text"
                                value={compSpreadsheetFormulas.formula1}
                                onChange={(e) => setCompSpreadsheetFormulas({ ...compSpreadsheetFormulas, formula1: e.target.value })}
                                placeholder="e.g. =SUM(A1:A5)"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs font-mono uppercase focus:border-indigo-400 outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600 block">
                                {lang === 'bn' ? '২. গড়ের ফর্মুলা ক্যালকুলেট করুন (Average A1 থেকে A5):' : '2. Formula to Calculate Average Sales (A1 to A5):'}
                              </label>
                              <input
                                type="text"
                                value={compSpreadsheetFormulas.formula2}
                                onChange={(e) => setCompSpreadsheetFormulas({ ...compSpreadsheetFormulas, formula2: e.target.value })}
                                placeholder="e.g. =AVERAGE(A1:A5)"
                                className="w-full border border-slate-200 rounded-lg p-2 text-xs font-mono uppercase focus:border-indigo-400 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Active SubTask: Shortcuts test */}
                      {activeSubTaskId === 'comp-3' && (
                        <div className="space-y-4">
                          {compActiveShortcutIndex < 4 ? (
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4 text-center">
                              <span className="text-[10px] text-indigo-600 font-bold block uppercase tracking-wider">
                                {lang === 'bn' ? `প্রশ্ন ${compActiveShortcutIndex + 1} / ৪` : `Question ${compActiveShortcutIndex + 1} of 4`}
                              </span>
                              <p className="font-bold text-sm text-slate-700">
                                {compActiveShortcutIndex === 0 && (lang === 'bn' ? 'ডকুমেন্ট বা ফাইলের কোন লেখা কপি করার শর্টকাট কি?' : 'What key combination copies selected text or elements?')}
                                {compActiveShortcutIndex === 1 && (lang === 'bn' ? 'কপি করা টেক্সট কোথাও পেস্ট করার শর্টকাট কি?' : 'What key combination pastes clipboard items?')}
                                {compActiveShortcutIndex === 2 && (lang === 'bn' ? 'পূর্বের করা ভুল আনডু (Undo) করার শর্টকাট কি?' : 'What key combination undos your last action?')}
                                {compActiveShortcutIndex === 3 && (lang === 'bn' ? 'ডকুমেন্টটি হার্ডড্রাইভে সেভ (Save) করার শর্টকাট কি?' : 'What key combination saves the current document?')}
                              </p>

                              <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                                {[
                                  { label: 'Ctrl + C', id: 'copy', target: 0 },
                                  { label: 'Ctrl + V', id: 'paste', target: 1 },
                                  { label: 'Ctrl + Z', id: 'undo', target: 2 },
                                  { label: 'Ctrl + S', id: 'save', target: 3 }
                                ].map((opt) => (
                                  <button
                                    key={opt.label}
                                    onClick={() => {
                                      if (opt.target === compActiveShortcutIndex) {
                                        setCompActiveShortcutIndex(compActiveShortcutIndex + 1);
                                        setErrorMessage('');
                                      } else {
                                        setErrorMessage(lang === 'bn' ? 'ভুল শর্টকাট! আবার চেষ্টা করুন।' : 'Incorrect shortcut! Try again.');
                                      }
                                    }}
                                    className="p-3 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer text-slate-700"
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl text-center space-y-2">
                              <span className="text-emerald-500 font-black text-3xl">🎉</span>
                              <h4 className="font-bold text-sm text-emerald-800">
                                {lang === 'bn' ? 'শর্টকাট টেস্ট সাফল্যের সাথে সম্পন্ন!' : 'All Shortcut Tests Completed!'}
                              </h4>
                              <p className="text-xs text-emerald-600">
                                {lang === 'bn' ? 'এখন আপনার কাজের কমিশন ব্যালেন্সে যোগ করার জন্য নিচে "সাবমিট" বাটনে ক্লিক করুন।' : 'Click the submit button below to verify your contract and claim your earnings.'}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={handleComputerTrainingSubmit}
                        disabled={taskStatus === 'running'}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {taskStatus === 'running' ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            {lang === 'bn' ? 'আইটি ল্যাব চেক হচ্ছে...' : 'Validating IT Labs...'}
                          </>
                        ) : (
                          lang === 'bn' ? 'ট্রেইনিং সম্পূর্ণতা সাবমিট করুন' : 'Submit Lab Certification'
                        )}
                      </button>
                    </div>
                  )}

                  {/* 12. PRODUCT CODE ENTRY */}
                  {job.id === 'code-entry' && (
                    <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-150 shadow-sm animate-scale-up">
                      {/* Instructions / Progress */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="text-xs font-bold text-slate-500">
                          {lang === 'bn' ? `পণ্য কোড বসানোর ধাপ: ${codeCurrentStep + 1} / ৪` : `Product Step: ${codeCurrentStep + 1} of 4`}
                        </span>
                        <div className="flex gap-1">
                          {[0, 1, 2, 3].map((stepIdx) => (
                            <div
                              key={stepIdx}
                              className={`w-3.5 h-1.5 rounded-full transition-all duration-300 ${
                                codeCompletedSteps[stepIdx]
                                  ? 'bg-indigo-600'
                                  : stepIdx === codeCurrentStep
                                  ? 'bg-indigo-300 w-6'
                                  : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Current Product details & Image */}
                      {(() => {
                        const activeId = activeSubTaskId || 'code-1';
                        const dataset = productCodeEntryData[activeId] || productCodeEntryData['code-1'];
                        const currentProduct = dataset[codeCurrentStep];

                        if (!currentProduct) return null;

                        return (
                          <div className="space-y-4">
                            {/* Product Image Frame */}
                            <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200/60 p-4 rounded-xl shadow-sm text-center">
                              <span className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full mb-3">
                                {lang === 'bn' ? 'সরাসরি প্রোডাক্টের ছবি' : 'Live Product Image'}
                              </span>
                              <img
                                src={currentProduct.image}
                                alt={currentProduct.nameEn}
                                referrerPolicy="no-referrer"
                                className="w-32 h-32 object-contain rounded-xl border border-slate-200 bg-white p-1 mb-2 shadow-sm animate-scale-up"
                              />
                              <h4 className="font-extrabold text-slate-800 text-sm">
                                {lang === 'bn' ? currentProduct.nameBn : currentProduct.nameEn}
                              </h4>
                              <p className="text-xs text-slate-500 font-semibold mt-1">
                                {lang === 'bn' ? `সিরিয়াল নাম্বার: ${currentProduct.serial}` : `Serial Number: ${currentProduct.serial}`}
                              </p>
                            </div>

                            {/* Reference Table (সিরিয়াল নাম্বার এবং তাদের কোড তালিকা) */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2.5">
                                {lang === 'bn' ? '🔍 ডাটা সিক্রেট রেফারেন্স শিট (সसही কোড খুঁজুন):' : '🔍 Secret Reference Sheet (Find Correct Code):'}
                              </span>
                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                {dataset.map((p, idx) => (
                                  <div
                                    key={p.serial}
                                    className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                                      idx === codeCurrentStep
                                        ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-bold ring-2 ring-indigo-200'
                                        : 'bg-white border-slate-150 text-slate-600'
                                    }`}
                                  >
                                    <span className="font-mono">{p.serial}</span>
                                    <span className="font-mono text-xs font-black tracking-wider text-indigo-700">{p.code}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Input Field and Confirm Button */}
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">
                                {lang === 'bn' ? 'উপরে রেফারেন্স শিট মিলিয়ে সঠিক কনফার্মেশন কোডটি বসান:' : 'Enter correct Confirmation Code from reference sheet:'}
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={codeInputValue}
                                  onChange={(e) => setCodeInputValue(e.target.value)}
                                  placeholder="e.g. CONF-XXXX"
                                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-black focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 uppercase"
                                />
                                <button
                                  onClick={handleCodeConfirm}
                                  className="px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                                >
                                  {codeCurrentStep === 3 ? (lang === 'bn' ? 'ফাইনাল সাবমিট' : 'Final Submit') : (lang === 'bn' ? 'কনফার্ম করুন' : 'Confirm Code')}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
