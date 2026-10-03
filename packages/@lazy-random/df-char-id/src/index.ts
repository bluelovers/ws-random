/**
 * Created by user on 2018/11/9/009.
 */

import UString from "uni-string";
import { ENUM_ALPHABET } from '@lazy-random/shared-lib';
import { expect } from '@lazy-random/expect';
import { floatToString } from '@lazy-num/float-to-string';
import { randIndexByLength as _randIndex } from '@lazy-random/util-distributions';
import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 以自訂字元表 (Alphabet) 產生隨機字串 ID
 * Generate a random string ID from a custom alphabet.
 *
 * 建立期會先處理參數多載 (Overload)、驗證 size 與字元表，
 * 取樣期只需不斷抽字元並串接，兼顧安全與效能。
 * The build phase resolves the parameter overloads and validates `size` and
 * the alphabet, so the sampling phase only draws characters and joins them.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param char 字元表：ENUM_ALPHABET、字串、Buffer 或數字；預設 ENUM_ALPHABET.DEFAULT
 * @param size 產生的字元數，需為正整數 (Positive Integer)，預設 8
 * @returns 取樣函式 (Sampler)，每次呼叫回傳長度為 size 的字串
 * @throws 參數不合規時於建立期拋出驗證錯誤 (Validation Error)
 */
export function dfCharID(random: IRNGLike, char?: ENUM_ALPHABET | string | Buffer | number, size?: number)
{
	/*
	 * char 為數字時的雙重多載 (Overload)：
	 * 同時給 size 表示「數字是字元表」，轉成字串後再使用；
	 * 沒給 size 則表示「數字是 size」，交換兩者、字元表稍後改用預設值。
	 * Dual overload for a numeric `char`: with `size` given the number is an
	 * alphabet and is stringified; without `size` the number is the size, so
	 * the two are swapped and the alphabet falls back to the default later.
	 */
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

	/*
	 * 0 或缺省一律視為預設長度 8，再驗證為正整數
	 * Treat 0 or a missing value as the default length of 8, then require a positive integer.
	 */
	size = size || 8;
	//ow(size, ow.number.integer.gt(0));
	expect(size).integer.gt(0)

	/*
	 * falsy 的 char（undefined/null/空字串）都改用預設字元表
	 * Any falsy `char` (undefined/null/empty string) falls back to the default alphabet.
	 */
	if (!char)
	{
		char = ENUM_ALPHABET.DEFAULT
	}

	/*
	 * 用 uni-string 切分：依字元 (Code Point) 拆分，
	 * 讓代理對 (Surrogate Pair) 等非 BMP 字元不會被切成兩半。
	 * Split with uni-string so surrogate pairs and other non-BMP characters
	 * are divided by code point instead of being torn in half.
	 */
	const ls = UString.create(char).split('');
	const len = ls.length;

	/*
	 * 少於 2 個字元的字元表只能產生固定字串、毫無隨機性，
	 * 直接拒絕；單一字元也會讓 randIndexByLength 永遠抽中同一格。
	 * An alphabet with fewer than 2 characters would emit a constant string
	 * with no randomness at all, and a single entry would make randIndexByLength
	 * always land on the same slot, so reject it eagerly.
	 */
	expect(ls).lengthOf.gt(1);

	/*
	 * 包一層閉包，讓取樣期只需關心索引、不用重複帶入 len
	 * Wrap in a closure so sampling only needs an index, without re-passing `len`.
	 */
	const randIndexByLength = () =>
	{
		return _randIndex(random, len)
	};

	return () =>
	{
		let i = size;
		let list: string[] = [];

		/*
		 * while (i--) 恰好執行 size 次，由尾端遞減到 0；
		 * 每輪抽一個索引並取出對應字元。
		 * `while (i--)` runs exactly `size` times, counting down to 0; each
		 * round draws one index and pushes the matching character.
		 */
		while (i--)
		{
			list.push(ls[randIndexByLength()])
		}

		/*
		 * 陣列串接成字串，比逐字相加更有效率
		 * Join the array once instead of concatenating string after string.
		 */
		return list.join('');
	}
}

export default dfCharID
