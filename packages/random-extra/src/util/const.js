Object.defineProperty(exports, "__esModule", { value: true });
var ENUM_ALPHABET;
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
})(ENUM_ALPHABET = exports.ENUM_ALPHABET || (exports.ENUM_ALPHABET = {}));
exports.SUM_DELTA = 0.00000000000005;
exports.FLOAT_ENTROPY_BYTES = 7;
exports.UINT32_BYTES = 4;
exports.UINT32_VALUE = 0xffffffff;
exports.MATH_POW_2_32 = Math.pow(2, 32);
exports.BYTE_TO_HEX_TO_LOWER_CASE = [];
exports.BYTE_TO_HEX_TO_UPPER_CASE = [];
for (let i = 0; i < 256; ++i) {
    // @ts-ignore
    exports.BYTE_TO_HEX_TO_LOWER_CASE[i] = (i + 0x100).toString(16).substr(1);
    // @ts-ignore
    exports.BYTE_TO_HEX_TO_UPPER_CASE[i] = exports.BYTE_TO_HEX_TO_LOWER_CASE[i].toUpperCase();
}
// @ts-ignore
exports.BYTE_TO_HEX_TO_LOWER_CASE = Object.freeze(exports.BYTE_TO_HEX_TO_LOWER_CASE);
// @ts-ignore
exports.BYTE_TO_HEX_TO_UPPER_CASE = Object.freeze(exports.BYTE_TO_HEX_TO_UPPER_CASE);
// @ts-ignore
Object.freeze(exports);
