export const EXPENSE_CATEGORIES = [
  {
    id: 'Food',
    name: 'Food',
    icon: 'Utensils',
    color: '#f97316', // orange
    bgLight: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/50',
    badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  },
  {
    id: 'Transport',
    name: 'Transport',
    icon: 'Bus',
    color: '#0ea5e9', // sky blue
    bgLight: 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/50',
    badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  },
  {
    id: 'Education',
    name: 'Education',
    icon: 'GraduationCap',
    color: '#6366f1', // indigo
    bgLight: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/50',
    badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  },
  {
    id: 'Shopping',
    name: 'Shopping',
    icon: 'ShoppingBag',
    color: '#ec4899', // pink
    bgLight: 'bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-950/40 dark:text-pink-400 dark:border-pink-800/50',
    badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  },
  {
    id: 'Entertainment',
    name: 'Entertainment',
    icon: 'Film',
    color: '#8b5cf6', // purple
    bgLight: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/50',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  },
  {
    id: 'Bills',
    name: 'Bills',
    icon: 'Receipt',
    color: '#eab308', // yellow
    bgLight: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-800/50',
    badgeColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  },
  {
    id: 'Health',
    name: 'Health',
    icon: 'HeartPulse',
    color: '#10b981', // emerald
    bgLight: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50',
    badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  {
    id: 'Other',
    name: 'Other',
    icon: 'MoreHorizontal',
    color: '#64748b', // slate
    bgLight: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800/50',
    badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
];

export const INCOME_CATEGORIES = [
  {
    id: 'Scholarship',
    name: 'Scholarship',
    icon: 'Award',
    color: '#10b981',
    bgLight: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50',
    badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  {
    id: 'Allowance',
    name: 'Allowance / Pocket Money',
    icon: 'Wallet',
    color: '#0ea5e9',
    bgLight: 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/50',
    badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  },
  {
    id: 'Part-time',
    name: 'Part-time / Internship',
    icon: 'Briefcase',
    color: '#6366f1',
    bgLight: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/50',
    badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  },
  {
    id: 'Freelance',
    name: 'Freelancing',
    icon: 'Laptop',
    color: '#8b5cf6',
    bgLight: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/50',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  },
  {
    id: 'Other Income',
    name: 'Other Income',
    icon: 'TrendingUp',
    color: '#14b8a6',
    bgLight: 'bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800/50',
    badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  }
];

export const PAYMENT_METHODS = [
  'Cash',
  'UPI',
  'Debit Card',
  'Credit Card',
  'Bank Transfer'
];

export const getCategoryMeta = (categoryName, type = 'Expense') => {
  const list = type === 'Income' ? [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES] : [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  const found = list.find(c => c.name.toLowerCase() === (categoryName || '').toLowerCase() || c.id.toLowerCase() === (categoryName || '').toLowerCase());
  return found || {
    id: categoryName || 'Other',
    name: categoryName || 'Other',
    icon: type === 'Income' ? 'TrendingUp' : 'Tag',
    color: '#64748b',
    bgLight: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800/50',
    badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  };
};
