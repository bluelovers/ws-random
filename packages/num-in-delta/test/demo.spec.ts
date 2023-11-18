import numberInDelta from '../src';
import { subAbs } from '../src/util';

describe(`number in delta`, () =>
{

	([
		[4.95, 5],
		[4.96, 5],
		[6, 5, 1],
		[6.1, 5, 1.1],
		[6.01, 5, 1.01],
		[6.001, 5, 1.001],
		[6.0001, 5, 1.0001],
		[6.00001, 5, 1.00001],
		[6.000001, 5, 1.000001],
	] as [number, number, number?][])
		.forEach(([actual, expected, delta]) =>
		{

			test(`${actual} is ${expected} \u00B1 ${delta}`, () =>
			{

				let bool = numberInDelta(actual, expected, delta);

				console.log(actual, expected, delta)
				console.log(subAbs(actual, expected), typeof subAbs(actual, expected))

				expect(bool).toBeTruthy();

			});

		})
	;

})

describe(`number not in delta`, () =>
{

	([
		[4.94, 5],
		[4.945, 5],
		[6, 5],
		[6, 5, 0.5],
		[6.2, 5, 1.1],
		[6.02, 5, 1.01],
		[6.002, 5, 1.001],
		[6.0002, 5, 1.0001],
		[6.00002, 5, 1.00001],
		[6.000002, 5, 1.000001],
	] as [number, number, number?][])
		.forEach(([actual, expected, delta]) =>
		{

			test(`${actual} not is ${expected} \u00B1 ${delta}`, () =>
			{

				let bool = numberInDelta(actual, expected, delta);

				expect(bool).toBeFalsy()

			});

		})
	;

})
