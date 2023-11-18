'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sharedLib = require('@lazy-random/shared-lib');

function _createBytesToUuidFn(bth = sharedLib.BYTE_TO_HEX_TO_LOWER_CASE) {
  return (buf, offset) => {
    let i = offset || 0;
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
  };
}
/**
 * @see https://github.com/kelektiv/node-uuid/blob/master/lib/bytesToUuid.js
 */
function bytesToUuid(buf, offset, bth = sharedLib.BYTE_TO_HEX_TO_LOWER_CASE) {
  let i = offset || 0;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

exports._createBytesToUuidFn = _createBytesToUuidFn;
exports.bytesToUuid = bytesToUuid;
exports.default = bytesToUuid;
//# sourceMappingURL=index.cjs.development.cjs.map
