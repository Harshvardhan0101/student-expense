import React, { useState, useEffect } from 'react';
import { X, Target } from 'lucide-react';
import { EXPENSE_CATEGORIES } from '../../data/categories';

export default function BudgetModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  existingBudgets = [],
  currency = '₹',
}) {
  const isEdit = Boolean(initialData && initialData.id);

  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category || 'Food');
      setAmount(initialData.amount ? String(initialData.amount) : '');
    } else {
      // Pick first category not yet budgeted, or Food
      const usedCategories = existingBudgets.map((b) => b.category.toLowerCase());
      const available = EXPENSE_CATEGORIES.find((c) => !usedCategories.includes(c.name.toLowerCase()));
      setCategory(available ? available.name : 'Food');
      setAmount('');
    }
    setError('');
  }, [initialData, existingBudgets, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = Number(amount);
    if (!amount || isNaN(num) || num <= 0) {
      setError('Please enter a valid budget amount greater than 0.');
      return;
    }

    onSave({
      id: isEdit ? initialData.id : `budget-${Date.now()}`,
      category,
      amount: Math.round(num),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
              <Target size={18} />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {isEdit ? 'Edit Category Budget' : 'Set Category Budget'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isEdit}
              className={`w-full px-3 py-2 rounded-lg text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 ${
                isEdit ? 'opacity-70 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : 'cursor-pointer'
              }`}
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {isEdit && (
              <p className="text-[11px] text-slate-400 mt-1">
                Category cannot be changed when editing an existing budget.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Monthly Budget Limit ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-sm font-semibold text-slate-400">
                {currency}
              </span>
              <input
                type="number"
                step="10"
                placeholder="e.g. 4000"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError('');
                }}
                className={`w-full pl-8 pr-3 py-2 rounded-lg text-sm border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 ${
                  error ? 'border-rose-300 dark:border-rose-800' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
            </div>
            {error && <p className="text-[11px] text-rose-500 mt-1">{error}</p>}
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-brand-600 hover:bg-brand-700 shadow-sm active:scale-[0.98]"
            >
              {isEdit ? 'Save Budget' : 'Add Budget'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
