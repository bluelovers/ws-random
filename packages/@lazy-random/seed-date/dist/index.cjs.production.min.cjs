"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/original-math-random"), t = require("@lazy-num/float-to-string");

function seedFloatByDate(t, o) {
  return t.valueOf() + (null != o ? o : e._MathRandom)();
}

exports.seedFloatByDate = seedFloatByDate, exports.seedFloatByNow = function seedFloatByNow(e) {
  return seedFloatByDate(new Date, e);
}, exports.seedStringByDate = function seedStringByDate(e, o) {
  return t.floatToString(seedFloatByDate(e, o));
}, exports.seedStringByNow = function seedStringByNow(e) {
  return t.floatToString(seedFloatByDate(new Date, e));
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
