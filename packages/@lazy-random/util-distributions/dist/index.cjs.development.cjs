'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function randIndex(random, len) {
  return Math.floor(random.next() * len);
}
function randIndexWithRange(random, start, end) {
  return Math.floor(float(random, start, end));
}
function float(random, min, max) {
  return random.next() * (max - min) + min;
}
function int(random, min, max) {
  //return Math.floor(float(random, min, max + 1))
  return randIndexWithRange(random, min, max + 1);
}

const UtilDistributions = {
  randIndex,
  float,
  int
};

exports.default = UtilDistributions;
exports.float = float;
exports.int = int;
exports.randIndex = randIndex;
exports.randIndexWithRange = randIndexWithRange;
//# sourceMappingURL=index.cjs.development.cjs.map
