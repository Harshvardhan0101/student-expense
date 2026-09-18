import React from 'react';

export default function SummaryCard({
  title,
  amount,
  subtitle,
  icon: Icon,
  badge,
  badgeType = 'neutral', // 'positive', 'negative', 'neutral', 'brand'
  iconBg = 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400',
}) {
  const badgeStyles = {
    positive: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    negative: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300 border-brand-200 dark:border-brand-800',
  }[badgeType];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow transition-all duration-200">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-lg shrink-0 ${iconBg}`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {amount}
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 flex-wrap text-xs">
          {subtitle && (
            <span className="text-slate-500 dark:text-slate-400">
              {subtitle}
            </span>
          )}
          {badge && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium border text-[11px] ${badgeStyles}`}>
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
