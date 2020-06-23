import { Random } from '../random';
import expect from '../util/ow';
import uniformInt from './uniform-int';
import { stringifyByte } from '../util/byte';

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


