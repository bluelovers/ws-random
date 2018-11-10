import { Random } from '../random';
import uniformInt from './uniform-int';
import ow from '../util/ow'

export default (random: Random, size: number = 1, start: number = 0, end?: number) =>
{
	ow(size, ow.number.integer.gt(0))
	start = Math.max(start | 0, 0)
	end = Math.max(0, end | 0)

	ow(start, ow.number.integer.gte(0))
	ow(end, ow.number.integer.gte(0))

	return <T extends Array<unknown>>(arr: T) =>
	{
		let ids: number[] = [];
		let len = arr.length - 1

		let end_runtime = end || len

		ow(start, ow.number.integer.lt(end_runtime))
		ow(end_runtime, ow.number.integer.lte(len))

		let size_runtime = Math.max(Math.min(end_runtime - start, len, size), 0)

		do
		{
			let i = random.int(start, end_runtime)

			while (ids.includes(i))
			{
				i = random.int(start, end_runtime)
			}

			ids.push(i)
		}
		while (--size_runtime > 0)

		return ids
	}
}

// @ts-ignore
Object.freeze(exports)
