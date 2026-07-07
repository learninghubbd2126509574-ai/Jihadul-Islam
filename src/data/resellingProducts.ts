
export interface ResellingProduct {
  id: string;
  nameBn: string;
  nameEn: string;
  price: number;
  commission: number;
  image: string;
  link?: string;
  custom?: boolean;
  operator?: string;
}

export const INITIAL_RESELLING_PRODUCTS: ResellingProduct[] = [
  { id: '1', operator: 'GP', nameBn: 'জিপি ৩০ জিবি + ৮০০ মিনিট (৩০ দিন)', nameEn: 'GP 30 GB + 800 Min (30 Days)', price: 599, commission: 150, image: '' },
  { id: '2', operator: 'GP', nameBn: 'জিপি ৫০ জিবি মেগা ইন্টারনেট (৩০ দিন)', nameEn: 'GP 50 GB Mega Pack (30 Days)', price: 499, commission: 120, image: '' },
  { id: '3', operator: 'GP', nameBn: 'জিপি ১০ জিবি ৪জি ইন্টারনেট (৭ দিন)', nameEn: 'GP 10 GB 4G Data (7 Days)', price: 149, commission: 35, image: '' },
  { id: '4', operator: 'GP', nameBn: 'জিপি ৫০০ মিনিট ভয়েস প্যাক (৩০ দিন)', nameEn: 'GP 500 Minutes Voice (30 Days)', price: 320, commission: 80, image: '' },
  { id: '5', operator: 'GP', nameBn: 'জিপি ২০ জিবি + ৫০০ মিনিট কম্বো (৩০ দিন)', nameEn: 'GP 20 GB + 500 Min (30 Days)', price: 449, commission: 110, image: '' },
  { id: '6', operator: 'GP', nameBn: 'জিপি ১৫ জিবি হেভি ইন্টারনেট (৩০ দিন)', nameEn: 'GP 15 GB Heavy Internet (30 Days)', price: 299, commission: 75, image: '' },
  { id: '7', operator: 'GP', nameBn: 'জিপি ১০০০ মিনিট আনলিমিটেড টকটাইম (৩০ দিন)', nameEn: 'GP 1000 Minutes Voice (30 Days)', price: 620, commission: 160, image: '' },
  { id: '8', operator: 'GP', nameBn: 'জিপি ১ জিবি সোশাল প্যাক (৩ দিন)', nameEn: 'GP 1 GB Social Pack (3 Days)', price: 29, commission: 8, image: '' },
  { id: '9', operator: 'GP', nameBn: 'জিপি ৪৫ জিবি ধামাকা অফার (৩০ দিন)', nameEn: 'GP 45 GB Dhamaka Offer (30 Days)', price: 419, commission: 100, image: '' },
  { id: '10', operator: 'GP', nameBn: 'জিপি ২০০ মিনিট বাজেট বান্ডেল (৭ দিন)', nameEn: 'GP 200 Minutes Voice (7 Days)', price: 120, commission: 30, image: '' },
  { id: '11', operator: 'BL', nameBn: 'বাংলালিংক ৪০ জিবি + ৯০০ মিনিট কম্বো (৩০ দিন)', nameEn: 'BL 40 GB + 900 Min (30 Days)', price: 549, commission: 140, image: '' },
  { id: '12', operator: 'BL', nameBn: 'বাংলালিংক ৩০ জিবি সুপার ইন্টারনেট (৩০ দিন)', nameEn: 'BL 30 GB Super Internet (30 Days)', price: 399, commission: 100, image: '' },
  { id: '13', operator: 'BL', nameBn: 'বাংলালিংক ৮০০ মিনিট ভয়েস প্যাক (৩০ দিন)', nameEn: 'BL 800 Minutes Voice (30 Days)', price: 480, commission: 120, image: '' },
  { id: '14', operator: 'BL', nameBn: 'বাংলালিংক ১২ জিবি উইকলি প্যাক (৭ দিন)', nameEn: 'BL 12 GB Weekly Pack (7 Days)', price: 139, commission: 32, image: '' },
  { id: '15', operator: 'BL', nameBn: 'বাংলালিংক ২০ জিবি বাজেট অফার (৩০ দিন)', nameEn: 'BL 20 GB Budget Pack (30 Days)', price: 269, commission: 65, image: '' },
  { id: '16', operator: 'BL', nameBn: 'বাংলালিংক ৬০ জিবি মেগা প্যাক (৩০ দিন)', nameEn: 'BL 60 GB Mega Volume (30 Days)', price: 649, commission: 165, image: '' },
  { id: '17', operator: 'BL', nameBn: 'বাংলালিংক ৫০০ মিনিট সুপার ভয়েস (৩০ দিন)', nameEn: 'BL 500 Minutes Voice (30 Days)', price: 310, commission: 75, image: '' },
  { id: '18', operator: 'BL', nameBn: 'বাংলালিংক ৫ জিবি + ১৫০ মিনিট কম্বো (৭ দিন)', nameEn: 'BL 5 GB + 150 Min (7 Days)', price: 119, commission: 28, image: '' },
  { id: '19', operator: 'BL', nameBn: 'বাংলালিংক ২৫ জিবি ধামাকা ইন্টারনেট (৩০ দিন)', nameEn: 'BL 25 GB Internet Offer (30 Days)', price: 349, commission: 85, image: '' },
  { id: '20', operator: 'BL', nameBn: 'বাংলালিংক ৩৫০ মিনিট মিড-ভ্যালু (১৫ দিন)', nameEn: 'BL 350 Minutes Voice (15 Days)', price: 220, commission: 55, image: '' },
  { id: '21', operator: 'Robi', nameBn: 'রবি ৩৫ জিবি + ৮০০ মিনিট এলিট কম্বো (৩০ দিন)', nameEn: 'Robi 35 GB + 800 Min (30 Days)', price: 499, commission: 130, image: '' },
  { id: '22', operator: 'Robi', nameBn: 'রবি ৪৫ জিবি মেগা ডেটা ইন্টারনেট (৩০ দিন)', nameEn: 'Robi 45 GB Mega Internet (30 Days)', price: 429, commission: 110, image: '' },
  { id: '23', operator: 'Robi', nameBn: 'রবি ১০০০ মিনিট আলটিমেট ভয়েস (৩০ দিন)', nameEn: 'Robi 1000 Minutes Voice (30 Days)', price: 599, commission: 150, image: '' },
  { id: '24', operator: 'Robi', nameBn: 'রবি ১৫ জিবি রেগুলার প্যাক (৩০ দিন)', nameEn: 'Robi 15 GB Regular Pack (30 Days)', price: 289, commission: 70, image: '' },
  { id: '25', operator: 'Robi', nameBn: 'রবি ৮ জিবি উইকলি ফাস্ট প্যাক (৭ দিন)', nameEn: 'Robi 8 GB Weekly Pack (7 Days)', price: 129, commission: 30, image: '' },
  { id: '26', operator: 'Robi', nameBn: 'রবি ২০ জিবি + ৪০০ মিনিট কম্বো (৩০ দিন)', nameEn: 'Robi 20 GB + 400 Min (30 Days)', price: 399, commission: 95, image: '' },
  { id: '27', operator: 'Robi', nameBn: 'রবি ৬০০ মিনিট টকটাইম প্যাক (৩০ দিন)', nameEn: 'Robi 600 Minutes Voice (30 Days)', price: 360, commission: 85, image: '' },
  { id: '28', operator: 'Robi', nameBn: 'রবি ১০ জিবি + ২০০ মিনিট কম্বো (৭ দিন)', nameEn: 'Robi 10 GB + 200 Min (7 Days)', price: 169, commission: 40, image: '' },
  { id: '29', operator: 'Robi', nameBn: 'রবি ৮০ জিবি মেগা ডেটা মনস্টার (৩০ দিন)', nameEn: 'Robi 80 GB Data Monster (30 Days)', price: 799, commission: 200, image: '' },
  { id: '30', operator: 'Robi', nameBn: 'রবি ৩০০ মিনিট টকটাইম প্যাক (১০ দিন)', nameEn: 'Robi 300 Minutes Voice (10 Days)', price: 189, commission: 45, image: '' },
  { id: '31', operator: 'Airtel', nameBn: 'এয়ারটেল ৩০ জিবি + ৭৫০ মিনিট কম্বো (৩০ দিন)', nameEn: 'Airtel 30 GB + 750 Min (30 Days)', price: 469, commission: 120, image: '' },
  { id: '32', operator: 'Airtel', nameBn: 'এয়ারটেল ২৫ জিবি আলটিমেট ইন্টারনেট (৩০ দিন)', nameEn: 'Airtel 25 GB Ultimate (30 Days)', price: 349, commission: 85, image: '' },
  { id: '33', operator: 'Airtel', nameBn: 'এয়ারটেল ৫০০ মিনিট টকটাইম প্যাক (৩০ দিন)', nameEn: 'Airtel 500 Minutes Voice (30 Days)', price: 299, commission: 70, image: '' },
  { id: '34', operator: 'Airtel', nameBn: 'এয়ারটেল ১২ জিবি উইকলি স্পিড প্যাক (৭ দিন)', nameEn: 'Airtel 12 GB Weekly Pack (7 Days)', price: 135, commission: 32, image: '' },
  { id: '35', operator: 'Airtel', nameBn: 'এয়ারটেল ৪০ জিবি ধামাকা মেগা প্যাক (৩০ দিন)', nameEn: 'Airtel 40 GB Mega Pack (30 Days)', price: 399, commission: 100, image: '' },
  { id: '36', operator: 'Airtel', nameBn: 'এয়ারটেল ১০ জিবি + ২৫০ মিনিট কম্বো (৭ দিন)', nameEn: 'Airtel 10 GB + 250 Min (7 Days)', price: 159, commission: 38, image: '' },
  { id: '37', operator: 'Airtel', nameBn: 'এয়ারটেল ৮০০ মিনিট বিগ ভয়েস প্যাক (৩০ দিন)', nameEn: 'Airtel 800 Minutes Voice (30 Days)', price: 479, commission: 115, image: '' },
  { id: '38', operator: 'Airtel', nameBn: 'এয়ারটেল ১৫ জিবি সুপার বাজেট প্যাক (৩০ দিন)', nameEn: 'Airtel 15 GB Super Budget (30 Days)', price: 249, commission: 60, image: '' },
  { id: '39', operator: 'Airtel', nameBn: 'এয়ারটেল ৬০ জিবি হিউজ ইন্টারনেট প্যাক (৩০ দিন)', nameEn: 'Airtel 60 GB Huge Volume (30 Days)', price: 599, commission: 150, image: '' },
  { id: '40', operator: 'Airtel', nameBn: 'এয়ারটেল ৩৫০ মিনিট পকেট প্যাক (১৫ দিন)', nameEn: 'Airtel 350 Minutes Voice (15 Days)', price: 210, commission: 50, image: '' },
  { id: '41', operator: 'Teletalk', nameBn: 'টেলিটক ৩০ জিবি + ৫০০ মিনিট স্বাধীন প্যাক (৩০ দিন)', nameEn: 'Teletalk 30 GB + 500 Min (30 Days)', price: 379, commission: 95, image: '' },
  { id: '42', operator: 'Teletalk', nameBn: 'টেলিটক ৪০ জিবি স্বদেশ ইন্টারনেট (৩০ দিন)', nameEn: 'Teletalk 40 GB Swadesh Pack (30 Days)', price: 349, commission: 85, image: '' },
  { id: '43', operator: 'Teletalk', nameBn: 'টেলিটক ১০ জিবি কম খরচে প্যাক (৭ দিন)', nameEn: 'Teletalk 10 GB Low Cost (7 Days)', price: 99, commission: 25, image: '' },
  { id: '44', operator: 'Teletalk', nameBn: 'টেলিটক ১০০০ মিনিট ডাইনামিক ভয়েস (৩০ দিন)', nameEn: 'Teletalk 1000 Minutes (30 Days)', price: 499, commission: 125, image: '' },
  { id: '45', operator: 'Teletalk', nameBn: 'টেলিটক ১৫ জিবি সাশ্রয়ী রেগুলার (৩০ দিন)', nameEn: 'Teletalk 15 GB Regular (30 Days)', price: 219, commission: 50, image: '' },
  { id: '46', operator: 'Teletalk', nameBn: 'টেলিটক ৫০০ মিনিট ভয়েস প্যাক (৩০ দিন)', nameEn: 'Teletalk 500 Minutes Voice (30 Days)', price: 249, commission: 60, image: '' },
  { id: '47', operator: 'Teletalk', nameBn: 'টেলিটক ৫ জিবি উইকলি সাশ্রয়ী প্যাক (৭ দিন)', nameEn: 'Teletalk 5 GB Super Saver (7 Days)', price: 59, commission: 15, image: '' },
  { id: '48', operator: 'Teletalk', nameBn: 'টেলিটক ২০ জিবি + ৩০০ মিনিট স্ট্যান্ডার্ড কম্বো (৩০ দিন)', nameEn: 'Teletalk 20 GB + 300 Min (30 Days)', price: 299, commission: 75, image: '' },
  { id: '49', operator: 'Teletalk', nameBn: 'টেলিটক ৬০ জিবি মেগা স্বদেশ প্যাক (৩০ দিন)', nameEn: 'Teletalk 60 GB Mega Swadesh (30 Days)', price: 499, commission: 120, image: '' },
  { id: '50', operator: 'Teletalk', nameBn: 'টেলিটক ৩০০ মিনিট পকেট ভয়েস (১৫ দিন)', nameEn: 'Teletalk 300 Minutes Voice (15 Days)', price: 149, commission: 35, image: '' }
];
