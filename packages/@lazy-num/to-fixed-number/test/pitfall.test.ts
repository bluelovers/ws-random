/// <reference types="node" />
/**
 * 反直覺結果與 JS 運算陷阱的快照測試
 * Snapshot tests for counter-intuitive results and JavaScript pitfalls
 *
 * 目的 (Purpose)：
 * 以 Node.js 原生測試 (node:test) 的快照 (Snapshot) 機制，
 * 固化 IEEE 754 雙精度浮點數 (Double-Precision Floating Point)
 * 與內建 `toFixed()` 的反直覺輸出，作為文件化的實證。
 *
 * 本測試**不驗證數值是否「正確」**（無需驗證值）：
 * 只要運算結果與上次快照不同，對應的子測試 (Subtest) 即會失敗並提示
 * 重新產生快照，讓行為變更可被追蹤，而非以硬編碼 (Hardcoded)
 * 期望值束縛實作。
 *
 * 結構 (Structure)：
 * 每個數值／陷阱各自使用一個子測試，快照條目逐一對應單一案例，
 * 避免所有結果集中在同一則快照而難以比對差異。
 *
 * 更新快照 (Update snapshots)：`pnpm run test`
 * （腳本已內建 `--test-update-snapshots`）
 */
import test from 'node:test';

import { toFixedNumber, toFixedStringNumber } from '@lazy-num/to-fixed-number';

/**
 * 欄位分隔符，與 README 的限制章節輸出保持一致
 * Field separator, kept consistent with the Limitations section in README
 */
const SEP = '  ／  ';

/**
 * 小數位數，與 README 範例一致
 * Fraction digits, same as the README example
 */
const FRACTION_DIGITS = 2;

test('toFixed 與 toFixedNumber 的捨入反直覺結果', async (t) =>
{
	/**
	 * 順序為：原生 toFixed(2) / toFixedNumber(2) / toPrecision(17)
	 * toPrecision(17) 用以揭露記憶體中的真實值 (actual stored value)
	 */
	const cases = [
		1.004,
		1.005,
		1.015,
		1.016,
		12.345,
		12.0345,
		12.305,
	];

	for (const n of cases)
	{
		/**
		 * 一個數值 = 一個子測試 = 一則快照
		 * One value = one subtest = one snapshot
		 */
		await t.test(String(n), (t) =>
		{
			t.assert.snapshot([
				`原生 toFixed(${FRACTION_DIGITS}): ${n.toFixed(FRACTION_DIGITS)}`,
				`toFixedNumber(${FRACTION_DIGITS}): ${toFixedNumber(n, FRACTION_DIGITS)}`,
				`toPrecision(17): ${n.toPrecision(17)}`,
			].join('\n'));
		});
	}
});

test('toFixedStringNumber 與 toFixedNumber 的尾端補零差異', async (t) =>
{
	const cases = [
		1.005,
		1.015,
		12.305,
		123.456,
		1,
	];

	for (const n of cases)
	{
		/**
		 * 字串版保留補零、數字版捨去尾端的零
		 * The string variant keeps trailing zeros, the number variant drops them
		 */
		await t.test(String(n), (t) =>
		{
			t.assert.snapshot([
				`toFixedStringNumber(${FRACTION_DIGITS}): ${toFixedStringNumber(n, FRACTION_DIGITS)}`,
				`toFixedNumber(${FRACTION_DIGITS}): ${toFixedNumber(n, FRACTION_DIGITS)}`,
			].join('\n'));
		});
	}
});

test('JavaScript 浮點運算陷阱', async (t) =>
{
	/**
	 * 常見的浮點數陷阱 (Floating-point pitfalls)
	 *
	 * 值僅供快照對照，不做任何斷言判斷
	 */
	const pitfalls: Record<string, unknown> = {
		'0.1 + 0.2': 0.1 + 0.2,
		'0.1 + 0.2 === 0.3': 0.1 + 0.2 === 0.3,
		'0.07 * 100': 0.07 * 100,
		'1 - 0.9': 1 - 0.9,
		'(0.1).toFixed(20)': (0.1).toFixed(20),
		'(1.005).toFixed(2)': (1.005).toFixed(2),
		'(1.005).toPrecision(17)': (1.005).toPrecision(17),
		'(12.305).toPrecision(17)': (12.305).toPrecision(17),
		'(1.005).toFixed(2) === "1.01"': (1.005).toFixed(2) === '1.01',
		'1.005 * 1000': 1.005 * 1000,
		'10.1 - 10': 10.1 - 10,
		'Number.MAX_SAFE_INTEGER': Number.MAX_SAFE_INTEGER,
		'Number.MAX_SAFE_INTEGER + 2': Number.MAX_SAFE_INTEGER + 2,
		'String(1e21)': String(1e21),
		'String(0.0000001)': String(0.0000001),
	};

	for (const [name, value] of Object.entries(pitfalls))
	{
		/**
		 * 一個陷阱 = 一個子測試 = 一則快照
		 * One pitfall = one subtest = one snapshot
		 */
		await t.test(name, (t) =>
		{
			t.assert.snapshot([
				`式子 (Expression): ${name}`,
				`結果 (Result): ${String(value)}`,
				`型別 (Type): ${typeof value}`,
			].join('\n'));
		});
	}
});
