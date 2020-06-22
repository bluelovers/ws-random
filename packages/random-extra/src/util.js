/**
 * Created by user on 2018/10/20/020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const hashSum = require("hash-sum");
const _nanoid = require("nanoid/non-secure");
const _pkg = require("../package.json");
const const_1 = require("./util/const");
//import shortid = require('shortid');
//
//export declare function shortid(): string
//export declare function hashSum(input): string
//
//export { shortid, hashSum }
const _GLOBAL = (0, eval)('this');
// @ts-ignore
exports._MathRandom = _MathRandom = Math.random;
function randomSeedNum() {
    return (_MathRandom() * const_1.MATH_POW_2_32) + _MathRandom();
}
exports.randomSeedNum = randomSeedNum;
/**
 * give a random string for create seed
 */
function randomSeedStr() {
    return [
        _nanoid(),
        hashSum(_pkg.name),
        hashSum(_pkg.version),
        Date.now(),
        floatToString(_MathRandom()),
    ].join('_');
}
exports.randomSeedStr = randomSeedStr;
/**
 * @todo support typescript
 */
function getClass(RNGClass, thisArgv, ...argv) {
    let o;
    if (thisArgv instanceof RNGClass) {
        // @ts-ignore
        o = (thisArgv.__proto__.constructor);
    }
    else {
        o = RNGClass;
    }
    return o;
}
exports.getClass = getClass;
/**
 * @todo support typescript
 */
function cloneClass(RNGClass, thisArgv, ...argv) {
    let o = getClass(RNGClass, thisArgv, ...argv);
    return new o(...argv);
}
exports.cloneClass = cloneClass;
function floatToString(n) {
    let int = Math.floor(n);
    let float = n - int;
    let s = String(float)
        .split('.')[1];
    return String(int) + (s ? '.' + s : '');
}
exports.floatToString = floatToString;
/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
function expectInDelta(actual, expected, delta = 0.05) {
    return expected - delta <= actual && actual <= expected + delta;
}
exports.expectInDelta = expectInDelta;
function hashArgv(args) {
    return String(args.join(';'));
}
exports.hashArgv = hashArgv;
function isNum(n) {
    return n === +n;
}
exports.isNum = isNum;
/**
 * @todo support 1e+23
 */
function isInt(n) {
    return n === (n | 0);
}
exports.isInt = isInt;
function isFloat(n) {
    return n === +n && n !== (n | 0);
}
exports.isFloat = isFloat;
function isUnset(n) {
    return typeof n === 'undefined' || n === null;
}
exports.isUnset = isUnset;
/**
 * for non-strict check, try get a little
 */
function array_unique_unsafe(arr) {
    return arr.filter((v, i, arr) => arr.indexOf(v) === i);
}
exports.array_unique_unsafe = array_unique_unsafe;
// @ts-ignore
Object.freeze(exports);
