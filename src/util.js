/**
 * Created by user on 2018/10/20/020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const hashSum = require("hash-sum");
//import shortid = require('shortid');
//
//export declare function shortid(): string
//export declare function hashSum(input): string
//
//export { shortid, hashSum }
const _nanoid = require("nanoid");
const _pkg = require("../package.json");
const MATH_POW_2_32 = Math.pow(2, 32);
// @ts-ignore
exports._MathRandom = _MathRandom = Math.random;
function randomSeedNum() {
    return (_MathRandom() * MATH_POW_2_32) + _MathRandom();
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
    return String(int) + '.' + String(float).split('.')[1];
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
// @ts-ignore
Object.freeze(exports);
