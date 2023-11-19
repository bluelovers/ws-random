import {
	IOptionsItemByWeight,
	IWeightEntrie,
	IObjectInput,
	_createWeight,
	_sortWeight,
	_percentageWeight,
	_itemByWeightCore,
	IWeight,
} from './internal/item-by-weight';
import { expect } from '@lazy-random/expect';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

export function dfItemByWeightUnique<T extends unknown>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T>,
	size: number,
	options?: IOptionsItemByWeight<T>,
): () => IWeightEntrie<T>[]
export function dfItemByWeightUnique<T extends unknown, K extends string = string>(random: IRNGLike,
	arr: IObjectInput<T, K>,
	size: number,
	options?: IOptionsItemByWeight<T, K>,
): () => IWeightEntrie<T, K>[]
export function dfItemByWeightUnique<T extends unknown, K extends string = string>(random: IRNGLike,
	arr: ITSArrayListMaybeReadonly<T> | IObjectInput<T, K>,
	size: number,
	options?: IOptionsItemByWeight<T, K>,
): () => IWeightEntrie<T, K>[]
{
	let ws = _createWeight(arr, options);

	expect(size).integer.gt(1);
	expect(ws.vlist).have.length.gte(size);

	ws = _percentageWeight(random, _sortWeight(random, ws, options));

	const { vlist, klist } = ws;

	ws = void 0;
	arr = void 0;
	options = void 0;

	const size_sub_1 = size - 1;

	return () =>
	{
		const result: IWeightEntrie<T, K>[] = [];
		const ws = {
			vlist: vlist.slice(),
			klist: klist.slice(),
		} as IWeight<T, K>;

		for (let i = 0; i < size; i++)
		{
			let index = _itemByWeightCore(random.next(), ws.klist)

			result.push(ws.vlist[index])

			if (i < size_sub_1)
			{
				ws.vlist.splice(index, 1);
				_percentageWeight(random, ws);
			}
		}

		return result
	}
}

export default dfItemByWeightUnique
