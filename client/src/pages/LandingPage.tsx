import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchStats, fetchApplications } from '../api/client';
import { PlatformStats, Application } from '../types';
import { AppCard } from '../components/AppCard';
import {
  Zap,
  Search,
  ArrowRight,
  Shield,
  Layers,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Hourglass,
  ExternalLink,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [apps, setApps] = useState<Application[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [statsData, appsData] = await Promise.all([
          fetchStats(),
          fetchApplications()
        ]);
        setStats(statsData);
        setApps(appsData.slice(0, 6));
      } catch (e) {
        console.error('Failed to load landing data:', e);
      }
    }
    load();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/directory?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <div className="space-y-12 pb-24 text-void-100 font-mono">

      {/* ── TOP SYSTEM STRIP ───────────────────────────────────── */}
      <div className="border-2 border-void-700 bg-void-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-black text-white uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-brand-500 animate-pulse inline-block" />
            AUTHSCOUT
          </span>
          <span className="status-live">V2.4.0_STABLE</span>
          <span className="hidden sm:inline-block text-void-500">|</span>
          <span className="hidden sm:inline-block text-void-400 text-[11px]">
            OAUTH_INTELLIGENCE_ENGINE // FOR AI BUILDERS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/directory"
            className="px-2.5 py-1 border-2 border-void-600 bg-void-900 hover:border-brand-500 text-void-300 hover:text-brand-500 text-[11px] font-bold uppercase transition-all"
          >
            Directory
          </Link>
          <Link
            to="/research"
            className="px-2.5 py-1 border-2 border-brand-500 bg-brand-500 text-void-900 text-[11px] font-black uppercase transition-all hover:bg-void-900 hover:text-brand-500"
          >
            Launch Agent
          </Link>
          <Link
            to="/overview"
            className="px-2.5 py-1 border-2 border-void-600 bg-void-900 hover:border-term-green text-term-green text-[11px] font-bold uppercase transition-all"
          >
            Console
          </Link>
        </div>
      </div>

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <section className="relative border-2 border-void-600 bg-void-800 p-6 md:p-12 overflow-hidden space-y-6">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-500" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFE500 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="relative max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-brand-500 bg-brand-500/10">
            <Zap className="w-3.5 h-3.5 text-brand-500" strokeWidth={3} />
            <span className="text-xs font-mono font-black text-brand-500 uppercase tracking-widest">
              From Integration Idea to OAuth-Ready Application
            </span>
          </div>

          <h1 className="text-3xl md:text-6xl font-black font-mono text-white tracking-tight uppercase leading-none">
            Prepare your OAuth integrations{' '}
            <span className="text-brand-500 block mt-2">
              before they become blockers.
            </span>
          </h1>

          <p className="text-void-300 text-xs md:text-sm font-mono leading-relaxed max-w-3xl">
            Building AI agents that require user or workspace permissions? Don't let surprise CASA audits,
            hidden scope reviews, and confusing developer consoles stall your deployment. AuthScout investigates
            third-party requirements, calculates true approval timelines, and reveals whether Composio Managed OAuth
            can deliver instant, pre-verified production tokens.
          </p>

          {/* Quick Search Action */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-void-400" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search provider (Google, Slack, Notion, Discord...)"
                className="w-full bg-void-900 border-2 border-void-600 pl-10 pr-4 py-2.5 text-xs font-mono text-void-100 placeholder:text-void-500 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-yellow px-5 py-2.5 text-xs flex items-center justify-center gap-2 shrink-0"
            >
              <span>Explore Provider</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="sys-label text-void-500">Popular Targets:</span>
            {['Google', 'Slack', 'GitHub', 'Notion', 'Discord', 'Linear', 'Airtable'].map((name) => (
              <Link
                key={name}
                to={`/directory?q=${encodeURIComponent(name)}`}
                className="px-2 py-0.5 border border-void-600 bg-void-900 text-void-300 hover:border-brand-500 hover:text-brand-500 text-[10px] font-bold uppercase transition-all"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL PLATFORM METRICS ──────────────────────────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'AVAILABLE_GUIDES',
            value: stats ? stats.availableAppGuides : '8',
            sub: 'Deeply researched profiles',
            icon: BookOpen,
            color: 'text-brand-500',
            border: 'border-brand-500',
          },
          {
            label: 'SUPPORTED_PROVIDERS',
            value: stats ? stats.supportedOAuthProviders : '7',
            sub: 'In catalog directory',
            icon: Layers,
            color: 'text-term-green',
            border: 'border-term-green',
          },
          {
            label: 'MANAGED_OAUTH',
            value: stats ? stats.managedOAuthCount : '7',
            sub: 'Composio managed toolkits',
            icon: Shield,
            color: 'text-term-blue',
            border: 'border-term-blue',
          },
          {
            label: 'RESEARCH_JOBS',
            value: stats ? stats.researchJobsCompleted : '2+',
            sub: 'Autonomous agent investigations',
            icon: Zap,
            color: 'text-brand-500',
            border: 'border-brand-500',
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="node-card p-4 space-y-2 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 bottom-0 ${item.border}`} />
              <div className={`flex items-center justify-between ${item.color}`}>
                <span className="sys-label">{item.label}</span>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {item.value}
              </div>
              <div className="text-[11px] text-void-400 font-mono">{item.sub}</div>
            </div>
          );
        })}
      </section>

      {/* ── CORE PROBLEM & VALUE PROPOSITION ──────────────────── */}
      <section className="border-2 border-void-700 bg-void-800 p-6 md:p-8 space-y-6">
        <div className="border-b-2 border-void-700 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-brand-500" />
            <span className="sys-label text-brand-500">WHY AUTHSCOUT EXISTS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight pl-3">
            OAuth Is The #1 Bottleneck For Autonomous AI Agent Integrations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-void-700 bg-void-900 p-4 space-y-2">
            <div className="text-term-red font-black text-xs uppercase flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-term-red" />
              <span>01 // SURPRISE SECURITY AUDITS</span>
            </div>
            <p className="text-xs text-void-300 leading-relaxed">
              Requesting sensitive scopes on Google triggers mandatory CASA Tier 2/3 lab audits costing
              $1,500–$15,000+ and taking up to 4 weeks. Most AI builders discover this only after finishing their code.
            </p>
          </div>

          <div className="border-2 border-void-700 bg-void-900 p-4 space-y-2">
            <div className="text-brand-500 font-black text-xs uppercase flex items-center gap-2">
              <Hourglass className="w-4 h-4 text-brand-500" />
              <span>02 // ACTIVE DEV VS APPROVAL WAIT</span>
            </div>
            <p className="text-xs text-void-300 leading-relaxed">
              Writing the OAuth redirect endpoint takes 45 minutes. Waiting for Slack App Directory or Discord Bot
              verification takes 5 to 21 business days. AuthScout separates active coding from external waiting time.
            </p>
          </div>

          <div className="border-2 border-void-700 bg-void-900 p-4 space-y-2">
            <div className="text-term-green font-black text-xs uppercase flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-term-green" />
              <span>03 // MANAGED OAUTH BYPASS</span>
            </div>
            <p className="text-xs text-void-300 leading-relaxed">
              Composio maintains pre-verified enterprise credentials and multi-tenant connection routing for 100+ apps.
              AuthScout directly identifies when you can skip custom app registration completely.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPARISON MATRIX: DIY CUSTOM OAUTH VS AUTHSCOUT + COMPOSIO ─ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-brand-500" />
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            Architecture Comparison: DIY Custom OAuth vs. Composio Managed
          </h2>
        </div>

        <div className="overflow-x-auto border-2 border-void-700 text-xs">
          <table className="w-full min-w-[640px] text-left font-mono">
            <thead className="bg-void-900 text-void-400 border-b-2 border-void-700 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Requirement</th>
                <th className="p-3 text-term-red font-bold">DIY Custom OAuth Application</th>
                <th className="p-3 text-term-green font-bold">Composio Managed OAuth (AuthScout Recommended)</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-void-700 bg-void-800">
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Provider Registration</td>
                <td className="p-3 text-void-400">Manual registration in each console</td>
                <td className="p-3 text-term-green font-bold">Zero registration needed — instant connection URLs</td>
              </tr>
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Security Review & CASA Audits</td>
                <td className="p-3 text-term-red font-bold">Developer submits for 3–21 day review + annual CASA audits</td>
                <td className="p-3 text-term-green font-bold">Pre-verified credentials with SOC2 & CASA compliance included</td>
              </tr>
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Token Refresh & Secret Rotation</td>
                <td className="p-3 text-void-400">Developer must build DB encryption & refresh cron daemon</td>
                <td className="p-3 text-term-green font-bold">Autonomous token refresh & secure vault storage</td>
              </tr>
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Multi-Tenant Routing</td>
                <td className="p-3 text-void-400">Build custom callback dispatcher & user state mapping</td>
                <td className="p-3 text-term-green font-bold">Native dynamic routing with multi-user isolation</td>
              </tr>
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Time to First Authorized API Call</td>
                <td className="p-3 text-term-red font-bold">3 days to 4 weeks</td>
                <td className="p-3 text-term-green font-bold">&lt; 5 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── POPULAR DIRECTORY SHOWCASE ─────────────────────────── */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 border-b-2 border-void-700 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-1 h-5 bg-brand-500" />
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Researched OAuth Application Catalog
              </h2>
            </div>
            <p className="text-xs text-void-500 pl-3">
              Pre-compiled intelligence profiles with verified endpoints, scopes, and approval constraints
            </p>
          </div>
          <Link
            to="/directory"
            className="flex items-center gap-1 self-start text-xs font-bold uppercase tracking-wider text-brand-500 hover:underline sm:self-auto"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ──────────────────────────────── */}
      <section className="border-2 border-brand-500 bg-brand-500/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-500" strokeWidth={3} />
            <span className="sys-label text-brand-500">Autonomous Investigation</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            Need An Unlisted Application? Dispatch The AI Agent.
          </h3>
          <p className="text-xs text-void-300 leading-relaxed">
            Enter any developer documentation URL. The multi-agent engine extracts scopes, verifies endpoints,
            and produces a shareable permanent guide within 60 seconds.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            to="/research"
            className="btn-yellow px-6 py-3 text-xs flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#FFE500]"
          >
            <Zap className="w-4 h-4" strokeWidth={3} />
            <span>Launch AI Agent Workspace</span>
          </Link>
          <Link
            to="/overview"
            className="btn-ghost px-5 py-3 text-xs flex items-center justify-center gap-2"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── TERMINAL FOOTER ────────────────────────────────────── */}
      <footer className="border-t-2 border-void-700 pt-6 text-xs font-mono text-void-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-black text-white uppercase">AUTHSCOUT</span>
          <span>//</span>
          <span>COMPOSIO APM INTEGRATIONS CASE STUDY</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/directory" className="hover:text-brand-500 uppercase">Directory</Link>
          <Link to="/research" className="hover:text-brand-500 uppercase">Research Agent</Link>
          <Link to="/docs" className="hover:text-brand-500 uppercase">Docs</Link>
          <a
            href="https://docs.composio.dev/toolkits/managed-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-500 uppercase flex items-center gap-1"
          >
            <span>Composio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>

    </div>
  );
};
