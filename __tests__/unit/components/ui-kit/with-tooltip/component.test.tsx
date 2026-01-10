import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { WithTooltip } from '@/components/ui/kit';

describe('WithTooltip component', () => {
  test('It renders', () => {
    assertRendering(
      <WithTooltip
        id='some-id'
        tooltip={<></>}
      />,
    );
  });
});
