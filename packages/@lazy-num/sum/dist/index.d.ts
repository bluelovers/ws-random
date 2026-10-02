/**
 * 計算 1 + 2 + ... + n 的總和 (1 + 2 + 3 +...+N)
 *
 * Compute the total of 1 + 2 + ... + n
 *
 * @param n 數列的末項 / the last term of the sequence
 * @returns 總和 / the total
 *
 * TODO: 未驗證 n 是否為正整數，負數與小數會靜默代入公式（sum_1_to_n(-3) 回傳 3）
 * TODO: input n is never validated, so negatives and fractions silently follow
 * the formula (sum_1_to_n(-3) returns 3)
 *
 * @see http://emn178.pixnet.net/blog/post/92132837-%E8%A8%88%E7%AE%971%E5%88%B0n%E7%B8%BD%E5%92%8C%281-%2B-2-%2B-3-%2B...%2Bn%29
 */
export declare function sum_1_to_n(n: number): number;
/**
 * 加總數值陣列，結果會經過 fixZero()（來自 num-is-zero）處理
 *
 * Sum an array of numbers, passing the result through fixZero() from num-is-zero
 *
 * @param na 要加總的數值陣列（不可為空）/ the numbers to sum (must not be empty)
 * @returns 陣列元素的總和 / the sum of the array elements
 * @throws {TypeError} 空陣列時 reduce() 丟出原生錯誤 / empty arrays make reduce() throw its native TypeError
 *
 * TODO: fixZero() 僅把負零 (-0) 正規化為 0，一般浮點誤差不會被修正
 * （如 [0.1, 0.2] → 0.30000000000000004），且空陣列的錯誤訊息不夠明確
 * TODO: fixZero() only normalizes negative zero (-0); ordinary floating-point
 * error such as [0.1, 0.2] → 0.30000000000000004 survives, and the empty-array
 * error message is not descriptive
 */
export declare function num_array_sum(na: number[]): number;

export {};
