import Big, { Comparison } from 'big.js';

export * from './util';
export * from './unsafe001';

/**
 * big.js 比對結果 (Comparison Result) 的列舉 (Enum)，用於表達兩數相減後的大小關係。
 * Enum of big.js comparison results, used to express the ordering of two numbers.
 *
 * @see big.js
 */
export const enum EnumBigComparison
{
	GT = 1,
	EQ = 0,
	LT = -1,
}

/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export function numberInDelta(actual: number, expected: number, delta = 0.05)
{
	/**
	 * 採用 big.js 進行十進位 (Decimal) 運算，是為了避開 IEEE 754 二進位浮點數
	 * (Binary Floating Point) 在邊界值上可能產生的誤差；
	 * 比對結果只要不是 GT（大於），就代表 |expected - actual| <= delta，
	 * 因此差值剛好等於容許誤差時也算通過（含邊界 / Inclusive）。
	 *
	 * Uses big.js decimal arithmetic to avoid IEEE 754 binary floating-point errors
	 * at the boundary; any comparison result other than GT means the difference is
	 * within delta, so an exact delta still passes (inclusive).
	 */
	return new Big(expected)
		.sub(actual)
		.abs()
		.cmp(delta) !== EnumBigComparison.GT
}

export default numberInDelta
