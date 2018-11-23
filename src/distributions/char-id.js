/**
 * Created by user on 2018/11/9/009.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const UString = require("uni-string");
const util_1 = require("../util");
const ow_1 = require("../util/ow");
const distributions_1 = require("../util/distributions");
var ENUM_ALPHABET;
(function (ENUM_ALPHABET) {
    ENUM_ALPHABET["NANOID_URL"] = "ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz";
    ENUM_ALPHABET["SHORTID"] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
    ENUM_ALPHABET["SHORTID2"] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@";
    ENUM_ALPHABET["UNI_CHAR1"] = "\u24B6\u24B7\u24B8\u24B9\u24BA\u24BB\u24BC\u24BD\u24BE\u24BF\u24C0\u24C1\u24C2\u24C3\u24C4\u24C5\u24C6\u24C7\u24C8\u24C9\u24CA\u24CB\u24CC\u24CD\u24CE\u24CF\u24D0\u24D1\u24D2\u24D3\u24D4\u24D5\u24D6\u24D7\u24D8\u24D9\u24DA\u24DB\u24DC\u24DD\u24DE\u24DF\u24E0\u24E1\u24E2\u24E3\u24E4\u24E5\u24E6\u24E7\u24E8\u24E9\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B";
    ENUM_ALPHABET["DEFAULT"] = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
})(ENUM_ALPHABET = exports.ENUM_ALPHABET || (exports.ENUM_ALPHABET = {}));
exports.default = (random, char, size) => {
    if (typeof char === 'number') {
        if (typeof size === 'number') {
            char = util_1.floatToString(char);
        }
        else {
            [size, char] = [char, null];
        }
    }
    size = size || 8;
    //ow(size, ow.number.integer.gt(0));
    ow_1.default(size).integer.gt(0);
    if (!char) {
        char = ENUM_ALPHABET.DEFAULT;
    }
    let ls = UString.create(char).split('');
    let len = ls.length;
    ow_1.default(ls).to.have.lengthOf.gt(1);
    const randIndex = () => {
        return distributions_1.randIndex(random, len);
    };
    return () => {
        let i = size;
        let list = [];
        while (i--) {
            list.push(ls[randIndex()]);
        }
        return list.join('');
    };
};
// @ts-ignore
Object.freeze(exports);
