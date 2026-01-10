import cn from 'classnames';

import { For } from '@/components/layout';

import styles from './NetForm.module.scss';

// eslint-disable-next-line jsdoc/require-jsdoc
export function NetForm() {
  return (
    <aside className={cn(styles.form)}>
      <header className={cn(styles.sticky)}>
        <section className={cn(styles.group)}>Root network</section>

        <section className={cn(styles.group)}>Subnetworks</section>
      </header>

      <For each={Array.from({ length: 25 })}>
        {() => <section className={cn(styles.group)}>Section</section>}
      </For>
    </aside>
  );
}
