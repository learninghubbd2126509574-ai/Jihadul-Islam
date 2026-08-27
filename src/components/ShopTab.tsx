import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile } from '../types';

interface ShopTabProps {
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  lang: 'bn' | 'en';
}

interface EcommerceProduct {
  id: string;
  category: 'electronics' | 'fashion' | 'beauty' | 'home' | 'gadgets';
  categoryBn: string;
  nameBn: string;
  nameEn: string;
  price: number;
  originalPrice: number;
  commission: number;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
}

const ECOMMERCE_PRODUCTS: EcommerceProduct[] = [
  // Fashion
  {
    id: 'p1',
    category: 'fashion',
    categoryBn: 'ফ্যাশন',
    nameBn: 'মেন্স প্রিমিয়াম কটন টি-শার্ট (১০০% এক্সপোর্ট কোয়ালিটি)',
    nameEn: "Men's Premium Cotton T-Shirt (Export Quality)",
    price: 450,
    originalPrice: 650,
    commission: 100,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviews: 184,
    stock: 45
  },
  {
    id: 'p2',
    category: 'gadgets',
    categoryBn: 'গ্যাজেট',
    nameBn: 'স্মার্ট ফিটনেস ট্র্যাকার ওয়াচ (হার্ট রেট ও ব্লুটুথ কলিং)',
    nameEn: 'Smart Fitness Tracker Watch (Calling & Heart Rate)',
    price: 1250,
    originalPrice: 1800,
    commission: 300,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 340,
    stock: 28
  },
  {
    id: 'p3',
    category: 'gadgets',
    categoryBn: 'গ্যাজেট',
    nameBn: 'এয়ারপডস প্রো ওয়্যারলেস ব্লুটুথ ইয়ারবাডস (নয়েজ ক্যান্সেলিং)',
    nameEn: 'AirPods Pro Wireless Bluetooth Earbuds (ANC)',
    price: 890,
    originalPrice: 1290,
    commission: 180,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviews: 260,
    stock: 52
  },
  {
    id: 'p4',
    category: 'fashion',
    categoryBn: 'ফ্যাশন',
    nameBn: 'মহিলাদের স্টাইলিশ লাক্সারি লেদার হ্যান্ডব্যাগ',
    nameEn: 'Women Stylish Luxury Leather Handbag',
    price: 1450,
    originalPrice: 2100,
    commission: 350,
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 412,
    stock: 19
  },
  {
    id: 'p5',
    category: 'fashion',
    categoryBn: 'ফ্যাশন',
    nameBn: 'অরিজিনাল লেদার ওয়ালেট ও কার্ড হোল্ডার (মেন্স)',
    nameEn: 'Genuine Leather Wallet & Card Holder (Mens)',
    price: 650,
    originalPrice: 950,
    commission: 120,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    reviews: 190,
    stock: 64
  },
  {
    id: 'p6',
    category: 'fashion',
    categoryBn: 'ফ্যাশন',
    nameBn: 'ইউভি প্রোটেকশন পোলারাইজড সানগ্লাস (ক্লাসিক ব্ল্যাক)',
    nameEn: 'UV Protection Polarized Sunglasses (Classic Black)',
    price: 550,
    originalPrice: 850,
    commission: 130,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviews: 145,
    stock: 33
  },
  {
    id: 'p7',
    category: 'beauty',
    categoryBn: 'বিউটি',
    nameBn: 'প্রফেশনাল মেকআপ ব্রাশ ফুল সেট (১২ পিস সাথে পাউচ)',
    nameEn: 'Professional Makeup Brush Set (12 pcs with Pouch)',
    price: 780,
    originalPrice: 1150,
    commission: 190,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviews: 310,
    stock: 41
  },
  {
    id: 'p8',
    category: 'fashion',
    categoryBn: 'ফ্যাশন',
    nameBn: 'মেন্স এয়ার কুশন স্পোর্টস রানিং স্নিকার্স জুতো',
    nameEn: 'Mens Air Cushion Sports Running Sneakers',
    price: 1850,
    originalPrice: 2600,
    commission: 420,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 275,
    stock: 22
  },
  {
    id: 'p9',
    category: 'home',
    categoryBn: 'হোম ও কিচেন',
    nameBn: 'হাই পাওয়ার মাল্টিফাংশন জুসার ও কিচেন ব্লেন্ডার',
    nameEn: 'High Power Multifunction Juicer & Kitchen Blender',
    price: 2200,
    originalPrice: 3200,
    commission: 480,
    image: 'https://images.unsplash.com/photo-1585659722983-38ca8e9af409?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviews: 168,
    stock: 15
  },
  {
    id: 'p10',
    category: 'gadgets',
    categoryBn: 'গ্যাজেট',
    nameBn: 'আরজিবি মেকানিক্যাল ব্যাকলিট গেমিং কিবোর্ড',
    nameEn: 'RGB Mechanical Backlit Gaming Keyboard',
    price: 1650,
    originalPrice: 2400,
    commission: 360,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviews: 215,
    stock: 37
  },
  {
    id: 'p11',
    category: 'beauty',
    categoryBn: 'বিউটি',
    nameBn: 'অর্গানিক অ্যালোভেরা স্কিন ব্রাইটেনিং সিরাম ও ফেসওয়াশ',
    nameEn: 'Organic Aloe Vera Skin Brightening Serum & Facewash',
    price: 620,
    originalPrice: 890,
    commission: 150,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviews: 380,
    stock: 80
  },
  {
    id: 'p12',
    category: 'home',
    categoryBn: 'হোম ও কিচেন',
    nameBn: 'স্টেইনলেস স্টিল ভ্যাকুয়াম থার্মাল ওয়াটার বোতল (১ লিটার)',
    nameEn: 'Stainless Steel Vacuum Thermal Water Bottle (1L)',
    price: 490,
    originalPrice: 750,
    commission: 110,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    reviews: 195,
    stock: 60
  },
  {
    id: 'p13',
    category: 'gadgets',
    categoryBn: 'গ্যাজেট',
    nameBn: 'ম্যাগনেটিক ফাস্ট ওয়্যারলেস কার ফোন মাউন্ট ও চার্জার',
    nameEn: 'Magnetic Fast Wireless Car Mount & Fast Charger',
    price: 790,
    originalPrice: 1150,
    commission: 170,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviews: 132,
    stock: 44
  },
  {
    id: 'p14',
    category: 'fashion',
    categoryBn: 'ফ্যাশন',
    nameBn: 'প্রিমিয়াম ব্ল্যাক সিল্ক অ্যান্ড কটন পাঞ্জাবি (ঈদ স্পেশাল)',
    nameEn: 'Premium Black Silk & Cotton Panjabi (Special Edition)',
    price: 1950,
    originalPrice: 2800,
    commission: 450,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 520,
    stock: 25
  },
  {
    id: 'p15',
    category: 'gadgets',
    categoryBn: 'গ্যাজেট',
    nameBn: 'পোর্টেবল এইচডি সিনেমা মিনি প্রজেক্টর (ওয়াইফাই কানেক্টিভিটি)',
    nameEn: 'Portable HD Mini Movie Projector (WiFi Supported)',
    price: 3800,
    originalPrice: 5500,
    commission: 750,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 142,
    stock: 12
  }
];

export default function ShopTab({ profile, updateProfile, lang }: ShopTabProps) {
  const [sellSuccess, setSellSuccess] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<EcommerceProduct | null>(null);
  const [isSelling, setIsSelling] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const filteredProducts = ECOMMERCE_PRODUCTS.filter((product) => {
    if (selectedCategory !== 'ALL' && product.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        product.nameBn.toLowerCase().includes(q) ||
        product.nameEn.toLowerCase().includes(q) ||
        product.categoryBn.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const openSellModal = (product: EcommerceProduct) => {
    setSelectedProduct(product);
    setBuyerName('');
    setBuyerPhone('');
    setBuyerAddress('');
    setErrorMsg('');
    setCopiedLink(false);
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleConfirmSale = () => {
    if (!selectedProduct) return;

    if (!buyerName.trim() || !buyerPhone.trim() || !buyerAddress.trim()) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে ক্রেতার নাম, মোবাইল নম্বর ও ঠিকানা পূরণ করুন।' : 'Please fill out all buyer details.');
      return;
    }

    if (buyerPhone.trim().replace(/\D/g, '').length < 11) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।' : 'Please enter a valid 11-digit phone number.');
      return;
    }

    setErrorMsg('');
    setIsSelling(true);

    // Simulate selling process
    setTimeout(() => {
      const commissionInBalance = selectedProduct.commission / 100;

      updateProfile({
        balance: profile.balance + commissionInBalance,
        totalIncome: profile.totalIncome + commissionInBalance,
        tasksCompleted: profile.tasksCompleted + 1
      });

      setSellSuccess(
        lang === 'bn'
          ? `সফলভাবে বিক্রি হয়েছে! ৳${selectedProduct.commission} কমিশন আপনার অ্যাকাউন্টে যোগ করা হয়েছে।`
          : `Sold successfully! ৳${selectedProduct.commission} commission added to your account.`
      );

      setIsSelling(false);
      setSelectedProduct(null);

      setTimeout(() => setSellSuccess(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in" id="shop-container">
      {/* Shop Intro Banner */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-slate-700/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 opacity-10 pointer-events-none">
          <Icons.ShoppingBag className="w-48 h-48 text-white" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-pink-500/20 border border-pink-400/30 text-pink-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {lang === 'bn' ? 'ই-কমার্স এফিলিয়েট শপ' : 'E-Commerce Affiliate Shop'}
            </span>
            <span className="text-xs text-amber-300 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/20">
              {lang === 'bn' ? `${ECOMMERCE_PRODUCTS.length}টি হট প্রোডাক্ট` : `${ECOMMERCE_PRODUCTS.length} Hot Products`}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {lang === 'bn' ? 'প্রোডাক্ট সেল করুন, ক্যাশ কমিশন আয় করুন!' : 'Sell Products & Earn Instant Cash!'}
          </h2>
          <p className="text-slate-300 text-xs leading-relaxed max-w-xl">
            {lang === 'bn'
              ? 'নিচের জনপ্রিয় ট্রেন্ডিং প্রোডাক্টগুলো গ্রাহকদের সাথে শেয়ার করুন। প্রতি সফল অর্ডারে আপনার অ্যাকাউন্টে সরাসরি ১০০৳ থেকে ৭৫০৳ পর্যন্ত কমিশন যুক্ত হবে।'
              : 'Promote trending fashion, electronics, gadgets and beauty products below. For every successful confirmed order, earn instant direct cash profit.'}
          </p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          {[
            { id: 'ALL', labelBn: 'সকল প্রোডাক্ট', labelEn: 'All' },
            { id: 'fashion', labelBn: 'ফ্যাশন', labelEn: 'Fashion' },
            { id: 'gadgets', labelBn: 'গ্যাজেট ও ইলেকট্রনিক্স', labelEn: 'Gadgets' },
            { id: 'beauty', labelBn: 'বিউটি ও স্কিনকেয়ার', labelEn: 'Beauty' },
            { id: 'home', labelBn: 'হোম ও কিচেন', labelEn: 'Home' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {lang === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'প্রোডাক্ট বা ক্যাটাগরি খুঁজুন...' : 'Search products or categories...'}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-700 focus:border-pink-400 outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Alerts */}
      {sellSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 animate-fade-in shadow-sm">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Icons.CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <span>{sellSuccess}</span>
        </div>
      )}

      {/* Grid listing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 md:gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
          >
            {/* Image & Badge */}
            <div className="relative h-40 w-full overflow-hidden bg-slate-100">
              <img
                src={product.image}
                alt={product.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300';
                }}
              />
              <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-sm">
                {lang === 'bn' ? `৳${product.commission} লাভ` : `৳${product.commission} Profit`}
              </div>
              <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-lg shadow-2xs flex items-center gap-1">
                <Icons.Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-slate-700">{product.rating}</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-3.5 flex flex-col flex-1 justify-between space-y-3">
              <div>
                <span className="text-[9px] font-extrabold uppercase text-indigo-600 tracking-wider">
                  {product.categoryBn}
                </span>
                <h3 className="font-bold text-slate-800 text-xs leading-snug line-clamp-2 mt-0.5">
                  {lang === 'bn' ? product.nameBn : product.nameEn}
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 block line-through">৳{product.originalPrice}</span>
                    <span className="text-sm font-black text-slate-900 font-mono">
                      ৳{product.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-emerald-600 font-extrabold block">
                      {lang === 'bn' ? 'আপনার কমিশন' : 'Commission'}
                    </span>
                    <span className="text-xs font-black text-emerald-700 font-mono">
                      +৳{product.commission}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openSellModal(product)}
                  className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-extrabold py-2.5 rounded-2xl text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Icons.Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'bn' ? 'সেল করুন' : 'Sell Now'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selling Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 relative">
              <h3 className="font-extrabold text-slate-800 text-sm">
                {lang === 'bn' ? 'প্রোডাক্ট সেল ও কাস্টমার বুকিং' : 'Product Sales & Order Booking'}
              </h3>
              <button
                type="button"
                onClick={() => !isSelling && setSelectedProduct(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                disabled={isSelling}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {/* Product Info */}
              <div className="flex gap-3.5 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 items-center">
                <img
                  src={selectedProduct.image}
                  alt="Product"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-xs leading-snug truncate">
                    {lang === 'bn' ? selectedProduct.nameBn : selectedProduct.nameEn}
                  </h4>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {lang === 'bn' ? `মূল্য: ৳${selectedProduct.price}` : `Price: ৳${selectedProduct.price}`}
                  </div>
                  <div className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md mt-1 border border-emerald-200">
                    {lang === 'bn' ? `আপনার লাভ: ৳${selectedProduct.commission}` : `Your Profit: ৳${selectedProduct.commission}`}
                  </div>
                </div>
              </div>

              {/* Promotional Link */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  {lang === 'bn' ? 'ইউনিক প্রোডাক্ট শেয়ারিং লিঙ্ক:' : 'Affiliate Product Link:'}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-mono text-slate-600 truncate">
                    https://unityearning.com/product/{selectedProduct.id}?ref={profile.uid}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyLink(`https://unityearning.com/product/${selectedProduct.id}?ref=${profile.uid}`)}
                    className={`px-3 py-2 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                      copiedLink ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    {copiedLink ? <Icons.Check className="w-3.5 h-3.5" /> : <Icons.Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'কপি' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              {/* Buyer Form */}
              <div className="space-y-3 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80">
                <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Icons.UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  {lang === 'bn' ? 'ক্রেতার ডেলিভারি তথ্য:' : 'Buyer Delivery Details:'}
                </h4>

                <div className="space-y-2">
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-bold text-slate-600 block">
                      {lang === 'bn' ? 'ক্রেতার নাম:' : "Buyer's Full Name:"}
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. মোঃ সাকিব হাসান"
                      className="w-full border border-slate-200 rounded-xl p-2 text-xs text-slate-800 bg-white outline-none focus:border-pink-400"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[10px] font-bold text-slate-600 block">
                      {lang === 'bn' ? 'মোবাইল নম্বর:' : "Buyer's Phone Number:"}
                    </label>
                    <input
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="e.g. 01712345678"
                      className="w-full border border-slate-200 rounded-xl p-2 text-xs text-slate-800 bg-white font-mono outline-none focus:border-pink-400"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[10px] font-bold text-slate-600 block">
                      {lang === 'bn' ? 'পূর্ণাঙ্গ ডেলিভারি ঠিকানা:' : 'Delivery Address:'}
                    </label>
                    <textarea
                      value={buyerAddress}
                      onChange={(e) => setBuyerAddress(e.target.value)}
                      placeholder="যেমন: বাড়ি ১২, রোড ৫, মিরপুর ১০, ঢাকা"
                      rows={2}
                      className="w-full border border-slate-200 rounded-xl p-2 text-xs text-slate-800 bg-white outline-none focus:border-pink-400 resize-none"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-[10px] text-rose-500 font-bold bg-rose-50 p-2 rounded-lg border border-rose-100">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Confirm Sale Button */}
              <button
                type="button"
                onClick={handleConfirmSale}
                disabled={isSelling}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold py-3 rounded-2xl text-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                {isSelling ? (
                  <>
                    <Icons.Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{lang === 'bn' ? 'অর্ডার প্রসেস হচ্ছে...' : 'Processing Order...'}</span>
                  </>
                ) : (
                  <>
                    <Icons.CheckCircle className="w-4 h-4 text-emerald-300" />
                    <span>{lang === 'bn' ? `অর্ডার কনফার্ম করুন (৳${selectedProduct.commission} লাভ নিন)` : `Confirm & Earn ৳${selectedProduct.commission}`}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
