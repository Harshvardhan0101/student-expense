import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Download,
  Trash2,
  Database,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import { exportTransactionsToCSV } from '../utils/csvExport';

export default function Settings({
  currency,
  onCurrencyChange,
  theme,
  onToggleTheme,
  transactions,
  onLoadSampleData,
  onClearAllData,
  onShowToast,
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const currencyOptions = [
    { label: '₹ INR (Indian Rupee)', symbol: '₹' },
    { label: '$ USD (US Dollar)', symbol: '$' },
    { label: '€ EUR (Euro)', symbol: '€' },
    { label: '£ GBP (British Pound)', symbol: '£' },
  ];

  const handleExport = () => {
    const result = exportTransactionsToCSV(transactions, 'transactions.csv');
    if (result.success) {
      onShowToast(`Exported ${result.count} transactions to CSV`, 'success');
    } else {
      onShowToast(result.message, 'error');
    }
  };

  const handleConfirmClear = () => {
    onClearAllData();
    setShowClearConfirm(false);
    onShowToast('All data cleared successfully', 'info');
  };

  const handleLoadSamples = () => {
    onLoadSampleData();
    onShowToast('Realistic student demo data loaded', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="pb-1 border-b border-slate-200/60 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Application Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Configure preferences, appearance, currency, and local storage data
        </p>
      </div>

      {/* Currency Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Preferred Currency
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select the currency symbol used across the dashboard and analytics
            </p>
          </div>

          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 cursor-pointer"
          >
            {currencyOptions.map((opt) => (
              <option key={opt.symbol} value={opt.symbol}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Appearance & Theme
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Switch between daylight and dark eye-friendly mode
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => theme === 'dark' && onToggleTheme()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sun size={14} className="text-amber-500" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => theme === 'light' && onToggleTheme()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Moon size={14} className="text-indigo-400" />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Data Management
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Export your records, load starter data, or completely reset your local database
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Export CSV */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between">
            <div>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 w-fit mb-2">
                <Download size={16} />
              </div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                Export Transactions
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Download a clean, RFC-compliant CSV file of all recorded transactions.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExport}
              disabled={transactions.length === 0}
              className="mt-4 w-full py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
            >
              Export ({transactions.length})
            </button>
          </div>

          {/* Load Sample Data */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between">
            <div>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 w-fit mb-2">
                <RefreshCw size={16} />
              </div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                Load Sample Data
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Populate realistic student expenses (Mess, Canteen, Books, Travel) for testing.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLoadSamples}
              className="mt-4 w-full py-2 text-xs font-medium rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
            >
              Load Demo Data
            </button>
          </div>

          {/* Clear All Data */}
          <div className="p-4 rounded-xl border border-rose-100 dark:border-rose-950/60 bg-rose-50/30 dark:bg-rose-950/20 flex flex-col justify-between">
            <div>
              <div className="p-2 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 w-fit mb-2">
                <Trash2 size={16} />
              </div>
              <h4 className="text-xs font-semibold text-rose-900 dark:text-rose-200">
                Reset Application Data
              </h4>
              <p className="text-[11px] text-rose-600/80 dark:text-rose-400/80 mt-1">
                Wipe all transactions and budgets from your browser's localStorage.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="mt-4 w-full py-2 text-xs font-medium rounded-lg border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>

      {/* Project & Portfolio Credits */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <GraduationCap size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              About Student Expense Tracker
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Production-ready frontend portfolio project for B.Tech CSE students
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <p>
            • Built with <strong>React.js</strong>, <strong>Tailwind CSS</strong>, <strong>Recharts</strong>, and <strong>Lucide React</strong>.
          </p>
          <p>
            • 100% offline-first architecture powered by <strong>browser localStorage</strong> with no external server or API requirements.
          </p>
        </div>
      </div>

      {/* Clear Data Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showClearConfirm}
        title="Reset All Application Data"
        message="Are you sure you want to delete all transactions, budgets, and saved preferences? This action cannot be reversed."
        confirmText="Yes, Clear Everything"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={handleConfirmClear}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}
