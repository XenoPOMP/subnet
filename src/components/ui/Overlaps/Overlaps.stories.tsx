import type { Meta } from '@storybook/nextjs';

import { StoryBuilder } from '@/utils/storybook';

import { Overlaps } from './Overlaps';

const meta = {
  title: 'UI / Overlaps',
  component: Overlaps,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Overlaps>;

export default meta;

const builder = new StoryBuilder<typeof Overlaps>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({});
