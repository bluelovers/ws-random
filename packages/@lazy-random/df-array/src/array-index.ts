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
	expect(size).integer.gt(0);

	let len: number;

	({
		start,
		end,
		len,
	} = _handleStartEnd(arr, start, end));

	let size_runtime = Math.max(Math.min(end - start, len, size), 0);

	expect(size_runtime).gte(size).gt(0)

	const fn = dfArrayIndexOne(random, arr, start, end);

	return () =>
	{
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
