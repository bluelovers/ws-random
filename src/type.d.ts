/**
 * Created by user on 2018/11/12/012.
 */
export declare type ValueOf<T> = T[keyof T];
export declare type PickValueOf<T, K extends keyof T> = ValueOf<Pick<T, K>>;
