import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileNav from './components/layout/MobileNav';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Budgets from './pages/Budgets';
import Settings from './pages/Settings';
import TransactionModal from './components/transactions/TransactionModal';
import Toast from './components/common/Toast';
import { storage } from './utils/storage';
import { getCurrentMonthString } from './utils/calculations';

export default function App() {
  // Initialize storage state
  const [isInitialized, setIsInitialized] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthString());
  const [theme, setTheme] = useState('light');
  const [currency, setCurrency] = useState('₹');

  // Core Data States
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(15000);

  // UI States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' | 'info' }

  // Initial load
  useEffect(() => {
    storage.init();
    const initialTheme = storage.getTheme();
    setTheme(initialTheme);
    storage.saveTheme(initialTheme);

    const initialCurrency = storage.getCurrency();
    setCurrency(initialCurrency);

    setTransactions(storage.getTransactions());
    setBudgets(storage.getBudgets());
    setMonthlyBudget(storage.getMonthlyBudget());
    setIsInitialized(true);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Transaction Handlers
  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (tx) => {
    setEditingTransaction(tx);
    setIsAddModalOpen(true);
  };

  const handleSaveTransaction = (formData) => {
    if (editingTransaction) {
      // Update
      const updated = storage.updateTransaction(editingTransaction.id, formData);
      setTransactions(updated);
      showToast('Transaction updated successfully', 'success');
    } else {
      // Create new
      const newTx = {
        ...formData,
        id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
      };
      const updated = storage.addTransaction(newTx);
      setTransactions(updated);
      showToast(
        `${newTx.type === 'Income' ? 'Income' : 'Expense'} added successfully`,
        'success'
      );
    }
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id) => {
    const updated = storage.deleteTransaction(id);
    setTransactions(updated);
  };

  // Budget Handlers
  const handleAddBudget = (newBudget) => {
    const updated = storage.addBudget(newBudget);
    setBudgets(updated);
  };

  const handleUpdateBudget = (id, budgetData) => {
    const updated = storage.updateBudget(id, budgetData);
    setBudgets(updated);
  };

  const handleDeleteBudget = (id) => {
    const updated = storage.deleteBudget(id);
    setBudgets(updated);
  };

  const handleUpdateMonthlyBudget = (amount) => {
    storage.saveMonthlyBudget(amount);
    setMonthlyBudget(amount);
  };

  // Settings Handlers
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    storage.saveTheme(nextTheme);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    storage.saveCurrency(newCurrency);
    showToast(`Currency set to ${newCurrency}`, 'info');
  };

  const handleLoadSampleData = () => {
    const loaded = storage.loadSampleData();
    setTransactions(loaded.transactions);
    setBudgets(loaded.budgets);
    setMonthlyBudget(loaded.monthlyBudget);
  };

  const handleClearAllData = () => {
    storage.clearAllData();
    setTransactions([]);
    setBudgets([]);
    setMonthlyBudget(0);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500">
        <p className="text-sm">Loading Student Expense Tracker...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Desktop Sidebar Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Mobile Slide-out Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Sticky Header */}
        <Header
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          onOpenAddModal={handleOpenAddModal}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto pb-16">
          {activePage === 'dashboard' && (
            <Dashboard
              transactions={transactions}
              monthlyBudget={monthlyBudget}
              categoryBudgets={budgets}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              onOpenAddModal={handleOpenAddModal}
              onNavigate={setActivePage}
              onUpdateMonthlyBudget={handleUpdateMonthlyBudget}
              currency={currency}
            />
          )}

          {activePage === 'transactions' && (
            <Transactions
              transactions={transactions}
              onOpenAddModal={handleOpenAddModal}
              onEditTransaction={handleOpenEditModal}
              onDeleteTransaction={handleDeleteTransaction}
              onShowToast={showToast}
              currency={currency}
            />
          )}

          {activePage === 'analytics' && (
            <Analytics
              transactions={transactions}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              currency={currency}
            />
          )}

          {activePage === 'budgets' && (
            <Budgets
              budgets={budgets}
              monthlyBudget={monthlyBudget}
              transactions={transactions}
              selectedMonth={selectedMonth}
              onAddBudget={handleAddBudget}
              onUpdateBudget={handleUpdateBudget}
              onDeleteBudget={handleDeleteBudget}
              onUpdateMonthlyBudget={handleUpdateMonthlyBudget}
              onShowToast={showToast}
              currency={currency}
            />
          )}

          {activePage === 'settings' && (
            <Settings
              currency={currency}
              onCurrencyChange={handleCurrencyChange}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              transactions={transactions}
              onLoadSampleData={handleLoadSampleData}
              onClearAllData={handleClearAllData}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Transaction Add/Edit Modal */}
      <TransactionModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSaveTransaction}
        initialData={editingTransaction}
        currency={currency}
      />

      {/* Toast Notification Container */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
