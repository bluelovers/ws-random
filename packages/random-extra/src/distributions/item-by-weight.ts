import { Random } from '../random';
import { randIndex as _randIndex } from '../util/distributions';
import {
	_createWeight,
	_getWeight,
	IObjectInput,
	IWeightEntrie,
	IGetWeight,
	_percentageWeight, _sortWeight, IOptionsItemByWeight,
} from './internal/item-by-weight';

function itemByWeight<T extends unknown>(random: Random, arr: T[],
	options?: IOptionsItemByWeight<T>
): () => IWeightEntrie<T>
function itemByWeight<T extends unknown, K extends string = string>(random: Random,
	arr: IObjectInput<T, K>,
	options?: IOptionsItemByWeight<T, K>
): () => IWeightEntrie<T, K>
function itemByWeight<T extends unknown>(random: Random,
	arr: T[] | IObjectInput<T>,
	options?: IOptionsItemByWeight<T>
)
{
	let ws = _createWeight(arr, options)

	ws = _sortWeight(random, ws, options);

	ws = _percentageWeight(random, ws);

	const { vlist, klist } = ws;

	ws = void 0;

	return () =>
	{
		let r = random.next()
		let rs = vlist[vlist.length - 1]

		/*
		console.dir({
			vlist,
			klist,
		}, {
			depth: null,
		})

		console.dir(rs)
		 */

		for (let k in klist)
		{
			if (r <= klist[k])
			{
				rs = vlist[k]

				break
			}
		}

		//let i = rs.length > 1 ? _randIndex(random, rs.length) : 0

		return rs
	}
}

export default itemByWeight


