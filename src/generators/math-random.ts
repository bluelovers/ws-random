import RNG from '../rng'

export class RNGMathRandom extends RNG
{
  get name()
  {
    return 'default'
  }

  next()
  {
    return Math.random()
  }

  seed(seed?, opts?)
  {
    // intentionally empty
  }

  clone()
  {
    return new RNGMathRandom()
  }
}

export default RNGMathRandom

// @ts-ignore
Object.freeze(exports)
