import { Random } from '../../random';
import { UtilDistributions } from '../../util/distributions';
export default coreFn1;
export interface ISumNumParameterBase {
    random: Random;
    size: number;
    fn: () => number;
    fn2: (...args: Parameters<typeof UtilDistributions.int>) => number;
    chk_sum?: boolean;
    noUnique?: boolean;
}
export interface ISumNumParameter extends ISumNumParameterBase {
    min?: number;
    max?: number;
    sum?: number;
}
export declare function coreFn2({ random, size, min, max, fn, fn2, chk_sum, noUnique, }: ISumNumParameter): void;
export declare function coreFn1({ random, size, min, max, fn, fn2, chk_sum, noUnique, }: ISumNumParameter): () => number[];
export declare function chk(ret: number[], size: number, min: number, max: number, noUnique: boolean): boolean;
