import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import cn from 'classnames';

import styles from './Button.module.scss';

export type ButtonVariantsType = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(cn(styles.button), {
  variants: {
    variant: {
      default: '',
      danger: cn(styles.danger),
    },
    square: {
      true: '!p-[0.8rem]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    square: false,
  },
});
