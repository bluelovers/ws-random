/**
 * Created by user on 2018/11/22/022.
 */

import { isFiniteInt as isInt } from '@lazy-assert/check-basic';

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

				if (type !== 'true')
				{
					// @ts-ignore
					fn = fn.not;
				}

				it(`${JSON.stringify(n)} => ${type}`, function ()
				{
					fn.toBeTruthy();
				})
			})

		})
	;
});

