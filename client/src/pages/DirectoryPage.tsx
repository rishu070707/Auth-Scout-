import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchApplications } from '../api/client';
import { Application } from '../types';
import { AppCard } from '../components/AppCard';
import { Search, Zap, SlidersHorizontal } from 'lucide-react';

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
        const data = await fetchApplications({ q, complexity, managedStatus, approvalRequired, sort });
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
    if (val === 'All' || !val) next.delete(key);
    else next.set(key, val);
    setSearchParams(next);
  };

  const FilterBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border-2 transition-all ${
        active
          ? 'border-brand-500 bg-brand-500 text-void-900'
          : 'border-void-600 text-void-400 hover:border-brand-500 hover:text-brand-500 bg-transparent'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-6 pb-16">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-void-700 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1 h-6 bg-brand-500" />
            <h1 className="text-2xl md:text-3xl font-black font-mono text-white uppercase tracking-tight">
              OAuth Application Directory
            </h1>
          </div>
          <p className="text-xs text-void-500 font-mono pl-3">
            Searchable directory of verified OAuth 2.0 integration specifications and requirements
          </p>
        </div>
        <Link
          to="/research"
          className="btn-yellow px-4 py-2 text-xs flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <Zap className="w-3.5 h-3.5" strokeWidth={3} />
          <span>Research New App</span>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="border-2 border-void-700 bg-void-800 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-void-400" />
            <input
              type="text"
              value={q}
              onChange={(e) => updateParam('q', e.target.value)}
              placeholder="Search by provider name, description, or tags..."
              className="w-full bg-void-900 border-2 border-void-600 pl-10 pr-4 py-2 text-xs font-mono text-void-100 placeholder:text-void-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-void-400 shrink-0" />
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              aria-label="Sort applications"
              className="bg-void-900 border-2 border-void-600 px-3 py-2 text-xs font-mono text-void-300 focus:outline-none focus:border-brand-500"
            >
              <option value="recent">Recently Researched</option>
              <option value="easiest">Easiest First</option>
              <option value="difficult">Most Difficult First</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t-2 border-void-700">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="sys-label">Complexity:</span>
            {['All', 'Easy', 'Medium', 'Difficult'].map((lvl) => (
              <FilterBtn key={lvl} active={complexity === lvl} onClick={() => updateParam('complexity', lvl)}>
                {lvl}
              </FilterBtn>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="sys-label">Composio:</span>
            {[
              { id: 'All', label: 'All' },
              { id: 'Available', label: 'Managed' },
              { id: 'Custom Only', label: 'Custom Only' },
            ].map((st) => (
              <FilterBtn key={st.id} active={managedStatus === st.id} onClick={() => updateParam('managedStatus', st.id)}>
                {st.label}
              </FilterBtn>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="sys-label">Approval:</span>
            {[
              { id: 'All', label: 'All' },
              { id: 'false', label: 'No Wait' },
              { id: 'true', label: 'Review Required' },
            ].map((ap) => (
              <FilterBtn key={ap.id} active={approvalRequired === ap.id} onClick={() => updateParam('approvalRequired', ap.id)}>
                {ap.label}
              </FilterBtn>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <div className="sys-label">
          {apps.length} provider{apps.length !== 1 ? 's' : ''} found
          {q && ` for "${q}"`}
        </div>
      )}

      {/* App Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 border-2 border-void-700 bg-void-800 animate-pulse" />
          ))}
        </div>
      ) : apps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="border-2 border-void-600 bg-void-800 p-12 text-center space-y-4 max-w-lg mx-auto my-8">
          <div className="w-12 h-12 border-2 border-void-500 bg-void-700 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6 text-void-400" />
          </div>
          <div>
            <h3 className="font-black font-mono text-white text-sm uppercase tracking-wider">
              No matching OAuth provider found
            </h3>
            <p className="text-xs text-void-400 font-mono mt-1 leading-relaxed">
              We couldn't find an existing profile matching your filters. You can dispatch the AI
              Research Agent to autonomously investigate and generate a guide for this provider.
            </p>
          </div>
          <Link
            to={q ? `/research?name=${encodeURIComponent(q)}` : '/research'}
            className="btn-yellow inline-flex items-center gap-2 px-4 py-2 text-xs"
          >
            <Zap className="w-3.5 h-3.5" strokeWidth={3} />
            <span>Research "{q || 'New Provider'}" Now</span>
          </Link>
        </div>
      )}
    </div>
  );
};
