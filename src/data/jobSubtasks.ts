
export interface SubTask {
  id: string;
  titleEn: string;
  titleBn: string;
  difficultyEn: 'Easy' | 'Medium' | 'Hard';
  difficultyBn: string;
  rewardEn: string;
  rewardBn: string;
  rewardNum: number;
  descBn?: string;
  whyBn?: string;
}

export function getSubTasks(jobId: string): SubTask[] {
  switch (jobId) {
    case 'typing-job':
      return [
        { id: 'typing-1', titleEn: 'Property Deed Registry Ledger (Clip 1)', titleBn: 'সম্পত্তি দলিল রেজিস্ট্রি লেজার (ক্লিপ ১)', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-2', titleEn: 'Corporate Business Directories (Clip 2)', titleBn: 'কর্পোরেট ব্যবসা ডিরেক্টরি (ক্লিপ ২)', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-3', titleEn: 'E-commerce SKU Inventory (Clip 3)', titleBn: 'ই-কমার্স পণ্য ইনভেন্টরি (ক্লিপ ৩)', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-4', titleEn: 'Legal Court Transcripts (Clip 4)', titleBn: 'লিগ্যাল কোর্ট ট্রান্সক্রিপ্ট (ক্লিপ ৪)', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-5', titleEn: 'Medical Prescription Records (Clip 5)', titleBn: 'মেডিক্যাল প্রেসক্রিপশন রেকর্ড (ক্লিপ ৫)', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-6', titleEn: 'Government Archives Digitization (Clip 6)', titleBn: 'সরকারি আর্কাইভ ডিজিটাইজেশন (ক্লিপ ৬)', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-7', titleEn: 'Financial Audit Summaries (Clip 7)', titleBn: 'ফাইন্যান্সিয়াল অডিট সামারি (ক্লিপ ৭)', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-8', titleEn: 'Customer Feedback Forms (Clip 8)', titleBn: 'কাস্টমার ফিডব্যাক ফর্ম (ক্লিপ ৮)', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-9', titleEn: 'Library Book Indexing (Clip 9)', titleBn: 'লাইব্রেরি বুক ইনডেক্সিং (ক্লিপ ৯)', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-10', titleEn: 'Logistics Shipping Manifests (Clip 10)', titleBn: 'লজিস্টিক শিপিং ম্যানিফেস্ট (ক্লিপ ১০)', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-11', titleEn: 'Scientific Research Data (Clip 11)', titleBn: 'সাইন্টিফিক রিসার্চ ডাটা (ক্লিপ ১১)', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-12', titleEn: 'Social Media Content Audit (Clip 12)', titleBn: 'সোশ্যাল মিডিয়া কন্টেন্ট অডিট (ক্লিপ ১২)', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-13', titleEn: 'Real Estate Listings (Clip 13)', titleBn: 'রিয়েল এস্টেট লিস্টিং (ক্লিপ ১৩)', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-14', titleEn: 'Tech Product Catalogues (Clip 14)', titleBn: 'টেক প্রোডাক্ট ক্যাটালগ (ক্লিপ ১৪)', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'typing-15', titleEn: 'NGO Project Reports (Clip 15)', titleBn: 'এনজিও প্রজেক্ট রিপোর্ট (ক্লিপ ১৫)', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 }
      ];
    case 'email-marketing':
      return [
        { id: 'email-1', titleEn: 'Email Account Sale #1', titleBn: 'ইমেইল অ্যাকাউন্ট সেল #১', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$0.20', rewardBn: '৳২০', rewardNum: 0.20 },
        { id: 'email-2', titleEn: 'Email Account Sale #2', titleBn: 'ইমেইল অ্যাকাউন্ট সেল #২', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$0.20', rewardBn: '৳২০', rewardNum: 0.20 },
        { id: 'email-3', titleEn: 'Email Account Sale #3', titleBn: 'ইমেইল অ্যাকাউন্ট সেল #৩', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$0.20', rewardBn: '৳২০', rewardNum: 0.20 }
      ];
    case 'facebook-marketing':
    case 'digital-marketing':
      return [
        { id: 'fb-1', titleEn: 'Brand Awareness Campaign Set', titleBn: 'ব্র্যান্ড অ্যাওয়ারনেস ক্যাম্পেইন সেট', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$3.80', rewardBn: '৳৩৮০', rewardNum: 3.80 },
        { id: 'fb-2', titleEn: 'B2B Lead Generation Form Ad', titleBn: 'বিটুবি লিড জেনারেশন ফর্ম বিজ্ঞাপন', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$4.50', rewardBn: '৳৪৫০', rewardNum: 4.50 },
        { id: 'fb-3', titleEn: 'E-commerce Dynamic Retargeting Campaign', titleBn: 'ই-কমার্স ডায়নামিক রিটার্গেটিং বিজ্ঞাপন', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$5.50', rewardBn: '৳৫৫০', rewardNum: 5.50 }
      ];
    case 'lead-generation':
      return [
        { id: 'lead-1', titleEn: 'SaaS Sales Development B2B Leads', titleBn: 'স্যাস সেলস ডেভেলপমেন্ট বিটুবি লিড', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$2.60', rewardBn: '৳২৬০', rewardNum: 2.60 },
        { id: 'lead-2', titleEn: 'UK Commercial Real Estate Broker Leads', titleBn: 'ইউকে কমার্শিয়াল রিয়েল এস্টেট ব্রোকার লিড', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$2.60', rewardBn: '৳২৬০', rewardNum: 2.60 },
        { id: 'lead-3', titleEn: 'Dubai Luxury Retail Merchant Leads', titleBn: 'দুবাই লাক্সারি রিটেইল মার্চেন্ট লিড', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$2.60', rewardBn: '৳২৬০', rewardNum: 2.60 },
        { id: 'lead-4', titleEn: 'Singapore Tech Startup Founder Leads', titleBn: 'সিঙ্গাপুর টেক স্টার্টআপ ফাউন্ডার লিড', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$3.00', rewardBn: '৳৩০০', rewardNum: 3.00 },
        { id: 'lead-5', titleEn: 'Germany Automotive Supply Chain Leads', titleBn: 'জার্মানি অটোমোটিভ সাপ্লাই চেইন লিড', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$3.20', rewardBn: '৳৩২০', rewardNum: 3.20 },
        { id: 'lead-6', titleEn: 'Canada Solar Energy Project Leads', titleBn: 'কানাডা সোলার এনার্জি প্রজেক্ট লিড', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$3.50', rewardBn: '৳৩৫০', rewardNum: 3.50 },
        { id: 'lead-7', titleEn: 'Australia E-learning Platform Leads', titleBn: 'অস্ট্রেলিয়া ই-লার্নিং প্ল্যাটফর্ম লিড', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$2.80', rewardBn: '৳২৮০', rewardNum: 2.80 },
        { id: 'lead-8', titleEn: 'Japan Robotics & AI Research Leads', titleBn: 'জাপান রোবোটিক্স ও এআই রিসার্চ লিড', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$4.50', rewardBn: '৳৪৫০', rewardNum: 4.50 },
        { id: 'lead-9', titleEn: 'France Luxury Fashion Buyer Leads', titleBn: 'ফ্রান্স লাক্সারি ফ্যাশন বায়ার লিড', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$3.10', rewardBn: '৳৩১০', rewardNum: 3.10 },
        { id: 'lead-10', titleEn: 'Global Fintech Executive Contacts', titleBn: 'গ্লোবাল ফিনটেক এক্সিকিউটিভ কন্টাক্টস', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$5.00', rewardBn: '৳৫০০', rewardNum: 5.00 }
      ];
    case 'form-fillup-work':
      return [
        { id: 'form-1', titleEn: 'CRM Database Customer Profile Onboarding', titleBn: 'সিআরএম ডাটাবেজ কাস্টমার প্রোফাইল অনবোর্ডিং', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$2.00', rewardBn: '৳২০০', rewardNum: 2.00 },
        { id: 'form-2', titleEn: 'International Trade Summit Registration', titleBn: 'আন্তর্জাতিক বাণিজ্য সম্মেলন রেজিস্ট্রেশন', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$2.00', rewardBn: '৳২০০', rewardNum: 2.00 },
        { id: 'form-3', titleEn: 'Enterprise Supplier Verification Form', titleBn: 'এন্টারপ্রাইজ সরবরাহকারী ভেরিফিকেশন ফর্ম', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.00', rewardBn: '৳২০০', rewardNum: 2.00 },
        { id: 'form-4', titleEn: 'Global Talent Recruitment Survey', titleBn: 'গ্লোবাল ট্যালেন্ট রিক্রুটমেন্ট সার্ভে', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'form-5', titleEn: 'Smart City Resident Feedback Portal', titleBn: 'স্মার্ট সিটি রেসিডেন্ট ফিডব্যাক পোর্টাল', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.50', rewardBn: '৳১৫০', rewardNum: 1.50 },
        { id: 'form-6', titleEn: 'Academic Research Participant Consent', titleBn: 'একাডেমিক রিসার্চ পার্টিসিপেন্ট কনসেন্ট', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.20', rewardBn: '৳২২০', rewardNum: 2.20 },
        { id: 'form-7', titleEn: 'Fintech Mobile App Beta Tester App', titleBn: 'ফিনটেক মোবাইল অ্যাপ বিটা টেস্টার অ্যাপ', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$2.50', rewardBn: '৳২৫০', rewardNum: 2.50 },
        { id: 'form-8', titleEn: 'Luxury Hotel Concierge Service Request', titleBn: 'লাক্সারি হোটেল কনসিয়ার্জ সার্ভিস রিকোয়েস্ট', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.40', rewardBn: '৳২৪০', rewardNum: 2.40 },
        { id: 'form-9', titleEn: 'Industrial Equipment Warranty Registry', titleBn: 'শিল্প সরঞ্জাম ওয়ারেন্টি রেজিস্ট্রি', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.90', rewardBn: '৳১৯০', rewardNum: 1.90 },
        { id: 'form-10', titleEn: 'Non-Profit Volunteer Application', titleBn: 'অলাভজনক সংস্থা ভলান্টিয়ার অ্যাপ্লিকেশন', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.40', rewardBn: '৳১৪০', rewardNum: 1.40 }
      ];
    case 'data-entry-work':
      return [
        { id: 'data-1', titleEn: 'Industrial Hardware Inventory Log (Clip 1)', titleBn: 'শিল্প হার্ডওয়্যার ইনভেন্টরি লগ (ক্লিপ ১)', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80 },
        { id: 'data-2', titleEn: 'Stationery Supplier Invoicing Ledger (Clip 2)', titleBn: 'স্টেশনারি সরবরাহকারী চালান লেজার (ক্লিপ ২)', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$2.20', rewardBn: '৳২২০', rewardNum: 2.20 },
        { id: 'data-3', titleEn: 'E-Commerce Marketing Budget Book (Clip 3)', titleBn: 'ই-কমার্স মার্কেটিং বাজেট খাতা (ক্লিপ ৩)', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$2.50', rewardBn: '৳২৫০', rewardNum: 2.50 },
        { id: 'data-4', titleEn: 'Global Logistics Shipment Registry', titleBn: 'গ্লোবাল লজিস্টিক শিপমেন্ট রেজিস্ট্রি', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.10', rewardBn: '৳২১০', rewardNum: 2.10 },
        { id: 'data-5', titleEn: 'Pharma Supply Chain Quality Logs', titleBn: 'ফার্মা সাপ্লাই চেইন কোয়ালিটি লগ', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$2.80', rewardBn: '৳২৮০', rewardNum: 2.80 },
        { id: 'data-6', titleEn: 'Real Estate Tenant Database Entry', titleBn: 'রিয়েল এস্টেট টেন্যান্ট ডাটাবেজ এন্ট্রি', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.90', rewardBn: '৳১৯০', rewardNum: 1.90 },
        { id: 'data-7', titleEn: 'University Admission Student Records', titleBn: 'বিশ্ববিদ্যালয় ভর্তি শিক্ষার্থী রেকর্ড', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$3.00', rewardBn: '৳৩০০', rewardNum: 3.00 },
        { id: 'data-8', titleEn: 'Global Weather Station Data Input', titleBn: 'গ্লোবাল ওয়েদার স্টেশন ডাটা ইনপুট', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.50', rewardBn: '৳১৫০', rewardNum: 1.50 },
        { id: 'data-9', titleEn: 'Hospital Patient Appointment Ledger', titleBn: 'হাসপাতাল পেশেন্ট অ্যাপয়েন্টমেন্ট লেজার', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.30', rewardBn: '৳২৩০', rewardNum: 2.30 },
        { id: 'data-10', titleEn: 'Public Library Catalog Digitization', titleBn: 'পাবলিক লাইব্রেরি ক্যাটালগ ডিজিটাইজেশন', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.00', rewardBn: '৳২০০', rewardNum: 2.00 },
        { id: 'data-11', titleEn: 'Agriculture Crop Yield Statistics', titleBn: 'কৃষি শস্য উৎপাদন পরিসংখ্যান', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.70', rewardBn: '৳১৭০', rewardNum: 1.70 },
        { id: 'data-12', titleEn: 'Retail Store Daily Sales Summary', titleBn: 'রিটেইল স্টোর ডেইলি সেলস সামারি', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$1.60', rewardBn: '৳১৬০', rewardNum: 1.60 },
        { id: 'data-13', titleEn: 'Legal Case Document Indexing', titleBn: 'লিগ্যাল কেস ডকুমেন্ট ইনডেক্সিং', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$3.50', rewardBn: '৳৩৫০', rewardNum: 3.50 },
        { id: 'data-14', titleEn: 'Insurance Claim Processing Logs', titleBn: 'ইন্সুরেন্স ক্লেম প্রসেসিং লগ', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$3.20', rewardBn: '৳৩২০', rewardNum: 3.20 },
        { id: 'data-15', titleEn: 'NGO Donor Contribution Registry', titleBn: 'এনজিও ডোনার কন্ট্রিবিউশন রেজিস্ট্রি', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.40', rewardBn: '৳২৪০', rewardNum: 2.40 }
      ];
    case 'video-submit-work':
      return [
        { id: 'video-1', titleEn: 'SaaS Campaign Launch Review', titleBn: 'স্যাস ক্যাম্পেইন লঞ্চ মূল্যায়ন', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$2.20', rewardBn: '৳২২০', rewardNum: 2.20 },
        { id: 'video-2', titleEn: 'Corporate Brand Equity Pitch Review', titleBn: 'কর্পোরেট ব্র্যান্ড ইকুইটি পিচ মূল্যায়ন', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$2.80', rewardBn: '৳২৮০', rewardNum: 2.80 },
        { id: 'video-3', titleEn: 'AeroPods Pro Gen 2 Showcase Feedback', titleBn: 'অ্যারোপডস প্রো জেন ২ শোকেস ফিডব্যাক', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$3.50', rewardBn: '৳৩৫০', rewardNum: 3.50 }
      ];
    case 'product-selling-work':
      return [
        { id: 'sell-1', titleEn: 'AeroPods Pro Gen 2 Launch Promo', titleBn: 'অ্যারোপডস প্রো জেন ২ লঞ্চ প্রমোশন', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$4.50', rewardBn: '৳৪৫০', rewardNum: 4.50 },
        { id: 'sell-2', titleEn: 'ErgoMax Portable Adjustable Desk Sales Order', titleBn: 'আর্গোম্যাক্স পোর্টেবল ডেস্ক বিক্রয় অর্ডার', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$8.00', rewardBn: '৳৮০০', rewardNum: 8.00 },
        { id: 'sell-3', titleEn: 'Wireless Smart Charging Hub Lead Book', titleBn: 'ওয়্যারলেস স্মার্ট চার্জিং হাব লিড বুক', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$12.00', rewardBn: '৳১২০০', rewardNum: 12.00 }
      ];
    case 'photo-editing':
      return [
        { id: 'photo-1', titleEn: 'Smartphone Offer Social Media Banner', titleBn: 'স্মার্টফোন অফার সোশ্যাল মিডিয়া ব্যানার', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.50', rewardBn: '৳১৫০', rewardNum: 1.50, descBn: 'একটি প্রিমিয়াম স্মার্টফোন প্রমোশনের জন্য ব্যানার তৈরি করুন। কাস্টমারের পছন্দসই ব্যাকগ্রাউন্ড এবং টেক্সট ইফেক্ট ব্যবহার করবেন।', whyBn: 'নতুন স্মার্টফোন লঞ্চের হাইপ তৈরি করতে এবং কাস্টমারদের আকর্ষণ করতে এই ধরনের ব্যানার প্রয়োজন হয়।' },
        { id: 'photo-2', titleEn: 'Online Grocery Food Poster', titleBn: 'অনলাইন গ্রোসারি ফুড পোস্টার', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.70', rewardBn: '৳১৭০', rewardNum: 1.70, descBn: 'তাজা শাকসবজি ও ফলমূলের জন্য একটি আকর্ষণীয় গ্রোসারি অফার ব্যানার ডিজাইন করুন।', whyBn: 'ফুড এবং গ্রোসারি আইটেমগুলো সতেজ ও আকর্ষণীয়ভাবে তুলে ধরে সোশ্যাল মিডিয়ায় বিক্রি বাড়ানোর জন্য এই পোস্টার তৈরি করা হয়।' },
        { id: 'photo-3', titleEn: 'Corporate Business Flyer Design', titleBn: 'কর্পোরেট বিজনেস ফ্লায়ার ডিজাইন', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$1.80', rewardBn: '৳১৮০', rewardNum: 1.80, descBn: 'বিজনেস মিটিং এবং সার্ভিস প্রোমোশনের জন্য ক্লাসিক কর্পোরেট ফ্লায়ার ডিজাইন করুন।', whyBn: 'কোম্পানির ব্রান্ড ভ্যালু বৃদ্ধি করা এবং প্রফেশনাল গ্রাহকদের কাছে নিজেদের সার্ভিস প্রচারের জন্য এই ডিজাইন অত্যন্ত গুরুত্বপূর্ণ।' },
        { id: 'photo-4', titleEn: 'YouTube Gaming Thumbnail', titleBn: 'ইউটিউব গেমিং থাম্বনেইল ব্যাকগ্রাউন্ড', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.60', rewardBn: '৳১৬০', rewardNum: 1.60, descBn: 'গেমিং লাইভ স্ট্রিমের জন্য হাই-কন্ট্রাস্ট এবং নিয়ন লাইটিং সম্পন্ন একটি থাম্বনেইল ডিজাইন করুন।', whyBn: 'ইউটিউবে গেমিং ভিডিওতে ক্লিক করার হার বা CTR (Click-Through Rate) বহু গুণ বাড়ানোর জন্য আকর্ষণীয় থাম্বনেইল ব্যবহার করা হয়।' },
        { id: 'photo-5', titleEn: 'Real Estate Property Banner', titleBn: 'রিয়েল এস্টেট প্রপার্টি ব্যানার', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$2.00', rewardBn: '৳২০০', rewardNum: 2.00, descBn: 'বিলাসবহুল ফ্ল্যাট বুকিং ও বিক্রির জন্য চমৎকার কালার ব্যালেন্সড প্রপার্টি ব্যানার তৈরি করুন।', whyBn: 'নতুন ফ্ল্যাট বা এপার্টমেন্ট বিক্রির জন্য প্রিমিয়াম ক্রেতা আকর্ষণ করতে এই ব্যানারগুলো ডিজাইন করা হয়।' },
        { id: 'photo-6', titleEn: 'Fitness Gym Club Offer Poster', titleBn: 'ফিটনেস জিম ক্লাব অফার পোস্টার', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.75', rewardBn: '৳১৭৫', rewardNum: 1.75, descBn: 'জিমের মেম্বারশিপে ২০% ডিসকাউন্টের জন্য একটি মোটিভেশনাল অফার পোস্টার ডিজাইন করুন।', whyBn: 'ফিটনেস সেন্টারে নতুন কাস্টমার ও মেম্বারদের সাইন-আপ করতে উৎসাহিত করার জন্য এই ভিজ্যুয়াল পোস্টার বানানো হয়।' },
        { id: 'photo-7', titleEn: 'Travel Agency Tour Package Post', titleBn: 'ট্রাভেল এজেন্সি ট্যুর প্যাকেজ পোস্ট', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.90', rewardBn: '৳১৯০', rewardNum: 1.90, descBn: 'কক্সবাজার বা সাজেক ভ্যালির ট্যুর প্যাকেজ প্রমোট করার জন্য একটি কালারফুল ট্রাভেল পোস্টার তৈরি করুন।', whyBn: 'দর্শনীয় স্থানগুলো হাইলাইট করে ভ্রমণপিপাসুদের আকর্ষিত করা এবং বুকিং সংখ্যা বৃদ্ধি করার জন্য এই ব্যানার প্রয়োজন।' },
        { id: 'photo-8', titleEn: 'Fashion House Eid Collection Card', titleBn: 'ফ্যাশন হাউজ ঈদ কালেকশন কার্ড', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.85', rewardBn: '৳১৮৫', rewardNum: 1.85, descBn: 'নতুন পাঞ্জাবি ও শাড়ির কালেকশন সোশ্যাল মিডিয়ায় শেয়ারের জন্য একটি প্রফেশনাল মডেল ফটো পোস্টার ডিজাইন করুন।', whyBn: 'উৎসবের আমেজে নতুন পোশাকের কালেকশনগুলো গ্রাহকদের কাছে স্টাইলিশভাবে রিপ্রেজেন্ট করতে এই কার্ড ব্যবহৃত হয়।' },
        { id: 'photo-9', titleEn: 'Restaurant Menu & Discount Banner', titleBn: 'রেস্টুরেন্ট মেনু এবং ফুড লাভার্স ব্যানার', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$1.65', rewardBn: '৳১৬৫', rewardNum: 1.65, descBn: 'বার্গার এবং পিজ্জা কম্বো অফারের জন্য জিভে জল আনা ব্রাইট ফুড পোস্টার তৈরি করুন।', whyBn: 'স্পেশাল উইকেন্ড ডিসকাউন্ট বা ফুড আইটেমগুলোর প্রচার করে রেস্টুরেন্টে বিক্রির অর্ডার বাড়ানোর জন্য এটি দরকারি।' },
        { id: 'photo-10', titleEn: 'Smart Watch Launch Promotional Banner', titleBn: 'স্মার্ট ওয়াচ লঞ্চ প্রমোশনাল ব্যানার', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$1.95', rewardBn: '৳১৯৫', rewardNum: 1.95, descBn: 'ফিটনেস ট্র্যাক ও হার্ট রেট সেন্সর ফিচার হাইলাইট করে ব্ল্যাক থিমের একটি গ্যাজেট ব্যানার ডিজাইন করুন।', whyBn: 'নতুন ইলেকট্রনিক্স গ্যাজেট লঞ্চের আকর্ষণীয় হাইপ তৈরি করা এবং কাস্টমারদের প্রি-অর্ডারে প্ররোচিত করতে এই ব্যানার তৈরি করা হয়।' }
      ];
    case 'video-editing':
      return [
        { id: 'video-edit-1', titleEn: 'Video Editing Task: Clip 1', titleBn: 'ভিডিও এডিটিং: ক্লিপ ১', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.00', rewardBn: '৳২০০', rewardNum: 2.00, descBn: 'স্মার্টফোনের আনবক্সিং ভিডিও থেকে সেরা অংশগুলো ট্রিম ও কাট করে ১ মিনিটের রিল তৈরি করুন।', whyBn: 'প্রোডাক্টের ফার্স্ট ইম্প্রেশন ও প্রধান আকর্ষণীয় ফিচারগুলো সোশ্যাল মিডিয়াতে দ্রুত ভিউয়ারদের কাছে তুলে ধরতে এই শর্ট ভিডিও সাহায্য করে।' },
        { id: 'video-edit-2', titleEn: 'Video Editing Task: Clip 2', titleBn: 'ভিডিও এডিটিং: ক্লিপ ২', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.20', rewardBn: '৳২২০', rewardNum: 2.20, descBn: 'খাবারের ধোঁয়া ওঠা ক্লোজআপ এবং কাস্টমার রিঅ্যাকশন ক্লিপগুলো সুন্দর ট্রানজিশন দিয়ে জোড়া দিন।', whyBn: 'খাবারের স্বাদ, মান এবং রেস্টুরেন্টের চমৎকার পরিবেশ ফুটিয়ে তুলে ভোজনরসিক কাস্টমারদের রেস্টুরেন্টে আসার জন্য উদ্বুদ্ধ করতে এই ভিডিও তৈরি হয়।' },
        { id: 'video-edit-3', titleEn: 'Video Editing Task: Clip 3', titleBn: 'ভিডিও এডিটিং: ক্লিপ ৩', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$2.50', rewardBn: '৳২৫০', rewardNum: 2.50, descBn: 'ভারী ওজন তোলার অ্যাকশন শটগুলোর গতি বাড়িয়ে-কমিয়ে (Speed Ramp) মোটিভেশনাল বিট মিউজিকের সাথে এডিট করুন।', whyBn: 'জিম ওয়ার্কআউট হাইলাইট করে সুস্থ ও ফিট লাইফস্টাইলের প্রতি তরুণ প্রজন্মকে অনুপ্রাণিত ও আকৃষ্ট করতে এই ভিডিও দরকারি।' },
        { id: 'video-edit-4', titleEn: 'Video Editing Task: Clip 4', titleBn: 'ভিডিও এডিটিং: ক্লিপ ৪', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$2.80', rewardBn: '৳২৮০', rewardNum: 2.80, descBn: 'সবুজ পাহাড় ও ঝরনার সিনেমাটিক ফুটেজগুলোকে কালার গ্রেডিং করে একটি শান্ত ও মনোরম ১ মিনিটের ট্রাভেল ক্লিপ বানান।', whyBn: 'দর্শকদের চমৎকার সব প্রাকৃতিক দৃশ্যের সাথে পরিচয় করিয়ে দেওয়া এবং সোশ্যাল মিডিয়ায় ট্রাভেল পেজের এনগেজমেন্ট ও ভিউ বাড়ানোর জন্য এটি দরকার।' },
        { id: 'video-edit-5', titleEn: 'Video Editing Task: Clip 5', titleBn: 'ভিডিও এডিটিং: ক্লিপ ৫', difficultyEn: 'Hard', difficultyBn: 'কঠিন', rewardEn: '$3.00', rewardBn: '৳৩০০', rewardNum: 3.00, descBn: 'স্মার্ট স্পিকারের ভয়েস কমান্ড ও সাউন্ড কোয়ালিটির ফিচারগুলো নিয়ে একটি টেকনিক্যাল অ্যাড ভিডিও তৈরি করুন।', whyBn: 'ইলেকট্রনিক্স ডিভাইসের কার্যকারিতা ও বিস্তারিত স্পেসিফিকেশন সহজ ভাষায় বুঝিয়ে ই-কমার্স সেলের কনভার্সন বাড়াতে এই রিভিউ ভিডিও তৈরি হয়।' }
      ];
    case 'computer-training':
      return [
        { id: 'comp-1', titleEn: 'Windows System Administrator Command Lab', titleBn: 'উইন্ডোজ সিস্টেম অ্যাডমিনিস্ট্রেটর কমান্ড ল্যাব', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$3.50', rewardBn: '৳৩৫০', rewardNum: 3.50 },
        { id: 'comp-2', titleEn: 'Financial Spreadsheet Ledger Formula Lab', titleBn: 'ফিনান্সিয়াল স্প্রেডশিট লেজার ফর্মুলা ল্যাব', difficultyEn: 'Medium', difficultyBn: 'মাঝারি', rewardEn: '$4.80', rewardBn: '৳৪৮০', rewardNum: 4.80 },
        { id: 'comp-3', titleEn: 'IT Office Keyboard Shortcut Mastery', titleBn: 'আইটি অফিস কীবোর্ড শর্টকাট মাস্টারি', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$6.00', rewardBn: '৳৬০০', rewardNum: 6.00 }
      ];
    case 'code-entry':
      return [
        { id: 'code-1', titleEn: 'Electronics Inventory Matching', titleBn: 'ইলেকট্রনিক্স ইনভেন্টরি কোড ম্যাচিং', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$3.50', rewardBn: '৳৩৫০', rewardNum: 3.50 },
        { id: 'code-2', titleEn: 'Fashion Apparel Registry', titleBn: 'ফ্যাশন ও অ্যাপারেল কোড রেজিস্ট্রি', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$3.50', rewardBn: '৳৩৫০', rewardNum: 3.50 },
        { id: 'code-3', titleEn: 'Home Appliances Security Code Entry', titleBn: 'গৃহস্থালী পণ্য সিকিউরিটি কোড বসানো', difficultyEn: 'Easy', difficultyBn: 'সহজ', rewardEn: '$3.50', rewardBn: '৳৩৫০', rewardNum: 3.50 }
      ];
    default:
      return [];
  }
}

export interface ProductCodeItem {
  nameBn: string;
  nameEn: string;
  serial: string;
  image: string;
  code: string;
}

export const productCodeEntryData: { [subTaskId: string]: ProductCodeItem[] } = {
  'code-1': [
    { nameBn: 'স্যামসাং গ্যালাক্সি এস২৪ আল্ট্রা', nameEn: 'Samsung Galaxy S24 Ultra', serial: 'SG-902-X', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=300', code: 'CONF-8821' },
    { nameBn: 'সনি WH-1000XM5 হেডফোনস', nameEn: 'Sony WH-1000XM5 Headphones', serial: 'SN-401-H', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300', code: 'CONF-5390' },
    { nameBn: 'অ্যাপল ম্যাকবুক প্রো ১৬"', nameEn: 'Apple MacBook Pro 16"', serial: 'AP-884-M', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=300', code: 'CONF-1092' },
    { nameBn: 'আসুস আরওজি স্ট্রিপ জিপিইউ', nameEn: 'Asus ROG Strix GPU', serial: 'AS-552-G', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=300', code: 'CONF-7741' }
  ],
  'code-2': [
    { nameBn: 'প্রিমিয়াম চামড়ার জ্যাকেট', nameEn: 'Premium Leather Jacket', serial: 'LJ-102-F', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=300', code: 'CONF-2281' },
    { nameBn: 'নাইকি এয়ার ম্যাক্স স্নিকার্স', nameEn: 'Nike Air Max Sneakers', serial: 'NK-904-S', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300', code: 'CONF-6612' },
    { nameBn: 'সুতি স্লিম ফিট শার্ট', nameEn: 'Cotton Slim Fit Shirt', serial: 'CS-442-T', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300', code: 'CONF-4399' },
    { nameBn: 'পোলারাইজড স্পোর্টস সানগ্লাস', nameEn: 'Polarized Sports Sunglasses', serial: 'SG-301-A', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300', code: 'CONF-9051' }
  ],
  'code-3': [
    { nameBn: 'স্মার্ট কফি মেকার', nameEn: 'Smart Coffee Maker', serial: 'CM-220-K', image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?auto=format&fit=crop&q=80&w=300', code: 'CONF-3021' },
    { nameBn: 'রোবোটিক ভ্যাকুয়াম ক্লিনার', nameEn: 'Robotic Vacuum Cleaner', serial: 'RV-505-V', image: 'https://images.unsplash.com/photo-1569691105751-88df003de7a4?auto=format&fit=crop&q=80&w=300', code: 'CONF-7832' },
    { nameBn: 'এয়ার পিউরিফায়ার ম্যাক্স', nameEn: 'Air Purifier Max', serial: 'AP-309-P', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=300', code: 'CONF-1154' },
    { nameBn: 'বৈদ্যুতিক স্মার্ট কেটলি', nameEn: 'Electric Smart Kettle', serial: 'EK-884-Y', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=300', code: 'CONF-4491' }
  ]
};

export const clientsData = [
  { id: 1, name: "মোঃ আব্দুর রহমান", father: "FA-9021", mother: "MO-1182", phone: "01712345678", email: "abdur.rahman@gmail.com", gender: "পুরুষ", dob: "15/08/1992", nid: "5432109876", division: "DIV-01", district: "DIS-04", thana: "TH-092", post: "PO-1740", postcode: "1740", village: "VL-882", occupation: "চাকুরীজীবী", income: "৩৫,০০০ টাকা", blood: "O+", education: "স্নাতক", marital: "বিবাহিত", emergency: "01798765432", nominee: "MO-1182", nomineeRelation: "মাতা" },
  { id: 2, name: "মোসাঃ ফাতেমা আক্তার", father: "FA-5532", mother: "MO-3391", phone: "01823456789", email: "fatema.akter@gmail.com", gender: "নারী", dob: "02/11/1995", nid: "9876543210", division: "DIV-02", district: "DIS-11", thana: "TH-201", post: "PO-3900", postcode: "3900", village: "VL-109", occupation: "গৃহিণী", income: "১০,০০০ টাকা", blood: "A+", education: "এইচএসসি", marital: "বিবাহিত", emergency: "01887654321", nominee: "FA-5532", nomineeRelation: "পিতা" },
  { id: 3, name: "তানভীর হাসান রাব্বী", father: "FA-8812", mother: "MO-9023", phone: "01934567890", email: "tanvir.rabbi@gmail.com", gender: "পুরুষ", dob: "20/04/1998", nid: "3210987654", division: "DIV-03", district: "DIS-22", thana: "TH-110", post: "PO-5840", postcode: "5840", village: "VL-772", occupation: "শিক্ষার্থী", income: "৫,০০০ টাকা", blood: "B+", education: "এইচএসসি", marital: "অবিবাহিত", emergency: "01998765432", nominee: "FA-8812", nomineeRelation: "পিতা" },
  { id: 4, name: "ইশরাত জাহান ইভা", father: "FA-1109", mother: "MO-4412", phone: "01545678901", email: "eva.ishrat@gmail.com", gender: "নারী", dob: "12/09/1994", nid: "1234567890", division: "DIV-04", district: "DIS-15", thana: "TH-304", post: "PO-7420", postcode: "7420", village: "VL-501", occupation: "ব্যবসায়ী", income: "৪৫,০০০ টাকা", blood: "AB+", education: "স্নাতক", marital: "অবিবাহিত", emergency: "01556789012", nominee: "MO-4412", nomineeRelation: "মাতা" },
  { id: 5, name: "মোঃ শাহিন আলম", father: "FA-7743", mother: "MO-8812", phone: "01656789012", email: "shahin.alam@gmail.com", gender: "পুরুষ", dob: "05/06/1989", nid: "8765432109", division: "DIV-05", district: "DIS-08", thana: "TH-401", post: "PO-5200", postcode: "5200", village: "VL-309", occupation: "কৃষিজীবী", income: "১৮,০০০ টাকা", blood: "O-", education: "মাধ্যমিক", marital: "বিবাহিত", emergency: "01698765432", nominee: "MO-8812", nomineeRelation: "মাতা" },
  { id: 6, name: "রনি বাড়ৈ", father: "FA-3390", mother: "MO-1123", phone: "01367890123", email: "rony.baroi@gmail.com", gender: "পুরুষ", dob: "25/12/1991", nid: "4567890123", division: "DIV-06", district: "DIS-19", thana: "TH-552", post: "PO-8420", postcode: "8420", village: "VL-410", occupation: "ফ্রিল্যান্সার", income: "৫০,০০০ টাকা", blood: "B-", education: "স্নাতকোত্তর", marital: "অবিবাহিত", emergency: "01312345678", nominee: "FA-3390", nomineeRelation: "পিতা" }
];
