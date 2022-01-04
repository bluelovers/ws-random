import { df_xfnv1a } from '../algorithm/string/xfnv1a';
import { doubleToIEEE } from '../algorithm/float/int_x_2';
import { _MathRandom } from '@lazy-random/original-math-random';
import { ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';

export type ISeedInputFromStringOrNumberOrArray = ITSValueOrArrayMaybeReadonly<string | number>;

export function seedFromStringOrNumberOrArray<L extends number>(seedInput: ISeedInputFromStringOrNumberOrArray,
	size: L,
): number[] & {
	length: L
}
{
	let exists_zero = false;
	let s: [number, number];

	const seed = [seedInput ?? []].flat().slice(0, 4);

	for (let i = 0; i < size; i++)
	{
		const type = typeof seed[i];

		if (type === 'string')
		{
			seed[i] = df_xfnv1a(`${seed[i]}#sfc32#${i}`)();
		}
		else if (type !== 'number')
		{
			exists_zero = true;
			seed[i] = void 0;
		}
		else
		{
			seed[i] = Math.abs(seed[i] as number);
		}

		if (!seed[i])
		{
			if (seed[i] === 0 && !exists_zero)
			{
				exists_zero = true;
			}
			else
			{
				s ??= doubleToIEEE(_MathRandom());
				// @ts-ignore
				seed[i] = s.pop();
				if (!s.length)
				{
					s = void 0;
				}
			}
		}
	}

	return seed as any;
}
