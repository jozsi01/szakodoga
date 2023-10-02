/* scaffolding-delete-file unless keepExamples */
import { type Meta, type StoryObj } from '@storybook/vue3';
import TdModalCard from './td-modal-card.vue';

// So far Storybook v7 is doesn't manage to parse the slot usage of examples correctly
// To fix the Show code feature, we extract the template and further down pass it into
// default / story parameters.docs.source.code
const BaseTemplate = { template: `
<td-modal-card>
	<template #title>{{ storyTitle }}</template>

	Ideally all components responsible for the <strong>look and feel</strong> are located
	separately from the <strong>app components</strong>. In this setup they are inside the
	<code>/widgets</code> and stay clear from concepts such as:
	<ul>
		<li class="has-text-weight-bold">- application logic and Vuex</li>
		<li class="has-text-weight-bold">- networking</li>
		<li class="is-italic">- arguably i18n and locales</li>
	</ul>

	<template #foot>
		<button class="button is-primary" @click="active = false">Primary action</button>
		<button class="button" @click="active = false">Cancel</button>
	</template>
</td-modal-card>
` };

export default {
	title: 'widgets/td-modal-card',
	component: TdModalCard,
	render: args => ({
		template: BaseTemplate.template,
		setup: () => args,
	}),
	args: {
		// It's recommended to namespace props that only the Storybook example uses, but not the component
		storyTitle: 'Lorem ipsum',
	},
	parameters: { docs: { source: { code: BaseTemplate.template } } },
} as Meta<typeof TdModalCard>;

// Declare the type of a story once for simpler reuse
type Story = StoryObj<typeof TdModalCard>;

export const Base: Story = {};
