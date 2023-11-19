"use strict";

function randIndex(n, t) {
  return Math.floor(n.next() * t);
}

function randIndexWithRange(n, t, e) {
  return Math.floor(float(n, t, e));
}

function float(n, t, e) {
  return n.next() * (e - t) + t;
}

function int(n, t, e) {
  return randIndexWithRange(n, t, e + 1);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = {
  randIndex,
  float,
  int
}, exports.float = float, exports.int = int, exports.randIndex = randIndex, exports.randIndexWithRange = randIndexWithRange;
//# sourceMappingURL=index.cjs.production.min.cjs.map
