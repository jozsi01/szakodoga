/* scaffolding-delete-file unless keepExamples */
import { type Meta, type StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { LionDialog } from './lion-components';

// This example demonstrates how to approach non-trivial "Show code" blocks in Storybook 7
//
// For correct behavior of "Show code" extract the template sting to a variable
// And explicitly set the parameters.docs.source.code to it.
// Otherwise Storybook will guess the code, which is often incorrect.
// Alternatively, don't rely on this feature and just read the stories files directly.
// The BaseTemplate is an object to allow the "Vue Inline Template" VSCode extension to do syntax highlight.
const BaseTemplate = { template: `
<div>
	<button @click="opened = true">Open</button>
	<lion-dialog :opened="opened" :config="{ hidesOnEsc: false }" @opened-changed="onOpenedChanged">
		<template #content>
			<div @keydown.esc="opened = false">
				<span>Dialog content</span>
				<button @click="opened = false">x</button>
			</div>
		</template>
	</lion-dialog>
</div>
` };

export default {
	title: 'widgets/lion-dialog',
	component: LionDialog,
	// Used refine or extend args the stories use
	argTypes: {
		// This is available as Vue a event handler in the template
		// When it triggers and the Actions tab in Storybook show the event
		onOpenedChanged: { action: 'opened-changed' },
	},
	args: {
		opened: false,
	},
	render: args => ({
		template: BaseTemplate.template,
		setup: () => ({ ...args, opened: ref(args.opened) }),
	}),
	parameters: {
		docs: { source: { code: BaseTemplate.template } },
	},
} as Meta<typeof LionDialog>;

type Story = StoryObj<typeof LionDialog>;

// Calling the first story "Base" is simply a convention.
// It usually doesn't take any config, as the default export already sets defaults for everything.S
export const Base: Story = {};

// Letting the dialog control the opened state
const InvokerTemplate = { template: `
<lion-dialog>
	<template #invoker>
		<button>Open</button>
	</template>
	<template #content>
		<div>
			Dialog content
			<button @click="dispatchEventCloseOverlay">x</button>
		</div>
	</template>
</lion-dialog>
` };
export const Invoker: Story = {
	render: args => ({
		template: InvokerTemplate.template,
		setup: () => ({
			...args,
			dispatchEventCloseOverlay({ target }: { target: HTMLElement }) {
				// Lion Components listen to native DOM events
				target.dispatchEvent(new Event('close-overlay', { bubbles: true }));
			},
		}),
	}),
	parameters: { docs: { source: { code: InvokerTemplate.template } } },
};
