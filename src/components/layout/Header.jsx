import React from 'react';
import {
  Calendar,
  Plus,
  Moon,
  Sun,
  Menu,
} from 'lucide-react';
import { formatMonthName } from '../../utils/calculations';

export default function Header({
  selectedMonth,
  setSelectedMonth,
  onOpenAddModal,
  theme,
  onToggleTheme,
  onToggleMobileMenu,
}) {
  // Determine greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning 👋';
    if (hour < 17) return 'Good afternoon 👋';
    return 'Good evening 👋';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left Greeting & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-tight">
            {getGreeting()}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            Here's your spending overview.
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Month Selector Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
          <Calendar size={14} className="text-brand-600 dark:text-brand-400 shrink-0" />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => {
              if (e.target.value) setSelectedMonth(e.target.value);
            }}
            className="bg-transparent border-0 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden cursor-pointer"
            title="Change active month"
          />
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Add Expense Primary Button */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] shadow-xs hover:shadow transition-all duration-150 shrink-0"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Expense</span>
        </button>
      </div>
    </header>
  );
}
