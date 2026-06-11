import type { Meta } from '@storybook/nextjs';

import { VStack } from '@/components/ui';
import { StoryBuilder } from '@/utils/storybook';

import { InfoTable } from './InfoTable';

const meta = {
  title: 'UI / InfoTable',
  component: InfoTable,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
  subcomponents: {
    VStack,
  },
} satisfies Meta<typeof InfoTable>;

export default meta;

const builder = new StoryBuilder<typeof InfoTable>()
  .defineMeta(meta)
  .defineSharedProps({
    title: 'Addresses',
    content: [
      ['Network', '192.168.0.0'],
      ['Broadcast', '192.168.0.255'],
      ['Mask', '/24, 255.255.255.0'],
      [undefined, 'Some content'],
    ],
  });

export const Base = builder.buildStory({});
