import { ITSArrayLikeWriteable } from 'ts-type/lib/generic';
import { TypedArray } from 'typedarray-dts';

export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
export declare function dfArrayIndex<T extends Array<unknown>>(random: IRNGLike, arr: T, size?: number, start?: number, end?: number): () => number[];
export declare function dfArrayShuffle<T extends ITSArrayLikeWriteable<any> | TypedArray | Buffer>(random: IRNGLike, arr: T, overwrite?: boolean): () => T;
export declare namespace dfArrayShuffle {
	var memoizable: boolean;
}
export interface IRandIndex {
	(len: number): number;
	(len: number, ...argv: any[]): number;
	(...argv: any[]): number;
}
export interface IArrayUniqueOutOfLimitCallback<T extends unknown> {
	(arr: T[], limit: number, loop: boolean, fn: IRandIndex): T[] | boolean | void;
}
export declare function dfArrayUnique<T extends unknown>(random: IRNGLike, arr: T[], limit?: number, loop?: boolean, fnRandIndex?: IRandIndex, fnOutOfLimit?: IArrayUniqueOutOfLimitCallback<T>): () => T;
export declare type IArrayInput01<T extends any> = ITSArrayLikeWriteable<T> | TypedArray;
export declare type IArrayInput02<T extends any> = IArrayInput01<T> | Buffer;
export declare function dfArrayFill(random: IRNGLike, min?: number, max?: number, float?: boolean): <T extends IArrayInput02<number>>(arr: T) => T;

export {};
