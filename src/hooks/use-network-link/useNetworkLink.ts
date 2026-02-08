'use client';

import LZString from 'lz-string';

import { useOrigin } from '@/hooks';
import type { InferBoundStoreType } from '@/types';
import type { useNetworkStore } from '@/zustand';

/**
 * Generates link to share network config.
 */
export const useNetworkLink = (
  root: NetworkStore['root'],
  subnetworks: NetworkStore['subnets'],
) => {
  const origin = useOrigin();

  // eslint-disable-next-line jsdoc/require-jsdoc
  const encode = (obj: any) => {
    const jsonString = JSON.stringify(obj);
    return LZString.compressToEncodedURIComponent(jsonString);
  };

  const params = new URLSearchParams({
    root: encode(root),
    subnets: encode(subnetworks),
  });

  // eslint-disable-next-line jsdoc/require-jsdoc
  const createUrl = () => {
    const url = new URL(`${origin === '' ? 'http://localhost:3000' : origin}`);
    url.search = params.toString();
    return url;
  };

  return createUrl().toString();
};

type NetworkStore = InferBoundStoreType<typeof useNetworkStore>;
