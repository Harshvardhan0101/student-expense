import React from 'react';
import { getCategoryMeta } from '../../data/categories';
import { getLucideIcon } from '../../utils/iconMap';
import { formatCurrency } from '../../utils/calculations';

export default function SpendingBreakdownList({ categories = [], currency = '₹' }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
        No expenses recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {categories.map((item) => {
        const meta = getCategoryMeta(item.category, 'Expense');
        return (
          <div key={item.category} className="space-y-1.5">
            {/* Row with Icon, Name, Amount, and Percentage */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: meta.color || '#6366f1' }}
                />
                <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                  {getLucideIcon(meta.icon, { size: 14, className: 'text-slate-400' })}
                  <span>{item.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(item.amount, currency)}
                </span>
                <span className="text-slate-500 dark:text-slate-400 w-9 text-right font-medium">
                  {item.percentage}%
                </span>
              </div>
            </div>

            {/* Progress bar representing category proportion */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(item.percentage, 100)}%`,
                  backgroundColor: meta.color || '#6366f1',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
