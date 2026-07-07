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

  // Resolve left border color based on job ID for Geometric Balance theme
  const getBorderLeftClass = (id: string) => {
    switch (id) {
      case 'typing-job':
        return 'border-l-4 border-l-blue-500 hover:border-blue-400';
      case 'email-marketing':
        return 'border-l-4 border-l-indigo-500 hover:border-indigo-400';
      case 'facebook-marketing':
        return 'border-l-4 border-l-sky-500 hover:border-sky-400';
      case 'lead-generation':
        return 'border-l-4 border-l-emerald-500 hover:border-emerald-400';
      case 'form-fillup-work':
        return 'border-l-4 border-l-pink-500 hover:border-pink-400';
      case 'data-entry-work':
        return 'border-l-4 border-l-amber-500 hover:border-amber-400';
      case 'video-submit-work':
        return 'border-l-4 border-l-rose-500 hover:border-rose-400';
      case 'product-selling-work':
        return 'border-l-4 border-l-violet-500 hover:border-violet-400';
      case 'photo-editing':
        return 'border-l-4 border-l-teal-500 hover:border-teal-400';
      case 'video-editing':
        return 'border-l-4 border-l-orange-500 hover:border-orange-400';
      case 'computer-training':
        return 'border-l-4 border-l-purple-500 hover:border-purple-400';
      case 'code-entry':
        return 'border-l-4 border-l-indigo-600 hover:border-indigo-500';
      default:
        return 'border border-slate-200 hover:border-blue-400';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between cursor-pointer shadow-sm transition-all duration-300 active:scale-[0.98] group ${getBorderLeftClass(job.id)}`}
      id={`job-card-${job.id}`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Icon container */}
        <div className={`w-14 h-14 rounded-2xl ${job.bgColor} flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105`}>
          <IconComponent className={`w-7 h-7 ${job.iconColor}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h3 className="font-extrabold text-slate-800 text-base md:text-lg leading-tight truncate">
              {lang === 'bn' ? job.titleBn : job.titleEn}
            </h3>
            {job.tag && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider ${
                job.tag === 'POPULAR' ? 'bg-amber-100 text-amber-700' :
                job.tag === 'HIGH PAY' ? 'bg-rose-100 text-rose-700' :
                job.tag === 'NEW' ? 'bg-emerald-100 text-emerald-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {job.tag}
              </span>
            )}
          </div>
          
          {/* COMMISSION PAYMENT BADGE */}
          <div className="mb-2">
            <span className="text-[9px] md:text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60 inline-flex items-center gap-1">
              <Icons.Banknote className="w-3 h-3 text-emerald-600" />
              {lang === 'bn' ? `কমিশন: ${job.rewardBn}` : `Commission: ${job.rewardEn}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 font-semibold">
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {lang === 'bn' ? `সময়: ${job.estimatedTimeBn}` : `Time: ${job.estimatedTimeEn}`}
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {lang === 'bn' ? `ট্যাপ করে কাজ শুরু করুন` : `Tap to start work`}
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
