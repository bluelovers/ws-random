import { _MathRandom } from '@lazy-random/original-math-random';

function arrayRandIndexByLength(len, ...argv) {
  return Math.floor(_MathRandom() * len);
}
function arrayRandIndex(array, ...argv) {
  return arrayRandIndexByLength(array.length);
}

export { arrayRandIndex, arrayRandIndexByLength, arrayRandIndex as default };
//# sourceMappingURL=index.esm.mjs.map
