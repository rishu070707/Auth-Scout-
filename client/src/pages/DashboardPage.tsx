import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchStats, fetchApplications } from '../api/client';
import { PlatformStats, Application } from '../types';
import { AppCard } from '../components/AppCard';
import {
  ShieldCheck,
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  Hourglass,
  Layers,
  CheckCircle2,
  AlertCircle
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
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 p-8 md:p-12 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Autonomous OAuth Integration Intelligence</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Prepare your OAuth integrations{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              before they become blockers.
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            From registration hurdles to security verification and approval delays: discover exact OAuth requirements, determine whether Composio Managed Auth can bypass weeks of review, and navigate setup with autonomous research.
          </p>

          {/* Search Bar in Hero */}
          <form onSubmit={handleSearch} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search provider (e.g. Google, Slack, Notion...)"
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md shadow-indigo-600/20 shrink-0"
            >
              <span>Explore Provider</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Real Statistics Derived from Stored DB Data */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Available Guides</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats ? stats.availableAppGuides : '—'}
          </div>
          <div className="text-[11px] text-slate-400">Deeply researched OAuth profiles</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>OAuth Providers</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats ? stats.supportedOAuthProviders : '—'}
          </div>
          <div className="text-[11px] text-slate-400">Supported in catalog directory</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Managed OAuth</span>
            <ShieldCheck className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats ? stats.managedOAuthCount : '—'}
          </div>
          <div className="text-[11px] text-slate-400">Composio Managed Toolkits</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Research Jobs</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats ? stats.researchJobsCompleted : '—'}
          </div>
          <div className="text-[11px] text-slate-400">Live AI agent investigations</div>
        </div>
      </section>

      {/* Popular Applications Directory */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Popular OAuth Providers</h2>
            <p className="text-xs text-slate-400">Common authentication targets for AI agents with verified setup data</p>
          </div>
          <Link
            to="/directory"
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View All Providers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 rounded-xl bg-slate-900/40 border border-slate-800/60 animate-pulse"></div>
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

      {/* AI Research Agent Callout */}
      <section className="p-8 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Missing an application?</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Dispatch the Autonomous AI Research Agent
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Enter any third-party app and website. The multi-agent pipeline discovers official documentation, extracts OAuth endpoints, assesses approval timelines, and generates a structured integration guide in seconds.
          </p>
        </div>
        <Link
          to="/research"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>Launch AI Agent Workspace</span>
        </Link>
      </section>

      {/* Quick-Start Workflow Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">How AuthScout Works</h2>
          <p className="text-xs text-slate-400">Streamlining OAuth integration from idea to production</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h4 className="font-semibold text-sm text-slate-100">Search or Dispatch Agent</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find pre-researched providers or enter any unfamiliar SaaS URL for autonomous investigation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h4 className="font-semibold text-sm text-slate-100">Analyze Blockers & Waiting Time</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Distinguish active developer coding hours from external provider security review delays (CASA Tier 2/3, Google verification).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h4 className="font-semibold text-sm text-slate-100">Evaluate Composio Managed OAuth</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              See whether managed auth can bypass credential management, token refresh handling, and compliance hurdles.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              04
            </div>
            <h4 className="font-semibold text-sm text-slate-100">Execute & Share Guide</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Follow step-by-step verified instructions and share permanent guide links with your engineering team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
