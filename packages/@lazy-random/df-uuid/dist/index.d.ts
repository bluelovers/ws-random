import { IRNGLike } from '@lazy-random/rng-abstract';

/**
 * @see https://github.com/tracker1/node-uuid4/blob/master/index.js
 */
export declare function dfUuidV4(random: IRNGLike, toUpperCase?: boolean): () => string;
export declare const UUID4_PATTERN: RegExp;
export declare function isUUID4(id: string): boolean;

export {
	dfUuidV4 as default,
};

export {};
