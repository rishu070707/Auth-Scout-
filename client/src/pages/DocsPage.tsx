import React from 'react';
import { ShieldCheck, Lock, ExternalLink, Sparkles, Key, FileCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DocsPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-24 text-slate-200">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          AuthScout Documentation & Engineering Architecture
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
          Comprehensive reference on OAuth 2.0 authorization architectures for AI agents, security assessment tiers (CASA), and Composio Managed Auth mechanisms.
        </p>
      </div>

      {/* Managed vs Custom OAuth Comparison */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>Composio Managed OAuth vs. Custom OAuth</span>
        </h2>
        <div className="rounded-xl border border-slate-800 overflow-hidden text-xs">
          <table className="w-full text-left font-mono">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 text-[11px] uppercase">
              <tr>
                <th className="p-3">Dimension</th>
                <th className="p-3 text-indigo-300">Composio Managed OAuth</th>
                <th className="p-3 text-amber-300">Custom OAuth Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/40">
              <tr>
                <td className="p-3 font-semibold text-slate-300">Registration Requirement</td>
                <td className="p-3 text-emerald-400">Zero provider registration needed</td>
                <td className="p-3 text-slate-400">Manual registration in each developer console</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-300">Provider Verification & Audits</td>
                <td className="p-3 text-emerald-400">Pre-verified by Composio (CASA compliance included)</td>
                <td className="p-3 text-rose-400">Developer must submit for 3-21 day review & CASA audits</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-300">Token Refresh & Secret Storage</td>
                <td className="p-3 text-emerald-400">Automated encryption & refresh rotation</td>
                <td className="p-3 text-slate-400">Developer implements refresh token scheduling</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-300">Custom Branding in Consent Dialog</td>
                <td className="p-3 text-slate-400">Shows Composio verified application branding</td>
                <td className="p-3 text-emerald-400">Fully white-labeled with developer company logo & domain</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-300">Multi-Tenant Routing</td>
                <td className="p-3 text-emerald-400">Native connection URL routing for end-users</td>
                <td className="p-3 text-slate-400">Developer builds callback & state mapping database</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CASA Security Assessment Explanation */}
      <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">Google CASA Tier 2/3 Security Assessment</h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          When an AI builder requests Google Restricted Scopes (such as <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">https://mail.google.com/</code> or Google Drive full access), Google requires the application to complete an annual Cloud Application Security Assessment (CASA Tier 2 or Tier 3) through an authorized third-party security lab. This can incur audit costs ranging from $1,500 to $15,000+ and take 3–6 weeks.
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-indigo-300 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">AuthScout Recommendation:</div>
          <p className="text-slate-300 font-sans">
            AI developers should either utilize minimal non-restricted scopes (e.g. read-only metadata) or leverage <strong>Composio Managed OAuth</strong> to inherit pre-audited enterprise compliance for immediate production launch.
          </p>
        </div>
      </section>

      {/* Autonomous Research Pipeline Overview */}
      <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white">How the AuthScout Research Pipeline Operates</h2>
        </div>
        <div className="space-y-3 text-xs text-slate-300 font-sans leading-relaxed">
          <p>
            AuthScout deploys an orchestrated multi-agent research pipeline designed to extract genuine, un-hallucinated OAuth specifications:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px] pt-1">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-indigo-400 block mb-1">1. Discovery Agent</strong>
              Navigates base URLs, probes developer subdomains, and rejects SSRF/private host attempts.
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-indigo-400 block mb-1">2. Protocol Agent</strong>
              Scrapes endpoints, identifies PKCE support, and classifies scopes by risk tier.
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-indigo-400 block mb-1">3. Approval Intelligence</strong>
              Separates active coding hours from external review waiting days.
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-indigo-400 block mb-1">4. Evidence Engine</strong>
              Assigns strict VERIFIED, INFERRED, UNVERIFIED, or BLOCKED status tags to all claims.
            </div>
          </div>
        </div>
      </section>

      {/* Official Documentation References */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          Official Provider References
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { name: 'Composio Managed Auth', url: 'https://docs.composio.dev/toolkits/managed-auth' },
            { name: 'Google Identity OAuth 2.0', url: 'https://developers.google.com/identity/protocols/oauth2' },
            { name: 'Slack API OAuth v2', url: 'https://api.slack.com/authentication/oauth-v2' },
            { name: 'GitHub OAuth Apps', url: 'https://docs.github.com/en/apps/oauth-apps' },
            { name: 'Notion API Authorization', url: 'https://developers.notion.com/docs/authorization' },
            { name: 'Discord OAuth2 Documentation', url: 'https://discord.com/developers/docs/topics/oauth2' }
          ].map((ref, i) => (
            <a
              key={i}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300 hover:text-indigo-300 font-mono"
            >
              <span>{ref.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
