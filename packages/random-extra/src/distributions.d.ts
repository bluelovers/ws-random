/**
 * Created by user on 2018/10/20/020.
 */
import { Random } from './random';
export * from '@lazy-random/distributions';
import Distributions from '@lazy-random/distributions';
export interface IRandomDistributionsFn<R = any> extends Function {
    (random: Random): R;
    (random: Random, ...argv: any[]): R;
}
export interface IRandomDistributionsCacheRow<F extends IRandomDistributionsFn = IRandomDistributionsFn> {
    key: string;
    distribution: IRandomDistributions<F>;
}
export interface IRandomDistributions<F extends IRandomDistributionsFn = IRandomDistributionsFn> {
    (...argv: Parameters<F>): ReturnType<F>;
    (random: Random, ...argv: any[]): ReturnType<F>;
}
export default Distributions;
