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
  { id: '1', operator: 'Physical', nameBn: 'মেন্স প্রিমিয়াম কটন টি-শার্ট', nameEn: 'Men\'s Premium Cotton T-Shirt', price: 450, commission: 80, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300' },
  { id: '2', operator: 'Physical', nameBn: 'স্মার্ট ফিটনেস ওয়াচ', nameEn: 'Smart Fitness Watch', price: 1250, commission: 150, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=300' },
  { id: '3', operator: 'Physical', nameBn: 'ওয়্যারলেস ব্লুটুথ ইয়ারবাড', nameEn: 'Wireless Bluetooth Earbuds', price: 890, commission: 120, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300' },
  { id: '4', operator: 'Physical', nameBn: 'লেদার ওয়ালেট - মেন্স', nameEn: 'Leather Wallet - Mens', price: 650, commission: 90, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=300' },
  { id: '5', operator: 'Physical', nameBn: 'মহিলাদের ফ্যাশন হ্যান্ডব্যাগ', nameEn: 'Women Fashion Handbag', price: 1450, commission: 200, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=300' },
  { id: '6', operator: 'Physical', nameBn: 'প্রিমিয়াম সানগ্লাস', nameEn: 'Premium Sunglasses', price: 550, commission: 75, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300' },
  { id: '7', operator: 'Physical', nameBn: 'মেকআপ ব্রাশ সেট (১২ পিস)', nameEn: 'Makeup Brush Set (12 pcs)', price: 780, commission: 110, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300' },
  { id: '8', operator: 'Physical', nameBn: 'অর্গানিক গ্রিন টি', nameEn: 'Organic Green Tea', price: 320, commission: 50, image: 'https://images.unsplash.com/photo-1558160074-4d7d4bdefce4?auto=format&fit=crop&q=80&w=300' },
  { id: '9', operator: 'Physical', nameBn: 'মেন্স রানিং স্নিকার্স', nameEn: 'Mens Running Sneakers', price: 1850, commission: 250, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300' },
  { id: '10', operator: 'Physical', nameBn: 'কিচেন ব্লেন্ডার মেশিন', nameEn: 'Kitchen Blender Machine', price: 2100, commission: 300, image: 'https://images.unsplash.com/photo-1585659722983-38ca8e9af409?auto=format&fit=crop&q=80&w=300' },
  { id: '11', operator: 'GP', nameBn: 'জিপি ৪০ জিবি + ১০০০ মিনিট কম্বো (৩০ দিন)', nameEn: 'GP 40 GB + 1000 Min (30 Days)', price: 598, commission: 150, image: '' },
  { id: '12', operator: 'Robi', nameBn: 'রবি ৩৫ জিবি + ৮০০ মিনিট এলিট কম্বো (৩০ দিন)', nameEn: 'Robi 35 GB + 800 Min (30 Days)', price: 499, commission: 130, image: '' },
  { id: '13', operator: 'Banglalink', nameBn: 'বাংলালিংক ৫০ জিবি + ১০০০ মিনিট আলটিমেট (৩০ দিন)', nameEn: 'BL 50 GB + 1000 Min (30 Days)', price: 549, commission: 140, image: '' },
  { id: '14', operator: 'Airtel', nameBn: 'এয়ারটেল ৩০ জিবি + ৭৫০ মিনিট কম্বো (৩০ দিন)', nameEn: 'Airtel 30 GB + 750 Min (30 Days)', price: 469, commission: 120, image: '' },
  { id: '15', operator: 'Teletalk', nameBn: 'টেলিটক ৩০ জিবি + ৫০০ মিনিট স্বাধীন প্যাক (৩০ দিন)', nameEn: 'Teletalk 30 GB + 500 Min (30 Days)', price: 379, commission: 95, image: '' }
];
