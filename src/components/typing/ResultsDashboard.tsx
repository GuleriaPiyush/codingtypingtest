import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Share2, Check } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { calculateConsistency } from '../../utils/math';

export const ResultsDashboard = () => {
  const stats = useGameStore((state) => state.stats);
  const preferences = useGameStore((state) => state.preferences);
  const resetTest = useGameStore((state) => state.resetTest);
  
  const [copied, setCopied] = useState(false);

  const duration = stats.timeElapsed || 1;
  const consistency = calculateConsistency(stats.history);

  // Generate shareable results text
  const shareResults = () => {
    const text = `💻 CodeType - Programmer Typing Test
------------------------------
Language: ${preferences.mode === 'code' ? preferences.language.toUpperCase() : preferences.mode}
Speed (WPM): ${stats.wpm}
Raw Speed: ${stats.rawWpm}
Accuracy: ${stats.accuracy}%
Mistakes: ${stats.mistakes}
Time: ${duration}s
Consistency: ${consistency}%
------------------------------
Improve your coding speed at: https://codetype.dev`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // SVG Chart rendering calculations
  const renderChart = () => {
    const history = stats.history || [];
    if (history.length < 2) {
      return (
        <div className="h-48 flex items-center justify-center text-xs font-mono text-[var(--color-sub)] border border-[var(--color-sub-alt)]/30 rounded-xl bg-[var(--color-sub-alt)]/10">
          Not enough historical speed data to render chart. Try typing for a longer duration.
        </div>
      );
    }

    const width = 600;
    const height = 180;
    const padding = 20;

    const maxTime = Math.max(...history.map(h => h.time));
    const maxWpm = Math.max(...history.map(h => Math.max(h.wpm, h.rawWpm, 40))); // Default limit floor

    const getX = (t: number) => padding + (t / maxTime) * (width - 2 * padding);
    const getY = (w: number) => height - padding - (w / maxWpm) * (height - 2 * padding);

    // Build SVG paths
    let wpmPath = '';
    let rawWpmPath = '';

    history.forEach((node, idx) => {
      const x = getX(node.time);
      const yWpm = getY(node.wpm);
      const yRaw = getY(node.rawWpm);

      if (idx === 0) {
        wpmPath = `M ${x} ${yWpm}`;
        rawWpmPath = `M ${x} ${yRaw}`;
      } else {
        wpmPath += ` L ${x} ${yWpm}`;
        rawWpmPath += ` L ${x} ${yRaw}`;
      }
    });

    // Build shaded area path under WPM line
    const wpmAreaPath = `${wpmPath} L ${getX(maxTime)} ${height - padding} L ${getX(history[0].time)} ${height - padding} Z`;

    return (
      <div className="w-full select-none" aria-hidden="true">
        <h3 className="text-xs font-mono font-medium tracking-widest text-[var(--color-sub)] uppercase mb-3 text-left">
          speed history chart (WPM / RAW WPM)
        </h3>
        <div className="w-full overflow-hidden border border-[var(--color-sub-alt)]/30 rounded-xl bg-[var(--color-sub-alt)]/10 p-3">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            {/* Grid Lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const yVal = Math.round(maxWpm * ratio);
              const y = getY(yVal);
              return (
                <g key={i} className="opacity-10">
                  <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="var(--color-text)" strokeWidth="1" strokeDasharray="3,3" />
                  <text x={padding - 5} y={y + 3} fill="var(--color-text)" className="text-[8px] font-mono text-right" textAnchor="end">
                    {yVal}
                  </text>
                </g>
              );
            })}

            {/* Time labels */}
            {history.map((h, i) => {
              if (i % Math.ceil(history.length / 5) === 0 || i === history.length - 1) {
                return (
                  <text key={i} x={getX(h.time)} y={height - 4} fill="var(--color-text)" className="text-[8px] font-mono opacity-25" textAnchor="middle">
                    {h.time}s
                  </text>
                );
              }
              return null;
            })}

            {/* Shaded Area Under WPM */}
            <path d={wpmAreaPath} fill="var(--color-main)" className="opacity-5" />

            {/* Raw WPM Path (gray) */}
            <path d={rawWpmPath} fill="none" stroke="var(--color-sub)" strokeWidth="1.5" className="opacity-40" strokeDasharray="4,2" />

            {/* WPM Path (brand yellow) */}
            <motion.path
              d={wpmPath}
              fill="none"
              stroke="var(--color-main)"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Accuracy Dots */}
            {history.map((node, i) => {
              const x = getX(node.time);
              // Map accuracy (0-100) to top quadrant of graph
              const yAcc = padding + (1 - node.accuracy / 100) * 40;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={yAcc}
                  r="1.5"
                  fill={node.accuracy === 100 ? '#10b981' : '#ca4754'}
                  className="opacity-75"
                />
              );
            })}
          </svg>
        </div>
        <div className="flex gap-4 items-center justify-end mt-2 text-[9px] font-mono text-[var(--color-sub)] opacity-70">
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[var(--color-main)] inline-block"></span> WPM</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[var(--color-sub)] opacity-40 inline-block stroke-dasharray"></span> Raw WPM</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Accuracy</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-8 bg-[var(--color-bg)] text-center py-6 px-4"
    >
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 select-none font-mono">
        <div className="flex flex-col items-center p-4 bg-[var(--color-sub-alt)]/25 rounded-2xl border border-[var(--color-sub-alt)]/35">
          <span className="text-[10px] text-[var(--color-sub)] uppercase tracking-widest font-semibold mb-1">wpm</span>
          <span className="text-4xl md:text-5xl font-bold text-[var(--color-main)]">{stats.wpm}</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-[var(--color-sub-alt)]/25 rounded-2xl border border-[var(--color-sub-alt)]/35">
          <span className="text-[10px] text-[var(--color-sub)] uppercase tracking-widest font-semibold mb-1">accuracy</span>
          <span className="text-4xl md:text-5xl font-bold text-[var(--color-correct)]">{stats.accuracy}%</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-[var(--color-sub-alt)]/25 rounded-2xl border border-[var(--color-sub-alt)]/35">
          <span className="text-[10px] text-[var(--color-sub)] uppercase tracking-widest font-semibold mb-1">consistency</span>
          <span className="text-4xl md:text-5xl font-bold text-[var(--color-text)]">{consistency}%</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-[var(--color-sub-alt)]/25 rounded-2xl border border-[var(--color-sub-alt)]/35">
          <span className="text-[10px] text-[var(--color-sub)] uppercase tracking-widest font-semibold mb-1">time</span>
          <span className="text-4xl md:text-5xl font-bold text-[var(--color-text)]">{duration}s</span>
        </div>
      </div>

      {/* Grid details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Detail text columns */}
        <div className="flex flex-col gap-4 font-mono text-left bg-[var(--color-sub-alt)]/10 border border-[var(--color-sub-alt)]/20 p-5 rounded-2xl text-xs text-[var(--color-sub)]">
          <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-text)] border-b border-[var(--color-sub-alt)] pb-2 mb-1">
            typing statistics breakdown
          </h3>
          
          <div className="flex justify-between items-center py-1">
            <span>Peak Speed:</span>
            <span className="font-bold text-[var(--color-text)]">{stats.peakWpm || stats.wpm} WPM</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Raw Typing Speed:</span>
            <span className="font-bold text-[var(--color-text)]">{stats.rawWpm} WPM</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Total Errors Made:</span>
            <span className="font-bold text-[var(--color-error)]">{stats.mistakes}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Characters Typed:</span>
            <span className="font-bold text-[var(--color-text)]">
              {stats.correctChars} <span className="text-emerald-500">ok</span> / {stats.incorrectChars} <span className="text-[var(--color-error)]">err</span> / {stats.extraChars} <span className="text-amber-500">extra</span>
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Characters Per Minute (CPM):</span>
            <span className="font-bold text-[var(--color-text)]">{stats.cpm}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Test Mode Selected:</span>
            <span className="font-bold text-[var(--color-main)] uppercase">{preferences.mode}</span>
          </div>
        </div>

        {/* SVG Performance Chart */}
        {renderChart()}
      </div>

      {/* Button Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 select-none">
        <button
          onClick={resetTest}
          className="px-6 py-3 font-mono font-medium rounded-xl text-[var(--color-bg)] bg-[var(--color-main)] hover:bg-[var(--color-main)]/90 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <RefreshCw size={15} className="animate-spin-hover" />
          <span>Restart Test</span>
        </button>

        <button
          onClick={shareResults}
          className="px-6 py-3 font-mono font-medium rounded-xl text-[var(--color-text)] bg-[var(--color-sub-alt)] hover:bg-[var(--color-sub-alt)]/80 hover:scale-[1.02] transition-all border border-[var(--color-sub-alt)]/50 flex items-center gap-2 cursor-pointer shadow-sm"
        >
          {copied ? <Check size={15} className="text-emerald-500" /> : <Share2 size={15} />}
          <span>{copied ? 'Copied Results!' : 'Share Results'}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ResultsDashboard;
