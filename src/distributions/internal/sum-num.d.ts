import { Random } from '../../random';
export interface ISumNumParameterBase {
    limit?: number;
    fractionDigits?: number;
}
export interface ISumNumParameter extends ISumNumParameterBase {
    random: Random;
    size: number;
    min?: number;
    max?: number;
    sum?: number;
}
export interface ISumNumParameterWuthCache extends ISumNumParameter {
}
/**
 * not support unique, but will try make unique if can
 * thx @SeverinPappadeux for int version
 *
 * @see https://stackoverflow.com/questions/53279807/how-to-get-random-number-list-with-fixed-sum-and-size
 */
export declare function coreFnRandSumInt(argv: ISumNumParameterWuthCache): () => number[];
export declare function coreFnRandSumFloat(argv: ISumNumParameterWuthCache): () => number[];
