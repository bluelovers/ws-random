/**
 * Created by user on 2018/11/17/017.
 */
export declare function _bytesToUuid(bth?: ReadonlyArray<string>): (buf: ArrayLike<number>, offset?: number) => string;
/**
 * @see https://github.com/kelektiv/node-uuid/blob/master/lib/bytesToUuid.js
 */
export declare function bytesToUuid(buf: ArrayLike<number>, offset?: number, bth?: ReadonlyArray<string>): string;
export declare function stringifyByte(byte: number): string;
export declare function toHexArray(arr: number[]): string[];
