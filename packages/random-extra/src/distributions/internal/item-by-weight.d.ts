import { Random } from '../../random';
export declare function _getWeight(value: any, key: any): number;
export interface IGetWeight<T extends unknown> {
    (value: T, key?: any, ...argv: any[]): number;
}
export interface IWeight<T extends unknown> {
    sum: number;
    klist?: number[];
    plist?: number[];
    vlist: IWeightEntrie<T>[];
}
/**
 * [key, value, percentage]
 */
export declare type IWeightEntrie<T extends unknown> = [string, T, number];
export interface IObjectInput<T extends unknown> {
    [k: string]: T;
}
export declare function _createWeight<T extends unknown>(arr: T[] | IObjectInput<T>, getWeight?: IGetWeight<T>): IWeight<T>;
export declare function _sortWeight<T extends unknown>(random: Random, ws: IWeight<T>, options?: {
    shuffle?: boolean;
    disableSort?: boolean;
}): IWeight<T>;
export declare function _percentageWeight<T extends unknown>(random: Random, ws: IWeight<T>): IWeight<T>;
