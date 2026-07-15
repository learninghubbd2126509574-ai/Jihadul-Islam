import React from 'react';
import * as Icons from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  key?: string;
  job: Job;
  onClick: () => void;
  lang: 'bn' | 'en';
}

export default function JobCard({ job, onClick, lang }: JobCardProps) {
  // Resolve icon component dynamically from lucide-react names
  const IconComponent = (Icons as any)[job.iconName] || Icons.Briefcase;

  // Resolve card color based on job ID
  const getCardStyleClass = (id: string) => {
    switch (id) {
      case 'typing-job':
        return 'bg-blue-50 hover:bg-blue-100/80 border-blue-200 hover:border-blue-300';
      case 'email-marketing':
        return 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200 hover:border-indigo-300';
      case 'facebook-marketing':
        return 'bg-sky-50 hover:bg-sky-100/80 border-sky-200 hover:border-sky-300';
      case 'lead-generation':
        return 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 hover:border-emerald-300';
      case 'form-fillup-work':
        return 'bg-pink-50 hover:bg-pink-100/80 border-pink-200 hover:border-pink-300';
      case 'data-entry-work':
        return 'bg-amber-50 hover:bg-amber-100/80 border-amber-200 hover:border-amber-300';
      case 'video-submit-work':
        return 'bg-rose-50 hover:bg-rose-100/80 border-rose-200 hover:border-rose-300';
      case 'product-selling-work':
        return 'bg-violet-50 hover:bg-violet-100/80 border-violet-200 hover:border-violet-300';
      case 'photo-editing':
        return 'bg-teal-50 hover:bg-teal-100/80 border-teal-200 hover:border-teal-300';
      case 'video-editing':
        return 'bg-orange-50 hover:bg-orange-100/80 border-orange-200 hover:border-orange-300';
      case 'computer-training':
        return 'bg-purple-50 hover:bg-purple-100/80 border-purple-200 hover:border-purple-300';
      case 'code-entry':
        return 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200 hover:border-indigo-300';
      case 'daily-work':
        return 'bg-orange-50 hover:bg-orange-100/80 border-orange-200 hover:border-orange-300';
      default:
        return 'bg-blue-50 hover:bg-blue-100/80 border-blue-200 hover:border-blue-300';
    }
  };

  const getTitleColorClass = (id: string) => {
    switch (id) {
      case 'typing-job':
        return 'text-blue-700';
      case 'email-marketing':
        return 'text-indigo-700';
      case 'facebook-marketing':
        return 'text-sky-700';
      case 'lead-generation':
        return 'text-emerald-700';
      case 'form-fillup-work':
        return 'text-pink-700';
      case 'data-entry-work':
        return 'text-amber-700';
      case 'video-submit-work':
        return 'text-rose-700';
      case 'product-selling-work':
        return 'text-violet-700';
      case 'photo-editing':
        return 'text-teal-700';
      case 'video-editing':
        return 'text-orange-700';
      case 'computer-training':
        return 'text-purple-700';
      case 'code-entry':
        return 'text-indigo-800';
      case 'daily-work':
        return 'text-orange-700';
      default:
        return 'text-blue-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-6 flex items-center justify-between cursor-pointer shadow-sm transition-all duration-300 active:scale-[0.98] group ${getCardStyleClass(job.id)}`}
      id={`job-card-${job.id}`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Icon container */}
        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105">
          <IconComponent className={`w-7 h-7 ${job.iconColor}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h3 className={`font-extrabold text-base md:text-lg leading-tight truncate ${getTitleColorClass(job.id)}`}>
              {lang === 'bn' ? job.titleBn : job.titleEn}
            </h3>
          </div>
          
          {/* COMMISSION PAYMENT BADGE */}
          <div>
            <span className="text-[10px] md:text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/60 inline-flex items-center gap-1">
              <Icons.Banknote className="w-4 h-4 text-emerald-600" />
              {lang === 'bn' ? `কমিশন: ${job.rewardBn}` : `Commission: ${job.rewardEn}`}
            </span>
          </div>
        </div>
      </div>

      {/* Arrow right */}
      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300 flex-shrink-0 ml-2">
        <Icons.ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}
