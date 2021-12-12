export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
export declare function dfBates(random: IRNGLike, n?: number): () => number;
export declare function dfBernoulli(random: IRNGLike, p?: number): () => number;
export declare function dfBinomial(random: IRNGLike, n?: number, p?: number): () => number;
export declare function dfExponential(random: IRNGLike, lambda?: number): () => number;
export declare function dfGeometric(random: IRNGLike, p?: number): () => number;
/**
 * https://zh.wikipedia.org/wiki/%E6%AD%90%E6%96%87%E2%80%93%E8%B3%80%E7%88%BE%E5%88%86%E4%BD%88
 * https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution
 *
 * @param random
 * @param {number} n - Number of uniform samples to average (n >= 1)
 * @return {function}
 */
export declare function dfIrwinHall(random: IRNGLike, n?: number): () => number;
export declare function dfNormal(random: IRNGLike, mu?: number, sigma?: number): () => number;
export declare function dfLogNormal(...args: Parameters<typeof dfNormal>): () => number;
export declare function dfPareto(random: IRNGLike, alpha?: number): () => number;

export {};
