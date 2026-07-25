import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

export const useKeyboardShortcuts = (onFocusTyping: () => void) => {
  const resetTest = useGameStore((state) => state.resetTest);
  const preferences = useGameStore((state) => state.preferences);
  const updatePreferences = useGameStore((state) => state.updatePreferences);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab -> Restart test
      if (e.key === 'Tab') {
        e.preventDefault();
        resetTest();
      }

      // Escape -> Re-focus the typing area
      if (e.key === 'Escape') {
        e.preventDefault();
        onFocusTyping();
      }

      // Ctrl + D / Cmd + D -> Toggle theme (Dark/Light mode)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        const nextTheme = preferences.theme === 'dark' ? 'light' : 'dark';
        updatePreferences({ theme: nextTheme });
      }

      // Ctrl + R / Cmd + R -> Restart test (prevents browser reload)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        resetTest();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [resetTest, preferences, updatePreferences, onFocusTyping]);
};
