/**
 * Created by user on 2018/10/20/020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const hashSum = require("hash-sum");
//import shortid = require('shortid');
const util_1 = require("../util");
//import { hashSum } from './hash-sum';
//import { shortid } from './shortid';
//declare function shortid(): string
//declare function hashSum(input): string
function hashAny(seed, ...argv) {
    if (!seed) {
        seed = util_1.randomSeedStr();
    }
    else if (typeof seed !== 'string') {
        seed = hashSum(seed);
    }
    return String(seed);
}
exports.hashAny = hashAny;
exports.default = hashAny;
// @ts-ignore
Object.freeze(exports);
