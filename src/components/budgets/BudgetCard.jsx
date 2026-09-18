import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { getCategoryMeta } from '../../data/categories';
import { getLucideIcon } from '../../utils/iconMap';
import ProgressBar from '../common/ProgressBar';
import { formatCurrency } from '../../utils/calculations';

export default function BudgetCard({
  budget,
  onEdit,
  onDelete,
  currency = '₹',
}) {
  const meta = getCategoryMeta(budget.category, 'Expense');
  const spent = budget.spent || 0;
  const amount = Number(budget.amount) || 0;
  const remaining = budget.remaining !== undefined ? budget.remaining : amount - spent;
  const percentage = budget.percentage !== undefined ? budget.percentage : (amount > 0 ? Math.round((spent / amount) * 100) : 0);

  let status = budget.status || 'normal';
  if (percentage > 90) status = 'critical';
  else if (percentage >= 70) status = 'warning';
  else status = 'normal';

  const statusBadge = {
    normal: {
      text: 'On Track',
      style: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    },
    warning: {
      text: 'Near Limit',
      style: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    },
    critical: {
      text: remaining < 0 ? 'Over Budget' : 'Critical',
      style: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    },
  }[status];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs hover:shadow-xs transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg ${meta.badgeColor}`}>
            {getLucideIcon(meta.icon, { size: 16 })}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {budget.category}
            </h4>
            <span
              className={`inline-flex items-center px-2 py-0.5 mt-0.5 rounded-full text-[10px] font-medium border ${statusBadge.style}`}
            >
              {statusBadge.text}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(budget)}
            className="p-1.5 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Edit Budget"
          >
            <Edit2 size={14} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(budget)}
            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Delete Budget"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Figures */}
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Spent: </span>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(spent, currency)}
          </span>
        </div>
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Limit: </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {formatCurrency(amount, currency)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2.5">
        <ProgressBar percentage={percentage} status={status} height="h-2" />
      </div>

      {/* Footer Remaining & Percentage */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          {remaining >= 0 ? (
            <>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {formatCurrency(remaining, currency)}
              </span>{' '}
              remaining
            </>
          ) : (
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              {formatCurrency(Math.abs(remaining), currency)} over limit
            </span>
          )}
        </span>
        <span className="font-medium">{percentage}% used</span>
      </div>
    </div>
  );
}
