/**
 * Created by user on 2018/10/22/022.
 */

/**
 * 各方法的預設參數表 (Default Arguments)，以 `Object.freeze()` 凍結 (Frozen) 防止被改寫。
 * Default arguments for each method, frozen with `Object.freeze()` to prevent mutation.
 */
export const defaultArgv = Object.freeze({
	int: Object.freeze([0, 100]),
	integer: Object.freeze([0, 100]),
	boolean: Object.freeze([0.5]),
	bytes: Object.freeze([1]),
})

/**
 * 將任意回傳 `0～1` 的亂數函式 (Random Function) 包裝成具名方法的包裝器 (Wrapper)。
 * Wrap any random function returning `0-1` into a wrapper with named methods.
 *
 * 適合把自訂的種子亂數產生器 (Seeded RNG) 快速整併成統一 API；
 * 所有方法共用同一個 `fn`，因此種子序列 (Seed Sequence) 由 `fn` 決定。
 * Useful for adapting a custom seeded RNG into a uniform API; every method shares
 * the same `fn`, so the seed sequence is determined by `fn`.
 *
 * @param fn 回傳 `0～1` 數值的亂數函式 / A random function returning a value between 0 and 1
 * @returns 包含各產生方法的物件 / An object exposing the generator methods
 */
export function simpleWrap<T extends (() => number)>(fn: T)
{
	let self = {
		/**
		 * 取得下一個亂數 (Random Number)，與 `random()` 等價。
		 * Get the next random number; equivalent to `random()`.
		 */
		next(): number
		{
			return fn()
		},
		/**
		 * 回傳 `0～1` 的亂數 (Random Number)。
		 * Return a random number between 0 and 1.
		 */
		random(): number
		{
			return fn()
		},
		/**
		 * 回傳 `min`～`max` 區間的浮點數 (Float)。
		 * Return a float in the range from `min` to `max`.
		 *
		 * TODO: 疑似 bug — 公式含 `+1`，實際範圍為 `[min, max + 1)`，預設呼叫 `float()` 會回傳 `0～2` 而非 `0～1`；僅記錄不修改邏輯。
		 * TODO: suspected bug — the `+1` makes the actual range `[min, max + 1)`, so the default `float()` returns `0-2` instead of `0-1`; logged only, logic untouched.
		 *
		 * @param min 下界 (Lower bound)，預設 0 / Lower bound, defaults to 0
		 * @param max 上界 (Upper bound)，預設 1 / Upper bound, defaults to 1
		 * @returns 區間內的浮點數 / A float within the range
		 */
		float(min = 0, max = 1): number
		{
			return (fn() * (max - min + 1) + min)
		},
		/**
		 * 回傳 `min`～`max`（含端點，Inclusive）的整數 (Integer)。
		 * Return an integer in the inclusive range from `min` to `max`.
		 *
		 * `+1` 讓 `Math.floor()` 的取整結果涵蓋上界；若 `fn()` 恰好回傳 1，
		 * 則會產生 `max + 1`，此為依賴 `fn() < 1` 的邊界情況 (Edge Case)。
		 * `+1` lets `Math.floor()` cover the upper bound; if `fn()` returns exactly 1,
		 * `max + 1` would be produced, relying on the assumption `fn() < 1`.
		 *
		 * @param min 下界 (Lower bound)，預設 0 / Lower bound, defaults to 0
		 * @param max 上界 (Upper bound)，預設 100 / Upper bound, defaults to 100
		 * @returns 區間內的整數 / An integer within the range
		 */
		int(min = 0, max = 100): number
		{
			return Math.floor(fn() * (max - min + 1) + min)
		},
		/**
		 * `int` 的別名 (Alias)，以 getter (存取子) 暴露，呼叫方式與方法相同。
		 * An alias for `int`, exposed via a getter so it can be called like a method.
		 */
		get integer()
		{
			return self.int
		},
		/**
		 * 依門檻 (Threshold) `likelihood` 回傳布林值 (Boolean)。
		 * Return a boolean based on the `likelihood` threshold.
		 *
		 * TODO: 疑似 bug — `likelihood` 字面意為「為真的機率」，但 `fn() >= likelihood` 使 `likelihood` 越高反而越少為真；僅記錄不修改邏輯。
		 * TODO: suspected bug — `likelihood` implies the probability of `true`, yet `fn() >= likelihood` makes higher values yield `true` less often; logged only, logic untouched.
		 *
		 * @param likelihood 決定真假比例的門檻，預設 0.5 / Threshold deciding the true/false split, defaults to 0.5
		 * @returns 布林值 / A boolean value
		 */
		boolean(likelihood: number = 0.5)
		{
			return (fn() >= likelihood)
		},
		/**
		 * 回傳單一位元組 (Byte)，即 `0～255` 的整數 (Integer)。
		 * Return a single byte, i.e. an integer from 0 to 255.
		 */
		byte(): number
		{
			return self.int(0, 255)
		},
		/**
		 * 回傳 `size` 個位元組 (Byte) 組成的陣列 (Array)。
		 * Return an array of `size` bytes.
		 *
		 * @param size 位元組數量，預設 1 / Number of bytes, defaults to 1
		 * @returns 位元組陣列 / An array of bytes
		 */
		bytes(size: number = 1)
		{
			/**
			 * 逐格 push 而非預先配置：`size` 通常很小，可讀性優先於微小的效能差異。
			 * Push one by one instead of pre-allocating: `size` is usually tiny,
			 * so readability wins over a negligible performance difference.
			 */
			let arr: number[] = []
			for (let i = 0; i < size; i++)
			{
				arr.push(self.byte())
			}
			return arr
		},
		/**
		 * 預留的種子 (Seed) 方法，目前直接回傳包裝器本身以支援鏈式呼叫 (Chain)。
		 * Reserved seed method; currently returns the wrapper itself to support chaining.
		 */
		seed(...argv)
		{
			return self
		},
	}

	return self
}

export default simpleWrap;

