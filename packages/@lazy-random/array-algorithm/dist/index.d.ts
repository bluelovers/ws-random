import { ITSArrayLikeWriteable, TypedArray } from 'ts-type';

export declare type IArrayInput01<T extends any> = ITSArrayLikeWriteable<T> | TypedArray;
export declare type IArrayInput02<T extends any> = IArrayInput01<T> | Buffer;
export declare function swapAlgorithm<T extends IArrayInput02<any>>(arr: T, overwrite?: boolean, fn?: (n: number, ...argv: any[]) => number): any;
export declare function swapAlgorithm2<T extends IArrayInput02<any>>(arr: T, overwrite?: boolean, fn?: (n: number, ...argv: any[]) => number): T;
/**
 * back to original interval
 */
export declare function array_rebase(ret_b: number[], n_diff: number, min: number, max: number): {
	bool: boolean;
	b_sum: number;
};

export {};
