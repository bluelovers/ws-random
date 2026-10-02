'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var simpleWrap = require('@lazy-random/simple-wrap');
var originalMathRandom = require('@lazy-random/original-math-random');
var rngFactory = require('@lazy-random/rng-factory');
var seedrandom = require('seedrandom');

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
function newRngMathRandom() {
  return simpleWrap.simpleWrap(originalMathRandom._MathRandom);
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
function newRngSeedRandom() {
  return rngFactory.RNGFactory(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'));
}

Object.defineProperty(exports, 'newRngFactory', {
	enumerable: true,
	get: function () { return rngFactory.RNGFactory; }
});
exports.newRngMathRandom = newRngMathRandom;
exports.newRngSeedRandom = newRngSeedRandom;
//# sourceMappingURL=index.cjs.development.cjs.map
