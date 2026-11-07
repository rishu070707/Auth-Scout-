import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllGuides } from '../api/client';
import { Guide } from '../types';
import { ComplexityBadge } from '../components/ComplexityBadge';
import { BookOpen, Copy, Check, ArrowRight, ExternalLink, Sparkles, Clock } from 'lucide-react';

export const MyGuidesPage: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllGuides();
        setGuides(data);
      } catch (err) {
        console.error('Failed to load saved guides:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCopy = (shareId: string) => {
    const shareUrl = `${window.location.origin}/guides/share/${shareId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(shareId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Saved OAuth Guides
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Access, export, and share previously generated OAuth intelligence reports
          </p>
        </div>
        <Link
          to="/research"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
          <span>Generate New Guide</span>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 bg-slate-900/40 rounded-xl border border-slate-800 animate-pulse"></div>
          ))}
        </div>
      ) : guides.length > 0 ? (
        <div className="space-y-3">
          {guides.map((g) => (
            <div
              key={g.shareId}
              className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/60 p-1.5 flex items-center justify-center shrink-0">
                  {g.logo ? (
                    <img src={g.logo} alt={g.applicationName} className="w-full h-full object-contain" />
                  ) : (
                    <span className="font-bold text-slate-300 font-mono text-sm">{g.applicationName.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm">{g.applicationName}</h3>
                    <ComplexityBadge complexity={g.overview.overallDifficulty} />
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {g.timeEstimates?.activeSetupMinutes ? `${g.timeEstimates.activeSetupMinutes.min}-${g.timeEstimates.activeSetupMinutes.max}m setup` : 'Ready'}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400">
                      {g.confidence?.score ? `${g.confidence.score}% Confidence` : 'Verified'}
                    </span>
                    <span>•</span>
                    <span>{new Date(g.generatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleCopy(g.shareId)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors flex items-center gap-1.5"
                >
                  {copiedId === g.shareId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Share Link</span>
                    </>
                  )}
                </button>
                <Link
                  to={`/guides/${g.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  <span>Open Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="font-bold text-white text-base">No saved guides yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Explore the directory or dispatch the AI agent to research and save your first integration guide.
          </p>
        </div>
      )}
    </div>
  );
};
