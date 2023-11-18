"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e, n = require("big.js");

function numberInDelta(e, r, t = .05) {
  return 1 !== new n(r).sub(e).abs().cmp(t);
}

exports.EnumBigComparison = void 0, (e = exports.EnumBigComparison || (exports.EnumBigComparison = {}))[e.GT = 1] = "GT", 
e[e.EQ = 0] = "EQ", e[e.LT = -1] = "LT", exports.default = numberInDelta, exports.numberInDelta = numberInDelta, 
exports.numberInDeltaUnsafe001 = function numberInDeltaUnsafe001(e, n, r = .05) {
  return n - r <= e && e <= n + r;
}, exports.numberInDeltaUnsafe002 = function numberInDeltaUnsafe002(e, n, r = .05) {
  return Math.abs(n - e) <= r;
}, exports.subAbs = function subAbs(e, r) {
  return new n(r).sub(e).abs().valueOf();
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
