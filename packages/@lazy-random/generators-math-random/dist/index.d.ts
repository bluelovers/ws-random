/**
 * Created by user on 2021/12/11.
 */
import { RNG } from '@lazy-random/rng-abstract';
export declare class RNGMathRandom extends RNG {
    get name(): string;
    get seedable(): boolean;
    next(): number;
    seed(seed?: any, opts?: any, ...argv: any[]): void;
    clone(seed?: any, opts?: any, ...argv: any[]): RNGMathRandom;
}
export default RNGMathRandom;
