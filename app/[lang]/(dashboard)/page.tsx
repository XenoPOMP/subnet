'use client';

import { DashboardLayout } from '@/components/layout/pages';

import { NetForm, NetMapContainer } from './components';

// TODO Add adaptive layout later (maybe). 870x650 is minimal sizes for now.
// eslint-disable-next-line jsdoc/require-jsdoc
export default function HomePage() {
  return (
    <DashboardLayout>
      <NetForm />
      <NetMapContainer />
    </DashboardLayout>
  );
}
