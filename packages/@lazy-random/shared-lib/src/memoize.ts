
/**
 * 將參數陣列 (Arguments Array) 轉為字串，作為快取 (Cache) 的鍵 (Key)。
 * Turn an arguments array into a string used as a cache key.
 *
 * 以 `;` 分隔各參數；`Array.prototype.join` 會把 `null`/`undefined` 視為空字串，
 * 相同外觀的參數可能產生相同鍵，屬已知限制。
 * Joins arguments with `;`; `Array.prototype.join` treats `null`/`undefined` as empty
 * strings, so visually different arguments may collide into the same key (known limitation).
 *
 * @param args 參數陣列 / The arguments array
 * @returns 字串鍵 / The string key
 */
export function hashArgv(args: any[]): string
{
	return String(args.join(';'));
}
