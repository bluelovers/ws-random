import RNGFunction from './function';
import { _MathRandom } from '@lazy-random/original-math-random';
export declare class RNGMathRandom2 extends RNGFunction<typeof _MathRandom> {
    constructor(seed?: typeof _MathRandom, opts?: any, ...argv: any[]);
    get name(): string;
}
export default RNGMathRandom2;
