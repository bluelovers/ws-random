import { FLOAT_ENTROPY_BYTES, UINT32_BYTES } from '@lazy-random/shared-lib';
import { crossCrypto, ICryptoLike } from '@lazy-random/cross-crypto';
import { expect } from '@lazy-random/expect';
import { RNG } from '@lazy-random/rng-abstract';
import { _floatFromBuffer, _floatFromBuffer2 } from '@lazy-num/float-from-buffer';
import { arrayRandIndexByLength } from '@lazy-random/array-rand-index';

/**
 * 以加密安全亂數來源 (Cryptographically Secure RNG) 產生亂數的產生器 (Generator)，
 * 繼承 RNG 抽象類別，因此可直接套用上層提供的共用 API。
 *
 * A generator producing random numbers from a cryptographically secure RNG.
 * It extends the RNG abstract class, so the shared API of the base class is
 * reused as-is.
 */
export class RNGCrypto extends RNG
{
	/**
	 * 底層 crypto-like 物件，需提供 randomBytes(size)。
	 *
	 * The underlying crypto-like object which must provide randomBytes(size).
	 */
	protected _crypto: ICryptoLike;

	/**
	 * 是否支援以種子 (Seed) 重建亂數序列；加密來源無法重播，故固定為 false。
	 *
	 * Whether the sequence can be replayed from a seed; a crypto source cannot
	 * be replayed, so this stays false.
	 */
	protected _seedable: boolean = false;

	/**
	 * 當緩衝區大於下限時，用來挑選截取起點的索引函式 (Index Function)。
	 *
	 * Chooses the slice start index when the buffer exceeds the minimum size.
	 */
	protected _randIndex: (len: number) => number = arrayRandIndexByLength;

	/**
	 * 每次取樣要求的緩衝區位元組數 (Bytes) 預設值。
	 *
	 * Default buffer size in bytes requested per sample.
	 */
	protected _seed_size = UINT32_BYTES;

	/**
	 * 緩衝區位元組數下限，確保轉換浮點數時有足夠的熵 (Entropy)。
	 *
	 * Minimum buffer size, ensuring enough entropy for the float conversion.
	 */
	protected _seed_size_min = UINT32_BYTES;

	/**
	 * 把緩衝區位元組轉成 0～1 浮點數的轉換函式。
	 *
	 * Converts buffer bytes into a 0~1 float.
	 */
	protected _fn: (buf: ArrayLike<number>) => number;

	/**
	 * 建立亂數產生器；刻意不呼叫 super(seed)，因為加密來源不接受種子，
	 * 改由 _init 直接初始化 crypto 來源。
	 *
	 * Creates the generator; super(seed) is deliberately skipped because a
	 * crypto source takes no seed, and _init sets up the crypto source instead.
	 *
	 * @param seed 可傳入自訂 crypto-like 物件；省略時使用 crossCrypto() / a custom crypto-like object, or crossCrypto() when omitted
	 * @param opts 保留的選項參數（目前未使用） / reserved options, currently unused
	 * @param argv 保留的其餘參數，透傳給 _init / extra arguments forwarded to _init
	 */
	constructor(seed?, opts?, ...argv)
	{
		super();
		this._init(seed, opts, ...argv)
	}

	/**
	 * 初始化 crypto 來源並決定緩衝區大小與浮點轉換策略。
	 *
	 * Initializes the crypto source and picks the buffer size plus float
	 * conversion strategy.
	 *
	 * @param crypto 自訂 crypto-like 物件；省略或 falsy 時退回 crossCrypto() / custom crypto-like object, falls back to crossCrypto() when omitted or falsy
	 * @param opts 保留的選項參數 / reserved options
	 * @param argv 保留的其餘參數 / extra reserved arguments
	 */
	protected override _init(crypto?: ICryptoLike | any, opts?, ...argv)
	{
		/**
		 * 沒傳入來源時才取得預設的跨平台加密亂數來源，
		 * 讓測試或特殊環境能注入自己的實作。
		 *
		 * Only fetches the default cross-platform crypto source when none is
		 * given, so tests or special environments can inject their own.
		 */
		crypto = crypto || crossCrypto();
		this._crypto = crypto;
		this._randIndex = this._randIndex || arrayRandIndexByLength;

		/**
		 * 以斷言 (Assertion) 提早失敗：來源缺少 randomBytes 時在建構期就報錯，
		 * 避免延遲到第一次取樣才出現難以追蹤的錯誤。
		 *
		 * Fails fast via assertion: a source missing randomBytes errors during
		 * construction instead of surfacing at the first sample.
		 *
		 * @throws 斷言失敗時丟出 Chai AssertionError / Chai AssertionError when the assertion fails
		 */
		// @ts-ignore
		expect(crypto.randomBytes).is.a.function();

		/**
		 * if (1) 為常數條件，實際永遠走此分支：以 UINT32_BYTES 作為上下限
		 * 並採用 _floatFromBuffer2；else 分支保留為日後切換成 FLOAT_ENTROPY_BYTES
		 * 與 _floatFromBuffer 的參考實作。
		 *
		 * if (1) is a constant condition so this branch always runs: bounds are
		 * UINT32_BYTES and _floatFromBuffer2 is used; the else branch is kept as
		 * a reference for switching to FLOAT_ENTROPY_BYTES / _floatFromBuffer.
		 */
		if (1)
		{
			/**
			 * 夾限 (Clamp) 到 [UINT32_BYTES, 255]：下限確保足夠的熵，
			 * 上限則是因為 randomBytes 的大小以單一位元組表示。
			 *
			 * Clamps into [UINT32_BYTES, 255]: the lower bound keeps enough
			 * entropy, the upper bound comes from the size being one byte.
			 */
			this._seed_size = Math.min(Math.max(this._seed_size, UINT32_BYTES), 255);
			this._seed_size_min = Math.min(Math.max(this._seed_size_min, UINT32_BYTES), 255);
			this._fn = _floatFromBuffer2;
		}
		else
		{
			/**
			 * 未使用的替代分支：改以 FLOAT_ENTROPY_BYTES 夾限並使用 _floatFromBuffer，
			 * 與上方分支的差異僅在浮點數轉換所需的位元組數。
			 *
			 * Unused alternative branch: clamps to FLOAT_ENTROPY_BYTES and uses
			 * _floatFromBuffer; the only difference is how many bytes the float
			 * conversion needs.
			 */
			this._seed_size = Math.min(Math.max(this._seed_size, FLOAT_ENTROPY_BYTES), 255);
			this._seed_size_min = Math.min(Math.max(this._seed_size_min, FLOAT_ENTROPY_BYTES), 255);
			this._fn = _floatFromBuffer;
		}
	}

	/**
	 * 取得指定大小的隨機緩衝區 (Buffer)。
	 *
	 * Gets a random buffer of the requested size.
	 *
	 * @param size 期望的位元組數；省略時使用 _seed_size / desired byte count, uses _seed_size when omitted
	 * @param size_min 位元組數下限，預設為 _seed_size_min / lower bound of the byte count, defaults to _seed_size_min
	 * @returns 長度落在 [size_min, 255] 的隨機緩衝區 / a random buffer whose length is within [size_min, 255]
	 */
	_buffer(size?: number, size_min = this._seed_size_min)
	{
		/**
		 * | 0 會把非數字/小數轉為整數，避免呼叫端傳入 NaN 或非整數造成 randomBytes 異常。
		 *
		 * | 0 coerces non-numbers/fractions to integers, so NaN or fractional
		 * input cannot break randomBytes.
		 */
		size = (size || this._seed_size) | 0;

		/**
		 * 夾限邊界：小於下限會抬高以保留足夠的熵，大於 255 則受限於
		 * randomBytes 尺寸以單一位元組表示的限制。
		 *
		 * Clamps the bounds: below the minimum it is raised to keep enough
		 * entropy, above 255 it is capped because randomBytes sizes are one byte.
		 */
		if (size < size_min)
		{
			size = size_min
		}
		else if (size > 255)
		{
			size = 255;
		}

		let buf = this._crypto.randomBytes(size);

		/**
		 * 當取得的緩衝區比下限還長時，只保留其中一段 size_min 的區間，
		 * 起點由 _randIndex 隨機挑選，避免固定取開頭讓熵集中於前幾個位元組。
		 *
		 * When the buffer is longer than the minimum, only a size_min slice is
		 * kept; the start comes from _randIndex so the entropy is not always
		 * concentrated in the leading bytes.
		 */
		if (size > size_min)
		{
			let i = this._randIndex(size - size_min);

			// @ts-ignore
			buf = buf.slice(i, i + size_min);
		}

		return buf;
	}

	/**
	 * 產生器名稱，供除錯與識別用途。
	 *
	 * Generator name, used for debugging and identification.
	 */
	override get name()
	{
		return 'crypto';
	}

	/**
	 * 產生一個 0～1 的浮點亂數 (Float Random Number)。
	 *
	 * Produces one 0~1 float random number.
	 *
	 * @returns 0～1 區間內的亂數 / a random number within 0~1
	 */
	public next(): number
	{
		return this._fn(this._buffer())
	}

	/**
	 * 保留的種子 API：加密亂數來源不可重播 (Non-replayable)，故為空實作。
	 *
	 * Reserved seeding API: a crypto source is non-replayable, so this is a
	 * no-op implementation.
	 *
	 * @param seed 未使用 / unused
	 * @param opts 未使用 / unused
	 * @param argv 未使用 / unused
	 */
	public override seed(seed?, opts?, ...argv)
	{

	}

}

/**
 * 預設匯出 (Default Export)，與具名的 RNGCrypto 為同一個類別。
 *
 * Default export; the same class as the named RNGCrypto.
 */
export default RNGCrypto
