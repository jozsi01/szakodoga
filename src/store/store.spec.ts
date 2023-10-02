/* scaffolding-delete-file unless keepExamples */
import { Joke } from 'src/domain/joke';
import { ApiMock } from 'test/utils/api-mock';
import { Store } from './store';

test('is unit testable with api mocked out', async () => {
	const joke = Joke({ id: 1, content: 'Test joke' });
	const { store } = setup({ joke });
	await store.loadJoke();
	expect(store.message.value).toBe('Test joke');
});

// The "setup" function as a pattern is used to initialize tests.
// It's responsible to provide descriptive options and return values
// in order to help tests to be easy to read and follow.
// Consider using it instead of the implicit beforeEach style.
function setup({ joke }: { joke: Joke }) {
	const api = ApiMock();
	api.getChuckNorrisJoke.mockResolvedValue(joke);
	const store = Store({ api });
	return { store };
}
