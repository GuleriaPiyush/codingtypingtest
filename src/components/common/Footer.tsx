import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 max-w-6xl mx-auto border-t border-[var(--color-sub-alt)]/30 mt-auto text-xs text-[var(--color-sub)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Shortcut guide */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center font-mono">
          <div className="flex items-center gap-1.5 bg-[var(--color-sub-alt)]/50 px-2 py-1 rounded">
            <kbd className="bg-[var(--color-bg)] border border-[var(--color-sub)]/25 px-1 rounded text-[10px]">tab</kbd>
            <span>restart test</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[var(--color-sub-alt)]/50 px-2 py-1 rounded">
            <kbd className="bg-[var(--color-bg)] border border-[var(--color-sub)]/25 px-1 rounded text-[10px]">esc</kbd>
            <span>focus typing</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[var(--color-sub-alt)]/50 px-2 py-1 rounded">
            <kbd className="bg-[var(--color-bg)] border border-[var(--color-sub)]/25 px-1 rounded text-[10px]">ctrl + d</kbd>
            <span>toggle theme</span>
          </div>
        </div>

        {/* Footer links */}
        <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer Navigation">
          <Link to="/about" className="hover:text-[var(--color-main)] transition-colors flex items-center gap-1">
            <HelpCircle size={12} /> About
          </Link>
          <Link to="/contact" className="hover:text-[var(--color-main)] transition-colors">Contact</Link>
          <Link to="/privacy" className="hover:text-[var(--color-main)] transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-[var(--color-main)] transition-colors">Terms of Service</Link>
        </nav>
      </div>

      <div className="mt-6 text-center font-mono text-[10px] opacity-75">
        &copy; {new Date().getFullYear()} CodeType. Created with premium ergonomics. No cookies, no trackers.
      </div>
    </footer>
  );
};

export default Footer;
