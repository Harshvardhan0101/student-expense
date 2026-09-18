import React from 'react';
import { Edit2, Trash2, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';
import { formatCurrency } from '../../utils/calculations';

export default function TransactionCard({
  tx,
  onEdit,
  onDelete,
  currency = '₹',
}) {
  const isExpense = tx.type === 'Expense';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs space-y-2.5">
      {/* Top Row: Category & Amount */}
      <div className="flex items-center justify-between gap-2">
        <CategoryBadge category={tx.category} type={tx.type} size="sm" />
        <span
          className={`text-base font-bold ${
            isExpense ? 'text-slate-900 dark:text-white' : 'text-emerald-600 dark:text-emerald-400'
          }`}
        >
          {isExpense ? '-' : '+'}
          {formatCurrency(tx.amount, currency)}
        </span>
      </div>

      {/* Middle Row: Description & Notes */}
      <div>
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {tx.description}
        </h4>
        {tx.notes && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-2">
            {tx.notes}
          </p>
        )}
      </div>

      {/* Bottom Row: Metadata & Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <span>{tx.date}</span>
          <span>•</span>
          <span className="font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
            {tx.paymentMethod || 'UPI'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(tx)}
            className="p-1.5 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(tx)}
            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
