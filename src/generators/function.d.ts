import RNG from '../rng';
export declare type IRNGFunctionSeed = (...argv: any[]) => number;
export declare class RNGFunction<S extends IRNGFunctionSeed = IRNGFunctionSeed> extends RNG {
    protected _rng: S;
    constructor(seed: S, opts?: any);
    readonly name: string;
    next(): number;
    seed(seed: S, opts?: any): void;
    clone<S extends IRNGFunctionSeed = IRNGFunctionSeed>(seed: S, opts?: any): RNGFunction<S>;
}
export default RNGFunction;
