import RNGCrypto from './generators/crypto';
import RNGMathRandom2 from './generators/math-random2';
import RNGSeedRandom from './generators/seedrandom';
import RNG from './rng'

import RNGXOR128 from './generators/xor128'
import RNGFunction, { IRNGFunctionSeed } from './generators/function'
import RNGMathRandom from './generators/math-random'



const PRNG_BUILTINS = {
	// TODO: add more prng from C++11 lib
	'xor128': RNGXOR128,
	'function': RNGFunction,
	'default': RNGMathRandom,

	'math-random': RNGMathRandom,
	'math-random2': RNGMathRandom2,

	'seedrandom': RNGSeedRandom,

	'crypto': RNGCrypto,
}

export type IRNGFactoryType = 'xor128' | 'function' | 'function' | 'default' | 'seedrandom' | RNG | IRNGFunctionSeed | any

export function RNGFactory(): RNGFunction

export function RNGFactory<R extends RNG>(arg0: R, ...rest): R

export function RNGFactory(arg0: 'xor128', ...rest): RNGXOR128
export function RNGFactory(arg0: 'function', ...rest): RNGFunction
export function RNGFactory<S extends IRNGFunctionSeed = IRNGFunctionSeed>(arg0: 'function', ...rest): RNGFunction<S>
export function RNGFactory(arg0: 'default', ...rest): RNGMathRandom
export function RNGFactory(arg0: 'seedrandom', ...rest): RNGSeedRandom

export function RNGFactory<S extends IRNGFunctionSeed = IRNGFunctionSeed>(arg0: S, ...rest): RNGFunction<S>

export function RNGFactory<R extends RNG = RNG>(...argv): R
export function RNGFactory(...args)
{
	const [arg0 = 'default', ...rest] = args

	switch (typeof arg0)
	{
		case 'object':
			if (arg0 instanceof RNG)
			{
				return arg0
			}
			break

		case 'function':
			return new RNGFunction(arg0)

		case 'string':
			const PRNG = PRNG_BUILTINS[arg0]
			if (PRNG)
			{
				return new PRNG(...rest)
			}
			break
	}

	throw new TypeError(`invalid RNG "${arg0}"`)
}

export default RNGFactory

