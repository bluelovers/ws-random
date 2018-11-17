/**
 * Created by user on 2018/10/20/020.
 */
/**
 * try save original Math.random,
 * if no other module overwrite Math.random
 *
 * @alias Math.random
 */
declare function _MathRandom(): number;
export { _MathRandom };
export declare function randomSeedNum(): number;
/**
 * give a random string for create seed
 */
export declare function randomSeedStr(): string;
/**
 * @todo support typescript
 */
export declare function getClass(RNGClass: any, thisArgv: any, ...argv: any[]): any;
/**
 * @todo support typescript
 */
export declare function cloneClass(RNGClass: any, thisArgv: any, ...argv: any[]): any;
export declare function floatToString(n: number): string;
/**
 * expect {actual} to be near {expected} +/- {delta}
 *
 * @example
 * const mean = sum / 10000
 * inDelta(mean, 0.5, 0.05)
 */
export declare function expectInDelta(actual: number, expected: number, delta?: number): boolean;
export declare function hashArgv(args: any[]): string;
export declare function isNum(n: number): boolean;
export declare function isInt(n: number): boolean;
export declare function isFloat(n: number): boolean;
export declare function stringifyHex(n: number): string;
export declare function toHexArray(arr: number[]): string[];
