import { create } from 'zustand';
import type { 
  UserPreferences, TestStatus, TestStats, ThemeMode, 
  TestMode, FontSize 
} from '../types';
import { generateWords } from '../data/words';
import { getRandomQuote } from '../data/quotes';
import { getSnippetByLanguage } from '../data/snippets';

// Default Preferences
const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  mode: 'code',
  timeLimit: 30,
  wordLimit: 50,
  language: 'javascript',
  caretStyle: 'line',
  fontSize: 'lg',
  sound: 'click',
  smoothAnimations: true,
};

interface GameState {
  preferences: UserPreferences;
  status: TestStatus;
  textToType: string;
  typedText: string;
  startTime: number | null;
  endTime: number | null;
  mistakes: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  timeLeft: number;
  currentIndex: number;
  snippetTitle: string;
  snippetLanguage: string;
  stats: TestStats;
  
  // Actions
  initPreferences: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  startTest: () => void;
  resetTest: () => void;
  updateTypedText: (text: string) => void;
  tickTimer: () => void;
  completeTest: () => void;
}

const getSystemTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
};

const applyTheme = (theme: ThemeMode) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }
};

const applyFontSize = (size: FontSize) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    // Remove existing size classes
    root.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
    // Set base font sizes
    if (size === 'sm') root.style.setProperty('--font-size-base', '1.15rem');
    else if (size === 'md') root.style.setProperty('--font-size-base', '1.35rem');
    else if (size === 'lg') root.style.setProperty('--font-size-base', '1.55rem');
    else if (size === 'xl') root.style.setProperty('--font-size-base', '1.85rem');
  }
};

export const useGameStore = create<GameState>((set, get) => {
  const getInitialPreferences = (): UserPreferences => {
    try {
      const saved = localStorage.getItem('programmer-typing-preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load settings:", e);
    }
    return { ...DEFAULT_PREFERENCES, theme: getSystemTheme() };
  };

  const calculateStats = (
    typed: string,
    target: string,
    elapsedMs: number,
    totalDuration: number,
    mistakes: number
  ): TestStats => {
    const elapsedMinutes = elapsedMs / 60000;
    if (elapsedMinutes <= 0) {
      return {
        wpm: 0, rawWpm: 0, accuracy: 100, cpm: 0, mistakes,
        correctChars: 0, incorrectChars: 0, extraChars: 0, missedChars: 0,
        timeElapsed: 0, totalTime: totalDuration, peakWpm: 0, history: []
      };
    }

    let correct = 0;
    let incorrect = 0;

    for (let i = 0; i < typed.length; i++) {
      if (i >= target.length) continue;
      
      // Treat consecutive whitespaces (like indentation) as auto-typed, but verify others
      if (typed[i] === target[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }

    const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
    
    // Standard WPM calculation: 5 characters = 1 word
    const rawWpm = Math.round((typed.length / 5) / elapsedMinutes);
    const wpm = Math.round((correct / 5) / elapsedMinutes);
    const cpm = Math.round(correct / elapsedMinutes);

    const prevStats = get().stats;
    const peakWpm = Math.max(prevStats.peakWpm || 0, wpm);

    return {
      wpm,
      rawWpm,
      accuracy,
      cpm,
      mistakes,
      correctChars: correct,
      incorrectChars: incorrect,
      extraChars: Math.max(0, typed.length - target.length),
      missedChars: Math.max(0, target.length - typed.length),
      timeElapsed: Math.round(elapsedMs / 1000),
      totalTime: totalDuration,
      peakWpm,
      history: prevStats.history || []
    };
  };

  // Helper to determine next start text in Code Mode
  const loadCodeSnippet = (lang: string) => {
    const snippet = getSnippetByLanguage(lang);
    
    // Automatically pre-fill the first line's leading indentation
    const matchLeading = snippet.code.match(/^\s+/);
    const leadingWhitespace = matchLeading ? matchLeading[0] : '';
    
    return {
      text: snippet.code,
      typed: leadingWhitespace,
      title: snippet.title,
      language: snippet.language
    };
  };

  const getInitialText = (mode: TestMode, lang: string, wordsLimit: number): { text: string; typed: string; title: string; language: string } => {
    if (mode === 'code') {
      return loadCodeSnippet(lang);
    } else if (mode === 'quote') {
      const q = getRandomQuote();
      return { text: q.text, typed: '', title: q.author, language: 'Quote' };
    } else {
      const generated = generateWords(wordsLimit).join(' ');
      return { text: generated, typed: '', title: '', language: 'English' };
    }
  };

  return {
    preferences: DEFAULT_PREFERENCES,
    status: 'idle',
    textToType: '',
    typedText: '',
    startTime: null,
    endTime: null,
    mistakes: 0,
    correctChars: 0,
    incorrectChars: 0,
    extraChars: 0,
    missedChars: 0,
    timeLeft: 30,
    currentIndex: 0,
    snippetTitle: '',
    snippetLanguage: '',
    stats: {
      wpm: 0, rawWpm: 0, accuracy: 100, cpm: 0, mistakes: 0,
      correctChars: 0, incorrectChars: 0, extraChars: 0, missedChars: 0,
      timeElapsed: 0, totalTime: 30, peakWpm: 0, history: []
    },

    initPreferences: () => {
      const prefs = getInitialPreferences();
      set({ preferences: prefs });
      applyTheme(prefs.theme);
      applyFontSize(prefs.fontSize);
      get().resetTest();
    },

    updatePreferences: (prefs) => {
      const current = get().preferences;
      const updated = { ...current, ...prefs };
      
      localStorage.setItem('programmer-typing-preferences', JSON.stringify(updated));
      set({ preferences: updated });

      if (prefs.theme) applyTheme(prefs.theme);
      if (prefs.fontSize) applyFontSize(prefs.fontSize);

      // If key modes changed, regenerate target text
      if (prefs.mode !== undefined || prefs.language !== undefined || prefs.wordLimit !== undefined || prefs.timeLimit !== undefined) {
        get().resetTest();
      }
    },

    startTest: () => {
      const { preferences } = get();
      const initialTextData = getInitialText(preferences.mode, preferences.language, preferences.wordLimit);
      
      set({
        status: 'typing',
        startTime: Date.now(),
        endTime: null,
        timeLeft: preferences.mode === 'time' ? preferences.timeLimit : 0,
        typedText: initialTextData.typed,
        currentIndex: initialTextData.typed.length,
        mistakes: 0,
        stats: {
          wpm: 0, rawWpm: 0, accuracy: 100, cpm: 0, mistakes: 0,
          correctChars: 0, incorrectChars: 0, extraChars: 0, missedChars: 0,
          timeElapsed: 0, totalTime: preferences.mode === 'time' ? preferences.timeLimit : 0,
          peakWpm: 0, history: []
        }
      });
    },

    resetTest: () => {
      const { preferences } = get();
      const initialTextData = getInitialText(preferences.mode, preferences.language, preferences.wordLimit);
      
      set({
        status: 'idle',
        startTime: null,
        endTime: null,
        timeLeft: preferences.mode === 'time' ? preferences.timeLimit : 0,
        textToType: initialTextData.text,
        typedText: initialTextData.typed,
        currentIndex: initialTextData.typed.length,
        mistakes: 0,
        snippetTitle: initialTextData.title,
        snippetLanguage: initialTextData.language,
        stats: {
          wpm: 0, rawWpm: 0, accuracy: 100, cpm: 0, mistakes: 0,
          correctChars: 0, incorrectChars: 0, extraChars: 0, missedChars: 0,
          timeElapsed: 0, totalTime: preferences.mode === 'time' ? preferences.timeLimit : 0,
          peakWpm: 0, history: []
        }
      });
    },

    updateTypedText: (text) => {
      const { status, textToType, startTime, preferences, mistakes } = get();
      
      // If idle, start the test automatically on first typed key
      let currentStartTime = startTime;
      let currentStatus = status;

      if (status === 'idle') {
        currentStartTime = Date.now();
        currentStatus = 'typing';
      }

      const elapsed = currentStartTime ? Date.now() - currentStartTime : 0;
      const originalTextLength = text.length;

      // Detect if a mistake was made (comparing the latest character)
      let currentMistakes = mistakes;
      if (originalTextLength > get().typedText.length) {
        const lastIdx = originalTextLength - 1;
        if (text[lastIdx] !== textToType[lastIdx]) {
          currentMistakes++;
        }
      }

      // Check if test is completed (reached the end of snippet or target words)
      const isCompleted = text.length >= textToType.length;

      const newStats = calculateStats(
        text,
        textToType,
        elapsed,
        preferences.mode === 'time' ? preferences.timeLimit : elapsed / 1000,
        currentMistakes
      );

      set({
        status: isCompleted ? 'completed' : currentStatus,
        startTime: currentStartTime,
        endTime: isCompleted ? Date.now() : null,
        typedText: text,
        currentIndex: text.length,
        mistakes: currentMistakes,
        stats: newStats
      });

      if (isCompleted) {
        get().completeTest();
      }
    },

    tickTimer: () => {
      const { status, timeLeft, startTime, textToType, typedText, mistakes, preferences } = get();
      if (status !== 'typing') return;

      if (preferences.mode === 'time') {
        const nextTimeLeft = timeLeft - 1;
        const elapsed = startTime ? Date.now() - startTime : 0;
        
        if (nextTimeLeft <= 0) {
          // Timer ended
          const finalStats = calculateStats(typedText, textToType, elapsed, preferences.timeLimit, mistakes);
          set({
            status: 'completed',
            timeLeft: 0,
            endTime: Date.now(),
            stats: finalStats
          });
          get().completeTest();
        } else {
          // Update stats and tick down
          const currentStats = calculateStats(typedText, textToType, elapsed, preferences.timeLimit, mistakes);
          
          // Append WPM node to timeline history for stats charts
          const elapsedSec = Math.round(elapsed / 1000);
          const historyNode = {
            time: elapsedSec,
            wpm: currentStats.wpm,
            rawWpm: currentStats.rawWpm,
            accuracy: currentStats.accuracy
          };

          set({
            timeLeft: nextTimeLeft,
            stats: {
              ...currentStats,
              history: [...(currentStats.history || []), historyNode]
            }
          });
        }
      } else {
        // Words, Quote, or Code mode (counting up elapsed time)
        const elapsed = startTime ? Date.now() - startTime : 0;
        const currentStats = calculateStats(typedText, textToType, elapsed, elapsed / 1000, mistakes);
        
        const elapsedSec = Math.round(elapsed / 1000);
        const historyNode = {
          time: elapsedSec,
          wpm: currentStats.wpm,
          rawWpm: currentStats.rawWpm,
          accuracy: currentStats.accuracy
        };

        set({
          timeLeft: elapsedSec,
          stats: {
            ...currentStats,
            history: [...(currentStats.history || []), historyNode]
          }
        });
      }
    },

    completeTest: () => {
      // Perform final stats calculation
      const { startTime, endTime, typedText, textToType, mistakes, preferences, stats } = get();
      const elapsed = startTime && endTime ? endTime - startTime : 0;
      
      const finalStats = calculateStats(
        typedText,
        textToType,
        elapsed,
        preferences.mode === 'time' ? preferences.timeLimit : elapsed / 1000,
        mistakes
      );

      // Make sure the history includes the final state
      const finalTimeSec = Math.round(elapsed / 1000);
      const finalHistory = [
        ...(stats.history || []),
        {
          time: finalTimeSec,
          wpm: finalStats.wpm,
          rawWpm: finalStats.rawWpm,
          accuracy: finalStats.accuracy
        }
      ];

      set({
        status: 'completed',
        stats: {
          ...finalStats,
          history: finalHistory
        }
      });
    }
  };
});
