/**
 * Created by user on 2018/11/12/012.
 */

export type ValueOf<T> = T[keyof T];
export type PickValueOf<T, K extends keyof T> = ValueOf<Pick<T, K>>;

// @ts-ignore
Object.freeze(exports)
