import type { Meta } from '@storybook/nextjs';
import { Link } from 'lucide-react';

import { StoryBuilder } from '@/utils/storybook';

import { CopyTextButton } from './CopyTextButton';

const meta = {
  title: 'UI Kit / CopyTextButton',
  component: CopyTextButton,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
  subcomponents: {
    Link,
  },
} satisfies Meta<typeof CopyTextButton>;

export default meta;

const builder = new StoryBuilder<typeof CopyTextButton>()
  .defineMeta(meta)
  .defineSharedProps({
    text: 'This is a long text to copy!',
    children: 'Click me',
    leadingIcon: Link,
  });

export const Base = builder.buildStory({});
