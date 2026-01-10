import type { Meta, StoryObj } from '@storybook/nextjs';
import { Ban, Trash } from 'lucide-react';

import { Button } from './Button';

const meta = {
  title: 'UI Kit/Button',
  component: Button,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const sharedProps = {
  children: 'Click me',
  disabled: false,
  unstyled: false,
} satisfies Partial<Story['args']>;

export const Default: Story = {
  args: {
    ...sharedProps,
    leadingIcon: Ban,
  },
};

export const Danger: Story = {
  args: {
    ...sharedProps,
    children: 'Delete subnet',
    variant: 'danger',
    leadingIcon: Trash,
  },
};

export const IconOnly: Story = {
  args: {
    ...sharedProps,
    children: undefined,
    variant: 'danger',
    leadingIcon: Trash,
    square: true,
  },
};
