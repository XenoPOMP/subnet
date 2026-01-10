import type { Meta } from '@storybook/nextjs';

import { StoryBuilder } from '@/utils/storybook';

import { WithTooltip } from './WithTooltip';

const meta = {
  title: 'UI Kit / WithTooltip',
  component: WithTooltip,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WithTooltip>;

export default meta;

const builder = new StoryBuilder<typeof WithTooltip>()
  .defineMeta(meta)
  .defineSharedProps({
    children: 'Tooltip',
    tooltip: <div>This is an tooltip content!</div>,
    id: 'tooltip-preview',
    place: 'right',
  });

export const Base = builder.buildStory({});
