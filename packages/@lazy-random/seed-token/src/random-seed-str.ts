import hashSum from 'hash-sum';
import { name, version } from '@lazy-random/seed-data';
import { floatToString } from '@lazy-num/float-to-string';
import { nanoid } from './nanoid';
import { _MathRandom } from '@lazy-random/original-math-random';

let _name: string;
let _version: string;

/**
 * 給一個用來建立種子 (Seed) 的隨機字串，由 `nanoid`、套件名稱與版本的雜湊 (Hash)、
 * 時間戳記 (Timestamp) 與亂數 (Random Number) 以 `_` 組合，兼顧唯一性與可追溯性。
 * give a random string for create seed
 *
 * @returns 組合式隨機種子字串 / A composed random seed string
 */
export function randomSeedStr(): string
{
	/**
	 * 套件名稱與版本只需雜湊 (Hash) 一次，之後以 ??= 惰性快取 (Lazy Cache) 重複使用，
	 * 避免每次呼叫都重算而浪費運算 / Hash name & version only once and reuse them via
	 * ??= lazy caching, so repeated calls do not redo the work.
	 */
	return [
		nanoid(),
		_name ??= hashSum(name),
		_version ??= hashSum(version),
		Date.now(),
		floatToString(_MathRandom()),
	].join('_')
}
