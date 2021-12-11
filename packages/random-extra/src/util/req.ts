
import seedrandom from 'seedrandom';
import crypto from '@lazy-random/cross-crypto';

export function tryRequire<T = typeof crypto>(name: 'crypto'): T
export function tryRequire<T = typeof seedrandom>(name: 'seedrandom'): T
export function tryRequire<T extends unknown = any>(name: string): T
export function tryRequire<T extends unknown = any>(name: string): T
{
	return require(name)
}

