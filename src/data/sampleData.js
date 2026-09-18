// Helper to format date as YYYY-MM-DD
const formatDate = (year, month, day) => {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
};

export const getSampleTransactions = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-12
  
  // Previous month calculation
  let prevYear = currentYear;
  let prevMonth = currentMonth - 1;
  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear -= 1;
  }

  return [
    // Current Month Income
    {
      id: 'tx-sample-1',
      type: 'Income',
      amount: 8000,
      category: 'Scholarship',
      description: 'Merit Scholarship Grant',
      date: formatDate(currentYear, currentMonth, 1),
      paymentMethod: 'Bank Transfer',
      notes: 'Semester merit award credited directly to bank account',
      createdAt: new Date(currentYear, currentMonth - 1, 1).toISOString(),
    },
    {
      id: 'tx-sample-2',
      type: 'Income',
      amount: 4500,
      category: 'Part-time',
      description: 'Coding Tutor Stipend',
      date: formatDate(currentYear, currentMonth, 10),
      paymentMethod: 'Bank Transfer',
      notes: 'Weekend high-school tutoring session payout',
      createdAt: new Date(currentYear, currentMonth - 1, 10).toISOString(),
    },

    // Current Month Expenses
    {
      id: 'tx-sample-3',
      type: 'Expense',
      amount: 2800,
      category: 'Food',
      description: 'Hostel Mess Fee (Part 1)',
      date: formatDate(currentYear, currentMonth, 2),
      paymentMethod: 'UPI',
      notes: 'Monthly hostel mess subscription advance',
      createdAt: new Date(currentYear, currentMonth - 1, 2).toISOString(),
    },
    {
      id: 'tx-sample-4',
      type: 'Expense',
      amount: 450,
      category: 'Transport',
      description: 'Metro / Bus Student Pass',
      date: formatDate(currentYear, currentMonth, 4),
      paymentMethod: 'Cash',
      notes: 'Concession card renewal at campus kiosk',
      createdAt: new Date(currentYear, currentMonth - 1, 4).toISOString(),
    },
    {
      id: 'tx-sample-5',
      type: 'Expense',
      amount: 220,
      category: 'Food',
      description: 'College Canteen Lunch',
      date: formatDate(currentYear, currentMonth, 6),
      paymentMethod: 'UPI',
      notes: 'Thali with lab partners',
      createdAt: new Date(currentYear, currentMonth - 1, 6).toISOString(),
    },
    {
      id: 'tx-sample-6',
      type: 'Expense',
      amount: 850,
      category: 'Education',
      description: 'Data Structures Reference Book',
      date: formatDate(currentYear, currentMonth, 7),
      paymentMethod: 'Debit Card',
      notes: 'Purchased second-hand at university book fair',
      createdAt: new Date(currentYear, currentMonth - 1, 7).toISOString(),
    },
    {
      id: 'tx-sample-7',
      type: 'Expense',
      amount: 1499,
      category: 'Education',
      description: 'Full-Stack Web Dev Certificate',
      date: formatDate(currentYear, currentMonth, 9),
      paymentMethod: 'Credit Card',
      notes: 'Self-paced certification course',
      createdAt: new Date(currentYear, currentMonth - 1, 9).toISOString(),
    },
    {
      id: 'tx-sample-8',
      type: 'Expense',
      amount: 299,
      category: 'Bills',
      description: 'Mobile Recharge (1.5GB/day)',
      date: formatDate(currentYear, currentMonth, 11),
      paymentMethod: 'UPI',
      notes: '28-day validity recharge',
      createdAt: new Date(currentYear, currentMonth - 1, 11).toISOString(),
    },
    {
      id: 'tx-sample-9',
      type: 'Expense',
      amount: 140,
      category: 'Transport',
      description: 'Auto Rickshaw to Exam Hall',
      date: formatDate(currentYear, currentMonth, 13),
      paymentMethod: 'Cash',
      notes: 'Shared fare with 2 batchmates',
      createdAt: new Date(currentYear, currentMonth - 1, 13).toISOString(),
    },
    {
      id: 'tx-sample-10',
      type: 'Expense',
      amount: 350,
      category: 'Entertainment',
      description: 'Weekend Movie & Snack',
      date: formatDate(currentYear, currentMonth, 14),
      paymentMethod: 'UPI',
      notes: 'Cinema ticket with college friends',
      createdAt: new Date(currentYear, currentMonth - 1, 14).toISOString(),
    },
    {
      id: 'tx-sample-11',
      type: 'Expense',
      amount: 420,
      category: 'Education',
      description: 'Lab Manuals & Printouts',
      date: formatDate(currentYear, currentMonth, 15),
      paymentMethod: 'Cash',
      notes: 'Final semester project report binding',
      createdAt: new Date(currentYear, currentMonth - 1, 15).toISOString(),
    },
    {
      id: 'tx-sample-12',
      type: 'Expense',
      amount: 899,
      category: 'Shopping',
      description: 'Laptop Cooling Pad & USB Hub',
      date: formatDate(currentYear, currentMonth, 16),
      paymentMethod: 'Debit Card',
      notes: 'Needed for hostel desk setup',
      createdAt: new Date(currentYear, currentMonth - 1, 16).toISOString(),
    },
    {
      id: 'tx-sample-13',
      type: 'Expense',
      amount: 650,
      category: 'Food',
      description: 'Hostel Groceries & Dry Fruits',
      date: formatDate(currentYear, currentMonth, 17),
      paymentMethod: 'UPI',
      notes: 'Oats, peanut butter and apples',
      createdAt: new Date(currentYear, currentMonth - 1, 17).toISOString(),
    },
    {
      id: 'tx-sample-14',
      type: 'Expense',
      amount: 180,
      category: 'Health',
      description: 'Flu Medicine & Vitamin C',
      date: formatDate(currentYear, currentMonth, 18),
      paymentMethod: 'UPI',
      notes: 'Campus pharmacy purchase',
      createdAt: new Date(currentYear, currentMonth - 1, 18).toISOString(),
    },

    // Previous Month Transactions (For Month-over-Month Analytics)
    {
      id: 'tx-sample-prev-1',
      type: 'Income',
      amount: 7500,
      category: 'Scholarship',
      description: 'Previous Month Allowance',
      date: formatDate(prevYear, prevMonth, 2),
      paymentMethod: 'Bank Transfer',
      notes: 'Monthly academic support transfer',
      createdAt: new Date(prevYear, prevMonth - 1, 2).toISOString(),
    },
    {
      id: 'tx-sample-prev-2',
      type: 'Expense',
      amount: 2800,
      category: 'Food',
      description: 'Hostel Mess Fee',
      date: formatDate(prevYear, prevMonth, 3),
      paymentMethod: 'UPI',
      notes: 'Previous month mess fee',
      createdAt: new Date(prevYear, prevMonth - 1, 3).toISOString(),
    },
    {
      id: 'tx-sample-prev-3',
      type: 'Expense',
      amount: 450,
      category: 'Transport',
      description: 'Monthly Bus Pass',
      date: formatDate(prevYear, prevMonth, 5),
      paymentMethod: 'Cash',
      notes: 'Transit pass',
      createdAt: new Date(prevYear, prevMonth - 1, 5).toISOString(),
    },
    {
      id: 'tx-sample-prev-4',
      type: 'Expense',
      amount: 1200,
      category: 'Education',
      description: 'Engineering Graphics Kit',
      date: formatDate(prevYear, prevMonth, 8),
      paymentMethod: 'Debit Card',
      notes: 'Mini-drafter and compass set',
      createdAt: new Date(prevYear, prevMonth - 1, 8).toISOString(),
    },
    {
      id: 'tx-sample-prev-5',
      type: 'Expense',
      amount: 299,
      category: 'Bills',
      description: 'Mobile Recharge',
      date: formatDate(prevYear, prevMonth, 12),
      paymentMethod: 'UPI',
      notes: 'Monthly cell plan',
      createdAt: new Date(prevYear, prevMonth - 1, 12).toISOString(),
    },
    {
      id: 'tx-sample-prev-6',
      type: 'Expense',
      amount: 550,
      category: 'Food',
      description: 'Campus Canteen Treats',
      date: formatDate(prevYear, prevMonth, 16),
      paymentMethod: 'UPI',
      notes: 'Batch farewell snacks',
      createdAt: new Date(prevYear, prevMonth - 1, 16).toISOString(),
    },
    {
      id: 'tx-sample-prev-7',
      type: 'Expense',
      amount: 499,
      category: 'Entertainment',
      description: 'Gaming Zone with Friends',
      date: formatDate(prevYear, prevMonth, 22),
      paymentMethod: 'UPI',
      notes: 'Post-midterm arcade trip',
      createdAt: new Date(prevYear, prevMonth - 1, 22).toISOString(),
    }
  ];
};

export const getSampleBudgets = () => [
  { id: 'b-1', category: 'Food', amount: 5000 },
  { id: 'b-2', category: 'Transport', amount: 1500 },
  { id: 'b-3', category: 'Education', amount: 3500 },
  { id: 'b-4', category: 'Entertainment', amount: 1000 },
  { id: 'b-5', category: 'Shopping', amount: 2000 },
  { id: 'b-6', category: 'Bills', amount: 800 },
  { id: 'b-7', category: 'Health', amount: 1000 },
];

export const DEFAULT_MONTHLY_BUDGET = 15000;
