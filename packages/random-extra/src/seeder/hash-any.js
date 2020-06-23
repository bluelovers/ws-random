"use strict";
/**
 * Created by user on 2018/10/20/020.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashAny = void 0;
const hash_sum_1 = __importDefault(require("hash-sum"));
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
        seed = hash_sum_1.default(seed);
    }
    return String(seed);
}
exports.hashAny = hashAny;
exports.default = hashAny;
//# sourceMappingURL=hash-any.js.map