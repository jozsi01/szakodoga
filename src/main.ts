import './style/main.scss';

import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import { api, i18n, pinia, router, widgets } from './vue-setup';
/* scaffolding-disable unless keepExamples */
import { fetchTranslations } from './vue-setup';

// Start fetching any non-default translations right after
fetchTranslations({ locale: 'zh-cn', languageCode: 'zh' });

/* eslint-disable-next-line no-console */
console.log("You won't see this message repeating when using HMR and editing vue files.");
/* scaffolding-enable */

createApp(RouterView)
		.use(i18n).use(pinia).use(router)
		.use(api).use(widgets)
		.mount(document.body);
