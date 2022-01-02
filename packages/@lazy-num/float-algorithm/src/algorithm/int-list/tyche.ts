import { MATH_POW_2_32 } from '../../const';

/**
 * Tyche is based on ChaCha's quarter-round. It's a bit slow but should be good quality. tychei, the inverted version, is 20% faster.
 */
export function df_tychei(a: number, b: number, c: number, d: number)
{
	return () =>
	{
		a |= 0;
		b |= 0;
		c |= 0;
		d |= 0;
		b = (b << 25 | b >>> 7) ^ c;
		c = c - d | 0;
		d = (d << 24 | d >>> 8) ^ a;
		a = a - b | 0;
		b = (b << 20 | b >>> 12) ^ c;
		c = c - d | 0;
		d = (d << 16 | d >>> 16) ^ a;
		a = a - b | 0;
		return (a >>> 0) / MATH_POW_2_32;
	};
}

/**
 * Tyche is based on ChaCha's quarter-round. It's a bit slow but should be good quality. tychei, the inverted version, is 20% faster.
 */
export function df_tyche(a: number, b: number, c: number, d: number)
{
	return () =>
	{
		a |= 0;
		b |= 0;
		c |= 0;
		d |= 0;
		a = a + b | 0;
		d = d ^ a;
		d = d << 16 | d >>> 16;
		c = c + d | 0;
		b = b ^ c;
		b = b << 12 | b >>> 20;
		a = a + b | 0;
		d = d ^ a;
		d = d << 8 | d >>> 24;
		c = c + d | 0;
		b = b ^ c;
		b = b << 7 | b >>> 25;
		return (b >>> 0) / MATH_POW_2_32;
	};
}
