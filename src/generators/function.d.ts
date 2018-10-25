import RNG from '../rng';
export declare type IRNGFunctionSeed = (...argv: any[]) => number;
export declare class RNGFunction<S extends IRNGFunctionSeed = IRNGFunctionSeed> extends RNG {
    protected _rng: S;
    protected _seedable: boolean;
    constructor(seed: S, opts?: any, ...argv: any[]);
    readonly name: string;
    readonly seedable: boolean;
    next(): number;
    seed(seed: S, opts?: any, ...argv: any[]): void;
    clone<S extends IRNGFunctionSeed = IRNGFunctionSeed>(seed: S, opts?: any, ...argv: any[]): RNGFunction<S>;
}
export default RNGFunction;
