import RNGFunction from './function';
import seedrandom = require('seedrandom');
export declare const defaultOptions: Readonly<{
    entropy: boolean;
}>;
export declare class RNGSeedRandom extends RNGFunction<seedrandom.prng> {
    protected _opts: seedrandom.seedRandomOptions;
    constructor(seed?: any, opts?: seedrandom.seedRandomOptions, ...argv: any[]);
    readonly name: string;
    readonly options: seedrandom.seedRandomOptions;
    seed(seed?: any, opts?: seedrandom.seedRandomOptions, ...argv: any[]): void;
    clone(seed?: any, opts?: seedrandom.seedRandomOptions, ...argv: any[]): RNGSeedRandom;
    protected _hashSeed(seed?: any): string;
}
export default RNGSeedRandom;
