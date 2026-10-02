"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

let t = /*#__PURE__*/ function(t) {
  return t.NANOID_URL = "ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz", 
  t.SHORTID = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-", 
  t.SHORTID2 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@", 
  t.UNI_CHAR1 = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫", 
  t.DEFAULT = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 
  t.BASE16 = "0123456789abcdef", t.BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
  t.BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", t.BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 
  t.BASE66 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~", 
  t.BASE71 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!'()*-._~", 
  t;
}({});

const _ = /*#__PURE__*/ Math.pow(2, 32);

exports.BYTE_TO_HEX_TO_LOWER_CASE = [], exports.BYTE_TO_HEX_TO_UPPER_CASE = [];

for (let t = 0; t < 256; ++t) exports.BYTE_TO_HEX_TO_LOWER_CASE[t] = /*#__PURE__*/ (t + 0x100).toString(16).substr(1), 
exports.BYTE_TO_HEX_TO_UPPER_CASE[t] = /*#__PURE__*/ exports.BYTE_TO_HEX_TO_LOWER_CASE[t].toUpperCase();

function stringifyByte(t) {
  return exports.BYTE_TO_HEX_TO_UPPER_CASE[t];
}

exports.BYTE_TO_HEX_TO_LOWER_CASE = /*#__PURE__*/ Object.freeze(exports.BYTE_TO_HEX_TO_LOWER_CASE), 
exports.BYTE_TO_HEX_TO_UPPER_CASE = /*#__PURE__*/ Object.freeze(exports.BYTE_TO_HEX_TO_UPPER_CASE), 
exports.ENUM_ALPHABET = t, exports.FLOAT_ENTROPY_BYTES = 7, exports.MATH_POW_2_32 = _, 
exports.SUM_DELTA = 0.00000000000005, exports.UINT32_BYTES = 4, exports.UINT32_VALUE = 0xffffffff, 
exports.hashArgv = function hashArgv(t) {
  return String(t.join(";"));
}, exports.isUnset = function isUnset(t) {
  return null == t;
}, exports.stringifyByte = stringifyByte, exports.toHexArray = function toHexArray(t) {
  return t.map(stringifyByte);
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
