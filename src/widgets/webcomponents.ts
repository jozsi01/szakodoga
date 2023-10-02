import { type ComponentObjectPropsOptions, defineComponent, h, ref, type Slots, onMounted, onUnmounted, type VNode, Text } from 'vue';

/**
 * Converts a web component to a Vue component
 *
 * Incubated here for now. Once it's API is stable the intention is to open-source it.
 * */
export function toVueComponent(CustomElement: CustomElementConstructor, {
	name = CustomElement.name,
	props,
	events = [],
	class: className = hyphenate(name),
	allowUndefinedProps = false,
	mapEvents = [],
}: ToVueComponentOptions = {}) {
	const { scopedTag, ScopedElement } = _initElement(CustomElement, name);
	const _props = props ?? toVuePropOptions(customPropsOf(ScopedElement));
	const filterProps = filterObject(isAllowedProp(allowUndefinedProps));
	const allEvents = uniq([...events, ...mapEvents.map(prop('event'))]);
	const mappings = [...allEvents.map(forwardAsEmit), ...mapEvents];

	return defineComponent({
		name,
		props: _props,
		emits: uniq([...allEvents, ...mapEvents.map(prop('emit'))]),
		setup: (props, { emit, slots }) => {
			const { el } = _useEventMapping({ emit, mappings });
			return () => {
				const domSlots = toDomSlots(slots);
				const properties = filterProps(props);
				return h(scopedTag, { ...properties, ref: el, class: className }, domSlots);
			};
		},
	});
}

type ToVueComponentOptions = {
	/** Name of the Vue component in CamelCase format */
	name?: string;
	/** Additional class(es) on the wrapped component for theming. The kebab-case name by default. */
	class?: string;
	/** Props of the resulting Vue component. Defaults to all custom props with a dynamic get and set. */
	props?: ComponentObjectPropsOptions;
	/** Explicitly allow some or all props to pass undefined values to the wrapped component. False by default. */
	allowUndefinedProps?: string[] | boolean;
	/* Declare native DOM events not covered by the mapEvents option */
	events?: string[];
	/* Allow mapping DOM events to Vue emits */
	mapEvents?: EventMapping[];
}

type EventMapping = {
	event: string;
	emit: string;
	map: (event: Event) => unknown;
	preventDefault?: boolean;
}

/** Ensures the custom element is ready to be wrapped by sub-classing, registering, and triggering any lazy init */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function _initElement(CustomElement: CustomElementConstructor, name: string): { scopedTag: string; ScopedElement: any } {
	class ScopedElement extends CustomElement {}
	/* Register custom element with a scoped tag */
	const scopedTag = toUniqueTag(hyphenate(name));
	customElements.define(scopedTag, ScopedElement);
	/** The scoped custom elements polyfill swaps out the registry seemingly removing registered entries */
	setTimeout(() => ensureRegistered(scopedTag, ScopedElement));
	/* Trigger any init hooks for example LitElement uses that may mutate the element prototype chain */
	document.createElement(scopedTag);
	return { scopedTag, ScopedElement };
}

/**
 * Returns custom properties declared on top of a webcomponent.
 * A prop is recognized by having both a dynamic get and set method.
 * */
function customPropsOf(Constructor: CustomElementConstructor): string[] {
	if (!Constructor.prototype || HTMLElement === Constructor || Constructor.name === 'HTMLElement') { return []; }
	const hasGetAndSet = ([/**/, { get, set }]: [string, PropertyDescriptor]) => !!get && !!set;
	const isPublic = (prop: string) => !prop.startsWith('_');
	const props = Object.entries(Object.getOwnPropertyDescriptors(Constructor.prototype))
			.filter(hasGetAndSet)
			.map(([prop]) => prop)
			.filter(isPublic);
	return [...props, ...customPropsOf(Object.getPrototypeOf(Constructor))];
}

function ensureRegistered(tag: string, Element: CustomElementConstructor) {
	if (customElements.get(tag)) { return; }
	customElements.define(tag, Element);
}

function toVuePropOptions(props: string[]) {
	return Object.fromEntries(props.map(prop => [prop, {}]));
}

function isAllowedProp(allowUndefinedProps?: string[] | boolean) {
	return (prop: string, value: unknown) => {
		if (value !== undefined) { return true; }
		if (!Array.isArray(allowUndefinedProps)) { return !!allowUndefinedProps; }
		return allowUndefinedProps.includes(prop);
	};
}

export type Emit = (event: string, ...args: unknown[]) => void;

export function _useEventMapping(
	{ emit, mappings }:
	{ emit: Emit; mappings: EventMapping[] },
) {
	const el = ref<HTMLElement>();
	for (const mapping of mappings) {
		const listener = toListener({ emit, mapping });
		onMounted(() => el.value?.addEventListener(mapping.event, listener));
		onUnmounted(() => el.value?.removeEventListener(mapping.event, listener));
	}
	return { el };
}

function toListener({ emit, mapping }: { emit: Emit; mapping: EventMapping }) {
	const { preventDefault = true } = mapping;
	return (event: Event) => {
		if (preventDefault) { event.preventDefault(); }
		emit(mapping.emit, mapping.map(event));
	};
}

function toDomSlots(slots: Slots) {
	return Object.entries(slots)
			.flatMap(([slot, nodes]) => {
				if (nodes === undefined) { return []; }
				if (slot === 'default') { return nodes(); }
				return nodes().map(withSlot(slot));
			});
}

function withSlot(slot: string): (vnode: VNode) => VNode {
	return vnode => {
		if (vnode.type === Text) {
			return h('span', { slot }, vnode.children as unknown as string);
		}
		return { ...vnode, props: { ...vnode.props, slot } };
	};
}

/** Behavior matches @open-wc/scoped-elements v1  */
let counter = Math.round(Math.random() * 100000);
function toUniqueTag(tag: string) {
	return `${tag}-${counter++}`;
}

function hyphenate(string: string) {
	const hyphenateRE = /\B([A-Z])/g;
	return string.replace(hyphenateRE, '-$1').toLowerCase();
}

function forwardAsEmit(event: string) {
	return { event, emit: event, map: (e: Event) => e };
}

function filterObject(predicate: (prop: string, value: unknown) => boolean) {
	return (object: Record<string, unknown>) => Object.fromEntries(Object.entries(object)
			.filter(([prop, value]) => predicate(prop, value)));
}

/** Used as https://ramdajs.com/docs/#prop */
function prop<P extends string>(name: P) {
	return <T>(object: Record<P, T>) => object[name];
}

/** Used as https://ramdajs.com/docs/#uniq */
function uniq<T>(list: readonly T[]) {
	return [...new Set(list)];
}

/* Utilities */

/**
 * Takes the specified prop of the event.target.
 * Use after the value has already updated, ie. with a simple Event.
 */
export function toTargetProp(name: string) {
	return ({ target }: Event) => {
		const element = target as unknown as Record<string, unknown>;
		return element[name];
	};
}

/**
 * Takes the event.detail if present.
 * Note that it also cancels the event if allowed.
 * Use before the value has updated, ie. with an update-[prop] CustomEvent.
 */
export function toDetail<T>(maybeCustomEvent: Event | CustomEvent<T>) {
	const { detail } = maybeCustomEvent as unknown as { detail: T };
	return detail;
}
