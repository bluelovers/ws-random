
export * from './const';
export * from './types';
export * from './byte';
export * from './memoize';

export function isUnset(n: unknown): n is undefined | null
{
	return typeof n === 'undefined' || n === null
}
