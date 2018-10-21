/**
 * Created by user on 2018/10/20/020.
 */
import hashSum = require('hash-sum');
import shortid = require('shortid');
export declare function shortid(): string;
export declare function hashSum(input: any): string;
export { shortid, hashSum };
/**
 * try save original Math.random,
 * if no other module overwrite Math.random
 *
 * @alias Math.random
 */
declare function _MathRandom(): number;
export { _MathRandom };
/**
 * @todo support typescript
 */
export declare function getClass(RNGClass: any, thisArgv: any, ...argv: any[]): any;
/**
 * @todo support typescript
 */
export declare function cloneClass(RNGClass: any, thisArgv: any, ...argv: any[]): any;
