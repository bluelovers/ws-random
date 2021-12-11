import random from '../random';
import { Random } from '../random';
import { expect } from '@lazy-random/expect';
import { uniformInt } from '@lazy-random/df-uniform';

import { swapAlgorithm } from '@lazy-random/array-algorithm';
import { randIndex as _randIndex } from '@lazy-random/util-distributions';

export interface IRandIndex
{
	(len: number): number
	(len: number, ...argv): number
	(...argv): number
}

export interface IArrayUniqueOutOfLimitCallback<T extends unknown>
{
	(arr: T[], limit: number, loop: boolean, fn: IRandIndex): T[] | boolean | void
}

export default <T extends unknown>(random: Random, arr: T[], limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>) =>
{
	const randIndex = (len: number) =>
	{
		return _randIndex(random, len)
	};

	let clone = arr.slice();

	limit = Math.min(limit || clone.length, clone.length);

	fnRandIndex = fnRandIndex || randIndex;
	loop = !!loop;

	//ow(limit, ow.number.integer.gt(0));
	//ow(fnRandIndex, ow.function);

	expect(limit).integer.gt(0)
	expect(fnRandIndex).is.function()

	let count = limit;
	let len: number;

	const _fnClone = function _fnClone(arr: T[])
	{
		clone = arr.slice();
		count = limit;
		len = clone.length;
	}

	return () =>
	{
		len = clone.length;

		if (len === 0 || count-- === 0)
		{
			let _loop: boolean = loop;

			if (fnOutOfLimit)
			{
				let ret = fnOutOfLimit(arr, limit, loop, fnRandIndex);

				if (Array.isArray(ret) && ret.length > 0)
				{
					_fnClone(ret);

					_loop = null;
				}
				else if (ret == true)
				{
					_loop = true;
				}
				else if (typeof ret !== 'undefined')
				{
					_loop = false
				}
			}

			if (_loop)
			{
				_fnClone(arr)
			}
			else if (_loop !== null)
			{
				throw new RangeError(`can't call arrayUnique > ${limit} times`)
			}
		}

		let i = fnRandIndex(len);

		return clone
			.splice(i, 1)[0]
			;
	}
}


