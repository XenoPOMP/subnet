import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { NetSlider } from '@/components/ui';
import { Address, Network } from '@/utils/ip';

describe('NetSlider component', () => {
  test('It renders', () => {
    assertRendering(
      <NetSlider network={new Network(new Address(0, 0, 0, 0), 24)} />,
    );
  });
});
