import { RNGCore } from '@lazy-random/rng-abstract-core';
import { ISeedInputFromStringOrNumberOrArray } from '@lazy-random/seed-algorithm';
export declare type IRNGSfc32SeedTypes = readonly [number, number, number, number];
export declare class RNGSfc32 extends RNGCore {
    protected readonly _rng: () => number;
    protected readonly _seed: IRNGSfc32SeedTypes;
    constructor(seed?: ISeedInputFromStringOrNumberOrArray, opts?: any, ...argv: any);
    protected _init(seed: ISeedInputFromStringOrNumberOrArray, opts?: any, ...argv: any): void;
    seed(seed?: ISeedInputFromStringOrNumberOrArray, opts?: any, ...argv: any): void;
    get seedable(): boolean;
    next(): number;
    get name(): string;
}
export default RNGSfc32;
