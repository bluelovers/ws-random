/**
 * Created by user on 2018/11/25/025.
 */

export interface ICryptoLike
{
	randomBytes(size: number, callback?: (err: Error | null, buf: Buffer) => void): Buffer;

	getRandomValues?<T extends Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | null>(array: T): T;
}

export const crossCrypto = (() =>
{
	let crypto: ICryptoLike;

	return (): ICryptoLike =>
	{
		if (typeof crypto === 'undefined')
		{
			let _crypto: ICryptoLike;
			try
			{
				_crypto = crypto = require('crypto')
			}
			catch (e)
			{
				// @ts-ignore
				_crypto = global.crypto || global.msCrypto;

				if (_crypto?.getRandomValues)
				{
					crypto = _crypto
				}
			}

			if (!crypto?.randomBytes)
			{
				crypto.randomBytes = crypto.randomBytes || function randomBytes(size: number, cb?: (err: Error | null, buf: Buffer) => void)
				{
					if (size > 65536) throw new Error('requested too many random bytes');
					let rawBytes = new Uint8Array(size);

					if (size > 0)
					{
						_crypto.getRandomValues(rawBytes)
					}

					// XXX: phantomjs doesn't like a buffer being passed here
					let bytes = Buffer.from(rawBytes.buffer);

					if (typeof cb === 'function')
					{
						cb(null, bytes)
					}

					return bytes
				}
			}
		}

		if (!crypto)
		{
			crypto = null;
			throw new Error(`not support crypto`)
		}

		return crypto
	};
})();

export function randomBytes(size: number, callback?: (err: Error | null, buf: Buffer) => void): Buffer
{
	return crossCrypto().randomBytes(size, callback)
}
