import { IRNGLike } from '@lazy-random/rng-abstract-core';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { _handleStartEnd } from './util/options';
import { int } from '@lazy-random/util-distributions';

/**
 * return index number form array
 */
export function dfArrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(random: IRNGLike,
	arr: T,
	start: number = 0,
	end?: number
)
{
	({
		start,
		end,
	} = _handleStartEnd(arr, start, end));

	return () =>
	{
		return int(random, start, end)
	}
}

export default dfArrayIndexOne
