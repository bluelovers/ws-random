export function assertFractionDigits(fractionDigits?: number): asserts fractionDigits is number
{
	if (!Number.isFinite(fractionDigits) || !Number.isInteger(fractionDigits) || fractionDigits === 0)
	{
		throw new TypeError(`Invalid fractionDigits: ${fractionDigits}`)
	}
}

export function splitFloatNumberToString(float: string | number): [string, string?]
{
	return String(float).split('.') as any
}

export function getFractionDigitsString(float: string | number)
{
	return splitFloatNumberToString(float)[1]
}

export function splitFloatNumber(n: number): [number, number]
{
	let int = Math.floor(n);
	let float = n - int;

	return [int, float]
}

export function joinFloatNumber(int: number | string, float?: string)
{
	return String(int) + (float?.length ? '.' + float : '');
}

export function floatToString(n: number, fractionDigits?: number)
{
	let int: string | number;
	let s: string;

	if (typeof fractionDigits === 'number')
	{
		assertFractionDigits(fractionDigits);

		([int, s] = splitFloatNumberToString(n.toFixed(fractionDigits)));
	}
	else
	{
		let float;
		([int, float] = splitFloatNumber(n));
		s = getFractionDigitsString(float);
	}

	return joinFloatNumber(int, s);
}

export default floatToString
