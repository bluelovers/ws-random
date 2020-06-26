import RNGFunction from '../src/generators/function';
import RNGMathRandom2 from '../src/generators/math-random2';

describe(`RNGMathRandom2`, () =>
{

	describe(`throw error`, () => {

		test(`{}`, () =>
		{

			expect(() => {

				new RNGMathRandom2().clone({} as any);

			}).toThrowErrorMatchingSnapshot()

		});

	});

})

describe(`RNGFunction`, () =>
{

	describe(`throw error`, () => {

		test(`{}`, () =>
		{

			expect(() => {

				new RNGFunction({} as any);

			}).toThrowErrorMatchingSnapshot()

		});

	});

})
