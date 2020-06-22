/**
 * Created by user on 2018/11/16/016.
 */

/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync } from '../_local-dev';

// @ts-ignore
import { ITest } from 'mocha';
//import random from '../..'
import seedrandom = require('seedrandom');
import random from '../..'
import { tests } from '../benchmark';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	const r = random;

	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

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
		describe(current_methods === methods_int ? `int` : `float`, () =>
		{
			Object.keys(current_methods)
				.forEach(function (method)
				{

					describe(method, () =>
					{

						[
							'random',
							'seedrandom',
							'xor128',
							'math-random2',
						].forEach(function (name)
						{

							it(`${name}.${method}() in [ ${current_methods[method].join(', ')} ]`, () =>
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

								expect(min).to.gte(current_methods[method][0])
								expect(max).to.lte(current_methods[method][1])

								if (current_methods === methods_float)
								{
									expect(a).to
										.lt(current_methods[method][1])
										.gt(current_methods[method][0])
									;

									expect(min).to.gt(0).lt(0.001);
									expect(max).to.gte(0.9).lt(1)
								}
								else if (current_methods === methods_int)
								{
									expect(min).to.deep.eq(current_methods[method][0])
									expect(max).to.deep.eq(current_methods[method][1])

									if (current_methods[method][1] > 1)
									{
										expect(a).to
											.lt(current_methods[method][1])
											.gt(current_methods[method][0])
											.gt(1)
										;
									}
								}
							});
						})

					})

				})
			;
		})

	});

});
