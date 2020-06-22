/**
 * Created by user on 2018/10/20/020.
 */

import hashSum = require('hash-sum');
//import shortid = require('shortid');
import { randomSeedStr } from '../util';
import nanoid from './nanoid';

//import { hashSum } from './hash-sum';
//import { shortid } from './shortid';

//declare function shortid(): string
//declare function hashSum(input): string

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

export default hashAny;
// @ts-ignore
Object.freeze(exports)
