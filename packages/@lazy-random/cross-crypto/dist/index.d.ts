/// <reference types="node" />
/**
 * Created by user on 2018/11/25/025.
 */
export interface ICryptoLike {
	randomBytes(size: number, callback?: (err: Error | null, buf: Buffer) => void): Buffer;
	getRandomValues?<T extends Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | null>(array: T): T;
}
export declare const crossCrypto: () => ICryptoLike;
export declare function randomBytes(size: number, callback?: (err: Error | null, buf: Buffer) => void): Buffer;
export default crossCrypto;

export {};
