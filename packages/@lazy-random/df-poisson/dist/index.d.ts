import { IRNGLike } from '@lazy-random/rng-abstract';

export declare function dfPoisson(random: IRNGLike, lambda?: number): () => number;

export {
	dfPoisson as default,
};

export {};
