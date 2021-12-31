import { simpleWrap } from '@lazy-random/simple-wrap';
import { _MathRandom } from '@lazy-random/original-math-random';
import { RNGFactory } from '@lazy-random/rng-factory';
export { RNGFactory as newRngFactory } from '@lazy-random/rng-factory';
import seedrandom from 'seedrandom';

function newRngMathRandom() {
  return simpleWrap(_MathRandom);
}
function newRngSeedRandom() {
  return RNGFactory(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'));
}

export { newRngMathRandom, newRngSeedRandom };
//# sourceMappingURL=index.esm.mjs.map
