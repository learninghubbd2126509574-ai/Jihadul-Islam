import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

interface LoginPortalProps {
  lang: 'bn' | 'en';
  onLoginSuccess: () => void;
}

export default function LoginPortal({ lang, onLoginSuccess }: LoginPortalProps) {
  const [studentId] = useState('UE-2026-9842');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Keypad click handler
  const handleKeyClick = (num: string) => {
    if (pin.length < 4) {
      setErrorMsg('');
      setPin((prev) => prev + num);
    }
  };

  // Backspace handler
  const handleBackspace = () => {
    setErrorMsg('');
    setPin((prev) => prev.slice(0, -1));
  };

  // Clear handler
  const handleClear = () => {
    setErrorMsg('');
    setPin('');
  };

  // Validate 4012 PIN
  const verifyPin = (inputPin: string) => {
    if (inputPin === '4012') {
      setIsVerifying(true);
      setErrorMsg('');
      setTimeout(() => {
        setIsVerifying(false);
        localStorage.setItem('ue_portal_logged_in', 'true');
        onLoginSuccess();
      }, 500);
    } else {
      setErrorMsg(
        lang === 'bn'
          ? 'ভুল পিন কোড! সঠিক পিন কোড হলো 4012'
          : 'Incorrect PIN! Correct PIN is 4012'
      );
      // Auto reset pin after short delay on error
      setTimeout(() => {
        setPin('');
      }, 1200);
    }
  };

  // Auto trigger verification when 4 digits are typed
  useEffect(() => {
    if (pin.length === 4) {
      verifyPin(pin);
    }
  }, [pin]);

  return (
    <div className="fixed inset-0 z-50 bg-[#fbfcfd] flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans relative">
      {/* Premium Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/40 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-[440px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        {/* Brand Identity Section */}
        <div className="text-center mb-6 space-y-2">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-150" />
            <div className="relative bg-white p-3 rounded-[24px] shadow-xl border-b-2 border-slate-100 flex items-center justify-center group hover:scale-105 transition-transform duration-500">
              <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/30">
                <Icons.ShieldCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="space-y-0.5">
            <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] opacity-80">
              Enterprise Secure Access
            </h2>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-800">
                UNITY
              </span>
              <span className="text-indigo-600">EARNING</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[2px] w-4 bg-indigo-100" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {lang === 'bn' ? 'লার্নিং প্ল্যাটফর্ম' : 'Learning Platform'}
              </p>
              <div className="h-[2px] w-4 bg-indigo-100" />
            </div>
          </div>
        </div>

        {/* Enhanced Login Container */}
        <div className="bg-white rounded-[40px] p-6 sm:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.08)] border-b-8 border-slate-100 relative group transition-all duration-500">
          <div className="space-y-4">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50 mb-1">
                <Icons.User className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">{studentId}</span>
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                {lang === 'bn' ? 'সিকিউরিটি পিন দিন' : 'Enter Security PIN'}
              </h3>
            </div>

            {/* Professional PIN Display Slots */}
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => {
                const hasDigit = pin.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-12 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 relative ${
                      hasDigit 
                        ? 'border-indigo-600 bg-white shadow-md shadow-indigo-600/10 -translate-y-1' 
                        : 'border-slate-200 bg-slate-50/80'
                    }`}
                  >
                    {hasDigit ? (
                      <div className="w-3 h-3 rounded-full bg-indigo-600 animate-in zoom-in duration-300 shadow-sm" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Dynamic Status / Error Handler */}
            <div className="h-5 flex items-center justify-center">
              {isVerifying ? (
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-black bg-emerald-50 px-4 py-1 rounded-full animate-pulse border border-emerald-100">
                  <Icons.Loader2 className="w-4 h-4 animate-spin" />
                  <span>{lang === 'bn' ? 'ভেরিফাই হচ্ছে...' : 'Verifying...'}</span>
                </div>
              ) : errorMsg ? (
                <div className="text-rose-500 text-xs font-black text-center bg-rose-50 px-4 py-1 rounded-full border border-rose-100 animate-in fade-in slide-in-from-top-2">
                  {errorMsg}
                </div>
              ) : null}
            </div>

            {/* High-Definition Keypad Grid */}
            <div className="grid grid-cols-3 gap-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyClick(num)}
                  className="group h-14 sm:h-16 bg-white border-2 border-slate-100/50 rounded-2xl transition-all duration-300 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-600/10 active:scale-90 active:bg-slate-50 shadow-sm flex items-center justify-center"
                >
                  <span className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300">
                    {num}
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={handleClear}
                className="h-14 sm:h-16 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 rounded-2xl"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => handleKeyClick('0')}
                className="group h-14 sm:h-16 bg-white border-2 border-slate-100/50 rounded-2xl transition-all duration-300 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-600/10 active:scale-90 active:bg-slate-50 shadow-sm flex items-center justify-center"
              >
                <span className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300">
                  0
                </span>
              </button>

              <button
                type="button"
                onClick={handleBackspace}
                className="h-14 sm:h-16 flex items-center justify-center text-slate-300 hover:text-amber-600 transition-all hover:bg-amber-50 rounded-2xl"
              >
                <Icons.Delete className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Security Tag & Forget Password */}
            <div className="flex flex-col items-center gap-3 pt-2">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
              <div className="flex items-center justify-between w-full px-2">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Icons.Lock className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider">{lang === 'bn' ? 'সুরক্ষিত এনক্রিপশন' : 'Secure Login'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-extrabold hover:underline transition-all cursor-pointer flex items-center gap-1"
                >
                  <Icons.HelpCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'ফরগেট পাসওয়ার্ড?' : 'Forgot Password?'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Icons.KeyRound className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm">
                  {lang === 'bn' ? 'পিন / পাসওয়ার্ড রিকভারি' : 'PIN / Password Recovery'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSuccess(false);
                }}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-xs"
              >
                ✕
              </button>
            </div>

            {forgotSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2">
                <Icons.CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-800">
                  {lang === 'bn'
                    ? 'আপনার মোবাইল নম্বরে ও ইমেইলে ডিফল্ট পিন (4012) পাঠানো হয়েছে!'
                    : 'Your default PIN (4012) has been sent to your registered phone/email!'}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {lang === 'bn' ? 'সরাসরি 4012 ডায়াল করে লগইন করুন।' : 'Use PIN 4012 to login immediately.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSuccess(false);
                  }}
                  className="w-full mt-2 bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs"
                >
                  {lang === 'bn' ? 'ঠিক আছে' : 'OK'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'আপনার রেজিস্টার্ড স্টুডেন্ট আইডি অথবা মোবাইল নম্বর দিয়ে পাসওয়ার্ড রিকভার করুন:'
                    : 'Recover your account PIN using your registered Student ID or Phone Number:'}
                </p>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    {lang === 'bn' ? 'স্টুডেন্ট আইডি / ফোন নাম্বার:' : 'Student ID / Phone:'}
                  </label>
                  <input
                    type="text"
                    defaultValue={studentId}
                    placeholder="UE-2026-9842"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 bg-slate-50 outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setForgotSuccess(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Icons.Send className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'রিকভারি পিন পাঠান' : 'Send Recovery PIN'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

