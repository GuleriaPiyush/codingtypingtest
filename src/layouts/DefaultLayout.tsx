import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SkipToContent from '../components/common/SkipToContent';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
