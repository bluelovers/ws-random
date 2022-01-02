export function df_xmur3(str: string)
{
	let h = 1779033703 ^ str.length;
	for (let i = 0; i < str.length; i++)
	{
		h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
		h = h << 13 | h >>> 19;
	}
	return () =>
	{
		h = Math.imul(h ^ h >>> 16, 2246822507);
			h = Math.imul(h ^ h >>> 13, 3266489909);
		return (h ^= h >>> 16) >>> 0;
	}
}

export function df_xmur3a(str: string)
{
	let h = 2166136261 >>> 0;
	for (let k, i = 0; i < str.length; i++)
	{
		k = Math.imul(str.charCodeAt(i), 3432918353);
		k = k << 15 | k >>> 17;
		h ^= Math.imul(k, 461845907);
		h = h << 13 | h >>> 19;
		h = Math.imul(h, 5) + 3864292196 | 0;
	}
	h ^= str.length;
	return () =>
	{
		h ^= h >>> 16;
		h = Math.imul(h, 2246822507);
		h ^= h >>> 13;
		h = Math.imul(h, 3266489909);
		h ^= h >>> 16;
		return h >>> 0;
	}
}
