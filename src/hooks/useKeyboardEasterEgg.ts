'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Listens for a secret word typed anywhere on the page.
 * Calls `onMatch` when the user types the keyword.
 */
export function useKeyboardEasterEgg(keyword: string, onMatch: () => void) {
  const buffer = useRef('');
  const upper = keyword.toUpperCase();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.length !== 1) return; // ignore special keys
      buffer.current = (buffer.current + e.key.toUpperCase()).slice(-upper.length);
      if (buffer.current === upper) {
        buffer.current = '';
        onMatch();
      }
    },
    [upper, onMatch],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
