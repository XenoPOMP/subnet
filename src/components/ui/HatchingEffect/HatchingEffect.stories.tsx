import type { Meta } from '@storybook/nextjs';
import cn from 'classnames';

import { StoryBuilder } from '@/utils/storybook';

import { HatchingEffect } from './HatchingEffect';

const meta = {
  title: 'UI / HatchingEffect',
  component: HatchingEffect,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HatchingEffect>;

export default meta;

const builder = new StoryBuilder<typeof HatchingEffect>()
  .defineMeta(meta)
  .defineSharedProps({
    className: cn('w-[150px] h-[300px]', 'border border-[red]'),
    tint: 'red',
  });

export const Base = builder.buildStory({});
