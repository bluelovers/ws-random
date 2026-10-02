import { _MathRandom } from '@lazy-random/original-math-random';
import { floatToString } from '@lazy-num/float-to-string';

/**
 * 亂數浮點來源 (Random Float Source)：回傳 `[0, 1)` 浮點數的函式，作為種子的小數部分熵 (Entropy)。
 * A function returning a `[0, 1)` float, used as the fractional entropy of a seed.
 */
type IFnRandomFloat = () => number;

/**
 * TODO: `fnRandomFloat` 在此宣告為必要參數，但函式體以 `??` 提供預設值，
 * 且 `seedFloatByNow()` 會傳入可能為 `undefined` 的值，型別宣告與實際使用不一致，待確認。
 * The parameter is declared required although a `??` default exists and `seedFloatByNow()` may pass `undefined`; verify.
 */
/**
 * 以指定時間 (Date) 產生數值型種子 (Numeric Seed)：毫秒時間戳記為整數基底，加上 `[0, 1)` 的亂數小數部分，
 * 讓種子同時具備「可辨識的時間」與毫秒以下的熵 (Entropy)。
 * Produces a numeric seed from a date: the millisecond timestamp provides the base and a `[0, 1)` float adds sub-millisecond entropy.
 *
 * @param date 時間來源，取其毫秒時間戳記 / the date whose millisecond timestamp is used
 * @param fnRandomFloat 產生 `[0,1)` 浮點的函式 / a function returning a `[0,1)` float
 * @returns 數值型種子 (Numeric Seed) / a numeric seed
 */
export function seedFloatByDate(date: Date, fnRandomFloat: IFnRandomFloat)
{
	/**
	 * 以 `??` 決定亂數來源：未提供 `fnRandomFloat`（含 `null`）時退回 `_MathRandom()`，
	 * 使用未被改寫 (Unpatched) 的原始 `Math.random()`，避免種子受到呼叫端全域猴子補丁 (Monkey Patch) 影響。
	 * Falls back to the original, unpatched `Math.random()` via `_MathRandom()` when no float source is given, so a global monkey patch cannot distort the seed.
	 */
	return date.valueOf() + (fnRandomFloat ?? _MathRandom)();
}

/**
 * 以當下時間產生數值型種子 (Numeric Seed)，等同於 `seedFloatByDate(new Date(), fnRandomFloat)`。
 * Produces a numeric seed from the current time, equivalent to `seedFloatByDate(new Date(), fnRandomFloat)`.
 *
 * @param fnRandomFloat 產生 `[0,1)` 浮點的函式，省略時退回 `_MathRandom()` / a function returning a `[0,1)` float, defaults to `_MathRandom()`
 * @returns 數值型種子 (Numeric Seed) / a numeric seed
 */
export function seedFloatByNow(fnRandomFloat?: IFnRandomFloat)
{
	return seedFloatByDate(new Date(), fnRandomFloat);
}

/**
 * 以指定時間 (Date) 產生字串型種子 (String Seed)：先取數值種子，再完整轉為字串，
 * 保留毫秒以下的小數資訊，避免只取整數毫秒時同毫秒內的呼叫互相碰撞。
 * Produces a string seed from a date, keeping the sub-millisecond fraction so calls within the same millisecond do not collide.
 *
 * @param date 時間來源 / the source date
 * @param fnRandomFloat 產生 `[0,1)` 浮點的函式，省略時退回 `_MathRandom()` / a function returning a `[0,1)` float, defaults to `_MathRandom()`
 * @returns 字串型種子 (String Seed) / a string seed
 */
export function seedStringByDate(date: Date, fnRandomFloat?: IFnRandomFloat)
{
	return floatToString(seedFloatByDate(date, fnRandomFloat));
}

/**
 * 以當下時間產生字串型種子 (String Seed)，等同於 `seedStringByDate(new Date(), fnRandomFloat)`。
 * Produces a string seed from the current time, equivalent to `seedStringByDate(new Date(), fnRandomFloat)`.
 *
 * @param fnRandomFloat 產生 `[0,1)` 浮點的函式，省略時退回 `_MathRandom()` / a function returning a `[0,1)` float, defaults to `_MathRandom()`
 * @returns 字串型種子 (String Seed) / a string seed
 */
export function seedStringByNow(fnRandomFloat?: IFnRandomFloat)
{
	return floatToString(seedFloatByDate(new Date(), fnRandomFloat));
}
