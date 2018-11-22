/**
 * Created by user on 2018/11/22/022.
 */

/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />

import { isInt } from '../src/util';
import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

// @ts-ignore
import { ITest } from 'mocha';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`isInt`, () =>
	{
		let tests = {
			true: [
				0,
				1,
				-100000,
				2147483647,
				-2147483647,
				//1e+23,
				//99999999999999999999999,
				//Number.MAX_SAFE_INTEGER,

			],
			false: [
				0.1,
				Math.PI,
				NaN,
				Infinity,
				-Infinity,
				'10',
				true,
				false,
				[1],
			],
		};

		Object.entries(tests)
			.forEach(function ([type, list])
			{
				list.forEach(function (n)
				{
					let actual = isInt(n as any);

					let fn = expect(actual);

					if (type != 'true')
					{
						fn = fn.not;
					}

					it(`${JSON.stringify(n)} => ${type}`, function ()
					{
						fn.ok;
					})
				})

			})
		;
	});
});
