import random from '../random';
import { Random } from '../random';
import { randIndex as _randIndex } from '../util/distributions';
import uniformInt from './uniform-int';
import ow from 'ow-lite'
import { swapAlgorithm } from '../util/array';
import arrayShuffle from './array-shuffle'

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
	vlist: IWeightEntrie<T>[][]

//	list: {
//		[p: number]: IWeightEntrie<T>[]
//		[p: string]: IWeightEntrie<T>[]
//	}
}

export type IWeightEntrie<T extends unknown> = [string, T, number]

export interface IObjectInput<T extends unknown>
{
//	[i: number]: T
	[k: string]: T
}

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
	getWeight = getWeight || _getWeight

	let ws = _createWeight(arr, getWeight)

	if (!disableSort)
	{
		ws.vlist = ws.vlist.sort(function (a, b)
		{
			let n = a[0][2] - b[0][2]

			return n
		})
	}

	if (shuffle)
	{
		ws.vlist = random.arrayShuffle(ws.vlist, true)
	}

	let psum: number = 0

	ws.plist = []
	ws.klist = ws.vlist
		.reduce(function (a, list)
		{
			let percentage = list[0][2]

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

	if (0)
	{
		console.dir(ws, {
			depth: 5,
			colors: true,
		})
	}

	return () =>
	{
		let r = random.next()
		let rs = ws.vlist[ws.vlist.length - 1]

		for (let k in ws.klist)
		{
			if (r <= ws.klist[k])
			{
				rs = ws.vlist[k]

				break
			}
		}

		let i = rs.length > 1 ? _randIndex(random, rs.length) : 0

		return rs[i]
	}
}

export default itemByWeight

export function _getWeight(value, key): number
{
	return value
}

export function _createWeight<T extends unknown>(arr: T[] | IObjectInput<T>,
	getWeight: IGetWeight<T> = _getWeight,
): IWeight<T>
{
	let sum: number = 0
	let psum = 0

	let c = []

	let ls2 = Object.entries(arr)
		.map(function (entrie)
		{
			let [key, value] = entrie

			let weight = getWeight(value, key)

			//weight = Math.exp(weight)

			weight = +weight

			ow(weight, ow.number.gt(0))

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

			let k = entrie.percentage

			let item = [entrie.key, entrie.value, entrie.percentage]

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
			a.vlist.push([item])

			return a
		}, {
			//klist: [],
			//plist: [],
			vlist: [],
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

// @ts-ignore
Object.freeze(exports)
