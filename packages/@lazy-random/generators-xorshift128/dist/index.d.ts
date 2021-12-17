import { ISeedLooser, XorShift } from '@bluelovers/xorshift';

export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
declare abstract class RNG implements IRNGLike {
	constructor();
	constructor(seed?: any);
	constructor(seed?: any, opts?: any, ...argv: any[]);
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
export declare class RNGXorShift128 extends RNG {
	protected _rng: XorShift;
	constructor(seed?: ISeedLooser, opts?: any, ...argv: any[]);
	protected _init(seed: ISeedLooser, opts?: any, ...argv: any[]): void;
	seed(seed?: ISeedLooser, opts?: any, ...argv: any[]): void;
	next(): number;
	get seedable(): boolean;
	get name(): string;
}
export default RNGXorShift128;

export {};