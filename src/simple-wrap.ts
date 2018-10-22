/**
 * Created by user on 2018/10/22/022.
 */

export const defaultArgv = Object.freeze({
	int: Object.freeze([0, 100]),
	integer: Object.freeze([0, 100]),
	boolean: Object.freeze([0.5]),
	bytes: Object.freeze([1]),
})

export function simpleWrap<T extends (() => number)>(fn: T)
{
	let self = {
		next(): number
		{
			return fn()
		},
		random(): number
		{
			return fn()
		},
		float(min = 0, max = 1): number
		{
			return (fn() * (max - min + 1) + min)
		},
		int(min = 0, max = 100): number
		{
			return (fn() * (max - min + 1) + min) | 0
		},
		get integer()
		{
			return self.int
		},
		boolean(likelihood: number = 0.5)
		{
			return (fn() >= likelihood)
		},
		byte(): number
		{
			return self.int(0, 255)
		},
		bytes(size: number = 1)
		{
			let arr: number[] = []
			for (let i = 0; i < size; i++)
			{
				arr.push(self.byte())
			}
			return arr
		},
		seed(...argv)
		{
			return self
		},
	}

	return self
}

export default simpleWrap;
// @ts-ignore
Object.freeze(exports)
