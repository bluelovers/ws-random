/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export function numberInDeltaUnsafe001(actual: number, expected: number, delta = 0.05)
{
	/**
	 * 直接以數值區間判斷，省去建立 big.js 物件的成本，但運算依賴浮點數精度，
	 * 在極端數值下邊界可能產生誤差，故函式名稱帶有 Unsafe；
	 * 拆成左右兩段比較是為了同時確認實際值不低於下界也不高於上界。
	 *
	 * Direct range check without big.js overhead, but relies on floating-point
	 * precision so the boundary may drift for extreme values, hence the Unsafe name;
	 * the check is split in two to assert both the lower and upper bound.
	 */
	return (expected - delta <= actual) && (actual <= expected + delta)
}
