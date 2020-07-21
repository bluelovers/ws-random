import { Random } from '../../random';
export declare function _getWeight(value: any, key: any): number;
export interface IGetWeight<T extends unknown, K extends string = string> {
    (value: T, key: K, ...argv: any[]): number;
}
export interface IWeight<T extends unknown, K extends string = string> {
    sum: number;
    klist?: number[];
    plist?: number[];
    vlist: IWeightEntrie<T, K>[];
}
/**
 * [key, value, percentage]
 */
export declare type IWeightEntrie<T extends unknown, K extends string = string> = [K, T, number];
export declare type IObjectInput<T extends unknown, K extends string = string> = {
    [k in K]: T;
};
export declare function _createWeight<T extends unknown>(arr: T[] | IObjectInput<T>, getWeight?: IGetWeight<T>): IWeight<T>;
export declare function _sortWeight<T extends unknown>(random: Random, ws: IWeight<T>, options?: {
    shuffle?: boolean;
    disableSort?: boolean;
}): IWeight<T, string>;
export declare function _percentageWeight<T extends unknown>(random: Random, ws: IWeight<T>): IWeight<T, string>;
