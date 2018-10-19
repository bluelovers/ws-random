/**
 * Created by user on 2018/10/20/020.
 */
import shortid = require('shortid');
import hashSum = require('hash-sum');
export declare function shortid(): string;
export declare function hashSum(input: any): string;
export { shortid, hashSum };
export declare function hashAny(seed?: any, ...argv: any[]): string;
export declare function seedToken(seed: number | any, opts?: any, ...argv: any[]): number;
export declare function getClass(RNGClass: any, thisArgv: any, ...argv: any[]): any;
export declare function cloneClass(RNGClass: any, thisArgv: any, ...argv: any[]): any;
