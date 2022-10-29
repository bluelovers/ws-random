"use strict";

function randIndex(t, n) {
  return Math.floor(t.next() * n);
}

function float(t, n, e) {
  return t.next() * (e - n) + n;
}

function int(t, n, e) {
  return Math.floor(float(t, n, e + 1));
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = {
  randIndex,
  float,
  int
}, exports.float = float, exports.int = int, exports.randIndex = randIndex;
//# sourceMappingURL=index.cjs.production.min.cjs.map
