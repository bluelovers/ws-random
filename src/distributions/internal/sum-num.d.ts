import { Random } from '../../random';
import { UtilDistributions } from '../../util/distributions';
export default coreFn2;
export interface ISumNumParameterBase {
    random: Random;
    size: number;
    fnFirst?: (min?: number, max?: number) => number;
    fnNext?: (...args: Parameters<typeof UtilDistributions.int>) => number;
    chk_sum?: boolean;
    noUnique?: boolean;
    chkSize?(data: ISumNumParameter): boolean | void;
    intMode?: boolean;
    verifyFn?(data: ISumNumParameter): any;
    limit?: number;
}
export interface ISumNumParameter extends ISumNumParameterBase {
    min?: number;
    max?: number;
    sum?: number;
}
export interface ISumNumParameterWuthCache extends ISumNumParameter {
}
export declare function coreFn2({ random, size, min, max, fnFirst, fnNext, chk_sum, noUnique, sum, chkSize, intMode, }: ISumNumParameter): () => number[];
/**
 * @deprecated
 */
export declare function coreFn1({ random, size, min, max, fnFirst, fnNext, chk_sum, noUnique, }: ISumNumParameter): () => number[];
export declare function chk(ret: number[], size: number, sum: number, min: number, max: number, noUnique: boolean): boolean;
/**
 * not support unique, but will try make unique if can
 * thx @SeverinPappadeux for int version
 *
 * @see https://stackoverflow.com/questions/53279807/how-to-get-random-number-list-with-fixed-sum-and-size
 */
export declare function coreFnRandSumInt(argv: ISumNumParameterWuthCache): () => number[];
/**
 * back to original interval
 */
export declare function _array_rebase(ret_b: number[], n_diff: number, min: number, max: number): {
    bool: boolean;
    b_sum: number;
};
