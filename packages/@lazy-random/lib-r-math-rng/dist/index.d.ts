import { Random } from 'random-extra/src/random';
import { RNG, IRNGLike } from '@lazy-random/rng-abstract';
import { IRNG } from 'lib-r-math.js';
/**
 * 將 random-extra 的亂數產生器 (Random) 包裝成 lib-r-math.js 的 IRNG
 * Wraps a random-extra `Random` generator as an `IRNG` of lib-r-math.js
 *
 * 讓 lib-r-math.js 的函式可以改用 random-extra 作為亂數 (Random Number) 來源
 * Allows lib-r-math.js functions to consume random-extra as their random number source
 */
export declare class LibRMathRngWithRandom extends IRNG {
    protected __random: Random;
    protected __seed: any;
    /**
     * 建立實例並立刻套用底層亂數產生器與種子 (Seed)
     * Create an instance and immediately apply the underlying RNG and seed
     *
     * @param _seed - 亂數種子 (Seed)，會一併交給 `use()` 重設
     * @param rng - 底層亂數來源，可為 `Random`、`RNG`、`IRNGLike` 實例或名稱字串
     */
    constructor(_seed?: number, rng?: Random | RNG | any | IRNGLike);
    /**
     * 供 lib-r-math.js 顯示用的名稱，格式為 `Random<底層產生器名稱>`
     * Display name for lib-r-math.js, formatted as `Random<underlying generator name>`
     */
    protected get _name(): string;
    /**
     * 取得目前的亂數種子 (Seed)
     * Get the current random seed
     */
    get seed(): any;
    /**
     * 重設亂數種子 (Seed)，同步呼叫底層 `Random` 的種子設定函式
     * Reset the random seed, which also invokes the underlying `Random` seed function
     *
     * @param _seed - 新的亂數種子 (Seed)
     */
    set seed(_seed: any);
    /**
     * 切換底層亂數產生器 (RNG)，並在有傳入時重設種子 (Seed)
     * Switch the underlying RNG and reset the seed when one is provided
     *
     * @param rng - 底層亂數來源；未傳入時沿用既有的 `__random`，否則退回全域 `random`
     * @param _seed - 亂數種子 (Seed)，僅在非 `undefined` 時重設
     */
    use(rng?: Random | RNG | IRNGLike | any, _seed?: any): void;
    /**
     * lib-r-math.js 的 IRNG 要求的初始化鉤子 (Hook)，此包裝無需額外初始化
     * Initialization hook required by lib-r-math.js's `IRNG`; no extra setup is needed here
     */
    _setup(): void;
    /**
     * 取得下一個亂數 (Random Number)，委派給底層 `Random.next()`
     * Get the next random number, delegating to the underlying `Random.next()`
     *
     * @returns 底層 `Random` 產生的亂數 / the random number produced by the underlying `Random`
     */
    internal_unif_rand(): number;
}
/**
 * 型別守衛 (Type Guard)：判斷是否為 lib-r-math.js 的 RNGLike
 * Type guard: checks whether a value is a lib-r-math.js RNGLike
 *
 * 以鴨子型別 (Duck Typing) 檢查 `unif_rand` 或 `internal_unif_rand` 是否存在
 * Uses duck typing to check for `unif_rand` or `internal_unif_rand`
 *
 * @param rng - 待檢查的值 / the value to check
 * @returns 是否為 RNGLike / whether the value is RNGLike
 */
export declare function _isLibRMathRNGLike<R extends IRNG>(rng: R | unknown): rng is R;
/**
 * 型別守衛 (Type Guard)：判斷是否為 lib-r-math.js `IRNG` 的子類別 (Subclass)
 * Type guard: checks whether a value is a subclass of lib-r-math.js's `IRNG`
 *
 * 與 `_isLibRMathRNGLike` 的差別在於此處檢查的是類別繼承關係而非實例特徵
 * Unlike `_isLibRMathRNGLike`, this checks class inheritance rather than instance shape
 *
 * @param rng - 待檢查的值 / the value to check
 * @returns 是否為 `IRNG` 子類別 / whether the value is an `IRNG` subclass
 */
export declare function _isExtendsOfLibRMathRNGLike<R extends IRNG>(rng: R | unknown): rng is R;
/**
 * 將 lib-r-math.js 的亂數產生器 (RNG) 包裝成 `@lazy-random` 的 `RNG`
 * Wraps a lib-r-math.js RNG as a `@lazy-random` `RNG`
 *
 * 讓 `@lazy-random`／`random-extra` 的函式可以改用 lib-r-math.js 作為亂數 (Random Number) 來源
 * Allows `@lazy-random`/`random-extra` functions to consume lib-r-math.js as their random number source
 *
 * @template R - 底層的 lib-r-math.js `IRNG` 型別 / the underlying lib-r-math.js `IRNG` type
 */
export declare class RandomRngWithLibRMath<R extends IRNG> extends RNG {
    protected _rng: R;
    protected _seedable: boolean;
    protected _fn: () => number;
    /**
     * 建立包裝器，實際的亂數產生器 (RNG) 解析交給 `_init()` 處理
     * Create the wrapper; actual RNG resolution is delegated to `_init()`
     *
     * @param seed - 種子 (Seed) 或 `IRNG` 實例／子類別／RNGLike 實例
     * @param opts - 第二個候選的亂數產生器 (RNG) 或名稱
     */
    constructor(seed?: any, opts?: any, ...argv: any[]);
    /**
     * 依優先順序解析底層 `IRNG`，並綁定取亂數 (Random Number) 的函式
     * Resolve the underlying `IRNG` by priority and bind the random number function
     *
     * @param seed - 種子 (Seed) 或第一個候選的亂數來源
     * @param opts - 第二個候選的亂數來源或名稱
     */
    protected _init(seed?: any, opts?: any, ...argv: any[]): void;
    /**
     * 亂數產生器 (RNG) 的名稱，格式為 `libRMath<底層產生器名稱>`
     * Name of the RNG, formatted as `libRMath<underlying generator name>`
     */
    get name(): string;
    /**
     * 回傳底層 `IRNG` 的種子 (Seed)
     * Return the seed of the underlying `IRNG`
     */
    get options(): number[];
    /**
     * 取得下一個亂數 (Random Number)
     * Get the next random number
     *
     * @returns 底層 `IRNG` 產生的亂數 / the random number produced by the underlying `IRNG`
     */
    next(): number;
    /**
     * 將種子 (Seed) 寫入底層 `IRNG`
     * Write the seed into the underlying `IRNG`
     *
     * 種子 (Seed) 會先經 `_seedNum()` 整理後，以單元素陣列寫入底層 `IRNG.seed`
     * The seed is normalized via `_seedNum()` and written into the underlying `IRNG.seed` as a single-element array
     *
     * @param seed - 新的亂數種子 (Seed)，亦可為種子陣列
     */
    seed(seed?: any | number[], opts?: any, ...argv: any[]): void;
}
export default RandomRngWithLibRMath;
