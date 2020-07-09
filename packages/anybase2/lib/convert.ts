import { chars, map } from './data';

export function baseToDec(original_number: string, base: number)
{
	let len: number, m: number, n10: number;
	n10 = 0;
	for (m = 0, len = original_number.length; m < len; m++)
	{
		let char = original_number[m];
		(n10 = n10 * base + map[char]);
	}
	return n10;
}

export function decToBase(n: number, base: number)
{
	let nx = '';
	while (n > 0)
	{
		let mod = n % base;
		n = (n - mod) / base;
		nx = chars[mod] + nx;
	}
	return nx;
}
