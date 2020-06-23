export { numberInDeltaUnsafe001 as expectInDelta } from 'num-in-delta/lib/unsafe001';
export declare function isNum(n: number): boolean;
/**
 * @todo support 1e+23
 */
export declare function isInt(n: number): boolean;
export declare function isFloat(n: number): boolean;
export declare function isUnset(n: any): n is undefined | null;
