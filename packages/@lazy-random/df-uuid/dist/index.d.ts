export interface IRNGLike {
	next(): number;
	seed?(seed?: any, opts?: any, ...argv: any[]): any;
}
/**
 * @see https://github.com/tracker1/node-uuid4/blob/master/index.js
 */
export declare function dfUuidV4(random: IRNGLike, toUpperCase?: boolean): () => string;
export default dfUuidV4;

export {};
