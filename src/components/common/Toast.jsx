import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({
  message,
  type = 'success', // 'success', 'error', 'info'
  onClose,
  duration = 3500,
}) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      border: 'border-emerald-200 dark:border-emerald-800',
      bg: 'bg-emerald-50 dark:bg-emerald-950/80',
      text: 'text-emerald-800 dark:text-emerald-200',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    error: {
      icon: AlertCircle,
      border: 'border-rose-200 dark:border-rose-800',
      bg: 'bg-rose-50 dark:bg-rose-950/80',
      text: 'text-rose-800 dark:text-rose-200',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
    info: {
      icon: Info,
      border: 'border-brand-200 dark:border-brand-800',
      bg: 'bg-brand-50 dark:bg-brand-950/80',
      text: 'text-brand-800 dark:text-brand-200',
      iconColor: 'text-brand-600 dark:text-brand-400',
    },
  }[type] || typeConfig.success;

  const Icon = typeConfig.icon;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${typeConfig.bg} ${typeConfig.border} ${typeConfig.text} max-w-sm`}
        role="alert"
      >
        <Icon size={18} className={typeConfig.iconColor} />
        <span className="text-sm font-medium">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
