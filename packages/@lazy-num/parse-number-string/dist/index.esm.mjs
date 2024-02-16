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

function parseIntString(t) {
  return _parseNumberString(isIntString, t);
}

function parseFloatOnlyString(t) {
  return _parseNumberString(isFloatOnlyString, t);
}

function parseFloatString(t) {
  return _parseNumberString(isFloatString, t);
}

export { _parseNumberString, parseFloatString as default, isFloatOnlyString, isFloatString, isIntString, parseFloatOnlyString, parseFloatString, parseIntString };
//# sourceMappingURL=index.esm.mjs.map
