import hashSum from 'hash-sum';
import { name, version } from '@lazy-random/seed-data';
import { floatToString } from '@lazy-num/float-to-string';
import { nanoid } from './nanoid';
import { _MathRandom } from '@lazy-random/original-math-random';

let _name: string;
let _version: string;

/**
 * give a random string for create seed
 */
export function randomSeedStr(): string
{
	return [
		nanoid(),
		_name ??= hashSum(name),
		_version ??= hashSum(version),
		Date.now(),
		floatToString(_MathRandom()),
	].join('_')
}
