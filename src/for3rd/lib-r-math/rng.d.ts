import libRMath = require('lib-r-math.js');
import { Random } from '../../random';
import RNG, { IRNGLike } from '../../rng';
export declare class LibRMathRngWithRandom extends libRMath.IRNG {
    protected __random: Random;
    protected __seed: any;
    constructor(_seed?: number, rng?: Random | RNG | any | IRNGLike);
    protected readonly _name: string;
    seed: any;
    use(rng?: Random | RNG | IRNGLike | any, _seed?: any): void;
    _setup(): void;
    internal_unif_rand(): number;
}
export declare class RandomRngWithLibRMath<R extends libRMath.IRNG> extends RNG {
    protected _rng: R;
    protected _seedable: boolean;
    protected _fn: () => number;
    constructor(seed?: any, opts?: any, ...argv: any[]);
    protected _init(seed?: any, opts?: any, ...argv: any[]): void;
    readonly name: string;
    readonly options: number[];
    next(): number;
    seed(seed?: any | number[], opts?: any, ...argv: any[]): void;
}
