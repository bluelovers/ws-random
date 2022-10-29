"use strict";

function fakeLibRMathRng(e) {
  return {
    unif_rand(t) {
      if (t > 1) {
        let r = [];
        for (;t--; ) r[t] = e();
        return r;
      }
      return e();
    }
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = fakeLibRMathRng, exports.fakeLibRMathRng = fakeLibRMathRng;
//# sourceMappingURL=index.cjs.production.min.cjs.map
