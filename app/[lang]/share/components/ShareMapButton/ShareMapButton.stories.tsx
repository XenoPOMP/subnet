import type { Meta } from '@storybook/nextjs';

import { HStack } from '@/components/ui';
import { InputField } from '@/components/ui/kit';
import { StoryBuilder } from '@/utils/storybook';

import { ShareMapButton } from './ShareMapButton';

const meta = {
  title: 'Pages / Main / Share button',
  component: ShareMapButton,
  tags: ['autodoc'],
  parameters: {
    layout: 'centered',
  },
  subcomponents: {
    HStack,
    InputField,
  },
} satisfies Meta<typeof ShareMapButton>;

export default meta;

const builder = new StoryBuilder<typeof ShareMapButton>()
  .defineMeta(meta)
  .defineSharedProps({});

export const Base = builder.buildStory({
  // eslint-disable-next-line jsdoc/require-jsdoc
  render: args => (
    <HStack
      alignment='leading'
      spacing='1.0rem'
    >
      <InputField placeholder='Text' />
      <ShareMapButton {...args} />
    </HStack>
  ),
});
