import { FLOAT_ENTROPY_BYTES, UINT32_BYTES } from '@lazy-random/shared-lib';
import { crossCrypto, ICryptoLike } from '../util/crypto';
import { expect } from '@lazy-random/expect';
import { RNG } from '@lazy-random/rng-abstract';
import { tryRequire } from '../util/req';
import _crypto from 'crypto';
import { _floatFromBuffer, _floatFromBuffer2, floatFromBuffer } from '@lazy-num/float-from-buffer';
import { arrayRandIndexByLength } from '@lazy-random/array-rand-index';

export class RNGCrypto extends RNG
{
	protected _crypto: ICryptoLike;
	protected _seedable: boolean = false;
	protected _randIndex: (len: number) => number = arrayRandIndexByLength;
	protected _seed_size = UINT32_BYTES;
	protected _seed_size_min = UINT32_BYTES;
	protected _fn: (buf: ArrayLike<number>) => number;

	constructor(seed?, opts?, ...argv)
	{
		super();
		this._init(seed, opts, ...argv)
	}

	protected override _init(crypto?: ICryptoLike | any, opts?, ...argv)
	{
		crypto = crypto || crossCrypto();
		this._crypto = crypto;
		this._randIndex = this._randIndex || arrayRandIndexByLength;

		expect(crypto.randomBytes).is.a.function();

		if (1)
		{
			this._seed_size = Math.min(Math.max(this._seed_size, UINT32_BYTES), 255);
			this._seed_size_min = Math.min(Math.max(this._seed_size_min, UINT32_BYTES), 255);
			this._fn = _floatFromBuffer2;
		}
		else
		{
			this._seed_size = Math.min(Math.max(this._seed_size, FLOAT_ENTROPY_BYTES), 255);
			this._seed_size_min = Math.min(Math.max(this._seed_size_min, FLOAT_ENTROPY_BYTES), 255);
			this._fn = _floatFromBuffer;
		}
	}

	_buffer(size?: number, size_min = this._seed_size_min)
	{
		size = (size || this._seed_size) | 0;

		if (size < size_min)
		{
			size = size_min
		}
		else if (size > 255)
		{
			size = 255;
		}

		let buf = this._crypto.randomBytes(size);

		if (size > size_min)
		{
			let i = this._randIndex(size - size_min);

			// @ts-ignore
			buf = buf.slice(i, i + size_min);
		}

		return buf;
	}

	override get name()
	{
		return 'crypto';
	}

	public next(): number
	{
		return this._fn(this._buffer())
	}

	public override seed(seed?, opts?, ...argv)
	{

	}

}

export default RNGCrypto

