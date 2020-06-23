import RNGFunction from './function';
import { _MathRandom } from '../util/_random';
export declare class RNGMathRandom2 extends RNGFunction<typeof _MathRandom> {
    constructor(seed?: typeof _MathRandom, opts?: any, ...argv: any[]);
    get name(): string;
}
export default RNGMathRandom2;
