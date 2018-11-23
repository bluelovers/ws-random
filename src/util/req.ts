
import seedrandom = require('seedrandom');
import crypto = require('crypto');

export function tryRequire<T = typeof crypto>(name: 'crypto'): T
export function tryRequire<T = typeof seedrandom>(name: 'seedrandom'): T
export function tryRequire<T extends unknown = any>(name: string): T
export function tryRequire<T extends unknown = any>(name: string): T
{
	return require(name)
}
// @ts-ignore
Object.freeze(exports)
