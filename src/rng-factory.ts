import RNG from './rng'

import RNGXOR128 from './generators/xor128'
import RNGFunction, { IRNGFunctionSeed } from './generators/function'
import RNGMathRandom from './generators/math-random'

const PRNG_BUILTINS = {
  // TODO: add more prng from C++11 lib
  'xor128': RNGXOR128,
  'function': RNGFunction,
  'default': RNGMathRandom,
}

export function factory(): RNGFunction

export function factory<R extends RNG = RNG>(arg0: R, ...rest): R

export function factory(arg0: 'xor128', ...rest): RNGXOR128
export function factory(arg0: 'function', ...rest): RNGFunction
export function factory<S extends IRNGFunctionSeed = IRNGFunctionSeed>(arg0: 'function', ...rest): RNGFunction<S>
export function factory(arg0: 'default', ...rest): RNGMathRandom

export function factory<S extends IRNGFunctionSeed = IRNGFunctionSeed>(arg0: S, ...rest): RNGFunction<S>

export function factory<R extends RNG = RNG>(...argv): R
export function factory(...args)
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

  throw new Error(`invalid RNG "${arg0}"`)
}

export default factory
// @ts-ignore
Object.freeze(exports)
