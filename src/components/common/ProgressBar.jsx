import React from 'react';

export default function ProgressBar({
  percentage = 0,
  status = null,
  height = 'h-2.5',
  showLabel = false,
  className = '',
}) {
  const clamped = Math.min(Math.max(percentage, 0), 100);

  // Determine status automatically if not explicitly given
  let calculatedStatus = status;
  if (!calculatedStatus) {
    if (clamped > 90) {
      calculatedStatus = 'critical';
    } else if (clamped >= 70) {
      calculatedStatus = 'warning';
    } else {
      calculatedStatus = 'normal';
    }
  }

  const colorStyles = {
    normal: 'bg-emerald-500 dark:bg-emerald-400',
    warning: 'bg-amber-500 dark:bg-amber-400',
    critical: 'bg-rose-500 dark:bg-rose-400',
  }[calculatedStatus] || 'bg-brand-500 dark:bg-brand-400';

  const trackStyles = {
    normal: 'bg-emerald-100 dark:bg-emerald-950/60',
    warning: 'bg-amber-100 dark:bg-amber-950/60',
    critical: 'bg-rose-100 dark:bg-rose-950/60',
  }[calculatedStatus] || 'bg-slate-100 dark:bg-slate-800';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
          <span>Usage</span>
          <span className={calculatedStatus === 'critical' ? 'text-rose-600 dark:text-rose-400 font-semibold' : ''}>
            {percentage}%
          </span>
        </div>
      )}
      <div className={`w-full rounded-full overflow-hidden ${trackStyles} ${height}`}>
        <div
          className={`${height} rounded-full transition-all duration-500 ease-out ${colorStyles}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
