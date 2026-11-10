import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Zap, ExternalLink } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full border-b-2 border-void-700 bg-void-900/95 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between gap-2 px-3 sm:gap-4 sm:px-4 md:px-6">

        {/* Brand */}
        <Link to="/" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand-500">
            <Zap className="w-4 h-4 text-void-900" strokeWidth={3} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-black uppercase tracking-widest text-white">
                AuthScout
              </span>
              <span className="hidden bg-brand-500 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest text-void-900 sm:inline">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-void-400 font-mono tracking-wider hidden sm:block uppercase">
              OAuth Intelligence for AI Builders
            </p>
          </div>
        </Link>

        {/* Global Search */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-void-400" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search OAuth provider (Google, Slack, Notion...)"
              className="w-full bg-void-800 border-2 border-void-600 pl-9 pr-4 py-2 text-xs font-mono text-void-100 placeholder:text-void-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </form>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            to="/directory"
            aria-label="Search OAuth providers"
            className="flex h-9 w-9 items-center justify-center border-2 border-void-600 text-void-300 transition-colors hover:border-brand-500 hover:text-brand-500 md:hidden"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            to="/research"
            className="btn-yellow flex min-h-9 items-center gap-1.5 px-2 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs"
          >
            <Zap className="w-3 h-3" strokeWidth={3} />
            <span className="sm:hidden">Research</span>
            <span className="hidden sm:inline">Research Provider</span>
          </Link>
          <a
            href="https://docs.composio.dev/toolkits/managed-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-xs font-mono text-void-400 hover:text-brand-500 transition-colors uppercase tracking-wider"
          >
            <span>Composio Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
};
