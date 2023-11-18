'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var numIsZero = require('num-is-zero');

/**
 * (1 + 2 + 3 +...+N)
 *
 * @see http://emn178.pixnet.net/blog/post/92132837-%E8%A8%88%E7%AE%971%E5%88%B0n%E7%B8%BD%E5%92%8C%281-%2B-2-%2B-3-%2B...%2Bn%29
 */
function sum_1_to_n(n) {
  return n * (n + 1) / 2;
}
function num_array_sum(na) {
  return numIsZero.fixZero(na.reduce((a, b) => a + b));
}

exports.num_array_sum = num_array_sum;
exports.sum_1_to_n = sum_1_to_n;
//# sourceMappingURL=index.cjs.development.cjs.map
