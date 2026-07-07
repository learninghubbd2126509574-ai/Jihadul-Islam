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
  nameBn: string;
  nameEn: string;
  price: number;
  commission: number;
  image: string;
  rating: number;
  reviews: number;
}

const ECOMMERCE_PRODUCTS: EcommerceProduct[] = [
  { id: 'p1', nameBn: 'মেন্স প্রিমিয়াম কটন টি-শার্ট', nameEn: 'Men\'s Premium Cotton T-Shirt', price: 450, commission: 100, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300', rating: 4.5, reviews: 120 },
  { id: 'p2', nameBn: 'স্মার্ট ফিটনেস ওয়াচ', nameEn: 'Smart Fitness Watch', price: 1250, commission: 300, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=300', rating: 4.8, reviews: 340 },
  { id: 'p3', nameBn: 'ওয়্যারলেস ব্লুটুথ ইয়ারবাড', nameEn: 'Wireless Bluetooth Earbuds', price: 890, commission: 150, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300', rating: 4.6, reviews: 215 },
  { id: 'p4', nameBn: 'মহিলাদের ফ্যাশন হ্যান্ডব্যাগ', nameEn: 'Women Fashion Handbag', price: 1450, commission: 400, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=300', rating: 4.9, reviews: 520 },
  { id: 'p5', nameBn: 'লেদার ওয়ালেট - মেন্স', nameEn: 'Leather Wallet - Mens', price: 650, commission: 100, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=300', rating: 4.3, reviews: 85 },
  { id: 'p6', nameBn: 'প্রিমিয়াম সানগ্লাস', nameEn: 'Premium Sunglasses', price: 550, commission: 150, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300', rating: 4.7, reviews: 190 },
  { id: 'p7', nameBn: 'মেকআপ ব্রাশ সেট (১২ পিস)', nameEn: 'Makeup Brush Set (12 pcs)', price: 780, commission: 200, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300', rating: 4.8, reviews: 275 },
  { id: 'p8', nameBn: 'মেন্স রানিং স্নিকার্স', nameEn: 'Mens Running Sneakers', price: 1850, commission: 300, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300', rating: 4.6, reviews: 140 }
];

export default function ShopTab({ profile, updateProfile, lang }: ShopTabProps) {
  const [sellSuccess, setSellSuccess] = useState<string | null>(null);
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<EcommerceProduct | null>(null);
  const [isSelling, setIsSelling] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const openSellModal = (product: EcommerceProduct) => {
    setSelectedProduct(product);
    setBuyerName('');
    setBuyerPhone('');
    setBuyerAddress('');
    setErrorMsg('');
    setCopiedLink(false);
    setCopiedImage(false);
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyImageLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedImage(true);
    setTimeout(() => setCopiedImage(false), 2000);
  };

  const handleConfirmSale = () => {
    if (!selectedProduct) return;
    
    if (!buyerName.trim() || !buyerPhone.trim() || !buyerAddress.trim()) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে ক্রেতার সব তথ্য দিন।' : 'Please fill out all buyer details.');
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
          ? `সফলভাবে বিক্রি হয়েছে! ৳${selectedProduct.commission} কমিশন আপনার ব্যালেন্সে যোগ করা হয়েছে।` 
          : `Sold successfully! ৳${selectedProduct.commission} commission added to your balance.`
      );
      
      setIsSelling(false);
      setSelectedProduct(null);
      
      setTimeout(() => setSellSuccess(null), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in" id="shop-container">
      {/* Shop Intro Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden border border-indigo-500/20">
        <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {lang === 'bn' ? 'ই-কমার্স রিসেলিং' : 'E-Commerce Reselling'}
          </span>
          <h2 className="text-xl font-black">
            {lang === 'bn' ? 'প্রোডাক্ট সেল করুন, আয় করুন!' : 'Sell Products & Earn!'}
          </h2>
          <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
            {lang === 'bn'
              ? 'নিচের প্রোডাক্টগুলো প্রমোট করুন। প্রতিটি সফল সেলের জন্য আপনার একাউন্টে ইনস্ট্যান্ট কমিশন যোগ হবে।'
              : 'Promote the products below. For every successful sale, instant commission will be added to your account.'}
          </p>
          <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center text-xs">
            <span className="text-slate-400">{lang === 'bn' ? 'আপনার বর্তমান ব্যালেন্স:' : 'Your Current Balance:'}</span>
            <span className="text-emerald-400 font-black text-sm">
              {lang === 'bn' ? `৳${(profile.balance * 100).toFixed(0)}` : `$${profile.balance.toFixed(2)}`}
            </span>
          </div>
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
      <div className="grid grid-cols-2 gap-3.5 md:gap-5">
        {ECOMMERCE_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col"
          >
            {/* Image */}
            <div className="relative h-36 w-full overflow-hidden bg-slate-100">
              <img 
                src={product.image} 
                alt={product.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <Icons.Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
              </div>
            </div>
            
            {/* Details */}
            <div className="p-3 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-xs leading-tight line-clamp-2 mb-1">
                  {lang === 'bn' ? product.nameBn : product.nameEn}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-[10px] text-slate-400">
                    {lang === 'bn' ? `৳${product.price} • ${product.reviews}টি সেল` : `$${(product.price/100).toFixed(2)} • ${product.reviews} sold`}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[9px] text-emerald-700 font-bold uppercase tracking-wide">
                    {lang === 'bn' ? 'কমিশন' : 'Commission'}
                  </span>
                  <span className="text-xs font-black text-emerald-600">
                    {lang === 'bn' ? `৳${product.commission}` : `$${(product.commission/100).toFixed(2)}`}
                  </span>
                </div>

                <button
                  onClick={() => openSellModal(product)}
                  className="w-full bg-[#0f172a] text-white hover:bg-slate-800 font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Icons.Share2 className="w-3.5 h-3.5 text-blue-400" />
                  {lang === 'bn' ? 'সেল করুন' : 'Sell Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selling Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up sm:animate-fade-in">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 relative">
              <h3 className="font-extrabold text-slate-800 text-sm">
                {lang === 'bn' ? 'প্রোডাক্ট সেল সম্পন্ন করুন' : 'Complete Product Sale'}
              </h3>
              <button 
                onClick={() => !isSelling && setSelectedProduct(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                disabled={isSelling}
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
              
              {/* Product Info */}
              <div className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <img 
                  src={selectedProduct.image} 
                  alt="Product"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 object-cover rounded-xl border border-slate-200"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-xs leading-tight mb-1">
                    {lang === 'bn' ? selectedProduct.nameBn : selectedProduct.nameEn}
                  </h4>
                  <div className="text-[10px] text-slate-500 mb-1.5">
                    {lang === 'bn' ? `খুচরা মূল্য: ৳${selectedProduct.price}` : `Retail Price: $${(selectedProduct.price/100).toFixed(2)}`}
                  </div>
                  <div className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-lg border border-emerald-200">
                    {lang === 'bn' ? `আপনার লাভ: ৳${selectedProduct.commission}` : `Your Profit: $${(selectedProduct.commission/100).toFixed(2)}`}
                  </div>
                </div>
              </div>

              {/* Promotional Links & Assets */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Icons.Link2 className="w-4 h-4 text-blue-500" />
                  {lang === 'bn' ? 'প্রোডাক্ট লিংক্স ও বিস্তারিত' : 'Product Links & Details'}
                </h4>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-mono text-slate-500 truncate">
                      https://unityearning.com/product/{selectedProduct.id}?ref={profile.uid}
                    </div>
                    <button 
                      onClick={() => handleCopyLink(`https://unityearning.com/product/${selectedProduct.id}?ref=${profile.uid}`)}
                      className={`px-3 py-2 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-colors ${copiedLink ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                    >
                      {copiedLink ? <Icons.Check className="w-3.5 h-3.5" /> : <Icons.Copy className="w-3.5 h-3.5" />}
                      {copiedLink ? (lang === 'bn' ? 'কপিড' : 'Copied') : (lang === 'bn' ? 'লিংক' : 'Link')}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-mono text-slate-500 truncate">
                      {selectedProduct.image}
                    </div>
                    <button 
                      onClick={() => handleCopyImageLink(selectedProduct.image)}
                      className={`px-3 py-2 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-colors ${copiedImage ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {copiedImage ? <Icons.Check className="w-3.5 h-3.5" /> : <Icons.Image className="w-3.5 h-3.5" />}
                      {copiedImage ? (lang === 'bn' ? 'কপিড' : 'Copied') : (lang === 'bn' ? 'ছবি' : 'Image')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Icons.UserCheck className="w-4 h-4 text-emerald-500" />
                  {lang === 'bn' ? 'ক্রেতার তথ্য (অর্ডার কনফার্ম করতে)' : 'Buyer Details (To Confirm Order)'}
                </h4>
                
                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'ক্রেতার পুরো নাম' : 'Buyer Full Name'}
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                  <input
                    type="tel"
                    placeholder={lang === 'bn' ? 'ক্রেতার মোবাইল নম্বর' : 'Buyer Mobile Number'}
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                  <textarea
                    placeholder={lang === 'bn' ? 'সম্পূর্ণ ডেলিভারি ঠিকানা (বাড়ি/রোড, এলাকা, জেলা)' : 'Full Delivery Address'}
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-blue-400 outline-none transition-all resize-none h-20"
                  />
                </div>
                
                {errorMsg && (
                  <div className="text-rose-500 text-[10px] font-bold flex items-center gap-1">
                    <Icons.AlertCircle className="w-3.5 h-3.5" />
                    {errorMsg}
                  </div>
                )}
              </div>

            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <button
                onClick={handleConfirmSale}
                disabled={isSelling}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSelling ? (
                  <>
                    <Icons.Loader2 className="w-5 h-5 animate-spin" />
                    {lang === 'bn' ? 'প্রসেসিং হচ্ছে...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <Icons.CheckCircle className="w-5 h-5" />
                    {lang === 'bn' ? 'অর্ডার কনফার্ম করুন' : 'Confirm Order'}
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
