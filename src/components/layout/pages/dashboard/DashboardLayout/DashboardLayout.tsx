import cn from 'classnames';
import type { VariableProps } from 'xenopomp-essentials';

import { ProjectSwitcher } from '@/components/ui';
import { TitleBar } from '@/components/ui/kit';

import styles from './DashboardLayout.module.scss';

/**
 */
export function DashboardLayout({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(styles.rootContainer, className)}
      {...props}
    >
      <TitleBar className={cn(styles.dashboardHeader)}>
        <ProjectSwitcher />
      </TitleBar>
      {children}
    </div>
  );
}

interface DashboardLayoutProps {}
type Props = VariableProps<'div', DashboardLayoutProps>;
