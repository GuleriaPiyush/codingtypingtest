export type ThemeMode = 'dark' | 'light';

export type TestMode = 'time' | 'words' | 'code' | 'quote';

export type TimeOption = 15 | 30 | 60 | 120;
export type WordOption = 25 | 50 | 100;

export type CaretStyle = 'line' | 'block' | 'underline' | 'none';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type SoundOption = 'off' | 'click' | 'beep';

export interface UserPreferences {
  theme: ThemeMode;
  mode: TestMode;
  timeLimit: TimeOption;
  wordLimit: WordOption;
  language: string;
  caretStyle: CaretStyle;
  fontSize: FontSize;
  sound: SoundOption;
  smoothAnimations: boolean;
  codeTimeLimit: number;
}

export type TestStatus = 'idle' | 'typing' | 'completed';

export interface HistoryNode {
  time: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
}

export interface TestStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  cpm: number;
  mistakes: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  timeElapsed: number;
  totalTime: number;
  peakWpm: number;
  history: HistoryNode[];
}

export interface CodeSnippet {
  id: string;
  language: string;
  title: string;
  code: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Quote {
  id: string;
  text: string;
  author: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  author: string;
  content: string; // Markdown or HTML content
  category: string;
  faqs: Array<{ q: string; a: string }>;
}
