import { assertNumberBase } from './lib/assertNumberBase';
import { padNumber } from './lib/padNumber';
import { decToBase, baseToDec } from './lib/convert';
import { isIntBetween } from './lib/isIntBetween';

export function anybase(target_base: number,
	original_number: string | number,
	original_base = 10,
	minimum_digits = 0,
	maximum_digits = 0,
): string
{
	target_base = Number(target_base);
	original_base = Number(original_base);
	minimum_digits = Number(minimum_digits);
	maximum_digits = Number(maximum_digits);

	if (!isIntBetween(target_base, 2, 62))
	{
		throw new Error('Invalid target numeric base specified: `' + target_base + '` (expected: 2 .. 62)');
	}
	if (!isIntBetween(original_base, 2, 62))
	{
		throw new Error('Invalid original numeric base specified: `' + original_base + '` (expected: 2 .. 62)');
	}
	if (!isIntBetween(minimum_digits, 0, 64))
	{
		throw new Error('Invalid minimum digits requested: `' + minimum_digits + '` (expected: 1 .. 64)');
	}
	if (!isIntBetween(maximum_digits, 0, 64))
	{
		throw new Error('Invalid minimum digits requested: `' + maximum_digits + '` (expected: 1 .. 64)');
	}

	let returnValue: number | string = String(original_number);

	if (original_base <= 16)
	{
		returnValue = returnValue.toUpperCase();
	}

	assertNumberBase(returnValue, original_number, original_base);

	if (original_base !== 10)
	{
		returnValue = baseToDec(returnValue, original_base);
	}
	else
	{
		returnValue = Number(returnValue);
	}

	if (target_base !== 10)
	{
		returnValue = decToBase(returnValue, target_base);
	}

	returnValue = padNumber(String(returnValue), minimum_digits, maximum_digits);

	if (original_number === '')
	{
		return '0';
	}

	return returnValue;
}

export default anybase
