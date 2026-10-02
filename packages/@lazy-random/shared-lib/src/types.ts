import { ITSArrayLikeWriteable } from 'ts-type/lib/generic';
import { TypedArray } from 'typedarray-dts';

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
export type IArrayInput01<T extends any> = ITSArrayLikeWriteable<T> | TypedArray

/**
 * `IArrayInput01<T>` 再加上 `Buffer`，涵蓋 Node.js 位元組 (Byte) 輸入。
 * `IArrayInput01<T>` plus `Buffer`, covering Node.js byte inputs.
 */
export type IArrayInput02<T extends any> = IArrayInput01<T> | Buffer

export type { ITSArrayLikeWriteable }
export type { TypedArray }
