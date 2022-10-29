"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/shared-lib");

function bytesToUuid(t, r, o = e.BYTE_TO_HEX_TO_LOWER_CASE) {
  let u = r || 0;
  return [ o[t[u++]], o[t[u++]], o[t[u++]], o[t[u++]], "-", o[t[u++]], o[t[u++]], "-", o[t[u++]], o[t[u++]], "-", o[t[u++]], o[t[u++]], "-", o[t[u++]], o[t[u++]], o[t[u++]], o[t[u++]], o[t[u++]], o[t[u++]] ].join("");
}

exports._createBytesToUuidFn = function _createBytesToUuidFn(t = e.BYTE_TO_HEX_TO_LOWER_CASE) {
  return (e, r) => {
    let o = r || 0;
    return [ t[e[o++]], t[e[o++]], t[e[o++]], t[e[o++]], "-", t[e[o++]], t[e[o++]], "-", t[e[o++]], t[e[o++]], "-", t[e[o++]], t[e[o++]], "-", t[e[o++]], t[e[o++]], t[e[o++]], t[e[o++]], t[e[o++]], t[e[o++]] ].join("");
  };
}, exports.bytesToUuid = bytesToUuid, exports.default = bytesToUuid;
//# sourceMappingURL=index.cjs.production.min.cjs.map
