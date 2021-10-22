/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import { TextLabel, TextLabelProps } from '../lib/TextLabel';

export default {
  title: 'Demo/Text Label',
  component: TextLabel,
} as Meta;

const Template: Story<TextLabelProps> = (args) => (
  <TextLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "qwer"
};
