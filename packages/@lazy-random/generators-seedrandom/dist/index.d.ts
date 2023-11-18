import { RNGFunction } from '@lazy-random/generators-function';
import seedrandom from 'seedrandom';
import { PickValueOf } from '@lazy-random/shared-lib';
export import RNGSeedRandomOptions = seedrandom.seedRandomOptions;
export declare const defaultOptions: RNGSeedRandomOptions;
export type IRNGSeedRandomLibName = 'alea' | 'tychei' | 'xor128' | 'xor4096' | 'xorshift7' | 'xorwow';
export type IRNGSeedRandomLib = IRNGSeedRandomLibName | string;
export type IRNGSeedRandomLibValueOf = PickValueOf<typeof seedrandom, IRNGSeedRandomLibName>;
export declare class RNGSeedRandom extends RNGFunction<seedrandom.prng> {
    protected _opts: RNGSeedRandomOptions;
    protected _seedrandom: IRNGSeedRandomGenerator;
    protected _seedable: boolean;
    constructor(seed?: any, opts?: RNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv: any[]);
    static createLib(lib?: IRNGSeedRandomLib, seed?: any, opts?: RNGSeedRandomOptions, ...argv: any[]): RNGSeedRandom;
    static create(seed?: any, opts?: RNGSeedRandomOptions, lib?: IRNGSeedRandomLib, ...argv: any[]): RNGSeedRandom;
    protected _init_check(seed?: any, opts?: any, ...argv: any[]): void;
    protected _init(seed?: any, opts?: any, ...argv: any[]): void;
    protected readonly _NAME = "seedrandom";
    protected _TYPE: any;
    get name(): string;
    protected __generator(fn?: typeof seedrandom | IRNGSeedRandomLib | IRNGSeedRandomLibValueOf): IRNGSeedRandomGenerator;
    get options(): seedrandom.seedRandomOptions;
    /**
     * only when option.state = true
     */
    get state(): IRNGSeedRandomState;
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
