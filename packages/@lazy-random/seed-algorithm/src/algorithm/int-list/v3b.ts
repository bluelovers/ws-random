/**
 * @example
 * var seed = 0; // any unsigned 32-bit integer
 * var next = v3b(seed, 2654435769, 1013904242, 3668340011);
 */
export function df_v3b(a: number, b?: number, c?: number, d?: number)
{
	b ||= 2654435769;
	c ||= 1013904242;
	d ||= 3668340011;

	let out: number, pos = 0, a0 = 0, b0 = b, c0 = c, d0 = d;
	return () =>
	{
		if (pos === 0)
		{
			a += d;
			a = a << 21 | a >>> 11;
			b = (b << 12 | b >>> 20) + c;
			c ^= a;
			d ^= b;
			a += d;
			a = a << 19 | a >>> 13;
			b = (b << 24 | b >>> 8) + c;
			c ^= a;
			d ^= b;
			a += d;
			a = a << 7 | a >>> 25;
			b = (b << 12 | b >>> 20) + c;
			c ^= a;
			d ^= b;
			a += d;
			a = a << 27 | a >>> 5;
			b = (b << 17 | b >>> 15) + c;
			c ^= a;
			d ^= b;

			a += a0;
			b += b0;
			c += c0;
			d += d0;
			a0++;
			pos = 4;
		}
		switch (--pos)
		{
			case 0:
				out = a;
				break;
			case 1:
				out = b;
				break;
			case 2:
				out = c;
				break;
			case 3:
				out = d;
				break;
		}
		return out >>> 0;
	};
}
