import { MATH_POW_2_32 } from '../../const';

export function df_mulberry32(n: number)
{
	n |= 0;
	return () =>
	{
		n += 0x6D2B79F5;
		let t = Math.imul(n ^ n >>> 15, 1 | n);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / MATH_POW_2_32;
	};
}
