import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGuideBySlug, fetchGuideByShareId } from '../api/client';
import { Guide, EvidenceStatus } from '../types';
import { ComplexityBadge } from '../components/ComplexityBadge';
import { EvidenceBadge } from '../components/EvidenceBadge';
import {
  ShieldCheck,
  Clock,
  Hourglass,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Share2,
  Printer,
  ChevronRight,
  Info,
  Terminal,
  FileText,
  Lock,
  ArrowLeft,
  Sparkles,
  UserCheck,
  Bot
} from 'lucide-react';

export const GuidePage: React.FC = () => {
  const { slug, shareId } = useParams<{ slug?: string; shareId?: string }>();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        let data: Guide;
        if (shareId) {
          data = await fetchGuideByShareId(shareId);
        } else if (slug) {
          data = await fetchGuideBySlug(slug);
        } else {
          throw new Error('No guide identifier provided');
        }
        setGuide(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load OAuth guide');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, shareId]);

  const handleCopyLink = () => {
    if (!guide) return;
    const shareUrl = `${window.location.origin}/guides/share/${guide.shareId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto py-8">
        <div className="h-10 w-48 bg-slate-800 rounded animate-pulse"></div>
        <div className="h-64 bg-slate-900/60 rounded-xl border border-slate-800 animate-pulse"></div>
        <div className="h-96 bg-slate-900/60 rounded-xl border border-slate-800 animate-pulse"></div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 max-w-lg mx-auto my-12 space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Guide Not Found</h2>
        <p className="text-xs text-slate-400">{error || 'This guide does not exist in the database.'}</p>
        <Link
          to="/directory"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to App Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-24">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs print:hidden">
        <div className="flex items-center gap-2 text-slate-400 font-mono">
          <Link to="/directory" className="hover:text-slate-200">Directory</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-200">{guide.applicationName}</span>
        </div>

        {/* Share & Export Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Link Copied!' : 'Share Permanent Link'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Guide Hero Card */}
      <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700/60 p-2 flex items-center justify-center shrink-0">
              {guide.logo ? (
                <img src={guide.logo} alt={guide.applicationName} className="w-full h-full object-contain" />
              ) : (
                <span className="font-bold text-xl text-slate-200 font-mono">{guide.applicationName.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {guide.applicationName}
                </h1>
                <ComplexityBadge complexity={guide.overview.overallDifficulty} />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                OAuth 2.0 Integration & Setup Intelligence
              </p>
            </div>
          </div>

          {/* Research Confidence Indicator */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xl">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Confidence</div>
              <div className="text-sm font-bold font-mono text-emerald-400">
                {guide.confidence.score}% ({guide.confidence.level})
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3 pt-2 border-t border-slate-800/80">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Executive Summary</span>
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {guide.overview.summary}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300 font-mono">Protocol Mechanics: </strong>
            {guide.overview.howOAuthWorks}
          </p>
        </div>

        {/* TIME & EFFORT SEPARATION: Active Developer Time vs Provider Approval Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          {/* Active Dev Time */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 font-mono uppercase tracking-wider">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Active Developer Setup Time</span>
              </div>
              <span className="text-sm font-bold font-mono text-indigo-400">
                {guide.timeEstimates.activeSetupMinutes.min} – {guide.timeEstimates.activeSetupMinutes.max} mins
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {guide.timeEstimates.activeSetupExplanation}
            </p>
          </div>

          {/* External Approval Waiting Time */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 font-mono uppercase tracking-wider">
                <Hourglass className="w-4 h-4 text-amber-400" />
                <span>Provider Approval Waiting Time</span>
              </div>
              <span className={`text-sm font-bold font-mono ${guide.timeEstimates.approvalWaitingDays.max > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {guide.timeEstimates.approvalWaitingDays.max > 0
                  ? `${guide.timeEstimates.approvalWaitingDays.min} – ${guide.timeEstimates.approvalWaitingDays.max} days`
                  : '0 days (Instant)'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {guide.timeEstimates.approvalWaitingExplanation}
            </p>
          </div>
        </div>
      </section>

      {/* COMPOSIO MANAGED OAUTH INTELLIGENCE BANNER */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/30 border border-indigo-500/40 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Composio Managed OAuth Intelligence</h2>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 self-start sm:self-auto">
            Recommendation: {guide.composio.recommendedPath === 'managed' ? 'Use Managed OAuth' : 'Configure Custom OAuth'}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20 space-y-2">
          <div className="text-xs font-semibold text-indigo-300 font-mono uppercase tracking-wider">
            Why this path is recommended:
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {guide.composio.recommendationReason}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="text-slate-400 font-mono uppercase tracking-wider text-[11px] font-semibold">
              What Composio Manages:
            </div>
            <ul className="space-y-1 text-slate-300">
              {guide.composio.whatComposioManages.length > 0 ? (
                guide.composio.whatComposioManages.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-400 italic">No automated managed credentials currently registered.</li>
              )}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-slate-400 font-mono uppercase tracking-wider text-[11px] font-semibold">
              What Developer Still Supplies:
            </div>
            <ul className="space-y-1 text-slate-300">
              {guide.composio.whatDeveloperStillNeeds.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {guide.composio.composioDocsUrl && (
          <div className="pt-2 flex justify-end">
            <a
              href={guide.composio.composioDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-mono"
            >
              <span>Explore Composio Managed Auth Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </section>

      {/* Prerequisites Checklist */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-indigo-400" />
          <span>Prerequisites Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {guide.prerequisites.map((prereq, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
            >
              <div className="w-4 h-4 rounded bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400 font-mono text-[10px]">
                {idx + 1}
              </div>
              <span className="leading-snug">{prereq}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Numbered Actionable Step-by-Step Instructions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Step-by-Step Setup Instructions</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">{guide.setupSteps.length} Actionable Steps</span>
        </div>

        <div className="space-y-4">
          {guide.setupSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3"
            >
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-semibold text-slate-100 text-sm">
                    {step.title}
                  </h3>
                </div>
                {step.portalLink && (
                  <a
                    href={step.portalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-mono self-start sm:self-auto"
                  >
                    <span>Open Developer Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pl-10">
                {step.explanation}
              </p>

              {/* Exact Action Box */}
              <div className="ml-10 p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs text-emerald-400 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Exact Action:</div>
                <div className="font-sans text-slate-200">{step.exactAction}</div>
              </div>

              {/* Expected Result & Common Mistakes */}
              <div className="ml-10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
                    Expected Result:
                  </span>
                  <p className="text-slate-300 text-[11px]">{step.expectedResult}</p>
                </div>

                {step.commonMistakes && step.commonMistakes.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] text-rose-400 font-mono uppercase tracking-wider font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Common Mistakes:</span>
                    </span>
                    <ul className="list-disc list-inside text-rose-300/90 text-[11px] space-y-0.5">
                      {step.commonMistakes.map((m, mi) => (
                        <li key={mi}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OAuth Configuration Matrix */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>OAuth Configuration Specification</span>
        </h2>

        <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-5 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider">Authorization Endpoint</span>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 text-indigo-300 truncate select-all">
                {guide.oauthConfiguration.authorizationEndpoint || 'Standard Auth URL'}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider">Token Endpoint</span>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 text-indigo-300 truncate select-all">
                {guide.oauthConfiguration.tokenEndpoint || 'Standard Token URL'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider">Redirect URI Example</span>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 text-slate-300 truncate">
                {guide.oauthConfiguration.redirectUriExample}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider">PKCE Support</span>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 text-slate-200">
                {guide.oauthConfiguration.pkceSupported ? 'Enabled (S256 Recommended)' : 'Client Secret Exchange Flow'}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider">Token Refresh & Expiration Lifecycle</span>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 text-slate-300 font-sans leading-relaxed">
              {guide.oauthConfiguration.tokenRefresh}
            </div>
          </div>
        </div>
      </section>

      {/* Scopes & Permissions Table */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          Requested Permissions & Scopes
        </h2>
        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 text-[11px] uppercase">
              <tr>
                <th className="p-3">Scope Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Sensitivity</th>
                <th className="p-3">Triggers Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/40">
              {guide.scopes.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-900/30">
                  <td className="p-3 text-indigo-300 font-semibold">{s.name}</td>
                  <td className="p-3 text-slate-300 font-sans">{s.description}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      s.sensitivity === 'Restricted'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : s.sensitivity === 'Sensitive'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {s.sensitivity}
                    </span>
                  </td>
                  <td className="p-3">
                    {s.triggersReview ? (
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Yes</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Approval & Verification Nuances */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          Approval & Verification Policy
        </h2>
        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
                Verification Triggers:
              </span>
              <ul className="space-y-1 text-slate-300">
                {guide.verificationRequirements.verificationTriggers.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
                Required Verification Documents:
              </span>
              <ul className="space-y-1 text-slate-300">
                {guide.verificationRequirements.requiredDocuments.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-1">
            <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
              Approval Distinction (Platform Review vs Workspace Consent):
            </span>
            <p className="text-slate-300 leading-relaxed font-sans text-xs">
              {guide.verificationRequirements.approvalDistinction}
            </p>
          </div>
        </div>
      </section>

      {/* Common Blockers & Solutions */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Common Integration Blockers</span>
        </h2>

        <div className="space-y-3">
          {guide.blockers.map((b, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-rose-300 text-sm font-sans">{b.issue}</h4>
                {b.agentCanHelp && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>AI Agent Assisted</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">Why it happens:</span>
                  <p className="text-slate-300 text-[11px]">{b.whyItHappens}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">How to identify:</span>
                  <p className="text-slate-300 text-[11px]">{b.howToIdentify}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-emerald-400">
                <strong className="font-mono uppercase text-[10px] text-slate-400 block mb-0.5">How to resolve:</strong>
                <span className="font-sans text-slate-200">{b.howToFix}</span>
                {b.agentHelpDetails && (
                  <p className="mt-1 text-indigo-300 font-mono text-[10px]">
                    Tip: {b.agentHelpDetails}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agent vs Developer Responsibilities Matrix */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          Agent versus Developer Responsibilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Agent Responsibilities */}
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs font-mono uppercase tracking-wider">
              <Bot className="w-4 h-4" />
              <span>AI Agent Can Automate:</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {guide.agentResponsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Legal / Account Responsibilities */}
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs font-mono uppercase tracking-wider">
              <UserCheck className="w-4 h-4" />
              <span>Developer Must Complete (Human):</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {guide.developerResponsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Evidence & Trust Verification Matrix */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Evidence & Trust Verification Matrix</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">{guide.evidenceMatrix.length} Verified Claims</span>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 text-[11px] uppercase">
              <tr>
                <th className="p-3">Claim & Value</th>
                <th className="p-3">Evidence Status</th>
                <th className="p-3">Official Source Citation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/40">
              {guide.evidenceMatrix.map((ev, idx) => (
                <tr key={idx} className="hover:bg-slate-900/30">
                  <td className="p-3 max-w-sm">
                    <div className="font-semibold text-slate-200 font-sans">{ev.claim}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{ev.value}</div>
                    {ev.supportingExcerpt && (
                      <blockquote className="mt-1 pl-2 border-l-2 border-slate-700 text-[10px] text-slate-400 italic">
                        "{ev.supportingExcerpt}"
                      </blockquote>
                    )}
                  </td>
                  <td className="p-3">
                    <EvidenceBadge status={ev.status} />
                  </td>
                  <td className="p-3 max-w-xs">
                    <a
                      href={ev.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-sans text-xs"
                    >
                      <span>{ev.sourceTitle}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      Checked: {new Date(ev.retrievedAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Discovered Official Sources */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          Official Documentation Sources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {guide.sources.map((src, idx) => (
            <a
              key={idx}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                  {src.title}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">{src.domain}</div>
                <div className="text-[11px] text-slate-400">{src.supports}</div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
