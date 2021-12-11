import { dfSumFloat } from 'random-extra';
export { dfSumFloat as create } from 'random-extra';

function randomSumFloat(size, sum, min, max) {
  return dfSumFloat(size, sum, min, max)();
}

export { randomSumFloat as default, randomSumFloat };
//# sourceMappingURL=index.esm.mjs.map
