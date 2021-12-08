
export function toFixedStringNumber(n: number, fractionDigits: number)
{
	return n.toFixed(fractionDigits)
}

/**
 * a number using fixed-point notation
 */
export function toFixedNumber(n: number, fractionDigits: number)
{
	return parseFloat(n.toFixed(fractionDigits))
}

export default toFixedNumber
