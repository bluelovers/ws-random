import RNG from '../rng';
export interface ICryptoLike {
    randomBytes(size: number): ArrayLike<number>;
}
export declare class RNGCrypto extends RNG {
    protected _crypto: ICryptoLike;
    protected _seedable: boolean;
    protected _randIndex: (len: number) => number;
    protected _seed_size: number;
    constructor(seed?: any, opts?: any, ...argv: any[]);
    protected _init(crypto?: ICryptoLike | any, opts?: any, ...argv: any[]): void;
    _buffer(n?: number): ArrayLike<number>;
    readonly name: string;
    next(): number;
    seed(seed?: any, opts?: any, ...argv: any[]): void;
}
export default RNGCrypto;
