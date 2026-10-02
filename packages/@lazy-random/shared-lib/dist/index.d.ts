import { ITSArrayLikeWriteable } from 'ts-type/lib/generic';
import { TypedArray } from 'typedarray-dts';

/**
 * 亂數 (Random Number) 與種子 (Seed) 生成常用的進制字串 (Alphabet) 集合。
 * Common alphabets used for random number and seed generation.
 *
 * 以列舉 (Enum) 集中管理，供 `nanoid`、`short-id` 等產生器 (Generator) 選用；
 * 字元順序會影響輸出分布 (Distribution)，非必要請勿更動。
 * Collected in an enum for generators such as `nanoid` and `short-id`;
 * character order affects output distribution, so avoid changing it unless necessary.
 */
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
/**
 * 浮點加總 (Float Sum) 的容差值 (Tolerance)，避免浮點誤差造成判定錯誤。
 * Tolerance for float summation, avoiding misdetection caused by floating point error.
 */
export declare const SUM_DELTA = 5e-14;
/**
 * 浮點亂數 (Float Random) 攜帶的熵 (Entropy) 位元組數。
 * Number of entropy bytes carried by a float random value.
 */
export declare const FLOAT_ENTROPY_BYTES = 7;
/**
 * 32 位元無號整數 (Unsigned Integer) 的相關常數：
 * 位元組數、最大值，以及 `2 ** 32` 供位元運算使用。
 * Constants for 32-bit unsigned integers: byte count, max value, and `2 ** 32` for bitwise math.
 */
export declare const UINT32_BYTES = 4;
export declare const UINT32_VALUE = 4294967295;
export declare const MATH_POW_2_32: number;
/**
 * 位元組 (Byte) 對十六進制 (Hex) 字串的查找表 (Lookup Table)，分大小寫兩份。
 * Lookup tables mapping bytes to hex strings, in lower and upper case variants.
 *
 * 以 `let` 宣告後再凍結 (Freeze)，兼顧模組初始化時的逐步填寫與外部唯讀需求。
 * Declared with `let` so the table can be filled during module init, then frozen for read-only use.
 */
export declare let BYTE_TO_HEX_TO_LOWER_CASE: ReadonlyArray<string>;
export declare let BYTE_TO_HEX_TO_UPPER_CASE: ReadonlyArray<string>;
/**
 * 取得物件型別 `T` 所有值的聯集 (Union)。
 * Get the union of all value types of an object type `T`.
 */
export type ValueOf<T> = T[keyof T];
/**
 * 先以 `Pick<T, K>` 挑出指定鍵 (Key)，再取其值的聯集 (Union)。
 * Pick the given keys from `T`, then take the union of their value types.
 */
export type PickValueOf<T, K extends keyof T> = ValueOf<Pick<T, K>>;
/**
 * 可寫入的類陣列 (Array-like) 或型別化陣列 (Typed Array)。
 * A writable array-like object or typed array.
 */
export type IArrayInput01<T extends any> = ITSArrayLikeWriteable<T> | TypedArray;
/**
 * `IArrayInput01<T>` 再加上 `Buffer`，涵蓋 Node.js 位元組 (Byte) 輸入。
 * `IArrayInput01<T>` plus `Buffer`, covering Node.js byte inputs.
 */
export type IArrayInput02<T extends any> = IArrayInput01<T> | Buffer;
/**
 * 將單一位元組 (Byte) 轉為兩碼大寫十六進制字串 (Hex String)。
 * Convert a single byte to a two-digit uppercase hex string.
 *
 * 查表 (Lookup) 而非執行期轉換，回傳快取的唯讀字串。
 * Uses a lookup table instead of runtime conversion, returning a cached read-only string.
 *
 * @param byte 0～255 的位元組值 / A byte value from 0 to 255
 * @returns 大寫十六進制字串 / The uppercase hex string
 */
export declare function stringifyByte(byte: number): string;
/**
 * 將位元組陣列 (Byte Array) 依序轉為十六進制 (Hex) 字串陣列。
 * Convert a byte array into an array of hex strings in order.
 *
 * @param arr 位元組數值陣列 / An array of byte values
 * @returns 十六進制字串陣列 / An array of hex strings
 */
export declare function toHexArray(arr: number[]): string[];
/**
 * 將參數陣列 (Arguments Array) 轉為字串，作為快取 (Cache) 的鍵 (Key)。
 * Turn an arguments array into a string used as a cache key.
 *
 * 以 `;` 分隔各參數；`Array.prototype.join` 會把 `null`/`undefined` 視為空字串，
 * 相同外觀的參數可能產生相同鍵，屬已知限制。
 * Joins arguments with `;`; `Array.prototype.join` treats `null`/`undefined` as empty
 * strings, so visually different arguments may collide into the same key (known limitation).
 *
 * @param args 參數陣列 / The arguments array
 * @returns 字串鍵 / The string key
 */
export declare function hashArgv(args: any[]): string;
/**
 * 判斷輸入是否未設定 (Unset)，即 `undefined` 或 `null`。
 * Check whether a value is unset, i.e. `undefined` or `null`.
 *
 * 以型別守衛 (Type Guard) 回傳，讓呼叫端在判斷後能直接收窄 (Narrow) 型別。
 * Returns a type guard so callers can narrow the type after the check.
 *
 * @param n 待檢查的值 / The value to check
 * @returns 是否為 `undefined` 或 `null` / Whether the value is `undefined` or `null`
 */
export declare function isUnset(n: unknown): n is undefined | null;

export {
	ITSArrayLikeWriteable,
	TypedArray,
};

export {};
