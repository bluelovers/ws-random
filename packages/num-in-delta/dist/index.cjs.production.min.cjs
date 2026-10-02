"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("big.js");

let n = /*#__PURE__*/ function(e) {
  return e[e.GT = 1] = "GT", e[e.EQ = 0] = "EQ", e[e.LT = -1] = "LT", e;
}({});

function numberInDelta(r, t, u = .05) {
  return new e(t).sub(r).abs().cmp(u) !== n.GT;
}

exports.EnumBigComparison = n, exports.default = numberInDelta, exports.numberInDelta = numberInDelta, 
exports.numberInDeltaUnsafe001 = function numberInDeltaUnsafe001(e, n, r = .05) {
  return n - r <= e && e <= n + r;
}, exports.numberInDeltaUnsafe002 = function numberInDeltaUnsafe002(e, n, r = .05) {
  return Math.abs(n - e) <= r;
}, exports.subAbs = function subAbs(n, r) {
  return new e(r).sub(n).abs().valueOf();
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
