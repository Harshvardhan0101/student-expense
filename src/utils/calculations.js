// Format currency in Indian numbering system
export const formatCurrency = (amount, currency = '₹') => {
  const num = Number(amount) || 0;
  // Intl.NumberFormat for Indian numbering system
  try {
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(num);
    return `${currency}${formatted}`;
  } catch {
    return `${currency}${num.toLocaleString()}`;
  }
};

// Get current year and month as YYYY-MM string
export const getCurrentMonthString = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
};

// Get previous month string
export const getPreviousMonthString = (yearMonthStr) => {
  const [year, month] = (yearMonthStr || getCurrentMonthString()).split('-').map(Number);
  let prevYear = year;
  let prevMonth = month - 1;
  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear -= 1;
  }
  return `${prevYear}-${String(prevMonth).padStart(2, '0')}`;
};

// Human-friendly month name (e.g. "October 2026")
export const formatMonthName = (yearMonthStr) => {
  if (!yearMonthStr) return '';
  const [year, month] = yearMonthStr.split('-').map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// Filter transactions by month string YYYY-MM
export const filterTransactionsByMonth = (transactions = [], yearMonth = getCurrentMonthString()) => {
  return transactions.filter(t => {
    if (!t.date) return false;
    return t.date.startsWith(yearMonth);
  });
};

// Calculate summary totals for a given month and all-time balance
export const calculateSummary = (transactions = [], selectedMonth = getCurrentMonthString()) => {
  // All time balance
  const allTimeIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  
  const allTimeExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalBalance = allTimeIncome - allTimeExpense;

  // Selected month calculations
  const monthTransactions = filterTransactionsByMonth(transactions, selectedMonth);

  const monthlyIncome = monthTransactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const monthlyExpense = monthTransactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const monthlySavings = monthlyIncome - monthlyExpense;

  let savingsPercentage = 0;
  if (monthlyIncome > 0) {
    savingsPercentage = Math.max(0, Math.round((monthlySavings / monthlyIncome) * 100));
  }

  return {
    totalBalance,
    monthlyIncome,
    monthlyExpense,
    monthlySavings,
    savingsPercentage,
    transactionCount: monthTransactions.length,
  };
};

// Calculate Category Spending for pie chart & breakdown
export const calculateCategorySpending = (transactions = [], selectedMonth = getCurrentMonthString()) => {
  const monthExpenses = filterTransactionsByMonth(transactions, selectedMonth).filter(t => t.type === 'Expense');
  const totalMonthExpense = monthExpenses.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const categoryMap = {};

  monthExpenses.forEach(t => {
    const cat = t.category || 'Other';
    const amt = Number(t.amount) || 0;
    if (!categoryMap[cat]) {
      categoryMap[cat] = { category: cat, amount: 0, count: 0 };
    }
    categoryMap[cat].amount += amt;
    categoryMap[cat].count += 1;
  });

  const categoriesList = Object.values(categoryMap).map(item => {
    const percentage = totalMonthExpense > 0 ? Math.round((item.amount / totalMonthExpense) * 100) : 0;
    return {
      ...item,
      percentage,
    };
  });

  // Sort descending by amount
  categoriesList.sort((a, b) => b.amount - a.amount);

  return {
    categories: categoriesList,
    totalExpense: totalMonthExpense,
  };
};

// Calculate Daily Spending across month
export const calculateDailySpending = (transactions = [], selectedMonth = getCurrentMonthString()) => {
  const [year, month] = selectedMonth.split('-').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();

  const monthExpenses = filterTransactionsByMonth(transactions, selectedMonth).filter(t => t.type === 'Expense');

  const dailyMap = {};
  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = String(d).padStart(2, '0');
    dailyMap[dayStr] = 0;
  }

  monthExpenses.forEach(t => {
    if (t.date) {
      const day = t.date.split('-')[2];
      if (day && dailyMap[day] !== undefined) {
        dailyMap[day] += Number(t.amount) || 0;
      }
    }
  });

  return Object.keys(dailyMap).map(day => ({
    day: `${Number(day)}`,
    date: `${selectedMonth}-${day}`,
    amount: dailyMap[day],
  }));
};

// Calculate Month-over-Month Comparison
export const calculateMonthOverMonth = (transactions = [], currentMonth = getCurrentMonthString()) => {
  const prevMonth = getPreviousMonthString(currentMonth);

  const currentExpenses = filterTransactionsByMonth(transactions, currentMonth)
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const previousExpenses = filterTransactionsByMonth(transactions, prevMonth)
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const prevMonthTransactions = filterTransactionsByMonth(transactions, prevMonth);
  const hasPreviousData = prevMonthTransactions.length > 0;

  const diff = currentExpenses - previousExpenses;
  let percentageChange = 0;
  if (previousExpenses > 0) {
    percentageChange = Math.round((diff / previousExpenses) * 100);
  }

  return {
    currentMonth,
    prevMonth,
    currentExpenses,
    previousExpenses,
    diff,
    percentageChange,
    hasPreviousData,
  };
};

// Calculate Budget Utilization
export const calculateBudgetUsage = (budgets = [], transactions = [], selectedMonth = getCurrentMonthString()) => {
  const monthExpenses = filterTransactionsByMonth(transactions, selectedMonth).filter(t => t.type === 'Expense');

  const spentPerCategory = {};
  monthExpenses.forEach(t => {
    const cat = t.category || 'Other';
    spentPerCategory[cat] = (spentPerCategory[cat] || 0) + (Number(t.amount) || 0);
  });

  return budgets.map(budget => {
    const spent = spentPerCategory[budget.category] || 0;
    const limit = Number(budget.amount) || 0;
    const remaining = limit - spent;
    const percentage = limit > 0 ? Math.round((spent / limit) * 100) : 0;

    let status = 'normal';
    if (percentage > 90) {
      status = 'critical';
    } else if (percentage >= 70) {
      status = 'warning';
    }

    return {
      ...budget,
      spent,
      remaining,
      percentage,
      status,
    };
  });
};
