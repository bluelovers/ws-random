import { Random } from '../random';
import { randIndex as _randIndex } from '../util/distributions';
import {
	_createWeight,
	_getWeight,
	IObjectInput,
	IWeightEntrie,
	IGetWeight,
	_percentageWeight, _sortWeight,
} from './internal/item-by-weight';

function itemByWeight<T extends unknown>(random: Random, arr: T[],
	getWeight?: IGetWeight<T>,
	shuffle?: boolean,
	disableSort?: boolean,
): () => IWeightEntrie<T>
function itemByWeight<T extends unknown>(random: Random,
	arr: IObjectInput<T>,
	getWeight?: IGetWeight<T>,
	shuffle?: boolean,
	disableSort?: boolean,
): () => IWeightEntrie<T>
function itemByWeight<T extends unknown>(random: Random,
	arr: T[] | IObjectInput<T>,
	getWeight?: IGetWeight<T>,
	shuffle?: boolean,
	disableSort?: boolean,
)
{
	let ws = _createWeight(arr, getWeight || _getWeight)

	ws = _sortWeight(random, ws, {
		shuffle,
		disableSort,
	});

	ws = _percentageWeight(random, ws);

	return () =>
	{
		let r = random.next()
		let rs = ws.vlist[ws.vlist.length - 1]

//		console.dir(ws, {
//			depth: null,
//		})
//
//		console.dir(rs)

		for (let k in ws.klist)
		{
			if (r <= ws.klist[k])
			{
				rs = ws.vlist[k]

				break
			}
		}

		//let i = rs.length > 1 ? _randIndex(random, rs.length) : 0

		return rs
	}
}

export default itemByWeight


