import { isFiniteInt } from '@lazy-assert/check-basic';

export function seedToken(seed?: number | any, opts?: any, ...argv: any[]): number
{
	// TODO: add entropy and stuff

	if (isFiniteInt(seed))
	{
		return seed;
	}

	const strSeed = String(seed);
	let s = 0;
	const len = strSeed.length;

	for (let k = 0; k < len; ++k)
	{
		s ^= strSeed.charCodeAt(k) | 0;
	}

	return s;
}
