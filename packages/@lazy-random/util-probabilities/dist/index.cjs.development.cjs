'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Created by user on 2021/12/11.
 */
/**
 * simple probabilities
 */
function get_prob(size, sum) {
  let score = sum;
  let resultArray = [];
  let randomTotal = 0;
  let i = size - 1;
  while (i--) {
    let random = Math.round(score / size);
    resultArray.push(random);
    randomTotal += random;
    score = score - random;
  }
  let result = sum - randomTotal;
  resultArray.unshift(result);
  return resultArray;
}
function get_prob_float(size, sum) {
  let score = sum;
  let resultArray = [];
  let randomTotal = 0;
  let i = size - 1;
  while (i--) {
    let random = score / size;
    resultArray.push(random);
    randomTotal += random;
    score = score - random;
  }
  let result = sum - randomTotal;
  resultArray.unshift(result);
  return resultArray;
}

exports.get_prob = get_prob;
exports.get_prob_float = get_prob_float;
//# sourceMappingURL=index.cjs.development.cjs.map
