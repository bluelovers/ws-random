import expect from '../../util/ow';
import { Random } from '../../random';

export function _getWeight(value, key): number
{
	return value
}

export interface IGetWeight<T extends unknown>
{
	(value: T, key?, ...argv): number
}

export interface IWeight<T extends unknown>
{
	sum: number,
	//sum2: number,

	//psum: number,
	//psum2: number,

	klist?: number[],
	plist?: number[],
	vlist: IWeightEntrie<T>[]

//	list: {
//		[p: number]: IWeightEntrie<T>[]
//		[p: string]: IWeightEntrie<T>[]
//	}
}

/**
 * [key, value, percentage]
 */
export type IWeightEntrie<T extends unknown> = [string, T, number]

export interface IObjectInput<T extends unknown>
{
//	[i: number]: T
	[k: string]: T
}

export function _createWeight<T extends unknown>(arr: T[] | IObjectInput<T>,
	getWeight: IGetWeight<T> = _getWeight,
): IWeight<T>
{
	let sum: number = 0

	let ls2 = Object.entries(arr)
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

			let item = [entrie.key, entrie.value, entrie.percentage] as IWeightEntrie<T>

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

			return a
		}, {
			//klist: [],
			//plist: [],
			vlist: [] as IWeight<T>["vlist"],
			last: 0,
		})
	;

	return {
		//source: arr,
		sum,
		//sum2,
		//psum,
		//psum2,
//		list: ls,

		//klist: ls.klist,
		//plist: ls.plist,
		vlist: ls.vlist,
	}
}

export function _sortWeight<T extends unknown>(random: Random, ws: IWeight<T>, options: {
	shuffle?: boolean,
	disableSort?: boolean,
} = {})
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

export function _percentageWeight<T extends unknown>(random: Random, ws: IWeight<T>)
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
