import React from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';
import { EvidenceStatus } from '../types';

type EvidenceLevel = 'VERIFIED' | 'INFERRED' | 'UNVERIFIED' | 'BLOCKED';

interface EvidenceBadgeProps {
  level?: EvidenceLevel | EvidenceStatus;
  status?: EvidenceLevel | EvidenceStatus;
  label?: string;
}

const CONFIG: Record<string, { icon: React.ElementType; border: string; text: string; bg: string }> = {
  VERIFIED:   { icon: CheckCircle2,   border: 'border-term-green', text: 'text-term-green', bg: 'bg-term-green/10' },
  INFERRED:   { icon: Info,           border: 'border-brand-500',  text: 'text-brand-500',  bg: 'bg-brand-500/10'  },
  UNVERIFIED: { icon: AlertTriangle,  border: 'border-void-400',   text: 'text-void-400',   bg: 'bg-void-800'      },
  BLOCKED:    { icon: XCircle,        border: 'border-term-red',   text: 'text-term-red',   bg: 'bg-term-red/10'   },
};

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ level, status, label }) => {
  const key = (status || level || 'UNVERIFIED') as string;
  const cfg = CONFIG[key] || CONFIG.UNVERIFIED;
  const Icon = cfg.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 border-2 ${cfg.border} ${cfg.bg} ${cfg.text} text-[9px] font-mono font-black uppercase tracking-wider`}>
      <Icon className="w-2.5 h-2.5" />
      {label || key}
    </span>
  );
};
