import RNGFunction from './function';
import seedrandom = require('seedrandom');
export import RNGSeedRandomOptions = seedrandom.seedRandomOptions;
export declare const defaultOptions: RNGSeedRandomOptions;
export declare class RNGSeedRandom extends RNGFunction<seedrandom.prng> {
    protected _opts: RNGSeedRandomOptions;
    constructor(seed?: any, opts?: RNGSeedRandomOptions, ...argv: any[]);
    readonly name: string;
    readonly options: seedrandom.seedRandomOptions;
    seed(seed?: any, opts?: RNGSeedRandomOptions, ...argv: any[]): void;
    clone(seed?: any, opts?: RNGSeedRandomOptions, ...argv: any[]): RNGSeedRandom;
    protected _hashSeed(seed?: any): string;
}
export default RNGSeedRandom;
