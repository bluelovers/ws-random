'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.ENUM_ALPHABET = void 0;

(function (ENUM_ALPHABET) {
  ENUM_ALPHABET["NANOID_URL"] = "ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz";
  ENUM_ALPHABET["SHORTID"] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  ENUM_ALPHABET["SHORTID2"] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@";
  ENUM_ALPHABET["UNI_CHAR1"] = "\u24B6\u24B7\u24B8\u24B9\u24BA\u24BB\u24BC\u24BD\u24BE\u24BF\u24C0\u24C1\u24C2\u24C3\u24C4\u24C5\u24C6\u24C7\u24C8\u24C9\u24CA\u24CB\u24CC\u24CD\u24CE\u24CF\u24D0\u24D1\u24D2\u24D3\u24D4\u24D5\u24D6\u24D7\u24D8\u24D9\u24DA\u24DB\u24DC\u24DD\u24DE\u24DF\u24E0\u24E1\u24E2\u24E3\u24E4\u24E5\u24E6\u24E7\u24E8\u24E9\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B";
  ENUM_ALPHABET["DEFAULT"] = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ENUM_ALPHABET["BASE16"] = "0123456789abcdef";
  ENUM_ALPHABET["BASE36"] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ENUM_ALPHABET["BASE58"] = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  ENUM_ALPHABET["BASE62"] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  ENUM_ALPHABET["BASE66"] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~";
  ENUM_ALPHABET["BASE71"] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!'()*-._~";
})(exports.ENUM_ALPHABET || (exports.ENUM_ALPHABET = {}));

const SUM_DELTA = 0.00000000000005;
const FLOAT_ENTROPY_BYTES = 7;
const UINT32_BYTES = 4;
const UINT32_VALUE = 0xffffffff;
const MATH_POW_2_32 = /*#__PURE__*/Math.pow(2, 32);
exports.BYTE_TO_HEX_TO_LOWER_CASE = [];
exports.BYTE_TO_HEX_TO_UPPER_CASE = [];

for (let i = 0; i < 256; ++i) {
  exports.BYTE_TO_HEX_TO_LOWER_CASE[i] = /*#__PURE__*/(i + 0x100).toString(16).substr(1);
  exports.BYTE_TO_HEX_TO_UPPER_CASE[i] = /*#__PURE__*/exports.BYTE_TO_HEX_TO_LOWER_CASE[i].toUpperCase();
}

exports.BYTE_TO_HEX_TO_LOWER_CASE = /*#__PURE__*/Object.freeze(exports.BYTE_TO_HEX_TO_LOWER_CASE);
exports.BYTE_TO_HEX_TO_UPPER_CASE = /*#__PURE__*/Object.freeze(exports.BYTE_TO_HEX_TO_UPPER_CASE);

function stringifyByte(byte) {
  return exports.BYTE_TO_HEX_TO_UPPER_CASE[byte];
}
function toHexArray(arr) {
  return arr.map(stringifyByte);
}

function hashArgv(args) {
  return String(args.join(';'));
}

function isUnset(n) {
  return typeof n === 'undefined' || n === null;
}

exports.FLOAT_ENTROPY_BYTES = FLOAT_ENTROPY_BYTES;
exports.MATH_POW_2_32 = MATH_POW_2_32;
exports.SUM_DELTA = SUM_DELTA;
exports.UINT32_BYTES = UINT32_BYTES;
exports.UINT32_VALUE = UINT32_VALUE;
exports.hashArgv = hashArgv;
exports.isUnset = isUnset;
exports.stringifyByte = stringifyByte;
exports.toHexArray = toHexArray;
//# sourceMappingURL=index.cjs.development.cjs.map
