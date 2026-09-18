import React, { useState, useMemo } from 'react';
import { Plus, Download, FileText } from 'lucide-react';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionCard from '../components/transactions/TransactionCard';
import TransactionFilters from '../components/transactions/TransactionFilters';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import EmptyState from '../components/common/EmptyState';
import { exportTransactionsToCSV } from '../utils/csvExport';

export default function Transactions({
  transactions,
  onOpenAddModal,
  onEditTransaction,
  onDeleteTransaction,
  onShowToast,
  currency = '₹',
}) {
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'Expense', 'Income'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'highest', 'lowest'

  // Delete Confirmation State
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // Multi-criteria Filtering & Sorting
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search query (matches description or category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const descMatch = (tx.description || '').toLowerCase().includes(q);
        const catMatch = (tx.category || '').toLowerCase().includes(q);
        const notesMatch = (tx.notes || '').toLowerCase().includes(q);
        if (!descMatch && !catMatch && !notesMatch) return false;
      }

      // Type filter
      if (typeFilter !== 'all' && tx.type !== typeFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && tx.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }

      // Payment method filter
      if (
        paymentMethodFilter !== 'all' &&
        (tx.paymentMethod || '').toLowerCase() !== paymentMethodFilter.toLowerCase()
      ) {
        return false;
      }

      // Month filter
      if (monthFilter && (!tx.date || !tx.date.startsWith(monthFilter))) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort logic
      if (sortBy === 'newest') {
        return new Date(b.date || 0) - new Date(a.date || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.date || 0) - new Date(b.date || 0);
      }
      if (sortBy === 'highest') {
        return (Number(b.amount) || 0) - (Number(a.amount) || 0);
      }
      if (sortBy === 'lowest') {
        return (Number(a.amount) || 0) - (Number(b.amount) || 0);
      }
      return 0;
    });
  }, [
    transactions,
    searchQuery,
    typeFilter,
    categoryFilter,
    paymentMethodFilter,
    monthFilter,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setPaymentMethodFilter('all');
    setMonthFilter('');
    setSortBy('newest');
  };

  const handleExportCSV = () => {
    const result = exportTransactionsToCSV(filteredTransactions, 'transactions.csv');
    if (result.success) {
      onShowToast(`Exported ${result.count} transactions to CSV`, 'success');
    } else {
      onShowToast(result.message, 'error');
    }
  };

  const confirmDelete = () => {
    if (deleteCandidate) {
      onDeleteTransaction(deleteCandidate.id);
      onShowToast('Transaction deleted successfully', 'info');
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Transaction History
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Search, filter, and review all your income and expense logs
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={transactions.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs transition-colors"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] shadow-xs hover:shadow transition-all"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <TransactionFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        paymentMethodFilter={paymentMethodFilter}
        setPaymentMethodFilter={setPaymentMethodFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        monthFilter={monthFilter}
        setMonthFilter={setMonthFilter}
        onResetFilters={handleResetFilters}
        totalCount={transactions.length}
        filteredCount={filteredTransactions.length}
      />

      {/* Transactions Presentation (Table on Desktop, Cards on Mobile) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title={transactions.length === 0 ? 'No transactions yet' : 'No matching transactions'}
              description={
                transactions.length === 0
                  ? 'Start tracking your spending by adding your first transaction.'
                  : 'Try adjusting or resetting your search and filter criteria.'
              }
              actionText={transactions.length === 0 ? 'Add Transaction' : 'Clear Filters'}
              onAction={transactions.length === 0 ? onOpenAddModal : handleResetFilters}
            />
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <TransactionTable
                transactions={filteredTransactions}
                onEdit={onEditTransaction}
                onDelete={(tx) => setDeleteCandidate(tx)}
                currency={currency}
              />
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden p-4 space-y-3">
              {filteredTransactions.map((tx) => (
                <TransactionCard
                  key={tx.id}
                  tx={tx}
                  onEdit={onEditTransaction}
                  onDelete={(t) => setDeleteCandidate(t)}
                  currency={currency}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={Boolean(deleteCandidate)}
        title="Delete Transaction"
        message={`Are you sure you want to delete "${deleteCandidate?.description}" for ${currency}${deleteCandidate?.amount}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
}
