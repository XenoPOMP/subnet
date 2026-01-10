import type { Meta } from '@storybook/nextjs';
import { Network } from 'lucide-react';

import { StoryBuilder } from '@/utils/storybook';

import { Label } from './Label';

const meta = {
  title: 'UI Kit / Label',
  component: Label,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Label>;

export default meta;

const builder = new StoryBuilder<typeof Label>()
  .defineMeta(meta)
  .defineSharedProps({
    children: 'This is an label',
    icon: Network,
  });

export const Base = builder.buildStory({});
