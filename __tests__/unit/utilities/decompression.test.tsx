import LZString from 'lz-string';
import { describe, expect, test } from 'vitest';

import { decompressRootNetwork } from '@/utils/compression';
import { Address, Network } from '@/utils/ip';

describe('LZ decompressions', () => {
  test('Root network can be decompressed', () => {
    const compressed = LZString.compressToEncodedURIComponent(
      JSON.stringify(new Network(new Address(192, 168, 0, 0), 24)),
    );
    const decompressed = decompressRootNetwork(compressed);
    expect(decompressed?.cidr()).toEqual('192.168.0.0/24');
  });
});
