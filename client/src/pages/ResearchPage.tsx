import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { startResearch, fetchResearchJob } from '../api/client';
import { ResearchJob, ResearchProgressEvent, SourceCitation } from '../types';
import {
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Terminal,
  ShieldCheck,
  RefreshCw,
  Globe
} from 'lucide-react';

export const ResearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [name, setName] = useState(searchParams.get('name') || '');
  const [website, setWebsite] = useState(searchParams.get('website') || '');
  const [jobId, setJobId] = useState<string | null>(null);
  const [job, setJob] = useState<ResearchJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);

  const STAGES = [
    { title: 'Application Discovery', desc: 'Identify official developer portal & website' },
    { title: 'OAuth Research', desc: 'Extract endpoints, flows, tokens & scopes' },
    { title: 'Approval Intelligence', desc: 'Determine review barriers & waiting timelines' },
    { title: 'Setup Exploration', desc: 'Map registration forms & portal steps' },
    { title: 'Evidence Verification', desc: 'Validate claims & calculate confidence' },
    { title: 'Guide Generation', desc: 'Synthesize Composio intelligence & guide' }
  ];

  const handleStartResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !website.trim()) {
      setError('Please provide both the application name and official website URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setJob(null);

    try {
      const res = await startResearch(name.trim(), website.trim());
      setJobId(res.jobId);
    } catch (err: any) {
      setError(err.message || 'Failed to start research job');
      setLoading(false);
    }
  };

  // Connect to SSE stream whenever jobId changes
  useEffect(() => {
    if (!jobId) return;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const sse = new EventSource(`/api/research/${jobId}/stream`);
    eventSourceRef.current = sse;

    sse.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'COMPLETE') {
          setLoading(false);
          // Refetch final job state
          fetchResearchJob(jobId).then(setJob);
          sse.close();
        } else if (data.type === 'ERROR') {
          setError(data.error);
          setLoading(false);
          sse.close();
        } else {
          // Progress Event
          const progressEv = data as ResearchProgressEvent;
          setJob((prev) => {
            if (!prev) {
              return {
                jobId,
                applicationName: name,
                website,
                status: 'running',
                currentStage: progressEv.stage,
                progressEvents: [progressEv],
                discoveredSources: [],
                startedAt: new Date().toISOString()
              };
            }
            return {
              ...prev,
              currentStage: progressEv.stage,
              progressEvents: [...prev.progressEvents, progressEv]
            };
          });
        }
      } catch (err) {
        console.error('SSE parse error:', err);
      }
    };

    sse.onerror = () => {
      // Poll fallback if SSE drops
      fetchResearchJob(jobId).then((j) => {
        setJob(j);
        if (j.status === 'completed' || j.status === 'failed') {
          setLoading(false);
          sse.close();
        }
      });
    };

    return () => {
      sse.close();
    };
  }, [jobId]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Autonomous AI Integration Investigator</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          AI OAuth Research Workspace
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          Submit any unfamiliar SaaS application or platform. The autonomous multi-agent pipeline navigates developer documentation, extracts OAuth 2.0 endpoints, models verification constraints, and generates an actionable setup guide with real source citations.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleStartResearch} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-medium">
              Application Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Airtable, Hubspot, Asana"
              disabled={loading}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-medium">
              Official Website URL
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://airtable.com"
              disabled={loading}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
            Protected with SSRF validation & domain boundary enforcement
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50 shadow-md shadow-indigo-600/20"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Investigating Provider...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span>Start AI Investigation</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggested Unfamiliar Applications */}
      {!job && (
        <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/60 text-xs space-y-2">
          <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
            Try an unfamiliar application example:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { n: 'Airtable', w: 'https://airtable.com' },
              { n: 'HubSpot', w: 'https://hubspot.com' },
              { n: 'Asana', w: 'https://asana.com' },
              { n: 'Salesforce', w: 'https://salesforce.com' }
            ].map((ex) => (
              <button
                key={ex.n}
                onClick={() => {
                  setName(ex.n);
                  setWebsite(ex.w);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-mono text-xs transition-colors"
              >
                {ex.n} ({ex.w})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Agent Execution Pipeline Panel */}
      {job && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="font-bold text-white text-base font-sans">
                  Live Agent Pipeline: {job.applicationName}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Job ID: {job.jobId}
              </span>
            </div>

            {/* Stages Stepper */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {STAGES.map((s, idx) => {
                const stageEvents = job.progressEvents.filter((e) => e.stage === s.title);
                const lastEvent = stageEvents[stageEvents.length - 1];
                const isRunning = lastEvent?.status === 'running';
                const isDone = lastEvent?.status === 'completed';
                const isHuman = lastEvent?.status === 'needs_human';
                const isFailed = lastEvent?.status === 'failed';

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isRunning
                        ? 'bg-indigo-950/40 border-indigo-500/60 shadow-sm shadow-indigo-500/10'
                        : isDone
                        ? 'bg-slate-950/80 border-emerald-500/30'
                        : isHuman
                        ? 'bg-amber-950/30 border-amber-500/40'
                        : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase">
                        Stage {idx + 1}
                      </span>
                      {isRunning && <span className="text-[10px] font-mono text-indigo-400 animate-pulse">Running...</span>}
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {isHuman && <span className="text-[10px] font-mono text-amber-400">Review Delay</span>}
                    </div>
                    <div className="font-semibold text-slate-200 text-xs">{s.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{s.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* Terminal Live Activity Log */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Agent Execution Stream</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 max-h-64 overflow-y-auto">
                {job.progressEvents.map((ev, i) => (
                  <div key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-400 shrink-0">
                      [{new Date(ev.timestamp).toLocaleTimeString()}]
                    </span>
                    <span className={
                      ev.status === 'completed'
                        ? 'text-emerald-400'
                        : ev.status === 'running'
                        ? 'text-indigo-400'
                        : ev.status === 'needs_human'
                        ? 'text-amber-400'
                        : 'text-slate-300'
                    }>
                      {ev.status === 'completed' && '[✓] '}
                      {ev.status === 'running' && '[→] '}
                      {ev.status === 'needs_human' && '[!] '}
                      {ev.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Discovered Sources */}
            {job.discoveredSources && job.discoveredSources.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Discovered Sources ({job.discoveredSources.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {job.discoveredSources.map((src, i) => (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-indigo-300 flex items-center justify-between gap-2"
                    >
                      <span className="truncate">{src.title}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Guide Ready Action */}
            {job.status === 'completed' && job.findings && (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Integration Intelligence Report Generated</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Confidence: {job.findings.confidence?.score}% • Ready to review and share.
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/guides/${job.findings?.slug}`)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0 shadow-md shadow-emerald-600/20"
                >
                  <span>View Full OAuth Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
