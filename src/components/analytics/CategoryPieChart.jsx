import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getCategoryMeta } from '../../data/categories';
import { formatCurrency } from '../../utils/calculations';

// Custom Pie Tooltip
const CustomPieTooltip = ({ active, payload, currency = '₹' }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg border border-slate-800">
        <p className="font-semibold">{data.category}</p>
        <p className="text-slate-300 mt-0.5">
          {formatCurrency(data.amount, currency)} ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export default function CategoryPieChart({ categories = [], currency = '₹' }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-xs">
        <p>No category spending to display.</p>
      </div>
    );
  }

  // Assign colors from category metadata or fallback
  const chartData = categories.map((c) => {
    const meta = getCategoryMeta(c.category, 'Expense');
    return {
      ...c,
      color: meta.color || '#6366f1',
    };
  });

  return (
    <div className="w-full h-72 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={62}
            outerRadius={95}
            paddingAngle={3}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip currency={currency} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
