/**
 * Created by user on 2018/10/20/020.
 */
import { isInt } from 'chai-asserttype-extra/lib/check';

export function seedToken(seed?: number | any, opts?, ...argv): number
{
	// TODO: add entropy and stuff

	if (isInt(seed))
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

export default seedToken

