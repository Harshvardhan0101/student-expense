import React, { useState } from 'react';
import { Plus, Target, Edit3, ShieldAlert, CheckCircle2 } from 'lucide-react';
import BudgetCard from '../components/budgets/BudgetCard';
import BudgetModal from '../components/budgets/BudgetModal';
import ProgressBar from '../components/common/ProgressBar';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import EmptyState from '../components/common/EmptyState';
import {
  calculateBudgetUsage,
  calculateSummary,
  formatCurrency,
  formatMonthName,
} from '../utils/calculations';

export default function Budgets({
  budgets,
  monthlyBudget,
  transactions,
  selectedMonth,
  onAddBudget,
  onUpdateBudget,
  onDeleteBudget,
  onUpdateMonthlyBudget,
  onShowToast,
  currency = '₹',
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBudget, setEditBudget] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const [isEditingOverall, setIsEditingOverall] = useState(false);
  const [overallInput, setOverallInput] = useState(String(monthlyBudget));

  // Compute overall monthly stats
  const summary = calculateSummary(transactions, selectedMonth);
  const overallSpent = summary.monthlyExpense;
  const overallRemaining = monthlyBudget - overallSpent;
  const overallPercentage =
    monthlyBudget > 0 ? Math.round((overallSpent / monthlyBudget) * 100) : 0;

  let overallStatus = 'normal';
  if (overallPercentage > 90) overallStatus = 'critical';
  else if (overallPercentage >= 70) overallStatus = 'warning';

  // Compute per-category budget usage
  const categoryBudgetsWithUsage = calculateBudgetUsage(budgets, transactions, selectedMonth);

  const handleOpenAdd = () => {
    setEditBudget(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditBudget(b);
    setIsModalOpen(true);
  };

  const handleSaveBudget = (budgetData) => {
    if (editBudget) {
      onUpdateBudget(editBudget.id, budgetData);
      onShowToast(`Updated budget for ${budgetData.category}`, 'success');
    } else {
      onAddBudget(budgetData);
      onShowToast(`Created budget for ${budgetData.category}`, 'success');
    }
  };

  const confirmDelete = () => {
    if (deleteCandidate) {
      onDeleteBudget(deleteCandidate.id);
      onShowToast(`Deleted budget for ${deleteCandidate.category}`, 'info');
      setDeleteCandidate(null);
    }
  };

  const handleSaveOverall = (e) => {
    e.preventDefault();
    const val = Number(overallInput);
    if (!isNaN(val) && val >= 0) {
      onUpdateMonthlyBudget(val);
      setIsEditingOverall(false);
      onShowToast('Overall monthly budget updated', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Monthly Budgets
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Set and monitor category expense limits for {formatMonthName(selectedMonth)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] shadow-xs hover:shadow transition-all"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Category Budget</span>
        </button>
      </div>

      {/* Overall Monthly Budget Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Target size={22} />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Primary Financial Goal
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Overall Monthly Budget
              </h3>
            </div>
          </div>

          <div>
            {isEditingOverall ? (
              <form onSubmit={handleSaveOverall} className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-semibold text-slate-400">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={overallInput}
                    onChange={(e) => setOverallInput(e.target.value)}
                    className="w-32 pl-7 pr-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden"
                    placeholder="15000"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingOverall(false)}
                  className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOverallInput(String(monthlyBudget));
                  setIsEditingOverall(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 transition-colors"
              >
                <Edit3 size={13} />
                <span>Edit Limit</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Metric Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 block mb-0.5">
              Monthly Budget
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(monthlyBudget, currency)}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 block mb-0.5">
              Spent This Month
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(overallSpent, currency)}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 block mb-0.5">
              Remaining Safe to Spend
            </span>
            <span
              className={`text-xl font-bold ${
                overallRemaining >= 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {formatCurrency(overallRemaining, currency)}
            </span>
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="mt-4 space-y-1.5">
          <ProgressBar percentage={overallPercentage} status={overallStatus} height="h-3" />
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-0.5">
            <span>{overallPercentage}% spent</span>
            <span>
              {overallPercentage >= 90
                ? '⚠️ Critical: Very close to or exceeding budget'
                : overallPercentage >= 70
                ? '⚠️ Approaching monthly budget threshold'
                : '✅ Spending safely within monthly parameters'}
            </span>
          </div>
        </div>
      </div>

      {/* Category Budgets Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Category Targets
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {categoryBudgetsWithUsage.length} active categories
          </span>
        </div>

        {categoryBudgetsWithUsage.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
            <EmptyState
              icon={Target}
              title="No budgets created"
              description="Keep your spending under control by establishing targets for Food, Transport, Books, etc."
              actionText="Add Category Budget"
              onAction={handleOpenAdd}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryBudgetsWithUsage.map((b) => (
              <BudgetCard
                key={b.id}
                budget={b}
                onEdit={handleOpenEdit}
                onDelete={(candidate) => setDeleteCandidate(candidate)}
                currency={currency}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Budget Modal */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBudget}
        initialData={editBudget}
        existingBudgets={budgets}
        currency={currency}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationDialog
        isOpen={Boolean(deleteCandidate)}
        title="Delete Budget"
        message={`Are you sure you want to delete your budget target for "${deleteCandidate?.category}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
}
