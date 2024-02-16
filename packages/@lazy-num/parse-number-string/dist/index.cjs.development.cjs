'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const reInt = /^[+-]?\d+$/;
const reFloatOnly = /^[+-]?(?:\d+)?\.\d+$/;
const reFloat = /*#__PURE__*/new RegExp(reInt.source + '|' + reFloatOnly.source);
function isIntString(input) {
  return typeof input === 'string' && reInt.test(input);
}
function isFloatOnlyString(input) {
  return typeof input === 'string' && reFloatOnly.test(input);
}
function isFloatString(input) {
  return typeof input === 'string' && reFloat.test(input);
}
function _parseNumberString(validFn, input) {
  if (validFn(input)) {
    return Number(input);
  }
  if (typeof input !== 'number') {
    throw new TypeError(`Invalid value: ${input}`);
  }
  return input;
}
function parseIntString(input) {
  return _parseNumberString(isIntString, input);
}
function parseFloatOnlyString(input) {
  return _parseNumberString(isFloatOnlyString, input);
}
function parseFloatString(input) {
  return _parseNumberString(isFloatString, input);
}

exports._parseNumberString = _parseNumberString;
exports.default = parseFloatString;
exports.isFloatOnlyString = isFloatOnlyString;
exports.isFloatString = isFloatString;
exports.isIntString = isIntString;
exports.parseFloatOnlyString = parseFloatOnlyString;
exports.parseFloatString = parseFloatString;
exports.parseIntString = parseIntString;
//# sourceMappingURL=index.cjs.development.cjs.map
