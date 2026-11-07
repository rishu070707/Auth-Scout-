import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchApplications } from '../api/client';
import { Application } from '../types';
import { AppCard } from '../components/AppCard';
import { Search, Filter, Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const DirectoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const q = searchParams.get('q') || '';
  const complexity = searchParams.get('complexity') || 'All';
  const managedStatus = searchParams.get('managedStatus') || 'All';
  const approvalRequired = searchParams.get('approvalRequired') || 'All';
  const sort = searchParams.get('sort') || 'recent';

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchApplications({
          q,
          complexity,
          managedStatus,
          approvalRequired,
          sort
        });
        setApps(data);
      } catch (err) {
        console.error('Error fetching apps directory:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [q, complexity, managedStatus, approvalRequired, sort]);

  const updateParam = (key: string, val: string) => {
    const next = new URLSearchParams(searchParams);
    if (val === 'All' || !val) {
      next.delete(key);
    } else {
      next.set(key, val);
    }
    setSearchParams(next);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            OAuth Application Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Searchable directory of verified OAuth 2.0 integration specifications and requirements
          </p>
        </div>
        <Link
          to="/research"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors self-start md:self-auto shadow-sm shadow-indigo-600/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
          <span>Research New App</span>
        </Link>
      </div>

      {/* Search & Filters Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={q}
              onChange={(e) => updateParam('q', e.target.value)}
              placeholder="Search by provider name, description, or tags..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              aria-label="Sort applications"
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="recent">Recently Researched</option>
              <option value="easiest">Easiest First</option>
              <option value="difficult">Most Difficult First</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800/60 text-xs">
          {/* Complexity */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider font-mono">Complexity:</span>
            {['All', 'Easy', 'Medium', 'Difficult'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => updateParam('complexity', lvl)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  complexity === lvl
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Managed OAuth */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider font-mono">Composio:</span>
            {[
              { id: 'All', label: 'All' },
              { id: 'Available', label: 'Managed Available' },
              { id: 'Custom Only', label: 'Custom Only' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => updateParam('managedStatus', st.id)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  managedStatus === st.id
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Approval Requirement */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider font-mono">Approval:</span>
            {[
              { id: 'All', label: 'All' },
              { id: 'false', label: 'Zero Waiting Time' },
              { id: 'true', label: 'Review Required' }
            ].map((ap) => (
              <button
                key={ap.id}
                onClick={() => updateParam('approvalRequired', ap.id)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  approvalRequired === ap.id
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ap.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* App Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 rounded-xl bg-slate-900/40 border border-slate-800/60 animate-pulse"></div>
          ))}
        </div>
      ) : apps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4 max-w-lg mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">No matching OAuth provider found</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              We couldn't find an existing profile matching your filters. You can dispatch the AI Research Agent to autonomously investigate and generate a guide for this provider.
            </p>
          </div>
          <Link
            to={q ? `/research?name=${encodeURIComponent(q)}` : '/research'}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span>Research "{q || 'New Provider'}" Now</span>
          </Link>
        </div>
      )}
    </div>
  );
};
