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
  Play,
  ClipboardList,
  UserCheck,
  Check,
  RotateCcw,
  Sparkles,
  Terminal,
  Clock,
  Hourglass,
  ExternalLink,
  ChevronRight,
  Eye,
  Activity,
  Maximize2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [apps, setApps] = useState<Application[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const [activeNode, setActiveNode] = useState<string>('SYS_AUTOMATE');
  const [traceRunning, setTraceRunning] = useState(false);
  const [traceStep, setTraceStep] = useState<number>(-1);
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

  const runValidationTrace = () => {
    if (traceRunning) return;
    setTraceRunning(true);
    setTraceStep(0);
    const nodeOrder = ['START_FLOW', 'USER_TASK', 'APPROVE_OP', 'SYS_AUTOMATE', 'TERMINAL'];
    
    nodeOrder.forEach((node, index) => {
      setTimeout(() => {
        setTraceStep(index);
        setActiveNode(node);
        if (index === nodeOrder.length - 1) {
          setTimeout(() => {
            setTraceRunning(false);
          }, 1200);
        }
      }, (index + 1) * 800);
    });
  };

  const workflowNodes = [
    {
      id: 'START_FLOW',
      name: 'START_FLOW',
      sub: 'START NODE',
      type: 'INITIATOR',
      icon: Play,
      color: 'bg-brand-500 text-void-900 border-brand-500',
      badge: 'INITIATED',
      desc: 'AI Agent requests third-party authorization for user or enterprise workspace.',
      status: 'VERIFIED',
      activeColor: 'border-brand-500 text-brand-500',
      output: 'Scopes: [read, write, offline_access]'
    },
    {
      id: 'USER_TASK',
      name: 'USER_TASK',
      sub: 'TASK NODE',
      type: 'RESEARCH',
      icon: ClipboardList,
      color: 'bg-term-blue text-void-900 border-term-blue',
      badge: 'PARSING',
      desc: 'AuthScout Discovery Agent scrapes official developer documentation & endpoints.',
      status: 'IN_PROGRESS',
      activeColor: 'border-term-blue text-term-blue',
      output: 'Endpoints: Auth URL & Token URL located'
    },
    {
      id: 'APPROVE_OP',
      name: 'APPROVE_OP',
      sub: 'APPROVAL NODE',
      type: 'GATE',
      icon: UserCheck,
      color: 'bg-brand-500 text-void-900 border-brand-500',
      badge: 'EVALUATION',
      desc: 'Evaluate provider review gate: Google CASA Tier 2/3, Slack App Directory, or Discord Bot review.',
      status: 'BLOCKED_REVIEW',
      activeColor: 'border-brand-500 text-brand-500',
      output: 'Wait Time: 3-21 days if DIY custom credentials'
    },
    {
      id: 'SYS_AUTOMATE',
      name: 'SYS_AUTOMATE',
      sub: 'AUTOMATED STEP NODE',
      type: 'COMPOSIO_ROUTE',
      icon: Zap,
      color: 'bg-term-green text-void-900 border-term-green',
      badge: 'BYPASS_ACTIVE',
      desc: 'Composio Managed OAuth eliminates manual app registration and bypasses weeks of external review.',
      status: 'BYPASS_ENABLED',
      activeColor: 'border-term-green text-term-green',
      output: 'Result: Pre-verified enterprise credentials applied instantly'
    },
    {
      id: 'TERMINAL',
      name: 'TERMINAL',
      sub: 'END NODE',
      type: 'SUCCESS',
      icon: Check,
      color: 'bg-term-red text-void-900 border-term-red',
      badge: 'COMPLETE',
      desc: 'Secure token exchange completed with automated refresh scheduling and encryption.',
      status: 'SUCCESS',
      activeColor: 'border-term-red text-term-red',
      output: 'Status: Production Ready Integration'
    }
  ];

  const selectedNodeData = workflowNodes.find(n => n.id === activeNode) || workflowNodes[3];

  return (
    <div className="space-y-12 pb-24 text-void-100 font-mono">

      {/* ── TOP SYSTEM STRIP (IMAGE 2 AESTHETIC) ──────────────── */}
      <div className="border-2 border-void-700 bg-void-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-black text-white uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-brand-500 animate-pulse inline-block" />
            WORKFLOW
          </span>
          <span className="status-live">V2.4.0_STABLE</span>
          <span className="hidden sm:inline-block text-void-500">|</span>
          <span className="hidden sm:inline-block text-void-400 text-[11px]">
            OAUTH_INTELLIGENCE_ENGINE // AUTHSCOUT
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
            Dashboard
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

      {/* ── WORKFLOW INTERACTIVE CANVAS (EXACT HOMAGE TO IMAGE 2) ─ */}
      <section className="border-2 border-void-600 bg-void-900 overflow-hidden shadow-2xl">
        {/* Canvas Toolbar Header */}
        <div className="border-b-2 border-void-700 bg-void-800 p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-term-green" />
              INTEGRATION_GRAPH_SIMULATOR
            </span>
            <span className="text-[10px] font-bold uppercase bg-brand-500 text-void-900 px-2 py-0.5">
              INTERACTIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveNode('START_FLOW'); setTraceStep(-1); }}
              className="px-2.5 py-1 border-2 border-void-600 bg-void-900 text-void-400 hover:text-white text-[11px] font-bold uppercase"
            >
              UNDO
            </button>
            <button
              onClick={() => { setActiveNode('TERMINAL'); setTraceStep(-1); }}
              className="px-2.5 py-1 border-2 border-void-600 bg-void-900 text-void-400 hover:text-white text-[11px] font-bold uppercase"
            >
              REDO
            </button>
            <button
              onClick={() => { setActiveNode('SYS_AUTOMATE'); setTraceStep(-1); }}
              className="px-2.5 py-1 border-2 border-void-600 bg-void-900 text-brand-500 text-[11px] font-bold uppercase"
            >
              AUTO_LAYOUT
            </button>
            <button
              onClick={() => { setActiveNode('START_FLOW'); setTraceStep(-1); }}
              className="px-2.5 py-1 border-2 border-term-red bg-term-red/10 text-term-red text-[11px] font-bold uppercase"
            >
              PURGE
            </button>
          </div>
        </div>

        {/* Canvas Work Area: Left Node Toolbox + Main Interactive Surface */}
        <div className="flex flex-col lg:flex-row min-h-[460px]">
          {/* Left Node Palette (Image 2 Left Sidebar) */}
          <div className="w-full lg:w-72 border-r-2 border-void-700 bg-void-800/90 p-4 space-y-3 shrink-0">
            <div className="sys-label flex items-center justify-between pb-1 border-b border-void-700">
              <span>NODE PALETTE</span>
              <span className="text-term-green">5 ACTIVE</span>
            </div>

            <div className="space-y-2">
              {workflowNodes.map((node, idx) => {
                const Icon = node.icon;
                const isSelected = activeNode === node.id;
                const isTraced = traceStep === idx;

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      setActiveNode(node.id);
                      setTraceStep(idx);
                    }}
                    className={`w-full text-left p-3 border-2 transition-all flex items-center gap-3 ${
                      isSelected || isTraced
                        ? 'border-brand-500 bg-brand-500/10 shadow-[3px_3px_0px_0px_#FFE500]'
                        : 'border-void-700 bg-void-900 hover:border-void-500 hover:bg-void-800'
                    }`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center shrink-0 border-2 font-bold ${node.color}`}>
                      <Icon className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-white text-xs uppercase tracking-wide truncate">
                          {node.name}
                        </span>
                        {isTraced && (
                          <span className="w-2 h-2 rounded-full bg-term-green animate-ping" />
                        )}
                      </div>
                      <span className="text-[10px] text-void-500 font-bold uppercase block">
                        {node.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-void-700 flex items-center justify-between text-[10px] text-void-500">
              <span>SYSTEM STATUS</span>
              <span className="text-term-green flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-term-green animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>

          {/* Main Interactive Canvas Surface */}
          <div className="flex-1 p-6 relative flex flex-col justify-between"
            style={{
              backgroundImage: 'radial-gradient(circle, #333333 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Zoom Controls Top Left */}
            <div className="absolute top-4 left-4 flex flex-col border-2 border-void-600 bg-void-900 z-10 text-xs">
              <button
                className="w-7 h-7 flex items-center justify-center border-b border-void-700 text-void-300 hover:text-brand-500 hover:bg-void-800"
                title="Zoom In"
              >
                +
              </button>
              <button
                className="w-7 h-7 flex items-center justify-center border-b border-void-700 text-void-300 hover:text-brand-500 hover:bg-void-800"
                title="Zoom Out"
              >
                -
              </button>
              <button
                className="w-7 h-7 flex items-center justify-center text-void-300 hover:text-brand-500 hover:bg-void-800"
                title="Fit Canvas"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Node Flow Visualization */}
            <div className="py-8 pl-12 pr-4 overflow-x-auto">
              <div className="flex items-center gap-3 min-w-[700px]">
                {workflowNodes.map((n, i) => {
                  const Icon = n.icon;
                  const isCurrent = activeNode === n.id;
                  const isTraced = traceStep === i;

                  return (
                    <React.Fragment key={n.id}>
                      <div
                        onClick={() => {
                          setActiveNode(n.id);
                          setTraceStep(i);
                        }}
                        className={`cursor-pointer border-2 p-3.5 bg-void-900 transition-all w-48 relative ${
                          isCurrent || isTraced
                            ? 'border-brand-500 shadow-[4px_4px_0px_0px_#FFE500]'
                            : 'border-void-700 hover:border-void-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black uppercase tracking-wider text-void-500">
                            STEP 0{i + 1}
                          </span>
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 border ${
                            n.id === 'SYS_AUTOMATE'
                              ? 'border-term-green text-term-green bg-term-green/10'
                              : n.id === 'APPROVE_OP'
                              ? 'border-brand-500 text-brand-500 bg-brand-500/10'
                              : 'border-void-600 text-void-400 bg-void-800'
                          }`}>
                            {n.badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-5 h-5 flex items-center justify-center border text-[10px] font-bold ${n.color}`}>
                            <Icon className="w-3 h-3" />
                          </div>
                          <span className="font-black text-white text-xs uppercase tracking-wide">
                            {n.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-void-400 leading-snug line-clamp-2">
                          {n.desc}
                        </p>
                      </div>

                      {i < workflowNodes.length - 1 && (
                        <div className="flex items-center text-void-600">
                          <div className="w-4 h-0.5 bg-void-700" />
                          <ChevronRight className="w-4 h-4 -ml-1 text-void-500" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Selected Node Details Box */}
            <div className="border-2 border-void-600 bg-void-900/95 p-4 space-y-2 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-void-700 pb-2">
                <div className="flex items-center gap-2">
                  <span className="sys-label text-brand-500">SELECTED NODE INSPECTOR:</span>
                  <span className="font-black text-white text-xs uppercase bg-void-800 border border-void-700 px-2 py-0.5">
                    {selectedNodeData.name} ({selectedNodeData.sub})
                  </span>
                </div>
                <span className="text-[10px] font-bold text-term-green font-mono">
                  {selectedNodeData.output}
                </span>
              </div>
              <p className="text-xs text-void-300 leading-relaxed">
                {selectedNodeData.desc}
              </p>
            </div>

            {/* Bottom Status & Trace Trigger Bar (Image 2 Bottom Bar) */}
            <div className="mt-4 pt-3 border-t-2 border-void-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-void-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 border border-void-500 bg-void-700" />
                  SIMULATOR_CORE_V1
                </span>
                <span className="text-void-600">|</span>
                <span className="text-void-400">GRAPH_DENSITY: 5_NODES</span>
                <span className="text-void-600">|</span>
                <span className="text-brand-500 font-bold">
                  {traceRunning ? `TRACING STEP [0${traceStep + 1}/05]...` : 'IDLE // READY'}
                </span>
              </div>

              <button
                onClick={runValidationTrace}
                disabled={traceRunning}
                className="px-4 py-2 border-2 border-term-green bg-term-green text-void-900 font-black text-xs uppercase tracking-wider hover:bg-void-900 hover:text-term-green transition-all shadow-[3px_3px_0px_0px_#00FF94] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Activity className={`w-3.5 h-3.5 ${traceRunning ? 'animate-spin' : ''}`} />
                <span>{traceRunning ? 'VALIDATING GRAPH TRACE...' : 'RUN_VALIDATION_TRACE'}</span>
              </button>
            </div>
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

        <div className="border-2 border-void-700 overflow-hidden text-xs">
          <table className="w-full text-left font-mono">
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
        <div className="flex items-center justify-between border-b-2 border-void-700 pb-3">
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
            className="text-xs font-bold text-brand-500 hover:underline flex items-center gap-1 uppercase tracking-wider"
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
