import React from 'react';
import * as Icons from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  key?: string;
  job: Job;
  onClick: () => void;
  lang: 'bn' | 'en';
}

// Distinct, eye-pleasing color palette for every single job box
const JOB_PALETTES: Record<string, {
  cardBg: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  arrowBg: string;
  arrowHover: string;
}> = {
  'typing-job': {
    cardBg: 'bg-gradient-to-r from-blue-50/90 via-sky-50/50 to-white',
    borderColor: 'border-blue-200/90',
    iconBg: 'bg-gradient-to-br from-blue-100 to-sky-100 border-blue-200/80',
    iconColor: 'text-blue-600',
    badgeBg: 'bg-blue-100/90',
    badgeText: 'text-blue-800',
    badgeBorder: 'border-blue-300/70',
    arrowBg: 'bg-blue-100/70 text-blue-600',
    arrowHover: 'group-hover:bg-blue-600 group-hover:text-white',
  },
  'email-marketing': {
    cardBg: 'bg-gradient-to-r from-indigo-50/90 via-violet-50/50 to-white',
    borderColor: 'border-indigo-200/90',
    iconBg: 'bg-gradient-to-br from-indigo-100 to-purple-100 border-indigo-200/80',
    iconColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-100/90',
    badgeText: 'text-indigo-800',
    badgeBorder: 'border-indigo-300/70',
    arrowBg: 'bg-indigo-100/70 text-indigo-600',
    arrowHover: 'group-hover:bg-indigo-600 group-hover:text-white',
  },
  'form-fillup-work': {
    cardBg: 'bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-white',
    borderColor: 'border-emerald-200/90',
    iconBg: 'bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-200/80',
    iconColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-100/90',
    badgeText: 'text-emerald-800',
    badgeBorder: 'border-emerald-300/70',
    arrowBg: 'bg-emerald-100/70 text-emerald-600',
    arrowHover: 'group-hover:bg-emerald-600 group-hover:text-white',
  },
  'data-entry-work': {
    cardBg: 'bg-gradient-to-r from-purple-50/90 via-fuchsia-50/50 to-white',
    borderColor: 'border-purple-200/90',
    iconBg: 'bg-gradient-to-br from-purple-100 to-fuchsia-100 border-purple-200/80',
    iconColor: 'text-purple-600',
    badgeBg: 'bg-purple-100/90',
    badgeText: 'text-purple-800',
    badgeBorder: 'border-purple-300/70',
    arrowBg: 'bg-purple-100/70 text-purple-600',
    arrowHover: 'group-hover:bg-purple-600 group-hover:text-white',
  },
  'code-entry': {
    cardBg: 'bg-gradient-to-r from-cyan-50/90 via-sky-50/50 to-white',
    borderColor: 'border-cyan-200/90',
    iconBg: 'bg-gradient-to-br from-cyan-100 to-sky-100 border-cyan-200/80',
    iconColor: 'text-cyan-700',
    badgeBg: 'bg-cyan-100/90',
    badgeText: 'text-cyan-900',
    badgeBorder: 'border-cyan-300/70',
    arrowBg: 'bg-cyan-100/70 text-cyan-700',
    arrowHover: 'group-hover:bg-cyan-600 group-hover:text-white',
  },
  'facebook-marketing': {
    cardBg: 'bg-gradient-to-r from-sky-50/90 via-blue-50/50 to-white',
    borderColor: 'border-sky-200/90',
    iconBg: 'bg-gradient-to-br from-sky-100 to-blue-100 border-sky-200/80',
    iconColor: 'text-sky-600',
    badgeBg: 'bg-sky-100/90',
    badgeText: 'text-sky-800',
    badgeBorder: 'border-sky-300/70',
    arrowBg: 'bg-sky-100/70 text-sky-600',
    arrowHover: 'group-hover:bg-sky-600 group-hover:text-white',
  },
  'lead-generation': {
    cardBg: 'bg-gradient-to-r from-rose-50/90 via-pink-50/50 to-white',
    borderColor: 'border-rose-200/90',
    iconBg: 'bg-gradient-to-br from-rose-100 to-pink-100 border-rose-200/80',
    iconColor: 'text-rose-600',
    badgeBg: 'bg-rose-100/90',
    badgeText: 'text-rose-800',
    badgeBorder: 'border-rose-300/70',
    arrowBg: 'bg-rose-100/70 text-rose-600',
    arrowHover: 'group-hover:bg-rose-600 group-hover:text-white',
  },
  'video-submit-work': {
    cardBg: 'bg-gradient-to-r from-pink-50/90 via-rose-50/50 to-white',
    borderColor: 'border-pink-200/90',
    iconBg: 'bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200/80',
    iconColor: 'text-pink-600',
    badgeBg: 'bg-pink-100/90',
    badgeText: 'text-pink-800',
    badgeBorder: 'border-pink-300/70',
    arrowBg: 'bg-pink-100/70 text-pink-600',
    arrowHover: 'group-hover:bg-pink-600 group-hover:text-white',
  },
  'product-selling-work': {
    cardBg: 'bg-gradient-to-r from-amber-50/90 via-yellow-50/50 to-white',
    borderColor: 'border-amber-200/90',
    iconBg: 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-200/80',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-100/90',
    badgeText: 'text-amber-900',
    badgeBorder: 'border-amber-300/70',
    arrowBg: 'bg-amber-100/70 text-amber-700',
    arrowHover: 'group-hover:bg-amber-600 group-hover:text-white',
  },
  'photo-editing': {
    cardBg: 'bg-gradient-to-r from-teal-50/90 via-emerald-50/50 to-white',
    borderColor: 'border-teal-200/90',
    iconBg: 'bg-gradient-to-br from-teal-100 to-emerald-100 border-teal-200/80',
    iconColor: 'text-teal-600',
    badgeBg: 'bg-teal-100/90',
    badgeText: 'text-teal-800',
    badgeBorder: 'border-teal-300/70',
    arrowBg: 'bg-teal-100/70 text-teal-600',
    arrowHover: 'group-hover:bg-teal-600 group-hover:text-white',
  },
  'video-editing': {
    cardBg: 'bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-white',
    borderColor: 'border-orange-200/90',
    iconBg: 'bg-gradient-to-br from-orange-100 to-amber-100 border-orange-200/80',
    iconColor: 'text-orange-600',
    badgeBg: 'bg-orange-100/90',
    badgeText: 'text-orange-800',
    badgeBorder: 'border-orange-300/70',
    arrowBg: 'bg-orange-100/70 text-orange-600',
    arrowHover: 'group-hover:bg-orange-600 group-hover:text-white',
  },
  'computer-training': {
    cardBg: 'bg-gradient-to-r from-violet-50/90 via-purple-50/50 to-white',
    borderColor: 'border-violet-200/90',
    iconBg: 'bg-gradient-to-br from-violet-100 to-purple-100 border-violet-200/80',
    iconColor: 'text-violet-600',
    badgeBg: 'bg-violet-100/90',
    badgeText: 'text-violet-800',
    badgeBorder: 'border-violet-300/70',
    arrowBg: 'bg-violet-100/70 text-violet-600',
    arrowHover: 'group-hover:bg-violet-600 group-hover:text-white',
  },
  'social-media-management': {
    cardBg: 'bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white',
    borderColor: 'border-blue-300/90',
    iconBg: 'bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-200/80',
    iconColor: 'text-blue-700',
    badgeBg: 'bg-blue-100/90',
    badgeText: 'text-blue-900',
    badgeBorder: 'border-blue-300/70',
    arrowBg: 'bg-blue-100/70 text-blue-700',
    arrowHover: 'group-hover:bg-blue-600 group-hover:text-white',
  },
  'content-writing': {
    cardBg: 'bg-gradient-to-r from-emerald-50/90 via-green-50/50 to-white',
    borderColor: 'border-emerald-300/90',
    iconBg: 'bg-gradient-to-br from-emerald-100 to-green-100 border-emerald-200/80',
    iconColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100/90',
    badgeText: 'text-emerald-900',
    badgeBorder: 'border-emerald-300/70',
    arrowBg: 'bg-emerald-100/70 text-emerald-700',
    arrowHover: 'group-hover:bg-emerald-600 group-hover:text-white',
  },
  'drop-shipping': {
    cardBg: 'bg-gradient-to-r from-indigo-50/90 via-slate-100/50 to-white',
    borderColor: 'border-indigo-300/90',
    iconBg: 'bg-gradient-to-br from-indigo-100 to-slate-200 border-indigo-200/80',
    iconColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-100/90',
    badgeText: 'text-indigo-900',
    badgeBorder: 'border-indigo-300/70',
    arrowBg: 'bg-indigo-100/70 text-indigo-700',
    arrowHover: 'group-hover:bg-indigo-600 group-hover:text-white',
  },
  'gaming-tournament': {
    cardBg: 'bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-white',
    borderColor: 'border-amber-300/90',
    iconBg: 'bg-gradient-to-br from-amber-100 to-orange-100 border-amber-200/80',
    iconColor: 'text-amber-700',
    badgeBg: 'bg-amber-100/90',
    badgeText: 'text-amber-900',
    badgeBorder: 'border-amber-300/70',
    arrowBg: 'bg-amber-100/70 text-amber-700',
    arrowHover: 'group-hover:bg-amber-600 group-hover:text-white',
  },
  'website-visit': {
    cardBg: 'bg-gradient-to-r from-teal-50/90 via-cyan-50/50 to-white',
    borderColor: 'border-teal-300/90',
    iconBg: 'bg-gradient-to-br from-teal-100 to-cyan-100 border-teal-200/80',
    iconColor: 'text-teal-700',
    badgeBg: 'bg-teal-100/90',
    badgeText: 'text-teal-900',
    badgeBorder: 'border-teal-300/70',
    arrowBg: 'bg-teal-100/70 text-teal-700',
    arrowHover: 'group-hover:bg-teal-600 group-hover:text-white',
  }
};

const DEFAULT_PALETTE = {
  cardBg: 'bg-white',
  borderColor: 'border-slate-200',
  iconBg: 'bg-slate-100 border-slate-200',
  iconColor: 'text-slate-600',
  badgeBg: 'bg-slate-100',
  badgeText: 'text-slate-800',
  badgeBorder: 'border-slate-200',
  arrowBg: 'bg-slate-100 text-slate-500',
  arrowHover: 'group-hover:bg-blue-600 group-hover:text-white',
};

export default function JobCard({ job, onClick, lang }: JobCardProps) {
  // Resolve icon component dynamically from lucide-react names
  const IconComponent = (Icons as any)[job.iconName] || Icons.Briefcase;
  const palette = JOB_PALETTES[job.id] || DEFAULT_PALETTE;

  return (
    <div
      onClick={onClick}
      className={`clay-card p-4 md:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] group rounded-2xl border ${palette.cardBg} ${palette.borderColor} shadow-[0_3px_12px_rgba(0,0,0,0.03)]`}
      id={`job-card-${job.id}`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Clay Icon container */}
        <div className={`w-12 h-12 md:w-13 md:h-13 rounded-xl ${palette.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 border shadow-xs`}>
          <IconComponent className={`w-6 h-6 ${palette.iconColor}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-bold text-base md:text-lg leading-tight text-slate-900 truncate group-hover:text-blue-600 transition-colors">
              {lang === 'bn' ? job.titleBn : job.titleEn}
            </h3>
          </div>
          
          {/* COMMISSION PAYMENT BADGE */}
          <div>
            <span className={`text-[11px] md:text-xs font-bold ${palette.badgeText} ${palette.badgeBg} ${palette.badgeBorder} px-2.5 py-0.5 rounded-lg border inline-flex items-center gap-1 shadow-2xs`}>
              <Icons.Banknote className="w-3.5 h-3.5" />
              {lang === 'bn' ? `কমিশন: ${job.rewardBn}` : `Commission: ${job.rewardEn}`}
            </span>
          </div>
        </div>
      </div>

      {/* Clay Arrow right */}
      <div className={`w-8 h-8 rounded-lg ${palette.arrowBg} ${palette.arrowHover} flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-2.5 shadow-xs`}>
        <Icons.ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}
