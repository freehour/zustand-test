'use client';

import { type FunctionComponent, useMemo } from 'react';

import Counter from './components/counter';
import { CounterController, CounterProvider, useName } from './counter_short';

const App: FunctionComponent = () => {
	console.log('App.render');

	const counter1 = useMemo(
		() => new CounterController({ name: 'counter 1' }),
		[]
	);
	const counter2 = useMemo(
		() => new CounterController({ name: 'counter 2' }),
		[]
	);

	const name1 = useName(counter1);
	const name2 = useName(counter2);

	return (
		<div className="flex flex-col gap-3">
			<div>
				The two counters are named: {name1} and {name2}
			</div>
			<div className="flex flex-row gap-4">
				<button
					onClick={() => {
						counter1.resetCount();
						counter2.resetCount();
					}}
				>
					Reset
				</button>
				<button
					onClick={() => {
						counter1.name = 'New Name 1';
						counter2.name = 'New Name 2';
					}}
				>
					Change Name
				</button>
			</div>
			<CounterProvider value={counter1.store}>
				<Counter />
			</CounterProvider>
			<CounterProvider value={counter2.store}>
				<Counter />
			</CounterProvider>
		</div>
	);
};

export default App;
