import React from 'react';
import { getLucideIcon } from '../../utils/iconMap';
import { Sparkles } from 'lucide-react';

export default function InsightCard({ insights = [] }) {
  if (!insights || insights.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400 rounded-lg">
            <Sparkles size={16} />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Spending Insights
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 py-3">
          Add a few transactions to see your spending insights.
        </p>
      </div>
    );
  }

  const typeConfig = {
    info: {
      bg: 'bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/50',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400',
    },
    success: {
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/50',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400',
    },
    warning: {
      bg: 'bg-amber-50/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-100 dark:border-amber-900/50',
      iconBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400',
    },
    danger: {
      bg: 'bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-100 dark:border-rose-900/50',
      iconBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400',
    },
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400 rounded-lg">
            <Sparkles size={16} />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Spending Insights
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          Calculated from data
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((insight) => {
          const config = typeConfig[insight.type] || typeConfig.info;
          return (
            <div
              key={insight.id}
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${config.bg}`}
            >
              <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${config.iconBg}`}>
                {getLucideIcon(insight.icon, { size: 16 })}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold leading-tight">
                  {insight.title}
                </h4>
                <p className="text-xs mt-1 leading-relaxed opacity-90">
                  {insight.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
