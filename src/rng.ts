import { seedToken } from './util';

export const _MathRandom = Math.random;

export abstract class RNG
{
	constructor()
	constructor(seed?)
	constructor(seed?, opts?, ...argv)
	constructor(seed?, opts?, ...argv)
	{

	}

	public static create(seed?, opts?, ...argv)
	{
		if (this === RNG || !this)
		{
			throw new ReferenceError('RNG is abstract class')
		}

		// @ts-ignore
		return new this(seed, opts, ...argv)
	}

	public get name(): string
	{
		throw new Error('RNG.name must be overridden')
	}

	public get options()
	{
		return null
	}

	public next(): number
	{
		throw new ReferenceError('RNG.next must be overridden')
	}

	public seed(seed?, opts?, ...argv)
	{
		throw new ReferenceError('RNG.seed must be overridden')
	}

	public clone(seed?, opts?, ...argv)
	{
		throw new ReferenceError('RNG.clone must be overridden')
	}

	protected _seed(seed, opts?, ...argv): number
	{
		// TODO: add entropy and stuff
		return seedToken(seed, opts, ...argv)
	}
}

export default RNG
// @ts-ignore
Object.freeze(exports)
