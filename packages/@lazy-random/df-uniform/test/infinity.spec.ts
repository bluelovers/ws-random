import { dfUniformFloat } from '../src/index';
import { newRngMathRandom } from '@lazy-random/util-test';

describe(`Infinity`, () =>
{
	let rng = newRngMathRandom();

	test(`dfUniformFloat:max=Infinity`, () =>
	{
		expect(() => dfUniformFloat(rng, 0, Infinity)()).toThrowError();
	});

})
