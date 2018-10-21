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
    /**
     * return number for make new seed
     */
    protected _seedNum(seed?: any, opts?: any, ...argv: any[]): number;
    /**
     * return string for make new seed
     */
    protected _seedStr(seed?: any, opts?: any, ...argv: any[]): string;
}
export default RNG;
