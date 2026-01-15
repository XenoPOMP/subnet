import type { TWScreens } from '@/themes/extensions';

export interface MediaRenderedProps {
  /**
   * Define which screen to choose to determine whether render or not render item.
   */
  screen: TWScreens;

  /**
   * Determines which media query to apply.
   *
   * If equals **before**, container will show up only when available screen`s width is lower than breakpoint value.
   *
   * Otherwise, will render only when available width is greater or equal to breakpoint value.
   */
  relativeScreenDetection: 'before' | 'after';
}
