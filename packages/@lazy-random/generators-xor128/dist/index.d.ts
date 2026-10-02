import { RNG } from '@lazy-random/rng-abstract';

/**
 * 以 xorshift128 擬隨機演算法 (PRNG Algorithm) 為核心的可設定種子亂數產生器
 * (Seedable Random Number Generator)，以 `x`、`y`、`z`、`w` 四個 32 位元狀態字
 * (State Word) 維護 128 位元狀態 (128-bit State)。
 *
 * A seedable random number generator built on the xorshift128 pseudorandom algorithm;
 * it keeps a 128-bit state in four 32-bit state words `x`, `y`, `z` and `w`.
 */
export declare class RNGXOR128 extends RNG {
	/**
	 * 128 位元狀態 (128-bit State)：四個 32 位元狀態字 (State Word)，於 `next()` 中
	 * 依序輪替並攪拌，於 `_seed()` 中依位置寫入。
	 *
	 * The 128-bit state: four 32-bit state words, rotated and mixed in `next()` and
	 * written positionally by `_seed()`.
	 */
	protected x: number;
	protected y: number;
	protected z: number;
	protected w: number;
	/**
	 * 建立 xor128 亂數產生器。
	 * Create an xor128 random number generator.
	 *
	 * 兩種簽章 (Two signatures)：`(seed, ...argv)` 以單一種子初始化；
	 * `(x?, y?, z?, w?, ...argv)` 可逐字指定四個狀態字，省略者以 `randomSeedNum()` 補齊。
	 *
	 * `(seed, ...argv)` initializes from a single seed; `(x?, y?, z?, w?, ...argv)` sets
	 * the four state words individually, filling any omitted word with `randomSeedNum()`.
	 *
	 * @param seed 種子 (Seed) / the seed
	 * @param argv 其餘參數，原樣轉交 `_init()` / the remaining arguments, forwarded to `_init()`
	 */
	constructor(seed: any, ...argv: any[]);
	constructor(x?: number, y?: number, z?: number, w?: number, ...argv: any[]);
	/**
	 * 產生器名稱 (Generator Name)，供除錯或辨識演算法時使用。
	 * The generator name, used for debugging or algorithm identification.
	 *
	 * @returns 固定字串 `'xor128'` / the constant string `'xor128'`
	 */
	get name(): string;
	/**
	 * 固定回傳 `true`，標示此產生器可設定種子 (Seedable)，基類允許呼叫 `seed()`。
	 * Always returns `true`, marking this generator as seedable so the base class allows `seed()` calls.
	 */
	get seedable(): boolean;
	/**
	 * 產生下一個亂數 (Random Number)。
	 * Produce the next random number.
	 *
	 * @returns `[0, 1)` 區間的浮點數 (Float in `[0, 1)`) / a float in `[0, 1)`
	 */
	next(): number;
	/**
	 * 重新播种 (Reseed)：以新值重設狀態字，並捨棄開頭 64 個輸出做預熱 (Warm-up)。
	 * Reseed: reset the state words with new values and discard the first 64 outputs as a warm-up.
	 *
	 * @param seed 第一個狀態字 (First state word)，非數字時由 `_seedNum()` 轉換 / the first state word, converted by `_seedNum()` when not a number
	 * @param opts 依位置對應狀態字 `y`（非數字時沿用目前狀態）/ positionally corresponds to state word `y` (falls back to the current state when not a number)
	 * @param argv 依序對應狀態字 `z`、`w` 與其餘參數 / corresponds in order to state words `z`, `w` and the remaining arguments
	 */
	seed(seed?: any, opts?: any, ...argv: any[]): void;
	/**
	 * 以目前實例複製出新的 `RNGXOR128`。
	 * Create a new `RNGXOR128` copied from the current instance.
	 *
	 * @param seed 覆寫的種子 (Seed to override with) / the seed to override with
	 * @param opts 覆寫的選項 (Options to override with) / the options to override with
	 * @param argv 其餘參數 / the remaining arguments
	 * @returns 新的 `RNGXOR128` 實例 / a new `RNGXOR128` instance
	 */
	clone(seed?: any, opts?: any, ...argv: any[]): RNGXOR128;
	/**
	 * 由建構參數初始化狀態 (Initialize the State)：每個省略的位置以 `randomSeedNum()`
	 * 產生的隨機數補齊，再交由 `_seed()` 寫入。
	 *
	 * Initialize the state from constructor arguments: each omitted position is filled
	 * with a `randomSeedNum()` value and then written through `_seed()`.
	 *
	 * @param argv 依序對應 `x`、`y`、`z`、`w` 的建構參數 / constructor arguments corresponding to `x`, `y`, `z`, `w` in order
	 */
	protected _init(...argv: any[]): void;
	/**
	 * 依位置寫入四個狀態字 (State Word)：省略的位置沿用目前狀態；第一個位置若非數字
	 * 會先經 `_seedNum()` 轉換，其餘位置非數字則直接沿用舊值，避免非數字污染狀態。
	 *
	 * Write the four state words positionally: omitted positions keep the current state;
	 * a non-number in the first position is converted via `_seedNum()`, while non-numbers
	 * in the other positions fall back to the old values so the state stays numeric.
	 *
	 * TODO: 懷疑第三、第四個條件判斷重複寫成 `typeof x !== 'number'`（依邏輯應分別檢查
	 * `z`、`w`）：當 `x` 為數字而 `z`/`w` 非數字時，非數字值會被直接寫入狀態。
	 * 依規範不修改邏輯，僅以 TODO 註解記錄待確認。
	 *
	 * TODO: suspected bug — the third and fourth conditions repeat `typeof x !== 'number'`
	 * (they should check `z` and `w` respectively): when `x` is a number but `z`/`w` is
	 * not, the non-number value is written into the state directly. Logic intentionally
	 * left untouched per convention, recorded for confirmation only.
	 */
	protected _seed(...argv: any[]): void;
}

export {
	RNGXOR128 as default,
};

export {};
