// The 'preview.js' is responsible to setting up how stories get rendered
// Import the same styles the app normally uses
import 'src/style/main.scss';
// Undo the unwanted effects Bulma has on the code blocks of Storybook
import './fix-prismjs-js.css';

// Make sure vue is set up the same way as usual
import { type Parameters, setup } from '@storybook/vue3';
import { i18n, widgets } from 'src/vue-setup';

setup(app => {
	app.use(i18n).use(widgets);
});

export const parameters = {
	// For syntax highlight, the HTML language is the closest match the the Vue template
	docs: { source: { language: 'html' } },
} as Parameters;
