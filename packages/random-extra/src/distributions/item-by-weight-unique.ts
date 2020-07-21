import { Random } from '../random';
import {
	IOptionsItemByWeight,
	IWeightEntrie,
	IObjectInput,
	_createWeight,
	_sortWeight, _percentageWeight, _itemByWeightCore, IWeight,
} from './internal/item-by-weight';
import expect from '../util/ow';

function itemByWeightUnique<T extends unknown>(random: Random, arr: T[],
	size: number,
	options?: IOptionsItemByWeight<T>,
): () => IWeightEntrie<T>[]
function itemByWeightUnique<T extends unknown, K extends string = string>(random: Random,
	arr: IObjectInput<T, K>,
	size: number,
	options?: IOptionsItemByWeight<T, K>,
): () => IWeightEntrie<T, K>[]
function itemByWeightUnique<T extends unknown, K extends string = string>(random: Random,
	arr: T[] | IObjectInput<T, K>,
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

	return () =>
	{
		const result: IWeightEntrie<T, K>[] = [];
		const size_sub_1 = size - 1;
		const ws = {
			vlist: vlist.slice(),
			klist: klist.slice(),
		} as IWeight<T, K>;

		for (let i = 0; i < size; i++)
		{
			let index = _itemByWeightCore<T, K>(random.next(), ws.vlist, ws.klist)

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

export default itemByWeightUnique
