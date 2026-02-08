import type { InferBoundStoreType } from '@/types';
import type { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export function decompessSubnets(compressed: string): Store['subnets'] {
  return [];
}

type Store = InferBoundStoreType<typeof useNetworkStore>;
