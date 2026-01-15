import type { LenientAutocomplete } from 'xenopomp-essentials';

import type { TailwindExtension } from '../extensions';

export const SCREENS = {
  screens: {
    sm: '769px',
    md: '960px',
    lg: '1440px',
  },
} satisfies TailwindExtension;

type StrictScreens = keyof (typeof SCREENS)['screens'];
export type TWScreens = LenientAutocomplete<StrictScreens>;
