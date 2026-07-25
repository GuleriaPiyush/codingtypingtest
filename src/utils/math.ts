export const calculateConsistency = (history: Array<{ rawWpm: number }>): number => {
  if (history.length < 2) return 100;
  
  const speeds = history.map(h => h.rawWpm);
  const n = speeds.length;
  const mean = speeds.reduce((sum, s) => sum + s, 0) / n;
  
  if (mean === 0) return 100;
  
  const variance = speeds.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  
  // Consistency = 100 * (1 - Coefficient of Variation)
  const cv = stdDev / mean;
  const consistency = Math.round(100 * (1 - cv));
  
  return Math.max(0, Math.min(100, consistency));
};
