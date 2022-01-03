import { RNGCore, IRNGLike } from '@lazy-random/rng-abstract-core';
export type { IRNGLike };
export declare abstract class RNG extends RNGCore implements IRNGLike {
    static create(seed?: any, opts?: any, ...argv: any[]): any;
    /**
     * return number for make new seed
     */
    protected _seedNum(seed?: any, opts?: any, ...argv: any[]): number;
    /**
     * return string for make new seed
     */
    protected _seedStr(seed?: any, opts?: any, ...argv: any[]): string;
}
export default RNG;
