import libRmath = require('lib-r-math.js');
import { Random } from '../../random';
import RNG from '../../rng';
export declare class LibRmathRngWithRandom extends libRmath.IRNG {
    protected __random: Random;
    protected __seed: any;
    constructor(_seed?: number, rng?: Random | RNG | any);
    protected readonly _name: string;
    seed: any;
    use(rng?: Random | RNG | any, _seed?: any): void;
    _setup(): void;
    internal_unif_rand(): number;
}
