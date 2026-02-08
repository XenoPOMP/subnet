import type { Meta } from '@storybook/nextjs';

import { StoryBuilder } from '@/utils/storybook';

import { ShareMapButton } from './ShareMapButton';

const meta = {
  title: 'Pages / Main / Share button',
  component: ShareMapButton,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ShareMapButton>;

export default meta;

const builder = new StoryBuilder<typeof ShareMapButton>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({});
