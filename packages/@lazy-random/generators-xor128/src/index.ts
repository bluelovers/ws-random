import { RNG } from '@lazy-random/rng-abstract'
import { randomSeedNum } from '@lazy-random/seed-token';
import { cloneClass } from '@lazy-random/clone-class';

/**
 * 以 xorshift128 擬隨機演算法 (PRNG Algorithm) 為核心的可設定種子亂數產生器
 * (Seedable Random Number Generator)，以 `x`、`y`、`z`、`w` 四個 32 位元狀態字
 * (State Word) 維護 128 位元狀態 (128-bit State)。
 *
 * A seedable random number generator built on the xorshift128 pseudorandom algorithm;
 * it keeps a 128-bit state in four 32-bit state words `x`, `y`, `z` and `w`.
 */
export class RNGXOR128 extends RNG
{

	/**
	 * 128 位元狀態 (128-bit State)：四個 32 位元狀態字 (State Word)，於 `next()` 中
	 * 依序輪替並攪拌，於 `_seed()` 中依位置寫入。
	 *
	 * The 128-bit state: four 32-bit state words, rotated and mixed in `next()` and
	 * written positionally by `_seed()`.
	 */
	protected x: number
	protected y: number
	protected z: number
	protected w: number

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
	constructor(seed, ...argv)
	constructor(x?: number, y?: number, z?: number, w?: number, ...argv)
	constructor(...argv)
	{
		super()

		this._init(...argv)

		/**
		 * 初始化後再以目前狀態自我播种 (Self-reseed) 一次，實際效果是觸發 `seed()` 內的
		 * 捨棄預熱 (Warm-up)，確保對外輸出的序列不是初始未混合的狀態。
		 *
		 * After initialization, reseed with the current state once; the actual effect is
		 * to trigger the warm-up discard inside `seed()`, so the publicly emitted
		 * sequence never starts from a raw, unmixed initial state.
		 */
		this.seed(this.x)
	}

	/**
	 * 產生器名稱 (Generator Name)，供除錯或辨識演算法時使用。
	 * The generator name, used for debugging or algorithm identification.
	 *
	 * @returns 固定字串 `'xor128'` / the constant string `'xor128'`
	 */
	override get name()
	{
		return 'xor128'
	}

	/**
	 * 固定回傳 `true`，標示此產生器可設定種子 (Seedable)，基類允許呼叫 `seed()`。
	 * Always returns `true`, marking this generator as seedable so the base class allows `seed()` calls.
	 */
	public override get seedable()
	{
		return true
	}

	/**
	 * 產生下一個亂數 (Random Number)。
	 * Produce the next random number.
	 *
	 * @returns `[0, 1)` 區間的浮點數 (Float in `[0, 1)`) / a float in `[0, 1)`
	 */
	next()
	{
		/**
		 * xorshift128 狀態推進 (State Advance)：`t` 由 `x` 自我互斥或 (Self-XOR) 左移一位
		 * 產生，作為本輪的攪拌量 (Mix Value)；四個狀態字依序輪替 `x → y → z → w`，
		 * 再把 `w` 與攪拌量混合後寫回 `w`，完成 128 位元狀態的一輪演化。
		 *
		 * xorshift128 state advance: `t` is the self-XOR of `x` shifted left by one bit,
		 * serving as this round's mix value; the four state words rotate `x → y → z → w`,
		 * then `w` is mixed with the mix value and written back, completing one evolution
		 * of the 128-bit state.
		 */
		const t = this.x ^ (this.x << 1)
		this.x = this.y
		this.y = this.z
		this.z = this.w
		this.w = this.w ^ ((this.w >>> 19) ^ t ^ (t >>> 8))

		/**
		 * 先以 `>>> 0` 將狀態字轉為無號 32 位元整數 (Unsigned 32-bit Integer)，
		 * 再除以 `2^32`（`0x100000000`）映射到 `[0, 1)` 區間。
		 *
		 * Convert the state word to an unsigned 32-bit integer with `>>> 0`, then divide
		 * by `2^32` (`0x100000000`) to map it into the `[0, 1)` range.
		 */
		return (this.w >>> 0) / 0x100000000
	}

	/**
	 * 重新播种 (Reseed)：以新值重設狀態字，並捨棄開頭 64 個輸出做預熱 (Warm-up)。
	 * Reseed: reset the state words with new values and discard the first 64 outputs as a warm-up.
	 *
	 * @param seed 第一個狀態字 (First state word)，非數字時由 `_seedNum()` 轉換 / the first state word, converted by `_seedNum()` when not a number
	 * @param opts 依位置對應狀態字 `y`（非數字時沿用目前狀態）/ positionally corresponds to state word `y` (falls back to the current state when not a number)
	 * @param argv 依序對應狀態字 `z`、`w` 與其餘參數 / corresponds in order to state words `z`, `w` and the remaining arguments
	 */
	override seed(seed?, opts?, ...argv)
	{
//		this.x = this._seedNum(seed, opts, ...argv)
		this._seed(seed, opts, ...argv)

		/**
		 * 預熱 (Warm-up)：xor128 對初始狀態較敏感，捨棄開頭 64 個輸出，
		 * 讓對外序列避開尚未充分混合的初始狀態。
		 *
		 * Warm-up: xor128 is sensitive to its initial state, so the first 64 outputs are
		 * discarded to keep the public sequence away from an insufficiently mixed start.
		 */
		// discard an initial batch of 64 values
		let i = 64;
		while (i--)
		{
			this.next()
		}
	}

	/**
	 * 以目前實例複製出新的 `RNGXOR128`。
	 * Create a new `RNGXOR128` copied from the current instance.
	 *
	 * @param seed 覆寫的種子 (Seed to override with) / the seed to override with
	 * @param opts 覆寫的選項 (Options to override with) / the options to override with
	 * @param argv 其餘參數 / the remaining arguments
	 * @returns 新的 `RNGXOR128` 實例 / a new `RNGXOR128` instance
	 */
	override clone(seed?, opts?, ...argv): RNGXOR128
	{
		return cloneClass(RNGXOR128, this, seed, opts, ...argv)
	}

	/**
	 * 由建構參數初始化狀態 (Initialize the State)：每個省略的位置以 `randomSeedNum()`
	 * 產生的隨機數補齊，再交由 `_seed()` 寫入。
	 *
	 * Initialize the state from constructor arguments: each omitted position is filled
	 * with a `randomSeedNum()` value and then written through `_seed()`.
	 *
	 * @param argv 依序對應 `x`、`y`、`z`、`w` 的建構參數 / constructor arguments corresponding to `x`, `y`, `z`, `w` in order
	 */
	protected override _init(...argv)
	{
		let [
			x = randomSeedNum(),
			y = randomSeedNum(),
			z = randomSeedNum(),
			w = randomSeedNum(),
		] = argv

		this._seed(x, y, z, w)
	}

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
	protected _seed(...argv)
	{
		let [
			x = this.x,
			y = this.y,
			z = this.z,
			w = this.w,
		] = argv

		if (typeof x !== 'number')
		{
			x = this._seedNum(x) || this.x
		}
		if (typeof y !== 'number')
		{
			y = this.y
		}
		if (typeof z !== 'number')
		{
			z = this.z
		}
		if (typeof x !== 'number')
		{
			w = this.w
		}

		this.x = x
		this.y = y
		this.z = z
		this.w = w
	}
}

export default RNGXOR128


