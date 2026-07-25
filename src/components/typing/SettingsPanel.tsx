import { motion } from 'framer-motion';
import { Clock, AlignLeft, Code, Quote, ChevronDown } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import type { TestMode, TimeOption, WordOption } from '../../types';
import { getSnippetLanguages } from '../../data/snippets';

export const SettingsPanel = () => {
  const preferences = useGameStore((state) => state.preferences);
  const updatePreferences = useGameStore((state) => state.updatePreferences);
  const status = useGameStore((state) => state.status);

  // Disable controls while typing
  if (status === 'typing') return <div className="h-10" />; // Keep spacing placeholder

  const modes: { id: TestMode; label: string; icon: React.ReactNode }[] = [
    { id: 'time', label: 'time', icon: <Clock size={14} /> },
    { id: 'words', label: 'words', icon: <AlignLeft size={14} /> },
    { id: 'code', label: 'code', icon: <Code size={14} /> },
    { id: 'quote', label: 'quote', icon: <Quote size={14} /> }
  ];

  const timeLimits: TimeOption[] = [15, 30, 60, 120];
  const wordLimits: WordOption[] = [25, 50, 100];
  const languages = getSnippetLanguages();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono select-none mb-10 w-full"
    >
      <div className="flex items-center bg-[var(--color-sub-alt)]/60 px-3 py-1.5 rounded-xl border border-[var(--color-sub-alt)]/20 shadow-sm gap-4 transition-all">
        {/* Core Modes */}
        <div className="flex items-center gap-2 pr-4 border-r border-[var(--color-sub)]/20">
          {modes.map((m) => {
            const isActive = preferences.mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => updatePreferences({ mode: m.id })}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  isActive 
                    ? 'text-[var(--color-main)] bg-[var(--color-bg)] font-bold' 
                    : 'text-[var(--color-sub)] hover:text-[var(--color-text)]'
                }`}
                aria-label={`Switch to ${m.label} mode`}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mode Settings */}
        <div className="flex items-center">
          {/* Time Options */}
          {preferences.mode === 'time' && (
            <div className="flex items-center gap-2">
              {timeLimits.map((t) => (
                <button
                  key={t}
                  onClick={() => updatePreferences({ timeLimit: t })}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    preferences.timeLimit === t 
                      ? 'text-[var(--color-main)] font-bold' 
                      : 'text-[var(--color-sub)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {/* Word Options */}
          {preferences.mode === 'words' && (
            <div className="flex items-center gap-2">
              {wordLimits.map((w) => (
                <button
                  key={w}
                  onClick={() => updatePreferences({ wordLimit: w })}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    preferences.wordLimit === w 
                      ? 'text-[var(--color-main)] font-bold' 
                      : 'text-[var(--color-sub)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          )}

          {/* Code Options (Language Dropdown & Timer) */}
          {preferences.mode === 'code' && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex items-center gap-2">
                <span className="text-[var(--color-sub)] font-medium">language:</span>
                <div className="relative group">
                  <select
                    value={preferences.language}
                    onChange={(e) => updatePreferences({ language: e.target.value })}
                    className="appearance-none bg-[var(--color-bg)] text-[var(--color-main)] font-bold px-3 pr-8 py-1 rounded-lg border border-[var(--color-sub-alt)] focus:outline-none cursor-pointer text-xs"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang} className="bg-[var(--color-bg)] text-[var(--color-text)]">
                        {lang.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-main)] pointer-events-none" />
                </div>
              </div>
              <div className="w-[1px] h-4 bg-[var(--color-sub)]/20" />
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-sub)] font-medium">time:</span>
                <div className="flex items-center gap-1.5">
                  {([0, 15, 30, 60, 120] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => updatePreferences({ codeTimeLimit: t })}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        (preferences.codeTimeLimit ?? 0) === t 
                          ? 'text-[var(--color-main)] font-bold' 
                          : 'text-[var(--color-sub)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      {t === 0 ? 'none' : t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quote mode placeholder */}
          {preferences.mode === 'quote' && (
            <span className="text-[var(--color-sub)] italic">random programmer quotes</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
