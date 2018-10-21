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
function randomSeedNum() {
    return _MathRandom() * Math.pow(2, 32);
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
        _MathRandom(),
    ].join('#');
}
exports.randomSeedStr = randomSeedStr;
// @ts-ignore
exports._MathRandom = _MathRandom = Math.random;
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
// @ts-ignore
Object.freeze(exports);
