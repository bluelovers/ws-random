import hashSum from 'hash-sum';
import { nanoid as _nanoid } from 'nanoid/non-secure';
import _pkg from './random-seed-str.data';
import { floatToString } from '@lazy-num/float-to-string';
import { _MathRandom } from './_random';

/**
 * give a random string for create seed
 */
export function randomSeedStr(): string
{
	return [
		_nanoid(),
		hashSum(_pkg.name),
		hashSum(_pkg.version),
		Date.now(),
		floatToString(_MathRandom()),
	].join('_')
}
