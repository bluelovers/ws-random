export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
/**
 * @see https://github.com/tracker1/node-uuid4/blob/master/index.js
 */
export declare function dfUuidV4(random: IRNGLike, toUpperCase?: boolean): () => string;
export declare const UUID4_PATTERN: RegExp;
export declare function isUUID4(id: string): boolean;
export default dfUuidV4;

export {};
