'use client';

import { useEffect, useState } from 'react';

import { useNetworkStore } from '../stores/useNetworkStore';
import { useProjectsStore } from '../stores/useProjectsStore';

const AUTOSAVE_DELAY_MS = 300;

/**
 * Restores projects from local storage, loads the active one into network
 * store and keeps it saved on every change afterwards.
 *
 * @returns true when stored projects are loaded.
 */
export const useProjectsBootstrap = (): boolean => {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    // eslint-disable-next-line jsdoc/require-jsdoc
    const start = async () => {
      await useProjectsStore.persist.rehydrate();
      if (cancelled) return;

      useProjectsStore.getState().loadActive();

      unsubscribe = useNetworkStore.subscribe(() => {
        clearTimeout(timer);
        timer = setTimeout(
          () => useProjectsStore.getState().saveActive(),
          AUTOSAVE_DELAY_MS,
        );
      });

      setReady(true);
    };

    void start();

    return () => {
      cancelled = true;
      unsubscribe?.();
      clearTimeout(timer);
    };
  }, []);

  return ready;
};
