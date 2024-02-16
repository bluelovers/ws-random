"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = /^[+-]?\d+$/, r = /^[+-]?(?:\d+)?\.\d+$/, n = new RegExp(t.source + "|" + r.source);

function isIntString(r) {
  return "string" == typeof r && t.test(r);
}

function isFloatOnlyString(t) {
  return "string" == typeof t && r.test(t);
}

function isFloatString(t) {
  return "string" == typeof t && n.test(t);
}

function _parseNumberString(t, r) {
  if (t(r)) return Number(r);
  if ("number" != typeof r) throw new TypeError(`Invalid value: ${r}`);
  return r;
}

function parseFloatString(t) {
  return _parseNumberString(isFloatString, t);
}

exports._parseNumberString = _parseNumberString, exports.default = parseFloatString, 
exports.isFloatOnlyString = isFloatOnlyString, exports.isFloatString = isFloatString, 
exports.isIntString = isIntString, exports.parseFloatOnlyString = function parseFloatOnlyString(t) {
  return _parseNumberString(isFloatOnlyString, t);
}, exports.parseFloatString = parseFloatString, exports.parseIntString = function parseIntString(t) {
  return _parseNumberString(isIntString, t);
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
