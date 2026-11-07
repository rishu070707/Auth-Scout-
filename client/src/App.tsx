import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { GuidePage } from './pages/GuidePage';
import { ResearchPage } from './pages/ResearchPage';
import { MyGuidesPage } from './pages/MyGuidesPage';
import { DocsPage } from './pages/DocsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/guides/:slug" element={<GuidePage />} />
              <Route path="/guides/share/:shareId" element={<GuidePage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/my-guides" element={<MyGuidesPage />} />
              <Route path="/docs" element={<DocsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
