/**
 * 可重複使用的「合法值」驗證邏輯 / Reusable validation logic for legal values
 *
 * 提供三項能力 / Provides three capabilities:
 *
 * 1. 計算合法參數值、合法值區間 與 合法值的數量 (`calcExpectedValues*`)
 *    Compute the legal parameter values, the legal value interval and the count of legal values (`calcExpectedValues*`)
 *
 * 2. 驗證單一值的合法性 與 已收集值的數量 (`createValuesValidator`)
 *    Validate the legality of each value and the number of collected values (`createValuesValidator`)
 *
 * 3. 彙整為可供快照記錄的完整資訊 (`toSnapshot`)
 *    Aggregate everything into a snapshot-friendly record (`toSnapshot`)
 *
 * 任何不合法的值、超過預期的值數量、或預期值未曾出現，
 * 都會立即 `throw`，因此呼叫端的迴圈會直接中斷，
 * 不需要跑完完整的 `testLimit`。
 *
 * Any illegal value, an over-count of distinct values, or an expected value
 * that never appeared will `throw` immediately, so the caller's loop is aborted
 * without having to finish the whole `testLimit`.
 *
 * 快照僅記錄穩定資訊（不含各值出現次數），
 * 以避免 `--test-update-snapshots` 每次執行都改寫快照檔。
 * The snapshot only records stable information (no per-value occurrence counts),
 * so `--test-update-snapshots` does not rewrite the snapshot file on every run.
 */

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
	range: Readonly<{
		start: number
		end: number
	}>
	/**
	 * 合法值（由小到大）/ The legal values (ascending)
	 */
	values: readonly number[]
	/**
	 * 合法值的數量 / The count of legal values
	 */
	size: number
}

/**
 * 供快照記錄的完整資訊 / Full record for snapshot assertions
 */
export interface IValuesSnapshot
{
	/**
	 * 測試標籤 / The test label
	 */
	label: string
	/**
	 * 取值次數上限 / The maximum number of samples
	 */
	testLimit?: number
	/**
	 * 實際取值次數 / The number of samples actually taken
	 */
	total?: number
	/**
	 * 合法參數值 / The legal parameter values
	 */
	params: Readonly<Record<string, number>>
	/**
	 * 合法值區間 `[start, end)` / The legal value interval `[start, end)`
	 */
	range: Readonly<{
		start: number
		end: number
	}>
	/**
	 * 合法值 / The legal values
	 */
	expectedValues: readonly number[]
	/**
	 * 合法值的數量 / The count of legal values
	 */
	expectedSize: number
	/**
	 * 出現值（去重、由小到大）/ The distinct values seen, ascending
	 */
	seenValues: readonly number[]
	/**
	 * 出現值的數量 / The count of distinct values seen
	 */
	seenSize: number
	/**
	 * 未出現的預期值（正常應為空）/ Expected values that never appeared (should be empty)
	 */
	missingValues: readonly number[]
	/**
	 * 非預期值（正常應為空）/ Values outside the legal set (should be empty)
	 */
	illegalValues: readonly number[]
}

/**
 * 已收集值的驗證器 / Validator for the collected values
 */
export interface IValuesValidator
{
	/**
	 * 測試標籤 / The test label
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
	 * 彙整為可供快照記錄的完整資訊
	 * Aggregate everything into a snapshot-friendly record
	 *
	 * @param testLimit 取值次數上限 / The maximum number of samples
	 */
	toSnapshot(testLimit: number): IValuesSnapshot
}

/**
 * 以半開區間 `[start, end)` 計算合法值、合法參數值 與 其數量
 * Compute the legal values, legal parameter values and their count from the half-open interval `[start, end)`
 *
 * @param start 起始值（含，Inclusive）/ Start value, inclusive
 * @param end 結束值（不含，Exclusive）/ End value, exclusive
 * @param params 原始函式參數，會一併記錄進快照 / Original function arguments, also recorded into the snapshot
 * @returns 合法參數值、合法值區間與其數量 / The legal parameter values, legal interval and their count
 */
export function calcExpectedValues(start: number, end: number, params?: Readonly<Record<string, number>>): IExpectedValues
{
	const values: number[] = [];

	for (let i = start; i < end; i++)
	{
		values.push(i);
	}

	return {
		params: { ...params },
		range: { start, end },
		values,
		size: values.length,
	};
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
	return calcExpectedValues(0, len, { len });
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
	return calcExpectedValues(start, end, { start, end });
}

/**
 * 建立已收集值的驗證器 / Create a validator for the collected values
 *
 * - 值不在合法值內 → 先記錄再立即拋出錯誤 / value not in the legal set → record it then throw immediately
 * - 以 `Map` 記錄並檢查 `size`，不同值數量超過合法值數量 → 立即拋出錯誤
 *   record with a `Map` and check its `size`, distinct values exceeding the legal count → throw immediately
 *
 * @param expected 合法參數值與合法值 / The legal parameter values and legal values
 * @param label 錯誤訊息與快照用的標籤 / Label used in error messages and the snapshot
 * @returns 驗證器 / The validator
 */
export function createValuesValidator(expected: IExpectedValues, label: string): IValuesValidator
{
	const allowed = new Set(expected.values);
	const seen = new Map<number, number>();
	const illegal: number[] = [];

	let total = 0;

	const check = (value: number) =>
	{
		total++;

		if (!allowed.has(value))
		{
			illegal.push(value);

			throw new Error(`[${label}] 不合法的值 / illegal value: ${value}，預期 / expected: [${expected.values.join(', ')}]`);
		}

		seen.set(value, (seen.get(value) ?? 0) + 1);

		if (seen.size > expected.size)
		{
			throw new Error(`[${label}] 值的數量超過預期 / distinct value count exceeds expectation: ${seen.size} > ${expected.size}`);
		}

		return value;
	};

	const verifyAllSeen = () =>
	{
		const missing = expected.values.filter((value) => !seen.has(value));

		if (missing.length)
		{
			throw new Error(`[${label}] 預期值未出現過 / expected values never appeared: [${missing.join(', ')}]`);
		}
	};

	const toSnapshot = (testLimit: number): IValuesSnapshot =>
	{
		return {
			label,
			// testLimit,
			// total,
			params: { ...expected.params },
			range: { ...expected.range },
			expectedValues: [...expected.values],
			expectedSize: expected.size,
			seenValues: [...seen.keys()].sort((a, b) => a - b),
			seenSize: seen.size,
			missingValues: expected.values.filter((value) => !seen.has(value)),
			illegalValues: [...illegal],
		};
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
		toSnapshot,
	};
}

/**
 * 依 `testLimit` 取值、驗證合法性與數量，並確認所有預期值皆出現過
 * Sample up to `testLimit` values, validate legality and count, then ensure every expected value appeared
 *
 * 驗證失敗時會拋出錯誤並中斷，不必跑完 `testLimit`。
 * Throws and aborts on any validation failure, without having to finish `testLimit`.
 *
 * @param label 錯誤訊息與快照用的標籤 / Label used in error messages and the snapshot
 * @param testLimit 取值次數上限 / The maximum number of samples
 * @param expected 合法參數值與合法值 / The legal parameter values and legal values
 * @param next 取得下一個值的函式 / Function returning the next value
 * @returns 供快照記錄的完整資訊 / The full record for snapshot assertions
 */
export function collectValues(label: string, testLimit: number, expected: IExpectedValues, next: () => number): IValuesSnapshot
{
	const validator = createValuesValidator(expected, label);

	for (let i = 0; i < testLimit; i++)
	{
		validator.check(next());
	}

	validator.verifyAllSeen();

	return validator.toSnapshot(testLimit);
}
