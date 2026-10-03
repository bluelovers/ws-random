/**
 * 快照輔助 / Snapshot helpers
 *
 * 供 `*.spec.ts` 共用，把「值」與「錯誤」都轉成可快照的字面量，
 * 讓成功與失敗的行為都能被記錄在同一份快照裡。
 * Shared by `*.spec.ts`; turns both values and errors into snapshot-friendly
 * literals so passing and failing behaviour are recorded together.
 *
 * 非測試檔，不會被 `test` 目錄的 spec glob 當成測試執行。
 * Not a spec file, so the `test` directory's spec glob never runs it as a test.
 */

/**
 * 把值轉成可快照的字面量，特別處理 `NaN` / `±Infinity` / `-0`
 * Turn a value into a snapshot-friendly literal, covering `NaN` / `±Infinity` / `-0`
 *
 * `JSON.stringify()` 會把 `NaN` / `Infinity` / `-0` 都變成 `null` / `0` 而失去資訊，
 * 因此數值一律先走這層轉成字串。
 * `JSON.stringify()` turns `NaN` / `Infinity` / `-0` into `null` / `0` and loses
 * the distinction, so numbers always go through this first.
 *
 * @param value 待轉換的值 / The value to convert
 * @returns 可快照的字面量 / A snapshot-friendly literal
 */
export function fmt(value: unknown): string
{
	if (typeof value === 'number')
	{
		if (Number.isNaN(value)) return 'NaN';
		if (value === Infinity) return 'Infinity';
		if (value === -Infinity) return '-Infinity';
		if (Object.is(value, -0)) return '-0';
	}

	return JSON.stringify(value) ?? String(value);
}

/**
 * 擷取「回傳值」或「拋出的錯誤」為單一字串，供快照比對
 * Capture either a return value or a thrown error as a single string for snapshot comparison
 *
 * @param fn 待執行的函式 / The function to run
 * @returns `return ...` 或 `throw ErrorName: message` / `return ...` or `throw ErrorName: message`
 */
export function outcome(fn: () => unknown): string
{
	try
	{
		return `return ${fmt(fn())}`;
	}
	catch (error)
	{
		const err = error as Error;

		return `throw ${err.name}: ${err.message}`;
	}
}

/**
 * 收集生成器的全部產出 / Collect every value produced by a generator
 *
 * @param generator 目標生成器 / The target generator
 * @returns 全部產出的陣列 / An array of every produced value
 */
export function toArray<T>(generator: Generator<T>): T[]
{
	return [...generator];
}
