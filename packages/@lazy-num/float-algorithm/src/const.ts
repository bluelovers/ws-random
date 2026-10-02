
/**
 * 2^32 的常數值 (Constant)，用於把 32 位元整數除算成 [0, 1) 區間的浮點數。
 * The constant 2^32 used to scale a 32-bit integer into a [0, 1) float.
 *
 * 採 Math.pow 而非位元運算，是因為 2^32 超出 32 位元整數範圍，
 * 位元運算會把它截斷為 0。
 *
 * Math.pow is used instead of a bit trick because 2^32 exceeds the 32-bit
 * integer range and bit operations would truncate it to 0.
 */
export const MATH_POW_2_32 = Math.pow(2, 32);
