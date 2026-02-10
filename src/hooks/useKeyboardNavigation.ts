import { useEffect } from 'react';

export function useKeyboardNavigation(
  isActive: boolean,
  onEscape: () => void,
  onArrowLeft: () => void,
  onArrowRight: () => void
) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape();
      if (e.key === 'ArrowLeft') onArrowLeft();
      if (e.key === 'ArrowRight') onArrowRight();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onEscape, onArrowLeft, onArrowRight]);
}
