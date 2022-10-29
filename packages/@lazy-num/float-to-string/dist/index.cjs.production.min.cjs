"use strict";

function assertFractionDigits(t) {
  if (!Number.isFinite(t) || !Number.isInteger(t) || 0 === t) throw new TypeError(`Invalid fractionDigits: ${t}`);
}

function splitFloatNumberToString(t) {
  return String(t).split(".");
}

function getFractionDigitsString(t) {
  return splitFloatNumberToString(t)[1];
}

function splitFloatNumber(t) {
  let i = Math.floor(t);
  return [ i, t - i ];
}

function joinFloatNumber(t, i) {
  return String(t) + (null != i && i.length ? "." + i : "");
}

function floatToString(t, i) {
  let r, o;
  if ("number" == typeof i) assertFractionDigits(i), [r, o] = splitFloatNumberToString(t.toFixed(i)); else {
    let i;
    [r, i] = splitFloatNumber(t), o = getFractionDigitsString(i);
  }
  return joinFloatNumber(r, o);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.assertFractionDigits = assertFractionDigits, exports.default = floatToString, 
exports.floatToString = floatToString, exports.getFractionDigitsString = getFractionDigitsString, 
exports.joinFloatNumber = joinFloatNumber, exports.splitFloatNumber = splitFloatNumber, 
exports.splitFloatNumberToString = splitFloatNumberToString;
//# sourceMappingURL=index.cjs.production.min.cjs.map
