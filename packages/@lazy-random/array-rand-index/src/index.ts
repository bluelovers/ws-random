import { _MathRandom } from '@lazy-random/original-math-random';

/**
 * 回傳 0 至 len - 1 之間的隨機整數 (Random Integer)
 * Return a random integer between 0 and len - 1
 *
 * 以未被覆寫的原始 Math.random()（經 _MathRandom 取得）乘上長度後向下取樣，
 * 保證取樣範圍固定為左閉右開區間 [0, len)。
 * Multiplies the pristine Math.random() (obtained via _MathRandom) by the length and
 * floors the result, keeping the range the half-open interval [0, len).
 *
 * @param len 取樣範圍的長度（上界，不含）/ the length of the range (exclusive upper bound)
 * @param ...argv 相容回呼 (Callback) 簽章的多餘參數，目前未被使用 /
 * extra arguments accepted to match a callback signature; currently unused
 * @returns 0 至 len - 1 的隨機整數 / a random integer from 0 to len - 1
 */
export function arrayRandIndexByLength(len: number, ...argv: any[])
{
	return Math.floor(_MathRandom() * len)
}

/**
 * 對給定陣列取樣，回傳 0 至 array.length - 1 的隨機索引 (Random Index)
 * Take a sample from the given array, returning a random index from 0 to array.length - 1
 *
 * 僅讀取陣列的長度，不複製也不修改陣列本身。
 * Only reads the array length; the array itself is neither copied nor modified.
 *
 * @param array 要取樣的陣列 / the array to sample from
 * @param ...argv 相容回呼 (Callback) 簽章的多餘參數，目前未被使用 /
 * extra arguments accepted to match a callback signature; currently unused
 * @returns 隨機索引 / a random index
 */
export function arrayRandIndex(array: any[], ...argv: any[])
{
	return arrayRandIndexByLength(array.length)
}

export default arrayRandIndex
