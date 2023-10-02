/* scaffolding-delete-file unless keepExamples */
import { Api } from 'src/api';
import { Store } from 'src/store';
import { AxiosMock } from 'test/utils';

test('is integration testable with http client mock', async () => {
	const { store, axios } = setup();

	axios.get.mockResolvedValue({ data: Joke('Remote joke') });

	await store.loadJoke();
	expect(axios.get).toHaveBeenCalledTimes(1);
	expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/jokes/random'));
	expect(store.message.value).toBe('Remote joke');
});

function setup() {
	const axios = AxiosMock();
	const api = Api(axios);
	const store = Store({ api });
	return { store, axios };
}

function Joke(value: string) {
	return { value };
}
