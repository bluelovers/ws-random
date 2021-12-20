import { _MathRandom } from '@lazy-random/original-math-random';
import { simpleWrap } from '@lazy-random/simple-wrap';
import { dfUniformFloat } from '../src/index';

describe(`Infinity`, () =>
{
	let rng = simpleWrap(_MathRandom);

	test(`dfUniformFloat:max=Infinity`, () =>
	{
		expect(() => dfUniformFloat(rng, 0, Infinity)()).toThrowError();
	});

})
