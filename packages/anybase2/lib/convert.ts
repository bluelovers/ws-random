import { chars, map } from './data';

/**
 * 將任意進位制的數字字串轉為十進位數值
 * Convert a numeric string in any base to a Base 10 number
 *
 * 以位置記數法 (positional notation) 由左至右累加：
 * `n10 = n10 * base + digit`
 *
 * @param original_number - 原始數字字串 (original numeric string)
 * @param base - 原始進位制 (original numeric base)
 * @returns 十進位數值 (value in Base 10)
 */
export function baseToDec(original_number: string, base: number)
{
	let len: number, m: number, n10: number;
	n10 = 0;
	/**
	 * 逐字元查表取得數值並累加 (Accumulate digit values one character at a time)
	 *
	 * 乘以 base 再加上目前位元的值，等同於將既有結果左移一位；
	 * 空字串時迴圈不會執行，回傳 0
	 */
	for (m = 0, len = original_number.length; m < len; m++)
	{
		let char = original_number[m];
		(n10 = n10 * base + map[char]);
	}
	return n10;
}

/**
 * 將十進位數值轉為指定進位制的數字字串
 * Convert a Base 10 number to a string in the given base
 *
 * 反覆除以目標進位制 (target base) 取餘數，
 * 餘數由後往前組合成結果字串
 *
 * @param n - 十進位數值 (value in Base 10)
 * @param base - 目標進位制 (target numeric base)
 * @returns 目標進位制的數字字串 (numeric string in the target base)
 */
export function decToBase(n: number, base: number)
{
	let nx = '';
	/**
	 * 除取餘法 (Division-remainder algorithm)
	 *
	 * 每次取 `n % base` 作為最低位字元，再以 `(n - mod) / base` 遞減；
	 * 因為字元需由低位組到高位，故前置串接 (prepend) 而非附加。
	 *
	 * 邊界情況：`n` 為 0 時迴圈不執行，回傳空字串，
	 * 由呼叫端的補零邏輯處理
	 */
	while (n > 0)
	{
		let mod = n % base;
		n = (n - mod) / base;
		nx = chars[mod] + nx;
	}
	return nx;
}
