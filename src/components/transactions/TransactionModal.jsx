import React, { useState, useEffect } from 'react';
import { X, ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, PAYMENT_METHODS } from '../../data/categories';

export default function TransactionModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  currency = '₹',
}) {
  const isEdit = Boolean(initialData && initialData.id);

  const getTodayString = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const [formData, setFormData] = useState({
    type: 'Expense',
    amount: '',
    description: '',
    category: 'Food',
    date: getTodayString(),
    paymentMethod: 'UPI',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type || 'Expense',
        amount: initialData.amount !== undefined ? String(initialData.amount) : '',
        description: initialData.description || '',
        category: initialData.category || (initialData.type === 'Income' ? 'Scholarship' : 'Food'),
        date: initialData.date || getTodayString(),
        paymentMethod: initialData.paymentMethod || 'UPI',
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        type: 'Expense',
        amount: '',
        description: '',
        category: 'Food',
        date: getTodayString(),
        paymentMethod: 'UPI',
        notes: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  // When type changes, adjust category default if invalid for new type
  const handleTypeChange = (newType) => {
    const availableCategories = newType === 'Income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    const isCategoryValid = availableCategories.some((c) => c.name === formData.category);
    setFormData((prev) => ({
      ...prev,
      type: newType,
      category: isCategoryValid ? prev.category : availableCategories[0].name,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Amount validation
    if (!formData.amount || String(formData.amount).trim() === '') {
      newErrors.amount = 'Amount is required.';
    } else {
      const num = Number(formData.amount);
      if (isNaN(num) || num <= 0) {
        newErrors.amount = 'Amount must be greater than 0.';
      }
    }

    // Description validation
    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Description is required.';
    } else if (formData.description.trim().length < 2) {
      newErrors.description = 'Description must be at least 2 characters.';
    }

    // Category validation
    if (!formData.category || formData.category.trim() === '') {
      newErrors.category = 'Category is required.';
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = 'Date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      amount: parseFloat(Number(formData.amount).toFixed(2)),
      description: formData.description.trim(),
      notes: formData.notes.trim(),
    };

    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  const currentCategoryList = formData.type === 'Income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {isEdit ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEdit ? 'Update details for this entry' : 'Log your student expense or income'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Type Toggle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
              <button
                type="button"
                onClick={() => handleTypeChange('Expense')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  formData.type === 'Expense'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ArrowDownRight size={15} />
                <span>Expense</span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('Income')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  formData.type === 'Income'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ArrowUpRight size={15} />
                <span>Income</span>
              </button>
            </div>
          </div>

          {/* Amount & Date in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Amount ({currency}) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm font-semibold text-slate-400 dark:text-slate-500">
                  {currency}
                </span>
                <input
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => {
                    setFormData({ ...formData, amount: e.target.value });
                    if (errors.amount) setErrors({ ...errors, amount: null });
                  }}
                  className={`w-full pl-8 pr-3 py-2 rounded-lg text-sm border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 transition-all ${
                    errors.amount
                      ? 'border-rose-300 dark:border-rose-800'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => {
                  setFormData({ ...formData, date: e.target.value });
                  if (errors.date) setErrors({ ...errors, date: null });
                }}
                className={`w-full px-3 py-2 rounded-lg text-sm border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 transition-all ${
                  errors.date
                    ? 'border-rose-300 dark:border-rose-800'
                    : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.date && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder={
                formData.type === 'Expense'
                  ? 'e.g., Hostel Mess Fee, Canteen lunch, Python book'
                  : 'e.g., Merit scholarship, Coding TA stipend'
              }
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: null });
              }}
              className={`w-full px-3 py-2 rounded-lg text-sm border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 transition-all ${
                errors.description
                  ? 'border-rose-300 dark:border-rose-800'
                  : 'border-slate-300 dark:border-slate-700'
              }`}
            />
            {errors.description && (
              <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category & Payment Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 transition-all cursor-pointer"
              >
                {currentCategoryList.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Payment Method
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 transition-all cursor-pointer"
              >
                {PAYMENT_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notes <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Shared with room 204 batchmates, paid via Google Pay..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-lg text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 transition-all resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] shadow-sm transition-all"
            >
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
