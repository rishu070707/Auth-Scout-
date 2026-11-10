import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGuideBySlug, fetchGuideByShareId } from '../api/client';
import { Guide } from '../types';
import { ComplexityBadge } from '../components/ComplexityBadge';
import { EvidenceBadge } from '../components/EvidenceBadge';
import {
  Shield,
  Clock,
  Hourglass,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Printer,
  ChevronRight,
  Terminal,
  FileText,
  Lock,
  ArrowLeft,
  Sparkles,
  UserCheck,
  Bot,
  Zap,
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
        <div className="h-10 w-48 border-2 border-void-700 bg-void-800 animate-pulse" />
        <div className="h-64 border-2 border-void-700 bg-void-800 animate-pulse" />
        <div className="h-96 border-2 border-void-700 bg-void-800 animate-pulse" />
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="border-2 border-void-600 bg-void-800 p-12 text-center max-w-lg mx-auto my-12 space-y-4">
        <AlertTriangle className="w-12 h-12 text-brand-500 mx-auto" />
        <h2 className="text-xl font-black font-mono text-white uppercase tracking-wider">Guide Not Found</h2>
        <p className="text-xs text-void-400 font-mono">{error || 'This guide does not exist in the database.'}</p>
        <Link
          to="/directory"
          className="btn-yellow inline-flex items-center gap-2 px-4 py-2 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to App Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-24">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col gap-3 border-b-2 border-void-700 pb-3 text-xs print:hidden sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2 overflow-hidden font-mono uppercase tracking-wider text-void-400">
          <Link to="/directory" className="hover:text-brand-500 transition-colors">Directory</Link>
          <ChevronRight className="w-3 h-3 text-void-600" />
          <span className="truncate text-brand-500 font-bold">{guide.applicationName}</span>
        </div>

        {/* Share & Export Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="btn-ghost px-3 py-1.5 text-xs flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-term-green" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share Permanent Link'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="btn-ghost px-3 py-1.5 text-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Guide Hero Card */}
      <section className="border-2 border-void-600 bg-void-800 p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-500" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 border-2 border-void-600 bg-void-900 p-2 flex items-center justify-center shrink-0">
              {guide.logo ? (
                <img src={guide.logo} alt={guide.applicationName} className="w-full h-full object-contain" />
              ) : (
                <span className="font-black text-2xl text-brand-500 font-mono">{guide.applicationName.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-black text-white font-mono uppercase tracking-tight">
                  {guide.applicationName}
                </h1>
                <ComplexityBadge complexity={guide.overview.overallDifficulty} />
              </div>
              <p className="text-xs text-void-400 font-mono mt-0.5">
                OAuth 2.0 Integration & Setup Intelligence Specification
              </p>
            </div>
          </div>

          {/* Research Confidence Indicator */}
          <div className="flex items-center gap-3 self-start md:self-auto border-2 border-void-600 bg-void-900 px-4 py-2">
            <div className="text-right">
              <div className="sys-label">Confidence</div>
              <div className="text-sm font-black font-mono text-term-green">
                {guide.confidence.score}% ({guide.confidence.level.toUpperCase()})
              </div>
            </div>
            <div className="w-8 h-8 border-2 border-term-green bg-term-green/10 flex items-center justify-center text-term-green">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2 pt-3 border-t-2 border-void-700">
          <div className="sys-label text-brand-500 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>Executive Summary</span>
          </div>
          <p className="text-sm text-void-100 font-mono leading-relaxed">
            {guide.overview.summary}
          </p>
          <div className="p-3 border-2 border-void-700 bg-void-900 text-xs font-mono text-void-300">
            <strong className="text-brand-500 uppercase tracking-wider block mb-1">Protocol Mechanics:</strong>
            {guide.overview.howOAuthWorks}
          </div>
        </div>

        {/* TIME & EFFORT SEPARATION: Active Developer Time vs Provider Approval Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-void-700">
          {/* Active Dev Time */}
          <div className="node-card p-4 space-y-2 relative">
            <div className="absolute top-0 left-0 w-1 bottom-0 bg-brand-500" />
            <div className="flex items-center justify-between">
              <div className="sys-label text-brand-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Active Developer Setup
              </div>
              <span className="text-sm font-black font-mono text-brand-500">
                {guide.timeEstimates.activeSetupMinutes.min}–{guide.timeEstimates.activeSetupMinutes.max} MINS
              </span>
            </div>
            <p className="text-xs text-void-400 font-mono leading-relaxed">
              {guide.timeEstimates.activeSetupExplanation}
            </p>
          </div>

          {/* External Approval Waiting Time */}
          <div className="node-card p-4 space-y-2 relative">
            <div className={`absolute top-0 left-0 w-1 bottom-0 ${guide.timeEstimates.approvalWaitingDays.max > 0 ? 'bg-brand-500' : 'bg-term-green'}`} />
            <div className="flex items-center justify-between">
              <div className="sys-label flex items-center gap-1.5 text-void-300">
                <Hourglass className="w-3.5 h-3.5" />
                External Approval Delay
              </div>
              <span className={`text-sm font-black font-mono ${guide.timeEstimates.approvalWaitingDays.max > 0 ? 'text-brand-500' : 'text-term-green'}`}>
                {guide.timeEstimates.approvalWaitingDays.max > 0
                  ? `${guide.timeEstimates.approvalWaitingDays.min}–${guide.timeEstimates.approvalWaitingDays.max} DAYS`
                  : '0 DAYS (INSTANT)'}
              </span>
            </div>
            <p className="text-xs text-void-400 font-mono leading-relaxed">
              {guide.timeEstimates.approvalWaitingExplanation}
            </p>
          </div>
        </div>
      </section>

      {/* COMPOSIO MANAGED OAUTH INTELLIGENCE BANNER */}
      <section className="border-2 border-brand-500 bg-void-800 p-6 space-y-4 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-void-700 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-500" strokeWidth={2.5} />
            <h2 className="text-base font-black font-mono text-white uppercase tracking-wide">
              Composio Managed OAuth Intelligence
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 border-2 border-brand-500 bg-brand-500 text-void-900 uppercase">
            {guide.composio.recommendedPath === 'managed' ? 'RECOMMENDED: MANAGED OAUTH' : 'RECOMMENDED: CUSTOM OAUTH'}
          </span>
        </div>

        <div className="p-4 border-2 border-void-700 bg-void-900 space-y-1">
          <div className="sys-label text-brand-500">
            Why this path is recommended:
          </div>
          <p className="text-xs text-void-200 font-mono leading-relaxed">
            {guide.composio.recommendationReason}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="border-2 border-void-700 bg-void-900 p-4 space-y-2">
            <div className="sys-label text-term-green">
              What Composio Manages:
            </div>
            <ul className="space-y-1 text-void-300">
              {guide.composio.whatComposioManages.length > 0 ? (
                guide.composio.whatComposioManages.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-term-green shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-void-500 italic">No automated managed credentials currently registered.</li>
              )}
            </ul>
          </div>

          <div className="border-2 border-void-700 bg-void-900 p-4 space-y-2">
            <div className="sys-label text-brand-500">
              What Developer Still Supplies:
            </div>
            <ul className="space-y-1 text-void-300">
              {guide.composio.whatDeveloperStillNeeds.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-500 shrink-0 mt-1.5"></span>
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
              className="inline-flex items-center gap-1.5 text-xs text-brand-500 hover:underline font-mono uppercase tracking-wider"
            >
              <span>Explore Composio Managed Auth Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </section>

      {/* Prerequisites Checklist */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-brand-500" />
          <h2 className="text-sm font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-500" />
            <span>Prerequisites Checklist</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {guide.prerequisites.map((prereq, idx) => (
            <div
              key={idx}
              className="p-3 border-2 border-void-700 bg-void-800 text-xs font-mono text-void-200 flex items-start gap-2.5"
            >
              <div className="w-5 h-5 border-2 border-brand-500 bg-brand-500/10 flex items-center justify-center shrink-0 mt-0.5 text-brand-500 font-mono text-[10px] font-black">
                {idx + 1}
              </div>
              <span className="leading-snug">{prereq}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Numbered Actionable Step-by-Step Instructions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-void-700 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-brand-500" />
            <h2 className="text-sm font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-500" />
              <span>Step-by-Step Setup Instructions</span>
            </h2>
          </div>
          <span className="text-xs text-void-500 font-mono uppercase">{guide.setupSteps.length} Actionable Steps</span>
        </div>

        <div className="space-y-4">
          {guide.setupSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="node-card p-5 space-y-3"
            >
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-void-700 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-brand-500 text-void-900 font-mono font-black text-xs flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-black text-void-50 text-sm font-mono uppercase tracking-wide">
                    {step.title}
                  </h3>
                </div>
                {step.portalLink && (
                  <a
                    href={step.portalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-500 hover:underline font-mono uppercase self-start sm:self-auto"
                  >
                    <span>Developer Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <p className="text-xs text-void-400 font-mono leading-relaxed">
                {step.explanation}
              </p>

              {/* Exact Action Box */}
              <div className="p-3 border-2 border-void-700 bg-void-900 font-mono text-xs text-term-green space-y-1">
                <div className="sys-label text-void-500">Exact Action:</div>
                <div className="text-void-100">{step.exactAction}</div>
              </div>

              {/* Expected Result & Common Mistakes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="space-y-1">
                  <span className="sys-label">Expected Result:</span>
                  <p className="text-void-300 text-[11px]">{step.expectedResult}</p>
                </div>

                {step.commonMistakes && step.commonMistakes.length > 0 && (
                  <div className="space-y-1">
                    <span className="sys-label text-term-red flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-term-red" />
                      <span>Common Mistakes:</span>
                    </span>
                    <ul className="list-disc list-inside text-term-red/90 text-[11px] space-y-0.5">
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
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-brand-500" />
          <h2 className="text-sm font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-500" />
            <span>OAuth Configuration Specification</span>
          </h2>
        </div>

        <div className="border-2 border-void-700 bg-void-800 p-5 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="sys-label">Authorization Endpoint</span>
              <div className="p-2.5 border-2 border-void-600 bg-void-900 text-brand-500 truncate select-all">
                {guide.oauthConfiguration.authorizationEndpoint || 'Standard Auth URL'}
              </div>
            </div>

            <div className="space-y-1">
              <span className="sys-label">Token Endpoint</span>
              <div className="p-2.5 border-2 border-void-600 bg-void-900 text-brand-500 truncate select-all">
                {guide.oauthConfiguration.tokenEndpoint || 'Standard Token URL'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="sys-label">Redirect URI Example</span>
              <div className="p-2.5 border-2 border-void-600 bg-void-900 text-void-300 truncate">
                {guide.oauthConfiguration.redirectUriExample}
              </div>
            </div>

            <div className="space-y-1">
              <span className="sys-label">PKCE Support</span>
              <div className="p-2.5 border-2 border-void-600 bg-void-900 text-void-100 font-bold">
                {guide.oauthConfiguration.pkceSupported ? 'ENABLED (S256 RECOMMENDED)' : 'CLIENT SECRET EXCHANGE FLOW'}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="sys-label">Token Refresh & Expiration Lifecycle</span>
            <div className="p-2.5 border-2 border-void-600 bg-void-900 text-void-300 leading-relaxed">
              {guide.oauthConfiguration.tokenRefresh}
            </div>
          </div>
        </div>
      </section>

      {/* Scopes & Permissions Table */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-brand-500" />
          <h2 className="text-sm font-black text-white font-mono uppercase tracking-wider">
            Requested Permissions & Scopes
          </h2>
        </div>
        <div className="overflow-x-auto border-2 border-void-700">
          <table className="w-full min-w-[680px] text-left text-xs font-mono">
            <thead className="bg-void-900 text-void-400 border-b-2 border-void-700 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Scope Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Sensitivity</th>
                <th className="p-3">Triggers Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-void-700 bg-void-800">
              {guide.scopes.map((s, idx) => (
                <tr key={idx} className="hover:bg-void-700/50">
                  <td className="p-3 text-brand-500 font-bold">{s.name}</td>
                  <td className="p-3 text-void-200">{s.description}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 border text-[9px] uppercase font-black ${
                      s.sensitivity === 'Restricted'
                        ? 'border-term-red text-term-red bg-term-red/10'
                        : s.sensitivity === 'Sensitive'
                        ? 'border-brand-500 text-brand-500 bg-brand-500/10'
                        : 'border-term-green text-term-green bg-term-green/10'
                    }`}>
                      {s.sensitivity}
                    </span>
                  </td>
                  <td className="p-3">
                    {s.triggersReview ? (
                      <span className="text-brand-500 flex items-center gap-1 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>YES</span>
                      </span>
                    ) : (
                      <span className="text-void-500">NO</span>
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
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-brand-500" />
          <h2 className="text-sm font-black text-white font-mono uppercase tracking-wider">
            Approval & Verification Policy
          </h2>
        </div>
        <div className="p-5 border-2 border-void-700 bg-void-800 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="sys-label text-brand-500">
                Verification Triggers:
              </span>
              <ul className="space-y-1 text-void-300">
                {guide.verificationRequirements.verificationTriggers.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="sys-label text-term-green">
                Required Verification Documents:
              </span>
              <ul className="space-y-1 text-void-300">
                {guide.verificationRequirements.requiredDocuments.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-term-green shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t-2 border-void-700 space-y-1">
            <span className="sys-label">
              Approval Distinction (Platform Review vs Workspace Consent):
            </span>
            <p className="text-void-200 leading-relaxed text-xs">
              {guide.verificationRequirements.approvalDistinction}
            </p>
          </div>
        </div>
      </section>

      {/* Common Blockers & Solutions */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-term-red" />
          <h2 className="text-sm font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-term-red" />
            <span>Common Integration Blockers</span>
          </h2>
        </div>

        <div className="space-y-3">
          {guide.blockers.map((b, idx) => (
            <div key={idx} className="p-4 border-2 border-void-700 bg-void-800 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between border-b border-void-700 pb-2">
                <h4 className="font-black text-term-red text-sm uppercase">{b.issue}</h4>
                {b.agentCanHelp && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-brand-500 bg-brand-500/10 text-brand-500 text-[10px] uppercase font-bold">
                    <Sparkles className="w-3 h-3 text-brand-500" />
                    <span>AI Agent Assisted</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <span className="sys-label">Why it happens:</span>
                  <p className="text-void-300 text-[11px]">{b.whyItHappens}</p>
                </div>
                <div className="space-y-1">
                  <span className="sys-label">How to identify:</span>
                  <p className="text-void-300 text-[11px]">{b.howToIdentify}</p>
                </div>
              </div>

              <div className="p-2.5 border-2 border-void-700 bg-void-900 text-[11px]">
                <strong className="sys-label text-term-green block mb-0.5">How to resolve:</strong>
                <span className="text-void-100">{b.howToFix}</span>
                {b.agentHelpDetails && (
                  <p className="mt-1 text-brand-500 text-[10px]">
                    AGENT NOTE: {b.agentHelpDetails}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agent vs Developer Responsibilities Matrix */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-brand-500" />
          <h2 className="text-sm font-black text-white font-mono uppercase tracking-wider">
            Agent versus Developer Responsibilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Agent Responsibilities */}
          <div className="p-5 border-2 border-brand-500 bg-brand-500/5 space-y-3">
            <div className="flex items-center gap-2 text-brand-500 font-black text-xs font-mono uppercase tracking-wider border-b border-brand-500/30 pb-2">
              <Bot className="w-4 h-4" />
              <span>AI Agent Can Automate:</span>
            </div>
            <ul className="space-y-2 text-xs font-mono text-void-200">
              {guide.agentResponsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Responsibilities */}
          <div className="p-5 border-2 border-void-600 bg-void-800 space-y-3">
            <div className="flex items-center gap-2 text-void-200 font-black text-xs font-mono uppercase tracking-wider border-b border-void-700 pb-2">
              <UserCheck className="w-4 h-4" />
              <span>Developer Must Complete (Human):</span>
            </div>
            <ul className="space-y-2 text-xs font-mono text-void-400">
              {guide.developerResponsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-void-400 shrink-0 mt-1.5"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Evidence & Trust Verification Matrix */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b-2 border-void-700 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-term-green" />
            <h2 className="text-sm font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-term-green" />
              <span>Evidence & Trust Verification Matrix</span>
            </h2>
          </div>
          <span className="text-xs text-void-500 font-mono uppercase">{guide.evidenceMatrix.length} Verified Claims</span>
        </div>

        <div className="overflow-x-auto border-2 border-void-700">
          <table className="w-full min-w-[640px] text-left text-xs font-mono">
            <thead className="bg-void-900 text-void-400 border-b-2 border-void-700 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Claim & Value</th>
                <th className="p-3">Evidence Status</th>
                <th className="p-3">Official Source Citation</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-void-700 bg-void-800">
              {guide.evidenceMatrix.map((ev, idx) => (
                <tr key={idx} className="hover:bg-void-700/50">
                  <td className="p-3 max-w-sm">
                    <div className="font-bold text-void-100 uppercase">{ev.claim}</div>
                    <div className="text-void-400 text-[11px] mt-0.5">{ev.value}</div>
                    {ev.supportingExcerpt && (
                      <blockquote className="mt-1 pl-2 border-l-2 border-brand-500 text-[10px] text-brand-500/90 italic">
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
                      className="text-brand-500 hover:underline flex items-center gap-1 text-xs"
                    >
                      <span className="truncate">{ev.sourceTitle}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <div className="text-[10px] text-void-500 mt-0.5">
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
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-brand-500" />
          <h2 className="text-sm font-black text-white font-mono uppercase tracking-wider">
            Official Documentation Sources
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          {guide.sources.map((src, idx) => (
            <a
              key={idx}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 border-2 border-void-700 bg-void-800 hover:border-brand-500 transition-colors flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="font-bold text-void-100 group-hover:text-brand-500 transition-colors uppercase">
                  {src.title}
                </div>
                <div className="text-[11px] text-void-500">{src.domain}</div>
                <div className="text-[11px] text-void-300">{src.supports}</div>
              </div>
              <ExternalLink className="w-4 h-4 text-void-500 group-hover:text-brand-500 shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
