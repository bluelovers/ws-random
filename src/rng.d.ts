export declare const _MathRandom: () => number;
export declare abstract class RNG {
    readonly name: string;
    next(): number;
    seed(seed?: any, opts?: any): void;
    clone(seed?: any, opts?: any): RNG;
    protected _seed(seed: any, opts?: any): number;
}
export default RNG;
