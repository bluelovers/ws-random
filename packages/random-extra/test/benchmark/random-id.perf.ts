/**
 * Created by user on 2018/11/9/009.
 */

import random from '../../src/random';
import seedrandom from '@lazy-random/preset-seedrandom';
import nanoid = require('nanoid')
import shortid = require('shortid');
import tests, { Benchmark, formatBenchmarkResult, sortBenchmarkResult, getMethods } from './'
import hashSum = require('hash-sum');

import console from 'debug-color2'
import { defaultArgv } from '@lazy-random/simple-wrap';

const suite = (new Benchmark.Suite);

// @ts-ignore
shortid();
// @ts-ignore
nanoid();
const random_charID = tests.random.dfCharID();
const seedrandom_charID = tests.seedrandom.dfCharID();
const math_random2_charID = tests['math-random2'].dfCharID();
const xor128_charID = tests.xor128.dfCharID();

suite
	.add(`shortid`, shortid)
	// @ts-ignore
	.add(`nanoid`, nanoid)
	.add(`random.charID`, random_charID)
	.add(`random.uuidv4`, random.dfUuidv4())
	.add(`seedrandom.charID`, seedrandom_charID)
	.add(`math-random2.charID`, math_random2_charID)
	.add(`xor128.charID`, xor128_charID)
	.add(`hash-sum(number)`, () => {
		hashSum(Math.random())
	})
	.add(`hash-sum(string)`, () => {
		hashSum(String(Math.random()))
	})
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
