import type { Meta } from '@storybook/nextjs';
import { Check, Link } from 'lucide-react';

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
    Check,
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

export const WithTextOnCopy = builder.buildStory({
  args: {
    textOnCopy: 'Custom text on copy!',
    text: 'This is a long text to copy!',
    children: 'Click me',
    leadingIcon: Link,
  },
});

export const NoChildren = builder.buildStory({
  args: {
    textOnCopy: 'Custom text on copy!',
    text: 'This is a long text to copy!',
    children: undefined,
    leadingIcon: Link,
  },
});

export const NoIcon = builder.buildStory({
  args: {
    textOnCopy: 'Custom text on copy!',
    text: 'This is a long text to copy!',
    children: undefined,
    leadingIcon: undefined,
  },
});
