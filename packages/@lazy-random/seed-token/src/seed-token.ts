import { isIntFinite } from 'chai-asserttype-extra/lib/check';

export function seedToken(seed?: number | any, opts?: any, ...argv: any[]): number
{
	// TODO: add entropy and stuff

	if (isIntFinite(seed))
	{
		return seed
	}
	else
	{
		let strSeed = '' + seed
		let s = 0
		let len = strSeed.length

		for (let k = 0; k < len; ++k)
		{
			s ^= strSeed.charCodeAt(k) | 0
		}

		return s
	}
}