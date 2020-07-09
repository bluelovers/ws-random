
export function isUnset(n): n is undefined | null
{
	return typeof n === 'undefined' || n === null
}
