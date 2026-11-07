import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles, Search, ExternalLink, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [searchVal, setSearchVal] = React.useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/directory?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/30 transition-colors shadow-sm shadow-indigo-500/10">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white text-base font-sans">AUTHSCOUT</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded">PRO</span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">OAuth Intelligence for AI Builders</p>
            </div>
          </Link>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search OAuth provider (Google, Slack, Notion...)"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
            />
          </div>
        </form>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-sm shadow-indigo-500/20 transition-all border border-indigo-400/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span>Research Provider</span>
          </Link>
          <a
            href="https://docs.composio.dev/toolkits/managed-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Composio Docs</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
