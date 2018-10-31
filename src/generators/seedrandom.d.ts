import RNGFunction from './function';
import seedrandom = require('seedrandom');
export import RNGSeedRandomOptions = seedrandom.seedRandomOptions;
export declare const defaultOptions: RNGSeedRandomOptions;
export declare type IRNGSeedRandomLib = 'alea' | 'tychei' | 'xor128' | 'xor4096' | 'xorshift7' | 'xorwow' | string;
export declare class RNGSeedRandom extends RNGFunction<seedrandom.prng> {
    protected _opts: RNGSeedRandomOptions;
    protected _seedrandom: IRNGSeedRandomGenerator;
    constructor(seed?: any, opts?: RNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv: any[]);
    static create(seed?: any, opts?: RNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv: any[]): RNGSeedRandom;
    protected _init(seed?: any, opts?: any, ...argv: any[]): void;
    protected __generator(fn?: typeof seedrandom | IRNGSeedRandomLib): IRNGSeedRandomGenerator;
    readonly name: string;
    readonly options: seedrandom.seedRandomOptions;
    readonly seedable: boolean;
    /**
     * only when option.state = true
     */
    readonly state: IRNGSeedRandomState;
    /**
     * @todo options for change seeder
     */
    seed(seed?: any, opts?: RNGSeedRandomOptions, ...argv: any[]): void;
    clone(seed?: any, opts?: RNGSeedRandomOptions, ...argv: any[]): RNGSeedRandom;
}
export interface IRNGSeedRandomState {
    i: number;
    j: number;
    S: number[];
}
export interface IRNGSeedRandomGenerator {
    (seed?: any, opts?: seedrandom.seedRandomOptions, ...argv: any[]): seedrandom.prng;
}
export default RNGSeedRandom;
