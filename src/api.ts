import axios, { type AxiosInstance } from 'axios';
import { Joke } from './domain/joke'; // scaffolding-disable-line unless keepExamples

export type AxiosPartial = Pick<AxiosInstance, 'get'|'post'|'put'|'delete'>;

export function Api({ get }: AxiosPartial = Axios()) {
	return {
		/* scaffolding-disable unless keepExamples */
		async getChuckNorrisJoke(): Promise<Joke> {
			// The server side code can be found in /server/setup-api.js
			const { data } = await get('joke-api/jokes/random');
			// Map API responses that tend to shift over time to internally understood props
			const { id, value: content } = data;
			// Wrap untyped REST API results as domain objects where they arrive into the app
			return Joke({ id, content });
		},
		/* scaffolding-enable */
	};
}
export type Api = ReturnType<typeof Api>;


// Use to set convenient defaults.
// * It's recommended that a request starts with a '/'
// * If it starts with http(s):// then its either unnecessary or triggers cross-origin requests.
// * If it leaves the '/' out then it will be relative to the current path, which requests sensitive to navigation.
function Axios() {
	return axios.create({ baseURL: process.env.API_PATH });
}
