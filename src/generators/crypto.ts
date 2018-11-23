import { randIndex } from '../util/array';
import { FLOAT_ENTROPY_BYTES } from '../util/const';
import { _floatFromBuffer, floatFromBuffer } from '../util/math';
import expect from '../util/ow'
import RNG from '../rng';
import { tryRequire } from '../util/req';
import _crypto = require('crypto');

export interface ICryptoLike
{
	randomBytes(size: number): ArrayLike<number>
}

export class RNGCrypto extends RNG
{
	protected _crypto: ICryptoLike;
	protected _seedable: boolean = false;
	protected _randIndex: (len: number) => number = randIndex;
	protected _seed_size = FLOAT_ENTROPY_BYTES;

	constructor(seed?, opts?, ...argv)
	{
		super();
		this._init(seed, opts, ...argv)
	}

	protected _init(crypto?: ICryptoLike | any, opts?, ...argv)
	{
		crypto = crypto || tryRequire('crypto');
		this._crypto = crypto;
		this._randIndex = this._randIndex || randIndex;

		expect(crypto.randomBytes).is.function();
	}

	_buffer(n?: number)
	{
		n = (n || this._seed_size) | 0;

		if (n < FLOAT_ENTROPY_BYTES)
		{
			n = FLOAT_ENTROPY_BYTES
		}
		else if (n > 255)
		{
			n = 255;
		}

		let buf = this._crypto.randomBytes(n);

		if (n > FLOAT_ENTROPY_BYTES)
		{
			let i = this._randIndex(n - FLOAT_ENTROPY_BYTES);

			// @ts-ignore
			buf = buf.slice(i, i + FLOAT_ENTROPY_BYTES);
		}

		return buf;
	}

	get name()
	{
		return 'crypto';
	}

	public next(): number
	{
		return _floatFromBuffer(this._buffer())
	}

	public seed(seed?, opts?, ...argv)
	{

	}

}

export default RNGCrypto
