/**
 * Created by user on 2021/12/11.
 */
import { RNGCore } from '@lazy-random/rng-abstract-core';
/**
 * 以 JavaScript 內建的 Math.random() 作為亂數來源 (Entropy Source) 的產生器 (Generator)，
 * 繼承 RNGCore 以取得統一的 next()、clone() API；不支援種子 (Seed)。
 *
 * A generator using the built-in Math.random() as its entropy source. It
 * extends RNGCore to share the common next()/clone() API and does not
 * support seeding.
 */
export declare class RNGMathRandom extends RNGCore {
    /**
     * 產生器名稱，供除錯與識別用途。
     *
     * Generator name, used for debugging and identification.
     */
    get name(): string;
    /**
     * 固定回傳 false：Math.random() 不可重播 (Non-replayable)，
     * 因此此產生器永遠不接受以種子重建序列。
     *
     * Always returns false: Math.random() is non-replayable, so this generator
     * never accepts a seed to rebuild the sequence.
     */
    get seedable(): boolean;
    /**
     * 取得下一個 0～1 的亂數 (Random Number)。
     *
     * Gets the next 0~1 random number.
     *
     * @returns 0～1 區間內的亂數 / a random number within 0~1
     */
    next(): number;
    /**
     * 以同一個 RNGMathRandom 類別與目前狀態建立新實例 (Instance)；
     * 因為不可重播，實例間僅共享類別而非亂數序列。
     *
     * Creates a new instance from the same RNGMathRandom class and current
     * state; since it is non-replayable, instances share the class but not a
     * random sequence.
     *
     * @param seed 未使用（Math.random() 不支援種子） / unused, Math.random() takes no seed
     * @param opts 保留的選項參數 / reserved options
     * @param argv 保留的其餘參數，透傳給 cloneClass / extra arguments forwarded to cloneClass
     * @returns 新的 RNGMathRandom 實例 / a new RNGMathRandom instance
     */
    clone(seed?: any, opts?: any, ...argv: any[]): RNGMathRandom;
}
/**
 * 預設匯出 (Default Export)，與具名的 RNGMathRandom 為同一個類別。
 *
 * Default export; the same class as the named RNGMathRandom.
 */
export default RNGMathRandom;
