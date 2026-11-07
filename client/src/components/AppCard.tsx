import React from 'react';
import { Link } from 'react-router-dom';
import { Application } from '../types';
import { ComplexityBadge } from './ComplexityBadge';
import { Clock, Hourglass, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

export const AppCard: React.FC<{ app: Application }> = ({ app }) => {
  return (
    <div className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-indigo-500/5">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
              {app.logo ? (
                <img
                  src={app.logo}
                  alt={app.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to letter avatar
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span className="font-bold text-slate-300 font-mono text-sm">{app.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 text-base group-hover:text-indigo-300 transition-colors">
                {app.name}
              </h3>
              <a
                href={app.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] text-slate-400 hover:text-slate-300 flex items-center gap-1 font-mono"
              >
                <span>{app.website.replace(/^https?:\/\//, '')}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
          <ComplexityBadge complexity={app.complexity} />
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
          {app.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-800/60 mb-4 text-xs font-mono">
          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 uppercase tracking-wider">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Active Time</span>
            </div>
            <div className="text-slate-200 font-medium text-[11px]">
              {app.estimatedActiveTime}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 uppercase tracking-wider">
              <Hourglass className="w-3 h-3 text-slate-400" />
              <span>Approval Wait</span>
            </div>
            <div className="text-slate-200 font-medium text-[11px] truncate" title={app.approvalEstimate}>
              {app.approvalEstimate}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metadata & CTA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] text-slate-400">Composio:</span>
            <span className={`text-[11px] font-medium font-mono ${app.managedOAuthStatus === 'Available' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {app.managedOAuthStatus}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {app.lastResearchedAt ? new Date(app.lastResearchedAt).toLocaleDateString() : 'Recent'}
          </span>
        </div>

        <Link
          to={`/guides/${app.slug}`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-200 transition-colors border border-slate-700/60 hover:border-indigo-500/50"
        >
          <span>View OAuth Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
