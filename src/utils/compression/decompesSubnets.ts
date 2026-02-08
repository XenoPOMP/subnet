import LZString from 'lz-string';
import type { ArrayItemType, Optional } from 'xenopomp-essentials';
import { z } from 'zod';

import type { InferBoundStoreType, ZodJson } from '@/types';
import { networkSchema as network } from '@/utils/compression';
import { Address, Network } from '@/utils/ip';
import type { useNetworkStore } from '@/zustand';

const schema = z.array(
  z.object<ZodJson<ArrayItemType<Store['subnets']>>>({
    id: z.string(),
    network,
  }),
);

// eslint-disable-next-line jsdoc/require-jsdoc
export function decompessSubnets(compressed: string): Store['subnets'] {
  const decompressed: string =
    LZString.decompressFromEncodedURIComponent(compressed);
  const rawObject = JSON.parse(decompressed);

  try {
    const parsed = schema.parse(rawObject) as Array<{
      id: string;
      network: z.infer<typeof network>;
    }>;
    const mapped: Store['subnets'] = parsed.map(raw => {
      const rawAddress = raw.network.address as {
        oct1: number;
        oct2: number;
        oct3: number;
        oct4: number;
      };
      const address = new Address(
        ...(Object.values(rawAddress) as [number, number, number, number]),
      );
      const rawMask = raw.network.mask as number;
      const rawName = raw.network.name as Optional<string>;
      const rawColor = raw.network.color as Optional<string>;
      const net = new Network(address, rawMask, rawName, rawColor);
      return {
        id: raw.id,
        network: net,
      };
    });

    return mapped;
  } catch {
    return [];
  }
}

type Store = InferBoundStoreType<typeof useNetworkStore>;
