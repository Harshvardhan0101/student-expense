import React from 'react';
import { ChevronRight, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { getCategoryMeta } from '../../data/categories';
import { getLucideIcon } from '../../utils/iconMap';
import { formatCurrency } from '../../utils/calculations';
import EmptyState from '../common/EmptyState';

export default function RecentTransactions({
  transactions = [],
  onViewAll,
  onOpenAddModal,
  currency = '₹',
}) {
  const recentList = transactions.slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Recent Transactions
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Latest activity across your accounts
          </p>
        </div>

        {transactions.length > 0 && (
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            <span>View all transactions</span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {recentList.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          description="Start tracking your spending by adding your first transaction."
          actionText="Add Transaction"
          onAction={onOpenAddModal}
          compact
        />
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {recentList.map((tx) => {
            const meta = getCategoryMeta(tx.category, tx.type);
            const isExpense = tx.type === 'Expense';

            return (
              <div
                key={tx.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 -mx-2 px-2 rounded-lg transition-colors"
              >
                {/* Left: Category Icon + Details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${meta.badgeColor}`}
                  >
                    {getLucideIcon(meta.icon, { size: 16 })}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {tx.description}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span>{tx.category}</span>
                      <span>•</span>
                      <span>{tx.paymentMethod || 'UPI'}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Indicator */}
                <div className="text-right shrink-0">
                  <span
                    className={`text-xs sm:text-sm font-bold block ${
                      isExpense
                        ? 'text-slate-900 dark:text-slate-100'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {isExpense ? '-' : '+'}
                    {formatCurrency(tx.amount, currency)}
                  </span>
                  <span
                    className={`inline-flex items-center text-[10px] font-medium ${
                      isExpense ? 'text-rose-500' : 'text-emerald-500'
                    }`}
                  >
                    {isExpense ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                    {tx.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
