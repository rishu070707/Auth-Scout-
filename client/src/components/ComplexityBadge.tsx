import React from 'react';

interface ComplexityBadgeProps {
  complexity: 'Easy' | 'Medium' | 'Difficult';
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ complexity }) => {
  const styles: Record<string, string> = {
    Easy: 'border-term-green text-term-green',
    Medium: 'border-brand-500 text-brand-500',
    Difficult: 'border-term-red text-term-red',
  };

  return (
    <span
      className={`text-[9px] font-mono font-black uppercase tracking-widest px-2 py-0.5 border-2 shrink-0 ${
        styles[complexity] || 'border-void-500 text-void-400'
      }`}
    >
      {complexity}
    </span>
  );
};
