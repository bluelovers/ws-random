/**
 * Created by user on 2018/11/9/009.
 */

import UString = require("uni-string");
import ow from '../util/ow'
import { Random } from '../random';
import RNG from '../rng'
import { randIndex as _randIndex } from '../util/distributions';
import { $enum } from "ts-enum-util";

export enum ENUM_ALPHABET
{
	NANOID_URL = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz',
	SHORTID = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-',
	SHORTID2 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
	UNI_CHAR1 = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫',

	DEFAULT = 'ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
}

export default (random: Random, char?: ENUM_ALPHABET | string | Buffer, size: number = 8) =>
{
	ow(size, ow.number.integer.gt(0));

	if (!char)
	{
		char = ENUM_ALPHABET.DEFAULT
	}

	let ls = UString.create(char).split('');
	let len = ls.length;

	const randIndex = () =>
	{
		return _randIndex(random, len)
	};

	return () =>
	{
		let list = []
		for (let i = 0; i < size; i++)
		{
			list.push(ls[randIndex()])
		}
		return list.join('');
	}
}

// @ts-ignore
Object.freeze(exports)
