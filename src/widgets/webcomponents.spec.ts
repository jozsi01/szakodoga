import { _initElement, toVueComponent } from './webcomponents';

test('_initElement registers sub-classed element with scoped tag', () => {
	class CustomElement extends HTMLElement {}
	const { scopedTag, ScopedElement } = _initElement(CustomElement, 'TestElement');
	expect(scopedTag).toMatch(/test-element-[0-9]+/);
	expect(Object.getPrototypeOf(ScopedElement)).toBe(CustomElement);
});

/* LitElement v2 lazy inits properties by mutating the prototype */
test('_initElement calls constructor to trigger any lazy init on prototype', () => {
	class LazyElement extends HTMLElement {
		constructor() {
			super();
			const prototype = Object.getPrototypeOf(this);
			if (!prototype.lazyProp) {
				Object.defineProperty(prototype, 'lazyProp', { value: 3 });
			}
		}
	}
	const { ScopedElement } = _initElement(LazyElement, 'TestElement');
	expect(Object.getOwnPropertyDescriptor(ScopedElement.prototype, 'lazyProp')).toBeDefined();
});

test('toVueComponent adds public props that have a dynamic set and a get to props by default', () => {
	class CustomElement extends HTMLElement {
		_basicProp = '';
		_lazyProp = 0;
		__privateProp = 'gets ignored';

		constructor() {
			super();
			const prototype = Object.getPrototypeOf(this);
			if (!prototype.lazyProp) {
				Object.defineProperty(prototype, 'lazyProp', {
					get() { return this._lazyProp; },
					set(value) { this._lazyProp = value; },
				});
			}
		}

		get basicProp() { return this._basicProp; }
		set basicProp(value) { this._basicProp = value; }

		get _privateProp() { return this.__privateProp; }
		set _privateProp(value) { this.__privateProp = value; }

		get getOnly() { return 'gets ignored'; }
		set setOnly(_: string) { /* gets ignored */ }
	}
	const { props } = toVueComponent(CustomElement);
	expect(Object.keys(props).sort()).toEqual(['basicProp', 'lazyProp']);
});

test('toVueComponent sets props if provided', () => {
	class CustomElement extends HTMLElement {
		_basicProp = '';

		get basicProp() { return this._basicProp; }
		set basicProp(value) { this._basicProp = value; }
	}
	const testProps = {
		anything: { type: String, default: 'disables "guessing" of props' },
	};
	const { props } = toVueComponent(CustomElement, { props: testProps });
	expect(props).toEqual(testProps);
});
