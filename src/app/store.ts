import { type Context, createContext } from 'react';
import { createStore as createZustand } from 'zustand';
import { useStore as useZustand } from 'zustand';
import type { StoreApi } from 'zustand';

import { createLazyContext, useAssertContext } from './context';

export function createStore<Store>(initial: Store): StoreApi<Store> {
	return createZustand<Store>()(() => ({
		...initial
	}));
}

export function createStoreContext<Store>(
	defaultValue: Store
): Context<StoreApi<Store>> {
	return createContext(createStore(defaultValue));
}

export function createLazyStoreContext<Store>(): Context<
	StoreApi<Store> | undefined
> {
	return createLazyContext<StoreApi<Store>>();
}

export function useState<
	State,
	Store extends State,
	U,
	C extends StoreApi<Store> | undefined = StoreApi<Store> | undefined
>(context: Context<C>, selector: (state: State) => U): U | never {
	const api = useAssertContext<StoreApi<Store>, C>(context);
	return useZustand(api, selector);
}

export function useActions<
	Actions,
	Store extends Actions,
	C extends StoreApi<Store> | undefined = StoreApi<Store> | undefined
>(context: Context<C>): Actions | never {
	const api = useAssertContext<StoreApi<Store>, C>(context);
	return useZustand(api, (actions: Actions) => ({
		...actions
	}));
}
