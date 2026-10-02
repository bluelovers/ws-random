import { ITSArrayLikeWriteable } from 'ts-type/lib/generic';
import { TypedArray } from 'typedarray-dts';
import { swapAlgorithm2 } from '@lazy-random/array-algorithm';
import { randIndex as _randIndex } from '@lazy-random/util-distributions';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * 陣列洗牌 (Shuffle) 取樣函式：每次呼叫回傳洗牌後的陣列
 * Array shuffle sampler: each call returns a shuffled array.
 *
 * 預設先複製再洗牌、不動到原陣列；overwrite = true 時原地改寫 (In-Place)。
 * By default the array is cloned first so the input stays untouched;
 * overwrite = true shuffles in place instead.
 *
 * @param random 亂數來源 (Random Number Generator)，需提供 next()
 * @param arr 一般陣列、型別化陣列 (TypedArray) 或 Buffer
 * @param overwrite 是否原地改寫原陣列，預設 false / overwrite the input in place, defaults to false
 * @returns 取樣函式 (Sampler)，每次呼叫回傳洗牌後的陣列
 */
export function dfArrayShuffle<T extends ITSArrayLikeWriteable<any> | TypedArray | Buffer | ITSArrayListMaybeReadonly<any>>(random: IRNGLike, arr: T, overwrite?: boolean): () => T
{
	/*
	 * 把隨機索引的取得包一層，讓演算法只需傳入長度即可
	 * Wrap random index picking so the algorithm only has to pass a length.
	 */
	const randIndex = (len: number) =>
	{
		return _randIndex(random, len)
	};

	/*
	 * 不覆寫時需先複製：Buffer 與一般陣列的複製方式不同，
	 * Buffer.from() 才能保留其二進位語意，slice() 則適用其他陣列。
	 * When not overwriting the input, clone it first: Buffer and plain arrays
	 * need different copy calls, Buffer.from() preserving the binary semantics
	 * while slice() suits everything else.
	 */
	if (!overwrite)
	{
		let cloneArrayLike: (arr: T) => T;

		if (Buffer.isBuffer(arr))
		{
			// @ts-ignore
			cloneArrayLike = (arr) =>
			{
				// @ts-ignore
				return Buffer.from(arr)
			};
		}
		else
		{
			cloneArrayLike = (arr) =>
			{
				// @ts-ignore
				return arr.slice()
			};
		}

		return (): T =>
		{
			/*
			 * 每次呼叫都重新複製，確保洗牌結果不互相污染
			 * Copy on every call so shuffled results never contaminate each other.
			 */
			return swapAlgorithm2(cloneArrayLike(arr), true, randIndex)
		}
	}

	return (): T =>
	{
		/*
		 * 原地改寫：多次呼叫會在上一次洗牌後的狀態繼續打亂
		 * In-place: repeated calls keep shuffling the result of the previous call.
		 */
		return swapAlgorithm2(arr, true, randIndex)
	}
}

/*
 * 記憶化 (Memoization) 無意義：同一份輸入每次都應得到不同的洗牌結果，
 * 因此標記為不可記憶化。
 * Memoization is meaningless here: the same input must yield a different
 * permutation each time, so the function is marked non-memoizable.
 */
dfArrayShuffle.memoizable = false;

export default dfArrayShuffle;


