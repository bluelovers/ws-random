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
export declare function assertFractionDigits(fractionDigits?: number): asserts fractionDigits is number;
/**
 * 將數值轉為字串後，以小數點拆成 [整數部分, 小數部分?]
 * Convert a value to a string and split it on the decimal point into [integer part, fraction part?]
 *
 * @param float 數值或其字串表示 / a number or its string representation
 * @returns 沒有小數點時只含長度 1 的陣列 / an array of length 1 when there is no decimal point
 */
export declare function splitFloatNumberToString(float: string | number): [
	string,
	string?
];
/**
 * 取得小數點後的字串；沒有小數部分（整數或指數表示法）時回傳 undefined
 * Get the string after the decimal point, or undefined when there is no fraction part
 *
 * @param float 數值或其字串表示 / a number or its string representation
 * @returns 小數部分字串或 undefined / the fraction string or undefined
 */
export declare function getFractionDigitsString(float: string | number): string;
/**
 * 以 Math.floor() 拆分數值，回傳 [整數部分, 小數部分]，小數部分恆位於 [0, 1)
 * Split a number with Math.floor() into [integer, fraction], fraction always in [0, 1)
 *
 * @param n 待拆分的數值 / the number to split
 * @returns [整數部分, 小數部分] / [integer part, fraction part]
 * @remarks 負數會被向下取整，例如 -1.5 拆成 [-2, 0.5]
 */
export declare function splitFloatNumber(n: number): [
	number,
	number
];
/**
 * 將整數與小數字串組回字串，沒有小數部分時不加上小數點
 * Join integer and fraction strings, omitting the decimal point when there is no fraction
 *
 * @param int 整數部分（數值或字串）/ integer part as number or string
 * @param float 小數部分字串（不含小數點）/ fraction string without the decimal point
 * @returns 組合後的字串 / the joined string
 */
export declare function joinFloatNumber(int: number | string, float?: string): string;
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
export declare function floatToString(n: number, fractionDigits?: number): string;

export {
	floatToString as default,
};

export {};
