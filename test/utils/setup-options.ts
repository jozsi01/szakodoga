import { defineComponent } from 'vue';
import { type I18n } from 'vue-i18n';
import { type Router } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { type GlobalMountOptions } from '@vue/test-utils/dist/types';
import { API_KEY, i18n as i18nDefault, widgets } from 'src/vue-setup';
import { type Api } from 'src/api';
import { ApiMock } from './api-mock';

type Options = {
	api?: Api;
	router?: Router;
	i18n?: I18n<unknown, unknown, unknown, unknown, boolean>;
	provide?: GlobalMountOptions['provide'];
}

export function setupOptions({ api, i18n = i18nDefault as NonNullable<Options['i18n']>, router, provide = {} }: Options = {}) {
	const plugins: GlobalMountOptions['plugins'] = [i18n, widgets, createTestingPinia({ stubActions: api === undefined })];
	provide = { ...provide, [API_KEY as symbol]: api ?? ApiMock() };
	if (router) { plugins.push(router); }
	return { global: { renderStubDefaultSlot: true, plugins, stubs, provide } };
}

// Safe to remove if vue-focus-lock is no longer directly used
// It had to be stubbed because it scheduled teardown after Jest already wiped the DOM
const stubs = {
	VueFocusLock: defineComponent({
		render() { return this.$slots.default?.(); },
	}),
};
