import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  Sparkles,
  BookmarkCheck,
  BookOpen,
  Settings,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/directory', label: 'App Directory', icon: Boxes },
    { to: '/research', label: 'AI Research Agent', icon: Sparkles, badge: 'Live' },
    { to: '/my-guides', label: 'My Guides', icon: BookmarkCheck },
    { to: '/docs', label: 'Documentation', icon: BookOpen },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4 flex-1 space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Composio Managed Auth Card */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Managed OAuth</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Eliminate complex approval delays & CASA audits with pre-verified Composio credentials.
          </p>
          <a
            href="https://docs.composio.dev/toolkits/managed-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
          >
            <span>Learn how Managed Auth works</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
        <span>AuthScout v1.0.0</span>
        <span className="font-mono text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Ready
        </span>
      </div>
    </aside>
  );
};
