/// <reference types="node" />
import { ICryptoLike } from '@lazy-random/cross-crypto';
import { RNG } from '@lazy-random/rng-abstract';
export declare class RNGCrypto extends RNG {
    protected _crypto: ICryptoLike;
    protected _seedable: boolean;
    protected _randIndex: (len: number) => number;
    protected _seed_size: number;
    protected _seed_size_min: number;
    protected _fn: (buf: ArrayLike<number>) => number;
    constructor(seed?: any, opts?: any, ...argv: any[]);
    protected _init(crypto?: ICryptoLike | any, opts?: any, ...argv: any[]): void;
    _buffer(size?: number, size_min?: number): Buffer;
    get name(): string;
    next(): number;
    seed(seed?: any, opts?: any, ...argv: any[]): void;
}
export default RNGCrypto;
