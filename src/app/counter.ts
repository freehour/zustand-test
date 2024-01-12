import { createContext, useContext } from 'react';
import { type StoreApi, createStore, useStore } from 'zustand';

export interface CounterState {
	// all state fields are effectively readonly, i.e. you can't change the store thru them
	// they can only be changed from provided actions in CounterActions
	count: number;
}

// use a separate interface for actions, as they dont change and thus can be destructured without a selector
export interface CounterActions {
	// that's why a setter is needed for a read-write field, for a readonly field just omit it
	setCount: (count: number) => void;
	// other actions the controller wants to provide through the context
	increaseCount: () => void;
	decreaseCount: () => void;
	// let's say we do not want to provide a resetCount action
}

// combine state and actions into one store
type CounterStore = CounterState & CounterActions;

// create the store api, not exported only the controller can create it
function createCounterStore(initial: CounterStore): StoreApi<CounterStore> {
	return createStore<CounterStore>()(() => ({
		...initial
	}));
}

// the context provides the store api,
// undefined frees us from dummy initialization, we want to use a custom hook anyway
// which can just throw an error if it's not provided
//
// the context is not exported this way the store api can only be accessed through the controller
const CounterContext = createContext<StoreApi<CounterStore> | undefined>(
	undefined
);

// the provider is exported, so it can be used anywhere
export const CounterProvider = CounterContext.Provider;

// the consumer is exported, so it can be used anywhere
export const CounterConsumer = CounterContext.Consumer;

// custom hook to access the store api from the context
function useCounterStore(): StoreApi<CounterStore> | never {
	const store = useContext(CounterContext);

	if (!store) {
		throw new Error('Missing CounterProvider');
	}

	return store;
}

// -> custom hook with selector is the solution to the problem
// also useful for computed values
// e.g. const countIsZero = useCounter(state => state.count === 0)
export function useCounterState<U>(
	selector: (state: CounterState) => U
): U | never {
	const api = useCounterStore();
	return useStore(api, selector);
}

// optional: export hooks for state fields, to avoid having to write selectors for simple state fields
// e.g. const count = useCount() instead of const { count } = useCounter(state => ({count: state.count}))
export function useCount(): number {
	return useCounterState(state => state.count);
}

// export one hook for all actions, they never change so destructuring can be used instead of a selector
// e.g. const { setCount, increaseCount, decreaseCount } = useCounterActions()
export function useCounterActions(): CounterActions {
	const api = useCounterStore();
	return useStore(api, (state: CounterActions) => ({
		...state
	}));
}

export class CounterController {
	readonly store: StoreApi<CounterStore>;

	constructor(count = 0) {
		// initialize the store
		// using bind or () => {} is necessary to preserve the correct `this` context on destructuring
		this.store = createCounterStore({
			count: count, // initial value
			setCount: (newCount: number) => {
				this.count = newCount;
			},
			increaseCount: this.increaseCount.bind(this),
			decreaseCount: this.decreaseCount.bind(this)
		});
	}

	increaseCount(): void {
		this.count++;
	}

	decreaseCount(): void {
		this.count--;
	}

	resetCount(): void {
		this.count = 0;
	}

	get count(): number {
		return this.store.getState().count;
	}

	set count(count: number) {
		this.store.setState({ count });
	}
}
