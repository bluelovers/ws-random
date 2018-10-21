
import random from '../../'
import seedrandom from '../../preset/seedrandom'
import { Random } from '../../src/random';
import { _MathRandom } from '../../src/util'
import Benchmark = require('benchmark')

export { Benchmark }

let max = 100, min = 0;

export const tests = {
	Math: {
		next: _MathRandom,
		random: _MathRandom,
		float: _MathRandom,
		int()
		{
			return (_MathRandom() * (max - min + 1) + min) | 0
		},
		integer()
		{
			return (_MathRandom() * (max - min + 1) + min) | 0
		},
		boolean(likelihood: number = 0.5)
		{
			return (_MathRandom() >= likelihood)
		},
		byte()
		{
			let max = 255, min = 0;

			return (_MathRandom() * (max - min + 1) + min) | 0
		},
	},
	random,
	seedrandom,

	'math-random2': random.newUse('math-random2'),

	'xor128': random.newUse('xor128'),
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

export default tests
