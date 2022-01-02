/**
 * @see https://github.com/michaeldzjap/rand-seed/blob/939181cf160e929cac8397f702cced6acb0e95d5/src/Algorithms/Base.ts#L13
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 */
export function df_xfnv1a(str: string)
{
	let h = 2166136261 >>> 0;

	for (let i = 0; i < str.length; i++)
	{
		h = Math.imul(h ^ str.charCodeAt(i), 16777619);
	}

	return (): number =>
	{
		h += h << 13;
		h ^= h >>> 7;
		h += h << 3;
		h ^= h >>> 17;

		return (h += h << 5) >>> 0;
	};
}

export function df_xfnv1a_2(str: string)
{
	let h = 0xdeadbeef | 0;
	for (let i = 0; i < str.length; i++)
	{
		h = Math.imul(h + str.charCodeAt(i), 2654435761);
		h ^= h >>> 24;
		h = Math.imul(h << 11 | h >>> 21, 2246822519);
	}
	return (): number =>
	{
		h += h << 13;
		h ^= h >>> 7;
		h += h << 3;
		h ^= h >>> 17;
		h = h ^ h >>> 15;
		h = Math.imul(h, 2246822507);
		h = h ^ h >>> 13;
		h = Math.imul(h, 3266489917);
		return ((h = Math.imul(h ^ h >>> 16, 1597334677)) >>> 0);
	}
}
