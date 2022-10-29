var t;

!function(t) {
  t.NANOID_URL = "ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz", 
  t.SHORTID = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-", 
  t.SHORTID2 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@", 
  t.UNI_CHAR1 = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫", 
  t.DEFAULT = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 
  t.BASE16 = "0123456789abcdef", t.BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
  t.BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", t.BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 
  t.BASE66 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~", 
  t.BASE71 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!'()*-._~";
}(t || (t = {}));

const e = 0.00000000000005, r = 7, n = 4, i = 0xffffffff, o = Math.pow(2, 32);

let A = [], s = [];

for (let t = 0; t < 256; ++t) A[t] = (t + 0x100).toString(16).substr(1), s[t] = A[t].toUpperCase();

function stringifyByte(t) {
  return s[t];
}

function toHexArray(t) {
  return t.map(stringifyByte);
}

function hashArgv(t) {
  return String(t.join(";"));
}

function isUnset(t) {
  return null == t;
}

A = Object.freeze(A), s = Object.freeze(s);

export { A as BYTE_TO_HEX_TO_LOWER_CASE, s as BYTE_TO_HEX_TO_UPPER_CASE, t as ENUM_ALPHABET, r as FLOAT_ENTROPY_BYTES, o as MATH_POW_2_32, e as SUM_DELTA, n as UINT32_BYTES, i as UINT32_VALUE, hashArgv, isUnset, stringifyByte, toHexArray };
//# sourceMappingURL=index.esm.mjs.map
