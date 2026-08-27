import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile } from '../types';

interface DropshippingWorkspaceProps {
  lang: 'bn' | 'en';
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addLog?: (newLog: { jobId: string; jobTitleBn: string; jobTitleEn: string; reward: number }) => void;
  onBack?: () => void;
}

export interface DropshipProduct {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'electronics' | 'gadgets' | 'fashion' | 'beauty' | 'kitchen' | 'custom';
  categoryLabelBn: string;
  categoryLabelEn: string;
  image: string;
  wholesalePrice: number;
  retailPrice: number;
  profitBDT: number;
  stock: number;
  sku: string;
  originBn: string;
  originEn: string;
  isCustom?: boolean;
}

const INITIAL_DROPSHIP_PRODUCTS: DropshipProduct[] = [
  {
    id: 'ds-p1',
    nameBn: 'স্মার্ট ব্লুটুথ কলিং আল্ট্রা ওয়াচ (Series 9)',
    nameEn: 'Smart Bluetooth Calling Ultra Watch (Series 9)',
    category: 'gadgets',
    categoryLabelBn: 'স্মার্ট গ্যাজেট',
    categoryLabelEn: 'Smart Gadget',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    wholesalePrice: 1200,
    retailPrice: 2250,
    profitBDT: 1050,
    stock: 145,
    sku: 'UW9-8821',
    originBn: 'গ্লোবাল সাপ্লায়ার হাব',
    originEn: 'Global Supplier Hub'
  },
  {
    id: 'ds-p2',
    nameBn: 'এয়ারপডস প্রো ২ ওয়্যারলেস নয়েজ ক্যানসেলিং ইয়ারবাডস',
    nameEn: 'AirPods Pro 2 Active Noise Cancelling Earbuds',
    category: 'electronics',
    categoryLabelBn: 'ইলেকট্রনিক্স',
    categoryLabelEn: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    wholesalePrice: 950,
    retailPrice: 1850,
    profitBDT: 900,
    stock: 220,
    sku: 'AP2-9904',
    originBn: 'চায়না ডিরেক্ট পোর্টাল',
    originEn: 'China Direct Portal'
  },
  {
    id: 'ds-p3',
    nameBn: 'প্রিমিয়াম লেদার জিপার ওয়ালেট ও বেল্ট কম্বো সেট',
    nameEn: 'Premium Leather Zipper Wallet & Belt Combo Set',
    category: 'fashion',
    categoryLabelBn: 'ফ্যাশন ও লাইফস্টাইল',
    categoryLabelEn: 'Fashion & Lifestyle',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
    wholesalePrice: 650,
    retailPrice: 1550,
    profitBDT: 900,
    stock: 95,
    sku: 'LW-4412',
    originBn: 'ঢাকা ওয়্যারহাউস',
    originEn: 'Dhaka Warehouse'
  },
  {
    id: 'ds-p4',
    nameBn: 'হাই-স্পিড ইলেকট্রিক রিচার্জেবল পোর্টেবল ব্লেন্ডার জুসার',
    nameEn: 'High-Speed Portable USB Rechargeable Blender',
    category: 'kitchen',
    categoryLabelBn: 'হোম ও কিচেন',
    categoryLabelEn: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80',
    wholesalePrice: 850,
    retailPrice: 1750,
    profitBDT: 900,
    stock: 130,
    sku: 'PB-1120',
    originBn: 'ইমপোর্ট হাব',
    originEn: 'Import Logistics Hub'
  },
  {
    id: 'ds-p5',
    nameBn: 'ম্যাগনেটিক ফাস্ট ওয়্যারলেস পাওয়ার ব্যাংক (10,000 mAh)',
    nameEn: 'Magnetic Fast Wireless Power Bank (10,000 mAh)',
    category: 'gadgets',
    categoryLabelBn: 'স্মার্ট গ্যাজেট',
    categoryLabelEn: 'Smart Gadget',
    image: 'https://images.unsplash.com/photo-1609592807904-765f048d0840?w=600&q=80',
    wholesalePrice: 1100,
    retailPrice: 2200,
    profitBDT: 1100,
    stock: 88,
    sku: 'PB-MAG-8',
    originBn: 'সাপ্লায়ার হাব',
    originEn: 'Supplier Hub'
  },
  {
    id: 'ds-p6',
    nameBn: 'ডিপ ক্লিনসিং ফেসিয়াল স্কিন স্পা ম্যাসাজার সেট',
    nameEn: 'Deep Cleansing Facial Skin Spa Massager Kit',
    category: 'beauty',
    categoryLabelBn: 'বিউটি ও রূপচর্চা',
    categoryLabelEn: 'Beauty & Care',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    wholesalePrice: 750,
    retailPrice: 1650,
    profitBDT: 900,
    stock: 110,
    sku: 'SPA-3310',
    originBn: 'কসমেটিকস হাব',
    originEn: 'Cosmetics Hub'
  }
];

const PRESET_SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80'
];

const toBnNum = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

export default function DropshippingWorkspace({
  lang,
  profile,
  updateProfile,
  addLog,
  onBack
}: DropshippingWorkspaceProps) {
  const [products, setProducts] = useState<DropshipProduct[]>(INITIAL_DROPSHIP_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<DropshipProduct>(INITIAL_DROPSHIP_PRODUCTS[0]);
  
  // Custom Product Upload States
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [newProdNameBn, setNewProdNameBn] = useState<string>('');
  const [newProdNameEn, setNewProdNameEn] = useState<string>('');
  const [newProdCategory, setNewProdCategory] = useState<'electronics' | 'gadgets' | 'fashion' | 'beauty' | 'kitchen' | 'custom'>('gadgets');
  const [newProdWholesale, setNewProdWholesale] = useState<string>('');
  const [newProdRetail, setNewProdRetail] = useState<string>('');
  const [newProdImage, setNewProdImage] = useState<string>(PRESET_SAMPLE_IMAGES[0]);
  const [newProdSku, setNewProdSku] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState<string>('');

  // Order Booking / Fulfillment States
  const [customerName, setCustomerName] = useState<string>('Md. Tanvir Hasan');
  const [customerPhone, setCustomerPhone] = useState<string>('01789123456');
  const [customerAddress, setCustomerAddress] = useState<string>('House 12, Road 4, Sector 7, Uttara, Dhaka');
  const [selectedCourier, setSelectedCourier] = useState<string>('Steadfast Courier');
  const [isFulfilling, setIsFulfilling] = useState<boolean>(false);
  const [orderSuccessData, setOrderSuccessData] = useState<{
    productName: string;
    profit: number;
    trackingId: string;
    customer: string;
  } | null>(null);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory || (selectedCategory === 'custom' && p.isCustom);
    const matchesSearch =
      p.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate dynamic profit for custom product upload
  const wholesaleNum = parseFloat(newProdWholesale) || 0;
  const retailNum = parseFloat(newProdRetail) || 0;
  const calculatedCustomProfit = Math.max(0, retailNum - wholesaleNum);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewProdImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCustomProduct = () => {
    setUploadError('');
    setUploadSuccess('');

    if (!newProdNameBn.trim() || !newProdNameEn.trim()) {
      setUploadError(lang === 'bn' ? 'দয়া করে প্রোডাক্টের নাম (বাংলা ও ইংরেজি) দিন!' : 'Please enter product names!');
      return;
    }

    if (wholesaleNum <= 0 || retailNum <= 0) {
      setUploadError(lang === 'bn' ? 'পাইকারি মূল্য ও বিক্রয় মূল্য সঠিক সংখ্যা হতে হবে!' : 'Wholesale and retail prices must be valid positive numbers!');
      return;
    }

    if (retailNum <= wholesaleNum) {
      setUploadError(lang === 'bn' ? 'বিক্রয় মূল্য অবশ্যই পাইকারি মূল্যের চেয়ে বেশি হতে হবে (লাভের জন্য)!' : 'Selling price must be higher than wholesale cost!');
      return;
    }

    const generatedSku = newProdSku.trim() || `CUSTOM-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProduct: DropshipProduct = {
      id: `ds-custom-${Date.now()}`,
      nameBn: newProdNameBn.trim(),
      nameEn: newProdNameEn.trim(),
      category: newProdCategory,
      categoryLabelBn: newProdCategory === 'gadgets' ? 'স্মার্ট গ্যাজেট' : newProdCategory === 'fashion' ? 'ফ্যাশন' : newProdCategory === 'beauty' ? 'বিউটি' : newProdCategory === 'kitchen' ? 'কিচেন' : 'ইলেকট্রনিক্স',
      categoryLabelEn: newProdCategory.toUpperCase(),
      image: newProdImage || PRESET_SAMPLE_IMAGES[0],
      wholesalePrice: wholesaleNum,
      retailPrice: retailNum,
      profitBDT: calculatedCustomProfit,
      stock: 50,
      sku: generatedSku,
      originBn: 'কাস্টমার ভেন্ডর স্টক',
      originEn: 'Custom Vendor Stock',
      isCustom: true
    };

    setProducts((prev) => [newProduct, ...prev]);
    setSelectedProduct(newProduct);
    setUploadSuccess(lang === 'bn' ? 'প্রোডাক্টটি সফলভাবে ড্রপশিপিং ক্যাটালগে যুক্ত হয়েছে!' : 'Product listed successfully in catalog!');
    
    // Clear inputs
    setNewProdNameBn('');
    setNewProdNameEn('');
    setNewProdWholesale('');
    setNewProdRetail('');
    setNewProdSku('');

    setTimeout(() => {
      setShowUploadModal(false);
      setUploadSuccess('');
    }, 1200);
  };

  const handleProcessOrder = () => {
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert(lang === 'bn' ? 'দয়া করে কাস্টমারের নাম, ফোন নম্বর ও সম্পূর্ণ ঠিকানা দিন।' : 'Please enter customer name, phone and address.');
      return;
    }

    setIsFulfilling(true);

    setTimeout(() => {
      const profitTaka = selectedProduct.profitBDT;
      const trackingCode = `TRK-${selectedCourier.slice(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const newBalance = profile.balance + profitTaka;
      const newIncome = (profile.totalIncome ?? profile.balance) + profitTaka;
      const newTasksDone = profile.tasksCompleted + 1;

      updateProfile({
        balance: newBalance,
        totalIncome: newIncome,
        tasksCompleted: newTasksDone
      });

      if (addLog) {
        addLog({
          jobId: 'drop-shipping',
          jobTitleBn: `ড্রপশিপিং অর্ডার: ${selectedProduct.nameBn} (${trackingCode})`,
          jobTitleEn: `Dropship Order: ${selectedProduct.nameEn} (${trackingCode})`,
          reward: profitTaka / 100
        });
      }

      setIsFulfilling(false);
      setOrderSuccessData({
        productName: lang === 'bn' ? selectedProduct.nameBn : selectedProduct.nameEn,
        profit: profitTaka,
        trackingId: trackingCode,
        customer: customerName
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="dropshipping-workspace">
      {/* Banner Card */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 text-white p-5 md:p-6 rounded-3xl relative overflow-hidden shadow-lg border border-indigo-700/50">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
          <Icons.Truck className="w-56 h-56" />
        </div>
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Icons.Zap className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'ড্রপশিপিং সাপ্লায়ার ও কাস্টমার শিপিং হাব' : 'Dropshipping Supplier & Logistics Hub'}
            </span>
            <span className="bg-blue-500/30 text-blue-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-400/30">
              {lang === 'bn' ? '৳৮০০ - ৳১৫০০ প্রতি অর্ডার মুনাফা' : '৳800 - ৳1500 Profit / Order'}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black leading-tight text-white">
            {lang === 'bn' ? 'জিরো ইনভেস্টমেন্টে ড্রপশিপিং অর্ডার ফুলফিল করুন' : 'Process Dropship Orders & Earn Big Profit Margins'}
          </h3>
          <p className="text-indigo-100/85 text-xs md:text-sm max-w-xl leading-relaxed">
            {lang === 'bn'
              ? 'নিজে কোনো পণ্য স্টক না রেখে সরাসরি সাপ্লায়ারের ইনভেন্টরি থেকে কাস্টমারের ঠিকানায় প্রোডাক্ট ডেলিভারি করুন অথবা নিজের কাস্টম প্রোডাক্ট আপলোড করে ইচ্ছামতো প্রফিট আয় করুন।'
              : 'Ship directly from wholesale suppliers to customer addresses with zero physical inventory or upload custom items.'}
          </p>
        </div>
      </div>

      {/* Top Controls: Search, Category Chips & Upload Product Button */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'প্রোডাক্টের নাম বা SKU খুঁজুন (যেমন: Watch, Earbuds)...' : 'Search products or SKU...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-700 focus:bg-white focus:border-indigo-400 outline-none transition-all"
          />
        </div>

        {/* Upload Custom Product Button */}
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold px-5 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Icons.PlusCircle className="w-4 h-4" />
          <span>{lang === 'bn' ? 'নতুন প্রোডাক্ট আপলোড করুন' : 'Upload Custom Product'}</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', labelBn: 'সব প্রোডাক্ট', labelEn: 'All Products' },
          { id: 'gadgets', labelBn: 'স্মার্ট গ্যাজেট', labelEn: 'Smart Gadgets' },
          { id: 'electronics', labelBn: 'ইলেকট্রনিক্স', labelEn: 'Electronics' },
          { id: 'fashion', labelBn: 'ফ্যাশন', labelEn: 'Fashion' },
          { id: 'kitchen', labelBn: 'হোম কিচেন', labelEn: 'Home & Kitchen' },
          { id: 'beauty', labelBn: 'বিউটি ও কেয়ার', labelEn: 'Beauty & Care' },
          { id: 'custom', labelBn: '✨ আমার আপলোডকৃত', labelEn: '✨ My Uploads' }
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {lang === 'bn' ? cat.labelBn : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Upload Custom Product Modal */}
      {showUploadModal && (
        <div className="bg-white rounded-3xl border-2 border-indigo-200 p-5 md:p-6 space-y-4 shadow-xl relative animate-scale-up">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Icons.PackagePlus className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-sm">
                  {lang === 'bn' ? 'ড্রপশিপিংয়ে আপনার নিজস্ব প্রোডাক্ট আপলোড করুন' : 'Upload Your Custom Dropship Product'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {lang === 'bn' ? 'ছবি ও বিক্রয় মূল্য নির্ধারণ করে ক্যাটালগে যুক্ত করুন' : 'Set photo, wholesale & retail pricing'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowUploadModal(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name Bangla */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">
                {lang === 'bn' ? 'প্রোডাক্টের নাম (বাংলা):' : 'Product Name (Bengali):'}
              </label>
              <input
                type="text"
                value={newProdNameBn}
                onChange={(e) => setNewProdNameBn(e.target.value)}
                placeholder="যেমন: প্রিমিয়াম ওয়াটারপ্রুফ স্মার্ট স্পিকার"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-400 outline-none"
              />
            </div>

            {/* Product Name English */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">
                {lang === 'bn' ? 'প্রোডাক্টের নাম (ইংরেজি):' : 'Product Name (English):'}
              </label>
              <input
                type="text"
                value={newProdNameEn}
                onChange={(e) => setNewProdNameEn(e.target.value)}
                placeholder="e.g. Premium Waterproof Smart Speaker"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-400 outline-none"
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">
                {lang === 'bn' ? 'ক্যাটাগরি নির্বাচন করুন:' : 'Category:'}
              </label>
              <select
                value={newProdCategory}
                onChange={(e) => setNewProdCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-400 outline-none"
              >
                <option value="gadgets">স্মার্ট গ্যাজেট (Smart Gadgets)</option>
                <option value="electronics">ইলেকট্রনিক্স (Electronics)</option>
                <option value="fashion">ফ্যাশন (Fashion)</option>
                <option value="kitchen">হোম কিচেন (Home & Kitchen)</option>
                <option value="beauty">বিউটি ও কেয়ার (Beauty)</option>
              </select>
            </div>

            {/* SKU */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">
                {lang === 'bn' ? 'সাপ্লায়ার SKU কোড (ঐচ্ছিক):' : 'Supplier SKU Code (Optional):'}
              </label>
              <input
                type="text"
                value={newProdSku}
                onChange={(e) => setNewProdSku(e.target.value)}
                placeholder="e.g. SPK-2026"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-800 focus:bg-white focus:border-indigo-400 outline-none"
              />
            </div>

            {/* Wholesale Price */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">
                {lang === 'bn' ? 'সাপ্লায়ার পাইকারি মূল্য (Wholesale Cost):' : 'Supplier Wholesale Price (BDT):'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">৳</span>
                <input
                  type="number"
                  value={newProdWholesale}
                  onChange={(e) => setNewProdWholesale(e.target.value)}
                  placeholder="e.g. 700"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs font-mono font-bold text-slate-800 focus:bg-white focus:border-indigo-400 outline-none"
                />
              </div>
            </div>

            {/* Retail Price */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 block">
                {lang === 'bn' ? 'কাস্টমার বিক্রয় মূল্য (Retail Selling Price):' : 'Customer Retail Selling Price (BDT):'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">৳</span>
                <input
                  type="number"
                  value={newProdRetail}
                  onChange={(e) => setNewProdRetail(e.target.value)}
                  placeholder="e.g. 1650"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs font-mono font-bold text-slate-800 focus:bg-white focus:border-indigo-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Live Profit Margin Calculator Alert */}
          {retailNum > 0 && wholesaleNum > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-900">
                  {lang === 'bn' ? 'প্রতি অর্ডারে আপনার নিশ্চিত ড্রপশিপিং লাভ:' : 'Your Net Profit Margin per Order:'}
                </span>
              </div>
              <span className="text-base font-black text-emerald-700 font-mono">
                +৳{toBnNum(calculatedCustomProfit)}
              </span>
            </div>
          )}

          {/* Product Image Selection / File Upload */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="text-[11px] font-bold text-slate-600 block">
              {lang === 'bn' ? 'প্রোডাক্টের ছবি আপলোড করুন অথবা স্যাম্পল ছবি নির্বাচন করুন:' : 'Upload Product Photo or Choose Sample:'}
            </label>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Image Preview */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-200 flex-shrink-0 bg-slate-100">
                <img
                  src={newProdImage}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload Input & Sample Presets */}
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:cursor-pointer cursor-pointer border border-slate-200 p-2 rounded-xl bg-slate-50"
                />

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">
                    {lang === 'bn' ? 'অথবা স্যাম্পল গ্যালারি:' : 'Or Gallery:'}
                  </span>
                  {PRESET_SAMPLE_IMAGES.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewProdImage(imgUrl)}
                      className={`w-8 h-8 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        newProdImage === imgUrl ? 'border-indigo-600 scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {uploadError && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold animate-shake">
              <Icons.AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{uploadError}</span>
            </div>
          )}

          {uploadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-bold animate-scale-up">
              <Icons.CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={handleSaveCustomProduct}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Icons.CheckCircle className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ক্যাটালগে যুক্ত করুন' : 'Add to Catalog'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Layout: Product Grid (Left) + Active Order Booking Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Product Selection Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <Icons.ShoppingBag className="w-4 h-4 text-indigo-600" />
              {lang === 'bn' ? 'ড্রপশিপিং পণ্য নির্বাচন করুন:' : 'Select Dropship Product:'}
            </span>
            <span className="text-[10px] text-slate-400 font-bold">
              {filteredProducts.length} {lang === 'bn' ? 'টি আইটেম' : 'Items'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[560px] overflow-y-auto pr-1 no-scrollbar">
            {filteredProducts.map((p) => {
              const isSelected = selectedProduct.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setOrderSuccessData(null);
                  }}
                  className={`rounded-2xl border text-left flex flex-col overflow-hidden transition-all relative cursor-pointer group ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {/* Product Image */}
                  <div className="relative w-full h-36 overflow-hidden bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    
                    {/* Profit Badge */}
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Icons.Sparkles className="w-3 h-3" />
                      {lang === 'bn' ? `+৳${toBnNum(p.profitBDT)} লাভ` : `+৳${p.profitBDT} Profit`}
                    </div>

                    {p.isCustom && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase shadow-sm">
                        {lang === 'bn' ? 'আমার আপলোড' : 'My Upload'}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                        <span>SKU: {p.sku}</span>
                        <span>{lang === 'bn' ? p.originBn : p.originEn}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-xs line-clamp-2 leading-snug">
                        {lang === 'bn' ? p.nameBn : p.nameEn}
                      </h4>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-100">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">{lang === 'bn' ? 'সাপ্লায়ার রেট:' : 'Wholesale:'}</span>
                        <span className="text-slate-600 font-bold font-mono">৳{toBnNum(p.wholesalePrice)}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">{lang === 'bn' ? 'কাস্টমার প্রাইস:' : 'Retail:'}</span>
                        <span className="text-slate-900 font-black font-mono">৳{toBnNum(p.retailPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Order Dispatching Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 space-y-4 shadow-sm">
            {/* Selected Product Summary Header */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <img
                src={selectedProduct.image}
                alt="Selected"
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {lang === 'bn' ? 'সিলেক্টেড ড্রপশিপ প্রোডাক্ট' : 'Selected Item'}
                </span>
                <h4 className="font-black text-slate-800 text-xs truncate mt-0.5">
                  {lang === 'bn' ? selectedProduct.nameBn : selectedProduct.nameEn}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
                  <span className="text-slate-500">৳{toBnNum(selectedProduct.retailPrice)}</span>
                  <span className="text-emerald-600 font-black bg-emerald-50 px-1.5 py-0.2 rounded">
                    +৳{toBnNum(selectedProduct.profitBDT)} প্রফিট
                  </span>
                </div>
              </div>
            </div>

            {/* Order Dispatch Form */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Icons.MapPin className="w-3.5 h-3.5 text-rose-500" />
                {lang === 'bn' ? 'কাস্টমার ডেলিভারি ও বুকিং তথ্য:' : 'Customer Delivery Details:'}
              </h4>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block">
                  {lang === 'bn' ? 'কাস্টমারের নাম:' : 'Customer Name:'}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-400 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block">
                  {lang === 'bn' ? 'কাস্টমারের মোবাইল নম্বর:' : 'Phone Number:'}
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 017xxxxxxxx"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold text-slate-800 focus:bg-white focus:border-indigo-400 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block">
                  {lang === 'bn' ? 'সম্পূর্ণ ডেলিভারি ঠিকানা:' : 'Full Shipping Address:'}
                </label>
                <textarea
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="e.g. House, Road, Area, District"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:bg-white focus:border-indigo-400 outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block">
                  {lang === 'bn' ? 'কুরিয়ার পার্টনার নির্বাচন করুন:' : 'Courier Logistics Partner:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Steadfast Courier', 'Pathao Logistics', 'RedX Express'].map((courier) => (
                    <button
                      key={courier}
                      type="button"
                      onClick={() => setSelectedCourier(courier)}
                      className={`p-2 rounded-xl text-[10px] font-bold text-center border transition-all cursor-pointer ${
                        selectedCourier === courier
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {courier.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Success Card */}
            {orderSuccessData && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 animate-scale-up">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
                  <Icons.CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'bn' ? 'অর্ডার সফলভাবে বুকিং ও ডিসপ্যাচ হয়েছে!' : 'Order Dispatched Successfully!'}</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p><span className="font-bold">Tracking Code:</span> <span className="font-mono text-indigo-700 font-bold">{orderSuccessData.trackingId}</span></p>
                  <p><span className="font-bold">Customer:</span> {orderSuccessData.customer}</p>
                  <p><span className="font-bold">Net Profit Credited:</span> <span className="font-mono text-emerald-700 font-black">+৳{toBnNum(orderSuccessData.profit)}</span></p>
                </div>
              </div>
            )}

            {/* Submit Order Action Button */}
            <button
              type="button"
              onClick={handleProcessOrder}
              disabled={isFulfilling}
              className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-black py-3.5 rounded-2xl text-xs transition-all active:scale-[0.99] shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isFulfilling ? (
                <>
                  <Icons.Loader2 className="w-4 h-4 animate-spin" />
                  <span>{lang === 'bn' ? 'সাপ্লায়ার পোর্টালে অর্ডার ডিসপ্যাচ হচ্ছে...' : 'Dispatching to Supplier Hub...'}</span>
                </>
              ) : (
                <>
                  <Icons.Truck className="w-4 h-4 text-indigo-200" />
                  <span>
                    {lang === 'bn'
                      ? `অর্ডার বুক করুন ও ৳${toBnNum(selectedProduct.profitBDT)} প্রফিট বুঝে নিন`
                      : `Fulfill Order & Claim ৳${selectedProduct.profitBDT} Profit`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
