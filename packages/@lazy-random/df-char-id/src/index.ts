/**
 * Created by user on 2018/11/9/009.
 */

import UString from "uni-string";
import { ENUM_ALPHABET } from '@lazy-random/shared-lib';
import { expect } from '@lazy-random/expect';
import { floatToString } from '@lazy-num/float-to-string';
import { randIndex as _randIndex } from '@lazy-random/util-distributions';
import { IRNGLike } from '@lazy-random/rng-abstract';

export function dfCharID(random: IRNGLike, char?: ENUM_ALPHABET | string | Buffer | number, size?: number)
{
	if (typeof char === 'number')
	{
		if (typeof size === 'number')
		{
			char = floatToString(char)
		}
		else
		{
			[size, char] = [char, null];
		}
	}

	size = size || 8;
	//ow(size, ow.number.integer.gt(0));
	expect(size).integer.gt(0)

	if (!char)
	{
		char = ENUM_ALPHABET.DEFAULT
	}

	const ls = UString.create(char).split('');
	const len = ls.length;

	expect(ls).to.have.lengthOf.gt(1);

	const randIndex = () =>
	{
		return _randIndex(random, len)
	};

	return () =>
	{
		let i = size;
		let list: string[] = [];
		while (i--)
		{
			list.push(ls[randIndex()])
		}
		return list.join('');
	}
}

export default dfCharID
