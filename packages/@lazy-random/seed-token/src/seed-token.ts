import { isFiniteInt } from '@lazy-assert/check-basic';

/**
 * 將任意輸入正規化為數值種子 (Numeric Seed)。
 * Normalize any input into a numeric seed.
 *
 * 若 `seed` 已是有限整數 (Finite Integer) 則直接回傳；否則轉成字串後逐字元計算，
 * 使相同輸入永遠得到相同種子，確保亂數 (Random Number) 序列可重現 (Reproducible)。
 *
 * @param seed 待正規化的種子輸入，任意型別 / The seed input to normalize, any type
 * @param opts 預留的選項參數，目前未使用 / Reserved options, currently unused
 * @param argv 預留的額外參數，目前未使用 / Reserved extra arguments, currently unused
 * @returns 數值種子 / The numeric seed
 */
export function seedToken(seed?: number | any, opts?: any, ...argv: any[]): number
{
	// TODO: add entropy and stuff

	/**
	 * 已是有限整數 (Finite Integer) 時直接沿用原值，避免轉換造成精度 (Precision) 流失；
	 * 其餘輸入統一轉為字串，讓「任意型別 → 字串 → 整數」的路徑保持一致。
	 * Reuse finite integers as-is to avoid precision loss, and coerce all other inputs
	 * to strings so the conversion path stays consistent for every type.
	 */
	if (isFiniteInt(seed))
	{
		return seed;
	}

	const strSeed = String(seed);
	let s = 0;
	const len = strSeed.length;

	/**
	 * 以 XOR (Exclusive OR) 逐字元疊加字元碼：運算便宜、對順序敏感，
	 * 且結果必定落在 32 位元整數範圍內，可作為穩定的種子值。
	 * Accumulate char codes with XOR: cheap, order-sensitive, and always stays within
	 * 32-bit integer range, yielding a stable seed value.
	 */
	for (let k = 0; k < len; ++k)
	{
		s ^= strSeed.charCodeAt(k) | 0;
	}

	return s;
}
