import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 依亂數產生器 (RNG) 回傳 `0 ～ len - 1` 的隨機索引 (Random Index)。
 * Return a random index from `0` to `len - 1` using the given RNG.
 *
 * 以 `Math.floor()` 取整，等機率 (Uniform) 切分 `[0, len)` 區間。
 * `Math.floor()` divides `[0, len)` into equal-probability buckets.
 *
 * @param random 實作 `IRNGLike` 的亂數產生器 / An RNG implementing `IRNGLike`
 * @param len 索引長度，通常為陣列 (Array) 長度 / The index length, usually an array length
 * @returns 隨機索引 / A random index
 */
export declare function randIndexByLength(random: IRNGLike, len: number): number;
/**
 * 在 `[start, end)` 區間內回傳取整後的隨機索引 (Random Index)。
 * Return a floored random index within `[start, end)`.
 *
 * 與 `randIndexByLength()` 的差別在於支援任意起訖，方便做區間抽樣 (Range Sampling)。
 * Unlike `randIndexByLength()`, this accepts arbitrary bounds for range sampling.
 *
 * @param random 實作 `IRNGLike` 的亂數產生器 / An RNG implementing `IRNGLike`
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 取整後的隨機索引 / A floored random index
 */
export declare function randIndexWithRange(random: IRNGLike, start: number, end: number): number;
/**
 * 回傳 `[min, max)` 區間內的浮點數 (Float)。
 * Return a float within the `[min, max)` range.
 *
 * 先以 `max - min` 決定跨度 (Span)，再平移至 `min`，可處理負數與非零下界。
 * Scales by `max - min` then offsets by `min`, supporting negative values and non-zero lower bounds.
 *
 * @param random 實作 `IRNGLike` 的亂數產生器 / An RNG implementing `IRNGLike`
 * @param min 下界 (Lower Bound)，含於結果 / Lower bound, included
 * @param max 上界 (Upper Bound)，不含於結果 / Upper bound, excluded
 * @returns 區間內的浮點數 / A float within the range
 */
export declare function float(random: IRNGLike, min: number, max: number): number;
/**
 * 回傳 `[min, max]`（含端點，Inclusive）區間內的整數 (Integer)。
 * Return an integer in the inclusive range `[min, max]`.
 *
 * 以 `max + 1` 轉成半開區間 (Half-open Interval) 後取整，確保上界也能被抽中。
 * Shifts to a half-open interval with `max + 1` so the upper bound can be drawn as well.
 *
 * @param random 實作 `IRNGLike` 的亂數產生器 / An RNG implementing `IRNGLike`
 * @param min 下界 (Lower Bound)，含於結果 / Lower bound, included
 * @param max 上界 (Upper Bound)，含於結果 / Upper bound, included
 * @returns 區間內的整數 / An integer within the range
 */
export declare function int(random: IRNGLike, min: number, max: number): number;
/**
 * 核心驗證與計算函式 / Core validation and calculation functions
 *
 * 以範圍 (Range) 作為單一事實來源 (Single Source of Truth)：
 *
 * 1. 參數 (Parameter) 以閉區間 `[min, max]` 驗證是否為合法整數
 *    Validate parameters as integers against the inclusive interval `[min, max]`
 *
 * 2. 值 (Value) 以半開區間 `[start, end)` 驗證是否合法
 *    Validate values against the half-open interval `[start, end)`
 *
 * 3. 合法值需要列舉時，以生成器 (Generator) 惰性列舉，
 *    只有在需要完整清單（快照、錯誤訊息）時才物化 (Materialize)
 *    Enumerate legal values lazily with a generator, and materialize them
 *    only when a full list is required (snapshots, error messages)
 *
 * 4. 標準化參數的 core 與拋錯的 assert 分開：
 *    `_fnCore*` 只做標準化、永不拋錯（`NaN` 原樣流出），
 *    `assert*` 只做拋錯，兩者各自可單獨取用、自由組合。
 *    Parameter normalisation (`_fnCore*`, never throws, `NaN` flows through)
 *    is separated from error throwing (`assert*`); each is usable on its own
 *    and the two compose freely.
 */
/**
 * 半開區間 `[start, end)` / Half-open interval
 */
export interface IRange {
	/**
	 * 起始值（含，Inclusive）/ Start value, inclusive
	 */
	start: number;
	/**
	 * 結束值（不含，Exclusive）/ End value, exclusive
	 */
	end: number;
}
/**
 * 合法值的計算結果 / Result of the computed legal values
 */
export interface IExpectedValues {
	/**
	 * 合法參數值（原始函式參數）/ The legal parameter values (original function arguments)
	 */
	params: Readonly<Record<string, number>>;
	/**
	 * 合法值區間 `[start, end)` / The legal value interval `[start, end)`
	 */
	range: Readonly<IRange>;
	/**
	 * 合法值的數量 / The count of legal values
	 */
	size: number;
	/**
	 * 生成器工廠，惰性列舉合法值 / Generator factory that lazily enumerates the legal values
	 *
	 * 每次呼叫都會產生新的生成器，可重複列舉。
	 * Each call returns a new generator, so the values can be enumerated repeatedly.
	 */
	valuesGenerator(): Generator<number>;
}
/**
 * 已收集值的驗證器 / Validator for the collected values
 */
export interface IValuesValidator {
	/**
	 * 錯誤訊息用的標籤 / The label used in error messages
	 */
	label: string;
	/**
	 * 合法參數值與合法值 / The legal parameter values and legal values
	 */
	expected: IExpectedValues;
	/**
	 * 已收集到的不同值數量 / The number of distinct values collected so far
	 */
	size: number;
	/**
	 * 實際取值次數 / The number of samples actually taken
	 */
	total: number;
	/**
	 * 驗證單一值的合法性並記錄，不合法時拋出錯誤
	 * Validate a single value and record it, throws when the value is illegal
	 *
	 * @param value 待驗證的值 / The value to validate
	 * @returns 回傳該值以便串接 / Returns the value for chaining
	 */
	check(value: number): number;
	/**
	 * 驗證所有預期值皆出現過，有遺漏時拋出錯誤
	 * Ensure every expected value appeared at least once, throws when any is missing
	 */
	verifyAllSeen(): void;
	/**
	 * 以生成器列舉出現值，順序依合法值（由小到大）
	 * Enumerate the seen values with a generator, in legal-value order (ascending)
	 */
	seenValuesGenerator(): Generator<number>;
	/**
	 * 以生成器列舉未出現的預期值 / Enumerate the expected values that never appeared with a generator
	 */
	missingValuesGenerator(): Generator<number>;
	/**
	 * 以生成器列舉非法值 / Enumerate the illegal values with a generator
	 */
	illegalValuesGenerator(): Generator<number>;
}
/**
 * 參數允許的最小整數（閉區間下界）/ Smallest integer allowed for parameters (inclusive lower bound)
 */
export declare const SAFE_INTEGER_MIN: number;
/**
 * 參數允許的最大整數（閉區間上界）/ Largest integer allowed for parameters (inclusive upper bound)
 */
export declare const SAFE_INTEGER_MAX: number;
/**
 * `len` 參數允許的最小值（閉區間下界）/ Smallest value allowed for the `len` parameter (inclusive lower bound)
 *
 * `randIndexByLength()` 的合法值區間為 `[0, len)`，因此 `len` 至少為 1。
 * The legal interval of `randIndexByLength()` is `[0, len)`, so `len` must be at least 1.
 */
export declare const MIN_LENGTH = 1;
/**
 * `len` 參數允許的最大值（閉區間上界）/ Largest value allowed for the `len` parameter (inclusive upper bound)
 */
export declare const MAX_LENGTH: number;
/**
 * 向零取整（`ToIntegerOrInfinity()` 語意），不拋錯
 * Truncate toward zero (the `ToIntegerOrInfinity()` semantics), never throws
 *
 * `Math.trunc()` 對小負數（如 `-0.5`）會產生 `-0`，交由 `fixZero()` 轉回 `+0`，
 * 否則 `-0` 流入區間後會被 `deepStrictEqual` 判為與 `0` 不同。
 * `Math.trunc()` yields `-0` for small negatives (e.g. `-0.5`), which `fixZero()`
 * turns back into `+0`; otherwise a `-0` leaking into a range is treated as
 * different from `0` by `deepStrictEqual`.
 *
 * `NaN` → `NaN`、`±Infinity` → `±Infinity` 原樣流出。
 * `NaN` → `NaN` and `±Infinity` → `±Infinity` flow through untouched.
 *
 * @param value 待標準化的值 / The value to normalise
 * @returns 取整後的值 / The truncated value
 */
export declare function _fnCoreToInteger(value: number): number;
/**
 * 判斷是否為有限數值，不拋錯
 * Check whether a value is a finite number, never throws
 *
 * @param value 待檢查的值 / The value to check
 * @returns 是否有限 / Whether the value is finite
 */
export declare function _isFiniteNumber(value: unknown): boolean;
/**
 * 驗證是否為有限數值，否則拋出 TypeError
 * Validate that a value is a finite number, throws a TypeError otherwise
 *
 * slice 風格唯一的例外：`NaN` / `±Infinity` 不收窄，直接視為上游錯誤。
 * The one exception to the slice style: `NaN` / `±Infinity` are not narrowed
 * but treated as an upstream error.
 *
 * @param value 待檢查的參數 / The parameter to check
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該參數以便串接 / Returns the parameter for chaining
 */
export declare function _assertFiniteNumber(value: unknown, name?: string, label?: string): number;
/**
 * 判斷是否為整數且落在閉區間 `[min, max]`，不拋錯
 * Check whether a value is an integer inside the inclusive interval `[min, max]`, never throws
 *
 * @param value 待檢查的值 / The value to check
 * @param min 下界（含）/ Lower bound, inclusive
 * @param max 上界（含）/ Upper bound, inclusive
 * @returns 是否合法 / Whether the value is legal
 */
export declare function _isIntegerInRange(value: number, min: number, max: number): boolean;
/**
 * 驗證是否為整數，否則拋出 TypeError
 * Validate that a value is an integer, throws a TypeError otherwise
 *
 * @param value 待驗證的參數 / The parameter to validate
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該參數以便串接 / Returns the parameter for chaining
 */
export declare function _assertInteger(value: number, name?: string, label?: string): number;
/**
 * 判斷值是否落在半開區間 `[start, end)` 內
 * Check whether a value falls inside the half-open interval `[start, end)`
 *
 * @param value 待驗證的值 / The value to validate
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 是否合法 / Whether the value is legal
 */
export declare function _isInRange(value: number, start: number, end: number): boolean;
/**
 * 以半開區間 `[start, end)` 驗證值，不合法時拋出錯誤
 * Validate a value against the half-open interval `[start, end)`, throws when illegal
 *
 * @param value 待驗證的值 / The value to validate
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該值以便串接 / Returns the value for chaining
 */
export declare function _assertInRange(value: number, start: number, end: number, name?: string, label?: string): number;
/**
 * 以閉區間 `[min, max]` 驗證整數參數，不合法時拋出錯誤
 * Validate an integer parameter against the inclusive interval `[min, max]`, throws when illegal
 *
 * 組合 `assertInteger()`（型別）+ 範圍檢查（大小），兩段各自可單獨取用。
 * Composes `assertInteger()` (type) and a bound check (size); each half is
 * usable on its own.
 *
 * @param value 待驗證的參數 / The parameter to validate
 * @param min 下界（含，Inclusive）/ Lower bound, inclusive
 * @param max 上界（含，Inclusive）/ Upper bound, inclusive
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該參數以便串接 / Returns the parameter for chaining
 */
export declare function _assertIntegerInRange(value: number, min: number, max: number, name: string, label: string): number;
/**
 * 以閉區間 `[MIN_LENGTH, MAX_LENGTH]` 驗證 `randIndexByLength()` 的 `len` 參數
 * Validate the `len` argument of `randIndexByLength()` against the inclusive interval `[MIN_LENGTH, MAX_LENGTH]`
 *
 * @param len 索引長度 / The index length
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該參數以便串接 / Returns the parameter for chaining
 */
export declare function _assertLengthParams(len: number, label?: string): number;
/**
 * 驗證區間參數 `start` / `end`：皆為安全整數，且範圍不得為空
 * Validate the range parameters `start` / `end`: both safe integers and the range must not be empty
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 驗證過的區間 / The validated range
 */
export declare function _assertRangeParams(start: number, end: number, label?: string): IRange;
/**
 * 計算半開區間 `[start, end)` 的合法值數量，不需列舉
 * Compute the count of legal values in the half-open interval `[start, end)` without enumerating
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 合法值的數量 / The count of legal values
 */
export declare function _calcRangeSize(start: number, end: number): number;
/**
 * 以生成器列舉半開區間 `[start, end)` 內的整數
 * Enumerate the integers inside the half-open interval `[start, end)` with a generator
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 整數生成器 / A generator of integers
 */
export declare function _rangeValues(start: number, end: number): Generator<number>;
/**
 * 以半開區間 `[start, end)` 計算合法值、合法參數值 與 其數量
 * Compute the legal values, legal parameter values and their count from the half-open interval `[start, end)`
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @param params 原始函式參數，會一併記錄進快照 / Original function arguments, also recorded into the snapshot
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
export declare function _calcExpectedValues(start: number, end: number, params?: Readonly<Record<string, number>>, label?: string): IExpectedValues;
/**
 * 依 `randIndexByLength(len)` 的長度參數計算合法值 `[0, len)`
 * Compute the legal values `[0, len)` from the length argument of `randIndexByLength(len)`
 *
 * @param len 索引長度 / The index length
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
export declare function _calcExpectedValuesByLength(len: number): IExpectedValues;
/**
 * 依 `randIndexWithRange(start, end)` 的區間參數計算合法值 `[start, end)`
 * Compute the legal values `[start, end)` from the range arguments of `randIndexWithRange(start, end)`
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
export declare function _calcExpectedValuesByRange(start: number, end: number): IExpectedValues;
/**
 * 建立已收集值的驗證器 / Create a validator for the collected values
 *
 * - 值不在合法區間 `[start, end)` 內 → 先記錄再立即拋出錯誤
 *   value outside the legal interval `[start, end)` → record it then throw immediately
 * - 以 `Map` 記錄並檢查 `size`，不同值數量超過合法值數量 → 立即拋出錯誤
 *   record with a `Map` and check its `size`, distinct values exceeding the legal count → throw immediately
 *
 * @param expected 合法參數值與合法值 / The legal parameter values and legal values
 * @param label 錯誤訊息用的標籤 / Label used in error messages
 * @returns 驗證器 / The validator
 */
export declare function _createValuesValidator(expected: IExpectedValues, label: string): IValuesValidator;
/**
 * 只需讀取 `length` 的陣列型別（陣列、字串、類陣列物件皆可）
 * Array-like type that only requires `length` (arrays, strings and array-likes all qualify)
 */
export interface IArrayLike {
	readonly length: number;
}
/**
 * 含端點的閉區間 `[min, max]` / Inclusive interval `[min, max]`
 */
export interface IMinMax {
	/**
	 * 下界（含）/ Lower bound, inclusive
	 */
	min: number;
	/**
	 * 上界（含）/ Upper bound, inclusive
	 */
	max: number;
}
/**
 * 判斷陣列是否為空（`length === 0`）
 * Check whether an array is empty (`length === 0`)
 *
 * @param arr 目標陣列 / The target array
 * @returns 是否為空 / Whether the array is empty
 */
export declare function _isArrayEmpty(arr: IArrayLike): boolean;
/**
 * 讀取 `length`，不拋錯；非數值時回傳 `NaN`
 * Read `length` without throwing; returns `NaN` when it is not a number
 *
 * @param arr 目標陣列 / The target array
 * @returns 陣列長度或 `NaN` / The array length or `NaN`
 */
export declare function _fnCoreArrayLength(arr: IArrayLike): number;
/**
 * 夾取 core：把值夾進 `[min, max]`，不拋錯
 * Clamp core: clamp a value into `[min, max]`, never throws
 *
 * 前置條件 `min <= max` 由上層把關，core 不重複驗證：
 * `clampValue()` 先過 `assertMinMaxOrder()`、`clampSize()` 先過
 * `assertIntegerInRange(max, 0, …)`，含端點正規化則先過 `assertNotEmptyLength()`。
 * The `min <= max` precondition is guarded upstream and not re-checked here:
 * `clampValue()` goes through `assertMinMaxOrder()` first, `clampSize()` through
 * `assertIntegerInRange(max, 0, …)`, and inclusive normalisation through
 * `assertNotEmptyLength()`.
 *
 * @param value 待夾取的值 / The value to clamp
 * @param min 下界（含）/ Lower bound, inclusive
 * @param max 上界（含）/ Upper bound, inclusive
 * @returns 夾取後的值 / The clamped value
 */
export declare function _fnCoreClamp(value: number, min: number, max: number): number;
/**
 * 解析記法 core：把邊界向零取整並解析負值的尾部記法，不收窄、不拋錯
 * Notation-resolution core: truncate a bound and resolve negative tail notation; no narrowing, never throws
 *
 * 這是 `_fnCoreNormalizeSliceIndex()` 與 `_fnCoreNormalizeInclusiveIndex()`
 * 共用的核心邏輯，兩者的差別只在最後的取值（夾取上界）。
 * This is the logic shared by `_fnCoreNormalizeSliceIndex()` and
 * `_fnCoreNormalizeInclusiveIndex()`; the two differ only in the final retrieval
 * (which upper bound they clamp to).
 *
 * 負值代表從尾部往前算：`-1` → `length - 1`。此處刻意**不夾進 `[0, length]`**，
 * `-6` 會原樣得到 `-1`，要不要收窄由上層決定。
 * Negatives count from the tail: `-1` → `length - 1`. It deliberately **does not
 * clamp into `[0, length]`**: `-6` yields `-1` as-is, and the caller decides
 * whether to narrow.
 *
 * @param index 原始邊界 / The raw bound
 * @param length 陣列長度 / The array length
 * @returns 解析後、未收窄的索引 / The resolved, unclamped index
 */
export declare function _fnCoreResolveTailIndex(index: number, length: number): number;
/**
 * slice 風格 core：把單一半開邊界正規化成 `[0, length]` 內的實際位置
 * Slice style core: normalise a single half-open bound into an actual position inside `[0, length]`
 *
 * = `_fnCoreResolveTailIndex()`（共用核心邏輯）+ `_fnCoreClamp()`（取值：夾進 `[0, length]`）。
 * 不拋錯：`NaN` → `NaN`、`±Infinity` → 收窄到端點。
 * = `_fnCoreResolveTailIndex()` (the shared core) plus `_fnCoreClamp()` (the
 * retrieval, narrowing into `[0, length]`). Never throws: `NaN` → `NaN`,
 * `±Infinity` → narrowed to an endpoint.
 *
 * 規則 / rules:
 *
 * 1. 小數向零取整，與 `ToIntegerOrInfinity()` 一致
 *    truncate toward zero, matching `ToIntegerOrInfinity()`
 * 2. 負值代表從尾部往前算：`-1` → `length - 1`
 *    negatives count from the tail: `-1` → `length - 1`
 * 3. 超出 `[0, length]` 自動收窄 / out-of-range bounds auto-narrow
 *
 * @param index 原始邊界 / The raw bound
 * @param length 陣列長度 / The array length
 * @returns 正規化後的位置 / The normalised position
 */
export declare function _fnCoreNormalizeSliceIndex(index: number, length: number): number;
/**
 * slice 風格 core：把單一含端點邊界正規化成 `[0, length - 1]` 內的實際索引
 * Slice style core: normalise a single inclusive bound into an actual index inside `[0, length - 1]`
 *
 * 與 `_fnCoreNormalizeSliceIndex()` 共用同一段核心邏輯，只差最後的取值：
 * 上界從 `length` 換成 `length - 1`。
 * Shares the same core logic as `_fnCoreNormalizeSliceIndex()`; only the final
 * retrieval differs: the upper bound becomes `length - 1` instead of `length`.
 *
 * 前置條件 `length >= 1` 由上層把關（`_assertInclusiveIndexParams()` →
 * `assertNotEmptyLength()`），core 不重複驗證 — 少這一輪判斷正是為了大量執行的效率。
 * The `length >= 1` precondition is guarded upstream
 * (`_assertInclusiveIndexParams()` → `assertNotEmptyLength()`), so core does not
 * re-check it — skipping that test is exactly what buys the throughput.
 *
 * @param index 原始邊界 / The raw bound
 * @param length 陣列長度 / The array length
 * @returns 正規化後的索引 / The normalised index
 */
export declare function _fnCoreNormalizeInclusiveIndex(index: number, length: number): number;
/**
 * 半開區間 core：正規化 `[start, end)`，不檢查是否為空
 * Half-open range core: normalise `[start, end)` without checking emptiness
 *
 * @param start 起始位置（含），缺省 0 / inclusive start position, defaults to 0
 * @param end 結束位置（不含），缺省 `length` / exclusive end position, defaults to `length`
 * @param length 陣列長度 / The array length
 * @returns 正規化後的區間，可能為空 / The normalised range, which may be empty
 */
export declare function _fnCoreNormalizeSliceRange(start: number | null | undefined, end: number | null | undefined, length: number): IRange;
/**
 * 含端點 core：正規化 `[min, max]`，`min > max` 時交換，不檢查空陣列
 * Inclusive range core: normalise `[min, max]`, swapping when `min > max`, with no empty-array check
 *
 * @param min 下界（含），缺省 0 / inclusive lower bound, defaults to 0
 * @param max 上界（含），缺省 `length - 1` / inclusive upper bound, defaults to `length - 1`
 * @param length 陣列長度 / The array length
 * @returns 正規化後的含端點區間 / The normalised inclusive range
 */
export declare function _fnCoreNormalizeSliceMinMax(min: number | null | undefined, max: number | null | undefined, length: number): IMinMax;
/**
 * 排序 core：`min > max` 時交換，回傳有序的 min / max，不拋錯
 * Ordering core: swap when `min > max`, returning an ordered min / max, never throws
 *
 * 與 `assertMinMaxOrder()` 是一體兩面：一個交換、一個拋錯，可各自選用。
 * The mirror image of `assertMinMaxOrder()`: one swaps, the other throws, and
 * either can be picked on its own.
 *
 * @param min 下界（含）/ Lower bound, inclusive
 * @param max 上界（含）/ Upper bound, inclusive
 * @returns 排序後的閉區間 / The ordered interval
 */
export declare function _fnCoreOrderMinMax(min: number, max: number): IMinMax;
/**
 * 驗證 `min <= max`，否則拋出 RangeError
 * Validate that `min <= max`, throws a RangeError otherwise
 *
 * 從 `assertMinMax()` / `clampValue()` / `assertArrayIndexMinMax()` 抽出的共用拋錯邏輯，
 * 可與任何「先算後驗」的流程組合。
 * The shared throw lifted out of `assertMinMax()` / `clampValue()` /
 * `assertArrayIndexMinMax()`; composes with any "compute then validate" flow.
 *
 * @param min 下界（含）/ Lower bound, inclusive
 * @param max 上界（含）/ Upper bound, inclusive
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 */
export declare function _assertMinMaxOrder(min: number, max: number, label: string): void;
/**
 * 驗證並回傳陣列長度，`0` 視為合法
 * Validate and return the array length, where `0` is legal
 *
 * 組合 `_fnCoreArrayLength()` + `assertArrayLike` 檢查。
 * Composes `_fnCoreArrayLength()` with the `assertArrayLike` checks.
 *
 * 與 `assertArrayNotEmpty()` 分工：本函式只管「是不是合法長度」，
 * 需要非空時再由後者把關。
 * Splits duties with `assertArrayNotEmpty()`: this one only answers
 * "is it a legal length", while the latter enforces non-emptiness.
 *
 * @param arr 目標陣列 / The target array
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 陣列長度 / The array length
 */
export declare function _calcArrayLength(arr: IArrayLike, label?: string): number;
/**
 * 驗證純數值長度必須大於 0，否則拋出 RangeError
 * Validate that a plain length is greater than 0, throws a RangeError otherwise
 *
 * @param length 待驗證的長度 / The length to validate
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該長度以便串接 / Returns the length for chaining
 */
export declare function _assertNotEmptyLength(length: number, name?: string, label?: string): number;
/**
 * slice 風格：把單一半開邊界正規化成 `[0, length]` 內的實際位置
 * Slice style: normalise a single half-open bound into an actual position inside `[0, length]`
 *
 * = `_assertSliceIndexParams()` + `_fnCoreNormalizeSliceIndex()`，
 * 兩段各自可單獨取用。
 * = `_assertSliceIndexParams()` + `_fnCoreNormalizeSliceIndex()`; both halves
 * are usable on their own.
 *
 * 規則 / rules:
 *
 * 1. `NaN` / `±Infinity` → TypeError（不收窄，視為上游錯誤）
 *    `NaN` / `±Infinity` → TypeError (not narrowed; treated as an upstream error)
 * 2. 小數向零取整，與 `ToIntegerOrInfinity()` 一致
 *    truncate toward zero, matching `ToIntegerOrInfinity()`
 * 3. 負值代表從尾部往前算：`-1` → `length - 1`
 *    negatives count from the tail: `-1` → `length - 1`
 * 4. 超出 `[0, length]` 自動收窄 / out-of-range bounds auto-narrow
 *
 * @param index 原始邊界 / The raw bound
 * @param length 陣列長度 / The array length
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 正規化後的位置 / The normalised position
 */
export declare function _normalizeSliceIndex(index: number, length: number, name?: string, label?: string): number;
/**
 * slice 風格：把單一含端點邊界正規化成 `[0, length - 1]` 內的實際索引
 * Slice style: normalise a single inclusive bound into an actual index inside `[0, length - 1]`
 *
 * = `_assertInclusiveIndexParams()` + `_fnCoreNormalizeInclusiveIndex()`。
 * = `_assertInclusiveIndexParams()` + `_fnCoreNormalizeInclusiveIndex()`.
 *
 * 與 `normalizeSliceIndex()` 的差別只在上界：含端點的最大值是 `length - 1`，
 * 而負值仍依 `length + index` 從尾部往前算（`-1` → 最後一個索引）。
 * Differs from `normalizeSliceIndex()` only in the upper bound: the largest
 * inclusive value is `length - 1`, while negatives still count from the tail
 * via `length + index` (`-1` → the last index).
 *
 * @param index 原始邊界 / The raw bound
 * @param length 陣列長度，必須大於 0 / The array length, must be greater than 0
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 正規化後的索引 / The normalised index
 */
export declare function _normalizeInclusiveIndex(index: number, length: number, name?: string, label?: string): number;
/**
 * 半開區間政策：正規化 `[start, end)`，收窄後為空則拋出 RangeError
 * Half-open range policy: normalise `[start, end)`, throwing a RangeError when empty after narrowing
 *
 * = 兩次 `_assertSliceIndexParams()` + `_fnCoreNormalizeSliceRange()` + 空區間拋錯。
 * = `_assertSliceIndexParams()` twice + `_fnCoreNormalizeSliceRange()` + empty-range throw.
 *
 * @param start 起始位置（含），缺省 0 / inclusive start position, defaults to 0
 * @param end 結束位置（不含），缺省 `length` / exclusive end position, defaults to `length`
 * @param length 陣列長度 / The array length
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 正規化後的區間 / The normalised range
 */
export declare function _normalizeSliceRange(start: number | null | undefined, end: number | null | undefined, length: number, label?: string): IRange;
/**
 * 含端點政策：正規化 `[min, max]`，`min > max` 時交換兩者
 * Inclusive range policy: normalise `[min, max]`, swapping the two when `min > max`
 *
 * = `assertNotEmptyLength()` + `_fnCoreNormalizeSliceMinMax()`。
 * = `assertNotEmptyLength()` + `_fnCoreNormalizeSliceMinMax()`.
 *
 * 與 `normalizeSliceRange()` 的「空 → 拋錯」**目標不相容**，兩者不可互換。
 * **Incompatible in goal** with the "empty → throws" behaviour of
 * `normalizeSliceRange()`; the two are not interchangeable.
 *
 * @param min 下界（含），缺省 0 / inclusive lower bound, defaults to 0
 * @param max 上界（含），缺省 `length - 1` / inclusive upper bound, defaults to `length - 1`
 * @param length 陣列長度，必須大於 0 / The array length, must be greater than 0
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 正規化後的含端點區間 / The normalised inclusive range
 */
export declare function _normalizeSliceMinMax(min: number | null | undefined, max: number | null | undefined, length: number, label?: string): IMinMax;
/**
 * 驗證陣列非空並回傳其長度，`length === 0` 拋出 RangeError
 * Validate that the array is non-empty and return its length, throws a RangeError when `length === 0`
 *
 * 空陣列無法產生任何合法索引，與其讓取樣期回傳空結果，
 * 不如在建立期就立刻拋錯。
 * An empty array cannot yield any legal index; fail immediately at build
 * time rather than sampling an empty result later.
 *
 * @param arr 目標陣列 / The target array
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 陣列長度 / The array length
 */
export declare function _assertArrayNotEmpty(arr: IArrayLike, label?: string): number;
/**
 * 半開區間便利包裝：正規化陣列的 `start` / `end`
 * Half-open range convenience wrapper: normalise the array's `start` / `end`
 *
 * 委派給 `normalizeSliceRange()`，本身不含額外政策。
 * Delegates to `normalizeSliceRange()` and applies no extra policy.
 *
 * 範例 / examples (以 5 元素陣列 / on a 5-element array):
 *
 * - `normalizeArrayRange(arr)` → `{ start: 0, end: 5 }`
 * - `normalizeArrayRange(arr, -1)` → `{ start: 4, end: 5 }`（最後一個元素 / last element）
 * - `normalizeArrayRange(arr, 0, -1)` → `{ start: 0, end: 4 }`（排除最後一個 / excludes the last）
 * - `normalizeArrayRange(arr, -3, -1)` → `{ start: 2, end: 4 }`（同 `arr.slice(-3, -1)`）
 * - `normalizeArrayRange(arr, 0, 999)` → `{ start: 0, end: 5 }`（超出自動收窄 / auto-narrowed）
 *
 * @param arr 目標陣列 / The target array
 * @param start 起始位置（含），缺省 0 / inclusive start position, defaults to 0
 * @param end 結束位置（不含），缺省為陣列長度 / exclusive end position, defaults to the array length
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 正規化後的區間 / The normalised range
 */
export declare function _normalizeArrayRange(arr: IArrayLike, start?: number | null, end?: number | null, label?: string): IRange;
/**
 * 回傳陣列整段的合法索引區間 `[0, length)`
 * Return the legal index range `[0, length)` of the whole array
 *
 * 空陣列會拋出 RangeError，與 `assertArrayNotEmpty()` 一致。
 * An empty array throws a RangeError, consistent with `assertArrayNotEmpty()`.
 *
 * @param arr 目標陣列 / The target array
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 合法索引區間 / The legal index range
 */
export declare function _calcArrayIndexRange(arr: IArrayLike, label?: string): IRange;
/**
 * slice 風格便利包裝：計算 `arr.slice(start, end)` 的元素數
 * Slice style convenience wrapper: compute how many elements `arr.slice(start, end)` contains
 *
 * 等價於 `normalizeArrayRange()` 後的區間長度，因此同樣支援負值與自動收窄。
 * Equal to the length of the range from `normalizeSliceRange()`, so it supports
 * negatives and auto-narrowing in exactly the same way.
 *
 * @param arr 目標陣列 / The target array
 * @param start 起始位置（含），缺省 0 / inclusive start position, defaults to 0
 * @param end 結束位置（不含），缺省為陣列長度 / exclusive end position, defaults to the array length
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 切片元素數 / The number of sliced elements
 */
export declare function _calcArraySliceSize(arr: IArrayLike, start?: number | null, end?: number | null, label?: string): number;
/**
 * 回傳陣列索引的含端點值域 `[0, length - 1]`
 * Return the inclusive index domain `[0, length - 1]` of an array
 *
 * 這是 `min` / `max` 未輸入時的預設基礎，且**不含**任何收窄或交換。
 * This is the default basis when `min` / `max` are omitted, and it applies
 * **no** narrowing and **no** swapping.
 *
 * @param arr 目標陣列 / The target array
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 含端點的索引值域 / The inclusive index domain
 */
export declare function _calcArrayIndexMinMax(arr: IArrayLike, label?: string): IMinMax;
/**
 * 嚴格政策：驗證陣列索引的含端點 `min` / `max`（缺省時以整個陣列為基礎）
 * Strict policy: validate the array-index inclusive `min` / `max` (defaults to the whole array when omitted)
 *
 * - 未輸入 `min` → `0`，未輸入 `max` → `length - 1`
 *   omitted `min` → `0`, omitted `max` → `length - 1`
 * - `undefined` / `null` 皆視為未輸入 / both `undefined` and `null` count as omitted
 * - 負值**先解析記法**（`-1` → `length - 1`），這屬於 array API 慣例而非越界；
 *   驗證的是「解析後的索引」是否落在 `[0, length - 1]`
 *   negatives **resolve their notation first** (`-1` → `length - 1`), which is an
 *   array API convention rather than an out-of-range value; what is validated is
 *   whether the *resolved* index lands inside `[0, length - 1]`
 * - 不做收窄、不做交換：解析後越界或 `min > max` 一律拋錯
 *   no narrowing and no swapping: a resolved out-of-range value or `min > max`
 *   always throws
 *
 * 與 `normalizeArrayIndexMinMax()` 的**目標不相容**（驗證 vs 修正），按需選用其一。
 * **Incompatible in goal** with `normalizeArrayIndexMinMax()` (validating vs
 * correcting); pick one on demand.
 *
 * @param arr 目標陣列 / The target array
 * @param min 下界（含），缺省 0 / inclusive lower bound, defaults to 0
 * @param max 上界（含），缺省 `length - 1` / inclusive upper bound, defaults to `length - 1`
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 已驗證的含端點索引值域 / The validated inclusive index domain
 */
export declare function _assertArrayIndexMinMax(arr: IArrayLike, min?: number | null, max?: number | null, label?: string): IMinMax;
/**
 * 修正政策：正規化陣列索引的含端點 `min` / `max`（缺省時以整個陣列為基礎）
 * Correcting policy: normalise the array-index inclusive `min` / `max` (defaults to the whole array when omitted)
 *
 * 委派給 `normalizeSliceMinMax()`：負值從尾部往前算、越界自動收窄、
 * `min > max` 交換。與 `assertArrayIndexMinMax()` 目標不相容，按需選用其一。
 * Delegates to `normalizeSliceMinMax()`: negatives count from the tail,
 * out-of-range bounds auto-narrow, and `min > max` swaps. Incompatible in goal
 * with `assertArrayIndexMinMax()`; pick one on demand.
 *
 * @param arr 目標陣列 / The target array
 * @param min 下界（含），缺省 0 / inclusive lower bound, defaults to 0
 * @param max 上界（含），缺省 `length - 1` / inclusive upper bound, defaults to `length - 1`
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 修正後的含端點索引值域 / The corrected inclusive index domain
 */
export declare function _normalizeArrayIndexMinMax(arr: IArrayLike, min?: number | null, max?: number | null, label?: string): IMinMax;
/**
 * slice 風格便利包裝：計算陣列子區間的合法索引值
 * Slice style convenience wrapper: compute the legal index values of an array sub-range
 *
 * 同 `normalizeSliceRange()`：負值從尾部往前算、超出範圍自動收窄；
 * 只有收窄後為空（或陣列本身為空）才拋出 RangeError。
 * Same as `normalizeSliceRange()`: negatives count from the tail and
 * out-of-range bounds auto-narrow; only an empty result (or an empty array)
 * throws a RangeError.
 *
 * @param arr 目標陣列 / The target array
 * @param start 起始位置（含），缺省 0 / inclusive start position, defaults to 0
 * @param end 結束位置（不含），缺省為陣列長度 / exclusive end position, defaults to the array length
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
export declare function _calcExpectedValuesByArray(arr: IArrayLike, start?: number | null, end?: number | null, label?: string): IExpectedValues;
/**
 * 含端點便利包裝：以陣列為基礎，由 `min` / `max` 計算合法索引值
 * Inclusive convenience wrapper: compute the legal index values from `min` / `max`, based on an existing array
 *
 * 對應 `int(random, min, max)`：先用 `normalizeSliceMinMax()` 補齊缺省值、
 * 處理負值與越界，再轉成半開區間 `[min, max + 1)`。
 * Mirrors `int(random, min, max)`: `normalizeSliceMinMax()` first fills in the
 * defaults and handles negatives / out-of-range bounds, then the result is
 * shifted to the half-open interval `[min, max + 1)`.
 *
 * 未輸入 `min` / `max` 時等同取整段陣列索引。
 * Omitting both `min` and `max` spans the whole array index domain.
 *
 * 要改用嚴格政策時，改呼叫 `assertArrayIndexMinMax()` + `calcExpectedValuesByMinMax()`。
 * To use the strict policy instead, call `assertArrayIndexMinMax()` +
 * `calcExpectedValuesByMinMax()` yourself.
 *
 * @param arr 目標陣列 / The target array
 * @param min 下界（含），缺省 0 / inclusive lower bound, defaults to 0
 * @param max 上界（含），缺省 `length - 1` / inclusive upper bound, defaults to `length - 1`
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
export declare function _calcExpectedValuesByArrayMinMax(arr: IArrayLike, min?: number | null, max?: number | null, label?: string): IExpectedValues;
/**
 * 嚴格口徑：min / max 皆為整數（可為負數），且不得 `min > max`
 * Strict style: both min and max are integers (negatives allowed) and `min > max` is rejected
 *
 * 沒有陣列邊界可收窄，因此這裡維持驗證而非修正。
 * There is no array bound to narrow against, so this stays validating
 * rather than correcting.
 *
 * @param min 下界（含）/ Lower bound, inclusive
 * @param max 上界（含）/ Upper bound, inclusive
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 已驗證的閉區間 / The validated interval
 */
export declare function _assertMinMax(min: number, max: number, label?: string): IMinMax;
/**
 * 修正口徑：若 `min > max` 則交換兩者，回傳有序的 min / max
 * Correcting style: swap the two when `min > max`, returning an ordered min / max
 *
 * = `assertIntegerInRange()` × 2 + `_fnCoreOrderMinMax()`。
 * 只修正大小關係，非整數仍會拋出 TypeError。
 * = `assertIntegerInRange()` × 2 + `_fnCoreOrderMinMax()`.
 * Only the ordering is corrected; non-integers still throw a TypeError.
 *
 * @param min 下界（含）/ Lower bound, inclusive
 * @param max 上界（含）/ Upper bound, inclusive
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 修正後的閉區間 / The corrected interval
 */
export declare function _normalizeMinMax(min: number, max: number, label?: string): IMinMax;
/**
 * 大小值修正：把值夾進閉區間 `[min, max]`
 * Size correction: clamp a value into the inclusive interval `[min, max]`
 *
 * = `assertMinMaxOrder()` + `_fnCoreClamp()`。
 * 僅驗證上下界順序，不強制整數，因此也可用於浮點數。
 * = `assertMinMaxOrder()` + `_fnCoreClamp()`.
 * Only the bound ordering is validated; integers are not required,
 * so it works for floats as well.
 *
 * @param value 待夾取的值 / The value to clamp
 * @param min 下界（含）/ Lower bound, inclusive
 * @param max 上界（含）/ Upper bound, inclusive
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 夾取後的值 / The clamped value
 */
export declare function _clampValue(value: number, min: number, max: number, label?: string): number;
/**
 * 大小值修正：把整數 `size` 夾進 `[0, max]`
 * Size correction: clamp an integer `size` into `[0, max]`
 *
 * = `assertIntegerInRange()` × 2 + `_fnCoreClamp()`。
 * `max` 通常代表可用上限（例如陣列長度）：需求超過可用範圍時縮小規模，
 * 負數需求則歸零，而不是讓迴圈多跑無意義的嘗試。
 * = `assertIntegerInRange()` × 2 + `_fnCoreClamp()`.
 * `max` is usually the available ceiling (e.g. an array length): an oversized
 * request shrinks to fit, and a negative request becomes 0, instead of letting
 * the loop burn pointless attempts.
 *
 * @param size 需求數量 / The requested size
 * @param max 可用上限 / The available ceiling
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 修正後的 size / The corrected size
 */
export declare function _clampSize(size: number, max: number, label?: string): number;
/**
 * 驗證口徑：`size` 必須是 `[MIN_LENGTH, MAX_LENGTH]` 內的整數
 * Strict style: `size` must be an integer inside `[MIN_LENGTH, MAX_LENGTH]`
 *
 * @param size 需求數量 / The requested size
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該 size 以便串接 / Returns the size for chaining
 */
export declare function _assertSize(size: number, label?: string): number;
/**
 * 驗證口徑：`size` 必須是 `[MIN_LENGTH, max]` 內的整數
 * Strict style: `size` must be an integer inside `[MIN_LENGTH, max]`
 *
 * `max` 通常代表可用上限（例如陣列長度）；當可用上限不足 `MIN_LENGTH`
 * 時（例如空陣列），沒有任何 size 合法，直接拋出較易懂的 RangeError。
 * `max` is usually the available ceiling (e.g. an array length). When the
 * ceiling is below `MIN_LENGTH` (e.g. an empty array) no size can be legal,
 * so a clearer RangeError is thrown up front.
 *
 * @param size 需求數量 / The requested size
 * @param max 可用上限 / The available ceiling
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該 size 以便串接 / Returns the size for chaining
 */
export declare function _assertSizeInRange(size: number, max: number, label?: string): number;
/**
 * 由含端點的 min / max 計算合法值（支援負數）
 * Compute legal values from an inclusive min / max (negatives supported)
 *
 * `int(random, min, max)` 採含端點語意，因此轉成半開區間 `[min, max + 1)`。
 * `int(random, min, max)` is inclusive, so it is shifted to the half-open
 * interval `[min, max + 1)`.
 *
 * `min === max` 是合法的單一值區間；`min > max` 會先由 `assertMinMax()` 擋下；
 * `max` 為 `SAFE_INTEGER_MAX` 時 `max + 1` 會溢位，由 `assertRangeParams()` 擋下。
 * `min === max` is a legal single-value range; `min > max` is rejected by
 * `assertMinMax()` first; `max + 1` overflows when `max` is `SAFE_INTEGER_MAX`,
 * which is rejected by `assertRangeParams()`.
 *
 * @param min 下界（含）/ Lower bound, inclusive
 * @param max 上界（含）/ Upper bound, inclusive
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
export declare function _calcExpectedValuesByMinMax(min: number, max: number, label?: string): IExpectedValues;
/**
 * 彙整 `randIndexByLength`、`float`、`int` 的預設導出 (Default Export) 集合，
 * 便於以屬性 (Property) 方式一次取得常用分布工具。
 * Default export bundling `randIndexByLength`, `float`, and `int` for property-style access
 * to the common distribution utilities.
 */
declare const UtilDistributions: {
	randIndexByLength: typeof randIndexByLength;
	randIndexWithRange: typeof randIndexWithRange;
	float: typeof float;
	int: typeof int;
};

export {
	UtilDistributions as default,
};

export {};
