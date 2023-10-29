import './style/main.scss';

import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import { api, i18n, pinia, router, widgets } from './vue-setup';
/* scaffolding-disable unless keepExamples */
import { fetchTranslations } from './vue-setup';
import { library } from '@fortawesome/fontawesome-svg-core'
import PrimeVue from 'primevue/config';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret,faPlay,faStop,faRotateLeft,faRightToBracket,faTrash,faPlus, faUser,faChessPawn} from '@fortawesome/free-solid-svg-icons'
// Start fetching any non-default translations right after
fetchTranslations({ locale: 'zh-cn', languageCode: 'zh' });
library.add(faUserSecret,faPlay,faStop,faRotateLeft,faRightToBracket,faTrash,faPlus,faUser,faChessPawn)
/* eslint-disable-next-line no-console */
console.log("You won't see this message repeating when using HMR and editing vue files.");
/* scaffolding-enable */

createApp(RouterView)
		.use(i18n).use(pinia).use(router)
		.use(api).use(widgets).use(PrimeVue)
		.component('font-awesome-icon', FontAwesomeIcon)
		.mount(document.body);
