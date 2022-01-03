/**
 * Created by user on 2021/12/11.
 */
import { RNGCore } from '@lazy-random/rng-abstract-core';
export declare class RNGMathRandom extends RNGCore {
    get name(): string;
    get seedable(): boolean;
    next(): number;
    clone(seed?: any, opts?: any, ...argv: any[]): RNGMathRandom;
}
export default RNGMathRandom;
