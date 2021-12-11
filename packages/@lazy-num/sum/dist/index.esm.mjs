import { fixZero } from 'num-is-zero';

function sum_1_to_n(n) {
  return n * (n + 1) / 2;
}
function num_array_sum(na) {
  return fixZero(na.reduce((a, b) => a + b));
}

export { num_array_sum, sum_1_to_n };
//# sourceMappingURL=index.esm.mjs.map
