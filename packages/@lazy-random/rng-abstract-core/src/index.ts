
export interface IRNGLike
{
	next(): number

	seed?(seed?, opts?, ...argv)
}

export abstract class RNGCore implements IRNGLike
{
	protected constructor();
	protected constructor(seed?);
	protected constructor(seed?, opts?, ...argv);
	protected constructor(seed?, opts?, ...argv)
	{

	}

	protected _init_check(seed?, opts?, ...argv)
	{

	}

	protected _init(seed?, opts?, ...argv)
	{
		this._init_check(seed, opts, ...argv);
	}

	public static create(seed?, opts?, ...argv)
	{
		if (this === RNGCore || !this)
		{
			throw new ReferenceError('RNG is abstract class');
		}

		// @ts-ignore
		return new this(seed, opts, ...argv);
	}

	public get name(): string
	{
		throw new Error('RNG.name must be overridden');
	}

	public get options(): unknown
	{
		return null;
	}

	public get seedable(): boolean
	{
		return null;
	}

	/**
	 * should return a float between 0 ~ 1
	 */
	// @ts-ignore
	public abstract next(): number
	{
		throw new ReferenceError('RNG.next must be overridden');
	}

	public seed(seed?, opts?, ...argv)
	{
		//throw new ReferenceError('RNG.seed must be overridden')
	}

	public clone(seed?, opts?, ...argv)
	{
		throw new ReferenceError('RNG.clone must be overridden');
	}

	protected _seedAuto(seed: number, opts?, ...argv): number;
	protected _seedAuto(seed: unknown, opts?, ...argv): string;
	protected _seedAuto(seed?, opts?, ...argv): number | string;
	protected _seedAuto(seed?, opts?, ...argv): number | string
	{
		if (seed && typeof seed === 'number')
		{
			return this._seedNum(seed, opts, ...argv);
		}

		return this._seedStr(seed, opts, ...argv);
	}

	/**
	 * return number for make new seed
	 */
	protected _seedNum(seed?, opts?, ...argv): number
	{
		throw new ReferenceError('RNG._seedNum must be overridden');
	}

	/**
	 * return string for make new seed
	 */
	protected _seedStr(seed?, opts?, ...argv): string
	{
		throw new ReferenceError('RNG._seedStr must be overridden');
	}

}

export default RNGCore;

