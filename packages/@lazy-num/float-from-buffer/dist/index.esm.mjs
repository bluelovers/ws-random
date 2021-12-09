import { FLOAT_ENTROPY_BYTES, MATH_POW_2_32 } from '@lazy-random/shared-lib';

function floatFromBuffer(buf, offset = 0) {
  offset = Math.floor(offset);

  if (buf.length < FLOAT_ENTROPY_BYTES + offset || offset < 0) {
    throw new RangeError(`buffer must contain at least ${FLOAT_ENTROPY_BYTES}${offset > 0 ? ' +' + offset : ''} bytes of entropy`);
  }

  return _floatFromBuffer(buf, offset);
}
function _floatFromBuffer(buf, offset = 0) {
  let position = Math.floor(offset);
  return ((((((buf[position++] % 32 / 32 + buf[position++]) / 256 + buf[position++]) / 256 + buf[position++]) / 256 + buf[position++]) / 256 + buf[position++]) / 256 + buf[position]) / 256;
}
function _floatFromBuffer2(buf, offset = 0) {
  return readUInt32BE(buf, offset) / MATH_POW_2_32;
}
function readUInt32LE(buf, offset = 0) {
  offset = offset >>> 0;
  return (buf[offset] | buf[offset + 1] << 8 | buf[offset + 2] << 16) + buf[offset + 3] * 0x1000000;
}
function readUInt32BE(buf, offset = 0) {
  offset = offset >>> 0;
  return buf[offset] * 0x1000000 + (buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3]);
}

export { _floatFromBuffer, _floatFromBuffer2, floatFromBuffer as default, floatFromBuffer, readUInt32BE, readUInt32LE };
//# sourceMappingURL=index.esm.mjs.map
