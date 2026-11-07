import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchStats, fetchApplications } from '../api/client';
import { PlatformStats, Application } from '../types';
import { AppCard } from '../components/AppCard';
import {
  BookOpen,
  Layers,
  Shield,
  Zap,
  ArrowRight,
  Search,
  Terminal,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [popularApps, setPopularApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, appsData] = await Promise.all([
          fetchStats(),
          fetchApplications()
        ]);
        setStats(statsData);
        setPopularApps(appsData.slice(0, 6));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/directory?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="space-y-8 pb-16">

      {/* ── Hero Section ──────────────────────────────────────── */}
      <section className="relative border-2 border-void-700 bg-void-800 p-8 md:p-10 overflow-hidden">
        {/* Dot grid overlay */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle, #404040 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        {/* Yellow accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-500" />

        <div className="relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-brand-500 bg-brand-500/10 mb-4">
            <Terminal className="w-3.5 h-3.5 text-brand-500" strokeWidth={2.5} />
            <span className="text-xs font-mono font-bold text-brand-500 uppercase tracking-widest">
              Autonomous OAuth Integration Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white font-mono leading-tight mb-3">
            Prepare your OAuth integrations{' '}
            <span className="text-brand-500">
              before they become blockers.
            </span>
          </h1>

          <p className="text-void-300 text-sm font-mono leading-relaxed max-w-2xl mb-6">
            From registration hurdles to security verification and approval delays: discover exact
            OAuth requirements, determine whether Composio Managed Auth can bypass weeks of
            review, and navigate setup with autonomous research.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-void-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search provider (e.g. Google, Slack, Notion...)"
                className="w-full bg-void-900 border-2 border-void-600 pl-10 pr-4 py-2.5 text-sm font-mono text-void-100 placeholder:text-void-500 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-yellow px-5 py-2.5 text-sm flex items-center justify-center gap-2 shrink-0"
            >
              <span>Explore Provider</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* ── Stats Grid ───────────────────────────────────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Available Guides',
            value: stats?.availableAppGuides,
            sub: 'Deeply researched OAuth profiles',
            icon: BookOpen,
            color: 'text-brand-500',
            border: 'border-brand-500',
          },
          {
            label: 'OAuth Providers',
            value: stats?.supportedOAuthProviders,
            sub: 'Supported in catalog directory',
            icon: Layers,
            color: 'text-term-green',
            border: 'border-term-green',
          },
          {
            label: 'Managed OAuth',
            value: stats?.managedOAuthCount,
            sub: 'Composio Managed Toolkits',
            icon: Shield,
            color: 'text-term-blue',
            border: 'border-term-blue',
          },
          {
            label: 'Research Jobs',
            value: stats?.researchJobsCompleted,
            sub: 'Live AI agent investigations',
            icon: Zap,
            color: 'text-brand-500',
            border: 'border-void-600',
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className={`node-card p-4 space-y-2 relative overflow-hidden`}>
              <div className={`absolute top-0 left-0 w-1 bottom-0 ${item.border}`}
                style={{ background: 'currentColor' }}
              />
              <div className={`flex items-center justify-between ${item.color}`}>
                <span className="sys-label">{item.label}</span>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {loading ? (
                  <span className="text-void-500 animate-pulse">—</span>
                ) : (
                  item.value ?? '—'
                )}
              </div>
              <div className="text-[11px] text-void-400 font-mono">{item.sub}</div>
            </div>
          );
        })}
      </section>

      {/* ── Popular Apps ─────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-1 h-5 bg-brand-500" />
              <h2 className="text-base font-black font-mono text-white uppercase tracking-wider">
                Popular OAuth Providers
              </h2>
            </div>
            <p className="text-xs text-void-500 font-mono pl-3">
              Common authentication targets for AI agents with verified setup data
            </p>
          </div>
          <Link
            to="/directory"
            className="text-xs font-mono font-bold text-brand-500 hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 border-2 border-void-700 bg-void-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularApps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        )}
      </section>

      {/* ── AI Research Agent Callout ─────────────────────────── */}
      <section className="border-2 border-brand-500 bg-brand-500/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="space-y-2 max-w-xl relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-brand-500" strokeWidth={3} />
            <span className="sys-label text-brand-500">Missing an application?</span>
          </div>
          <h3 className="text-xl font-black font-mono text-white uppercase tracking-tight">
            Dispatch the Autonomous AI Research Agent
          </h3>
          <p className="text-xs text-void-300 font-mono leading-relaxed">
            Enter any third-party app and website. The multi-agent pipeline discovers official
            documentation, extracts OAuth endpoints, assesses approval timelines, and generates
            a structured integration guide in seconds.
          </p>
        </div>
        <Link
          to="/research"
          className="btn-yellow px-6 py-3 text-sm flex items-center gap-2 shrink-0"
        >
          <Zap className="w-4 h-4" strokeWidth={3} />
          <span>Launch AI Agent Workspace</span>
        </Link>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-1 h-5 bg-term-green" />
          <h2 className="text-base font-black font-mono text-white uppercase tracking-wider">
            How AuthScout Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            {
              step: '01',
              title: 'Search or Dispatch',
              desc: 'Find pre-researched providers or enter any unfamiliar SaaS URL for autonomous investigation.',
            },
            {
              step: '02',
              title: 'Analyze Blockers',
              desc: 'Distinguish active developer hours from external provider security review delays (CASA Tier 2/3).',
            },
            {
              step: '03',
              title: 'Evaluate Composio',
              desc: 'See whether managed auth can bypass credential management and compliance hurdles.',
            },
            {
              step: '04',
              title: 'Execute & Share',
              desc: 'Follow step-by-step verified instructions and share permanent guide links with your team.',
            },
          ].map((item, i) => (
            <div key={i} className="node-card p-4 space-y-2 relative overflow-hidden">
              <div className="text-3xl font-black font-mono text-void-700 absolute top-2 right-3 select-none">
                {item.step}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-term-green shrink-0" />
                <h4 className="font-black text-sm font-mono text-void-50 uppercase tracking-wide">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-void-400 font-mono leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
