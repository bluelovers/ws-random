import { RNG } from '@lazy-random/rng-abstract';
export declare class RNGXOR128 extends RNG {
    protected x: number;
    protected y: number;
    protected z: number;
    protected w: number;
    constructor(seed: any, ...argv: any[]);
    constructor(x?: number, y?: number, z?: number, w?: number, ...argv: any[]);
    get name(): string;
    get seedable(): boolean;
    next(): number;
    seed(seed?: any, opts?: any, ...argv: any[]): void;
    clone(seed?: any, opts?: any, ...argv: any[]): RNGXOR128;
    protected _init(...argv: any[]): void;
    protected _seed(...argv: any[]): void;
}
export default RNGXOR128;
