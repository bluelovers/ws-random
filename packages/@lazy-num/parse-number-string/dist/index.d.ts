export declare function isIntString<T extends `${number}` | string = `${number}`>(input: unknown): input is T;
export declare function isFloatOnlyString<T extends `${number}` | string = `${number}`>(input: unknown | T): input is T;
export declare function isFloatString<T extends `${number}` | string = `${number}`>(input: unknown | T): input is T;
export type IParseNumberFn = (<T extends `${number}` | string = `${number}`>(input: unknown | T) => input is T) | ((input: unknown) => input is `${number}`);
export declare function _parseNumberString<T extends number>(validFn: IParseNumberFn, input: unknown | T | `${T}`): T;
export declare function parseIntString<T extends number>(input: T): T;
export declare function parseIntString<T extends number>(input: `${T}`): T;
export declare function parseIntString<T extends number>(input: unknown | T | `${T}`): T;
export declare function parseFloatOnlyString<T extends number>(input: T): T;
export declare function parseFloatOnlyString<T extends number>(input: `${T}`): T;
export declare function parseFloatOnlyString<T extends number>(input: unknown | T | `${T}`): T;
export declare function parseFloatString<T extends number>(input: T): T;
export declare function parseFloatString<T extends number>(input: `${T}`): T;
export declare function parseFloatString<T extends number>(input: unknown | T | `${T}`): T;

export {
	parseFloatString as default,
};

export {};
