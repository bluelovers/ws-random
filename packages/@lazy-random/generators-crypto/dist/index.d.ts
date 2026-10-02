import { ICryptoLike } from '@lazy-random/cross-crypto';
import { RNG } from '@lazy-random/rng-abstract';

/**
 * 以加密安全亂數來源 (Cryptographically Secure RNG) 產生亂數的產生器 (Generator)，
 * 繼承 RNG 抽象類別，因此可直接套用上層提供的共用 API。
 *
 * A generator producing random numbers from a cryptographically secure RNG.
 * It extends the RNG abstract class, so the shared API of the base class is
 * reused as-is.
 */
export declare class RNGCrypto extends RNG {
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
	protected _seedable: boolean;
	/**
	 * 當緩衝區大於下限時，用來挑選截取起點的索引函式 (Index Function)。
	 *
	 * Chooses the slice start index when the buffer exceeds the minimum size.
	 */
	protected _randIndex: (len: number) => number;
	/**
	 * 每次取樣要求的緩衝區位元組數 (Bytes) 預設值。
	 *
	 * Default buffer size in bytes requested per sample.
	 */
	protected _seed_size: number;
	/**
	 * 緩衝區位元組數下限，確保轉換浮點數時有足夠的熵 (Entropy)。
	 *
	 * Minimum buffer size, ensuring enough entropy for the float conversion.
	 */
	protected _seed_size_min: number;
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
	constructor(seed?: any, opts?: any, ...argv: any[]);
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
	protected _init(crypto?: ICryptoLike | any, opts?: any, ...argv: any[]): void;
	/**
	 * 取得指定大小的隨機緩衝區 (Buffer)。
	 *
	 * Gets a random buffer of the requested size.
	 *
	 * @param size 期望的位元組數；省略時使用 _seed_size / desired byte count, uses _seed_size when omitted
	 * @param size_min 位元組數下限，預設為 _seed_size_min / lower bound of the byte count, defaults to _seed_size_min
	 * @returns 長度落在 [size_min, 255] 的隨機緩衝區 / a random buffer whose length is within [size_min, 255]
	 */
	_buffer(size?: number, size_min?: number): Buffer<ArrayBufferLike>;
	/**
	 * 產生器名稱，供除錯與識別用途。
	 *
	 * Generator name, used for debugging and identification.
	 */
	get name(): string;
	/**
	 * 產生一個 0～1 的浮點亂數 (Float Random Number)。
	 *
	 * Produces one 0~1 float random number.
	 *
	 * @returns 0～1 區間內的亂數 / a random number within 0~1
	 */
	next(): number;
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
	seed(seed?: any, opts?: any, ...argv: any[]): void;
}

export {
	RNGCrypto as default,
};

export {};
