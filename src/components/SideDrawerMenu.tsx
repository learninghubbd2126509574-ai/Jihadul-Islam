import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { UserProfile } from '../types';
import SocialLinksBar from './SocialLinksBar';

interface SideDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  lang: 'bn' | 'en';
  onNavigate: (tabId: string) => void;
  onOpenNotifications: () => void;
  onLogout: () => void;
  onToggleLang?: () => void;
}

export default function SideDrawerMenu({
  isOpen,
  onClose,
  profile,
  onNavigate,
  onOpenNotifications,
  onLogout,
}: SideDrawerMenuProps) {
  if (!isOpen) return null;

  const [copiedId, setCopiedId] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<{ title: string; content: string } | null>(null);

  const copyUid = () => {
    navigator.clipboard.writeText(profile.uid);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // 100% English menu items per user request
  const primaryMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      subtitle: 'Main overview & jobs feed',
      icon: Icons.LayoutGrid,
      action: () => {
        onNavigate('home');
        onClose();
      },
    },
    {
      id: 'wallet',
      label: 'Wallet Balance',
      subtitle: 'Available earnings & cashout',
      icon: Icons.Wallet,
      action: () => {
        onNavigate('profile');
        onClose();
      },
    },
    {
      id: 'ranking',
      label: 'Freelancer Ranking',
      subtitle: 'Leaderboard & monthly rewards',
      icon: Icons.Trophy,
      action: () => {
        onNavigate('ranking');
        onClose();
      },
    },
    {
      id: 'support',
      label: 'Live Support',
      subtitle: 'Instant 24/7 agent assistance',
      icon: Icons.Headphones,
      action: () => {
        onNavigate('support');
        onClose();
      },
    },
    {
      id: 'transactions',
      label: 'Live Transactions',
      subtitle: 'Real-time peer payouts feed',
      icon: Icons.Activity,
      action: () => {
        onNavigate('live-tx');
        onClose();
      },
    },
    {
      id: 'live-chat',
      label: 'Live Chat',
      subtitle: 'Community peer discussion',
      icon: Icons.MessagesSquare,
      action: () => {
        onNavigate('live-chat');
        onClose();
      },
    },
    {
      id: 'offers',
      label: 'Offers',
      subtitle: 'Limited bonus commission tasks',
      icon: Icons.Flame,
      action: () => {
        onNavigate('offers');
        onClose();
      },
    },
  ];

  // Additional settings & app options requested in prompt
  const secondaryMenuItems = [
    {
      id: 'ratings',
      label: 'Rating & Reviews',
      subtitle: '4.9 ★★★★★ (12,480+ Reviews)',
      icon: Icons.Star,
      action: () => {
        setActiveInfoModal({
          title: 'Rating & Reviews',
          content: 'Unity Earning has an average 4.9/5 star satisfaction score from over 12,480 active freelancers across Bangladesh and worldwide. All member payouts and task commissions are 100% verified.'
        });
      },
    },
    {
      id: 'notifications',
      label: 'Notification Management',
      subtitle: 'System alerts, bonuses & tips',
      icon: Icons.Bell,
      action: () => {
        onClose();
        onOpenNotifications();
      },
    },
    {
      id: 'device',
      label: 'Device Management',
      subtitle: 'Current Device: Authorized (Protected)',
      icon: Icons.Smartphone,
      action: () => {
        setActiveInfoModal({
          title: 'Device Management',
          content: 'Your account is securely authorized on this device. AES-256 session encryption protects your wallet balance and student profile against unauthorized logins.'
        });
      },
    },
    {
      id: 'official-website',
      label: 'Official Website',
      subtitle: 'https://unityearning.com (Official)',
      icon: Icons.Globe,
      action: () => {
        setActiveInfoModal({
          title: 'Official Platform Domain',
          content: 'You are browsing the official, verified Unity Earning E-learning & Micro-job Web App (v3.2 Secure Edition). Ensure all payments and task submissions occur through this portal.'
        });
      },
    },
    {
      id: 'about-us',
      label: 'About Us',
      subtitle: 'Certified e-learning since 2026',
      icon: Icons.Info,
      action: () => {
        setActiveInfoModal({
          title: 'About Unity Earning',
          content: 'Unity Earning is Bangladesh\'s leading digital skill training, micro-job simulation, and commission-earning platform. We empower students and remote freelancers with practical data entry, content writing, design, and marketing skills.'
        });
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      {/* Backdrop tap to close */}
      <div className="flex-1 cursor-pointer" onClick={onClose} aria-label="Close menu backdrop" />

      {/* Drawer Container (100% in English) */}
      <div className="w-[86%] max-w-sm sm:max-w-md bg-slate-50 h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 animate-slide-left p-3.5 sm:p-5">
        <div>
          {/* Header Bar with Official Logo */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs shrink-0 flex items-center justify-center p-0.5">
                <img
                  src="/unity_earning_logo.jpg"
                  alt="Unity Earning Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-tight">
                  Unity Earning
                </h2>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                  E-learning Platform
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center border border-slate-200 shadow-2xs transition-transform active:scale-95 cursor-pointer"
              title="Close Menu"
              aria-label="Close Menu"
            >
              <Icons.X className="w-4 h-4" />
            </button>
          </div>

          {/* Student Profile Card (All English) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col items-center text-center relative mb-4">
            <div className="relative mb-2">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-emerald-500/50 p-1 bg-emerald-50/50">
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-2xs" />
            </div>

            <h3 className="font-extrabold text-base text-slate-900 leading-snug">
              {profile.fullName}
            </h3>

            {/* Student ID Pill with Copy button */}
            <button
              type="button"
              onClick={copyUid}
              className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 text-xs font-mono font-bold rounded-full border border-slate-200/90 cursor-pointer transition-colors"
              title="Click to copy Student ID"
            >
              <span>Student ID: {profile.uid}</span>
              {copiedId ? (
                <Icons.Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Icons.Copy className="w-3 h-3 text-slate-500" />
              )}
            </button>

            <div className="flex items-center gap-1.5 mt-2 flex-wrap justify-center">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ Verified Student
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                ★ Gold Rank Member
              </span>
            </div>
          </div>

          {/* Primary Navigation Section */}
          <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-2 px-1">
            MAIN NAVIGATION
          </div>
          <div className="space-y-1.5 mb-4">
            {primaryMenuItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full bg-white hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 py-2 px-3 rounded-xl flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-blue-900 block truncate leading-tight">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal leading-tight block truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <Icons.ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </button>
              );
            })}
          </div>

          {/* Secondary & App Management Section */}
          <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-2 px-1">
            SETTINGS & PLATFORM
          </div>
          <div className="space-y-1.5 mb-4">
            {secondaryMenuItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full bg-white hover:bg-slate-100/80 border border-slate-200/80 hover:border-slate-300 py-2 px-3 rounded-xl flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-slate-900 block truncate leading-tight">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal leading-tight block truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <Icons.ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Area: Logout + 4 Social Logos (Facebook, WhatsApp, Telegram, YouTube) */}
        <div className="pt-3 border-t border-slate-200 mt-2 space-y-3">
          {/* Logout Button */}
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-2xs"
          >
            <Icons.LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span>Logout</span>
          </button>

          {/* Social Channels: Facebook, WhatsApp, Telegram, YouTube */}
          <SocialLinksBar title="Official Community Channels" />

          <p className="text-center text-[10px] text-slate-400 font-medium">
            Unity Earning • Secure Platform v3.2
          </p>
        </div>
      </div>

      {/* Info Details Modal */}
      {activeInfoModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 border border-slate-200 shadow-xl space-y-3 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-extrabold text-sm text-slate-900">
                {activeInfoModal.title}
              </h4>
              <button
                onClick={() => setActiveInfoModal(null)}
                className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeInfoModal.content}
            </p>
            <button
              onClick={() => setActiveInfoModal(null)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              OK, Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
