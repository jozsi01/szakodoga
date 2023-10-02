import type { AxiosPartial } from 'src/api';

export type AxiosMock = jest.Mocked<AxiosPartial>;

// The reason for rejecting by default is that test cases set the behavior.
/** Creates a mock of `AxiosPartial` that rejects by default. */
export function AxiosMock(): AxiosMock {
	return {
		get: jest.fn().mockImplementation(notMocked('get')),
		post: jest.fn().mockImplementation(notMocked('post')),
		put: jest.fn().mockImplementation(notMocked('put')),
		delete: jest.fn().mockImplementation(notMocked('delete')),
	};
}

function notMocked(verb: string) {
	return (...args: unknown[]) => Promise.reject(new Error(`${verb} endpoint is not mocked for ${args}`));
}
