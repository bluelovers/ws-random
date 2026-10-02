/**
 * 將 64 位元倍精度浮點數 (Double) 拆成兩個 32 位元整數，以便把浮點種子以整數形式參與運算。
 * Splits a 64-bit double into two 32-bit integers so a floating-point seed can be used in integer math.
 *
 * @param floatNumber 要拆解的浮點數 / the float to split
 * @returns `[low, high]` 兩個 32 位元整數 / two 32-bit integers, low then high
 *
 * @example
 * doubleToIEEE(0.732821894576773)
 */
export function doubleToIEEE(floatNumber: number): [number, number]
{
	/**
	 * `ArrayBuffer` 同時以兩種視圖 (View) 存取同一塊記憶體：
	 * 先以 `Float64Array` 寫入浮點數，再以 `Uint32Array` 讀出底層的 32 位元表示。
	 * Uses two views over the same buffer: write the double with `Float64Array`, then read the raw 32-bit halves with `Uint32Array`.
	 */
	const buf = new ArrayBuffer(8);
	(new Float64Array(buf))[0] = floatNumber;
	return [(new Uint32Array(buf))[0], (new Uint32Array(buf))[1]];
}
