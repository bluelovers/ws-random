import random from '../random';
import { Random } from '../random';
import { randIndex as _randIndex } from '../util/distributions';
import uniformInt from './uniform-int';
import ow from 'ow-lite'
import { swapAlgorithm } from '../util/array';

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

	plist: number[],
	vlist: IWeightEntrie<T>[][]

//	list: {
//		[p: number]: IWeightEntrie<T>[]
//		[p: string]: IWeightEntrie<T>[]
//	}
}

export type IWeightEntrie<T extends unknown> = [string, T]

export interface IObjectInput<T extends unknown>
{
//	[i: number]: T
	[k: string]: T
}

function itemByWeight<T extends unknown>(random: Random, arr: T[], getWeight: IGetWeight<T>): () => [string, T]
function itemByWeight<T extends unknown>(random: Random,
	arr: IObjectInput<T>,
	getWeight: IGetWeight<T>,
): () => [string, T]
function itemByWeight<T extends unknown>(random: Random,
	arr: T[] | IObjectInput<T>,
	getWeight: IGetWeight<T> = _getWeight,
)
{
	let ws = _createWeight(arr, getWeight || _getWeight)

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

		for (let k in ws.plist)
		{
			if (r <= ws.plist[k])
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

/**
 * @todo need a better code
 *
 * @private
 */
export function _createWeight<T extends unknown>(arr: T[] | IObjectInput<T>,
	getWeight: IGetWeight<T> = _getWeight,
): IWeight<T>
{
	let sum: number = 0

	let c = []

	let ls = Object.entries(arr)
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
		.map(function (entrie)
		{
			entrie.percentage = entrie.weight / sum

			return entrie
		})
		.sort(function (a, b)
		{
			return a.percentage - b.percentage
		})
		.reduce(function (a, entrie)
		{
			let k = entrie.percentage

			a[k] = a[k] || []

			let item = [entrie.key, entrie.value]

			a[k].push(item)

			return a
		}, {})
	;

	let psum = 0

	let a1 = []
	let a2 = []

	Object.keys(ls)
		.reduce(function (a, p)
		{
			if (psum === 0)
			{
				psum = +p
			}
			else
			{
				psum += +p
			}

			a1.push(psum)
			a2.push(ls[p])

			return a
		}, {})
	;

	return {
		//source: arr,
		sum,
		//sum2,
		//psum,
		//psum2,
//		list: ls,

		plist: a1,
		vlist: a2,
	}
}

// @ts-ignore
Object.freeze(exports)
