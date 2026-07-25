import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useTypingTest } from '../../hooks/useTypingTest';

export const TypingArea = () => {
  const {
    textToType,
    typedText,
    currentIndex,
    status,
    preferences,
    snippetTitle,
    snippetLanguage,
    resetTest
  } = useGameStore();

  const {
    isFocused,
    containerRef,
    handleFocus,
    handleBlur
  } = useTypingTest();

  const [caretPos, setCaretPos] = useState({ left: 0, top: 0, width: 2, height: 24 });
  const [isCaretBlinking, setIsCaretBlinking] = useState(true);
  const caretTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update caret position based on active character
  const updateCaretPosition = () => {
    if (!containerRef.current) return;

    const activeEl = containerRef.current.querySelector('.char-active') as HTMLElement;
    if (activeEl) {
      setCaretPos({
        left: activeEl.offsetLeft,
        top: activeEl.offsetTop,
        width: preferences.caretStyle === 'block' ? activeEl.offsetWidth : (preferences.caretStyle === 'underline' ? activeEl.offsetWidth : 2),
        height: preferences.caretStyle === 'underline' ? 3 : activeEl.offsetHeight || 24
      });
    } else {
      // If at the end of the text
      const lastEl = containerRef.current.querySelector('.char-last') as HTMLElement;
      if (lastEl) {
        setCaretPos({
          left: lastEl.offsetLeft + lastEl.offsetWidth,
          top: lastEl.offsetTop,
          width: preferences.caretStyle === 'block' ? 10 : 2,
          height: lastEl.offsetHeight || 24
        });
      }
    }
  };

  // Keep caret position synced with active index, window resizes, and focus
  useEffect(() => {
    updateCaretPosition();
    
    // Stop blinking while typing, restart after 800ms of inactivity
    setIsCaretBlinking(false);
    if (caretTimeoutRef.current) clearTimeout(caretTimeoutRef.current);
    
    caretTimeoutRef.current = setTimeout(() => {
      setIsCaretBlinking(true);
    }, 800);

    return () => {
      if (caretTimeoutRef.current) clearTimeout(caretTimeoutRef.current);
    };
  }, [currentIndex, typedText, isFocused, preferences.caretStyle]);

  // Window resize handler
  useEffect(() => {
    window.addEventListener('resize', updateCaretPosition);
    return () => {
      window.removeEventListener('resize', updateCaretPosition);
    };
  }, [currentIndex, textToType]);

  // Focus caret on mount
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  // Split text into line tokens (useful for code mode indentation formatting)
  const renderTypingText = () => {
    if (preferences.mode === 'code') {
      const lines = textToType.split('\n');
      let globalIndex = 0;

      return (
        <div className="flex flex-col w-full text-left leading-relaxed">
          {lines.map((line, lineIdx) => {
            const lineChars = line.split('');
            const currentLineStartIndex = globalIndex;
            globalIndex += line.length + 1; // +1 for the newline character

            return (
              <div key={lineIdx} className="flex flex-wrap items-center min-h-[1.8em]">
                {lineChars.map((char, charIdx) => {
                  const absoluteCharIndex = currentLineStartIndex + charIdx;
                  let charClass = 'text-[var(--color-sub)] opacity-40';
                  let isActive = absoluteCharIndex === currentIndex;

                  if (absoluteCharIndex < currentIndex) {
                    const wasCorrect = typedText[absoluteCharIndex] === char;
                    charClass = wasCorrect 
                      ? 'text-[var(--color-correct)]' 
                      : 'text-[var(--color-error)] border-b border-[var(--color-error)]';
                  }

                  return (
                    <span
                      key={charIdx}
                      className={`font-mono transition-colors duration-75 relative ${charClass} ${
                        isActive ? 'char-active text-[var(--color-text)]' : ''
                      } ${
                        absoluteCharIndex === textToType.length - 1 ? 'char-last' : ''
                      }`}
                      style={{ whiteSpace: 'pre' }}
                    >
                      {char}
                    </span>
                  );
                })}

                {/* Render trailing enter symbol for newlines if not the last line */}
                {lineIdx < lines.length - 1 && (() => {
                  const newlineIndex = currentLineStartIndex + line.length;
                  let charClass = 'text-[var(--color-sub)] opacity-20';
                  let isActive = newlineIndex === currentIndex;

                  if (newlineIndex < currentIndex) {
                    charClass = 'text-[var(--color-correct)] opacity-30';
                  }

                  return (
                    <span
                      className={`font-mono text-xs ml-1 ${charClass} ${
                        isActive ? 'char-active text-[var(--color-text)]' : ''
                      } ${
                        newlineIndex === textToType.length - 1 ? 'char-last' : ''
                      }`}
                    >
                      ⏎
                    </span>
                  );
                })()}
              </div>
            );
          })}
        </div>
      );
    } else {
      // Standard prose modes: render word lists wrapping naturally
      const words = textToType.split(' ');
      let globalIndex = 0;

      return (
        <div className="flex flex-wrap gap-x-[0.5em] gap-y-[0.3em] w-full text-left leading-relaxed">
          {words.map((word, wordIdx) => {
            const wordChars = word.split('');
            const wordStartIdx = globalIndex;
            globalIndex += word.length + 1; // +1 for space

            // Determine if the cursor is currently inside this word
            const isWordActive = currentIndex >= wordStartIdx && currentIndex < wordStartIdx + word.length + 1;

            return (
              <span 
                key={wordIdx} 
                className={`relative flex items-center ${isWordActive ? 'border-b border-[var(--color-sub)]/10 bg-[var(--color-sub-alt)]/10 rounded-sm px-0.5' : 'px-0.5'}`}
              >
                {wordChars.map((char, charIdx) => {
                  const absoluteCharIndex = wordStartIdx + charIdx;
                  let charClass = 'text-[var(--color-sub)]';
                  let isActive = absoluteCharIndex === currentIndex;

                  if (absoluteCharIndex < currentIndex) {
                    const wasCorrect = typedText[absoluteCharIndex] === char;
                    charClass = wasCorrect 
                      ? 'text-[var(--color-correct)]' 
                      : 'text-[var(--color-error)] border-b border-[var(--color-error)]';
                  }

                  return (
                    <span
                      key={charIdx}
                      className={`font-mono transition-colors duration-75 ${charClass} ${
                        isActive ? 'char-active text-[var(--color-text)]' : ''
                      } ${
                        absoluteCharIndex === textToType.length - 1 ? 'char-last' : ''
                      }`}
                    >
                      {char}
                    </span>
                  );
                })}

                {/* Render the trailing space after the word (except for the last word) */}
                {wordIdx < words.length - 1 && (() => {
                  const spaceIndex = wordStartIdx + word.length;
                  let charClass = 'text-[var(--color-sub)]';
                  let isActive = spaceIndex === currentIndex;

                  if (spaceIndex < currentIndex) {
                    const wasCorrect = typedText[spaceIndex] === ' ';
                    charClass = wasCorrect ? 'text-[var(--color-correct)]' : 'bg-[var(--color-error)]/30 text-[var(--color-error)]';
                  }

                  return (
                    <span
                      className={`font-mono ${charClass} ${
                        isActive ? 'char-active text-[var(--color-text)]' : ''
                      } ${
                        spaceIndex === textToType.length - 1 ? 'char-last' : ''
                      }`}
                      style={{ whiteSpace: 'pre' }}
                    >
                      {' '}
                    </span>
                  );
                })()}
              </span>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Title/Language Indicator for snippets or quote author */}
      {preferences.mode === 'code' && snippetTitle && (
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-[var(--color-sub)] mb-2 px-2 uppercase tracking-widest select-none">
          <span>{snippetLanguage} snippet</span>
          <span>{snippetTitle}</span>
        </div>
      )}
      {preferences.mode === 'quote' && snippetTitle && (
        <div className="w-full flex items-center justify-end text-[11px] font-mono text-[var(--color-sub)] mb-2 px-2 uppercase tracking-widest select-none">
          <span>&mdash; {snippetTitle}</span>
        </div>
      )}

      {/* Typing core container */}
      <div
        ref={containerRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        className="w-full min-h-[140px] px-6 py-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-sub-alt)]/50 focus:outline-none cursor-text select-none relative overflow-hidden"
        style={{ fontSize: 'var(--font-size-base)' }}
        aria-label="Typing test area. Press key characters to type."
      >
        {/* Glide cursor (Caret) */}
        {isFocused && preferences.caretStyle !== 'none' && status !== 'completed' && (
          <motion.div
            className={`absolute bg-[var(--color-caret)] z-10 ${
              isCaretBlinking 
                ? (preferences.caretStyle === 'block' ? 'caret-blink-block' : 'caret-blink-line') 
                : ''
            }`}
            style={{
              left: caretPos.left,
              top: caretPos.top,
              width: caretPos.width,
              height: caretPos.height,
              mixBlendMode: preferences.caretStyle === 'block' ? 'difference' : 'normal',
              opacity: preferences.caretStyle === 'block' ? 0.35 : 0.85
            }}
            layout={preferences.smoothAnimations}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}

        {/* Focus Blur Overlay */}
        <AnimatePresence>
          {!isFocused && status !== 'completed' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[var(--color-bg)]/90 backdrop-blur-[2px] z-20 flex flex-col gap-2 items-center justify-center text-sm font-mono cursor-pointer"
              onClick={handleFocus}
            >
              <span className="text-[var(--color-main)] font-semibold animate-pulse">
                Click here or press Esc to focus
              </span>
              <span className="text-xs text-[var(--color-sub)]">
                Typing will register automatically when focused
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text rendering */}
        {renderTypingText()}
      </div>

      {/* Quick restart helper cue */}
      <div className="w-full flex items-center justify-center mt-6 gap-3 select-none">
        <button
          onClick={resetTest}
          className="px-4 py-2 text-xs font-mono font-medium rounded-xl text-[var(--color-sub)] hover:text-[var(--color-main)] bg-[var(--color-sub-alt)]/20 hover:bg-[var(--color-sub-alt)]/50 border border-[var(--color-sub-alt)]/30 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          title="Restart typing test (shortcut: Tab)"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 6H16" />
          </svg>
          <span>Restart Test</span>
        </button>
      </div>
    </div>
  );
};

export default TypingArea;
