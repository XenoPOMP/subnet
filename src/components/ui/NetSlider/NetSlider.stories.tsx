import type { Meta } from '@storybook/nextjs';

import { StoryBuilder } from '@/utils/storybook';

import { NetSlider } from './NetSlider';

const meta = {
  title: 'UI / NetSlider',
  component: NetSlider,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NetSlider>;

export default meta;

const builder = new StoryBuilder<typeof NetSlider>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({});
