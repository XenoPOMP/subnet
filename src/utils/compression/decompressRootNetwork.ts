import LZString from 'lz-string';
import type { Optional } from 'xenopomp-essentials';
import { z } from 'zod';

import type { ZodJson } from '@/types';
import { Address, Network } from '@/utils/ip';

const schema = z.object<ZodJson<InstanceType<typeof Network>>>({
  address: z.object<ZodJson<InstanceType<typeof Address>>>({
    oct1: z.number(),
    oct2: z.number(),
    oct3: z.number(),
    oct4: z.number(),
  }),
  broadcast: z.object<ZodJson<InstanceType<typeof Address>>>({
    oct1: z.number(),
    oct2: z.number(),
    oct3: z.number(),
    oct4: z.number(),
  }),
  mask: z.number(),
  name: z.string().optional(),
  color: z.string().optional(),
});

// eslint-disable-next-line jsdoc/require-jsdoc
export function decompressRootNetwork(compressed: string): Optional<Network> {
  const decompressed: string =
    LZString.decompressFromEncodedURIComponent(compressed);
  const rawObject = JSON.parse(decompressed);

  try {
    const parsed = schema.parse(rawObject);

    const rawAddress = parsed.address as {
      oct1: number;
      oct2: number;
      oct3: number;
      oct4: number;
    };
    const address = new Address(
      ...(Object.values(rawAddress) as [number, number, number, number]),
    );

    const rawMask = parsed.mask as number;
    const rawName = parsed.name as Optional<string>;
    const rawColor = parsed.color as Optional<string>;

    return new Network(address, rawMask, rawName, rawColor);
  } catch {
    return undefined;
  }
}
