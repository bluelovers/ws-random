
import seedrandom = require('seedrandom')

export function tryRequire<T = typeof seedrandom>(name: 'seedrandom'): T
export function tryRequire<T extends unknown = any>(name: string): T
export function tryRequire<T extends unknown = any>(name: string): T
{
	return require(name)
}
// @ts-ignore
Object.freeze(exports)
