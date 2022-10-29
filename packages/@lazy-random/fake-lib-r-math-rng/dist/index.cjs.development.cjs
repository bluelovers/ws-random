'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function fakeLibRMathRng(fn) {
  return {
    unif_rand(n) {
      if (n > 1) {
        let a = [];
        while (n--) {
          a[n] = fn();
        }
        return a;
      }
      return fn();
    }
  };
}

exports.default = fakeLibRMathRng;
exports.fakeLibRMathRng = fakeLibRMathRng;
//# sourceMappingURL=index.cjs.development.cjs.map
