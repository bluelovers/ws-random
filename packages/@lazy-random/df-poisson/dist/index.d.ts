export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
export declare function dfPoisson(random: IRNGLike, lambda?: number): () => number;
export default dfPoisson;

export {};
