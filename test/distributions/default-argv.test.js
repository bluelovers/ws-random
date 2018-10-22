// @allowJs: true
// @checkJs: true
import test from 'ava'
import seedrandom from 'seedrandom'
import random from '../..'
import RNGSeedRandom from '../../src/generators/seedrandom';
import { defaultArgv } from '../../src/simple-wrap';
import inDelta from '../_in-delta';
import { expect } from 'chai'

import { tests } from '../benchmark';

const methods_int = {
	int: [0, 100],
	integer: [0, 100],
	byte: [0, 255],
};

const methods_float = {
	srand: [0, 1],
	srandom: [0, 1],
	rand: [0, 1],
	random: [0, 1],
	next: [0, 1],
	float: [0, 1],
};

[
	methods_int,
	methods_float,
].forEach(function (current_methods)
{
	Object.keys(current_methods)
		.forEach(function (method)
		{
			[
				'random',
				'seedrandom',
				'xor128',
				'math-random2',
			].forEach(function (name)
			{


				test(`${name}.${method}() in [ ${current_methods[method].join(', ')} ]`, (t) =>
				{
					let max = current_methods[method][0], min = current_methods[method][1], a;

					let lib = tests[name]

					for (let i = 0; i < 10000; ++i)
					{
						const v = lib[method]()

						max = Math.max(v, max)
						min = Math.min(v, min)

						if (v !== 1 && v !== max && v !== min)
						{
							a = v
						}
					}

					t.true(min >= current_methods[method][0])
					t.true(max <= current_methods[method][1])

					if (current_methods === methods_float)
					{
						t.true(a < current_methods[method][1] && a > current_methods[method][0])

						t.true(min > 0)
						t.true(max >= 0.9)
					}
					else if (current_methods === methods_int)
					{
						t.true(min === current_methods[method][0])
						t.true(max === current_methods[method][1])

						if (current_methods[method][1] > 1)
						{
							t.true(a < current_methods[method][1] && a > current_methods[method][0])

							t.true(a > 1)
						}
					}

//					console.dir({
//						min,
//						max,
//						a,
//					});
				});
			})
		})
	;
})
