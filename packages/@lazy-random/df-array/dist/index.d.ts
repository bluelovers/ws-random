import { IRNGLike } from '@lazy-random/rng-abstract';
import { IRNGLike } from '@lazy-random/rng-abstract-core';
import { IArrayInput02 } from '@lazy-random/shared-lib';
import { ITSArrayLikeWriteable } from 'ts-type/lib/generic';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { TypedArray } from 'typedarray-dts';

/**
 * return index list form array
 */
export declare function dfArrayIndex<T extends ITSArrayListMaybeReadonly<unknown>>(random: IRNGLike, arr: T, size?: number, start?: number, end?: number): () => number[];
/**
 * return index number form array
 */
export declare function dfArrayIndexOne<T extends ITSArrayListMaybeReadonly<unknown>>(random: IRNGLike, arr: T, start?: number, end?: number): () => number;
export declare function dfArrayShuffle<T extends ITSArrayLikeWriteable<any> | TypedArray | Buffer | ITSArrayListMaybeReadonly<any>>(random: IRNGLike, arr: T, overwrite?: boolean): () => T;
export declare namespace dfArrayShuffle {
	var memoizable: boolean;
}
export interface IRandIndex {
	(len: number): number;
	(len: number, ...argv: any[]): number;
	(...argv: any[]): number;
}
export interface IArrayUniqueOutOfLimitCallback<T extends unknown> {
	(arr: ITSArrayListMaybeReadonly<T>, limit: number, loop: boolean, fn: IRandIndex): T[] | boolean | void;
}
export declare function dfArrayUnique<T extends unknown>(random: IRNGLike, arr: ITSArrayListMaybeReadonly<T>, limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>): () => T;
export declare function dfArrayFill(random: IRNGLike, min?: number, max?: number, float?: boolean): <T extends IArrayInput02<number>>(arr: T) => T;

export {};
