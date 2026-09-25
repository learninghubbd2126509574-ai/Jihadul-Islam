import React from 'react';
import * as Icons from 'lucide-react';
import { Job } from '../types';

export interface JobTheme {
  iconName: string;
  gradient: string;
  shadow: string;
  border: string;
  textColor: string;
}

export const JOB_THEMES: Record<string, JobTheme> = {
  'typing-job': {
    iconName: 'Keyboard',
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
    shadow: 'shadow-blue-500/30',
    border: 'border-blue-400/50',
    textColor: 'text-white',
  },
  'email-marketing': {
    iconName: 'Mail',
    gradient: 'from-violet-500 via-purple-600 to-indigo-700',
    shadow: 'shadow-purple-500/30',
    border: 'border-purple-300/50',
    textColor: 'text-white',
  },
  'form-fillup-work': {
    iconName: 'FileSpreadsheet',
    gradient: 'from-emerald-500 via-teal-600 to-teal-700',
    shadow: 'shadow-emerald-500/30',
    border: 'border-emerald-300/50',
    textColor: 'text-white',
  },
  'data-entry-work': {
    iconName: 'Database',
    gradient: 'from-cyan-500 via-sky-600 to-blue-600',
    shadow: 'shadow-cyan-500/30',
    border: 'border-cyan-300/50',
    textColor: 'text-white',
  },
  'code-entry': {
    iconName: 'Code2',
    gradient: 'from-amber-500 via-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/30',
    border: 'border-amber-300/50',
    textColor: 'text-white',
  },
  'facebook-marketing': {
    iconName: 'Megaphone',
    gradient: 'from-blue-600 via-indigo-600 to-blue-800',
    shadow: 'shadow-blue-600/30',
    border: 'border-blue-400/50',
    textColor: 'text-white',
  },
  'lead-generation': {
    iconName: 'Target',
    gradient: 'from-rose-500 via-pink-600 to-red-600',
    shadow: 'shadow-rose-500/30',
    border: 'border-rose-300/50',
    textColor: 'text-white',
  },
  'video-submit-work': {
    iconName: 'PlayCircle',
    gradient: 'from-fuchsia-500 via-pink-600 to-rose-600',
    shadow: 'shadow-fuchsia-500/30',
    border: 'border-fuchsia-300/50',
    textColor: 'text-white',
  },
  'product-selling-work': {
    iconName: 'ShoppingBag',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    shadow: 'shadow-amber-500/30',
    border: 'border-amber-200/60',
    textColor: 'text-white',
  },
  'photo-editing': {
    iconName: 'Palette',
    gradient: 'from-teal-400 via-emerald-600 to-teal-700',
    shadow: 'shadow-teal-500/30',
    border: 'border-teal-300/50',
    textColor: 'text-white',
  },
  'video-editing': {
    iconName: 'Clapperboard',
    gradient: 'from-red-500 via-rose-600 to-red-700',
    shadow: 'shadow-red-500/30',
    border: 'border-red-300/50',
    textColor: 'text-white',
  },
  'computer-training': {
    iconName: 'Monitor',
    gradient: 'from-slate-700 via-indigo-900 to-slate-900',
    shadow: 'shadow-slate-800/30',
    border: 'border-slate-500/50',
    textColor: 'text-white',
  },
  'social-media-management': {
    iconName: 'Share2',
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
    shadow: 'shadow-sky-500/30',
    border: 'border-sky-300/50',
    textColor: 'text-white',
  },
  'content-writing': {
    iconName: 'PenTool',
    gradient: 'from-emerald-600 via-green-600 to-teal-800',
    shadow: 'shadow-emerald-600/30',
    border: 'border-emerald-400/50',
    textColor: 'text-white',
  },
  'drop-shipping': {
    iconName: 'Truck',
    gradient: 'from-purple-600 via-indigo-600 to-indigo-900',
    shadow: 'shadow-purple-600/30',
    border: 'border-purple-400/50',
    textColor: 'text-white',
  },
  'gaming-tournament': {
    iconName: 'Gamepad2',
    gradient: 'from-violet-600 via-purple-600 to-pink-600',
    shadow: 'shadow-violet-600/30',
    border: 'border-violet-400/50',
    textColor: 'text-white',
  },
  'website-visit': {
    iconName: 'Globe',
    gradient: 'from-teal-500 via-cyan-600 to-blue-700',
    shadow: 'shadow-teal-500/30',
    border: 'border-teal-300/50',
    textColor: 'text-white',
  },
};

export function getJobTheme(jobId: string, defaultIcon?: string): JobTheme {
  if (JOB_THEMES[jobId]) {
    return JOB_THEMES[jobId];
  }
  return {
    iconName: defaultIcon || 'Briefcase',
    gradient: 'from-blue-600 via-indigo-600 to-blue-700',
    shadow: 'shadow-blue-500/30',
    border: 'border-blue-400/50',
    textColor: 'text-white',
  };
}

interface JobCardProps {
  key?: React.Key;
  job: Job;
  onClick: () => void;
  lang: 'bn' | 'en';
}

export default function JobCard({ job, onClick, lang }: JobCardProps) {
  const theme = getJobTheme(job.id, job.iconName);
  
  // Resolve icon component dynamically from lucide-react names
  const IconComponent = (Icons as any)[theme.iconName] || (Icons as any)[job.iconName] || Icons.Briefcase;

  return (
    <div
      onClick={onClick}
      className="bg-white hover:bg-slate-50/80 p-3.5 sm:p-4 rounded-[1.25rem] border border-slate-200/80 hover:border-blue-400/80 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-md flex items-center justify-between cursor-pointer transition-all duration-200 group active:scale-[0.99]"
      id={`job-card-${job.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-center gap-3 sm:gap-3.5 flex-1 min-w-0">
        {/* Professional, Colorful App-Style Icon Box */}
        <div 
          className={`w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl bg-gradient-to-br ${theme.gradient} text-white flex items-center justify-center shrink-0 shadow-md ${theme.shadow} border ${theme.border} transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg relative overflow-hidden`}
        >
          {/* Subtle glossy sheen reflection for 3D app depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none" />
          
          {/* Inner ambient light glow on top right */}
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-white/35 rounded-full blur-xs pointer-events-none" />
          
          {/* Crisp, High-Contrast White Icon */}
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm relative z-10 stroke-[2.2px] transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-sm sm:text-base leading-snug text-slate-900 tracking-tight truncate group-hover:text-blue-600 transition-colors">
              {lang === 'bn' ? job.titleBn : job.titleEn}
            </h3>
          </div>
          
          {/* COMMISSION PAYMENT BADGE */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 font-mono tabular-nums leading-none">
              <Icons.Banknote className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? `কমিশন: ${job.rewardBn}` : `Commission: ${job.rewardEn}`}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right chevron */}
      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 ml-2.5">
        <Icons.ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}
