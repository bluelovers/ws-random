import RNG from '../rng';
export declare class RNGMathRandom extends RNG {
    readonly name: string;
    next(): number;
    seed(seed?: any, opts?: any, ...argv: any[]): void;
    clone(seed?: any, opts?: any, ...argv: any[]): RNGMathRandom;
}
export default RNGMathRandom;
