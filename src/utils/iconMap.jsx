import React from 'react';
import {
  Utensils,
  Bus,
  GraduationCap,
  ShoppingBag,
  Film,
  Receipt,
  HeartPulse,
  MoreHorizontal,
  Award,
  Wallet,
  Briefcase,
  Laptop,
  TrendingUp,
  TrendingDown,
  Tag,
  PieChart,
  Equal,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
  Flame,
  PiggyBank,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

const iconComponents = {
  Utensils,
  Bus,
  GraduationCap,
  ShoppingBag,
  Film,
  Receipt,
  HeartPulse,
  MoreHorizontal,
  Award,
  Wallet,
  Briefcase,
  Laptop,
  TrendingUp,
  TrendingDown,
  Tag,
  PieChart,
  Equal,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
  Flame,
  PiggyBank,
  CheckCircle2,
  HelpCircle
};

export const getLucideIcon = (name, props = {}) => {
  const IconComponent = iconComponents[name] || Tag;
  return <IconComponent {...props} />;
};
