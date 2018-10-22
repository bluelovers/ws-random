/**
 * Created by user on 2018/10/20/020.
 */

import hashSum = require('hash-sum');
//import shortid = require('shortid');
//
//export declare function shortid(): string
//export declare function hashSum(input): string
//
//export { shortid, hashSum }

import _nanoid = require('nanoid')

import _pkg = require('../package.json')

const MATH_POW_2_32 = Math.pow(2, 32)

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
	let float = n - int

	return String(int) + '.' + String(float).split('.')[1]
}

// @ts-ignore
Object.freeze(exports)
