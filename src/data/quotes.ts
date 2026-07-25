import type { Quote } from '../types';

export const PROGRAMMER_QUOTES: Quote[] = [
  {
    id: 'q1',
    text: "Programs must be written for people to read, and only coincidentally for machines to execute.",
    author: "Harold Abelson"
  },
  {
    id: 'q2',
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra"
  },
  {
    id: 'q3',
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    id: 'q4',
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds"
  },
  {
    id: 'q5',
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    id: 'q6',
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck"
  },
  {
    id: 'q7',
    text: "Coding is not just code; it is a philosophy of solving puzzles in the most structured and clean way possible.",
    author: "Unknown"
  },
  {
    id: 'q8',
    text: "Software is a great combination between artistry and engineering.",
    author: "Bill Gates"
  },
  {
    id: 'q9',
    text: "Before software can be reusable it first has to be usable.",
    author: "Ralph Johnson"
  },
  {
    id: 'q10',
    text: "Computers are good at following instructions, but not at reading your mind.",
    author: "Donald Knuth"
  }
];

export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * PROGRAMMER_QUOTES.length);
  return PROGRAMMER_QUOTES[randomIndex];
};
