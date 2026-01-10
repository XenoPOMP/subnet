import { describe } from 'vitest';

import Home from '@app/[lang]/(dashboard)/page.tsx';

import { testNextPage } from '@test/assets';

describe('Index page', () => {
  testNextPage(<Home />);
});
