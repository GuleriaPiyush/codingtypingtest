import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGameStore } from './store/useGameStore';
import DefaultLayout from './layouts/DefaultLayout';

// Core Home page is loaded statically to keep First Contentful Paint instant
import Home from './pages/Home';

// Lazy loading secondary routes for optimal code splitting
const About = React.lazy(() => import('./pages/About'));
const Leaderboard = React.lazy(() => import('./pages/Leaderboard'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

import './App.css';

// Loading placeholder matching minimal ergonomics
const PageLoader = () => (
  <div className="w-full flex items-center justify-center py-24 font-mono text-xs text-[var(--color-sub)] select-none">
    <div className="flex items-center gap-2">
      <svg className="animate-spin h-4 w-4 text-[var(--color-main)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Loading module...</span>
    </div>
  </div>
);

function App() {
  const initPreferences = useGameStore((state) => state.initPreferences);

  useEffect(() => {
    // Load local storage preferences and themes on startup
    initPreferences();
  }, [initPreferences]);

  return (
    <BrowserRouter>
      <DefaultLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
