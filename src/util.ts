/**
 * Created by user on 2018/10/20/020.
 */

import shortid = require('shortid')
import hashSum = require('hash-sum')
import RNG from './rng';

export declare function shortid(): string
export declare function hashSum(input): string

export { shortid, hashSum }

export function hashAny(seed?, ...argv): string
{
	if (!seed)
	{
		seed = shortid()
	}
	else if (typeof seed !== 'string')
	{
		seed = hashSum(seed)
	}

	return String(seed)
}

export function seedToken(seed: number | any, opts?, ...argv): number
{
	// TODO: add entropy and stuff

	if (seed === (seed | 0))
	{
		return seed
	}
	else
	{
		let strSeed = '' + seed
		let s = 0

		for (let k = 0; k < strSeed.length; ++k)
		{
			s ^= strSeed.charCodeAt(k) | 0
		}

		return s
	}
}

interface IConstructor<T extends RNG>
{
	new (): T
	new (...argv): T
	new (seed?): T
	new (seed?, opts?): T
	new (seed?, ...argv): T
	new (seed?, opts?, ...argv): T
}

export function getClass(RNGClass, thisArgv, ...argv)
{
	let o;

	if (this instanceof RNGClass)
	{
		// @ts-ignore
		o = (this.__proto__.constructor)
	}
	else
	{
		o = RNGClass
	}

	return o
}

export function cloneClass(RNGClass, thisArgv, ...argv)
{
	let o = getClass(RNGClass, thisArgv, ...argv)

	return new o(...argv)
}

// @ts-ignore
Object.freeze(exports)
