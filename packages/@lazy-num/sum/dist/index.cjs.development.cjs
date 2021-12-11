'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var numIsZero = require('num-is-zero');

function sum_1_to_n(n) {
  return n * (n + 1) / 2;
}
function num_array_sum(na) {
  return numIsZero.fixZero(na.reduce((a, b) => a + b));
}

exports.num_array_sum = num_array_sum;
exports.sum_1_to_n = sum_1_to_n;
//# sourceMappingURL=index.cjs.development.cjs.map
