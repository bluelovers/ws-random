import { MATH_POW_2_32 } from '../../const';

export function df_splitmix32(n: number)
{
	n |= 0;
	return () =>
	{
		n += 0x9e3779b9;
		let t = n ^ n >>> 15;
		t = Math.imul(t, 0x85ebca6b);
		t = t ^ t >>> 13;
		t = Math.imul(t, 0xc2b2ae35);
		return ((t = t ^ t >>> 16) >>> 0) / MATH_POW_2_32;
	};
}
