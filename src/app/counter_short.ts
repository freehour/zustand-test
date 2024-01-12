import { type StoreApi, useStore } from 'zustand';

import {
	createLazyStoreContext,
	createStore,
	useActions,
	useState
} from './store';

// the state shared by the provider
export interface CounterState {
	count: number;
}

// the actions shared by the provider
export interface CounterActions {
	setCount: (count: number) => void;
	increaseCount: () => void;
	decreaseCount: () => void;
}

// the state local to the controller (not provided by the provider)
export interface CounterLocalState {
	name: string;
}

type CounterStore = CounterState & CounterActions;

const CounterContext = createLazyStoreContext<CounterStore>();
export const CounterProvider = CounterContext.Provider;
export const CounterConsumer = CounterContext.Consumer;

export class CounterController {
	readonly store: StoreApi<CounterStore & CounterLocalState>;

	constructor(initialState: Partial<CounterState & CounterLocalState> = {}) {
		this.store = createStore({
			count: 0,
			name: '',
			setCount: (newCount: number) => {
				this.count = newCount;
			},
			increaseCount: this.increaseCount.bind(this),
			decreaseCount: this.decreaseCount.bind(this),
			...initialState
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

	get name(): string {
		return this.store.getState().name;
	}

	set name(name: string) {
		this.store.setState({ name });
	}
}

// custom hooks

export function useCounterState<U>(
	selector: (state: CounterState) => U
): U | never {
	return useState(CounterContext, selector);
}

export function useCount(): number {
	return useCounterState(state => state.count);
}

export function useCounterActions(): CounterActions {
	return useActions(CounterContext);
}

export function useName(controller: CounterController): string {
	return useStore(controller.store, state => state.name);
}
