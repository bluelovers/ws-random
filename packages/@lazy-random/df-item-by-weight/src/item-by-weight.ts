import {
	IObjectInput,
	IWeightEntrie,
	IOptionsItemByWeight,
	_itemByWeightCore,
	_calcWeight,
} from './internal/item-by-weight';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function itemByWeight<T extends unknown>(random: IRNGLike, arr: T[],
	options?: IOptionsItemByWeight<T>,
): () => IWeightEntrie<T>
export function itemByWeight<T extends unknown, K extends string = string>(random: IRNGLike,
	arr: IObjectInput<T, K>,
	options?: IOptionsItemByWeight<T, K>,
): () => IWeightEntrie<T, K>
export function itemByWeight<T extends unknown>(random: IRNGLike,
	arr: T[] | IObjectInput<T>,
	options?: IOptionsItemByWeight<T>,
)
{
	/*
	let ws = _createWeight(arr, options)

	ws = _sortWeight(random, ws, options);

	ws = _percentageWeight(random, ws);
	 */

	let ws = _calcWeight(random, arr, options);

	const { vlist, klist } = ws;

	//console.dir(ws)

	ws = void 0;
	arr = void 0;
	options = void 0;

	return () =>
	{
		return vlist[_itemByWeightCore(random.next(), klist)]
	}
}

export default itemByWeight
