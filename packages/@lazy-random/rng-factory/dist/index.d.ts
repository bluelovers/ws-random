import { RNGSeedRandom } from '@lazy-random/generators-seedrandom';
import { RNG } from '@lazy-random/rng-abstract';
import { RNGXOR128 } from '@lazy-random/generators-xor128';
import { RNGFunction, IRNGFunctionSeed } from '@lazy-random/generators-function';
import { RNGMathRandom } from '@lazy-random/generators-math-random';
/**
 * `RNGFactory()` 可接受的第一個參數型別：內建字串鍵、既有的 RNG 實例，或種子函式 (Seed Function)。
 * The first argument accepted by `RNGFactory()`: a built-in key, an existing RNG instance, or a seed function.
 *
 * TODO: 尾端的 `| any` 會讓整個聯合型別 (Union Type) 退化成 `any` 而失去型別檢查意義；
 * 且 `PRNG_BUILTINS` 已註冊的 `'math-random'`、`'math-random2'`、`'crypto'` 也未列於此。
 * The trailing `| any` collapses the union to `any`, and the registered `'math-random'`, `'math-random2'`, `'crypto'` keys are missing here.
 */
export type IRNGFactoryType = 'xor128' | 'function' | 'default' | 'seedrandom' | RNG | IRNGFunctionSeed | any;
/**
 * 亂數產生器工廠 (RNG Factory)：依第一個參數決定要建立哪一種 RNG 實例。
 *
 * 可傳入內建字串鍵 (如 `'xor128'`、`'default'`)、函式 (Function)、既有的 RNG 實例，
 * 或用於 `RNGFunction` 的種子函式 (Seed Function)；完全不傳參數時回傳預設實作。
 * Creates an RNG instance based on the first argument: a built-in key, a function, an existing RNG, or a seed function.
 *
 * @param args 第一個參數決定型別，其餘參數轉交給對應的 RNG 建構子 / the first argument selects the type, the rest are forwarded to its constructor
 * @returns 對應的 RNG 實例 / the matching RNG instance
 * @throws {TypeError} 當第一個參數不是合法的 RNG 表示法時 / when the first argument is not a valid RNG representation
 */
/**
 * TODO: 無參數呼叫時實作會走 `'default'` 分派、建立 `RNGMathRandom2`，
 * 但此 overload 宣告回傳 `RNGFunction`，型別與執行期行為可能不一致，待確認。
 * Calling with no arguments instantiates `RNGMathRandom2` via the `'default'` path, but this overload declares `RNGFunction`; verify.
 */
export declare function RNGFactory(): RNGFunction;
export declare function RNGFactory<R extends RNG>(arg0: R, ...rest: any[]): R;
export declare function RNGFactory(arg0: 'xor128', ...rest: any[]): RNGXOR128;
export declare function RNGFactory(arg0: 'function', ...rest: any[]): RNGFunction;
export declare function RNGFactory<S extends IRNGFunctionSeed = IRNGFunctionSeed>(arg0: 'function', ...rest: any[]): RNGFunction<S>;
/**
 * TODO: 實作中 `'default'` 對應的是 `RNGMathRandom2`，但此 overload 宣告回傳 `RNGMathRandom`，
 * 請確認兩者的繼承關係是否符合預期。
 * The implementation maps `'default'` to `RNGMathRandom2`, but this overload declares `RNGMathRandom`; verify the inheritance is intended.
 */
export declare function RNGFactory(arg0: 'default', ...rest: any[]): RNGMathRandom;
export declare function RNGFactory(arg0: 'seedrandom', ...rest: any[]): RNGSeedRandom;
export declare function RNGFactory<S extends IRNGFunctionSeed = IRNGFunctionSeed>(arg0: S, ...rest: any[]): RNGFunction<S>;
export declare function RNGFactory<R extends RNG = RNG>(...argv: any[]): R;
export default RNGFactory;
