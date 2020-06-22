/**
 * Created by user on 2018/11/9/009.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const UString = require("uni-string");
const util_1 = require("../util");
const const_1 = require("../util/const");
const distributions_1 = require("../util/distributions");
const ow_1 = require("../util/ow");
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
        char = const_1.ENUM_ALPHABET.DEFAULT;
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
