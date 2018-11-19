/**
 * Created by user on 2018/10/20/020.
 */

import hashSum = require('hash-sum');
import _nanoid = require('nanoid');

import _pkg = require('../package.json');
//import shortid = require('shortid');
//
//export declare function shortid(): string
//export declare function hashSum(input): string
//
//export { shortid, hashSum }

const MATH_POW_2_32 = Math.pow(2, 32)

const _GLOBAL = (0, eval)('this')

/**
 * try save original Math.random,
 * if no other module overwrite Math.random
 *
 * @alias Math.random
 */
declare function _MathRandom(): number

// @ts-ignore
_MathRandom = Math.random;

export { _MathRandom };

export function randomSeedNum(): number
{
	return (_MathRandom() * MATH_POW_2_32) + _MathRandom()
}

/**
 * give a random string for create seed
 */
export function randomSeedStr(): string
{
	return [
		_nanoid(),
		hashSum(_pkg.name),
		hashSum(_pkg.version),
		Date.now(),
		floatToString(_MathRandom()),
	].join('_')
}

/**
 * @todo support typescript
 */
export function getClass(RNGClass, thisArgv, ...argv)
{
	let o;

	if (thisArgv instanceof RNGClass)
	{
		// @ts-ignore
		o = (thisArgv.__proto__.constructor)
	}
	else
	{
		o = RNGClass
	}

	return o
}

/**
 * @todo support typescript
 */
export function cloneClass(RNGClass, thisArgv, ...argv)
{
	let o = getClass(RNGClass, thisArgv, ...argv)

	return new o(...argv)
}

export function floatToString(n: number)
{
	let int = Math.floor(n)
	let float = n - int;

	let s = String(float)
		.split('.')[1]
	;

	return String(int) + (s ? '.' + s : '');
}

/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export function expectInDelta(actual: number, expected: number, delta = 0.05)
{
	return expected - delta <= actual && actual <= expected + delta
}

export function hashArgv(args: any[]): string
{
	return String(args.join(';'));
}

export function isNum(n: number)
{
	return n === +n
}

export function isInt(n: number)
{
	return n === (n | 0)
}

export function isFloat(n: number)
{
	return n === +n && n !== (n | 0);
}

export function isUnset(n)
{
	return typeof n === 'undefined' || n === null
}

/**
 * for non-strict check, try get a little
 */
export function array_unique_unsafe<T extends any>(arr: T[])
{
	return arr.filter((v, i, arr) => arr.indexOf(v) === i)
}

// @ts-ignore
Object.freeze(exports)
