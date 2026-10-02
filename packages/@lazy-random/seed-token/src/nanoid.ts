// @ts-ignore
import { nanoid as _nanoid } from 'nanoid/non-secure';

/**
 * 產生非安全亂數 (Non-secure Random) 的隨機 ID。
 * Generate a random ID from non-secure randomness.
 *
 * 刻意採用 `nanoid/non-secure`：種子只需可重現與足夠分散，無需密碼學強度 (Cryptographic Strength)，
 * 可避開安全來源 (Secure Source) 的額外開銷。
 *
 * @param input 預留參數，未使用 / Reserved parameter, unused
 * @param argv 預留參數，未使用 / Reserved parameter, unused
 * @returns 隨機 ID 字串 / A random ID string
 */
export function nanoid(input?, ...argv): string
{
	// @ts-ignore
	return _nanoid()
}
