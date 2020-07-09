import { isUnset } from './isUnset';

export function isIntBetween(n: number, min?: number, max?: number): n is number
{
	return !(
		isNaN(n)
		|| Math.round(n) !== n
		|| (!isUnset(min) && n < min)
		|| (!isUnset(max) && n > max)
	);
}
