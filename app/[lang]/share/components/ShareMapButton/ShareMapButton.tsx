import { Link } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/components/ui/kit';

// eslint-disable-next-line jsdoc/require-jsdoc
export const ShareMapButton: FC<unknown> = () => {
  return (
    <Button
      square
      leadingIcon={Link}
    />
  );
};
