import { Random } from '../random';
import * as UtilDistributions from '../util/distributions';
import expect from '../util/ow';
import uniformInt from './uniform-int';

export default <T extends Array<unknown>>(random: Random, arr: T, size: number = 1, start: number = 0, end?: number) =>
{
	let len = arr.length - 1;

	expect(size).integer.gt(0)

	start = Math.max(start | 0, 0);
	end = Math.max(0, end | 0) || len;

	expect(end).integer.gt(0).lte(len)
	expect(start).integer.gte(0).lt(end)

	const fn = UtilDistributions.int;

	let size_runtime = Math.max(Math.min(end - start, len, size), 0);

	expect(size_runtime).gte(size).gt(0)

	return () =>
	{
		let ids: number[] = [];
		let prev: number;

		LABEL_TOP: do
		{
			let i = fn(random, start, end)

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

// @ts-ignore
Object.freeze(exports)
