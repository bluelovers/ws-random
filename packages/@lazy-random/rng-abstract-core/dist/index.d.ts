export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
export declare abstract class RNGCore implements IRNGLike {
	protected constructor();
	protected constructor(seed?: any);
	protected constructor(seed?: any, opts?: any, ...argv: any[]);
	protected _init_check(seed?: any, opts?: any, ...argv: any[]): void;
	protected _init(seed?: any, opts?: any, ...argv: any[]): void;
	static create(seed?: any, opts?: any, ...argv: any[]): any;
	get name(): string;
	get options(): unknown;
	get seedable(): boolean;
	/**
	 * should return a float between 0 ~ 1
	 */
	abstract next(): number;
	seed(seed?: any, opts?: any, ...argv: any[]): void;
	clone(seed?: any, opts?: any, ...argv: any[]): void;
	protected _seedAuto(seed: number, opts?: any, ...argv: any[]): number;
	protected _seedAuto(seed: unknown, opts?: any, ...argv: any[]): string;
	protected _seedAuto(seed?: any, opts?: any, ...argv: any[]): number | string;
	/**
	 * return number for make new seed
	 */
	protected _seedNum(seed?: any, opts?: any, ...argv: any[]): number;
	/**
	 * return string for make new seed
	 */
	protected _seedStr(seed?: any, opts?: any, ...argv: any[]): string;
}
export default RNGCore;

export {};
