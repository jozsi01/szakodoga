import { anonymize } from 'src/domain/joke'; // scaffolding-disable-line unless keepExamples
import { useApi } from 'src/vue-setup';
import { type Api } from 'src/api';
import { computed, ref } from 'vue';

export function Store({ api = useApi() } : { api?: Api } = {}) {
	// State
	const counter = ref(0);
	const message = ref<string | null>(null);

	// Getters
	const isTired = computed(() => counter.value >= 5);

	// Actions
	const showMessage = (newMessage: string) => {
		message.value = newMessage;
	};

	const dismissMessage = () => {
		message.value = null;
	};

	const incrementCounter = () => {
		counter.value++;

		if (isTired.value) {
			message.value = 'Getting tired with all this incrementing nonsense.';
		}
	};

	const loadJoke = async () => {
		const joke = await api.getChuckNorrisJoke();
		showMessage(anonymize(joke).content);
	};

	// Return all public APIs
	return {
		counter, message,
		isTired,
		showMessage, dismissMessage, incrementCounter, loadJoke,
	};
}
