"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = require("@lazy-random/shared-lib"), r = require("@lazy-random/df-uniform"), t = require("@lazy-random/bytes-to-uuid");

function dfUuidV4(u, d) {
  const i = r.dfUniformBytes(u, 16), o = t._createBytesToUuidFn(d ? e.BYTE_TO_HEX_TO_UPPER_CASE : e.BYTE_TO_HEX_TO_LOWER_CASE);
  return () => {
    let e = i();
    return e[6] = 0x0f & e[6] | 0x40, e[8] = 0x3f & e[8] | 0x80, o(e);
  };
}

const u = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

exports.UUID4_PATTERN = u, exports.default = dfUuidV4, exports.dfUuidV4 = dfUuidV4, 
exports.isUUID4 = function isUUID4(e) {
  return u.test(e);
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
