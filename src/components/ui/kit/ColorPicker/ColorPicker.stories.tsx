import type { Meta } from '@storybook/nextjs';

import { StoryBuilder } from '@/utils/storybook';

import { ColorPicker } from './ColorPicker';

const meta = {
  title: 'UI Kit / ColorPicker',
  component: ColorPicker,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;

const builder = new StoryBuilder<typeof ColorPicker>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({});
