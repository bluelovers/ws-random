
import { IRNGLike } from '@lazy-random/rng-abstract';

export function randIndex(random: IRNGLike, len: number)
{
	return Math.floor(random.next() * len)
}

export function float(random: IRNGLike, min: number, max: number)
{
	return random.next() * (max - min) + min;
}

export function int(random: IRNGLike, min: number, max: number)
{
	return Math.floor(float(random, min, max + 1));
}
