
import random from '../../'
import seedrandom from '../../preset/seedrandom'
import { Random } from '../../src/random';
import { _MathRandom } from '../../src/util'
import Benchmark = require('benchmark')
import cryptorandom = require('math-random')
import crypto = require('crypto')

export { Benchmark }

export const tests = {
	Math: wrapRandom(_MathRandom),
	random,
	seedrandom,

	'math-random2': random.newUse('math-random2'),

	'xor128': random.newUse('xor128'),

	cryptorandom: wrapRandom(cryptorandom),
	cryptorandom2: wrapRandom(cryptorandom2),
};

export function getMethods(random)
{
	return Object
		.getOwnPropertyNames(Object.getPrototypeOf(random))
		.filter(function (v)
		{
			return ![
				'constructor',
				'rng',
				'clone',
				'use',
				'newUse',
				'cloneUse',
				'patch',
				'unpatch',
				'_memoize',
				'reset',
				'_rng',
				'_cache',
			].includes(v)
		})
}

export function sortBenchmarkResult(ls)
{
	return ls.filter('successful')
		.sort(function (a, b)
		{
			a = a.stats;
			b = b.stats;
			return (a.mean + a.moe > b.mean + b.moe ? 1 : -1)
		})
}

export function formatBenchmarkResult(v)
{
	const pm = '\xb1'

	let result = v.name

	let hz = v.hz
	let size = v.stats.sample.length
	let stats = v.stats

	result += ' x ' + Benchmark.formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec ' + pm +
		stats.rme.toFixed(2) + '% (' + size + ' run' + (size == 1 ? '' : 's') + ' sampled)';

	return result
}

export function wrapRandom<T extends (() => number)>(fn: T)
{
	let max = 100, min = 0;

	return {
		next: fn,
		random: fn,
		float: fn,
		int()
		{
			return (fn() * (max - min + 1) + min) | 0
		},
		integer()
		{
			return (fn() * (max - min + 1) + min) | 0
		},
		boolean(likelihood: number = 0.5)
		{
			return (fn() >= likelihood)
		},
		byte()
		{
			let max = 255, min = 0;

			return (fn() * (max - min + 1) + min) | 0
		},
		bytes(size: number = 1)
		{
			let arr: number[] = []
			for (let i = 0; i < size; i++)
			{
				arr.push(this.byte())
			}
			return arr
		},
	}
}

const max = Math.pow(2, 32)

function cryptorandom2 () {
	let buf = crypto
		.randomBytes(4)
		.readUInt32BE(0)

	return buf / max
}

export default tests
