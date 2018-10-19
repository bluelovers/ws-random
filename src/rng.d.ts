export declare const _MathRandom: () => number;
export declare abstract class RNG {
    constructor();
    constructor(seed?: any);
    constructor(seed?: any, opts?: any, ...argv: any[]);
    static create(seed?: any, opts?: any, ...argv: any[]): any;
    readonly name: string;
    readonly options: any;
    next(): number;
    seed(seed?: any, opts?: any, ...argv: any[]): void;
    clone(seed?: any, opts?: any, ...argv: any[]): void;
    protected _seed(seed: any, opts?: any, ...argv: any[]): number;
}
export default RNG;
