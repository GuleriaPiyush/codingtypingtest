import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const ThemeToggle = () => {
  const preferences = useGameStore((state) => state.preferences);
  const updatePreferences = useGameStore((state) => state.updatePreferences);

  const toggleTheme = () => {
    const nextTheme = preferences.theme === 'dark' ? 'light' : 'dark';
    updatePreferences({ theme: nextTheme });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-[var(--color-sub)] hover:text-[var(--color-main)] transition-colors hover:bg-[var(--color-sub-alt)] cursor-pointer"
      aria-label={`Switch to ${preferences.theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: preferences.theme === 'dark' ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {preferences.theme === 'dark' ? (
          <Sun size={20} className="w-5 h-5" />
        ) : (
          <Moon size={20} className="w-5 h-5" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
