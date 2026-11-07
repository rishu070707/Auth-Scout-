import React from 'react';
import { Shield, Lock, ExternalLink, Sparkles, FileText, ArrowRight, Terminal, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DocsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24 text-void-100 font-mono">
      {/* Header */}
      <div className="border-b-2 border-void-700 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 bg-brand-500" />
          <span className="sys-label text-brand-500">SYSTEM ARCHITECTURE SPECIFICATION</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight pl-3">
          AuthScout Documentation & Engineering Architecture
        </h1>
        <p className="text-xs text-void-400 pl-3 mt-1 leading-relaxed max-w-2xl">
          Comprehensive reference on OAuth 2.0 authorization architectures for AI agents, security
          assessment tiers (CASA), and Composio Managed Auth mechanisms.
        </p>
      </div>

      {/* Managed vs Custom OAuth Comparison */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-brand-500" />
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-500" strokeWidth={2.5} />
            <span>Composio Managed OAuth vs. Custom OAuth</span>
          </h2>
        </div>
        <div className="border-2 border-void-700 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-void-900 text-void-400 border-b-2 border-void-700 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Dimension</th>
                <th className="p-3 text-brand-500 font-bold">Composio Managed OAuth</th>
                <th className="p-3 text-void-400">Custom OAuth Application</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-void-700 bg-void-800">
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Registration Requirement</td>
                <td className="p-3 text-term-green font-bold">Zero provider registration needed</td>
                <td className="p-3 text-void-400">Manual registration in each console</td>
              </tr>
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Provider Verification & Audits</td>
                <td className="p-3 text-term-green font-bold">Pre-verified by Composio (CASA compliance included)</td>
                <td className="p-3 text-term-red font-bold">Developer submits for 3–21 day review & CASA audits</td>
              </tr>
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Token Refresh & Secret Storage</td>
                <td className="p-3 text-term-green font-bold">Automated encryption & refresh rotation</td>
                <td className="p-3 text-void-400">Developer implements token refresh scheduling</td>
              </tr>
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Custom Branding in Consent Dialog</td>
                <td className="p-3 text-void-400">Shows Composio verified application branding</td>
                <td className="p-3 text-term-green font-bold">Fully white-labeled with developer company logo & domain</td>
              </tr>
              <tr className="hover:bg-void-700/50">
                <td className="p-3 font-bold text-void-100 uppercase">Multi-Tenant Routing</td>
                <td className="p-3 text-term-green font-bold">Native connection URL routing for end-users</td>
                <td className="p-3 text-void-400">Developer builds callback & state mapping database</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CASA Security Assessment Explanation */}
      <section className="node-card p-6 space-y-4 relative">
        <div className="absolute top-0 left-0 w-1 bottom-0 bg-brand-500" />
        <div className="flex items-center gap-2 border-b border-void-700 pb-2">
          <Lock className="w-5 h-5 text-brand-500" />
          <h2 className="text-base font-black text-white uppercase tracking-wide">
            Google CASA Tier 2/3 Security Assessment Protocol
          </h2>
        </div>
        <p className="text-xs text-void-300 leading-relaxed">
          When an AI builder requests Google Restricted Scopes (such as <code className="text-brand-500 bg-void-950 px-1.5 py-0.5 border border-void-700">https://mail.google.com/</code> or Google Drive full access), Google requires the application to complete an annual Cloud Application Security Assessment (CASA Tier 2 or Tier 3) through an authorized third-party security lab. This can incur audit costs ranging from $1,500 to $15,000+ and take 3–6 weeks.
        </p>
        <div className="p-4 border-2 border-void-700 bg-void-900 text-xs space-y-1">
          <div className="sys-label text-brand-500">AuthScout Recommendation:</div>
          <p className="text-void-200">
            AI developers should either utilize minimal non-restricted scopes (e.g. read-only metadata) or leverage <strong className="text-brand-500">Composio Managed OAuth</strong> to inherit pre-audited enterprise compliance for immediate production launch.
          </p>
        </div>
      </section>

      {/* Autonomous Research Pipeline Overview */}
      <section className="node-card p-6 space-y-4 relative">
        <div className="absolute top-0 left-0 w-1 bottom-0 bg-term-green" />
        <div className="flex items-center gap-2 border-b border-void-700 pb-2">
          <Sparkles className="w-5 h-5 text-term-green" />
          <h2 className="text-base font-black text-white uppercase tracking-wide">
            How the AuthScout Research Pipeline Operates
          </h2>
        </div>
        <p className="text-xs text-void-300 leading-relaxed">
          AuthScout deploys an orchestrated multi-agent research pipeline designed to extract genuine, un-hallucinated OAuth specifications:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3 border-2 border-void-700 bg-void-900">
            <span className="sys-label text-brand-500 block mb-1">1. Discovery Agent</span>
            <p className="text-void-400">Navigates base URLs, probes developer subdomains, and rejects SSRF/private host attempts.</p>
          </div>
          <div className="p-3 border-2 border-void-700 bg-void-900">
            <span className="sys-label text-term-green block mb-1">2. Protocol Agent</span>
            <p className="text-void-400">Scrapes endpoints, identifies PKCE support, and classifies scopes by risk tier.</p>
          </div>
          <div className="p-3 border-2 border-void-700 bg-void-900">
            <span className="sys-label text-brand-500 block mb-1">3. Approval Intelligence</span>
            <p className="text-void-400">Separates active coding hours from external review waiting days with historical evidence.</p>
          </div>
          <div className="p-3 border-2 border-void-700 bg-void-900">
            <span className="sys-label text-term-blue block mb-1">4. Evidence Engine</span>
            <p className="text-void-400">Assigns strict VERIFIED, INFERRED, UNVERIFIED, or BLOCKED status tags to all claims.</p>
          </div>
        </div>
      </section>

      {/* Official Documentation References */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-brand-500" />
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            Official Provider Documentation References
          </h2>
        </div>
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
              className="p-3 border-2 border-void-700 bg-void-800 hover:border-brand-500 transition-colors flex items-center justify-between text-void-200 hover:text-brand-500"
            >
              <span className="font-bold">{ref.name}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
