import React from 'react';
import { Inbox, Plus } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No data found',
  description = 'There is currently no information to display here.',
  actionText,
  onAction,
  actionIcon: ActionIcon = Plus,
  compact = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 ${
        compact ? 'p-6' : 'p-10'
      }`}
    >
      <div className="p-3 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm text-slate-400 dark:text-slate-500 mb-3">
        <Icon size={compact ? 22 : 28} strokeWidth={1.5} />
      </div>

      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h3>

      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4 leading-relaxed">
        {description}
      </p>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] shadow-sm transition-all duration-150"
        >
          {ActionIcon && <ActionIcon size={14} />}
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
