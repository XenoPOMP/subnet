import { describe, test, vi } from 'vitest';
import { assertRendering, injectMocks } from 'xenopomp-essentials/vitest';

import { NetSlider } from '@/components/ui';
import { Address, Network } from '@/utils/ip';

describe('NetSlider component', () => {
  injectMocks(() => {
    vi.mock('next/navigation', () => {
      return {
        // eslint-disable-next-line jsdoc/require-jsdoc
        useSearchParams(): URLSearchParams {
          return new URLSearchParams();
        },
      };
    });
  });

  test('It renders', () => {
    assertRendering(
      <NetSlider
        network={new Network(new Address(0, 0, 0, 0), 24)}
        networkId='1'
      />,
    );
  });
});
