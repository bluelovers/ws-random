import { Random } from '../random';
export interface IGetWeight<T extends unknown> {
    (value: T, key?: any, ...argv: any[]): number;
}
export interface IWeight<T extends unknown> {
    sum: number;
    klist?: number[];
    plist?: number[];
    vlist: IWeightEntrie<T>[][];
}
export declare type IWeightEntrie<T extends unknown> = [string, T, number];
export interface IObjectInput<T extends unknown> {
    [k: string]: T;
}
declare function itemByWeight<T extends unknown>(random: Random, arr: T[], getWeight?: IGetWeight<T>, shuffle?: boolean, disableSort?: boolean): () => IWeightEntrie<T>;
declare function itemByWeight<T extends unknown>(random: Random, arr: IObjectInput<T>, getWeight?: IGetWeight<T>, shuffle?: boolean, disableSort?: boolean): () => IWeightEntrie<T>;
export default itemByWeight;
export declare function _getWeight(value: any, key: any): number;
export declare function _createWeight<T extends unknown>(arr: T[] | IObjectInput<T>, getWeight?: IGetWeight<T>): IWeight<T>;
