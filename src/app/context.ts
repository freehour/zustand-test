import type { Context } from 'react';
import { createContext, useContext } from 'react';

export function useAssertContext<T, C extends T | undefined = T | undefined>(
	context: Context<C>
): T | never {
	const value = useContext(context);

	if (value === undefined) {
		throw new Error('Missing context provider');
	}

	return value;
}

export function createLazyContext<T>(): Context<T | undefined> {
	return createContext<T | undefined>(undefined);
}
