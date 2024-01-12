import type { FunctionComponent } from 'react';

import { useCount, useCounterActions } from '../counter_short';

const Counter: FunctionComponent = () => {
	console.log('Counter.render');

	// triggers a re-render when count changes
	const count = useCount();
	// or alternatively:
	// const count = useCounterState((state) => state.count);

	// but can not access name as it is local to the controller
	// const name = useCounterState((state) => state.name);

	// does never trigger a re-render (as actions never change, no selector needed)
	const { setCount, increaseCount, decreaseCount } = useCounterActions();

	// NOTE: there is no way to get access to the StoreApi
	// only from the controller which is only known in the parent component

	return (
		<div className="flex flex-row gap-4">
			<button onClick={() => setCount(100)}> Set Count to 100 </button>
			<button onClick={() => increaseCount()}> Increase </button>
			<button onClick={() => decreaseCount()}> Decrease </button>
			<p>{count}</p>
		</div>
	);
};

export default Counter;
