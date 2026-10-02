import { RNGFunction } from '@lazy-random/generators-function';
import seedrandom from 'seedrandom';
import { PickValueOf } from '@lazy-random/shared-lib';
/**
 * `seedrandom` 選項 (Options)，直接取自 `seedrandom(seed, opts)` 的第二個參數型別，
 * 以 `Parameters` 推導可避免與上游版本脫節。
 *
 * The `seedrandom` options, derived from the second parameter of
 * `seedrandom(seed, opts)` so the type stays in sync with the upstream library.
 */
export type IRNGSeedRandomOptions = Parameters<typeof seedrandom>[1];
/**
 * `seedrandom` 回傳的擬隨機數列產生器 (Pseudorandom Number Generator)。
 * The pseudorandom number generator returned by `seedrandom`.
 */
export type ISeedRandomPRNG = seedrandom.PRNG;
/**
 * 預設選項 (Default Options)：`entropy: true` 會讓 `seedrandom` 混入平台熵值 (Entropy)，
 * 因此未指定種子時不會每次都得到同一組序列。
 *
 * Default options: `entropy: true` mixes platform entropy into `seedrandom`, so an
 * omitted seed does not produce the same sequence every time.
 */
export declare const defaultOptions: IRNGSeedRandomOptions;
/**
 * `seedrandom` 內建演算法名稱 (Built-in PRNG Algorithm Name)。
 * Built-in algorithm names exposed by `seedrandom`.
 */
export type IRNGSeedRandomLibName = 'alea' | 'tychei' | 'xor128' | 'xor4096' | 'xorshift7' | 'xorwow';
/**
 * 演算法庫 (Library) 的允許值：除了內建名稱，也接受 `seedrandom/lib/` 下的任意名稱字串。
 * Allowed library values: besides the built-in names, any name string under `seedrandom/lib/` is accepted.
 */
export type IRNGSeedRandomLib = IRNGSeedRandomLibName | string;
/**
 * 內建演算法在 `seedrandom` 物件上對應的函式型別 (Function Type)。
 * The function type that built-in algorithms map to on the `seedrandom` object.
 */
export type IRNGSeedRandomLibValueOf = PickValueOf<typeof seedrandom, IRNGSeedRandomLibName>;
/**
 * 以 [seedrandom](https://github.com/davidbau/seedrandom) 為亂數 (Random Number) 來源的
 * 可設定種子亂數產生器 (Seedable Random Number Generator)。
 *
 * A seedable random number generator backed by
 * [seedrandom](https://github.com/davidbau/seedrandom).
 */
export declare class RNGSeedRandom extends RNGFunction<ISeedRandomPRNG> {
    /**
     * 實例狀態 (Instance State)：`_opts` 為目前生效的 `seedrandom` 選項；
     * `_seedrandom` 為 `_init()` 時經 `__generator()` 解析完成的產生器函式，
     * 供 `seed()` 重新取樣時呼叫。
     *
     * Instance state: `_opts` is the `seedrandom` options currently in effect;
     * `_seedrandom` is the generator function resolved by `__generator()` during
     * `_init()`, which `seed()` invokes when re-sampling.
     */
    protected _opts: IRNGSeedRandomOptions;
    protected _seedrandom: IRNGSeedRandomGenerator;
    /**
     * 標示此產生器可設定種子 (Seedable)，讓基類允許呼叫 `seed()` 重新播种。
     * Marks this generator as seedable so the base class allows `seed()` calls.
     */
    protected _seedable: boolean;
    /**
     * 建立 `seedrandom` 亂數產生器。
     * Create a `seedrandom`-backed random number generator.
     *
     * @param seed 種子 (Seed)，可省略 / the seed, may be omitted
     * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
     * @param lib 演算法名稱字串或函式 (Library name string or function)，省略時使用預設演算法 / the algorithm name or function; falls back to the default algorithm when omitted
     * @param argv 其餘參數，原樣轉交基類，其中第一項會在 `_init()` 中交給 `__generator()` / remaining arguments forwarded to the base class, whose first item is passed to `__generator()` in `_init()`
     */
    constructor(seed?: any, opts?: IRNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv: any[]);
    /**
     * 以「演算法在最前」的參數順序建立實例。
     * Create an instance with the library name as the first argument.
     *
     * @param lib 演算法名稱字串或函式 (Library name string or function) / the algorithm name or function
     * @param seed 種子 (Seed) / the seed
     * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
     * @param argv 其餘參數 / the remaining arguments
     * @returns 新的 `RNGSeedRandom` 實例 / a new `RNGSeedRandom` instance
     */
    static createLib(lib?: IRNGSeedRandomLib, seed?: any, opts?: IRNGSeedRandomOptions, ...argv: any[]): RNGSeedRandom;
    /**
     * 與 `new RNGSeedRandom(...)` 等價的靜態工厂方法 (Static Factory Method)，參數順序與建構子一致。
     * A static factory method equivalent to `new RNGSeedRandom(...)`, using the same argument order as the constructor.
     *
     * @param seed 種子 (Seed) / the seed
     * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
     * @param lib 演算法名稱字串或函式 (Library name string or function) / the algorithm name or function
     * @param argv 其餘參數 / the remaining arguments
     * @returns 新的 `RNGSeedRandom` 實例 / a new `RNGSeedRandom` instance
     */
    static create(seed?: any, opts?: IRNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv: any[]): RNGSeedRandom;
    /**
     * 預檢查刻意留空 (Intentionally Empty)：`seedrandom` 自身會在取樣時驗證種子，
     * 此處不重複檢查，僅覆寫以關閉基類可能存在的預設行為。
     *
     * Deliberately left empty: `seedrandom` validates the seed itself when sampling,
     * so no pre-check is needed here; the override only neutralizes any base-class
     * default behavior.
     */
    protected _init_check(seed?: any, opts?: any, ...argv: any[]): void;
    /**
     * 初始化選項 (Options) 與亂數來源函式 (Random Source Function)，再交由基類完成種子設定。
     * Initializes the options and the random source function, then defers seeding to the base class.
     *
     * @param seed 種子 (Seed) / the seed
     * @param opts `seedrandom` 選項 (Options) / the `seedrandom` options
     * @param argv 第一項為演算法名稱或函式，其後為附加參數 / the first item is the library name or function, followed by extra arguments
     */
    protected _init(seed?: any, opts?: any, ...argv: any[]): void;
    /**
     * `name` 的組成零件 (Name Parts)：`_NAME` 為固定前綴；`_TYPE` 記錄目前選用的演算法名稱，
     * 供 `name` getter 拼出 `seedrandom:<演算法>`，未指定時保持 `null`。
     *
     * Name parts for `name`: `_NAME` is the constant prefix; `_TYPE` records the currently
     * selected algorithm so the `name` getter can compose `seedrandom:<algorithm>`,
     * staying `null` when none is specified.
     */
    protected readonly _NAME = "seedrandom";
    protected _TYPE: any;
    /**
     * 產生器名稱 (Generator Name)：固定前綴 `seedrandom`，有指定演算法時附加 `:<演算法>`。
     * The generator name: the constant prefix `seedrandom`, plus `:<algorithm>` when one is specified.
     *
     * @returns 形如 `seedrandom` 或 `seedrandom:<演算法>` 的字串 / a string such as `seedrandom` or `seedrandom:<algorithm>`
     */
    get name(): string;
    /**
     * 將演算法 (Algorithm) 參數解析為實際可呼叫的 `seedrandom` 產生器函式。
     * Resolve the algorithm argument into an actual callable `seedrandom` generator function.
     *
     * @param fn 內建演算法名稱、`seedrandom/lib/` 模組名稱或函式 (Built-in name, `seedrandom/lib/` module name, or function) / the algorithm name or function
     * @returns 可呼叫的產生器 (Callable generator) / a callable generator
     * @throws `RangeError` 當名稱字串包含 `..` 或不符合安全名稱格式 / when the name contains `..` or fails the safe-name pattern
     */
    protected __generator(fn?: typeof seedrandom | IRNGSeedRandomLib | IRNGSeedRandomLibValueOf): IRNGSeedRandomGenerator;
    /**
     * 目前生效的 `seedrandom` 選項 (Options)，由 `_init()` 與 `seed()` 共同維護。
     * The `seedrandom` options currently in effect, maintained by `_init()` and `seed()`.
     *
     * @returns 選項物件 (Options object) / the options object
     */
    get options(): IRNGSeedRandomOptions;
    /**
     * only when option.state = true
     */
    get state(): IRNGSeedRandomState;
    /**
     * @todo options for change seeder
     */
    seed(seed?: any, opts?: IRNGSeedRandomOptions, ...argv: any[]): void;
    /**
     * 以目前實例的設定複製出新的 `RNGSeedRandom`。
     * Create a new `RNGSeedRandom` copying the current instance's settings.
     *
     * @param seed 覆寫的種子 (Seed to override with) / the seed to override with
     * @param opts 覆寫的選項 (Options to override with) / the options to override with
     * @param argv 其餘參數 / the remaining arguments
     * @returns 新的 `RNGSeedRandom` 實例 / a new `RNGSeedRandom` instance
     */
    clone(seed?: any, opts?: IRNGSeedRandomOptions, ...argv: any[]): RNGSeedRandom;
}
/**
 * `seedrandom` 的內部狀態 (Internal State)：`i`、`j` 為洗牌索引 (Shuffle Index)，
 * `S` 為洗牌後的記憶池 (Shuffled Pool)。
 *
 * The internal state of `seedrandom`: `i` and `j` are shuffle indices and `S` is the
 * shuffled pool.
 */
export interface IRNGSeedRandomState {
    i: number;
    j: number;
    S: number[];
}
/**
 * 可呼叫的亂數來源函式 (Callable Random Source)：呼叫時傳入種子 (Seed) 與選項 (Options)，
 * 回傳可持續取樣的擬隨機數列產生器 (PRNG)。
 *
 * A callable random source: invoked with a seed and options, it returns a
 * pseudorandom number generator that can be sampled continuously.
 */
export interface IRNGSeedRandomGenerator {
    (seed?: any, opts?: IRNGSeedRandomOptions, ...argv: any[]): ISeedRandomPRNG;
}
export default RNGSeedRandom;
