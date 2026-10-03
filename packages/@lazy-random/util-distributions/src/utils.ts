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
 */

/**
 * 半開區間 `[start, end)` / Half-open interval
 */
export interface IRange
{
	/**
	 * 起始值（含，Inclusive）/ Start value, inclusive
	 */
	start: number
	/**
	 * 結束值（不含，Exclusive）/ End value, exclusive
	 */
	end: number
}

/**
 * 合法值的計算結果 / Result of the computed legal values
 */
export interface IExpectedValues
{
	/**
	 * 合法參數值（原始函式參數）/ The legal parameter values (original function arguments)
	 */
	params: Readonly<Record<string, number>>
	/**
	 * 合法值區間 `[start, end)` / The legal value interval `[start, end)`
	 */
	range: Readonly<IRange>
	/**
	 * 合法值的數量 / The count of legal values
	 */
	size: number
	/**
	 * 生成器工廠，惰性列舉合法值 / Generator factory that lazily enumerates the legal values
	 *
	 * 每次呼叫都會產生新的生成器，可重複列舉。
	 * Each call returns a new generator, so the values can be enumerated repeatedly.
	 */
	valuesGenerator(): Generator<number>
}

/**
 * 已收集值的驗證器 / Validator for the collected values
 */
export interface IValuesValidator
{
	/**
	 * 錯誤訊息用的標籤 / The label used in error messages
	 */
	label: string
	/**
	 * 合法參數值與合法值 / The legal parameter values and legal values
	 */
	expected: IExpectedValues
	/**
	 * 已收集到的不同值數量 / The number of distinct values collected so far
	 */
	size: number
	/**
	 * 實際取值次數 / The number of samples actually taken
	 */
	total: number
	/**
	 * 驗證單一值的合法性並記錄，不合法時拋出錯誤
	 * Validate a single value and record it, throws when the value is illegal
	 *
	 * @param value 待驗證的值 / The value to validate
	 * @returns 回傳該值以便串接 / Returns the value for chaining
	 */
	check(value: number): number
	/**
	 * 驗證所有預期值皆出現過，有遺漏時拋出錯誤
	 * Ensure every expected value appeared at least once, throws when any is missing
	 */
	verifyAllSeen(): void
	/**
	 * 以生成器列舉出現值，順序依合法值（由小到大）
	 * Enumerate the seen values with a generator, in legal-value order (ascending)
	 */
	seenValuesGenerator(): Generator<number>
	/**
	 * 以生成器列舉未出現的預期值 / Enumerate the expected values that never appeared with a generator
	 */
	missingValuesGenerator(): Generator<number>
	/**
	 * 以生成器列舉非法值 / Enumerate the illegal values with a generator
	 */
	illegalValuesGenerator(): Generator<number>
}

/**
 * 參數允許的最小整數（閉區間下界）/ Smallest integer allowed for parameters (inclusive lower bound)
 */
export const SAFE_INTEGER_MIN = Number.MIN_SAFE_INTEGER;

/**
 * 參數允許的最大整數（閉區間上界）/ Largest integer allowed for parameters (inclusive upper bound)
 */
export const SAFE_INTEGER_MAX = Number.MAX_SAFE_INTEGER;

/**
 * `len` 參數允許的最小值（閉區間下界）/ Smallest value allowed for the `len` parameter (inclusive lower bound)
 *
 * `randIndex()` 的合法值區間為 `[0, len)`，因此 `len` 至少為 1。
 * The legal interval of `randIndex()` is `[0, len)`, so `len` must be at least 1.
 */
export const MIN_LENGTH = 1;

/**
 * `len` 參數允許的最大值（閉區間上界）/ Largest value allowed for the `len` parameter (inclusive upper bound)
 */
export const MAX_LENGTH = Number.MAX_SAFE_INTEGER;

/**
 * 判斷值是否落在半開區間 `[start, end)` 內
 * Check whether a value falls inside the half-open interval `[start, end)`
 *
 * @param value 待驗證的值 / The value to validate
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 是否合法 / Whether the value is legal
 */
export function isInRange(value: number, start: number, end: number): boolean
{
	return value >= start && value < end;
}

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
export function assertInRange(value: number, start: number, end: number, name = 'value', label = 'assertInRange'): number
{
	if (!isInRange(value, start, end))
	{
		throw new RangeError(`[${label}] illegal value: ${name}=${value}, expected range: [${start}, ${end})`);
	}

	return value;
}

/**
 * 以閉區間 `[min, max]` 驗證整數參數，不合法時拋出錯誤
 * Validate an integer parameter against the inclusive interval `[min, max]`, throws when illegal
 *
 * @param value 待驗證的參數 / The parameter to validate
 * @param min 下界（含，Inclusive）/ Lower bound, inclusive
 * @param max 上界（含，Inclusive）/ Upper bound, inclusive
 * @param name 參數名稱，用於錯誤訊息 / Parameter name used in the error message
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該參數以便串接 / Returns the parameter for chaining
 */
export function assertIntegerInRange(value: number, min: number, max: number, name: string, label: string): number
{
	if (!Number.isInteger(value))
	{
		throw new TypeError(`[${label}] parameter must be an integer: ${name}=${value}`);
	}

	if (value < min || value > max)
	{
		throw new RangeError(`[${label}] parameter out of range: ${name}=${value}, expected: [${min}, ${max}]`);
	}

	return value;
}

/**
 * 以閉區間 `[MIN_LENGTH, MAX_LENGTH]` 驗證 `randIndex()` 的 `len` 參數
 * Validate the `len` argument of `randIndex()` against the inclusive interval `[MIN_LENGTH, MAX_LENGTH]`
 *
 * @param len 索引長度 / The index length
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 回傳該參數以便串接 / Returns the parameter for chaining
 */
export function assertLengthParams(len: number, label = 'assertLengthParams'): number
{
	return assertIntegerInRange(len, MIN_LENGTH, MAX_LENGTH, 'len', label);
}

/**
 * 驗證區間參數 `start` / `end`：皆為安全整數，且範圍不得為空
 * Validate the range parameters `start` / `end`: both safe integers and the range must not be empty
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @param label 錯誤訊息用的標籤 / Label used in the error message
 * @returns 驗證過的區間 / The validated range
 */
export function assertRangeParams(start: number, end: number, label = 'assertRangeParams'): IRange
{
	assertIntegerInRange(start, SAFE_INTEGER_MIN, SAFE_INTEGER_MAX, 'start', label);
	assertIntegerInRange(end, SAFE_INTEGER_MIN, SAFE_INTEGER_MAX, 'end', label);

	if (start >= end)
	{
		throw new RangeError(`[${label}] range must not be empty: start=${start}, end=${end}`);
	}

	return { start, end };
}

/**
 * 計算半開區間 `[start, end)` 的合法值數量，不需列舉
 * Compute the count of legal values in the half-open interval `[start, end)` without enumerating
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 合法值的數量 / The count of legal values
 */
export function calcRangeSize(start: number, end: number): number
{
	return end - start;
}

/**
 * 以生成器列舉半開區間 `[start, end)` 內的整數
 * Enumerate the integers inside the half-open interval `[start, end)` with a generator
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 整數生成器 / A generator of integers
 */
export function* rangeValues(start: number, end: number): Generator<number>
{
	for (let i = start; i < end; i++)
	{
		yield i;
	}
}

/**
 * 由已驗證的區間與參數建立合法值描述
 * Build the legal-value description from an already validated range and parameters
 *
 * @param range 已驗證的區間 / The validated range
 * @param params 合法參數值 / The legal parameter values
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
function createExpectedValues(range: IRange, params: Readonly<Record<string, number>>): IExpectedValues
{
	return {
		params: { ...params },
		range,
		size: calcRangeSize(range.start, range.end),
		valuesGenerator()
		{
			return rangeValues(range.start, range.end);
		},
	};
}

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
export function calcExpectedValues(start: number, end: number, params?: Readonly<Record<string, number>>, label = 'calcExpectedValues'): IExpectedValues
{
	return createExpectedValues(assertRangeParams(start, end, label), { ...params });
}

/**
 * 依 `randIndex(len)` 的長度參數計算合法值 `[0, len)`
 * Compute the legal values `[0, len)` from the length argument of `randIndex(len)`
 *
 * @param len 索引長度 / The index length
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
export function calcExpectedValuesByLength(len: number): IExpectedValues
{
	assertLengthParams(len, 'calcExpectedValuesByLength');

	return createExpectedValues({ start: 0, end: len }, { len });
}

/**
 * 依 `randIndexWithRange(start, end)` 的區間參數計算合法值 `[start, end)`
 * Compute the legal values `[start, end)` from the range arguments of `randIndexWithRange(start, end)`
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
export function calcExpectedValuesByRange(start: number, end: number): IExpectedValues
{
	return createExpectedValues(assertRangeParams(start, end, 'calcExpectedValuesByRange'), { start, end });
}

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
export function createValuesValidator(expected: IExpectedValues, label: string): IValuesValidator
{
	const { start, end } = expected.range;
	const seen = new Map<number, number>();
	const illegal: number[] = [];

	let total = 0;

	const check = (value: number) =>
	{
		total++;

		if (!isInRange(value, start, end))
		{
			illegal.push(value);

			throw new RangeError(`[${label}] illegal value: ${value}, expected range: [${start}, ${end})`);
		}

		seen.set(value, (seen.get(value) ?? 0) + 1);

		if (seen.size > expected.size)
		{
			throw new RangeError(`[${label}] distinct value count exceeds expectation: ${seen.size} > ${expected.size}`);
		}

		return value;
	};

	function* seenValuesGenerator(): Generator<number>
	{
		for (const value of expected.valuesGenerator())
		{
			if (seen.has(value))
			{
				yield value;
			}
		}
	}

	function* missingValuesGenerator(): Generator<number>
	{
		for (const value of expected.valuesGenerator())
		{
			if (!seen.has(value))
			{
				yield value;
			}
		}
	}

	function* illegalValuesGenerator(): Generator<number>
	{
		yield* illegal;
	}

	const verifyAllSeen = () =>
	{
		const missing: number[] = [];

		for (const value of missingValuesGenerator())
		{
			missing.push(value);
		}

		if (missing.length)
		{
			throw new RangeError(`[${label}] expected values never appeared: [${missing.join(', ')}]`);
		}
	};

	return {
		label,
		expected,
		get size()
		{
			return seen.size;
		},
		get total()
		{
			return total;
		},
		check,
		verifyAllSeen,
		seenValuesGenerator: seenValuesGenerator,
		missingValuesGenerator: missingValuesGenerator,
		illegalValuesGenerator: illegalValuesGenerator,
	};
}
