"use strict";

function isZero(e) {
  return 0 === e || -0 === e;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = isZero, exports.fixZero = function fixZero(e) {
  return -0 === e ? 0 : e;
}, exports.isZero = isZero;
//# sourceMappingURL=index.cjs.production.min.cjs.map
