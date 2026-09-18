import React from 'react';
import { Edit2, Trash2, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';
import { formatCurrency } from '../../utils/calculations';

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
  currency = '₹',
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Payment</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4 text-right">Amount</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
          {transactions.map((tx) => {
            const isExpense = tx.type === 'Expense';
            return (
              <tr
                key={tx.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
              >
                {/* Date */}
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 dark:text-slate-400 font-medium">
                  {tx.date}
                </td>

                {/* Description & Notes */}
                <td className="py-3.5 px-4">
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    {tx.description}
                  </div>
                  {tx.notes && (
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                      {tx.notes}
                    </div>
                  )}
                </td>

                {/* Category */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <CategoryBadge category={tx.category} type={tx.type} size="sm" />
                </td>

                {/* Payment Method */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {tx.paymentMethod || 'UPI'}
                  </span>
                </td>

                {/* Type */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      isExpense
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {isExpense ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                    {tx.type}
                  </span>
                </td>

                {/* Amount */}
                <td
                  className={`py-3.5 px-4 whitespace-nowrap text-right font-bold ${
                    isExpense
                      ? 'text-slate-900 dark:text-slate-100'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {isExpense ? '-' : '+'}
                  {formatCurrency(tx.amount, currency)}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => onEdit(tx)}
                      className="p-1.5 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 rounded-lg transition-colors"
                      title="Edit transaction"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(tx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                      title="Delete transaction"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
