import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { _handleStartEnd } from './util/options';
import { dfArrayIndexOne } from './array-index-one';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * return index list form array
 */
export function dfArrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(random: IRNGLike, arr: T, size: number = 1, start: number = 0, end?: number)
{
	expect(size, `size`).integer.gt(0);
	expect(arr.length, `arr.length`).integer.gt(0);

	const fn = dfArrayIndexOne(random, arr, start, end);

	let len: number;

	({
		start,
		end,
		len,
	} = _handleStartEnd(arr, start, end, true));

	let size_runtime = Math.max(Math.min((end - start), len, size), 0);

	expect(size_runtime, `size_runtime(${size_runtime})`).lte(size).gt(0)

	size = size_runtime;

	return () =>
	{
		/**
		 * reset size_runtime
		 */
		size_runtime = size;

		let ids: number[] = [];
		let prev: number;

		LABEL_TOP: do
		{
			let i = fn()

			if (prev === i || ids.includes(i))
			{
				continue LABEL_TOP;
			}

			ids.push(prev = i);
			--size_runtime;
		}
		while (size_runtime > 0);

		return ids;
	}
}

export default dfArrayIndex
