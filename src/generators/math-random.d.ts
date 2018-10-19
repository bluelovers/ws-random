import RNG from '../rng';
export declare class RNGMathRandom extends RNG {
    readonly name: string;
    next(): number;
    seed(seed?: any, opts?: any): void;
    clone(): RNGMathRandom;
}
export default RNGMathRandom;
