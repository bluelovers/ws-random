import { doubleToIEEE } from '../src/index';

describe(`float`, () =>
{

	([
		doubleToIEEE,
	]).forEach(fn =>
	{

		test(fn.name, () =>
		{

			let actual: number[] = fn(0.732821894576773);

			expect(actual).toMatchSnapshot();

		});

	})

})
