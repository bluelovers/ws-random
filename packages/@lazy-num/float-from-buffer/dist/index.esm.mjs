import { FLOAT_ENTROPY_BYTES as r, MATH_POW_2_32 as f } from "@lazy-random/shared-lib";

function floatFromBuffer(f, t = 0) {
  if (t = Math.floor(t), f.length < r + t || t < 0) throw new RangeError(`buffer must contain at least ${r}${t > 0 ? " +" + t : ""} bytes of entropy`);
  return _floatFromBuffer(f, t);
}

function _floatFromBuffer(r, f = 0) {
  let t = Math.floor(f);
  return ((((((r[t++] % 32 / 32 + r[t++]) / 256 + r[t++]) / 256 + r[t++]) / 256 + r[t++]) / 256 + r[t++]) / 256 + r[t]) / 256;
}

function _floatFromBuffer2(r, t = 0) {
  return readUInt32BE(r, t) / f;
}

function readUInt32LE(r, f = 0) {
  return (r[f >>>= 0] | r[f + 1] << 8 | r[f + 2] << 16) + 0x1000000 * r[f + 3];
}

function readUInt32BE(r, f = 0) {
  return 0x1000000 * r[f >>>= 0] + (r[f + 1] << 16 | r[f + 2] << 8 | r[f + 3]);
}

export { _floatFromBuffer, _floatFromBuffer2, floatFromBuffer as default, floatFromBuffer, readUInt32BE, readUInt32LE };
//# sourceMappingURL=index.esm.mjs.map
