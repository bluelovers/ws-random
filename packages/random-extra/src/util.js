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
exports.array_unique_unsafe = exports.hashArgv = void 0;
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