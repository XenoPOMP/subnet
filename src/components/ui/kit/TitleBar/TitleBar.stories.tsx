import type { Meta } from '@storybook/nextjs';

import { StoryBuilder } from '@/utils/storybook';

import { TitleBar } from './TitleBar';

const meta = {
  title: 'UI Kit / TitleBar',
  component: TitleBar,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TitleBar>;

export default meta;

const builder = new StoryBuilder<typeof TitleBar>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({});
