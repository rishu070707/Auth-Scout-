import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllGuides } from '../api/client';
import { Guide } from '../types';
import { ComplexityBadge } from '../components/ComplexityBadge';
import { BookOpen, Copy, Check, ArrowRight, Zap, Clock } from 'lucide-react';

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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-void-700 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1 h-6 bg-brand-500" />
            <h1 className="text-2xl md:text-3xl font-black font-mono text-white uppercase tracking-tight">
              Saved OAuth Guides
            </h1>
          </div>
          <p className="text-xs text-void-500 font-mono pl-3">
            Access, export, and share previously generated OAuth intelligence reports
          </p>
        </div>
        <Link
          to="/research"
          className="btn-yellow px-4 py-2 text-xs flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Zap className="w-3.5 h-3.5" strokeWidth={3} />
          <span>Generate New Guide</span>
        </Link>
      </div>

      {/* Count indicator */}
      {!loading && guides.length > 0 && (
        <div className="sys-label">{guides.length} guide{guides.length !== 1 ? 's' : ''} saved</div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 border-2 border-void-700 bg-void-800 animate-pulse" />
          ))}
        </div>
      ) : guides.length > 0 ? (
        <div className="space-y-3">
          {guides.map((g) => (
            <div
              key={g.shareId}
              className="node-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Left: logo + info */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border-2 border-void-600 bg-void-800 flex items-center justify-center shrink-0 overflow-hidden">
                  {g.logo ? (
                    <img src={g.logo} alt={g.applicationName} className="w-7 h-7 object-contain" />
                  ) : (
                    <span className="font-black text-brand-500 font-mono text-sm">
                      {g.applicationName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-black font-mono text-white text-sm uppercase tracking-wide">
                      {g.applicationName}
                    </h3>
                    <ComplexityBadge complexity={g.overview.overallDifficulty} />
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-void-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {g.timeEstimates?.activeSetupMinutes
                        ? `${g.timeEstimates.activeSetupMinutes.min}–${g.timeEstimates.activeSetupMinutes.max}m setup`
                        : 'Ready'}
                    </span>
                    <span className="text-void-700">|</span>
                    <span className="text-term-green font-bold">
                      {g.confidence?.score ? `${g.confidence.score}% Confidence` : 'Verified'}
                    </span>
                    <span className="text-void-700">|</span>
                    <span>{new Date(g.generatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleCopy(g.shareId)}
                  className="btn-ghost px-3 py-1.5 text-xs flex items-center gap-1.5"
                >
                  {copiedId === g.shareId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-term-green" />
                      <span className="text-term-green">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
                <Link
                  to={`/guides/${g.slug}`}
                  className="btn-yellow px-3 py-1.5 text-xs flex items-center gap-1"
                >
                  <span>Open Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-void-600 bg-void-800 p-12 text-center space-y-3">
          <div className="w-12 h-12 border-2 border-void-500 bg-void-700 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6 text-void-400" />
          </div>
          <h3 className="font-black font-mono text-white text-sm uppercase tracking-wider">
            No saved guides yet
          </h3>
          <p className="text-xs text-void-400 font-mono max-w-sm mx-auto">
            Explore the directory or dispatch the AI agent to research and save your first integration guide.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link to="/directory" className="btn-ghost px-4 py-2 text-xs">
              Browse Directory
            </Link>
            <Link to="/research" className="btn-yellow px-4 py-2 text-xs flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" strokeWidth={3} />
              Launch AI Agent
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
