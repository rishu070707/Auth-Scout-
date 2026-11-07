import React from 'react';
import { EvidenceStatus } from '../types';
import { CheckCircle2, HelpCircle, AlertTriangle, Ban } from 'lucide-react';

export const EvidenceBadge: React.FC<{ status: EvidenceStatus; className?: string }> = ({ status, className = '' }) => {
  const configs: Record<EvidenceStatus, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
    VERIFIED: {
      bg: 'bg-emerald-950/40',
      text: 'text-emerald-300',
      border: 'border-emerald-500/40',
      icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
    },
    INFERRED: {
      bg: 'bg-indigo-950/40',
      text: 'text-indigo-300',
      border: 'border-indigo-500/40',
      icon: <HelpCircle className="w-3.5 h-3.5 mr-1 text-indigo-400" />
    },
    UNVERIFIED: {
      bg: 'bg-amber-950/40',
      text: 'text-amber-300',
      border: 'border-amber-500/40',
      icon: <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-400" />
    },
    BLOCKED: {
      bg: 'bg-rose-950/40',
      text: 'text-rose-300',
      border: 'border-rose-500/40',
      icon: <Ban className="w-3.5 h-3.5 mr-1 text-rose-400" />
    }
  };

  const current = configs[status] || configs.UNVERIFIED;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wider font-mono border ${current.bg} ${current.text} ${current.border} ${className}`}>
      {current.icon}
      {status}
    </span>
  );
};
