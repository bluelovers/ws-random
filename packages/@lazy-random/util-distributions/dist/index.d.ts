export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
export declare function randIndex(random: IRNGLike, len: number): number;
export declare function float(random: IRNGLike, min: number, max: number): number;
export declare function int(random: IRNGLike, min: number, max: number): number;
declare const UtilDistributions: {
	randIndex: typeof randIndex;
	float: typeof float;
	int: typeof int;
};

export {
	UtilDistributions as default,
};

export {};
