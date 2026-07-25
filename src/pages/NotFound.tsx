import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { AlertCircle, Terminal } from 'lucide-react';

export const NotFound = () => {
  useDocumentMetadata({
    title: '404 Page Not Found',
    description: 'The page you are trying to reach does not exist. Return to CodeType to practice typing programming code.',
    canonicalUrl: 'https://codetype.dev/404'
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto w-full text-center flex flex-col items-center select-none font-mono py-12"
    >
      <div className="bg-rose-500/10 border border-rose-500/25 p-4 rounded-full text-[var(--color-error)] mb-6">
        <AlertCircle size={32} />
      </div>

      <h1 className="text-xl font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
        <Terminal size={18} className="text-[var(--color-error)]" />
        <span>Error 404: Page Not Found</span>
      </h1>

      {/* Simulated compiler / shell stack trace message */}
      <div className="w-full bg-[var(--color-sub-alt)]/20 border border-[var(--color-sub-alt)]/40 p-4 rounded-xl text-left text-[10px] text-[var(--color-sub)] leading-relaxed mb-8 select-all">
        <span className="text-[var(--color-error)]">Exception in thread &quot;main&quot; PageNotFoundException</span><br />
        &nbsp;&nbsp;at CodeType.Router.resolveRoute(Router.tsx:88)<br />
        &nbsp;&nbsp;at CodeType.App.render(App.tsx:24)<br />
        &nbsp;&nbsp;at Browser.DOM.render(react-dom.production.js:145)<br />
        <span className="text-zinc-500">// Check if you typed the URL path correctly or if it moved.</span>
      </div>

      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-[var(--color-main)] hover:bg-[var(--color-main)]/90 text-[var(--color-bg)] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-[1.02]"
      >
        Return to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
