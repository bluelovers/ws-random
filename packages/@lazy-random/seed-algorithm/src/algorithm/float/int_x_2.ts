/**
 * @example
 * doubleToIEEE(0.732821894576773)
 */
export function doubleToIEEE(floatNumber: number): [number, number]
{
	const buf = new ArrayBuffer(8);
	(new Float64Array(buf))[0] = floatNumber;
	return [(new Uint32Array(buf))[0], (new Uint32Array(buf))[1]];
}
