/* scaffolding-delete-file unless keepExamples */
import { flushPromises, mount } from '@vue/test-utils';
import { Api } from 'src/api';
import { AxiosMock, byTestId, setupOptions } from 'test/utils';
import { router } from 'src/vue-setup';
import App from 'src/the-app.vue';

const JOKE_RESPONSES = {
	'joke-api/jokes/random': Joke('Proper joke'),
};

test('is testable with only the network mocked out', async () => {
	const { wrapper } = await mountWith({ get: JOKE_RESPONSES });
	const incrementCounterButton = wrapper.get(byTestId('increment-counter'));
	await incrementCounterButton.trigger('click');
	await incrementCounterButton.trigger('click');
	expect(wrapper.get(byTestId('click-count-message')).text()).toBe('You clicked Bulma 2 times');
	await incrementCounterButton.trigger('click');
	await incrementCounterButton.trigger('click');
	await incrementCounterButton.trigger('click');

	expect(wrapper.get(byTestId('modal-message')).text()).toBe('Getting tired with all this incrementing nonsense.');
	await wrapper.get(byTestId('show-joke')).trigger('click');
	await flushPromises();
	expect(wrapper.get(byTestId('modal-message')).text()).toBe('Proper joke');
});

async function mountWith(network: { get: { [url: string]: Joke } }) {
	// Setup the prod router following the Vue Testing Handbook's setup
	router.push('/');
	await router.isReady();
	// Setup the network
	const axios = AxiosMock();
	axios.get.mockImplementation(async url => network.get[url] || NoJoke());
	const api = Api(axios);
	// Mount the app
	const wrapper = mount(App, setupOptions({ api, router }));
	return { wrapper, axios };
}

async function Joke(value: string) {
	return { data: { value } };
}
type Joke = ReturnType<typeof Joke>;

async function NoJoke() {
	throw new Error('No joke for you');
}
