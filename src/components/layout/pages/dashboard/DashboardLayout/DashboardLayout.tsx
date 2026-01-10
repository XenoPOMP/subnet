import cn from 'classnames';
import type { VariableProps } from 'xenopomp-essentials';

import { TitleBar } from '@/components/ui/kit';

import styles from './DashboardLayout.module.scss';

/**
 * @todo Change comment after implementation of layout.
 */
export function DashboardLayout({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(styles.rootContainer, className)}
      {...props}
    >
      <TitleBar className={cn(styles.dashboardHeader)} />

      <div className={cn(styles.content)}>{children}</div>
    </div>
  );
}

interface DashboardLayoutProps {}
type Props = VariableProps<'div', DashboardLayoutProps>;
