import { Job, UserProfile, ShopItem, TaskLog } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'typing-job',
    titleEn: 'Typing Job',
    titleBn: 'টাইপিং জব',
    tag: 'POPULAR',
    iconName: 'Keyboard',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    rewardEn: '$2.50 - $4.00 per project',
    rewardBn: '৳২৫০ - ৳৪০০ প্রতি প্রজেক্ট',
    estimatedTimeEn: '5-10 mins',
    estimatedTimeBn: '৫-১০ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'সঠিকভাবে তথ্য এবং ট্রান্সক্রিপশন ডিরেক্টরি টাইপ করে কাস্টমার প্রজেক্ট সাবমিট করুন।',
    shortDescEn: 'Transcribe raw client documents and type text datasets accurately into secure portals.',
    longDescBn: 'ডাটা টাইপিং কাজ হলো আমাদের প্ল্যাটফর্মের অন্যতম গুরুত্বপূর্ণ সেবা। এখানে আপনাকে ক্লায়েন্টের দেওয়া ফাইল বা ইমেজ ফাইল থেকে সঠিক ক্যারেক্টার ও স্পেসিং মেনে নির্ভুলভাবে টাইপ করতে হবে। কোনো বানান ভুল বা কমা-ডট ভুল করা যাবে না। এটি সরাসরি ডাটাবেজ ভ্যালিডেশনের জন্য সাবমিট করা হয়।',
    longDescEn: 'Data typing is a vital contract service on our platform. Your task is to transcribe digital customer files, raw scanned records, or logs into clean digital formats. Accuracy, spacing, and punctuation must match the source files perfectly for real-time validation.',
    instructionsBn: [
      'প্রথমে কাস্টমার ডাটা সোর্সটি মনোযোগ দিয়ে পর্যবেক্ষণ করুন।',
      'নিচের টেক্সট এরিয়াতে কোনো ভুল ছাড়াই হুবহু টাইপ করা শুরু করুন।',
      'আপনার টাইপিং স্পিড এবং ক্যারেক্টার একুরেসি রিয়েল-টাইমে গণনা করা হবে।',
      'কমপক্ষে ৯৫% নির্ভুলতা বজায় রেখে কাজ সম্পন্ন করে সাবমিট করুন।',
      'কোনো অতিরিক্ত স্পেস বা অপ্রয়োজনীয় ক্যারেক্টার এড়িয়ে চলুন।'
    ],
    instructionsEn: [
      'Carefully inspect the provided client source record.',
      'Type the characters exactly as shown in the active workspace field.',
      'Your typing speed and correctness are calculated automatically in real-time.',
      'Maintain at least a 95% accuracy rate to successfully approve the project.',
      'Double-check all punctuation and casing before submitting.'
    ],
    skillsRequiredEn: ['Fast Typing', 'Attention to Detail', 'Keyboard Shortcuts'],
    skillsRequiredBn: ['দ্রুত টাইপিং গতি', 'ক্ষুদ্র বিষয়ে মনোযোগ', 'কীবোর্ড শর্টকাট']
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
    rewardBn: '৳২০ প্রতি ইমেইল সেল',
    estimatedTimeEn: '1-2 mins',
    estimatedTimeBn: '১-২ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'সহজে ইমেইল এবং পাসওয়ার্ড সাবমিট করে প্রতিটি সচল ইমেইলের জন্য ২০ টাকা আয় করুন।',
    shortDescEn: 'Sell active email accounts by submitting credentials for instant $0.20 / ৳20 payouts.',
    longDescBn: 'ইমেইল সেলস কাজের মাধ্যমে আপনি প্রতি সচল ইমেইল এবং পাসওয়ার্ড সাবমিট করার সাথে সাথে ২০ টাকা করে নিশ্চিত কমিশন পাবেন। এখানে কোন জটিল কাজ নেই, শুধু ইমেইল আইডি ও পাসওয়ার্ড প্রদান করলেই হবে।',
    longDescEn: 'Earn instant payouts by submitting working email accounts with their passwords. Receive a flat $0.20 / ৳20 commission for each account.',
    instructionsBn: [
      'প্রথমে একটি সচল ইমেইল অ্যাড্রেস লিখুন।',
      'ইমেইলের সঠিক পাসওয়ার্ডটি টাইপ করুন।',
      'তথ্য সাবমিট করার জন্য বাটনে ক্লিক করুন।',
      'আমাদের অটোমেটেড সিস্টেমে ভেরিফাই হওয়ার পর সাথে সাথে ২০ টাকা কমিশন আপনার ব্যালেন্সে যোগ হবে।'
    ],
    instructionsEn: [
      'Enter an active, working email address.',
      'Provide the correct password for the email.',
      'Click the submit button to initiate automated verification.',
      'Receive instant $0.20 / ৳20 credit in your balance upon successful verification.'
    ],
    skillsRequiredEn: ['Active Email Accounts', 'Account Security', 'Fast Submission'],
    skillsRequiredBn: ['সক্রিয় ইমেইল অ্যাকাউন্ট', 'অ্যাকাউন্ট নিরাপত্তা', 'দ্রুত সাবমিশন']
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
    rewardBn: '৳৩৮০ - ৳৫৫০ প্রতি ক্যাম্পেইন',
    estimatedTimeEn: '10-15 mins',
    estimatedTimeBn: '১০-১৫ মিনিট',
    difficultyEn: 'Medium',
    difficultyBn: 'মাঝারি',
    shortDescBn: 'টার্গেট অডিয়েন্স ও বাজেট নির্ধারণ করে ফেসবুক বিজ্ঞাপন রান করুন।',
    shortDescEn: 'Design ad copy, select target audience profiles, and launch active social media campaigns.',
    longDescBn: 'সোশ্যাল মিডিয়া বিজ্ঞাপন প্রচারের প্রধান উদ্দেশ্য হলো সঠিক কাস্টমারের কাছে বিজ্ঞাপন পৌঁছে দেওয়া। এই কাজে আপনি আকর্ষণীয় হেডলাইন, ইমেজ ও কাস্টমার ইন্টারেস্ট ডেটা সেটআপ করে বিজ্ঞাপন রান করবেন এবং লাইভ এনগেজমেন্ট মনিটর করবেন।',
    longDescEn: 'Social media advertisement execution focuses on matching engaging banners with targeted demographics. Set up post text, define buyer locations, interests, and budget levels, and inspect key statistics like Cost-Per-Click and Reach.',
    instructionsBn: [
      'পোস্টের জন্য একটি আকর্ষণীয় কাস্টমার ক্যাপশন এবং অফার লিখুন।',
      'বিজ্ঞাপনের নির্দিষ্ট লক্ষ্য (যেমন: পেজ লাইক, মেসেজ বৃদ্ধি, বা সেলস) সিলেক্ট করুন।',
      'গ্রাহকদের বয়স, লোকেশন এবং ইন্টারেস্ট (পছন্দসমূহ) নিখুঁতভাবে টার্গেট করুন।',
      'বিজ্ঞাপন রান করুন এবং লাইভ কাস্টমার রিচ ও ইম্প্রেশন চার্টটি পর্যবেক্ষণ করুন।'
    ],
    instructionsEn: [
      'Compose high-converting ad copy with an engaging headline.',
      'Select your promotion target (e.g., Page Followers, Messages, Website Traffic).',
      'Refine target demographics including Location, Age bracket, and Interests.',
      'Publish the advertisement to generate active metrics, impressions, and engagement graphs.'
    ],
    skillsRequiredEn: ['Social Media Copy', 'Target Demographics', 'CPC Optimization'],
    skillsRequiredBn: ['বিজ্ঞাপন স্ক্রিপ্ট রাইটিং', 'টার্গেট অডিয়েন্স রিসার্চ', 'সিপিসি অপ্টিমাইজেশন']
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
    rewardBn: '৳৪৫০ - ৳৭০০ প্রতি ডাটা-লিস্ট',
    estimatedTimeEn: '12-18 mins',
    estimatedTimeBn: '১২-১৮ মিনিট',
    difficultyEn: 'Hard',
    difficultyBn: 'কঠিন',
    shortDescBn: 'ক্লায়েন্টের টার্গেট ইন্ডাস্ট্রি অনুযায়ী ভেরিফাইড বিটুবি লিড ও কন্টাক্ট ডাটা সংগ্রহ করুন।',
    shortDescEn: 'Identify and compile verified business contact databases (B2B leads) for corporate clients.',
    longDescBn: 'লিড জেনারেশন কাজের অর্থ হলো সম্ভাব্য ক্রেতা বা কোম্পানির তথ্য খুঁজে বের করা। এই সিস্টেমে আপনি নির্দিষ্ট ক্যাটাগরি, লোকেশন ও সার্চ ফিল্টার ব্যবহার করে আসল ইমেল, ফোন ও ওয়েবসাইট ডেটা কালেকশন করে ক্লায়েন্টের কাছে সাবমিট করবেন।',
    longDescEn: 'B2B Lead Generation services involve scraping and compiling active contact sheets for target industries. Filter database nodes by Location, Industry Type, and Job Title to output error-free email registers ready for immediate client use.',
    instructionsBn: [
      'প্রথমে ক্লায়েন্টের টার্গেট ইন্ডাস্ট্রি (যেমন: আইটি, রিয়েল এস্টেট, রিটেইল) সিলেক্ট করুন।',
      'টার্গেট কান্ট্রি বা এলাকা নির্বাচন করুন।',
      'লিড সার্চ ইঞ্জিন চালু করে ডাটা মাইনিং প্রক্রিয়া শুরু করুন।',
      'প্রাপ্ত ইমেল এবং কন্টাক্ট ইনফরমেশন ভেরিফাই করে লিস্টটি সরাসরি সাবমিট করুন।'
    ],
    instructionsEn: [
      'Select the target client industry vertical (e.g., Software, Healthcare, Real Estate).',
      'Choose the active geographic target country or region.',
      'Initiate the B2B contact extraction sequence to pull live directory nodes.',
      'Review and filter the extracted emails and submit the validated contact register.'
    ],
    skillsRequiredEn: ['B2B Research', 'Data Scraping', 'Email Format Verification'],
    skillsRequiredBn: ['বিটুবি রিসার্চ', 'ডাটা স্ক্র্যাপিং', 'ইমেল ফরম্যাট যাচাই']
  },
  {
    id: 'form-fillup-work',
    titleEn: 'Form Submission Work',
    titleBn: 'অনলাইন ফরম সাবমিশন ও ডাটা এন্ট্রি',
    tag: 'EASY',
    iconName: 'FileSpreadsheet',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    rewardEn: '$2.00 per submission',
    rewardBn: '৳২০০ প্রতি সাবমিশন',
    estimatedTimeEn: '2-3 mins',
    estimatedTimeBn: '২-৩ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'কাস্টমার ডাটা দেখে অনলাইন ফর্মে নির্ভুলভাবে ইনপুট দিয়ে ২০০ টাকা আয় করুন।',
    shortDescEn: 'Enter client contact databases into online service forms and directories accurately to earn ৳200.',
    longDescBn: 'অনলাইন ফরম ফিলাপ কাজ খুবই সহজ কিন্তু মনোযোগ প্রয়োজন। এখানে আপনাকে ক্লায়েন্টদের অগোছালো ডাটা শিট দেওয়া হবে, যা দেখে আপনাকে ফর্মে সঠিক জায়গায় ক্যারেক্টার টাইপ করতে হবে এবং সঠিক ক্যাটাগরি সিলেক্ট করে সাবমিট করতে হবে।',
    longDescEn: 'Online Form Submission is a direct utility task where you transfer raw corporate registry details into online checkouts and forms. Transcribe the fields precisely matching the provided data cards to guarantee error-free database filing.',
    instructionsBn: [
      'বাম পাশের একটি কাস্টমার ডাটা সোর্স কার্ডটি দেখুন।',
      'ডাটা কার্ডে উল্লিখিত নাম, ইমেইল, এড্রেস ও কান্ট্রি ডানের ফর্মে সঠিকভাবে ইনপুট দিন।',
      'স্পেলিং বা টাইপিং ভুল এড়াতে ফিল্ডগুলি রি-চেক করুন।',
      'সব তথ্য ইনপুট দেওয়া হয়ে গেলে ফর্মটি ভেরিফাই এবং সাবমিট বাটনে ক্লিক করুন।'
    ],
    instructionsEn: [
      'Review the raw customer data card provided in the active workspace.',
      'Accurately key in the Name, Email, Address, and Country into the corresponding form.',
      'Ensure zero spelling mismatches or empty fields.',
      'Check the declaration statement and click "Submit Completed Form" to verify.'
    ],
    skillsRequiredEn: ['Data Entry Speed', 'Field Mapping', 'Attention to Detail'],
    skillsRequiredBn: ['ডাটা এন্ট্রি স্পিড', 'ডাটা ফিল্ড ম্যাপিং', 'সঠিকতা যাচাই']
  },
  {
    id: 'data-entry-work',
    titleEn: 'Client Data Entry',
    titleBn: 'ক্লায়েন্ট ডাটা এন্ট্রি (Data Entry)',
    tag: 'POPULAR',
    iconName: 'Database',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    rewardEn: '$3.00 - $5.00 per dataset',
    rewardBn: '৳৩০০ - ৳৫০০ প্রতি ডাটা সেট',
    estimatedTimeEn: '8-12 mins',
    estimatedTimeBn: '৮-১২ মিনিট',
    difficultyEn: 'Medium',
    difficultyBn: 'মাঝারি',
    shortDescBn: '১০০ জন ক্লায়েন্টের নাম এবং ইউআইডি ডাটা চেক করে এক্সেল সাবমিশন করুন।',
    shortDescEn: 'Verify and submit 100 client data entries with Names and UIDs in a professional spreadsheet.',
    longDescBn: 'ক্লায়েন্ট ডাটা এন্ট্রি হলো অন্যতম গুরুত্বপূর্ণ কাজ। এখানে ১০০ জন ক্লায়েন্টের নাম ও ইউআইডি লিস্ট থাকবে। যেকোনো ক্লায়েন্টের ওপর ক্লিক করলে তার সম্পূর্ণ বিস্তারিত ডাটা দেখা যাবে এবং নিচে ডাটা এক্সেল শিটে সেভ করার জন্য সাবমিট অপশন থাকবে।',
    longDescEn: 'Client Data Entry manages a live directory of 100 unique corporate client accounts. Clicking an entry allows you to view their detailed data sheet in an Excel-like grid, and verify/submit it for immediate database filing.',
    instructionsBn: [
      'প্রথমে যেকোনো একজন ক্লায়েন্ট সিলেক্ট করুন যার ডাটা সাবমিট করা হয়নি।',
      'ক্লিক করলে ক্লায়েন্টের বিস্তারিত নাম, ইউআইডি এবং ডাটা গ্রিড দেখতে পাবেন।',
      'ডাটা ও পণ্যের মূল্য মিলিয়ে নিন।',
      'নিচে "ডাটাশিট সাবমিট করুন" বাটনে ক্লিক করে ডেটাবেজে ফাইল সেভ করুন।'
    ],
    instructionsEn: [
      'Select any client from the list of 100 entries whose status is still pending.',
      'Click the client to inspect details and view their spreadsheet data.',
      'Verify the product prices and balances.',
      'Click "Submit Client Datasheet" below to file it to the client server.'
    ],
    skillsRequiredEn: ['Client Registry Management', 'Excel Formatting', 'UID Verification'],
    skillsRequiredBn: ['ক্লায়েন্ট রেজিস্ট্রি ম্যানেজমেন্ট', 'এক্সেল ফরম্যাটিং', 'ইউআইডি ভেরিফিকেশন']
  },
  {
    id: 'video-submit-work',
    titleEn: 'Media Campaign & Review',
    titleBn: 'মিডিয়া ক্যাম্পেইন এবং রিভিউ',
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
    shortDescBn: 'প্রোমোশনাল কনটেন্ট ও ভিডিও দেখে প্রফেশনাল ফিডব্যাক রিভিউ সাবমিট করুন।',
    shortDescEn: 'Evaluate brand promotional videos, write concise audience reviews, and submit sharing logs.',
    longDescBn: 'মিডিয়া রিভিউ কাজ কনটেন্ট ক্রিয়েটর ও সোশ্যাল প্রচারকদের সহায়তা করে। এখানে আপনাকে নির্দিষ্ট ভিডিওর মূল বার্তা বুঝে তার ওপর একটি গঠনমূলক বিশ্লেষণ রিভিউ লিখতে হবে এবং শেয়ার আইডি লিঙ্ক সহ সাবমিট করতে হবে।',
    longDescEn: 'Media assessment tasks require micro-reviews of active product promo clips. Watch the commercial asset, draft a concise, high-value qualitative feedback report, and submit your sharing verification URL directly into the client database.',
    instructionsBn: [
      'প্রথমে ডানের ভিডিও প্লেয়ারটি প্লে করে অন্ততঃ ৩০ সেকেন্ডের কনটেন্ট দেখুন।',
      'ভিডিওর মূল মেসেজ সম্পর্কে ২ লাইনের একটি চমৎকার প্রফেশনাল ফিডব্যাক রিভিউ বক্সে লিখুন।',
      'শেয়ার লিঙ্কটি কপি করে ভেরিফিকেশন ইউআরএল বক্সে দিন।',
      'বাটনে ক্লিক করে প্রজেক্ট রিভিউ সাবমিশন সম্পন্ন করুন।'
    ],
    instructionsEn: [
      'Watch the promotional video asset for at least 30 seconds to capture the core pitch.',
      'Write a brief 2-sentence professional review focusing on the content quality.',
      'Copy the sharing URL into the Verification URL input field.',
      'Click the submit button to log the completed review directly into the project archive.'
    ],
    skillsRequiredEn: ['Content Evaluation', 'Review Writing', 'Media Tracking'],
    skillsRequiredBn: ['কনটেন্ট মূল্যায়ন', 'রিভিউ রাইটিং', 'মিডিয়া ট্র্যাকিং']
  },
  {
    id: 'product-selling-work',
    titleEn: 'SIM Offer & MB Selling',
    titleBn: 'সিম অফার ও এমবি সেলিং',
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
    shortDescBn: 'ব্রাইটনেস, কন্ট্রাস্ট এবং কালার ফিল্টার অ্যাডজাস্ট করে কাস্টমারের ফটো রিটাচিং করুন।',
    shortDescEn: 'Retouch customer portraits and product photos by adjusting brightness, contrast, and filters.',
    longDescBn: 'ফটো এডিটিং কাজ হলো গ্রাফিক সার্ভিসের একটি গুরুত্বপূর্ণ অংশ। এখানে আপনাকে ক্লায়েন্টের পোর্ট্রেট, প্রোডাক্ট বা ল্যান্ডস্কেপ ইমেজ দেওয়া হবে। ক্লায়েন্টের দেওয়া নির্দেশিকা অনুযায়ী সঠিক ব্রাইটনেস, কন্ট্রাস্ট, স্যাচুরেশন এবং ফিল্টার সেটআপ করে ফটো সাবমিট করুন।',
    longDescEn: 'Photo Editing & Retouching is a highly sought-after creative task. Adjust brightness, contrast, saturation, and apply professional filters to source images matching client guidelines to deliver stunning, high-quality visuals.',
    instructionsBn: [
      'বাম পাশের কাস্টমার প্রজেক্ট ইমেজ এবং ক্লায়েন্টের কালার রিকোয়ারমেন্টটি দেখুন।',
      'নিচের স্লাইডারগুলির সাহায্যে ব্রাইটনেস, কন্ট্রাস্ট, স্যাচুরেশন ও কালার টোন অ্যাডজাস্ট করুন।',
      'লাইভ প্রাকভিউ ইমেজটিতে আপনার এডিটিং পরিবর্তনগুলি সরাসরি লক্ষ করুন।',
      'এডিট সম্পন্ন হয়ে গেলে "ফটো সাবমিট করুন" বাটনে ক্লিক করে কাজ সম্পন্ন করুন।'
    ],
    instructionsEn: [
      'Inspect the client\'s source image and required filter target parameters.',
      'Use the interactive sliders to adjust Brightness, Contrast, Saturation, and special filters.',
      'Observe the live changes on the photo preview viewport in real-time.',
      'Click "Submit Edited Photo" once the values match within target bounds to earn reward.'
    ],
    skillsRequiredEn: ['Color Grading', 'Contrast & Lighting', 'Filter Optimization'],
    skillsRequiredBn: ['কালার গ্রেডিং', 'কন্ট্রাস্ট ও লাইটিং', 'ফিল্টার অপ্টিমাইজেশন']
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
    shortDescBn: 'বিভিন্ন প্রচারণামূলক ভিডিও ক্লিপ সাজিয়ে এবং ট্রানজিশন যোগ করে ভিডিও এডিটিং সম্পন্ন করুন।',
    shortDescEn: 'Arrange promo clips, set trim durations, and apply transitions to edit final marketing videos.',
    longDescBn: 'ভিডিও এডিটিং এর মাধ্যমে আকর্ষণীয় শর্ট এবং রিলে বিজ্ঞাপন তৈরি করা হয়। এখানে আপনাকে সোর্স ক্লিপগুলি সঠিক অর্ডারে সাজাতে হবে, অপ্রয়োজনীয় অংশ ট্রিম করে বাদ দিতে হবে এবং প্রফেশনাল ফেইড বা স্লাইড ট্রানজিশন ইফেক্ট দিয়ে ভিডিওটি রেন্ডার করতে হবে।',
    longDescEn: 'Video editing involves arranging, trimming, and applying transition effects to raw video assets. Correctly arrange the timeline tracks, trim lengths to fit specifications, and select transitions to compile social reels and ads.',
    instructionsBn: [
      'ক্লায়েন্টের কাঙ্ক্ষিত ভিডিও সিকোয়েন্স এবং টাইমলাইন সিক্রেট কোড খেয়াল করুন।',
      'টাইমলাইনে ক্লিপগুলি সঠিক ক্রমানুসারে ড্র্যাগ বা বাটন দিয়ে সাজান।',
      'প্রতিটি ক্লিপের ডিউরেশন (সময়) ট্রিম করে ক্লায়েন্টের দেওয়া সেকেন্ডের সাথে মেলান।',
      'উপযুক্ত ট্রানজিশন ইফেক্ট (যেমন: Fade, Dissolve) যুক্ত করে সাবমিট করুন।'
    ],
    instructionsEn: [
      'Read the client\'s storyboarding timeline and target video duration specs.',
      'Arrange raw video tracks in the timeline in the correct sequence.',
      'Trim the seconds for each track precisely to meet the client\'s guidelines.',
      'Apply transition styles and click "Compile & Render Video" to submit.'
    ],
    skillsRequiredEn: ['Timeline Sequencing', 'Video Trimming', 'Transition Effects'],
    skillsRequiredBn: ['টাইমলাইন সিকোয়েন্সিং', 'ভিডিও ট্রিম করা', 'ট্রানজিশন ইফেক্ট']
  },
  {
    id: 'computer-training',
    titleEn: 'Computer Training',
    titleBn: 'কম্পিউটার ট্রেইনিং',
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
    shortDescBn: 'কম্পিউটারের বেসিক উইন্ডোজ ও অফিস টুলসের ব্যবহার এবং শর্টকাট প্র্যাকটিস করুন।',
    shortDescEn: 'Master basic operating system file operations, shortcuts, and spreadsheet office formulas.',
    longDescBn: 'কম্পিউটার ট্রেইনিং ল্যাবে আপনাকে প্রফেশনাল অফিস বা আইটি কাজের জন্য প্রয়োজনীয় স্কিল শেখানো হবে। এখানে ইন্টারেক্টিভ ল্যাবের মাধ্যমে শর্টকাট কী টাইপিং, ফাইল ম্যানেজার নেভিগেশন এবং স্প্রেডশিটের ফর্মুলা টেস্ট সম্পূর্ণ করে সার্টিফাইড ক্রেডিট অর্জন করুন।',
    longDescEn: 'Computer Training offers interactive simulated OS, file management, and office tool laboratories. Solve real-time command tasks, execute critical keyboard shortcuts, and compile spreadsheet formulas to build core computing skills.',
    instructionsBn: [
      'বাম পাশের ল্যাব টাস্ক নির্দেশনাটি মনোযোগ দিয়ে পড়ুন।',
      'প্রদত্ত কম্পিউটারের ভার্চুয়াল স্ক্রিন, ফাইল ম্যানেজার বা কনসোলে প্রয়োজনীয় কমান্ডটি টাইপ করুন।',
      'উইন্ডোজ বা এক্সেল ফর্মুলা টেস্ট এবং প্রয়োজনীয় শর্টকাট কী প্রেস করে উত্তর দিন।',
      'সমস্ত টেস্ট সফলভাবে সম্পূর্ণ করে আপনার ল্যাব সার্টিফিকেট এবং ব্যালেন্স রিওয়ার্ড অর্জন করুন।'
    ],
    instructionsEn: [
      'Read the prompt in the active virtual laboratory environment.',
      'Type corresponding system command strings, folder creations, or formulas.',
      'Test your understanding of critical keyboard shortcuts (Ctrl+C, Ctrl+V, etc.) to progress.',
      'Verify all system tests to lock in your score and claim your certificate.'
    ],
    skillsRequiredEn: ['OS Operations', 'Keyboard Shortcuts', 'Excel Formulas'],
    skillsRequiredBn: ['ওএস অপারেশনস', 'কীবোর্ড শর্টকাট', 'এক্সেল ফর্মুলা']
  },
  {
    id: 'code-entry',
    titleEn: 'Product Code Entry',
    titleBn: 'কোড বসানোর কাজ (Code Entry)',
    tag: 'NEW',
    iconName: 'Code',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    rewardEn: '$3.50 per dataset',
    rewardBn: '৳৩৫০ প্রতি ডাটা সেট',
    estimatedTimeEn: '5-8 mins',
    estimatedTimeBn: '৫-৮ মিনিট',
    difficultyEn: 'Easy',
    difficultyBn: 'সহজ',
    shortDescBn: 'প্রোডাক্টের ছবি দেখে সিরিয়াল নাম্বারের সাথে মিলিয়ে কনফার্মেশন কোডটি সঠিকভাবে ইনপুট করুন।',
    shortDescEn: 'Match product serial numbers with correct verification keys and input codes to log entries.',
    longDescBn: 'কোড বসানোর কাজ হলো অত্যন্ত প্রফেশনাল এবং সহজ একটি ডাটা সাবমিশন প্রজেক্ট। এখানে আপনাকে স্ক্রিনে প্রদর্শিত বিভিন্ন প্রোডাক্টের ছবি দেখে তার নিচে দেওয়া সিরিয়াল নাম্বার এবং সঠিক কোড মিলিয়ে কনফার্মেশন ইনপুট বক্সে কোড বসাতে হবে। প্রতিটি প্রোডাক্টের জন্য আলাদা আলাদা ছবি ও ইউনিক কোড থাকবে।',
    longDescEn: 'Product Code Entry is a highly professional and simple data entry project. Your task is to view different product images, look up their serial numbers, and enter the exact confirmation codes. Each product features its own unique image and verification key.',
    instructionsBn: [
      'প্রথমে স্ক্রিনে প্রদর্শিত প্রোডাক্টের ছবিটি দেখুন।',
      'প্রোডাক্টের সিরিয়াল নাম্বার অনুযায়ী সঠিক কনফার্মেশন কোডটি খুঁজে বের করুন।',
      'ইনপুট বক্সে কোডটি নির্ভুলভাবে টাইপ করুন।',
      'কনফার্ম বাটনে ক্লিক করে পরবর্তী প্রোডাক্টের কোড বসানো শুরু করুন।',
      'সবগুলো প্রোডাক্টের কোড বসানো শেষ করে ফাইনাল সাবমিট করুন।'
    ],
    instructionsEn: [
      'Observe the product image displayed on the screen.',
      'Find the corresponding verification code matching the product serial number.',
      'Type the confirmation code accurately into the input box.',
      'Click confirm to proceed to the next product code entry.',
      'Complete all entries to submit the final project dataset.'
    ],
    skillsRequiredEn: ['Data Verification', 'Serial Matching', 'Numeric Typing'],
    skillsRequiredBn: ['ডাটা ভেরিফিকেশন', 'সিরিয়াল ম্যাচিং', 'সংখ্যাসূচক টাইপিং']
  }
];

export const INITIAL_PROFILE: UserProfile = {
  uid: 'UE-2026-9842',
  fullName: 'মো. রবিউল ইসলাম (Rabiul Islam)',
  email: 'learninghubbd21@gmail.com',
  phone: '01712-345678',
  bio: 'ডিজিটাল এন্টারপ্রেনিউর ও ফ্রিল্যান্স মাইক্রো-টাস্ক ট্রেইনার। আমি নতুনদের সহজে অনলাইনে আয়ের সঠিক পথ দেখাই।',
  address: 'মিরপুর ২, ঢাকা ১২১৬, বাংলাদেশ',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  balance: 15.50,
  totalIncome: 25.50,
  tasksCompleted: 50,
  level: 'Silver Rank',
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
