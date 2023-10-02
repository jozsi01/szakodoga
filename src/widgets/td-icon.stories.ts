import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { type Meta, type StoryObj } from '@storybook/vue3';
import TdIcon from './td-icon.vue';

// An example FontAwesome icon definition
const play = {
	prefix: 'td',
	iconName: 'play',
	icon: [512, 512, [], 'f005', 'M136 48.154L496 256L136 463.846L136 48.154'],
} as unknown as IconDefinition;

export default {
	title: 'widgets/td-icon',
	// Passing the component to Storybook is enough for it to figure out the template
	component: TdIcon,
	args: {
		icon: play,
		size: '1x',
		mask: '',
		transform: '',
		spin: false,
	},
} as Meta<typeof TdIcon>;

// Declare the type of a story once for simpler reuse
type Story = StoryObj<typeof TdIcon>;

// Conventionally, there is a "Base" story using the most basic args.
export const Base: Story = {};

// A story usually manipulates the default args in some way
export const Size = { args: { size: '2x' } };

// FontAwesome also supports combining existing icons to new forms
export const Mask = { args: { mask: play, transform: 'shrink-8 rotate-180', size: '3x' } };
