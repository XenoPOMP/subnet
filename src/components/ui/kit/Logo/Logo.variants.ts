import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import cn from 'classnames';

import styles from './Logo.module.scss';

export type LogoVariants = VariantProps<typeof logoVariantsVariants>;

export const logoVariantsVariants = cva(cn(styles.icon), {
  variants: {
    variant: {
      long: '',
      short: '',
    },
    painting: {
      color: cn(styles.color),
    },
  },
  defaultVariants: {
    variant: 'long',
    painting: 'color',
  },
});
