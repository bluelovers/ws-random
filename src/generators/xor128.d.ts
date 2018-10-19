import RNG from '../rng';
export declare class RNGXOR128 extends RNG {
    protected x: number;
    protected y: number;
    protected z: number;
    protected w: number;
    constructor(seed: any, opts: any);
    readonly name: string;
    next(): number;
    seed(seed: any, opts: any): void;
    clone(seed: any, opts: any): RNGXOR128;
}
export default RNGXOR128;
