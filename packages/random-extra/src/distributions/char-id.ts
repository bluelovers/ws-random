/**
 * Created by user on 2018/11/9/009.
 */

import UString from "uni-string";
import { Random } from '../random';
import { ENUM_ALPHABET } from '@lazy-random/shared-lib';
import { randIndex as _randIndex } from '../util/distributions';
import { expect } from '@lazy-random/expect';
import { floatToString } from '@lazy-num/float-to-string';

export default (random: Random, char?: ENUM_ALPHABET | string | Buffer | number, size?: number) =>
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

	let ls = UString.create(char).split('');
	let len = ls.length;

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

;
