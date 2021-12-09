import { hashSum } from './hash-sum';
import { randomSeedStr } from './random-seed-str';

export function hashAny(seed?, ...argv): string
{
	if (!seed)
	{
		seed = randomSeedStr()
	}
	else if (typeof seed !== 'string')
	{
		seed = hashSum(seed)
	}

	return String(seed)
}
