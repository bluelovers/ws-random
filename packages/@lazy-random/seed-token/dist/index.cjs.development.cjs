'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var check = require('chai-asserttype-extra/lib/check');

function seedToken(seed, opts, ...argv) {
  if (check.isIntFinite(seed)) {
    return seed;
  } else {
    let strSeed = '' + seed;
    let s = 0;
    let len = strSeed.length;

    for (let k = 0; k < len; ++k) {
      s ^= strSeed.charCodeAt(k) | 0;
    }

    return s;
  }
}

exports["default"] = seedToken;
exports.seedToken = seedToken;
//# sourceMappingURL=index.cjs.development.cjs.map
