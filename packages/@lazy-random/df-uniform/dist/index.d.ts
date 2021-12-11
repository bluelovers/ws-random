export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
export declare function uniformFloat(random: IRNGLike, min?: number, max?: number, fractionDigits?: number): () => number;
export declare function uniformInt(random: IRNGLike, min?: number, max?: number): () => number;
export declare function uniformBoolean(random: IRNGLike, likelihood?: number): () => boolean;
export declare function uniformByte(random: IRNGLike, toStr: true): () => string;
export declare function uniformByte(random: IRNGLike, toStr?: false): () => number;
export declare function uniformByte(random: IRNGLike, toStr?: boolean): (() => string) | (() => number);
export declare function uniformBytes(random: IRNGLike, size: number, toStr: true): () => string[];
export declare function uniformBytes(random: IRNGLike, size: number, toStr?: false): () => number[];
export declare function uniformBytes(random: IRNGLike, size: number, toStr?: boolean): (() => string[]) | (() => number[]);

export {};
