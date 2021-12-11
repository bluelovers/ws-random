import { Random } from '../random';
import { expect } from '@lazy-random/expect';
import uniformInt from './uniform-int';
import { stringifyByte } from '@lazy-random/shared-lib';

export default function uniformByte(random: Random, toStr: true): () => string
export default function uniformByte(random: Random, toStr?: false): () => number
export default function uniformByte(random: Random, toStr?: boolean): (() => string) | (() => number)
export default function uniformByte(random: Random, toStr?: boolean)
{
	let fn = uniformInt(random, 0, 255);

	if (typeof toStr !== 'undefined')
	{
		expect(toStr).is.boolean();
	}

	if (toStr)
	{
		return () => stringifyByte(fn())
	}

	return fn
}


