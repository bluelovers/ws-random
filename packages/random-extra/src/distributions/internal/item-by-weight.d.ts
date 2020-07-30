import { Random } from '../../random';
export declare function _getWeight(value: any, key: string): number;
export interface IGetWeight<T extends unknown, K extends string = string> {
    (value: T, key: K, ...argv: any[]): number;
}
export interface IWeight<T extends unknown, K extends string = string> {
    sum: number;
    klist?: number[];
    plist?: number[];
    vlist: IWeightEntrie<T, K>[];
    /**
     * key weight table
     */
    kwlist?: Record<K, number>;
    list?: IWeightRawData<T, K>[];
}
export interface IWeightRawData<T extends unknown, K extends string = string> {
    key: K;
    value: T;
    weight: number;
    percentage: number;
}
/**
 * [key, value, percentage]
 */
export declare type IWeightEntrie<T extends unknown, K extends string = string> = [K, T, number];
export declare type IObjectInput<T extends unknown, K extends string = string> = {
    [k in K]: T;
};
export interface IOptionsItemByWeightSort {
    shuffle?: boolean;
    disableSort?: boolean;
}
export interface IOptionsItemByWeight<T extends unknown, K extends string = string> extends IOptionsItemByWeightSort {
    getWeight?: IGetWeight<T, K>;
}
export declare function _createWeight<T extends unknown, K extends string = string>(arr: T[] | IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>): IWeight<T, K>;
export declare function _sortWeight<T extends unknown, K extends string = string>(random: Random, ws: IWeight<T, K>, options?: IOptionsItemByWeightSort): IWeight<T, K>;
export declare function _percentageWeight<T extends unknown, K extends string = string>(random: Random, ws: IWeight<T, K>): IWeight<T, K>;
export declare function _calcWeight<T extends unknown, K extends string = string>(random: Random, arr: T[] | IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>): IWeight<T, K>;
export declare function _itemByWeightCore(r: number, klist: number[]): number;
