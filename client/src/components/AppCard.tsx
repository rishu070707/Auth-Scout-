import React from 'react';
import { Link } from 'react-router-dom';
import { Application } from '../types';
import { ComplexityBadge } from './ComplexityBadge';
import { Clock, Hourglass, Shield, ArrowRight, ExternalLink } from 'lucide-react';

export const AppCard: React.FC<{ app: Application }> = ({ app }) => {
  return (
    <div className="node-card group flex flex-col justify-between p-0 overflow-hidden">
      {/* Color top-bar based on complexity */}
      <div className={`h-1 w-full ${
        app.complexity === 'Easy' ? 'bg-term-green' :
        app.complexity === 'Medium' ? 'bg-brand-500' : 'bg-term-red'
      }`} />

      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* Logo box */}
            <div className="w-9 h-9 border-2 border-void-600 bg-void-800 flex items-center justify-center shrink-0 overflow-hidden">
              {app.logo ? (
                <img
                  src={app.logo}
                  alt={app.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              ) : (
                <span className="font-black text-brand-500 font-mono text-sm">
                  {app.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-mono font-bold text-void-50 text-sm uppercase tracking-wide group-hover:text-brand-500 transition-colors">
                {app.name}
              </h3>
              <a
                href={app.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] text-void-400 hover:text-brand-500 flex items-center gap-1 font-mono transition-colors"
              >
                <span>{app.website.replace(/^https?:\/\//, '')}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
          <ComplexityBadge complexity={app.complexity} />
        </div>

        {/* Description */}
        <p className="text-void-400 text-xs font-mono line-clamp-2 leading-relaxed">
          {app.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2 py-2 border-y-2 border-void-700 text-xs font-mono">
          <div className="space-y-0.5">
            <div className="sys-label flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Active Time
            </div>
            <div className="text-void-100 font-bold text-[11px]">{app.estimatedActiveTime}</div>
          </div>
          <div className="space-y-0.5">
            <div className="sys-label flex items-center gap-1">
              <Hourglass className="w-3 h-3" />
              Approval Wait
            </div>
            <div className="text-void-100 font-bold text-[11px] truncate" title={app.approvalEstimate}>
              {app.approvalEstimate}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-brand-500" strokeWidth={2.5} />
            <span className="text-void-500 text-[10px] uppercase">Composio:</span>
            <span className={`font-bold text-[10px] ${
              app.managedOAuthStatus === 'Available' ? 'text-term-green' : 'text-brand-500'
            }`}>
              {app.managedOAuthStatus}
            </span>
          </div>
          <span className="text-[10px] text-void-500">
            {app.lastResearchedAt
              ? new Date(app.lastResearchedAt).toLocaleDateString()
              : 'Recent'}
          </span>
        </div>

        {/* CTA */}
        <Link
          to={`/guides/${app.slug}`}
          className="btn-ghost w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs mt-auto"
        >
          <span>View OAuth Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
