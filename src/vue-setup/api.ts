import { type App, inject, type InjectionKey } from 'vue';
import { Api } from '../api';

export const API_KEY: InjectionKey<Api> = Symbol('Api');

export type { Api };
export function useApi(): Api {
	const api = inject(API_KEY);
	if (!api) { throw new Error('Dependency "Api" has not been provided'); }
	return api;
}

// A Vue plugin can be as simple as a function that takes the Vue app.
export function api(app: App) {
	app.provide(API_KEY, Api());
}
