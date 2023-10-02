import { createI18n } from 'vue-i18n';

import en from '../resources/en-us.json';

export const i18n = createI18n({
	// Starting from v9.2 this is required to allow the Legacy and Composition APIs to work at the same time.
	allowComposition: true,
	locale: 'en',
	fallbackLocale: 'en',
	messages: { en },
});

// Translations have the tendency to bloat up bundle size considerably. They can be lazy fetched once that happens.
export async function fetchTranslations(
	// Eg. { locale: 'en-us', languageCode: 'en' }
	{ locale, languageCode = locale }:
	{ locale: string; languageCode?: string },
) {
	// Example of dynamic imports by webpack. The "magic comment" is optional. Requires the @babel/plugin-syntax-dynamic-import plugin.
	// Especially when the translations come from a separate package the package.json is known to cause build errors when mixed together
	// with translation json files in the root directory. To prevent this, exclude the package.json and package-lock.json.
	const translation = await import(
		/* webpackExclude: /package(-lock)?\.json$/ */
		/* webpackChunkName: "lang-[request]" */
		`src/resources/${locale}.json`);
	// In this example the translation module comes from a Webpack-loaded JSON file.
	// It's default export is the translations object.
	i18n.global.setLocaleMessage(languageCode, translation.default);
}
