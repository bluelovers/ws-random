import { Random } from '../../random';
import { UtilDistributions } from '../../util/distributions';
export default coreFn2;
export interface ISumNumParameterBase {
    random: Random;
    size: number;
    fn?: (min?: number, max?: number) => number;
    fn2: (...args: Parameters<typeof UtilDistributions.int>) => number;
    chk_sum?: boolean;
    noUnique?: boolean;
    chkSize?(data: ISumNumParameter): boolean | void;
    intMode?: boolean;
}
export interface ISumNumParameter extends ISumNumParameterBase {
    min?: number;
    max?: number;
    sum?: number;
}
export declare function coreFn2({ random, size, min, max, fn, fn2, chk_sum, noUnique, sum, chkSize, intMode, }: ISumNumParameter): () => number[];
/**
 * @deprecated
 */
export declare function coreFn1({ random, size, min, max, fn, fn2, chk_sum, noUnique, }: ISumNumParameter): () => number[];
export declare function chk(ret: number[], size: number, sum: number, min: number, max: number, noUnique: boolean): boolean;
