import RNG from '../rng';
import seedrandom = require('seedrandom');
export declare class RNGSeedRandom extends RNG {
    protected _rng: seedrandom.prng;
    protected _opts: seedrandom.seedRandomOptions;
    constructor(seed?: any, opts?: seedrandom.seedRandomOptions, ...argv: any[]);
    readonly name: string;
    next(): number;
    seed(seed?: any, opts?: seedrandom.seedRandomOptions, ...argv: any[]): void;
    clone(seed?: any, opts?: seedrandom.seedRandomOptions): RNGSeedRandom;
    protected _to_str(seed?: any): string;
}
export default RNGSeedRandom;
