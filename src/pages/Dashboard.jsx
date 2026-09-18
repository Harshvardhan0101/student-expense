import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  Target,
  Edit3,
  Calendar,
  Plus,
} from 'lucide-react';
import SummaryCard from '../components/common/SummaryCard';
import ProgressBar from '../components/common/ProgressBar';
import InsightCard from '../components/dashboard/InsightCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import DailySpendingChart from '../components/analytics/DailySpendingChart';
import CategoryPieChart from '../components/analytics/CategoryPieChart';
import {
  calculateSummary,
  calculateDailySpending,
  calculateCategorySpending,
  formatCurrency,
  formatMonthName,
} from '../utils/calculations';
import { generateInsights } from '../utils/insights';

export default function Dashboard({
  transactions,
  monthlyBudget,
  categoryBudgets,
  selectedMonth,
  setSelectedMonth,
  onOpenAddModal,
  onNavigate,
  onUpdateMonthlyBudget,
  currency = '₹',
}) {
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(String(monthlyBudget));

  const summary = calculateSummary(transactions, selectedMonth);
  const dailyData = calculateDailySpending(transactions, selectedMonth);
  const categoryData = calculateCategorySpending(transactions, selectedMonth);
  const insights = generateInsights(
    transactions,
    monthlyBudget,
    categoryBudgets,
    selectedMonth,
    currency
  );

  // Overall Monthly Budget Calculations
  const budgetSpent = summary.monthlyExpense;
  const budgetRemaining = monthlyBudget - budgetSpent;
  const budgetPercentage =
    monthlyBudget > 0 ? Math.round((budgetSpent / monthlyBudget) * 100) : 0;

  let budgetStatus = 'normal';
  if (budgetPercentage > 90) budgetStatus = 'critical';
  else if (budgetPercentage >= 70) budgetStatus = 'warning';

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = Number(budgetInput);
    if (!isNaN(val) && val >= 0) {
      onUpdateMonthlyBudget(val);
      setIsEditingBudget(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Month Subheader & Quick Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Overview for {formatMonthName(selectedMonth)}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {summary.transactionCount} transactions recorded this month
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('budgets')}
            className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs transition-colors"
          >
            Manage Budgets
          </button>
          <button
            type="button"
            onClick={() => onNavigate('analytics')}
            className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs transition-colors"
          >
            Detailed Analytics
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Balance */}
        <SummaryCard
          title="Total Balance"
          amount={formatCurrency(summary.totalBalance, currency)}
          subtitle="Net savings (all time)"
          icon={Wallet}
          iconBg="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
          badge={summary.totalBalance >= 0 ? 'Healthy' : 'Deficit'}
          badgeType={summary.totalBalance >= 0 ? 'positive' : 'negative'}
        />

        {/* Total Income */}
        <SummaryCard
          title="Total Income"
          amount={formatCurrency(summary.monthlyIncome, currency)}
          subtitle="Funds in this month"
          icon={ArrowUpRight}
          iconBg="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
          badge="Inflow"
          badgeType="positive"
        />

        {/* Total Expenses */}
        <SummaryCard
          title="Total Expenses"
          amount={formatCurrency(summary.monthlyExpense, currency)}
          subtitle="Spent this month"
          icon={ArrowDownRight}
          iconBg="bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
          badge="Outflow"
          badgeType="negative"
        />

        {/* Savings & Rate */}
        <SummaryCard
          title="Monthly Savings"
          amount={formatCurrency(summary.monthlySavings, currency)}
          subtitle={`${summary.savingsPercentage}% of income saved`}
          icon={PiggyBank}
          iconBg="bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400"
          badge={`${summary.savingsPercentage}% Saved`}
          badgeType={summary.savingsPercentage >= 20 ? 'positive' : 'neutral'}
        />
      </div>

      {/* Monthly Budget Tracker Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Target size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Monthly Target Budget
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tracking spending against student allowance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditingBudget ? (
              <form onSubmit={handleSaveBudget} className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="w-28 px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  placeholder="Budget"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingBudget(false)}
                  className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setBudgetInput(String(monthlyBudget));
                  setIsEditingBudget(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <Edit3 size={13} />
                <span>Adjust Budget</span>
              </button>
            )}
          </div>
        </div>

        {/* Figures */}
        <div className="grid grid-cols-3 gap-2 py-2 text-center sm:text-left">
          <div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 block">
              Budget Limit
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(monthlyBudget, currency)}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 block">
              Spent So Far
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(budgetSpent, currency)}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 block">
              Remaining
            </span>
            <span
              className={`text-sm sm:text-base font-bold ${
                budgetRemaining >= 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {formatCurrency(budgetRemaining, currency)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2">
          <ProgressBar percentage={budgetPercentage} status={budgetStatus} height="h-2.5" />
          <div className="flex justify-between items-center text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
            <span>{budgetPercentage}% of limit utilized</span>
            <span>
              {budgetRemaining >= 0
                ? `${formatCurrency(budgetRemaining, currency)} safe to spend`
                : `${formatCurrency(Math.abs(budgetRemaining), currency)} over limit`}
            </span>
          </div>
        </div>
      </div>

      {/* Spending Insights Section */}
      <InsightCard insights={insights} />

      {/* 2 Columns: Daily Spending Chart preview & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Spending Trend */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Daily Spending Pattern
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Expense outflow by date in {formatMonthName(selectedMonth)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('analytics')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700"
            >
              View Full Analytics
            </button>
          </div>

          <DailySpendingChart data={dailyData} currency={currency} />
        </div>

        {/* Right 1 Col: Category Donut Chart preview */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Top Categories
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly distribution
              </p>
            </div>
          </div>

          <CategoryPieChart categories={categoryData.categories} currency={currency} />
        </div>
      </div>

      {/* Recent Transactions List */}
      <RecentTransactions
        transactions={transactions}
        onViewAll={() => onNavigate('transactions')}
        onOpenAddModal={onOpenAddModal}
        currency={currency}
      />
    </div>
  );
}
