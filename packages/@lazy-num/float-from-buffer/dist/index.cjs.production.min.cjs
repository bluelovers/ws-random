"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var r = require("@lazy-random/shared-lib");

function floatFromBuffer(t, e = 0) {
  if (e = Math.floor(e), t.length < r.FLOAT_ENTROPY_BYTES + e || e < 0) throw new RangeError(`buffer must contain at least ${r.FLOAT_ENTROPY_BYTES}${e > 0 ? " +" + e : ""} bytes of entropy`);
  return _floatFromBuffer(t, e);
}

function _floatFromBuffer(r, t = 0) {
  let e = Math.floor(t);
  return ((((((r[e++] % 32 / 32 + r[e++]) / 256 + r[e++]) / 256 + r[e++]) / 256 + r[e++]) / 256 + r[e++]) / 256 + r[e]) / 256;
}

function readUInt32BE(r, t = 0) {
  return 0x1000000 * r[t >>>= 0] + (r[t + 1] << 16 | r[t + 2] << 8 | r[t + 3]);
}

exports._floatFromBuffer = _floatFromBuffer, exports._floatFromBuffer2 = function _floatFromBuffer2(t, e = 0) {
  return readUInt32BE(t, e) / r.MATH_POW_2_32;
}, exports.default = floatFromBuffer, exports.floatFromBuffer = floatFromBuffer, 
exports.readUInt32BE = readUInt32BE, exports.readUInt32LE = function readUInt32LE(r, t = 0) {
  return (r[t >>>= 0] | r[t + 1] << 8 | r[t + 2] << 16) + 0x1000000 * r[t + 3];
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
