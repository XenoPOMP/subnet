import type { Meta } from '@storybook/nextjs';
import cn from 'classnames';

import { StoryBuilder } from '@/utils/storybook';

import { MediaRendered } from './MediaRendered';

const meta = {
  title: 'UI / MediaRendered',
  component: MediaRendered,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MediaRendered>;

export default meta;

const builder = new StoryBuilder<typeof MediaRendered>()
  .defineMeta(meta)
  .defineSharedProps({
    screen: 'sm',
    children: (
      <div className={cn('aspect-[1/1.5] w-[150px] bg-red-500')}>
        This container is displayed when screen is lower than sm breakpoint.
      </div>
    ),
    asChild: true,
    relativeScreenDetection: 'before',
  });

export const Before_breakpoint = builder.buildStory({});
export const After_breakpoint = builder.buildStory({
  args: {
    relativeScreenDetection: 'after',
    screen: 'sm',
  },
});
export const Use_both = builder.buildStory({
  // eslint-disable-next-line jsdoc/require-jsdoc
  render: () => (
    <div className={cn('flex items-center')}>
      <MediaRendered
        screen='sm'
        relativeScreenDetection='before'
        asChild
      >
        <div className={cn('aspect-[1/1.5] w-[150px] bg-red-500')}>
          This container is displayed when screen is lower than sm breakpoint.
        </div>
      </MediaRendered>

      <MediaRendered
        screen='sm'
        relativeScreenDetection='after'
        asChild
      >
        <div className={cn('aspect-[1/1.5] w-[150px] bg-green-600')}>
          This container is displayed when screen is greater than or equal sm
          breakpoint.
        </div>
      </MediaRendered>
    </div>
  ),
});
