import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const UnChecked: ComponentStory<typeof Checkbox> = () => <Checkbox label='unchecked' name='unchecked' />;
export const Checked: ComponentStory<typeof Checkbox> = () => <Checkbox isInitialChecked={true} label='checked' name='checked' />;
export const Disabled: ComponentStory<typeof Checkbox> = () => <Checkbox disabled={true} label='disabled' name='disabled' />;
export const DisabledChecked: ComponentStory<typeof Checkbox> = () => <Checkbox disabled={true} isInitialChecked={true} label='disabledChecked' name='disabledChecked' />;
export const Required: ComponentStory<typeof Checkbox> = () => <Checkbox label='required' name='required' />;
