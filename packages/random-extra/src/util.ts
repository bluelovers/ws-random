

/**
 * for non-strict check, try get a little
 */
export function array_unique_unsafe<T extends any>(arr: T[])
{
	return arr.filter((v, i, arr) => arr.indexOf(v) === i)
}


