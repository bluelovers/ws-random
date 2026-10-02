/**
 * 驗證 fractionDigits：必須是有限值 (Finite)、整數且不得為 0，否則丟出 TypeError
 * Validate fractionDigits: must be finite, an integer and non-zero, otherwise throw a TypeError
 *
 * @param fractionDigits 小數位數 / number of fraction digits
 * @throws {TypeError} 驗證失敗 / when validation fails
 * @remarks TypeScript 斷言函式 (Assertion Function)，通過後將型別縮窄為 number
 *
 * TODO: 目前未檢查範圍，-1 或 101 會通過驗證，之後才由 toFixed() 丟出 RangeError
 */
export function assertFractionDigits(fractionDigits?: number): asserts fractionDigits is number
{
	/**
	 * 三種失效情況（非有限值、非整數、0）統一丟 TypeError，讓呼叫端不必分辨是參數錯誤還是 toFixed() 自身的限制；
	 * 其中 0 被刻意拒絕，因為固定 0 位小數的結果不含小數點，與本函式「保留小數」的用途不符
	 *
	 * All three failure cases (non-finite, non-integer, zero) throw a single
	 * TypeError so callers do not have to distinguish a bad argument from a
	 * toFixed() limitation; zero is rejected because a result with no decimal
	 * point does not fit this library's purpose
	 */
	if (!Number.isFinite(fractionDigits) || !Number.isInteger(fractionDigits) || fractionDigits === 0)
	{
		throw new TypeError(`Invalid fractionDigits: ${fractionDigits}`)
	}
}

/**
 * 將數值轉為字串後，以小數點拆成 [整數部分, 小數部分?]
 * Convert a value to a string and split it on the decimal point into [integer part, fraction part?]
 *
 * @param float 數值或其字串表示 / a number or its string representation
 * @returns 沒有小數點時只含長度 1 的陣列 / an array of length 1 when there is no decimal point
 */
export function splitFloatNumberToString(float: string | number): [string, string?]
{
	/**
	 * split() 回傳的是 string[]，無法以型別表達「小數部分可能不存在」，故以 as any 轉型為宣告的 tuple
	 * split() returns string[], which cannot express a possibly missing
	 * fraction part, so the cast to the declared tuple uses `as any`
	 */
	return String(float).split('.') as any
}

/**
 * 取得小數點後的字串；沒有小數部分（整數或指數表示法）時回傳 undefined
 * Get the string after the decimal point, or undefined when there is no fraction part
 *
 * @param float 數值或其字串表示 / a number or its string representation
 * @returns 小數部分字串或 undefined / the fraction string or undefined
 */
export function getFractionDigitsString(float: string | number)
{
	return splitFloatNumberToString(float)[1]
}

/**
 * 以 Math.floor() 拆分數值，回傳 [整數部分, 小數部分]，小數部分恆位於 [0, 1)
 * Split a number with Math.floor() into [integer, fraction], fraction always in [0, 1)
 *
 * @param n 待拆分的數值 / the number to split
 * @returns [整數部分, 小數部分] / [integer part, fraction part]
 * @remarks 負數會被向下取整，例如 -1.5 拆成 [-2, 0.5]
 */
export function splitFloatNumber(n: number): [number, number]
{
	/**
	 * 以 floor 而非 trunc 取整數，使小數部分恆為非負數；
	 *
	 * TODO: 負數因此與原值不符（-1.5 拆成 -2 與 0.5），重新組合時會得到 -2.5
	 * Using floor (not trunc) keeps the fraction non-negative, but for negative
	 * input the parts no longer reconstruct the original value
	 */
	let int = Math.floor(n);
	let float = n - int;

	return [int, float]
}

/**
 * 將整數與小數字串組回字串，沒有小數部分時不加上小數點
 * Join integer and fraction strings, omitting the decimal point when there is no fraction
 *
 * @param int 整數部分（數值或字串）/ integer part as number or string
 * @param float 小數部分字串（不含小數點）/ fraction string without the decimal point
 * @returns 組合後的字串 / the joined string
 */
export function joinFloatNumber(int: number | string, float?: string)
{
	/**
	 * 以 length 判斷而非僅判斷真假值：同時涵蓋 undefined 與空字串兩種「無小數」情況，
	 * 避免組合出 "5." 這種尾隨小數點的字串
	 *
	 * Checking `length` covers both undefined and empty string as "no fraction",
	 * which avoids producing a trailing dot like "5."
	 */
	return String(int) + (float?.length ? '.' + float : '');
}

/**
 * 將數字轉為字串，可選擇以 fractionDigits 固定小數位數
 * Convert a number to a string, optionally fixing the number of fraction digits
 *
 * @param n 要轉換的數值 / the number to convert
 * @param fractionDigits 小數位數；省略時保留原始小數字串 / fraction digits; omit to keep the original decimal string
 * @returns 字串表示 / string representation
 * @throws {TypeError} fractionDigits 經 assertFractionDigits() 驗證失敗 / when assertFractionDigits() fails
 * @throws {RangeError} toFixed() 的範圍限制（負數或大於 100）/ range restriction of toFixed()
 */
export function floatToString(n: number, fractionDigits?: number)
{
	let int: string | number;
	let s: string;

	/**
	 * 兩條路徑：指定 fractionDigits 時交給 toFixed() 固定位數；省略時自行拆分以保留原始小數字串
	 *
	 * Two paths: toFixed() fixes the digits when fractionDigits is given,
	 * otherwise the value is split so the original decimal string is kept
	 */
	if (typeof fractionDigits === 'number')
	{
		/**
		 * 先驗證參數再呼叫 toFixed()，讓「非有限值／非整數／0」以 TypeError 呈現，
		 * 而非等到 toFixed() 才丟出較難辨識的錯誤
		 *
		 * Validate before toFixed() so non-finite, non-integer and zero inputs
		 * surface as a TypeError instead of a less descriptive toFixed() error
		 */
		assertFractionDigits(fractionDigits);

		([int, s] = splitFloatNumberToString(n.toFixed(fractionDigits)));
	}
	else
	{
		/**
		 * 先拆出整數與小數部分，再取小數字串組合
		 *
		 * TODO: 負數會因 Math.floor() 拆錯（-1.5 → [-2, 0.5]）而組出 -2.5；
		 * 指數表示法（如 1e-7）取不到小數部分會回傳 "0"；
		 * 另因浮點減法誤差，1.2345 會得到 1.23449999999999993
		 *
		 * TODO: negative input is split incorrectly by Math.floor() (-1.5 →
		 * [-2, 0.5] → "-2.5"), exponential forms such as 1e-7 lose their
		 * fraction and become "0", and subtraction error turns 1.2345 into
		 * 1.23449999999999993
		 */
		let float;
		([int, float] = splitFloatNumber(n));
		s = getFractionDigitsString(float);
	}

	return joinFloatNumber(int, s);
}

export default floatToString
