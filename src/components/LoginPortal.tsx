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
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans select-none">
      {/* Background ambient accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm sm:max-w-md relative z-10 my-auto">
        {/* Brand Identity Section */}
        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-700 text-white shadow-md shadow-blue-600/20 mb-1 border border-blue-500/30">
            <Icons.ShieldCheck className="w-7 h-7 text-white" />
          </div>
          
          <div className="space-y-0.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
              <span>UNITY </span>
              <span className="text-blue-600">EARNING</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {lang === 'bn' ? 'লার্নিং প্ল্যাটফর্ম • সিকিউর পোর্টাল' : 'Learning Platform • Secure Access'}
            </p>
          </div>
        </div>

        {/* Enhanced Login Container */}
        <div className="bg-white rounded-[1.25rem] p-4 sm:p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-slate-200/80">
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200/70 text-slate-700 text-xs font-mono font-bold leading-none">
                <Icons.User className="w-3.5 h-3.5 text-blue-600" />
                <span>{studentId}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight pt-1 leading-snug">
                {lang === 'bn' ? 'সিকিউরিটি পিন দিন' : 'Enter Security PIN'}
              </h2>
            </div>

            {/* PIN Display Slots */}
            <div className="flex justify-center gap-2.5 sm:gap-3">
              {[0, 1, 2, 3].map((idx) => {
                const hasDigit = pin.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                      hasDigit 
                        ? 'border-blue-600 bg-blue-50/20 shadow-xs scale-105' 
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    {hasDigit ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-sm" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Status / Error Handler */}
            <div className="h-6 flex items-center justify-center">
              {isVerifying ? (
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  <Icons.Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{lang === 'bn' ? 'ভেরিফাই হচ্ছে...' : 'Verifying...'}</span>
                </div>
              ) : errorMsg ? (
                <div className="text-rose-600 text-xs font-semibold text-center bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80">
                  {errorMsg}
                </div>
              ) : (
                <span className="text-[11px] text-slate-400 font-medium">
                  {lang === 'bn' ? '৪ ডিজিটের গোপন পিন ডায়াল করুন' : 'Dial your 4-digit secret PIN'}
                </span>
              )}
            </div>

            {/* High-Definition Keypad Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyClick(num)}
                  className="h-13 sm:h-14 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-all duration-150 active:scale-95 active:bg-blue-50 text-slate-800 hover:text-blue-600 text-xl font-bold font-mono tabular-nums flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                onClick={handleClear}
                className="h-13 sm:h-14 flex items-center justify-center text-slate-500 hover:text-rose-600 transition-colors font-bold text-xs uppercase tracking-wider hover:bg-rose-50 rounded-xl border border-transparent cursor-pointer active:scale-95"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => handleKeyClick('0')}
                className="h-13 sm:h-14 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-all duration-150 active:scale-95 active:bg-blue-50 text-slate-800 hover:text-blue-600 text-xl font-bold font-mono tabular-nums flex items-center justify-center cursor-pointer shadow-2xs"
              >
                0
              </button>

              <button
                type="button"
                onClick={handleBackspace}
                className="h-13 sm:h-14 flex items-center justify-center text-slate-500 hover:text-amber-600 transition-colors hover:bg-amber-50 rounded-xl border border-transparent cursor-pointer active:scale-95"
                title="Backspace"
              >
                <Icons.Delete className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Security Tag & Forget Password */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Icons.Lock className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] font-medium">{lang === 'bn' ? 'সুরক্ষিত এনক্রিপশন' : '256-bit Secure'}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all cursor-pointer flex items-center gap-1"
              >
                <Icons.HelpCircle className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ফরগেট পাসওয়ার্ড?' : 'Forgot Password?'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[1.25rem] p-4 sm:p-5 max-w-sm w-full shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  <Icons.KeyRound className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">
                  {lang === 'bn' ? 'পিন / পাসওয়ার্ড রিকভারি' : 'PIN / Password Recovery'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSuccess(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-xs transition-colors cursor-pointer"
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
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
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
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 bg-slate-50 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setForgotSuccess(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
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
