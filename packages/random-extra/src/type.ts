/**
 * Created by user on 2018/11/12/012.
 */

import {
	ITSArrayLikeWriteable,
	TypedArray,
} from 'ts-type';

export type ValueOf<T> = T[keyof T];
export type PickValueOf<T, K extends keyof T> = ValueOf<Pick<T, K>>;

export type IArrayInput01<T extends any> = ITSArrayLikeWriteable<T> | TypedArray

export type IArrayInput02<T extends any> = IArrayInput01<T> | Buffer

export {
	ITSArrayLikeWriteable,
	TypedArray,
}


