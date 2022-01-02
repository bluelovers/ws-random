import { MATH_POW_2_32 } from '../../const';

/**
 * Yet another chaotic PRNG, the sfc stands for "Small Fast Counter". It is part of the PracRand PRNG test suite. It passes PractRand, as well as Crush/BigCrush (TestU01). Also one of the fastest.
 */
export function df_sfc32(a: number, b: number, c: number, d: number)
{
	return function ()
	{
		a |= 0;
		b |= 0;
		c |= 0;
		d |= 0;
		const t = (a + b | 0) + d | 0;
		d = d + 1 | 0;
		a = b ^ b >>> 9;
		b = c + (c << 3) | 0;
		c = c << 21 | c >>> 11;
		c = c + t | 0;
		return (t >>> 0) / MATH_POW_2_32;
	};
}
