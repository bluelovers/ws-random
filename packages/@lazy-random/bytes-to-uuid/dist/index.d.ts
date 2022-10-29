export declare function _createBytesToUuidFn(bth?: readonly string[]): (buf: ArrayLike<number>, offset?: number) => string;
/**
 * @see https://github.com/kelektiv/node-uuid/blob/master/lib/bytesToUuid.js
 */
export declare function bytesToUuid(buf: ArrayLike<number>, offset?: number, bth?: readonly string[]): string;

export {
	bytesToUuid as default,
};

export {};
