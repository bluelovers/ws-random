import { RNG } from '@lazy-random/rng-abstract';
import { ISeedLooser, XorShift } from '@bluelovers/xorshift';
export declare class RNGXorShift128 extends RNG {
    protected _rng: XorShift;
    constructor(seed?: ISeedLooser, opts?: any, ...argv: any[]);
    protected _init(seed: ISeedLooser, opts?: any, ...argv: any[]): void;
    seed(seed?: ISeedLooser, opts?: any, ...argv: any[]): void;
    next(): number;
    get seedable(): boolean;
    get name(): string;
}
export default RNGXorShift128;
