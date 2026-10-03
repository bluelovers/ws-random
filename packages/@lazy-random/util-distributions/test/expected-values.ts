/**
 * 測試層：取值、驗證與快照彙整 / Test layer: sampling, validation and snapshot aggregation
 *
 * 核心的「範圍參數驗證」與「合法值計算」位於 `src/utils.ts`，
 * 本檔只負責依 `testLimit` 取值、驗證，並整理成可供快照記錄的資訊。
 *
 * The core "range parameter validation" and "legal value computation" live in `src/utils.ts`;
 * this file only samples up to `testLimit`, validates, and aggregates a snapshot-friendly record.
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

import {
	type IExpectedValues,
	type IRange,
	_createValuesValidator,
} from '../src/utils';

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
	 *
	 * 可選欄位，預設不寫入快照；僅在需要除錯時才展開。
	 * Optional and omitted from the snapshot by default; enable only for debugging.
	 */
	testLimit?: number
	/**
	 * 實際取值次數 / The number of samples actually taken
	 *
	 * 可選欄位，預設不寫入快照；僅在需要除錯時才展開。
	 * Optional and omitted from the snapshot by default; enable only for debugging.
	 */
	total?: number
	/**
	 * 合法參數值 / The legal parameter values
	 */
	params: Readonly<Record<string, number>>
	/**
	 * 合法值區間 `[start, end)` / The legal value interval `[start, end)`
	 */
	range: Readonly<IRange>
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
 * 依 `testLimit` 取值、驗證合法性與數量，並確認所有預期值皆出現過
 * Sample up to `testLimit` values, validate legality and count, then ensure every expected value appeared
 *
 * @param label 錯誤訊息與快照用的標籤 / Label used in error messages and the snapshot
 * @param testLimit 取值次數上限 / The maximum number of samples
 * @param expected 合法參數值與合法值 / The legal parameter values and legal values
 * @param next 取得下一個值的函式 / Function returning the next value
 * @returns 供快照記錄的完整資訊 / The full record for snapshot assertions
 */
export function collectValues(label: string, testLimit: number, expected: IExpectedValues, next: () => number): IValuesSnapshot
{
	const validator = _createValuesValidator(expected, label);

	for (let i = 0; i < testLimit; i++)
	{
		validator.check(next());
	}

	validator.verifyAllSeen();

	return {
		label,
		/**
		 * `testLimit` / `total` 刻意不寫入快照：兩者恆為同一值，
		 * 而 `--test-update-snapshots` 每次執行都會改寫快照檔，多記只會造成無謂差異。
		 *
		 * `testLimit` / `total` are deliberately left out of the snapshot: both are
		 * always the same value, and `--test-update-snapshots` rewrites the snapshot
		 * file on every run, so recording them only creates pointless diffs.
		 */
		params: { ...expected.params },
		range: { ...expected.range },
		expectedValues: [...expected.valuesGenerator()],
		expectedSize: expected.size,
		seenValues: [...validator.seenValuesGenerator()],
		seenSize: validator.size,
		missingValues: [...validator.missingValuesGenerator()],
		illegalValues: [...validator.illegalValuesGenerator()],
	};
}
