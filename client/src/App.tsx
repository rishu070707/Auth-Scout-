import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { GuidePage } from './pages/GuidePage';
import { ResearchPage } from './pages/ResearchPage';
import { MyGuidesPage } from './pages/MyGuidesPage';
import { DocsPage } from './pages/DocsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-void-900 text-void-100 flex flex-col font-mono selection:bg-brand-500 selection:text-void-900">
        <Navbar />
        <div className="flex min-w-0 flex-1 flex-col md:flex-row">
          <Sidebar />
          <main className="mx-auto w-full min-w-0 max-w-7xl flex-1 overflow-y-auto p-3 sm:p-4 md:p-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/overview" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
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
