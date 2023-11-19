import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { expect } from '@lazy-random/expect';

export function _handleStartEnd<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, start: number = 0, end?: number)
{
	const len = arr.length - 1;

	start = Math.max(Math.floor(start), 0);
	end = Math.max(0, Math.floor(end)) || len;

	expect(end).integer.gt(0).lte(len);
	expect(start).integer.gte(0).lt(end);

	return {
		start,
		end,
		len,
	}
}
