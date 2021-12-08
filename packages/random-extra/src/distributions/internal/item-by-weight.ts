import { expect } from '@lazy-random/expect';
import { Random } from '../../random';

export function _getWeight(value, key: string): number
{
	return value + 0.001
}

export interface IGetWeight<T extends unknown, K extends string = string>
{
	(value: T, key: K, ...argv): number
}

export interface IWeight<T extends unknown, K extends string = string>
{
	sum: number,
	//sum2: number,

	//psum: number,
	//psum2: number,

	klist?: number[],
	plist?: number[],
	vlist: IWeightEntrie<T, K>[],

	/**
	 * key weight table
	 */
	kwlist?: Record<K, number>,

	list?: IWeightRawData<T, K>[]

//	list: {
//		[p: number]: IWeightEntrie<T>[]
//		[p: string]: IWeightEntrie<T>[]
//	}
}

export interface IWeightRawData<T extends unknown, K extends string = string>
{
	key: K,
	value: T,
	weight: number,
	percentage: number,
}

/**
 * [key, value, percentage]
 */
export type IWeightEntrie<T extends unknown, K extends string = string> = [K, T, number]

export type IObjectInput<T extends unknown, K extends string = string> = {
	//	[i: number]: T
	[k in K]: T
}

export interface IOptionsItemByWeightSort
{
	shuffle?: boolean,
	disableSort?: boolean,
}

export interface IOptionsItemByWeight<T extends unknown, K extends string = string> extends IOptionsItemByWeightSort
{
	getWeight?: IGetWeight<T, K>,
}

export function _createWeight<T extends unknown, K extends string = string>(arr: T[] | IObjectInput<T, K>,
	options?: IOptionsItemByWeight<T, K>,
): IWeight<T, K>
{
	let sum: number = 0

	const getWeight = options?.getWeight ?? _getWeight;

	let ls2: IWeightRawData<T, K>[] = (Object.entries(arr) as [K, T][])
		.map(function (entrie)
		{
			let [key, value] = entrie

			let weight = getWeight(value, key)

			//weight = Math.exp(weight)

			weight = +weight

			//ow(weight, ow.number.gt(0))
			expect(weight).gt(0)

			sum += weight

			return {
				key,
				value,
				weight,
				percentage: 0,
			}
		})
	;

	let ls = ls2
		.reduce(function (a, entrie)
		{
			entrie.percentage = entrie.weight / sum

			//let k = entrie.percentage

			let item = [entrie.key, entrie.value, entrie.percentage] as IWeightEntrie<T, K>

			if (a.last === 0)
			{
				a.last = entrie.percentage
			}
			else
			{
				a.last += entrie.percentage
			}

			//a.klist.push(a.last)
			//a.plist.push(entrie.percentage)
			a.vlist.push(item)

			a.kwlist[entrie.key] = entrie.weight;

			return a
		}, {
			//klist: [],
			//plist: [],
			vlist: [] as IWeight<T, K>["vlist"],
			kwlist: {} as IWeight<T, K>["kwlist"],
			last: 0,
		})
	;

	expect(ls.vlist).have.length.gt(1);

	return {
		//source: arr,
		sum,
		//sum2,
		//psum,
		//psum2,
//		list: ls,

		list: ls2,

		//klist: ls.klist,
		//plist: ls.plist,
		kwlist: ls.kwlist,
		vlist: ls.vlist,
	}
}

export function _sortWeight<T extends unknown, K extends string = string>(random: Random,
	ws: IWeight<T, K>,
	options: IOptionsItemByWeightSort = {},
)
{
	if (!options.disableSort)
	{
		ws.vlist = ws.vlist.sort(function (a, b)
		{
			let n = a[2] - b[2]

			return n
		})
	}

	if (options.shuffle)
	{
		ws.vlist = random.arrayShuffle(ws.vlist, true)
	}

	return ws
}

export function _percentageWeight<T extends unknown, K extends string = string>(random: Random, ws: IWeight<T, K>)
{
	let psum: number = 0

	ws.plist = []
	ws.klist = ws.vlist
		.reduce(function (a, list)
		{
			let percentage = list[2]

			if (psum === 0)
			{
				psum = percentage
			}
			else
			{
				psum += percentage
			}

			a.push(psum)
			ws.plist.push(percentage)

			return a
		}, [] as number[])
	;

	return ws
}

export function _calcWeight<T extends unknown, K extends string = string>(random: Random, arr: T[] | IObjectInput<T, K>,
	options?: IOptionsItemByWeight<T, K>,
): IWeight<T, K>
{
	let ws = _createWeight(arr, options)

	ws = _sortWeight(random, ws, options);

	ws = _percentageWeight(random, ws);

	return ws
}

export function _itemByWeightCore(r: number,
	klist: number[],
): number
{
	let index: number

	for (let k = 0; k < klist.length; k++)
	{
		if (r <= klist[k])
		{
			index = k;

			break
		}
	}

	return index ?? klist.length - 1
}
