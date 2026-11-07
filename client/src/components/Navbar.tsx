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
      <div className="flex h-14 items-center px-4 md:px-6 justify-between gap-4">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-8 h-8 bg-brand-500 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-void-900" strokeWidth={3} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black tracking-widest text-white text-sm uppercase">
                AuthScout
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest bg-brand-500 text-void-900 px-1.5 py-0.5">
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
        <div className="flex items-center gap-3">
          <Link
            to="/research"
            className="btn-yellow px-3 py-1.5 text-xs flex items-center gap-1.5"
          >
            <Zap className="w-3 h-3" strokeWidth={3} />
            <span>Research Provider</span>
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
