export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
export declare function dfUniformFloat(random: IRNGLike, min?: number, max?: number, fractionDigits?: number): () => number;
export declare function dfUniformInt(random: IRNGLike, min?: number, max?: number): () => number;
export declare function dfUniformBoolean(random: IRNGLike, likelihood?: number): () => boolean;
export declare function dfUniformByte(random: IRNGLike, toStr: true): () => string;
export declare function dfUniformByte(random: IRNGLike, toStr?: false): () => number;
export declare function dfUniformByte(random: IRNGLike, toStr?: boolean): (() => string) | (() => number);
export declare function dfUniformBytes(random: IRNGLike, size: number, toStr: true): () => string[];
export declare function dfUniformBytes(random: IRNGLike, size?: number, toStr?: false): () => number[];
export declare function dfUniformBytes(random: IRNGLike, size?: number, toStr?: boolean): (() => string[]) | (() => number[]);

export {};
