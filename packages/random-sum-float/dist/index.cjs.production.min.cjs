"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("random-extra");

function randomSumFloat(r, t, o, a) {
  return e.dfSumFloat(r, t, o, a)();
}

Object.defineProperty(exports, "create", {
  enumerable: !0,
  get: function() {
    return e.dfSumFloat;
  }
}), exports.default = randomSumFloat, exports.randomSumFloat = randomSumFloat;
//# sourceMappingURL=index.cjs.production.min.cjs.map
