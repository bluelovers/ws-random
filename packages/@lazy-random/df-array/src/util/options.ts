import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { expect } from '@lazy-random/expect';

export function _handleStartEnd<T extends ITSArrayListMaybeReadonly<unknown>>(arr: T, start: number = 0, end?: number, disableCheck?: boolean)
{
	const len = arr.length;
	const enableCheck = !disableCheck;

	start = Math.max(Math.floor(start), 0);

	if (typeof end !== 'undefined' && end !== null)
	{
		end = Math.floor(end);
		enableCheck && expect(end).integer
			.gt(start + 1, `END(${end}) should greater than START(${start}+1)`)
			.gt(0)
			//.gt(start, `END(${end}) should greater than START(${start})`)
		;
	}

	end = Math.min(Math.max(0, end ?? len), len);

	enableCheck && expect(end, `END(${end})`).integer.gte(0).lte(len);
	enableCheck && expect(start, `START(${start})`).integer.gte(0).lt(end);

	return {
		start,
		end,
		len,
	}
}
