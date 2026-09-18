import { getSampleTransactions, getSampleBudgets, DEFAULT_MONTHLY_BUDGET } from '../data/sampleData';

const STORAGE_KEYS = {
  TRANSACTIONS: 'set_transactions_v1',
  BUDGETS: 'set_category_budgets_v1',
  MONTHLY_BUDGET: 'set_monthly_budget_v1',
  THEME: 'set_theme_mode_v1',
  CURRENCY: 'set_currency_v1',
  INITIALIZED: 'set_initialized_v1',
};

// Safe JSON parse with fallback
const safeParse = (str, fallback) => {
  if (!str) return fallback;
  try {
    const parsed = JSON.parse(str);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (err) {
    console.warn('LocalStorage parse error:', err);
    return fallback;
  }
};

// Safe JSON stringify and set
const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`LocalStorage write error for ${key}:`, err);
    return false;
  }
};

export const storage = {
  // Check if app has been initialized before; if not, preload sample data
  init() {
    try {
      const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
      if (!initialized) {
        this.loadSampleData();
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
      }
    } catch (e) {
      console.warn('Could not check initialization state:', e);
    }
  },

  // Transactions
  getTransactions() {
    const data = safeParse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS), null);
    if (Array.isArray(data)) {
      return data;
    }
    // If not found or invalid, return default sample data
    return getSampleTransactions();
  },

  saveTransactions(transactions) {
    return safeSet(STORAGE_KEYS.TRANSACTIONS, transactions);
  },

  addTransaction(tx) {
    const current = this.getTransactions();
    const updated = [tx, ...current];
    this.saveTransactions(updated);
    return updated;
  },

  updateTransaction(id, updatedTx) {
    const current = this.getTransactions();
    const updated = current.map((item) => (item.id === id ? { ...item, ...updatedTx } : item));
    this.saveTransactions(updated);
    return updated;
  },

  deleteTransaction(id) {
    const current = this.getTransactions();
    const updated = current.filter((item) => item.id !== id);
    this.saveTransactions(updated);
    return updated;
  },

  // Category Budgets
  getBudgets() {
    const data = safeParse(localStorage.getItem(STORAGE_KEYS.BUDGETS), null);
    if (Array.isArray(data)) {
      return data;
    }
    return getSampleBudgets();
  },

  saveBudgets(budgets) {
    return safeSet(STORAGE_KEYS.BUDGETS, budgets);
  },

  addBudget(budget) {
    const current = this.getBudgets();
    // Overwrite if category exists or add new
    const existingIndex = current.findIndex(b => b.category.toLowerCase() === budget.category.toLowerCase());
    let updated;
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...budget };
    } else {
      updated = [...current, budget];
    }
    this.saveBudgets(updated);
    return updated;
  },

  updateBudget(id, updatedBudget) {
    const current = this.getBudgets();
    const updated = current.map((b) => (b.id === id ? { ...b, ...updatedBudget } : b));
    this.saveBudgets(updated);
    return updated;
  },

  deleteBudget(id) {
    const current = this.getBudgets();
    const updated = current.filter((b) => b.id !== id);
    this.saveBudgets(updated);
    return updated;
  },

  // Overall Monthly Budget
  getMonthlyBudget() {
    const val = safeParse(localStorage.getItem(STORAGE_KEYS.MONTHLY_BUDGET), null);
    return typeof val === 'number' && val > 0 ? val : DEFAULT_MONTHLY_BUDGET;
  },

  saveMonthlyBudget(amount) {
    return safeSet(STORAGE_KEYS.MONTHLY_BUDGET, Number(amount));
  },

  // Theme
  getTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  },

  saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return true;
    } catch {
      return false;
    }
  },

  // Currency
  getCurrency() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      return saved || '₹';
    } catch {
      return '₹';
    }
  },

  saveCurrency(curr) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, curr);
      return true;
    } catch {
      return false;
    }
  },

  // Load sample data
  loadSampleData() {
    const sampleTxs = getSampleTransactions();
    const sampleBudgets = getSampleBudgets();
    this.saveTransactions(sampleTxs);
    this.saveBudgets(sampleBudgets);
    this.saveMonthlyBudget(DEFAULT_MONTHLY_BUDGET);
    return { transactions: sampleTxs, budgets: sampleBudgets, monthlyBudget: DEFAULT_MONTHLY_BUDGET };
  },

  // Reset all application data
  clearAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
      localStorage.removeItem(STORAGE_KEYS.BUDGETS);
      localStorage.removeItem(STORAGE_KEYS.MONTHLY_BUDGET);
      // We keep theme and currency preference unless explicitly removed
      this.saveTransactions([]);
      this.saveBudgets([]);
      this.saveMonthlyBudget(0);
      return true;
    } catch (err) {
      console.error('Error clearing data:', err);
      return false;
    }
  }
};
