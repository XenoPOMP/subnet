import type { Meta } from '@storybook/nextjs';
import cn from 'classnames';

import { InputField } from '@/components/ui/kit';
import { StoryBuilder } from '@/utils/storybook';

import { NetworkInput } from './NetworkInput';

const meta = {
  title: 'UI / NetworkInput',
  component: NetworkInput,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
  subcomponents: {
    InputField,
  },
} satisfies Meta<typeof NetworkInput>;

export default meta;

const builder = new StoryBuilder<typeof NetworkInput>()
  .defineMeta(meta)
  .defineSharedProps({
    target: 'root',
    className: cn('w-[500px]'),
  });

export const Base = builder.buildStory({});
