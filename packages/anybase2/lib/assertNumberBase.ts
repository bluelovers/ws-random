import { map } from './data';
import { isUnset } from './isUnset';

export function assertNumberBase(val: string, original_number: number | string, original_base: number): asserts val is string
{
	let len = val.length;

	for (let m = 0; m < len; m++)
	{
		const char = val[m];
		const v = map[char]
		if (isUnset(v) || v > original_base)
		{
			throw new Error('Invalid digit(s) in number `' + original_number + '` for numeric ' + 'base `' + original_base + '` (expected positive integer ' + 'composed of alphanumeric characters only)');
		}
	}
}
