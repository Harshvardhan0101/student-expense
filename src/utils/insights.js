import {
  filterTransactionsByMonth,
  calculateCategorySpending,
  calculateMonthOverMonth,
  getCurrentMonthString,
  getPreviousMonthString,
  formatCurrency,
} from './calculations';

export const generateInsights = (
  transactions = [],
  monthlyBudget = 0,
  categoryBudgets = [],
  selectedMonth = getCurrentMonthString(),
  currency = '₹'
) => {
  const monthExpenses = filterTransactionsByMonth(transactions, selectedMonth).filter(
    (t) => t.type === 'Expense'
  );

  if (monthExpenses.length === 0) {
    return [];
  }

  const insights = [];

  // 1. Highest Spending Category Insight
  const { categories, totalExpense } = calculateCategorySpending(transactions, selectedMonth);
  if (categories.length > 0 && totalExpense > 0) {
    const top = categories[0];
    insights.push({
      id: 'top-category',
      type: 'info',
      icon: 'PieChart',
      title: 'Top Spending Category',
      text: `${top.category} is your highest expense this month at ${formatCurrency(top.amount, currency)} (${top.percentage}% of total spending).`,
    });
  }

  // 2. Month-over-Month Trend Insight
  const mom = calculateMonthOverMonth(transactions, selectedMonth);
  if (mom.hasPreviousData && mom.previousExpenses > 0) {
    if (mom.diff < 0) {
      insights.push({
        id: 'mom-decrease',
        type: 'success',
        icon: 'TrendingDown',
        title: 'Spending Pacing',
        text: `You have spent ${Math.abs(mom.percentageChange)}% less than last month (${formatCurrency(Math.abs(mom.diff), currency)} saved). Great discipline!`,
      });
    } else if (mom.diff > 0) {
      insights.push({
        id: 'mom-increase',
        type: 'warning',
        icon: 'TrendingUp',
        title: 'Spending Trend',
        text: `Your spending is up ${mom.percentageChange}% compared to last month (${formatCurrency(mom.diff, currency)} higher). Keep an eye on non-essentials.`,
      });
    } else {
      insights.push({
        id: 'mom-equal',
        type: 'info',
        icon: 'Equal',
        title: 'Consistent Spending',
        text: `Your spending is exactly on par with your spending at this point last month.`,
      });
    }
  }

  // 3. Monthly Overall Budget Utilization
  if (monthlyBudget > 0) {
    const pctUsed = Math.round((totalExpense / monthlyBudget) * 100);
    if (pctUsed > 100) {
      insights.push({
        id: 'budget-exceeded',
        type: 'danger',
        icon: 'AlertTriangle',
        title: 'Budget Exceeded',
        text: `You have exceeded your monthly budget of ${formatCurrency(monthlyBudget, currency)} by ${formatCurrency(totalExpense - monthlyBudget, currency)} (${pctUsed}% utilized).`,
      });
    } else if (pctUsed >= 85) {
      insights.push({
        id: 'budget-warning',
        type: 'warning',
        icon: 'AlertCircle',
        title: 'Budget Alert',
        text: `You have used ${pctUsed}% of your ${formatCurrency(monthlyBudget, currency)} monthly budget. Only ${formatCurrency(monthlyBudget - totalExpense, currency)} remaining.`,
      });
    } else {
      insights.push({
        id: 'budget-healthy',
        type: 'success',
        icon: 'ShieldCheck',
        title: 'Budget on Track',
        text: `You have used ${pctUsed}% of your ${formatCurrency(monthlyBudget, currency)} monthly budget. You have ${formatCurrency(monthlyBudget - totalExpense, currency)} left.`,
      });
    }
  }

  // 4. Critical Category Budget Check
  if (categoryBudgets && categoryBudgets.length > 0) {
    for (const b of categoryBudgets) {
      const catSpent = monthExpenses
        .filter((t) => t.category.toLowerCase() === b.category.toLowerCase())
        .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      const limit = Number(b.amount) || 0;
      if (limit > 0 && catSpent >= limit * 0.9) {
        const catPct = Math.round((catSpent / limit) * 100);
        insights.push({
          id: `cat-budget-${b.category}`,
          type: catPct > 100 ? 'danger' : 'warning',
          icon: 'Flame',
          title: `${b.category} Budget Alert`,
          text: `Your ${b.category} spending has reached ${catPct}% of its ${formatCurrency(limit, currency)} limit (${formatCurrency(catSpent, currency)} spent).`,
        });
        break; // Show at most one category alert to prevent clutter
      }
    }
  }

  // 5. Savings rate or Second category insight
  const monthIncome = filterTransactionsByMonth(transactions, selectedMonth)
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  if (monthIncome > 0 && totalExpense < monthIncome) {
    const savingsRate = Math.round(((monthIncome - totalExpense) / monthIncome) * 100);
    if (savingsRate >= 20 && insights.length < 4) {
      insights.push({
        id: 'savings-rate',
        type: 'success',
        icon: 'PiggyBank',
        title: 'Strong Savings Rate',
        text: `You have retained ${savingsRate}% of your total incoming funds this month.`,
      });
    }
  }

  return insights.slice(0, 4);
};
