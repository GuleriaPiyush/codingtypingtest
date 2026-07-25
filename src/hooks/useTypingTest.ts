import { useState, useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { soundService } from '../services/sound';

export const useTypingTest = () => {
  const [isFocused, setIsFocused] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    status,
    textToType,
    typedText,
    currentIndex,
    preferences,
    updateTypedText,
    resetTest
  } = useGameStore();

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isFocused || status === 'completed') return;

    // Ignore system shortcuts
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // 1. Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (typedText.length === 0) return;

      // In Code Mode, check if we are deleting an auto-indented block
      if (preferences.mode === 'code') {
        const lastChar = typedText[typedText.length - 1];
        
        // If we are deleting a space, let's check if there is a series of leading spaces on the line
        if (lastChar === ' ') {
          // Find the last newline
          const lastNewlineIdx = typedText.lastIndexOf('\n');
          const substringAfterNewline = typedText.slice(lastNewlineIdx + 1);
          
          // If the text after the last newline is all spaces, it means it's auto-indentation.
          // In this case, we can delete the whole indentation block back to the newline!
          if (/^\s+$/.test(substringAfterNewline)) {
            const nextTyped = typedText.slice(0, lastNewlineIdx + 1);
            updateTypedText(nextTyped);
            if (preferences.sound !== 'off') soundService.playClick();
            return;
          }
        }
      }

      // Default backspace: delete 1 character
      const nextTyped = typedText.slice(0, -1);
      updateTypedText(nextTyped);
      if (preferences.sound !== 'off') soundService.playClick();
      return;
    }

    // 2. Handle Space (Skip to next word in time/words mode)
    if (e.key === ' ' && preferences.mode !== 'code') {
      e.preventDefault();
      
      const targetChar = textToType[currentIndex];
      if (targetChar === ' ') {
        // Correct space
        updateTypedText(typedText + ' ');
        if (preferences.sound !== 'off') soundService.playClick();
      } else {
        // Space was pressed in the middle of a word: skip to the next word
        const nextSpaceIdx = textToType.indexOf(' ', currentIndex);
        if (nextSpaceIdx !== -1) {
          // Append the remaining letters of the word as incorrect/missed, plus the space itself
          const skippedText = textToType.slice(currentIndex, nextSpaceIdx + 1);
          updateTypedText(typedText + skippedText);
          if (preferences.sound !== 'off') soundService.playBeep();
        }
      }
      return;
    }

    // 3. Handle Enter (Next line in Code Mode)
    if (e.key === 'Enter') {
      e.preventDefault();
      if (preferences.mode !== 'code') return;

      const targetChar = textToType[currentIndex];
      if (targetChar === '\n') {
        // Type the newline
        let nextTyped = typedText + '\n';
        
        // Auto-advance past leading indentation of the next line
        const remainingText = textToType.slice(currentIndex + 1);
        const matchLeading = remainingText.match(/^\s+/);
        if (matchLeading) {
          nextTyped += matchLeading[0];
        }
        
        updateTypedText(nextTyped);
        if (preferences.sound !== 'off') soundService.playClick();
      } else {
        // Incorrect Enter
        if (preferences.sound !== 'off') soundService.playBeep();
      }
      return;
    }

    // 4. Handle standard character keys
    if (e.key.length === 1) {
      e.preventDefault();
      
      // Stop typing if we already matched the entire snippet
      if (currentIndex >= textToType.length) return;

      const targetChar = textToType[currentIndex];
      const typedChar = e.key;

      const nextTyped = typedText + typedChar;
      updateTypedText(nextTyped);

      // Play feedback sound
      if (preferences.sound !== 'off') {
        if (typedChar === targetChar) {
          soundService.playClick();
        } else {
          soundService.playBeep();
        }
      }
    }
  }, [isFocused, status, typedText, currentIndex, textToType, preferences, updateTypedText]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    isFocused,
    setIsFocused,
    containerRef,
    handleFocus,
    handleBlur,
    resetTest
  };
};
