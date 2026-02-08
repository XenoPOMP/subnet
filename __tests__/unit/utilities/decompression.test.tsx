import LZString from 'lz-string';
import { describe, expect, test } from 'vitest';

import type { InferBoundStoreType } from '@/types';
import { decompessSubnets, decompressRootNetwork } from '@/utils/compression';
import { Address, Network } from '@/utils/ip';
import type { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
const compress = (obj: any): string => {
  return LZString.compressToEncodedURIComponent(JSON.stringify(obj));
};

describe('LZ decompressions', () => {
  test('Root network can be decompressed', () => {
    const compressed = compress(
      new Network(new Address(192, 168, 0, 0), 24, 'Name is correct!', '#fff'),
    );
    const decompressed = decompressRootNetwork(compressed);
    expect(decompressed?.cidr()).toEqual('192.168.0.0/24');
    expect(decompressed?.name).toEqual('Name is correct!');
    expect(decompressed?.color).toEqual('#fff');
  });

  test('decompressRootNetwork validates compressed string', () => {
    const compressed = compress(12);
    const decompressed = decompressRootNetwork(compressed);
    expect(decompressed?.cidr()).toEqual(undefined);
  });

  test('Subnets can be decompressed', () => {
    const subnets: Store['subnets'] = [
      {
        id: 'first',
        network: new Network(new Address(192, 168, 0, 1), 24, 'One', '#fff'),
      },
      {
        id: 'second',
        network: new Network(new Address(192, 168, 0, 20), 24, 'Two', '#000'),
      },
    ];
    const compressed = compress(subnets);
    const decompressed = decompessSubnets(compressed);
    expect(
      decompressed.map(
        v =>
          `${v.id} = ${v.network.cidr()} ("${v.network.name ?? 'Unnamed'}": ${v.network.color ?? 'No color'})`,
      ),
    ).toStrictEqual([
      `first = 192.168.0.1/24 ("One": #fff)`,
      'second = 192.168.0.20/24 ("Two": #f00)',
    ]);
  });

  test('decompessSubnets validates object', () => {
    const subnets = [12, 2];
    const compressed = compress(subnets);
    const decompressed = decompessSubnets(compressed);
    expect(decompressed).toBeEmpty();
  });
});

type Store = InferBoundStoreType<typeof useNetworkStore>;
