import randomSrc from '../../src'
import seedrandom from '../../preset/seedrandom'
import { simpleWrap } from '../../src/simple-wrap';
import { _MathRandom } from '../../src/util'
import Benchmark = require('benchmark');
import crypto = require('crypto');
import cryptorandom = require('math-random');
import randomOrigin = require('random');
import randomUglifyJS from '../../lib'

export { Benchmark }

export const tests = {
	Math: simpleWrap(_MathRandom),

	randomUglifyJS,

	randomSrc,

	randomOrigin,

	seedrandom,

	'math-random2': randomUglifyJS.newUse('math-random2'),

	'xor128': randomUglifyJS.newUse('xor128'),

	'crypto': randomUglifyJS.newUse('crypto'),

	cryptorandom: simpleWrap(cryptorandom),
	cryptorandom2: simpleWrap(cryptorandom2),

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

const MATH_POW_2_32 = Math.pow(2, 32)

function cryptorandom2()
{
	let buf = crypto
		.randomBytes(4)
		.readUInt32BE(0)

	return buf / MATH_POW_2_32
}

export default tests
