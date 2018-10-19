"use strict";
/**
 * Created by user on 2018/10/20/020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const shortid = require("shortid");
exports.shortid = shortid;
const hashSum = require("hash-sum");
exports.hashSum = hashSum;
function hashAny(seed, ...argv) {
    if (!seed) {
        seed = shortid();
    }
    else if (typeof seed !== 'string') {
        seed = hashSum(seed);
    }
    return String(seed);
}
exports.hashAny = hashAny;
function seedToken(seed, opts, ...argv) {
    // TODO: add entropy and stuff
    if (seed === (seed | 0)) {
        return seed;
    }
    else {
        let strSeed = '' + seed;
        let s = 0;
        for (let k = 0; k < strSeed.length; ++k) {
            s ^= strSeed.charCodeAt(k) | 0;
        }
        return s;
    }
}
exports.seedToken = seedToken;
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
function cloneClass(RNGClass, thisArgv, ...argv) {
    let o = getClass(RNGClass, thisArgv, ...argv);
    return new o(...argv);
}
exports.cloneClass = cloneClass;
// @ts-ignore
Object.freeze(exports);
