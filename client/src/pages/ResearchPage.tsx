import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { startResearch, fetchResearchJob } from '../api/client';
import { ResearchJob, ResearchProgressEvent } from '../types';
import {
  Zap,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Terminal,
  Shield,
  RefreshCw,
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
  const logRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const STAGES = [
    { title: 'Application Discovery', desc: 'Identify official developer portal & website', code: 'DISC' },
    { title: 'OAuth Research',        desc: 'Extract endpoints, flows, tokens & scopes',    code: 'OAUTH' },
    { title: 'Approval Intelligence', desc: 'Determine review barriers & waiting timelines', code: 'APPR' },
    { title: 'Setup Exploration',     desc: 'Map registration forms & portal steps',         code: 'SETUP' },
    { title: 'Evidence Verification', desc: 'Validate claims & calculate confidence',         code: 'VERF' },
    { title: 'Guide Generation',      desc: 'Synthesize Composio intelligence & guide',      code: 'GEN' },
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

  useEffect(() => {
    if (!jobId) return;
    if (eventSourceRef.current) eventSourceRef.current.close();

    const sse = new EventSource(`/api/research/${jobId}/stream`);
    eventSourceRef.current = sse;

    sse.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'COMPLETE') {
          setLoading(false);
          fetchResearchJob(jobId).then(setJob);
          sse.close();
        } else if (data.type === 'ERROR') {
          setError(data.error);
          setLoading(false);
          sse.close();
        } else {
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
            return { ...prev, currentStage: progressEv.stage, progressEvents: [...prev.progressEvents, progressEv] };
          });
          setTimeout(() => { logRef.current?.scrollTo({ top: 99999, behavior: 'smooth' }); }, 50);
        }
      } catch (err) {
        console.error('SSE parse error:', err);
      }
    };

    sse.onerror = () => {
      fetchResearchJob(jobId).then((j) => {
        setJob(j);
        if (j.status === 'completed' || j.status === 'failed') {
          setLoading(false);
          sse.close();
        }
      });
    };

    return () => { sse.close(); };
  }, [jobId]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">

      {/* Page Header */}
      <div className="border-b-2 border-void-700 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 bg-brand-500" />
          <div className="inline-flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold text-brand-500 uppercase tracking-widest bg-brand-500/10 border border-brand-500/40 px-2 py-0.5">
              Autonomous AI Integration Investigator
            </span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-black font-mono text-white uppercase tracking-tight pl-3">
          AI OAuth Research Workspace
        </h1>
        <p className="text-xs text-void-500 font-mono pl-3 mt-1 leading-relaxed max-w-2xl">
          Submit any unfamiliar SaaS application or platform. The autonomous multi-agent pipeline navigates
          developer documentation, extracts OAuth 2.0 endpoints, models verification constraints, and
          generates an actionable setup guide with real source citations.
        </p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleStartResearch}
        className="border-2 border-void-600 bg-void-800 p-6 space-y-4"
      >
        {/* Form title bar */}
        <div className="flex items-center gap-2 border-b-2 border-void-700 pb-3 mb-4">
          <Terminal className="w-4 h-4 text-brand-500" />
          <span className="sys-label text-brand-500">New Investigation Job</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="sys-label block">Application Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Airtable, HubSpot, Asana"
              disabled={loading}
              className="w-full bg-void-900 border-2 border-void-600 px-3.5 py-2.5 text-xs font-mono text-void-100 placeholder:text-void-500 focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-50"
            />
          </div>
          <div className="space-y-1.5">
            <label className="sys-label block">Official Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://airtable.com"
              disabled={loading}
              className="w-full bg-void-900 border-2 border-void-600 px-3.5 py-2.5 text-xs font-mono text-void-100 placeholder:text-void-500 focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 border-2 border-term-red bg-term-red/10 text-term-red text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-[11px] text-void-500 font-mono hidden sm:block">
            Protected with SSRF validation & domain boundary enforcement
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-yellow px-5 py-2.5 text-xs flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Investigating Provider...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" strokeWidth={3} />
                <span>Start AI Investigation</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggested examples */}
      {!job && (
        <div className="border-2 border-void-700 bg-void-800 p-4 space-y-2">
          <span className="sys-label block mb-2">Try an unfamiliar application:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { n: 'Airtable',    w: 'https://airtable.com' },
              { n: 'HubSpot',     w: 'https://hubspot.com' },
              { n: 'Asana',       w: 'https://asana.com' },
              { n: 'Salesforce',  w: 'https://salesforce.com' },
            ].map((ex) => (
              <button
                key={ex.n}
                onClick={() => { setName(ex.n); setWebsite(ex.w); }}
                className="btn-ghost px-3 py-1.5 text-xs"
              >
                {ex.n}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Agent Pipeline */}
      {job && (
        <div className="space-y-5">
          <div className="border-2 border-void-600 bg-void-800 overflow-hidden">
            {/* Pipeline header */}
            <div className="border-b-2 border-void-700 px-5 py-3 flex items-center justify-between bg-void-900">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-term-green animate-pulse" />
                <span className="font-mono font-black text-white text-sm uppercase tracking-wider">
                  Live Agent Pipeline: {job.applicationName}
                </span>
              </div>
              <span className="text-[10px] font-mono text-void-500 border-2 border-void-600 px-2 py-0.5">
                JOB: {job.jobId.slice(-8).toUpperCase()}
              </span>
            </div>

            <div className="p-5 space-y-5">
              {/* Stage grid — image 2 node style */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {STAGES.map((s, idx) => {
                  const stageEvents = job.progressEvents.filter((e) => e.stage === s.title);
                  const lastEvent = stageEvents[stageEvents.length - 1];
                  const isRunning = lastEvent?.status === 'running';
                  const isDone = lastEvent?.status === 'completed';
                  const isHuman = lastEvent?.status === 'needs_human';

                  return (
                    <div
                      key={idx}
                      className={`border-2 p-3 transition-all ${
                        isRunning
                          ? 'border-brand-500 bg-brand-500/5'
                          : isDone
                          ? 'border-term-green bg-term-green/5'
                          : isHuman
                          ? 'border-brand-600 bg-brand-500/5'
                          : 'border-void-700 bg-void-900 opacity-50'
                      }`}
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono font-black uppercase tracking-widest text-void-500">
                          {s.code}_NODE
                        </span>
                        {isRunning && (
                          <span className="text-[9px] font-mono text-brand-500 animate-pulse">RUNNING...</span>
                        )}
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-term-green" />}
                        {isHuman && (
                          <span className="text-[9px] font-mono text-brand-500">REVIEW_DELAY</span>
                        )}
                      </div>
                      <div className="font-mono font-black text-void-50 text-xs uppercase tracking-wide">
                        {s.title}
                      </div>
                      <div className="text-[11px] text-void-500 font-mono mt-0.5">{s.desc}</div>
                    </div>
                  );
                })}
              </div>

              {/* Terminal log */}
              <div className="space-y-1.5">
                <div className="sys-label flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-brand-500" />
                  Agent Execution Stream
                </div>
                <div
                  ref={logRef}
                  className="terminal-block p-4 space-y-1.5 max-h-56 overflow-y-auto"
                >
                  {job.progressEvents.map((ev, i) => (
                    <div key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-void-500 shrink-0 text-[11px]">
                        [{new Date(ev.timestamp).toLocaleTimeString()}]
                      </span>
                      <span className={`text-[11px] ${
                        ev.status === 'completed'   ? 'text-term-green'  :
                        ev.status === 'running'     ? 'text-brand-500'   :
                        ev.status === 'needs_human' ? 'text-brand-600'   :
                        'text-void-300'
                      }`}>
                        {ev.status === 'completed'   && '[✓] '}
                        {ev.status === 'running'     && '[→] '}
                        {ev.status === 'needs_human' && '[!] '}
                        {ev.message}
                      </span>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-center gap-2 text-brand-500 text-[11px]">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Discovered Sources */}
              {job.discoveredSources && job.discoveredSources.length > 0 && (
                <div className="space-y-1.5">
                  <div className="sys-label">
                    Discovered Sources ({job.discoveredSources.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {job.discoveredSources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-void-700 bg-void-900 hover:border-brand-500 p-2.5 text-xs font-mono text-void-300 hover:text-brand-500 flex items-center justify-between gap-2 transition-all"
                      >
                        <span className="truncate">{src.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Guide Ready */}
              {job.status === 'completed' && job.findings && (
                <div className="border-2 border-term-green bg-term-green/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="font-black font-mono text-white text-sm uppercase flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-term-green" />
                      Integration Intelligence Report Generated
                    </div>
                    <p className="text-xs text-void-300 font-mono">
                      Confidence: {job.findings.confidence?.score}% • Ready to review and share.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/guides/${job.findings?.slug}`)}
                    className="btn-yellow px-5 py-2.5 text-xs flex items-center gap-2 shrink-0"
                  >
                    <span>View Full OAuth Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
