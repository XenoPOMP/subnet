import type { Config } from 'tailwindcss';

type Theme = NonNullable<NonNullable<Config['theme']>['extend']>;

/**
 * This theme is **default**.
 */
export const darkTheme = {
  colors: {
    accent: '#A27277',
    divider:
      'rgba(170.0000050663948 197.0000034570694 167.00000524520874 / 0.25)',
    shallow: '#787878',
    'shallow-light': '#A2A2A2',
    danger: '#E23336',
    overlap: '#FF9000',
    'overlap-bg': 'rgba(255 144.00000661611557 0 / 0.10000000149011612)',
    primary: {
      bg: '#0E140E',
      font: '#EAF0E9',
      'bg-brutal': '#0A0F0A',
      block: {
        bg: 'rgba(170.0000050663948 197.0000034570694 167.00000524520874 / 0.10000000149011612)',
      },
    },
    color: {
      primary: '#AAC5A7',
      secondary: '#593D5C',
    },
    logo: {
      main: '#F1B600',
      accent: '#008A39',
    },
    input: {
      bg: '#131B13',
      'bg-light': '#1B241B',
      'bg-lighter': '#293529',
    },
  },
} satisfies Theme;
