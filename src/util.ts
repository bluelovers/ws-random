/**
 * Created by user on 2018/10/20/020.
 */

//import hashSum = require('hash-sum');
//import shortid = require('shortid');
//
//export declare function shortid(): string
//export declare function hashSum(input): string
//
//export { shortid, hashSum }

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

// @ts-ignore
Object.freeze(exports)
