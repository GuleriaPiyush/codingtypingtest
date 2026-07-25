import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import SettingsPanel from '../components/typing/SettingsPanel';
import StatsWidget from '../components/typing/StatsWidget';
import TypingArea from '../components/typing/TypingArea';
import ResultsDashboard from '../components/typing/ResultsDashboard';

export const Home = () => {
  const status = useGameStore((state) => state.status);
  const tickTimer = useGameStore((state) => state.tickTimer);

  // Home Page SEO Meta Setup
  useDocumentMetadata({
    title: 'Touch Typing Test for Programmers',
    description: 'Improve your programming speed and keyboard muscle memory. Custom typing practice drills for JavaScript, Python, C++, Go, Rust, and more.',
    canonicalUrl: 'https://codetype.dev'
  });

  // Tick the timer once per second while the test is active
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (status === 'typing') {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, tickTimer]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[50vh]">
      <AnimatePresence mode="wait">
        {status === 'completed' ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <ResultsDashboard />
          </motion.div>
        ) : (
          <motion.div
            key="test"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            {/* Top configuration options */}
            <SettingsPanel />
            
            {/* Live statistics */}
            <StatsWidget />

            {/* Core mechanical typing space */}
            <div id="main-typing-area" className="w-full focus:outline-none">
              <TypingArea />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
