import { ITSArrayLikeWriteable } from 'ts-type/generic';
export declare function swapAlgorithm<T extends unknown>(arr: T[], overwrite?: boolean, fn?: (n: number, ...argv: any[]) => number): T[];
export declare function swapAlgorithm2<T extends ITSArrayLikeWriteable<any>>(arr: T, overwrite?: boolean, fn?: (n: number, ...argv: any[]) => number): T;
export declare function randIndex(len: number, ...argv: any[]): number;
/**
 * back to original interval
 */
export declare function array_rebase(ret_b: number[], n_diff: number, min: number, max: number): {
    bool: boolean;
    b_sum: number;
};
