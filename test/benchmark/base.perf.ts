/**
 * Created by user on 2018/10/22/022.
 */

import tests, { Benchmark, formatBenchmarkResult, sortBenchmarkResult, getMethods } from './'

import console from 'debug-color2'
import { defaultArgv } from '../../src/simple-wrap';

const methods = Object.keys(tests.Math)

methods.unshift(methods[0])

methods
	.forEach(function (method)
	{
		const argv = defaultArgv[method] || []

		const suite = (new Benchmark.Suite)
		console.grey(`\n-----------------------`);

		console.log(method, `(${argv.join(', ')})`);

		console.grey(`=======================\n`);

		Object.keys(tests)
			.forEach(function (name)
			{
				const rng = tests[name];

				suite.add(`${name}.${method}`, function ()
				{
					rng[method](...argv)
				})

				console.debug(`${name}.${method} => ${rng[method](...argv)}`, '  ');
			})
		;

		console.grey(`\n-----------------------`);

		suite
			.on('cycle', function (event)
			{
				//console.info(String(event.target));
			})
			.on('complete', function (this)
			{
				let ls = sortBenchmarkResult(this)

				console.ok('Fastest is ' + this.filter('fastest').map('name'), '  ')
				console.ok('Slowest is ' + this.filter('slowest').map('name'), '  ')

				console.grey(`\n-----------------------`);

				ls.forEach(function (v)
				{
					console.log(formatBenchmarkResult(v), '  ')
				})
			})
			.run()
		;
	})
;
