import { Link, NavLink } from 'react-router-dom';
import { Keyboard, Trophy, BookOpen, Info, Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const preferences = useGameStore((state) => state.preferences);
  const updatePreferences = useGameStore((state) => state.updatePreferences);

  const getSoundIcon = () => {
    switch (preferences.sound) {
      case 'click':
        return <Volume2 size={18} />;
      case 'beep':
        return <Volume1 size={18} className="text-[var(--color-main)]" />;
      case 'off':
      default:
        return <VolumeX size={18} />;
    }
  };

  const toggleSound = () => {
    const soundCycle: ('off' | 'click' | 'beep')[] = ['off', 'click', 'beep'];
    const nextIdx = (soundCycle.indexOf(preferences.sound) + 1) % soundCycle.length;
    updatePreferences({ sound: soundCycle[nextIdx] });
  };

  return (
    <header className="w-full py-6 md:py-8 px-4 max-w-6xl mx-auto flex items-center justify-between border-b border-[var(--color-sub-alt)]/30">
      {/* Brand logo */}
      <Link 
        to="/" 
        className="flex items-center gap-3 group text-xl font-bold tracking-wider hover:opacity-90"
        aria-label="CodeType Home"
      >
        <Keyboard className="w-6 h-6 text-[var(--color-main)] transition-transform group-hover:scale-110" />
        <span className="font-mono text-[var(--color-text)]">
          code<span className="text-[var(--color-main)]">type</span>
        </span>
      </Link>

      {/* Navigation routes */}
      <nav className="hidden sm:flex items-center gap-6 text-sm" aria-label="Main Navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-1.5 font-medium transition-colors hover:text-[var(--color-main)] ${
              isActive ? 'text-[var(--color-main)]' : 'text-[var(--color-sub)]'
            }`
          }
        >
          <Keyboard size={16} />
          <span>Test</span>
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            `flex items-center gap-1.5 font-medium transition-colors hover:text-[var(--color-main)] ${
              isActive ? 'text-[var(--color-main)]' : 'text-[var(--color-sub)]'
            }`
          }
        >
          <Trophy size={16} />
          <span>Leaderboard</span>
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `flex items-center gap-1.5 font-medium transition-colors hover:text-[var(--color-main)] ${
              isActive ? 'text-[var(--color-main)]' : 'text-[var(--color-sub)]'
            }`
          }
        >
          <BookOpen size={16} />
          <span>Blog</span>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center gap-1.5 font-medium transition-colors hover:text-[var(--color-main)] ${
              isActive ? 'text-[var(--color-main)]' : 'text-[var(--color-sub)]'
            }`
          }
        >
          <Info size={16} />
          <span>About</span>
        </NavLink>
      </nav>

      {/* Quick preferences toggle bar */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSound}
          className="p-2 rounded-lg text-[var(--color-sub)] hover:text-[var(--color-main)] transition-colors hover:bg-[var(--color-sub-alt)] cursor-pointer"
          aria-label={`Toggle sound. Current sound is ${preferences.sound}`}
          title={`Sound: ${preferences.sound}`}
        >
          {getSoundIcon()}
        </button>

        <ThemeToggle />

        {/* Small mobile burger route triggers standard links inside a small header row on mobile */}
        <div className="flex sm:hidden items-center gap-2 text-xs text-[var(--color-sub)] ml-2">
          <Link to="/blog" className="hover:text-[var(--color-main)]">Blog</Link>
          <span>•</span>
          <Link to="/about" className="hover:text-[var(--color-main)]">About</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
