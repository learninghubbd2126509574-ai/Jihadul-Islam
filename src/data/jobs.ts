import { Job, UserProfile, ShopItem, TaskLog } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'typing-job',
    titleEn: 'Typing Work',
    titleBn: 'টাইপিং জব',
    tag: 'POPULAR',
    iconName: 'Keyboard',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    rewardEn: '$2.50 - $4.00 per project',
    rewardBn: '৳২৫০ - ৳৪০০ প্রতি কাজ',
    estimatedTimeEn: '5-10 mins',
    estimatedTimeBn: '৫-১০ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'ফাইল ও টেক্সট সঠিক অক্ষরে টাইপ করে জমা দিন।',
    shortDescEn: 'Transcribe raw client documents and type text datasets accurately.',
    longDescBn: 'টাইপিং কাজ: ক্লায়েন্টের ফাইল বা ছবি দেখে নির্ভুলভাবে টেক্সট টাইপ করে সাবমিট করুন।',
    longDescEn: 'Data typing is a vital contract service. Transcribe digital customer files or records accurately into clean formats.',
    instructionsBn: [
      'প্রথমে কাস্টমার ডাটা সোর্সটি দেখুন।',
      'নিচের বক্সে নির্ভুলভাবে টাইপ করুন।',
      'কমপক্ষে ৯৫% সঠিকতা রেখে সাবমিট করুন।'
    ],
    instructionsEn: [
      'Inspect the provided client source record.',
      'Type the characters exactly as shown.',
      'Maintain at least 95% accuracy to submit.'
    ],
    skillsRequiredEn: ['Fast Typing', 'Attention to Detail'],
    skillsRequiredBn: ['টাইপিং গতি', 'সঠিকতা']
  },
  {
    id: 'email-marketing',
    titleEn: 'Email Marketing',
    titleBn: 'ইমেইল মার্কেটিং',
    tag: 'HIGH PAY',
    iconName: 'Mail',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    rewardEn: '$0.20 per account',
    rewardBn: '৳২০ প্রতি ইমেইল',
    estimatedTimeEn: '1-2 mins',
    estimatedTimeBn: '১-২ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'সচল ইমেইল সাবমিট করে প্রতিটি ইমেইলে ২০ টাকা পান।',
    shortDescEn: 'Submit active email credentials to earn instant ৳20 payouts.',
    longDescBn: 'ইমেইল সাবমিট: প্রতি সচল ইমেইল ও পাসওয়ার্ড জমা দিয়ে ২০ টাকা কমিশন লাভ করুন।',
    longDescEn: 'Earn instant payouts by submitting working email accounts.',
    instructionsBn: [
      'একটি সচল ইমেইল অ্যাড্রেস লিখুন।',
      'ইমেইলের পাসওয়ার্ড দিন।',
      'সাবমিট করে ২০ টাকা কমিশন নিন।'
    ],
    instructionsEn: [
      'Enter an active, working email address.',
      'Provide the correct password.',
      'Click submit to claim commission.'
    ],
    skillsRequiredEn: ['Active Email', 'Fast Submission'],
    skillsRequiredBn: ['সক্রিয় ইমেইল', 'দ্রুত কাজ']
  },
  {
    id: 'form-fillup-work',
    titleEn: 'Form Fill-Up',
    titleBn: 'ফর্ম ফিল আপ',
    tag: 'EASY',
    iconName: 'FileSpreadsheet',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    rewardEn: '$2.00 per submission',
    rewardBn: '৳২০০ প্রতি কাজ',
    estimatedTimeEn: '2-3 mins',
    estimatedTimeBn: '২-৩ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'তথ্য দেখে অনলাইন ফর্মে সঠিক ডাটা ইনপুট দিন।',
    shortDescEn: 'Enter client details into online service forms accurately to earn ৳200.',
    longDescBn: 'ফর্ম ফিল আপ: ডাটা কার্ড দেখে নির্দিষ্ট বক্সে নাম, ইমেইল ও তথ্য বসিয়ে জমা দিন।',
    longDescEn: 'Online Form Submission: transfer raw customer details into online forms accurately.',
    instructionsBn: [
      'ডাটা সোর্স কার্ডটি দেখুন।',
      'ফর্মে নাম, ইমেইল ও তথ্য লিখুন।',
      'যাচাই করে সাবমিট করুন।'
    ],
    instructionsEn: [
      'Review the customer data card.',
      'Enter Name, Email, and details.',
      'Click submit form.'
    ],
    skillsRequiredEn: ['Form Entry', 'Accuracy'],
    skillsRequiredBn: ['ফর্ম ফিল আপ', 'সঠিকতা']
  },
  {
    id: 'data-entry-work',
    titleEn: 'Data Entry',
    titleBn: 'ডাটা এন্ট্রি',
    tag: 'POPULAR',
    iconName: 'Database',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    rewardEn: '$3.00 - $5.00 per dataset',
    rewardBn: '৳৩০০ - ৳৫০০ প্রতি ডাটা',
    estimatedTimeEn: '8-12 mins',
    estimatedTimeBn: '৮-১২ মিনিট',
    difficultyEn: 'Medium',
    difficultyBn: 'মাঝারি',
    shortDescBn: '১০০ জন ক্লায়েন্টের নাম ও ইউআইডি ডাটা চেক করে জমা দিন।',
    shortDescEn: 'Verify and submit client data entries in a professional spreadsheet.',
    longDescBn: 'ডাটা এন্ট্রি: ক্লায়েন্ট নাম ও ইউআইডি ডাটাশিট ভেরিফাই করে সেভ করুন।',
    longDescEn: 'Client Data Entry: inspect details and view spreadsheet data to file entries.',
    instructionsBn: [
      'পেন্ডিং ক্লায়েন্ট সিলেক্ট করুন।',
      'নাম ও ইউআইডি চেক করুন।',
      'ডাটাশিট সাবমিট করুন।'
    ],
    instructionsEn: [
      'Select a pending client.',
      'Verify UID and details.',
      'Click submit datasheet.'
    ],
    skillsRequiredEn: ['Spreadsheet', 'Data Checking'],
    skillsRequiredBn: ['এক্সেল', 'ডাটা এন্ট্রি']
  },
  {
    id: 'code-entry',
    titleEn: 'Code Entry',
    titleBn: 'কোড বসানো (কোড এন্ট্রি)',
    tag: 'NEW',
    iconName: 'Code',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    rewardEn: '$3.50 per dataset',
    rewardBn: '৳৩৫০ প্রতি কাজ',
    estimatedTimeEn: '5-8 mins',
    estimatedTimeBn: '৫-৮ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'প্রোডাক্টের ছবি দেখে সিরিয়াল কোড মিলিয়ে ইনপুট দিন।',
    shortDescEn: 'Match product serial numbers with correct verification keys.',
    longDescBn: 'কোড এন্ট্রি: স্ক্রিনে দেখানো প্রোডাক্ট ছবি ও সিরিয়াল কোড মিলিয়ে সাবমিট করুন।',
    longDescEn: 'Look up serial numbers and enter exact confirmation codes.',
    instructionsBn: [
      'প্রোডাক্ট ছবি দেখুন।',
      'সিরিয়াল কোডটি মেলান।',
      'বক্সে টাইপ করে কনফার্ম করুন।'
    ],
    instructionsEn: [
      'Observe product image.',
      'Match verification code.',
      'Type code into box and confirm.'
    ],
    skillsRequiredEn: ['Serial Matching', 'Numeric Typing'],
    skillsRequiredBn: ['কোড মেলানো', 'টাইপিং']
  },
  {
    id: 'facebook-marketing',
    titleEn: 'Digital Marketing',
    titleBn: 'ডিজিটাল মার্কেটিং',
    tag: 'NEW',
    iconName: 'Facebook',
    bgColor: 'bg-sky-50',
    iconColor: 'text-sky-600',
    rewardEn: '$3.80 - $5.50 per campaign',
    rewardBn: '৳৩৮০ - ৳৫৫০ প্রতি কাজ',
    estimatedTimeEn: '10-15 mins',
    estimatedTimeBn: '১০-১৫ মিনিট',
    difficultyEn: 'Medium',
    difficultyBn: 'মাঝারি',
    shortDescBn: 'টার্গেট অডিয়েন্স অনুযায়ী সামাজিক বিজ্ঞাপন সেটআপ করুন।',
    shortDescEn: 'Design ad copy and launch social media promotion campaigns.',
    longDescBn: 'ডিজিটাল প্রচার: বিজ্ঞাপনের শিরোনাম, বাজেট ও টার্গেট সেট করে কাজ সাবমিট করুন।',
    longDescEn: 'Set up post text, define buyer locations, interests, and publish ads.',
    instructionsBn: [
      'বিজ্ঞাপনের ক্যাপশন ও অফার লিখুন।',
      'টার্গেট সিলেক্ট করুন।',
      'বিজ্ঞাপন চালু করে সাবমিট করুন।'
    ],
    instructionsEn: [
      'Compose ad copy.',
      'Select target audience.',
      'Publish and complete campaign.'
    ],
    skillsRequiredEn: ['Social Media Copy', 'Targeting'],
    skillsRequiredBn: ['বিজ্ঞাপন লেখা', 'টার্গেটিং']
  },
  {
    id: 'lead-generation',
    titleEn: 'Lead Generation',
    titleBn: 'লিড জেনারেশন',
    tag: 'POPULAR',
    iconName: 'Target',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    rewardEn: '$4.50 - $7.00 per dataset',
    rewardBn: '৳৪৫০ - ৳৭০০ প্রতি ডাটা',
    estimatedTimeEn: '12-18 mins',
    estimatedTimeBn: '১২-১৮ মিনিট',
    difficultyEn: 'Hard',
    difficultyBn: 'কঠিন',
    shortDescBn: 'কোম্পানির আসল ইমেইল ও কন্টাক্ট ডাটা সংগ্রহ করুন।',
    shortDescEn: 'Identify and compile verified business contact databases.',
    longDescBn: 'লিড সংগ্রহ: ফিল্টার ব্যবহার করে আসল বিটুবি কন্টাক্ট ইনফরমেশন সংগ্রহ করুন।',
    longDescEn: 'Filter database nodes by Location and Industry Type to output lead lists.',
    instructionsBn: [
      'টার্গেট ইন্ডাস্ট্রি সিলেক্ট করুন।',
      'ডাটা সার্চ ইঞ্জিন চালু করুন।',
      'ভেরিফাইড ইমেইল সাবমিট করুন।'
    ],
    instructionsEn: [
      'Select target industry.',
      'Run extraction tool.',
      'Submit validated email list.'
    ],
    skillsRequiredEn: ['B2B Research', 'Data Scraping'],
    skillsRequiredBn: ['বিটুবি রিসার্চ', 'ডাটা কালেকশন']
  },
  {
    id: 'video-submit-work',
    titleEn: 'Video Review',
    titleBn: 'ভিডিও দেখা ও রিভিউ',
    tag: 'NEW',
    iconName: 'Video',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    rewardEn: '$2.20 - $3.50 per review',
    rewardBn: '৳২২০ - ৳৩৫০ প্রতি রিভিউ',
    estimatedTimeEn: '5-10 mins',
    estimatedTimeBn: '৫-১০ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'ভিডিও দেখে ২ লাইনের রিভিউ ও মতামত জমা দিন।',
    shortDescEn: 'Watch promotional videos and submit qualitative feedback reviews.',
    longDescBn: 'ভিডিও রিভিউ: কনটেন্টটি দেখে সংক্ষেপে রিভিউ লিখে সাবমিট করুন।',
    longDescEn: 'Watch promotional clips and draft a concise qualitative review.',
    instructionsBn: [
      'ভিডিওটি প্লে করে ৩০ সেকেন্ড দেখুন।',
      'সংক্ষিপ্ত রিভিউ লিখুন।',
      'সাবমিট বাটনে ক্লিক করুন।'
    ],
    instructionsEn: [
      'Watch video clip for 30s.',
      'Write a brief review.',
      'Click submit.'
    ],
    skillsRequiredEn: ['Review Writing', 'Video Watching'],
    skillsRequiredBn: ['মতামত লেখা', 'ভিডিও দেখা']
  },
  {
    id: 'product-selling-work',
    titleEn: 'Offer Selling',
    titleBn: 'অফার সেলিং',
    tag: 'HIGH PAY',
    iconName: 'ShoppingBag',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    rewardEn: '৳30 - ৳200 per pack',
    rewardBn: '৳৩০ - ৳২০০ প্রতি অফার',
    estimatedTimeEn: '5-10 mins',
    estimatedTimeBn: '৫-১০ মিনিট',
    difficultyEn: 'Medium',
    difficultyBn: 'সহজ',
    shortDescBn: 'মোবাইল অপারেটরের সাশ্রয়ী ইন্টারনেট এমবি ও টকটাইম অফার বিক্রি করে কমিশন পান।',
    shortDescEn: 'Sell mobile operator internet MB & minutes packages to claim instant commissions.',
    longDescBn: 'সিম অফার সেলিং পোর্টালে আপনি কোনো রকম অগ্রিম ইনভেস্টমেন্ট ছাড়াই জিপি, বাংলালিংক, রবি, এয়ারটেল এবং টেলিটকের ইন্টারনেট ও মিনিট প্যাক কাস্টমারের কাছে বিক্রি করতে পারবেন। ইউনিক ট্র্যাকিং লিঙ্ক শেয়ার করে ক্রেতার মোবাইল নম্বর ও সঠিক ডিভিশন এন্ট্রি করে কমিশন দাবি করুন।',
    longDescEn: 'Earn massive commissions by reselling hot mobile operator internet, minutes and combo packages. Simply select a high-converting SIM offer, generate your affiliate link, and log the buyer\'s phone number to instantly earn your BDT cash profit.',
    instructionsBn: [
      'নিচের তালিকা থেকে একটি আকর্ষণীয় মোবাইল অপারেটর অফার (এমবি বা মিনিট) সিলেক্ট করুন।',
      'ইউনিক ট্র্যাকিং লিঙ্ক তৈরি বাটনে ক্লিক করে শেয়ারিং লিঙ্ক তৈরি করুন।',
      'নিচে ক্রেতার মোবাইল নম্বর এবং অফার ডিভিশন এন্ট্রি করুন।',
      'অর্ডার সাবমিট করে ৩০% বা তার বেশি সরাসরি নগদ কমিশন আপনার ব্যালেন্সে যোগ করুন।'
    ],
    instructionsEn: [
      'Select a high-converting mobile internet (MB) or minutes offer from the list.',
      'Click the generate button to get your unique trackable affiliate link.',
      'Enter the buyer\'s mobile phone number and regional division details.',
      'Submit the sales order to instantly claim your 30%+ cash commission in your wallet.'
    ],
    skillsRequiredEn: ['Telecom Reselling', 'Affiliate Marketing', 'Order Booking'],
    skillsRequiredBn: ['টেলিকম রিসেলিং', 'এফিলিয়েট মার্কেটিং', 'অর্ডার বুকিং']
  },
  {
    id: 'photo-editing',
    titleEn: 'Photo Editing',
    titleBn: 'ফটো এডিটিং',
    tag: 'NEW',
    iconName: 'Image',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
    rewardEn: '$3.00 - $5.50 per photo',
    rewardBn: '৳৩০০ - ৳৫৫০ প্রতি ছবি',
    estimatedTimeEn: '6-12 mins',
    estimatedTimeBn: '৬-১২ মিনিট',
    difficultyEn: 'Medium',
    difficultyBn: 'মাঝারি',
    shortDescBn: 'ব্রাইটনেস ও কালার এডজাস্ট করে ছবি রিটাচ করুন।',
    shortDescEn: 'Retouch customer portraits and product photos.',
    longDescBn: 'ফটো এডিটিং: ব্রাইটনেস, কন্ট্রাস্ট ও ফিল্টার এডজাস্ট করে ছবি জমা দিন।',
    longDescEn: 'Photo Editing: adjust brightness, contrast, and apply filters to source images.',
    instructionsBn: [
      'কাস্টমার ইমেজ দেখুন।',
      'স্লাইডার দিয়ে আলো ও কন্ট্রাস্ট এডজাস্ট করুন।',
      'ছবি সাবমিট করুন।'
    ],
    instructionsEn: [
      'Inspect the source image.',
      'Adjust sliders for Brightness and Contrast.',
      'Click submit photo.'
    ],
    skillsRequiredEn: ['Color Grading', 'Contrast'],
    skillsRequiredBn: ['কালার এডজাস্ট', 'কন্ট্রাস্ট']
  },
  {
    id: 'video-editing',
    titleEn: 'Video Editing',
    titleBn: 'ভিডিও এডিটিং',
    tag: 'NEW',
    iconName: 'Film',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    rewardEn: '$4.50 - $8.00 per clip',
    rewardBn: '৳৪৫০ - ৳৮০০ প্রতি ক্লিপ',
    estimatedTimeEn: '8-15 mins',
    estimatedTimeBn: '৮-১৫ মিনিট',
    difficultyEn: 'Medium',
    difficultyBn: 'মাঝারি',
    shortDescBn: 'ক্লিপ সাজিয়ে ও ট্রানজিশন দিয়ে ভিডিও বানান।',
    shortDescEn: 'Arrange promo clips and apply transitions to edit final videos.',
    longDescBn: 'ভিডিও এডিটিং: শর্ট ক্লিপ সঠিক ক্রমে ট্রিম করে ও ট্রানজিশন দিয়ে সেভ করুন।',
    longDescEn: 'Arrange, trim, and apply transition effects to raw video assets.',
    instructionsBn: [
      'টাইমলাইনে ক্লিপ সাজান।',
      'সময় ট্রিম করুন।',
      'ট্রানজিশন দিয়ে রেন্ডার করুন।'
    ],
    instructionsEn: [
      'Arrange video tracks in timeline.',
      'Trim track duration.',
      'Apply transitions and render.'
    ],
    skillsRequiredEn: ['Timeline Sequencing', 'Trimming'],
    skillsRequiredBn: ['টাইমলাইন সাজানো', 'ক্লিপ ট্রিম']
  },
  {
    id: 'computer-training',
    titleEn: 'Computer Training',
    titleBn: 'কম্পিউটার ট্রেনিং',
    tag: 'NEW',
    iconName: 'Monitor',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    rewardEn: '$3.50 - $6.00 per lab',
    rewardBn: '৳৩৫০ - ৳৬০০ প্রতি ল্যাব',
    estimatedTimeEn: '8-12 mins',
    estimatedTimeBn: '৮-১২ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'কীবোর্ড শর্টকাট ও বেসিক ওএস কমান্ড প্র্যাকটিস করুন।',
    shortDescEn: 'Master basic operating system file operations and shortcuts.',
    longDescBn: 'কম্পিউটার ল্যাব: ফাইল নেভিগেশন, উইন্ডোজ শর্টকাট ও এক্সেল টেস্ট সম্পূর্ণ করুন।',
    longDescEn: 'Solve real-time command tasks and execute critical keyboard shortcuts.',
    instructionsBn: [
      'ল্যাব নির্দেশিকা পড়ুন।',
      'প্রয়োজনীয় শর্টকাট প্রেস করুন।',
      'টেস্ট সফল করে সার্টিফিকেট নিন।'
    ],
    instructionsEn: [
      'Read lab instructions.',
      'Press required shortcuts.',
      'Complete test to claim credit.'
    ],
    skillsRequiredEn: ['OS Operations', 'Keyboard Shortcuts'],
    skillsRequiredBn: ['উইন্ডোজ ব্যবহার', 'কীবোর্ড শর্টকাট']
  },
  {
    id: 'social-media-management',
    titleEn: 'Social Media Management',
    titleBn: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট',
    tag: 'HIGH PAY',
    iconName: 'Share2',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    rewardEn: '$10.00 - $45.00 per contract',
    rewardBn: '৳১,০০০ - ৳৪,৫০০ (৩-৭ দিন)',
    estimatedTimeEn: '3-7 days',
    estimatedTimeBn: '৩-৭ দিন',
    difficultyEn: 'Medium',
    difficultyBn: 'মাঝারি',
    shortDescBn: 'ফেসবুক, টিকটক, ইনস্টাগ্রাম পেজ ও চ্যানেলের মডারেটর হিসেবে কাজ করুন ও চুক্তিভিত্তিক পেমেন্ট পান।',
    shortDescEn: 'Work as Facebook, TikTok, Instagram page & channel moderator with contract payments.',
    longDescBn: 'সোশ্যাল মিডিয়া মডারেটর নিয়োগ: বিভিন্ন প্ল্যাটফর্ম যেমন ফেসবুক পেজ, টিকটক চ্যানেল, আইডি, ইনস্টাগ্রাম ও ইউটিউবের ৩-৭ দিনের চুক্তিভিত্তিক মডারেটর পদে আবেদন করুন।',
    longDescEn: 'Social Media Moderator Roles: Apply for 3 to 7 days contract moderator positions across Facebook, TikTok, Instagram and YouTube.',
    instructionsBn: [
      'আপনার পছন্দের মডারেটর রোল (ফেসবুক, টিকটক, ইনস্টাগ্রাম ইত্যাদি) নির্বাচন করুন।',
      'মেয়াদ (৩ দিন বা ৭ দিন) ও বেতন দেখে "এপ্লাই করুন" বাটনে চাপুন।',
      'আমাদের অফিশিয়াল ফেসবুক পেজে যোগাযোগ করে অ্যাপয়েন্টমেন্ট কনফার্ম করুন।'
    ],
    instructionsEn: [
      'Choose your preferred moderator role (Facebook, TikTok, Instagram, etc).',
      'Review contract duration (3 or 7 days) and salary, then click "Apply Now".',
      'Contact our official Facebook page to confirm your onboarding.'
    ],
    skillsRequiredEn: ['Page Management', 'Customer Engagement'],
    skillsRequiredBn: ['পেজ ম্যানেজমেন্ট', 'অডিয়েন্স রিপ্লাই']
  },
  {
    id: 'content-writing',
    titleEn: 'Content Writing',
    titleBn: 'কন্টেন্ট রাইটিং',
    tag: 'POPULAR',
    iconName: 'Edit3',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    rewardEn: '$5.00 - $9.00 per article',
    rewardBn: '৳৫০০ - ৳৯০০ প্রতি আর্টিকেল',
    estimatedTimeEn: '15-20 mins',
    estimatedTimeBn: '১৫-২০ মিনিট',
    difficultyEn: 'Medium',
    difficultyBn: 'মাঝারি',
    shortDescBn: 'নির্দিষ্ট টপিক নিয়ে আকর্ষণীয় এসইও বান্ধব ব্লগ পোস্ট ও আর্টিকেল লিখুন।',
    shortDescEn: 'Write engaging, SEO-optimized blog posts and articles for client brands.',
    longDescBn: 'কন্টেন্ট রাইটিং: প্রদত্ত কি-ওয়ার্ড ও টাইটেল অনুযায়ী ৫০০ শব্দের মানসম্মত আর্টিকেল লিখে সাবমিট করুন।',
    longDescEn: 'Draft high-quality, well-structured 500-word articles with appropriate heading structure and targeted SEO keywords.',
    instructionsBn: [
      'মূল বিষয়বস্তু ও কি-ওয়ার্ডগুলো পর্যবেক্ষণ করুন।',
      'প্যারাগ্রাফ ও হেডিং সহ আর্টিকেলটি টাইপ করুন।',
      'গ্রামার ও সঠিকতা নিশ্চিত করে সাবমিট করুন।'
    ],
    instructionsEn: [
      'Review target topic guidelines and SEO keywords.',
      'Compose structured article with headings and body.',
      'Perform proofreading and click submit.'
    ],
    skillsRequiredEn: ['SEO Writing', 'Grammar & Tone'],
    skillsRequiredBn: ['এসইও রাইটিং', 'ব্যাকরণ ও বানান']
  },
  {
    id: 'drop-shipping',
    titleEn: 'Drop Shipping',
    titleBn: 'ড্রপ শিপিং',
    tag: 'HIGH PAY',
    iconName: 'Truck',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    rewardEn: '$8.00 - $15.00 per order',
    rewardBn: '৳৮০০ - ৳১৫০০ প্রতি অর্ডার',
    estimatedTimeEn: '10-15 mins',
    estimatedTimeBn: '১০-১৫ মিনিট',
    difficultyEn: 'Hard',
    difficultyBn: 'কঠিন',
    shortDescBn: 'কোনো স্টক ছাড়াই সাপ্লায়ারের পোরডাক্ট কাস্টমারের ঠিকানায় ড্রপশিপিং ডেলিভারি করুন।',
    shortDescEn: 'Manage supplier product listings and process customer drop shipping orders directly.',
    longDescBn: 'ড্রপ শিপিং বিজনেস: আপনার অনলাইন শপ বা কাস্টমার অডিয়েন্স থেকে অর্ডারের তথ্য নিয়ে সরাসরি গ্লোবাল সাপ্লায়ার হাবের মাধ্যমে ডেলিভারি বুকিং নিশ্চিত করুন এবং আকর্ষণীয় প্রফিট মার্জিন রাখুন।',
    longDescEn: 'Fulfill client e-commerce orders by placing supplier order requests with verified shipping addresses, keeping zero physical inventory.',
    instructionsBn: [
      'কাস্টমারের পেমেন্ট ও ডেলিভারি তথ্য যাচাই করুন।',
      'সাপ্লায়ার সেন্টারে অর্ডার পেস্ট করুন।',
      'ট্র্যাকিং নম্বর নিয়ে কাজ সম্পন্ন করুন।'
    ],
    instructionsEn: [
      'Verify buyer shipping address and order specs.',
      'Forward order details to supplier logistics portal.',
      'Input generated tracking ID to complete task.'
    ],
    skillsRequiredEn: ['Order Processing', 'Logistics Tracking'],
    skillsRequiredBn: ['অর্ডার প্রসেসিং', 'লজিস্টিকস ট্র্যাকিং']
  },
  {
    id: 'gaming-tournament',
    titleEn: 'Gaming Tournament',
    titleBn: 'গেমিং টুর্নামেন্ট',
    tag: 'NEW',
    iconName: 'Gamepad2',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    rewardEn: '$3.00 - $10.00 per match',
    rewardBn: '৳৩০০ - ৳১০০০ প্রতি ম্যাচ',
    estimatedTimeEn: '15-30 mins',
    estimatedTimeBn: '১৫-৩০ মিনিট',
    difficultyEn: 'Medium',
    difficultyBn: 'মাঝারি',
    shortDescBn: 'ই-স্পোর্টস স্কোয়াড ম্যাচ খেলুন এবং পয়েন্ট বানিয়ে নগদ পুরস্কার জিতুন।',
    shortDescEn: 'Participate in esports matches, log game match scores & claim tournament rewards.',
    longDescBn: 'গেমিং টুর্নামেন্ট: ফ্রি ফায়ার, পাবজি বা কল অফ ডিউটি টুর্নামেন্ট কক্ষে যুক্ত হয়ে রূম আইডি দিয়ে স্কিল প্রদর্শন করুন এবং লিডারবোর্ড থেকে ক্যাশ প্রাইজ জয় করুন।',
    longDescEn: 'Join active esports room matches, submit match placement screenshots and stats to claim cash prize pools.',
    instructionsBn: [
      'প্রদত্ত টুর্নামেন্ট রুম আইডি ও পাসওয়ার্ড কপি করুন।',
      'নির্দিষ্ট সময়ে গেম রুমে জয়েন করুন।',
      'ম্যাচ শেষে আপনার স্কোর বা কিল কাউন্ট সাবমিট করুন।'
    ],
    instructionsEn: [
      'Copy generated custom room ID and passcode.',
      'Join tournament lobby at scheduled time.',
      'Submit final match rank screenshot or kill count.'
    ],
    skillsRequiredEn: ['Esports Gaming', 'Teamwork'],
    skillsRequiredBn: ['গেমিং স্কিল', 'টিমওয়ার্ক']
  },
  {
    id: 'website-visit',
    titleEn: 'Website Visit',
    titleBn: 'ওয়েবসাইট ভিজিট',
    tag: 'EASY',
    iconName: 'Globe',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
    rewardEn: '$0.10 - $0.30 per visit',
    rewardBn: '৳১০ - ৳৩০ প্রতি ভিজিট',
    estimatedTimeEn: '1-2 mins',
    estimatedTimeBn: '১-২ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'নির্ধারিত ওয়েবসাইটে ব্রাউজ ও এডস ভিউ করে ১-২ মিনিটে রিওয়ার্ড আর্ন করুন।',
    shortDescEn: 'Visit websites, view sponsored ads & earn instant commissions.',
    longDescBn: 'ওয়েবসাইট ভিজিট: www.unityearning.com ওয়েবসাইটে ১-২ মিনিট অবস্থান করুন, বিজ্ঞাপন ও পেজ ঘুরে দেখে কমিশন ইনকাম করুন।',
    longDescEn: 'Visit www.unityearning.com, browse sponsored ads for 1-2 minutes and claim instant cash reward.',
    instructionsBn: [
      'ওয়েবসাইট ভিজিট লিংকে ক্লিক করুন (www.unityearning.com)।',
      'কমপক্ষে ১-২ মিনিট পেজ ও এডস ব্রাউজ করুন।',
      'টাইমার শেষ হলে টাস্ক সাবমিট করে বোনাস ক্লেইম করুন।'
    ],
    instructionsEn: [
      'Click Visit Website link (www.unityearning.com).',
      'Stay on page and view ads for 1-2 minutes.',
      'Submit completed task to claim your commission.'
    ],
    skillsRequiredEn: ['Web Browsing', 'Basic Verification'],
    skillsRequiredBn: ['ওয়েব ব্রাউজিং', 'ভেরিফিকেশন']
  }
];

export const INITIAL_PROFILE: UserProfile = {
  uid: 'UE-2026-9842',
  fullName: 'Habiba Akter',
  email: 'habiba.akter2026@gmail.com',
  phone: '01712-345678',
  bio: 'প্রফেশনাল ডিজিটাল মাইক্রো-টাস্ক ও ইমেইল মার্কেটিং বিশেষজ্ঞ।',
  address: 'মিরপুর ২, ঢাকা ১২১৬, বাংলাদেশ',
  avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=HabibaAkter',
  balance: 3400,
  totalIncome: 66400,
  tasksCompleted: 632,
  level: 'Gold Rank',
  points: 2730,
  joinedDate: '2026-07-01'
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'typing-booster',
    nameBn: 'টাইপিং স্পিড বুস্টার প্রো',
    nameEn: 'Typing Speed Booster Pro',
    price: 10.00,
    descBn: 'এই টুলটি অ্যাক্টিভেট করলে টাইপিং কাজের প্রতি সাবমিশনে ৩০% অতিরিক্ত ডেমো বোনাস যোগ হবে।',
    descEn: 'Boosts simulated earnings for all typing jobs by 30% per completed task.',
    iconName: 'Zap',
    purchased: false,
    benefitBn: '৩০% এক্সট্রা আর্নিং পাওয়ার',
    benefitEn: '30% Extra Earning Power'
  },
  {
    id: 'premium-badge',
    nameBn: 'গোল্ডেন প্রিমিয়াম মেম্বারশিপ',
    nameEn: 'Golden Premium Membership',
    price: 25.00,
    descBn: 'প্রোফাইলে গোল্ডেন ব্যাজ যুক্ত হবে যা হাই পেয়িং ফেসবুক এবং ইমেইল মার্কেটিং কাজগুলি আনলক করে।',
    descEn: 'Adds an elite Golden badge to your profile and unlocks VIP marketing campaigns.',
    iconName: 'Crown',
    purchased: false,
    benefitBn: 'ভিআইপি প্রজেক্ট আনলক',
    benefitEn: 'Unlock VIP Projects'
  },
  {
    id: 'lead-extractor',
    nameBn: 'লিড জেনারেটর অটোমেশন স্ক্রিপ্ট',
    nameEn: 'Lead Extractor Automation Script',
    price: 18.00,
    descBn: 'লিড জেনারেশন সার্চ মডিউলে ডাবল স্পিডে এবং ১০০% একুরেট সার্চিং সম্পন্ন করার প্রফেশনাল লাইসেন্স।',
    descEn: 'Unlocks advanced industry filters and automates lead verification scripts.',
    iconName: 'Cpu',
    purchased: false,
    benefitBn: 'অটোমেটেড ডাটা স্ক্র্যাপিং',
    benefitEn: 'Automated Lead Extraction'
  },
  {
    id: 'ad-designer-kit',
    nameBn: 'ফেসবুক অ্যাড ক্রিয়েটিভ কিট',
    nameEn: 'FB Ad Template Creative Kit',
    price: 12.50,
    descBn: 'প্রফেশনাল ফেসবুক মার্কেটিং এর জন্য ৫০+ প্রি-ডিজাইন করা হাই কনভার্টিং ব্যানার এবং কপিরাইটিং টেমপ্লেট।',
    descEn: 'Access 50+ custom-styled high-CTR banners and templates for Facebook campaigns.',
    iconName: 'Palette',
    purchased: false,
    benefitBn: 'হাই কনভার্টিং ব্যানার টেমপ্লেট',
    benefitEn: 'High-CTR Social Templates'
  }
];

export const DEFAULT_TASK_LOGS: TaskLog[] = [
  {
    id: 'log-static-50',
    jobId: 'video-job',
    jobTitleBn: 'ভিডিও এডিটিং কাজ: রিলস ও টিকটক শর্টস এডিট',
    jobTitleEn: 'Video Editing Job: Reels & TikTok Shorts Edit',
    reward: 2.00,
    date: '2026-07-07, 10:45 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-49',
    jobId: 'video-job',
    jobTitleBn: 'ভিডিও এডিটিং কাজ: প্রফেশনাল ইউটিউব ইন্ট্রো এডিট',
    jobTitleEn: 'Video Editing Job: Professional YouTube Intro Edit',
    reward: 1.50,
    date: '2026-07-07, 09:12 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-48',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ফেসবুক পেজ ফলো ও লাইক ক্যাম্পেইন',
    jobTitleEn: 'Digital Marketing: Facebook Page Follow & Like Campaign',
    reward: 0.85,
    date: '2026-07-06, 11:30 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-47',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: এমএস ওয়ার্ড থেকে এক্সেল শিটে ডাটা এন্ট্রি',
    jobTitleEn: 'Typing Job: MS Word to Excel Sheet Data Entry',
    reward: 1.80,
    date: '2026-07-06, 08:24 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-46',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: গুগল ম্যাপস বিজনেস লিস্টিং ও রিভিউ',
    jobTitleEn: 'Digital Marketing: Google Maps Business Listing & Reviews',
    reward: 1.20,
    date: '2026-07-06, 05:15 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-45',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: পিডিজি ফাইল দেখে বাংলা আর্টিকেল রাইটিং',
    jobTitleEn: 'Typing Job: PDF File to Bengali Article Writing',
    reward: 1.60,
    date: '2026-07-06, 02:40 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-44',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ইউটিউব ওয়াচ টাইম বুস্টার টাস্ক',
    jobTitleEn: 'Digital Marketing: YouTube Watch Time Booster Task',
    reward: 0.95,
    date: '2026-07-06, 11:10 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-43',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: অনলাইন ফর্ম ও কাস্টমার ডাটাবেস এন্ট্রি',
    jobTitleEn: 'Typing Job: Online Form & Customer Database Entry',
    reward: 2.10,
    date: '2026-07-06, 09:05 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-42',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: লিংকডইন প্রফেশনাল প্রোফাইল প্রমোশন',
    jobTitleEn: 'Digital Marketing: LinkedIn Professional Profile Promotion',
    reward: 1.45,
    date: '2026-07-05, 09:50 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-41',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: হাতে লেখা নোট থেকে ডিজিটাল কন্টেন্ট টাইপ',
    jobTitleEn: 'Typing Job: Handwritten Notes to Digital Content Type',
    reward: 2.40,
    date: '2026-07-05, 07:12 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-40',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ইনস্টাগ্রাম রিলস অরগানিক শেয়ারিং',
    jobTitleEn: 'Digital Marketing: Instagram Reels Organic Sharing',
    reward: 1.10,
    date: '2026-07-05, 04:30 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-39',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: শপিফাই প্রোডাক্ট ডেসক্রিপশন ডাটা কপি পেস্ট',
    jobTitleEn: 'Typing Job: Shopify Product Description Copy Paste',
    reward: 1.75,
    date: '2026-07-05, 01:15 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-38',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: টুইটার কাস্টম হ্যাসট্যাগ ট্রেন্ডিং টাস্ক',
    jobTitleEn: 'Digital Marketing: Twitter Custom Hashtag Trending Task',
    reward: 0.80,
    date: '2026-07-05, 11:02 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-37',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: বাংলা ক্যাপচা সলভিং প্রজেক্ট ভলিউম-১',
    jobTitleEn: 'Typing Job: Bengali Captcha Solving Project Vol-1',
    reward: 0.65,
    date: '2026-07-05, 08:45 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-36',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ফেসবুক গ্রুপ মেম্বার অ্যাক্টিভেশন',
    jobTitleEn: 'Digital Marketing: Facebook Group Member Activation',
    reward: 1.05,
    date: '2026-07-04, 10:20 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-35',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: ই-কমার্স ইনভেন্টরি ম্যানেজমেন্ট ডাটা এন্ট্রি',
    jobTitleEn: 'Typing Job: E-commerce Inventory Management Entry',
    reward: 2.20,
    date: '2026-07-04, 08:05 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-34',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: টেলিগ্রাম চ্যানেল অর্গানিক গ্রোথ',
    jobTitleEn: 'Digital Marketing: Telegram Channel Organic Growth',
    reward: 0.90,
    date: '2026-07-04, 05:40 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-33',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: পিডিএফ থেকে ওয়ার্ড ফাইল কনভার্সন',
    jobTitleEn: 'Typing Job: PDF to Word File Conversion',
    reward: 1.30,
    date: '2026-07-04, 02:12 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-32',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: পিন্টারেস্ট ইমেজ এসইও ও বোর্ড লিস্টিং',
    jobTitleEn: 'Digital Marketing: Pinterest Image SEO & Board Listing',
    reward: 1.25,
    date: '2026-07-04, 10:50 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-31',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: অনলাইন এডুকেশন পোর্টাল ফর্ম ফিলআপ',
    jobTitleEn: 'Typing Job: Online Education Portal Form Fill',
    reward: 1.50,
    date: '2026-07-04, 08:30 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-30',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ফেসবুক পেজ মেসেঞ্জার চ্যাটবট সেটআপ',
    jobTitleEn: 'Digital Marketing: FB Page Messenger Chatbot Setup',
    reward: 2.50,
    date: '2026-07-03, 09:15 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-29',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: অফলাইন রিয়েল এস্টেট ক্লায়েন্ট ডাটা এন্ট্রি',
    jobTitleEn: 'Typing Job: Offline Real Estate Client Data Entry',
    reward: 1.90,
    date: '2026-07-03, 06:40 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-28',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ইউটিউব এসইও এবং ভিডিও কীওয়ার্ড অপ্টিমাইজ',
    jobTitleEn: 'Digital Marketing: YouTube SEO & Video Keywords',
    reward: 1.60,
    date: '2026-07-03, 04:10 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-27',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: মেডিকেল প্রেসক্রিপশন ডিজিটাল ডাটা এন্ট্রি',
    jobTitleEn: 'Typing Job: Medical Prescription Digital Data Entry',
    reward: 2.30,
    date: '2026-07-03, 01:25 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-26',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ফেসবুক রিমার্কেটিং অডিয়েন্স সেটআপ',
    jobTitleEn: 'Digital Marketing: Facebook Remarketing Audience Setup',
    reward: 1.85,
    date: '2026-07-03, 11:05 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-25',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: বুক পাবলিশিং চ্যাপ্টার ওয়াইজ টাইপিং',
    jobTitleEn: 'Typing Job: Book Publishing Chapter Wise Typing',
    reward: 2.75,
    date: '2026-07-03, 08:45 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-24',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: লিংকডইন কোম্পানি পেজ গ্রোথ',
    jobTitleEn: 'Digital Marketing: LinkedIn Company Page Growth',
    reward: 1.40,
    date: '2026-07-02, 10:20 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-23',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: ক্যাপচা এন্ট্রি প্রজেক্ট ভলিউম-২',
    jobTitleEn: 'Typing Job: Captcha Entry Project Vol-2',
    reward: 0.70,
    date: '2026-07-02, 07:55 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-22',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: টুইটার স্পেস ক্যাম্পেইন প্রমোশন',
    jobTitleEn: 'Digital Marketing: Twitter Space Campaign Promotion',
    reward: 1.30,
    date: '2026-07-02, 05:10 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-21',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: এক্সেল শীট ফাইনান্সিয়াল ডাটা সাজানো',
    jobTitleEn: 'Typing Job: Excel Sheet Financial Data Sorting',
    reward: 2.15,
    date: '2026-07-02, 02:40 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-20',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ইনস্টাগ্রাম হ্যাশট্যাগ রিসার্চ টাস্ক',
    jobTitleEn: 'Digital Marketing: Instagram Hashtags Research Task',
    reward: 0.90,
    date: '2026-07-02, 11:15 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-19',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: ওয়েবসাইট এফএকিউ পেজ কন্টেন্ট রাইটিং',
    jobTitleEn: 'Typing Job: Website FAQ Page Content Writing',
    reward: 1.65,
    date: '2026-07-02, 09:02 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-18',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: কোয়োরা ব্র্যান্ডেড আনসার প্রমোশন',
    jobTitleEn: 'Digital Marketing: Quora Branded Answer Promotion',
    reward: 1.15,
    date: '2026-07-01, 09:30 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-17',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: পিডিএফ থেকে স্প্রেডশিট ডাটা রিরাইটিং',
    jobTitleEn: 'Typing Job: PDF to Spreadsheet Data Rewriting',
    reward: 1.80,
    date: '2026-07-01, 07:15 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-16',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ফেসবুক পিক্সেল কনফিগারেশন সাপোর্ট',
    jobTitleEn: 'Digital Marketing: Facebook Pixel Configuration Support',
    reward: 2.80,
    date: '2026-07-01, 04:50 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-15',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: কাস্টমার সাপোর্ট চ্যাট রেসপন্স টেমপ্লেট',
    jobTitleEn: 'Typing Job: Customer Support Chat Response Template',
    reward: 1.40,
    date: '2026-07-01, 02:10 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-14',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: গুগলে সার্চ কিওয়ার্ড র‍্যাংকিং বুস্ট',
    jobTitleEn: 'Digital Marketing: Google Search Keyword Ranking Boost',
    reward: 1.55,
    date: '2026-07-01, 11:30 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-13',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: ক্যাপচা এন্ট্রি প্রজেক্ট ভলিউম-৩',
    jobTitleEn: 'Typing Job: Captcha Entry Project Vol-3',
    reward: 0.65,
    date: '2026-07-01, 09:05 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-12',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ফেসবুক শপ প্রোডাক্ট ক্যাটালগ সিঙ্ক',
    jobTitleEn: 'Digital Marketing: Facebook Shop Product Catalog Sync',
    reward: 2.10,
    date: '2026-06-30, 09:40 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-11',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: ব্লগ কন্টেন্ট এডিটিং ও প্রুফরিডিং',
    jobTitleEn: 'Typing Job: Blog Content Editing & Proofreading',
    reward: 1.50,
    date: '2026-06-30, 07:12 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-10',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: পিন্টারেস্ট পিন এবং এসইও অপ্টিমাইজেশন',
    jobTitleEn: 'Digital Marketing: Pinterest Pin & SEO Optimization',
    reward: 1.25,
    date: '2026-06-30, 04:30 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-9',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: ওয়ার্ডপ্রেস আর্টিকেল খসড়া টাইপ',
    jobTitleEn: 'Typing Job: Wordpress Article Draft Typing',
    reward: 1.70,
    date: '2026-06-30, 01:50 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-8',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ইউটিউব সাবস্ক্রাইবার গ্রোথ ক্যাম্পেইন',
    jobTitleEn: 'Digital Marketing: YouTube Subscriber Growth Campaign',
    reward: 1.35,
    date: '2026-06-30, 11:15 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-7',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: ক্লায়েন্ট ফিডব্যাক এক্সেল সিট এন্ট্রি',
    jobTitleEn: 'Typing Job: Client Feedback Excel Sheet Entry',
    reward: 1.10,
    date: '2026-06-30, 08:30 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-6',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ফেসবুক ভিডিও শেয়ার টাস্ক',
    jobTitleEn: 'Digital Marketing: Facebook Video Share Task',
    reward: 0.50,
    date: '2026-06-29, 09:20 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-5',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: হাতে লেখা ফর্ম স্ক্যান থেকে টেক্সট টাইপিং',
    jobTitleEn: 'Typing Job: Handwritten Form Scan to Text Typing',
    reward: 2.25,
    date: '2026-06-29, 06:15 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-4',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: টুইটার রিটুইট ও কমেন্ট থ্রেড',
    jobTitleEn: 'Digital Marketing: Twitter Retweet & Comment Thread',
    reward: 0.60,
    date: '2026-06-29, 03:10 PM',
    status: 'Completed'
  },
  {
    id: 'log-static-3',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: ই-বুক চ্যাপ্টার রচনার ডাটা এন্ট্রি',
    jobTitleEn: 'Typing Job: E-book Chapter Draft Entry',
    reward: 2.00,
    date: '2026-06-29, 11:24 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-2',
    jobId: 'marketing-job',
    jobTitleBn: 'ডিজিটাল মার্কেটিং: ফেসবুক ইনস্ট্যান্ট মেসেজ টেমপ্লেট ডিজাইন',
    jobTitleEn: 'Digital Marketing: Facebook Instant Message Template Design',
    reward: 1.15,
    date: '2026-06-29, 09:05 AM',
    status: 'Completed'
  },
  {
    id: 'log-static-1',
    jobId: 'typing-job',
    jobTitleBn: 'টাইপিং জব: কাস্টমার ইমেল ডাটা লিস্টিং টাস্ক',
    jobTitleEn: 'Typing Job: Customer Email Data Listing Task',
    reward: 1.40,
    date: '2026-06-28, 10:30 AM',
    status: 'Completed'
  }
];
