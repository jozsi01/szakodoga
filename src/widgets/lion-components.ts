/* scaffolding-delete-file unless keepExamples */
import { LionDialog as Dialog } from '@lion/dialog';
import { toVueComponent } from './webcomponents';

// It's recommended to wrap webcomponents to Vue components.
// This allows the rest of the app to use the same conventions
// as it would normally.
// Additionally, to prevent conflicts
// width the global CustomElementRegistry, the wrapper code
// can ensure scoping on the component. Read more about it here:
// https://open-wc.org/docs/development/scoped-elements
// To make theming simpler we also apply the "lion-dialog" class
// on the element. The class by default is the kebab-cased name
// of the component. This allows CSS to target it by class, which
// is preferred over the tagname (which is auto-generated anyway).
export const LionDialog = toVueComponent(Dialog, { name: 'LionDialog' });
