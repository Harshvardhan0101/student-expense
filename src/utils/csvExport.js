// RFC 4180 compliant CSV export
export const exportTransactionsToCSV = (transactions = [], filename = 'transactions.csv') => {
  if (!transactions || transactions.length === 0) {
    return { success: false, message: 'No transactions to export.' };
  }

  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Payment Method', 'Notes'];

  const escapeCSVField = (field) => {
    if (field === null || field === undefined) return '""';
    const str = String(field);
    // If the field contains quotes, commas, or newlines, escape quotes by doubling them and enclose in quotes
    if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return `"${str}"`;
  };

  const rows = transactions.map((t) => [
    escapeCSVField(t.date || ''),
    escapeCSVField(t.description || ''),
    escapeCSVField(t.category || ''),
    escapeCSVField(t.type || ''),
    escapeCSVField(t.amount !== undefined ? t.amount : 0),
    escapeCSVField(t.paymentMethod || ''),
    escapeCSVField(t.notes || ''),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((r) => r.join(',')),
  ].join('\r\n');

  try {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return { success: true, count: transactions.length };
  } catch (error) {
    console.error('CSV export error:', error);
    return { success: false, message: 'Failed to trigger file download.' };
  }
};
