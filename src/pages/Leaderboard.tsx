import { motion } from 'framer-motion';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { Trophy, ShieldAlert, Award, Star } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  wpm: number;
  accuracy: number;
  language: string;
  date: string;
}

export const Leaderboard = () => {
  useDocumentMetadata({
    title: 'Programmer Leaderboard',
    description: 'View the highest typing speeds recorded on CodeType for JavaScript, Python, TypeScript, Rust, and C++ code snippets.',
    canonicalUrl: 'https://codetype.dev/leaderboard'
  });

  const mockData: LeaderboardEntry[] = [
    { rank: 1, username: 'rustacean_god', wpm: 142, accuracy: 99.8, language: 'rust', date: '2026-07-24' },
    { rank: 2, username: 'linus_torv', wpm: 135, accuracy: 98.5, language: 'c', date: '2026-07-23' },
    { rank: 3, username: 'dan_abramov', wpm: 122, accuracy: 99.1, language: 'react jsx', date: '2026-07-25' },
    { rank: 4, username: 'py_wizard', wpm: 118, accuracy: 97.4, language: 'python', date: '2026-07-22' },
    { rank: 5, username: 'gopher_guy', wpm: 112, accuracy: 98.9, language: 'go', date: '2026-07-25' },
    { rank: 6, username: 'ts_dev', wpm: 109, accuracy: 99.0, language: 'typescript', date: '2026-07-21' },
    { rank: 7, username: 'bracket_masher', wpm: 98, accuracy: 95.6, language: 'c++', date: '2026-07-24' },
    { rank: 8, username: 'lambda_hero', wpm: 95, accuracy: 98.2, language: 'java', date: '2026-07-20' },
  ];

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500 w-4 h-4" />;
      case 2:
        return <Award className="text-zinc-300 w-4 h-4" />;
      case 3:
        return <Award className="text-amber-600 w-4 h-4" />;
      default:
        return <Star className="text-[var(--color-sub)] opacity-30 w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full select-none"
    >
      <header className="mb-10 text-left">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] mb-3 font-mono">
          &lt;leaderboard&gt;
        </h1>
        <p className="text-sm text-[var(--color-sub)] leading-relaxed">
          The fastest developer typing speeds across multiple languages. This is currently a simulated leaderboard, 
          which will support live user stats sync and authentication in a future update.
        </p>
      </header>

      {/* Leaderboard Table */}
      <div className="w-full overflow-hidden border border-[var(--color-sub-alt)]/35 bg-[var(--color-sub-alt)]/10 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-[var(--color-sub-alt)] text-[var(--color-sub)] bg-[var(--color-sub-alt)]/25">
                <th className="py-4 px-6 font-semibold w-16">Rank</th>
                <th className="py-4 px-6 font-semibold">User</th>
                <th className="py-4 px-6 font-semibold text-right">WPM</th>
                <th className="py-4 px-6 font-semibold text-right">Accuracy</th>
                <th className="py-4 px-6 font-semibold text-center">Language</th>
                <th className="py-4 px-6 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-sub-alt)]/30 text-[var(--color-sub)]">
              {mockData.map((row) => (
                <tr 
                  key={row.rank} 
                  className="hover:bg-[var(--color-sub-alt)]/15 transition-colors group"
                >
                  <td className="py-4 px-6 font-bold flex items-center gap-2">
                    {getRankBadge(row.rank)}
                    <span className={row.rank <= 3 ? 'text-[var(--color-text)]' : ''}>{row.rank}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-[var(--color-text)]">
                    {row.username}
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-[var(--color-main)] text-sm">
                    {row.wpm}
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-[var(--color-correct)]">
                    {row.accuracy}%
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="bg-[var(--color-sub-alt)]/50 px-2 py-0.5 rounded border border-[var(--color-sub-alt)]/20 text-[var(--color-text)] text-[10px] uppercase">
                      {row.language}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right opacity-80 text-[10px]">
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cloud Sync Announcement */}
      <div className="mt-6 p-4 rounded-xl border border-[var(--color-sub-alt)]/20 bg-[var(--color-sub-alt)]/10 text-[11px] text-[var(--color-sub)] font-mono flex items-center gap-3">
        <ShieldAlert size={14} className="text-[var(--color-main)] shrink-0" />
        <span>
          Authentication and server-synchronized leaderboards are coming soon. Your personal scores are currently saved to local storage!
        </span>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
