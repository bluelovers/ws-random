/**
 * Created by user on 2018/10/22/022.
 */

import _tests, { Benchmark, formatBenchmarkResult, sortBenchmarkResult, getMethods } from './'
//import randomUglifyJS from '../../lib';

import console from 'debug-color2'

import { defaultArgv } from '@lazy-random/simple-wrap';
import { _MathRandom } from '@lazy-random/original-math-random';

const methods = [
		'next',
	]
;

methods.unshift(methods[0])

const tests = Object.assign({}, _tests);

// @ts-ignore
tests.Math2 = {
	next: _MathRandom,
};

// @ts-ignore
tests.Math3 = {
	next()
	{
		return _MathRandom()
	},
};

let tests_list = Object.keys(tests);

if (0)
{
	tests_list = [
		//'random',
		'randomSrc',

//		'randomUglifyJS',
		'randomUglifyJS',
	];
}

methods
	.forEach(function (method, index)
	{
		const argv = defaultArgv[method] || []

		const suite = (new Benchmark.Suite)
		console.grey(`\n-----------------------`);

		console.log(method, `(${argv.join(', ')})`);

		console.grey(`=======================\n`);

		tests_list
			.forEach(function (name)
			{
				const rng = tests[name];

				if (typeof rng[method] !== 'undefined')
				{

					suite.add(`${name}.${method} ${index}`, function ()
					{
						rng[method](...argv)
					});

					rng[method](...argv)
					//console.debug(`${name}.${method} => ${rng[method](...argv)}`, '  ');

				}
				else
				{
					console.debug(`skip: ${name}.${method} => is undefined`, '  ');
				}
			})
		;

		console.grey(`\n-----------------------`);

		suite
			.on('cycle', function (event)
			{
//				console.info(String(event.target));
			})
			.on('complete', function (this)
			{
				let ls = sortBenchmarkResult(this)

				console.ok('Fastest is ' + this.filter('fastest').map('name'), '  ');
				console.ok('Slowest is ' + this.filter('slowest').map('name'), '  ');

				console.grey(`\n-----------------------`);

				ls.forEach(function (v, i)
				{
					console.log(i, formatBenchmarkResult(v), '  ')
				})
			})
			.run()
		;
	})
;
