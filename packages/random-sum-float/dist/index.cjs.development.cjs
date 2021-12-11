'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var randomExtra = require('random-extra');

function randomSumFloat(size, sum, min, max) {
  return randomExtra.dfSumFloat(size, sum, min, max)();
}

Object.defineProperty(exports, 'create', {
	enumerable: true,
	get: function () { return randomExtra.dfSumFloat; }
});
exports["default"] = randomSumFloat;
exports.randomSumFloat = randomSumFloat;
//# sourceMappingURL=index.cjs.development.cjs.map
