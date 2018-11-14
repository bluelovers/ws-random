/**
 * Created by user on 2018/11/14/014.
 */

import random from '../../'
import { sum_1_to_n } from '../../src/util/math';

const noUnique = false;

testSum(random.dfSumInt, `sum-int`);

testSum(random.dfSumFloat, `sum-float`);

function testSum(dfFn, name: string)
{
	for (let size = 4; size <= 6; size++)
	{
		let sum_abs = sum_1_to_n(size);
		let min_base = 0;

		let max = min_base + sum_abs;
		let min = min_base;
		let sum = sum_abs;

		let expectd = {
			size,
			min,
			max,
			sum,
		};

		//console.log(name, 'expectd:', expectd);
		//console.log('-'.repeat(10));

		//let fn = dfFn(size, min, max, noUnique);

		for (let i = 7; i < 9; i++)
		{
			let expectd2 = {
				size,
				min,
				max,
				sum,
			};

			expectd2.min -= i;
			expectd2.max -= i;
			expectd2.sum -= i;

			console.log('\n');

			console.log(name, 'expectd:', expectd2);
			console.log('-'.repeat(10));

			let fn = dfFn(size, expectd2.min, expectd2.max, noUnique);

			let ret = fn();

			let actual = {
				size: ret.length,
				min: null,
				max: null,
				sum: null,
				list: ret.sort((a, b) => a - b),
			};

			let ret_sum = ret
				.reduce((a, b) =>
				{

					if (actual.min === null)
					{
						actual.min = Math.min(a, b)
					}
					else
					{
						actual.min = Math.min(actual.min, b)
					}

					if (actual.max === null)
					{
						actual.max = Math.max(a, b)
					}
					else
					{
						actual.max = Math.max(actual.max, b)
					}

					return a + b
				})
			;

			actual.sum = ret_sum;

			console.log('actual:', actual);
		}

		console.log('\n' + '-'.repeat(3) + '\n');
	}
}






