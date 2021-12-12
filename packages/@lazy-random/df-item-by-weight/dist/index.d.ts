export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
export declare function _getWeight(value: number, key: string): number;
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
export declare type IWeightEntrie<T extends unknown, K extends string = string> = [
	K,
	T,
	number
];
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
export declare function _sortWeight<T extends unknown, K extends string = string>(random: IRNGLike, ws: IWeight<T, K>, options?: IOptionsItemByWeightSort): IWeight<T, K>;
export declare function _percentageWeight<T extends unknown, K extends string = string>(random: IRNGLike, ws: IWeight<T, K>): IWeight<T, K>;
export declare function _calcWeight<T extends unknown, K extends string = string>(random: IRNGLike, arr: T[] | IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>): IWeight<T, K>;
export declare function _itemByWeightCore(r: number, klist: number[]): number;
export declare function dfItemByWeight<T extends unknown>(random: IRNGLike, arr: T[], options?: IOptionsItemByWeight<T>): () => IWeightEntrie<T>;
export declare function dfItemByWeight<T extends unknown, K extends string = string>(random: IRNGLike, arr: IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>): () => IWeightEntrie<T, K>;
export declare function dfItemByWeightUnique<T extends unknown>(random: IRNGLike, arr: T[], size: number, options?: IOptionsItemByWeight<T>): () => IWeightEntrie<T>[];
export declare function dfItemByWeightUnique<T extends unknown, K extends string = string>(random: IRNGLike, arr: IObjectInput<T, K>, size: number, options?: IOptionsItemByWeight<T, K>): () => IWeightEntrie<T, K>[];

export {};
