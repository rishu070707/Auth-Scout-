import React from 'react';
import { ComplexityLevel } from '../types';

export const ComplexityBadge: React.FC<{ complexity: ComplexityLevel; className?: string }> = ({ complexity, className = '' }) => {
  const styles: Record<ComplexityLevel, string> = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Difficult: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border font-mono ${styles[complexity] || styles.Medium} ${className}`}>
      {complexity}
    </span>
  );
};
