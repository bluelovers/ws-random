import { simpleWrap } from '@lazy-random/simple-wrap';
import { _MathRandom } from '@lazy-random/original-math-random';
import { RNGFactory as newRngFactory } from '@lazy-random/rng-factory';
import seedrandom from 'seedrandom';

/**
 * 以內建 `Math.random` 為亂數 (Random Number) 來源，建立包裝後的亂數發生器 (RNG)
 * Create a wrapped random number generator backed by the built-in `Math.random`
 *
 * 不設定種子 (Seed)，沿用原始亂數來源的非決定性 (Non-deterministic) 行為；
 * No seed is configured, so the non-deterministic behavior of the underlying random source is kept as-is
 *
 * @returns 經 `simpleWrap` 包裝、具備 `next` / `float` / `int` / `boolean` / `bytes` 等方法的 RNG 物件
 * An RNG object wrapped by `simpleWrap` with `next` / `float` / `int` / `boolean` / `bytes` and more
 */
export function newRngMathRandom()
{
	/**
	 * 直接以原始亂數來源包裝後回傳，不額外植入種子，讓每次呼叫的結果皆不同；
	 * The raw random source is wrapped and returned without seeding, so results differ on every call
	 */
	return simpleWrap(_MathRandom)
}

/**
 * 以固定種子 (Seed) 建立可重現 (Reproducible) 的亂數發生器 (RNG)
 * Create a reproducible random number generator from a fixed seed
 *
 * 先以固定種子呼叫 `seedrandom` 產生擬亂數 (Pseudorandom, PRNG)，再交由 `RNGFactory` 包裝；
 * 因種子固定，每次呼叫皆得到相同序列，便於測試斷言 (Assertion) 與重現問題；
 * `seedrandom` is first invoked with a fixed seed, then wrapped by `RNGFactory`;
 * the fixed seed yields an identical sequence every time, which eases test assertions and issue reproduction
 *
 * @returns `RNGFactory` 包裝後的 `seedrandom` RNG 物件
 * A `seedrandom` RNG object wrapped by `RNGFactory`
 */
export function newRngSeedRandom()
{
	/**
	 * 種子字串固定寫死於此（刻意如此，而非執行期參數），以確保測試結果每次都一致；
	 * The seed string is hard-coded here (intentionally, not a runtime argument) so that test results stay consistent
	 */
	return newRngFactory(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
}

/**
 * 轉出 (Re-export) `@lazy-random/rng-factory` 的 `RNGFactory`，供建立自訂亂數來源的發生器
 * Re-exports `RNGFactory` from `@lazy-random/rng-factory` for building RNGs from custom random sources
 *
 * @param prng - 擬亂數 (Pseudorandom, PRNG) 函數，例如 `seedrandom(seed)` 的回傳值
 * A pseudorandom (PRNG) function, such as the return value of `seedrandom(seed)`
 * @returns 包裝後的亂數發生器 (RNG)
 * The wrapped random number generator (RNG)
 */
export { newRngFactory }
