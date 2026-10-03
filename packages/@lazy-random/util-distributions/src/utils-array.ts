/**
 * 陣列 (Array) 相關的驗證與計算輔助 / Validation and calculation helpers for arrays
 *
 * 延續 `utils.ts`「範圍 (Range) 為單一事實來源」的設計。
 * 本檔刻意分成四層，**每一層都能單獨取用，不強制互相包裝**：
 *
 * Extend the "range is the single source of truth" design of `utils.ts`.
 * This file is deliberately split into four layers, **each usable on its own,
 * with no forced wrapping between them**:
 *
 * ## 1. core：標準化參數，永不拋錯 / Core: normalises, never throws
 *
 * `_fnCore*` 只做計算，`NaN` / `±Infinity` 原樣流出，不決定要拋錯還是收窄：
 * `_fnCore*` only computes; `NaN` / `±Infinity` flow through untouched, and it
 * decides neither to throw nor to narrow:
 *
 * - `_fnCoreNormalizeSliceIndex(index, length)` — 半開邊界 `[0, length]`
 * - `_fnCoreNormalizeInclusiveIndex(index, length)` — 含端點邊界 `[0, length - 1]`
 * - `_fnCoreNormalizeSliceRange(...)` / `_fnCoreNormalizeSliceMinMax(...)`
 * - `_fnCoreResolveTailIndex(...)` / `_fnCoreClamp(...)` / `_fnCoreOrderMinMax(...)`
 * - `_fnCoreArrayLength(arr)` — 讀 `length`，非數值回 `NaN`
 *
 * **分層是為了大量執行的效率**：上層 `assert*` 驗過一次之後，
 * 下層 core 就不再重複驗證同一份輸入，熱路徑上少一輪判斷。
 * **The layering exists for throughput**: once the `assert*` layer has validated
 * an input, the core below does not validate it again, saving a round of checks
 * on every hot-path call.
 *
 * 前置條件（例如含端點的 `length >= 1`、`min <= max`）一律由上層把關；
 * 只要上層驗證正確，底層就不會收到非法輸入。
 * Preconditions (such as `length >= 1` for inclusive bounds, or `min <= max`)
 * are guarded by the layer above; if that layer validates correctly, the layer
 * below never sees an illegal input.
 *
 * ## 1b. assert：只做拋錯，不做標準化 / Assert: only throws, no normalisation
 *
 * 給「要擋住非法輸入」的呼叫端用，可單獨取用或疊在 core 之上：
 * For callers that want illegal input rejected; usable alone or stacked on top
 * of a core:
 *
 * - `assertNotEmptyLength(length)` / `assertArrayNotEmpty(arr)`
 * - `assertMinMaxOrder(min, max)` — 與 `_fnCoreOrderMinMax()` 一體兩面
 *   the mirror image of `_fnCoreOrderMinMax()`
 *
 * ## 2. 原子計算：assert + core 組合 / Atomic calculations: assert + core
 *
 * 只吃 `length` 與邊界，不碰陣列、不套任何政策，可直接拿去組合：
 * Take only a `length` and bounds; they touch no array and apply no policy,
 * so they can be composed freely:
 *
 * - `normalizeSliceIndex(index, length)` = `_assertSliceIndexParams()` + core
 * - `normalizeInclusiveIndex(index, length)` = `_assertInclusiveIndexParams()` + core
 * - `calcArrayLength(arr)` / `assertNotEmptyLength(length)` — 長度本身
 *
 * ## 3. 區間政策 / Range policies
 *
 * 決定「正規化之後該怎麼辦」，彼此**目標不相容，不可互相取代**：
 * Decide what happens *after* normalising; they are **incompatible by goal and
 * are not interchangeable**:
 *
 * - `normalizeSliceRange(start, end, length)` — 半開區間，空 → 拋錯
 *   half-open range, empty → throws
 * - `normalizeSliceMinMax(min, max, length)` — 含端點，`min > max` → 交換
 *   inclusive range, `min > max` → swapped
 * - `assertMinMax(...)` / `assertSize(...)` — 嚴格驗證，不修正、不收窄
 *   strict validation, no correcting and no narrowing
 *
 * ## 4. array 便利包裝 / Array convenience wrappers
 *
 * 只負責把 `arr` 換成 `length`，再委派給上面兩層；本身不含額外邏輯。
 * Only turn `arr` into a `length` and delegate to the layers above; they hold
 * no logic of their own:
 *
 * - `normalizeArrayRange` / `calcArrayIndexRange` / `calcArraySliceSize`
 * - `calcArrayIndexMinMax` / `assertArrayIndexMinMax` / `normalizeArrayIndexMinMax`
 *
 * ## slice 風格規則 / Slice-style rules
 *
 * 對齊 `Array.prototype.slice()`，但有兩處刻意不同：
 * Aligned with `Array.prototype.slice()`, with two deliberate differences:
 *
 * 1. 負值代表從尾部往前算：`-1` 即最後一個元素
 *    negatives count from the tail: `-1` is the last element
 * 2. 超出 `[0, length]` 的邊界只會被收窄 (narrowed)，不會直接報錯；
 *    只有「收窄之後區間為空」才拋出 RangeError
 *    bounds outside `[0, length]` are only narrowed, never rejected on their own;
 *    a RangeError is thrown only when the range is empty *after* narrowing
 * 3. 例外：`NaN` / `±Infinity` 一律拋出 TypeError。它們通常代表上游計算出錯，
 *    靜默收窄反而會掩蓋 bug
 *    exception: `NaN` / `±Infinity` always throw a TypeError. They usually mean an
 *    upstream bug, and silently narrowing them would only hide that bug
 *
 * ## 以 array 為基礎 / On the basis of an existing array
 *
 * `min` / `max` 相關的 array 版輔助都假設「陣列已經存在」，因此：
 * The array-flavoured min / max helpers all assume an array already exists, so:
 *
 * - 未輸入 `min` → 補 `0`（第一個索引）
 *   omitted `min` → defaults to `0` (the first index)
 * - 未輸入 `max` → 補 `length - 1`（最後一個索引）
 *   omitted `max` → defaults to `length - 1` (the last index)
 * - `undefined` / `null` 皆視為未輸入
 *   both `undefined` and `null` count as omitted
 * - 陣列為空 → 沒有任何索引可用，直接拋出 RangeError
 *   empty array → no index is usable at all, so a RangeError is thrown
 *
 * 只想拿預設值域、不要任何收窄或交換時，直接呼叫原子層即可：
 * When only the default domain is wanted, with no narrowing and no swapping,
 * call the atomic layer directly:
 *
 * ```ts
 * normalizeSliceMinMax(null, null, arr.length)  // → { min: 0, max: length - 1 }
 * ```
 *
 * 注意 `min` / `max` 是**含端點**的值域，與 `start` / `end` 的半開區間不同：
 * `normalizeArrayIndexMinMax(arr, null, -1)` 的 `-1` 指「最後一個元素」，因此是整段；
 * 而 `normalizeArrayRange(arr, 0, -1)` 的 `-1` 會排除最後一個元素。
 * Note that `min` / `max` are an *inclusive* domain, unlike the half-open
 * `start` / `end`: `normalizeArrayIndexMinMax(arr, null, -1)` means "the last
 * element" and therefore spans the whole array, while
 * `normalizeArrayRange(arr, 0, -1)` excludes the last element.
 */

import {
	type IExpectedValues,
	type IRange,
	MAX_LENGTH,
	MIN_LENGTH,
	SAFE_INTEGER_MAX,
	SAFE_INTEGER_MIN,
	_fnCoreToInteger,
	_assertFiniteNumber as _assertFiniteNumber,
	_assertInteger as _assertInteger,
	_assertIntegerInRange as _assertIntegerInRange,
	_assertRangeParams as _assertRangeParams,
	_calcExpectedValues as _calcExpectedValues,
	_calcRangeSize as _calcRangeSize,
	_isFiniteNumber,
} from './utils';

/**
 * 只需讀取 `length` 的陣列型別（陣列、字串、類陣列物件皆可）
 * Array-like type that only requires `length` (arrays, strings and array-likes all qualify)
 */
export interface IArrayLike
{
	readonly length: number
}

/**
 * 含端點的閉區間 `[min, max]` / Inclusive interval `[min, max]`
 */
export interface IMinMax
{
	/**
	 * 下界（含）/ Lower bound, inclusive
	 */
	min: number
	/**
	 * 上界（含）/ Upper bound, inclusive
	 */
	max: number
}

/* ******************************************************************* *
 * 1. core：標準化參數，永不拋錯 / Normalise parameters, never throws
 *
 * 這一層只做計算，`NaN` / `±Infinity` 原樣流出，不決定要拋錯還是收窄。
 * This layer only computes; `NaN` / `±Infinity` flow through untouched, and it
 * decides neither to throw nor to narrow.
 * ******************************************************************* */

/**
 * 判斷陣列是否為空（`length === 0`）
 * Check whether an array is empty (`length === 0`)
 *
 * @param arr 目標陣列 / The target array
 * @returns 是否為空 / Whether the array is empty
 */
export function _isArrayEmpty(arr: IArrayLike): boolean
{
	return arr.length === 0;
}

/**
 * 讀取 `length`，不拋錯；非數值時回傳 `NaN`
 * Read `length` without throwing; returns `NaN` when it is not a number
 *
 * @param arr 目標陣列 / The target array
 * @returns 陣列長度或 `NaN` / The array length or `NaN`
 */
export function _fnCoreArrayLength(arr: IArrayLike): number
{
	const length = arr?.length;

	return typeof length === 'number' ? length : NaN;
}

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
export function _fnCoreClamp(value: number, min: number, max: number): number
{
	return Math.min(Math.max(value, min), max);
}

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
export function _fnCoreResolveTailIndex(index: number, length: number): number
{
	const truncated = _fnCoreToInteger(index);

	/**
	 * 負值代表從尾部往前算：`length + (-1)` 即最後一個位置
	 * Negatives count from the tail: `length + (-1)` is the last position.
	 */
	return truncated < 0 ? length + truncated : truncated;
}

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
export function _fnCoreNormalizeSliceIndex(index: number, length: number): number
{
	return _fnCoreClamp(_fnCoreResolveTailIndex(index, length), 0, length);
}

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
export function _fnCoreNormalizeInclusiveIndex(index: number, length: number): number
{
	return _fnCoreClamp(_fnCoreResolveTailIndex(index, length), 0, length - 1);
}

/**
 * 半開區間 core：正規化 `[start, end)`，不檢查是否為空
 * Half-open range core: normalise `[start, end)` without checking emptiness
 *
 * @param start 起始位置（含），缺省 0 / inclusive start position, defaults to 0
 * @param end 結束位置（不含），缺省 `length` / exclusive end position, defaults to `length`
 * @param length 陣列長度 / The array length
 * @returns 正規化後的區間，可能為空 / The normalised range, which may be empty
 */
export function _fnCoreNormalizeSliceRange(start: number | null | undefined, end: number | null | undefined, length: number): IRange
{
	/**
	 * undefined / null 視為「未傳入」，比 slice() 更寬鬆：
	 * slice(0, null) 會把 null 轉成 0 而得到空陣列，這裡則視為缺省。
	 * undefined / null are treated as "not passed", which is friendlier than
	 * slice(): slice(0, null) converts null to 0 and yields an empty array,
	 * whereas here it is treated as omitted.
	 */
	return {
		start: _fnCoreNormalizeSliceIndex(start ?? 0, length),
		end: _fnCoreNormalizeSliceIndex(end ?? length, length),
	};
}

/**
 * 含端點 core：正規化 `[min, max]`，`min > max` 時交換，不檢查空陣列
 * Inclusive range core: normalise `[min, max]`, swapping when `min > max`, with no empty-array check
 *
 * @param min 下界（含），缺省 0 / inclusive lower bound, defaults to 0
 * @param max 上界（含），缺省 `length - 1` / inclusive upper bound, defaults to `length - 1`
 * @param length 陣列長度 / The array length
 * @returns 正規化後的含端點區間 / The normalised inclusive range
 */
export function _fnCoreNormalizeSliceMinMax(min: number | null | undefined, max: number | null | undefined, length: number): IMinMax
{
	let normalizedMin = _fnCoreNormalizeInclusiveIndex(min ?? 0, length);
	let normalizedMax = _fnCoreNormalizeInclusiveIndex(max ?? (length - 1), length);

	/**
	 * `min > max` 交換而非拋錯：這是「修正」而非「驗證」，
	 * 反轉的上下界仍是合法的值域，只是寫反了。
	 *
	 * `min > max` swaps instead of throwing: this is *correction*, not
	 * *validation* — reversed bounds are still a legal domain, just written backwards.
	 */
	if (normalizedMin > normalizedMax)
	{
		[normalizedMin, normalizedMax] = [normalizedMax, normalizedMin];
	}

	return {
		min: normalizedMin,
		max: normalizedMax,
	};
}

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
export function _fnCoreOrderMinMax(min: number, max: number): IMinMax
{
	return min > max ? { min: max, max: min } : { min, max };
}

/* ******************************************************************* *
 * 1b. assert：只做拋錯，不負責標準化 / Assert: only throws, performs no normalisation
 * ******************************************************************* */

/**
 * 驗證「半開邊界」參數：`length` 為合法整數、邊界為有限值
 * Validate *half-open bound* parameters: `length` is a legal integer and the bound is finite
 *
 * 只拋錯，不做任何正規化；正規化交給 `_fnCoreNormalizeSliceIndex()`。
 * Only throws and performs no normalisation; normalisation belongs to
 * `_fnCoreNormalizeSliceIndex()`.
 *
 * @param index 原始邊界 / The raw bound
 * @param length 陣列長度 / The array length
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 */
function _assertSliceIndexParams(index: number, length: number, name: string, label: string): void
{
	_assertIntegerInRange(length, 0, SAFE_INTEGER_MAX, 'length', label);
	_assertFiniteNumber(index, name, label);
}

/**
 * 驗證「含端點邊界」參數：`length` 必須大於 0、邊界為有限值
 * Validate *inclusive bound* parameters: `length` must be greater than 0 and the bound finite
 *
 * 只拋錯，不做任何正規化；正規化交給 `_fnCoreNormalizeInclusiveIndex()`。
 * Only throws and performs no normalisation; normalisation belongs to
 * `_fnCoreNormalizeInclusiveIndex()`.
 *
 * @param index 原始邊界 / The raw bound
 * @param length 陣列長度 / The array length
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 */
function _assertInclusiveIndexParams(index: number, length: number, name: string, label: string): void
{
	_assertNotEmptyLength(length, 'length', label);
	_assertFiniteNumber(index, name, label);
}

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
export function _assertMinMaxOrder(min: number, max: number, label: string): void
{
	if (min > max)
	{
		throw new RangeError(`[${label}] max must be greater than or equal to min: min=${min}, max=${max}`);
	}
}

/* ******************************************************************* *
 * 2. 原子計算：assert + core 組合 / Atomic calculations: assert + core composed
 * ******************************************************************* */

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
export function _calcArrayLength(arr: IArrayLike, label = '_calcArrayLength'): number
{
	const length = _fnCoreArrayLength(arr);

	if (!_isFiniteNumber(length))
	{
		throw new TypeError(`[${label}] parameter must be an array-like object with a numeric length: length=${String(arr?.length)}`);
	}

	return _assertIntegerInRange(length, 0, SAFE_INTEGER_MAX, 'length', label);
}

/**
 * 驗證純數值長度必須大於 0，否則拋出 RangeError
 * Validate that a plain length is greater than 0, throws a RangeError otherwise
 *
 * @param length 待驗證的長度 / The length to validate
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該長度以便串接 / Returns the length for chaining
 */
export function _assertNotEmptyLength(length: number, name = 'length', label = '_assertNotEmptyLength'): number
{
	_assertIntegerInRange(length, 0, SAFE_INTEGER_MAX, name, label);

	if (length === 0)
	{
		throw new RangeError(`[${label}] array must not be empty: ${name}=0`);
	}

	return length;
}

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
export function _normalizeSliceIndex(index: number, length: number, name = 'index', label = '_normalizeSliceIndex'): number
{
	_assertSliceIndexParams(index, length, name, label);

	return _fnCoreNormalizeSliceIndex(index, length);
}

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
export function _normalizeInclusiveIndex(index: number, length: number, name = 'index', label = '_normalizeInclusiveIndex'): number
{
	_assertInclusiveIndexParams(index, length, name, label);

	return _fnCoreNormalizeInclusiveIndex(index, length);
}

/* ******************************************************************* *
 * 3. 區間政策：assert + core 組合 / Range policies: assert + core composed
 *
 * 這一層決定「正規化之後該怎麼辦」，彼此目標不相容，按需選用。
 * This layer decides "what to do after normalising"; the goals are mutually
 * incompatible, so pick one on demand.
 * ******************************************************************* */

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
export function _normalizeSliceRange(start: number | null | undefined, end: number | null | undefined, length: number, label = '_normalizeSliceRange'): IRange
{
	_assertSliceIndexParams(start ?? 0, length, 'start', label);
	_assertSliceIndexParams(end ?? length, length, 'end', label);

	const range = _fnCoreNormalizeSliceRange(start, end, length);

	/**
	 * 超出範圍只會收窄；收窄後為空才代表真的沒有東西可取
	 * Out-of-range bounds only narrow; emptiness *after* narrowing means
	 * there is genuinely nothing to take.
	 */
	if (range.start >= range.end)
	{
		throw new RangeError(`[${label}] range must not be empty: start=${range.start}, end=${range.end}`);
	}

	return range;
}

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
export function _normalizeSliceMinMax(min: number | null | undefined, max: number | null | undefined, length: number, label = '_normalizeSliceMinMax'): IMinMax
{
	/**
	 * 政策層仍須擋 NaN / ±Infinity：只有 `_fnCore*` 才允許不拋錯
	 * The policy layer still rejects NaN / ±Infinity: only `_fnCore*` may skip throwing
	 */
	_assertInclusiveIndexParams(min ?? 0, length, 'min', label);
	_assertInclusiveIndexParams(max ?? (length - 1), length, 'max', label);

	return _fnCoreNormalizeSliceMinMax(min, max, length);
}

/* ******************************************************************* *
 * 4. array 便利包裝 / Array convenience wrappers
 *
 * 只負責把 `arr` 換成 `length` 再委派，本身不含額外邏輯。
 * Only turn `arr` into a `length` and delegate; they hold no logic of their own.
 * ******************************************************************* */

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
export function _assertArrayNotEmpty(arr: IArrayLike, label = '_assertArrayNotEmpty'): number
{
	return _assertNotEmptyLength(_calcArrayLength(arr, label), 'length', label);
}

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
export function _normalizeArrayRange(arr: IArrayLike, start?: number | null, end?: number | null, label = '_normalizeArrayRange'): IRange
{
	return _normalizeSliceRange(start, end, _assertArrayNotEmpty(arr, label), label);
}

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
export function _calcArrayIndexRange(arr: IArrayLike, label = '_calcArrayIndexRange'): IRange
{
	return _assertRangeParams(0, _assertArrayNotEmpty(arr, label), label);
}

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
export function _calcArraySliceSize(arr: IArrayLike, start?: number | null, end?: number | null, label = '_calcArraySliceSize'): number
{
	const range = _normalizeSliceRange(start, end, _assertArrayNotEmpty(arr, label), label);

	return _calcRangeSize(range.start, range.end);
}

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
export function _calcArrayIndexMinMax(arr: IArrayLike, label = '_calcArrayIndexMinMax'): IMinMax
{
	const length = _assertArrayNotEmpty(arr, label);

	return { min: 0, max: length - 1 };
}

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
export function _assertArrayIndexMinMax(arr: IArrayLike, min?: number | null, max?: number | null, label = '_assertArrayIndexMinMax'): IMinMax
{
	const domain = _calcArrayIndexMinMax(arr, label);
	const length = domain.max + 1;

	/**
	 * 先驗證型別（assert），再解析記法（core，不收窄）
	 * Validate the type first (assert), then resolve the notation (core, no narrowing)
	 */
	const resolve = (value: number, name: string) =>
	{
		_assertFiniteNumber(value, name, label);
		_assertInteger(value, name, label);

		return _fnCoreResolveTailIndex(value, length);
	};

	const normalizedMin = _assertIntegerInRange(resolve(min ?? domain.min, 'min'), domain.min, domain.max, 'min', label);
	const normalizedMax = _assertIntegerInRange(resolve(max ?? domain.max, 'max'), domain.min, domain.max, 'max', label);

	_assertMinMaxOrder(normalizedMin, normalizedMax, label);

	return { min: normalizedMin, max: normalizedMax };
}

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
export function _normalizeArrayIndexMinMax(arr: IArrayLike, min?: number | null, max?: number | null, label = '_normalizeArrayIndexMinMax'): IMinMax
{
	return _normalizeSliceMinMax(min, max, _assertArrayNotEmpty(arr, label), label);
}

/* ******************************************************************* *
 * 5. 合法值計算 / Legal-value calculations
 *
 * 組合「政策 + `utils.ts` 的 `calcExpectedValues()`」，仍是可選的便利層；
 * 不想套該政策時，直接用原子層自行組合即可。
 * Combine "a policy + `calcExpectedValues()` from `utils.ts`". Still an optional
 * convenience layer: when that policy is not wanted, compose from the atomic
 * layer directly.
 * ******************************************************************* */

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
export function _calcExpectedValuesByArray(arr: IArrayLike, start?: number | null, end?: number | null, label = '_calcExpectedValuesByArray'): IExpectedValues
{
	const length = _assertArrayNotEmpty(arr, label);
	const range = _normalizeSliceRange(start, end, length, label);

	return _calcExpectedValues(range.start, range.end, {
		length,
		start: range.start,
		end: range.end,
	}, label);
}

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
export function _calcExpectedValuesByArrayMinMax(arr: IArrayLike, min?: number | null, max?: number | null, label = '_calcExpectedValuesByArrayMinMax'): IExpectedValues
{
	const length = _assertArrayNotEmpty(arr, label);
	const range = _normalizeSliceMinMax(min, max, length, label);

	return _calcExpectedValues(range.min, range.max + 1, {
		length,
		min: range.min,
		max: range.max,
	}, label);
}

/* ******************************************************************* *
 * 6. 無陣列基礎的 min / max 與 size / Array-independent min / max and size
 *
 * 這幾組不依賴任何陣列，也不會自動補陣列預設值，可獨立取用。
 * These do not depend on any array and never fill in array-derived defaults;
 * they are usable on their own.
 * ******************************************************************* */

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
export function _assertMinMax(min: number, max: number, label = '_assertMinMax'): IMinMax
{
	_assertIntegerInRange(min, SAFE_INTEGER_MIN, SAFE_INTEGER_MAX, 'min', label);
	_assertIntegerInRange(max, SAFE_INTEGER_MIN, SAFE_INTEGER_MAX, 'max', label);
	_assertMinMaxOrder(min, max, label);

	return { min, max };
}

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
export function _normalizeMinMax(min: number, max: number, label = '_normalizeMinMax'): IMinMax
{
	_assertIntegerInRange(min, SAFE_INTEGER_MIN, SAFE_INTEGER_MAX, 'min', label);
	_assertIntegerInRange(max, SAFE_INTEGER_MIN, SAFE_INTEGER_MAX, 'max', label);

	return _fnCoreOrderMinMax(min, max);
}

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
export function _clampValue(value: number, min: number, max: number, label = '_clampValue'): number
{
	_assertMinMaxOrder(min, max, label);

	return _fnCoreClamp(value, min, max);
}

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
export function _clampSize(size: number, max: number, label = '_clampSize'): number
{
	_assertIntegerInRange(size, SAFE_INTEGER_MIN, SAFE_INTEGER_MAX, 'size', label);
	_assertIntegerInRange(max, 0, SAFE_INTEGER_MAX, 'max', label);

	return _fnCoreClamp(size, 0, max);
}

/**
 * 驗證口徑：`size` 必須是 `[MIN_LENGTH, MAX_LENGTH]` 內的整數
 * Strict style: `size` must be an integer inside `[MIN_LENGTH, MAX_LENGTH]`
 *
 * @param size 需求數量 / The requested size
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該 size 以便串接 / Returns the size for chaining
 */
export function _assertSize(size: number, label = '_assertSize'): number
{
	return _assertIntegerInRange(size, MIN_LENGTH, MAX_LENGTH, 'size', label);
}

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
export function _assertSizeInRange(size: number, max: number, label = '_assertSizeInRange'): number
{
	_assertIntegerInRange(max, 0, SAFE_INTEGER_MAX, 'max', label);

	if (max < MIN_LENGTH)
	{
		throw new RangeError(`[${label}] no size is legal: max=${max}, expected max >= ${MIN_LENGTH}`);
	}

	return _assertIntegerInRange(size, MIN_LENGTH, max, 'size', label);
}

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
export function _calcExpectedValuesByMinMax(min: number, max: number, label = '_calcExpectedValuesByMinMax'): IExpectedValues
{
	const range = _assertMinMax(min, max, label);

	return _calcExpectedValues(range.min, range.max + 1, {
		min: range.min,
		max: range.max,
	}, label);
}
