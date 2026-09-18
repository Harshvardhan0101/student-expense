import React from 'react';
import { getCategoryMeta } from '../../data/categories';
import { getLucideIcon } from '../../utils/iconMap';

export default function CategoryBadge({ category, type = 'Expense', size = 'sm', showIcon = true }) {
  const meta = getCategoryMeta(category, type);

  const sizeClasses = {
    xs: 'text-[11px] px-2 py-0.5 gap-1',
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
  }[size] || 'text-xs px-2.5 py-1 gap-1.5';

  const iconSizes = {
    xs: 12,
    sm: 13,
    md: 15,
  }[size] || 13;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${meta.badgeColor} ${sizeClasses}`}
    >
      {showIcon && getLucideIcon(meta.icon, { size: iconSizes, className: 'shrink-0' })}
      <span>{meta.name}</span>
    </span>
  );
}
