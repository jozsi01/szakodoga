import { type App, type Component } from 'vue';
import * as Widgets from '../widgets';

// Setup Font Awesome
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
config.autoReplaceSvg = false;
config.observeMutations = false;

// Widgets are designed to be reused in the application
// For convenience, they are they globally registered in the app
export function widgets(Vue: App) {
	// Make sure all components that are globally registered have a name
	const registerGlobally = (Widget: Component) => Vue.component(Widget.name!, Widget);
	Object.values(Widgets).forEach(registerGlobally);
}
