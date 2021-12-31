import { simpleWrap } from '@lazy-random/simple-wrap';
import { _MathRandom } from '@lazy-random/original-math-random';
import { RNGFactory as newRngFactory } from '@lazy-random/rng-factory';
import seedrandom from 'seedrandom';

export function newRngMathRandom()
{
	return simpleWrap(_MathRandom)
}

export function newRngSeedRandom()
{
	return newRngFactory(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
}

export { newRngFactory }
