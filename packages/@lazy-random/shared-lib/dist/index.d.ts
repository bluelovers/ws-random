import { ITSArrayLikeWriteable } from 'ts-type/lib/generic';
import { TypedArray } from 'typedarray-dts';

export declare const enum ENUM_ALPHABET {
	NANOID_URL = "ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz",
	SHORTID = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-",
	SHORTID2 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@",
	UNI_CHAR1 = "\u24B6\u24B7\u24B8\u24B9\u24BA\u24BB\u24BC\u24BD\u24BE\u24BF\u24C0\u24C1\u24C2\u24C3\u24C4\u24C5\u24C6\u24C7\u24C8\u24C9\u24CA\u24CB\u24CC\u24CD\u24CE\u24CF\u24D0\u24D1\u24D2\u24D3\u24D4\u24D5\u24D6\u24D7\u24D8\u24D9\u24DA\u24DB\u24DC\u24DD\u24DE\u24DF\u24E0\u24E1\u24E2\u24E3\u24E4\u24E5\u24E6\u24E7\u24E8\u24E9\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B",
	DEFAULT = "ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
	BASE16 = "0123456789abcdef",
	BASE36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
	BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	BASE66 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~",
	BASE71 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!'()*-._~"
}
export declare const SUM_DELTA = 5e-14;
export declare const FLOAT_ENTROPY_BYTES = 7;
export declare const UINT32_BYTES = 4;
export declare const UINT32_VALUE = 4294967295;
export declare const MATH_POW_2_32: number;
export declare let BYTE_TO_HEX_TO_LOWER_CASE: ReadonlyArray<string>;
export declare let BYTE_TO_HEX_TO_UPPER_CASE: ReadonlyArray<string>;
export type ValueOf<T> = T[keyof T];
export type PickValueOf<T, K extends keyof T> = ValueOf<Pick<T, K>>;
export type IArrayInput01<T extends any> = ITSArrayLikeWriteable<T> | TypedArray;
export type IArrayInput02<T extends any> = IArrayInput01<T> | Buffer;
export declare function stringifyByte(byte: number): string;
export declare function toHexArray(arr: number[]): string[];
export declare function hashArgv(args: any[]): string;
export declare function isUnset(n: unknown): n is undefined | null;

export {};
