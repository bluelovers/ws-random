import { RNGCrypto } from '@lazy-random/generators-crypto';
import { RNGMathRandom2 } from '@lazy-random/generators-math-random2';
import { RNGSeedRandom } from '@lazy-random/generators-seedrandom';
import { RNG } from '@lazy-random/rng-abstract';
import { RNGXOR128 } from '@lazy-random/generators-xor128';
import { RNGFunction } from '@lazy-random/generators-function';
import { RNGMathRandom } from '@lazy-random/generators-math-random';

const PRNG_BUILTINS = {
  'xor128': RNGXOR128,
  'function': RNGFunction,
  'default': RNGMathRandom2,
  'math-random': RNGMathRandom,
  'math-random2': RNGMathRandom2,
  'seedrandom': RNGSeedRandom,
  'crypto': RNGCrypto
};
function RNGFactory(...args) {
  const [arg0 = 'default', ...rest] = args;

  switch (typeof arg0) {
    case 'object':
      if (arg0 instanceof RNG) {
        return arg0;
      }

      break;

    case 'function':
      return new RNGFunction(arg0);

    case 'string':
      const PRNG = PRNG_BUILTINS[arg0];

      if (PRNG) {
        return new PRNG(...rest);
      }

      break;
  }

  throw new TypeError(`invalid RNG "${arg0}"`);
}

export { RNGFactory, RNGFactory as default };
//# sourceMappingURL=index.esm.mjs.map
