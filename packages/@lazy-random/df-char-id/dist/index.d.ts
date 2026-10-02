import { IRNGLike } from '@lazy-random/rng-abstract';
import { ENUM_ALPHABET } from '@lazy-random/shared-lib';

export declare function dfCharID(random: IRNGLike, char?: ENUM_ALPHABET | string | Buffer | number, size?: number): () => string;

export {
	dfCharID as default,
};

export {};
