import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * 建立泊松分佈 (Poisson Distribution) 亂數 (Random Number) 產生器
 * Create a Poisson distribution random number generator
 *
 * 依 lambda 大小自動選擇演算法：lambda < 10 使用反轉法 (Inversion Method)，
 * 否則使用產生法 (Generative Method / transformed rejection)
 * Automatically selects the algorithm by lambda: inversion for lambda < 10,
 * otherwise the generative (transformed rejection) method
 *
 * @param random 亂數來源 (Random Number Generator)，需實作 next() 回傳 [0,1) 的數值
 * @param lambda 泊松分佈的平均值 (Mean)，必須大於 0，預設為 1
 * @returns 回傳一個可反覆呼叫的產生器函式 (Generator Function)，每次回傳一個非負整數
 * @throws 當 lambda <= 0 時，由 expect(lambda).gt(0) 拋出錯誤
 */
export declare function dfPoisson(random: IRNGLike, lambda?: number): () => number;

export {
	dfPoisson as default,
};

export {};
