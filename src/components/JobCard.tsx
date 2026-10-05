import React from 'react';
import * as Icons from 'lucide-react';
import { Job } from '../types';
import { JOB_3D_ICONS } from './Job3DIcons';

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

const toEnNumber = (str: string): string => {
  const bnToEnMap: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  return str.replace(/[০-৯]/g, (d) => bnToEnMap[d] || d);
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
  const Job3DIcon = JOB_3D_ICONS[job.id];
  
  // Resolve icon component dynamically from lucide-react names
  const IconComponent = (Icons as any)[theme.iconName] || (Icons as any)[job.iconName] || Icons.Briefcase;

  return (
    <div
      onClick={onClick}
      className="bg-white hover:bg-slate-50/90 py-3 px-3.5 sm:py-3.5 sm:px-4 rounded-[1.25rem] border border-slate-200/90 shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.1)] flex items-center justify-between cursor-pointer transition-all duration-200 group active:scale-[0.99] my-2.5 sm:my-3"
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
        {/* Circular 3D Neumorphic Icon Badge */}
        <div className="w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center shrink-0 relative transition-transform duration-300 group-hover:scale-105">
          {Job3DIcon ? (
            <Job3DIcon className="w-full h-full object-contain drop-shadow-md" />
          ) : (
            <div 
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${theme.gradient} text-white flex items-center justify-center shadow-md border-2 border-white/50 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none" />
              <IconComponent className="w-5 h-5 text-white drop-shadow-xs relative z-10 stroke-[2.2px]" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            {/* Job Title */}
            <h3 className="font-extrabold text-sm sm:text-base leading-tight text-slate-900 tracking-tight truncate group-hover:text-blue-600 transition-colors">
              {lang === 'bn' ? job.titleBn : job.titleEn}
            </h3>
          </div>
          
          {/* Pay Pill matching screenshot */}
          <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden mt-1">
            <span className="text-xs sm:text-[13px] font-bold text-slate-800 bg-slate-50/80 border border-slate-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 leading-tight shadow-2xs">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-2xs">
                $
              </span>
              <span className="text-slate-700 font-bold">
                Pay : <span className="font-extrabold text-slate-900">{job.rewardBn || job.rewardEn}</span>
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Circular Dark Teal Chevron */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0d4a52] group-hover:bg-[#09353b] text-white flex items-center justify-center shadow-sm transition-all duration-200 shrink-0 ml-2.5 group-hover:scale-105 active:scale-95">
        <Icons.ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5 stroke-[2.5]" />
      </div>
    </div>
  );
}
