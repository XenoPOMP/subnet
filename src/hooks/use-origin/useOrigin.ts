'use client';

/**
 * Get current`s page origin.
 */
export const useOrigin = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.origin;
};
