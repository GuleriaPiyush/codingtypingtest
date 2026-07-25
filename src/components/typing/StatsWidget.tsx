import { useGameStore } from '../../store/useGameStore';

export const StatsWidget = () => {
  const timeLeft = useGameStore((state) => state.timeLeft);
  const status = useGameStore((state) => state.status);
  const stats = useGameStore((state) => state.stats);
  const preferences = useGameStore((state) => state.preferences);
  const typedText = useGameStore((state) => state.typedText);
  const textToType = useGameStore((state) => state.textToType);

  if (status !== 'typing') {
    return <div className="h-10 mb-4" />; // Placeholder spacing
  }

  // Live calculation of character breakdown
  let correct = 0;
  let incorrect = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (i >= textToType.length) continue;
    if (typedText[i] === textToType[i]) {
      correct++;
    } else {
      incorrect++;
    }
  }
  const missed = Math.max(0, textToType.length - typedText.length);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-4xl mx-auto mb-6 px-2 select-none font-mono text-xs text-[var(--color-sub)]">
      {/* Left: Large timer or status counter */}
      <div className="flex items-end gap-1.5">
        <span className="text-3xl font-bold text-[var(--color-main)] leading-none">
          {preferences.mode === 'time' ? timeLeft : stats.timeElapsed}
        </span>
        <span className="text-[10px] uppercase tracking-wider mb-1">
          {preferences.mode === 'time' ? 's remaining' : 's elapsed'}
        </span>
      </div>

      {/* Right: Live stats breakdown */}
      <div className="flex items-center gap-6 bg-[var(--color-sub-alt)]/20 border border-[var(--color-sub-alt)]/40 px-4 py-2 rounded-xl">
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-[var(--color-text)]">{stats.wpm}</span>
          <span className="text-[9px] uppercase tracking-wider opacity-70">WPM</span>
        </div>
        <div className="w-[1px] h-6 bg-[var(--color-sub-alt)]" />

        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-[var(--color-text)]">{stats.rawWpm}</span>
          <span className="text-[9px] uppercase tracking-wider opacity-70">Raw WPM</span>
        </div>
        <div className="w-[1px] h-6 bg-[var(--color-sub-alt)]" />

        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-[var(--color-text)]">{stats.accuracy}%</span>
          <span className="text-[9px] uppercase tracking-wider opacity-70">Accuracy</span>
        </div>
        <div className="w-[1px] h-6 bg-[var(--color-sub-alt)]" />

        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-[var(--color-text)]">{stats.cpm}</span>
          <span className="text-[9px] uppercase tracking-wider opacity-70">CPM</span>
        </div>
        <div className="w-[1px] h-6 bg-[var(--color-sub-alt)]" />

        {/* Char breakdowns */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-emerald-500">{correct}</span>
            <span className="text-[8px] uppercase tracking-wider opacity-70">Ok</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-[var(--color-error)]">{incorrect}</span>
            <span className="text-[8px] uppercase tracking-wider opacity-70">Err</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-zinc-500">{missed}</span>
            <span className="text-[8px] uppercase tracking-wider opacity-70">Miss</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;
