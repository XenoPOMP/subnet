import type { Meta } from '@storybook/nextjs';

import { StoryBuilder } from '@/utils/storybook';

import { CopyTextButton } from './CopyTextButton';

const meta = {
  title: 'UI Kit / CopyTextButton',
  component: CopyTextButton,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CopyTextButton>;

export default meta;

const builder = new StoryBuilder<typeof CopyTextButton>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({});
