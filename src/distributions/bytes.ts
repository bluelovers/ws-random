import { Random } from '../random';
import uniformInt from './uniform-int';
import ow from 'ow-lite'

export default (random: Random, size?: number) =>
{
	ow(size, ow.number.integer.gt(0))

	const fn = uniformInt(random, 0, 255)

	return () =>
	{
		let arr: number[] = []
		for (let i = 0; i < size; i++)
		{
			arr.push(fn())
		}
		return arr
	}
}

// @ts-ignore
Object.freeze(exports)
