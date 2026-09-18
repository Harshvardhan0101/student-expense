import React from 'react';
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import DailySpendingChart from '../components/analytics/DailySpendingChart';
import CategoryPieChart from '../components/analytics/CategoryPieChart';
import SpendingBreakdownList from '../components/analytics/SpendingBreakdownList';
import EmptyState from '../components/common/EmptyState';
import {
  calculateDailySpending,
  calculateCategorySpending,
  calculateMonthOverMonth,
  formatCurrency,
  formatMonthName,
} from '../utils/calculations';

export default function Analytics({
  transactions,
  selectedMonth,
  setSelectedMonth,
  currency = '₹',
}) {
  const dailyData = calculateDailySpending(transactions, selectedMonth);
  const categoryData = calculateCategorySpending(transactions, selectedMonth);
  const mom = calculateMonthOverMonth(transactions, selectedMonth);

  const hasExpenses = categoryData.totalExpense > 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Spending Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Gain insights into how and where you spend your funds
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Month:
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
            <Calendar size={14} className="text-brand-600 dark:text-brand-400" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => {
                if (e.target.value) setSelectedMonth(e.target.value);
              }}
              className="bg-transparent border-0 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Spending Trend (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400 rounded-lg">
                <BarChart3 size={16} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Daily Spending Trend
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Day-by-day expense timeline for {formatMonthName(selectedMonth)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Total Spent</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {formatCurrency(categoryData.totalExpense, currency)}
              </span>
            </div>
          </div>

          <DailySpendingChart data={dailyData} currency={currency} />
        </div>

        {/* Category Pie/Donut Chart (1 col) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400 rounded-lg">
                <PieChart size={16} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Category Distribution
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Proportion of total monthly expenses by category
            </p>
          </div>

          <CategoryPieChart categories={categoryData.categories} currency={currency} />
        </div>
      </div>

      {/* Breakdown & Month-Over-Month Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Spending Breakdown List */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 rounded-lg">
                <Layers size={16} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Spending Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Categories ordered from highest to lowest spending
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {categoryData.categories.length} Categories
            </span>
          </div>

          <SpendingBreakdownList categories={categoryData.categories} currency={currency} />
        </div>

        {/* Month-over-Month Comparison */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-lg">
                <TrendingUp size={16} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Monthly Comparison
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compare {formatMonthName(mom.currentMonth)} vs {formatMonthName(mom.prevMonth)}
                </p>
              </div>
            </div>

            {mom.hasPreviousData ? (
              <div className="space-y-4 pt-3">
                {/* 2 Comparison Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
                    <span className="text-[11px] font-medium text-slate-400 block mb-1">
                      {formatMonthName(mom.prevMonth)}
                    </span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                      {formatCurrency(mom.previousExpenses, currency)}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/70 dark:border-brand-800/60">
                    <span className="text-[11px] font-medium text-brand-600 dark:text-brand-400 block mb-1">
                      {formatMonthName(mom.currentMonth)}
                    </span>
                    <span className="text-base font-bold text-brand-900 dark:text-brand-100">
                      {formatCurrency(mom.currentExpenses, currency)}
                    </span>
                  </div>
                </div>

                {/* Difference Summary */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Net Difference</span>
                    <span
                      className={`font-bold ${
                        mom.diff < 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : mom.diff > 0
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {mom.diff > 0 ? '+' : ''}
                      {formatCurrency(mom.diff, currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Percentage Shift</span>
                    <span
                      className={`font-bold inline-flex items-center gap-1 ${
                        mom.percentageChange < 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : mom.percentageChange > 0
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {mom.percentageChange < 0 ? (
                        <TrendingDown size={14} />
                      ) : mom.percentageChange > 0 ? (
                        <TrendingUp size={14} />
                      ) : null}
                      {mom.percentageChange > 0 ? `+${mom.percentageChange}%` : `${mom.percentageChange}%`}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {mom.diff < 0
                    ? `Great job! Your spending in ${formatMonthName(mom.currentMonth)} is currently ${Math.abs(
                        mom.percentageChange
                      )}% lower than ${formatMonthName(mom.prevMonth)}.`
                    : mom.diff > 0
                    ? `Heads up: Spending in ${formatMonthName(mom.currentMonth)} has outpaced ${formatMonthName(
                        mom.prevMonth
                      )} by ${mom.percentageChange}%.`
                    : `Spending is currently even between both months.`}
                </p>
              </div>
            ) : (
              <div className="py-8">
                <EmptyState
                  icon={Info}
                  title="No previous month data"
                  description={`Add transactions for ${formatMonthName(
                    mom.prevMonth
                  )} or load sample data from Settings to see month-over-month comparison trends.`}
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
