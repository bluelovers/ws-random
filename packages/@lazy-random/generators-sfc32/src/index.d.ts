import { RNGCore } from '@lazy-random/rng-abstract-core';
import { ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';
export declare type IRNGSfc32AllowedSeedInputTypes = ITSValueOrArrayMaybeReadonly<string | number>;
export declare type IRNGSfc32SeedTypes = readonly [number, number, number, number];
export declare function _handleSeed(seedInput: IRNGSfc32AllowedSeedInputTypes): IRNGSfc32SeedTypes;
export declare class RNGSfc32 extends RNGCore {
    protected readonly _rng: () => number;
    protected readonly _seed: IRNGSfc32SeedTypes;
    constructor(seed?: IRNGSfc32AllowedSeedInputTypes, opts?: any, ...argv: any);
    protected _init(seed: IRNGSfc32AllowedSeedInputTypes, opts?: any, ...argv: any): void;
    seed(seed?: IRNGSfc32AllowedSeedInputTypes, opts?: any, ...argv: any): void;
    get seedable(): boolean;
    next(): number;
    get name(): string;
}
export default RNGSfc32;
