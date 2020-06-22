/**
 * Created by user on 2018/11/12/012.
 */
/// <reference types="node" />
import { ITSArrayLikeWriteable, TypedArray } from 'ts-type';
export declare type ValueOf<T> = T[keyof T];
export declare type PickValueOf<T, K extends keyof T> = ValueOf<Pick<T, K>>;
export declare type IArrayInput01<T extends any> = ITSArrayLikeWriteable<T> | TypedArray;
export declare type IArrayInput02<T extends any> = IArrayInput01<T> | Buffer;
export { ITSArrayLikeWriteable, TypedArray, };
