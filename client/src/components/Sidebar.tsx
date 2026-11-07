import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Boxes,
  Zap,
  BookmarkCheck,
  BookOpen,
  Shield,
  ExternalLink
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Landing Page', icon: Home, code: 'HOME' },
    { to: '/overview', label: 'Console / Stats', icon: LayoutDashboard, code: 'DASH' },
    { to: '/directory', label: 'App Directory', icon: Boxes, code: 'DIR' },
    { to: '/research', label: 'AI Research Agent', icon: Zap, code: 'AGENT', badge: 'Live' },
    { to: '/my-guides', label: 'My Guides', icon: BookmarkCheck, code: 'SAVE' },
    { to: '/docs', label: 'Documentation', icon: BookOpen, code: 'DOCS' },
  ];

  return (
    <aside className="w-60 border-r-2 border-void-700 bg-void-900 flex flex-col shrink-0 min-h-[calc(100vh-3.5rem)]">
      <div className="p-3 flex-1 space-y-5">

        {/* Nav label */}
        <div className="px-2 pt-1">
          <span className="sys-label">Navigation</span>
        </div>

        {/* Navigation list */}
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-2.5 py-2 text-xs font-mono uppercase tracking-wider transition-all border-l-2 ${
                    isActive
                      ? 'border-brand-500 bg-brand-500/10 text-brand-500 font-black'
                      : 'border-transparent text-void-400 hover:text-void-100 hover:border-void-500 hover:bg-void-800'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={item.to === '/research' ? 3 : 2} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="status-live shrink-0">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t-2 border-void-700" />

        {/* Composio Managed Auth Card */}
        <div className="p-3 border-2 border-void-600 bg-void-800 space-y-2 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500" />
          <div className="pl-2">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Shield className="w-3.5 h-3.5 text-brand-500" strokeWidth={2.5} />
              <span className="text-xs font-mono font-bold text-brand-500 uppercase tracking-wider">
                Managed OAuth
              </span>
            </div>
            <p className="text-void-300 text-[11px] font-mono leading-relaxed">
              Eliminate approval delays & CASA audits with pre-verified Composio credentials.
            </p>
            <a
              href="https://docs.composio.dev/toolkits/managed-auth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-brand-500 hover:underline mt-2"
            >
              <span>Learn how it works</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Status bar footer */}
      <div className="status-bar px-3 py-2 flex items-center justify-between">
        <span className="text-void-500 uppercase tracking-wider">AUTHSCOUT v1.0.0</span>
        <span className="flex items-center gap-1.5 text-term-green font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-term-green animate-pulse inline-block" />
          SYSTEM_READY
        </span>
      </div>
    </aside>
  );
};
