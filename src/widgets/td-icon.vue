<template>
	<span class="icon">
		<font-awesome-icon
			:icon="faIcon"
			v-bind="$attrs"
			class="fas"
		/>
	</span>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, defineComponent } from 'vue';

// Whatever prefix this project uses by default
const DEFAULT_PREFIX = 'td';

export default defineComponent({
	// Td simply stands for ThisDemo. It's recommended to pick a prefix that you can identify in your project.
	// The allows you to tell your widgets apart from 3rd part ones at a glance.
	name: 'TdIcon',
	components: { FontAwesomeIcon },
	props: {
		icon: { type: [String, Array, Object], required: true },
	},
	setup(props) {
		return {
			// Swap out the default "fas" prefix of Font Awesome with an own one. Otherwise just let the property through.
			faIcon: computed(() => typeof props.icon === 'string' ? [DEFAULT_PREFIX, props.icon] : props.icon),
		};
	},
});
</script>
