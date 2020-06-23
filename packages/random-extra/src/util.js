"use strict";
/**
 * Created by user on 2018/10/20/020.
 */
//import shortid = require('shortid');
//
//export declare function shortid(): string
//export declare function hashSum(input): string
//
//export { shortid, hashSum }
Object.defineProperty(exports, "__esModule", { value: true });
exports.array_unique_unsafe = exports.hashArgv = exports.cloneClass = exports.getClass = void 0;
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
    // @ts-ignore
    return new o(...argv);
}
exports.cloneClass = cloneClass;
function hashArgv(args) {
    return String(args.join(';'));
}
exports.hashArgv = hashArgv;
/**
 * for non-strict check, try get a little
 */
function array_unique_unsafe(arr) {
    return arr.filter((v, i, arr) => arr.indexOf(v) === i);
}
exports.array_unique_unsafe = array_unique_unsafe;
//# sourceMappingURL=util.js.map