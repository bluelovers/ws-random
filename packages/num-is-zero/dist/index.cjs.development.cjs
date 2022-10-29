'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isZero(val) {
  return val === 0 || val === -0;
}
function fixZero(val) {
  return val === -0 ? 0 : val;
}

exports.default = isZero;
exports.fixZero = fixZero;
exports.isZero = isZero;
//# sourceMappingURL=index.cjs.development.cjs.map
