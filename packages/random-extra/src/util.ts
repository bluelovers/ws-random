/**
 * Created by user on 2018/10/20/020.
 */
//import shortid = require('shortid');
//
//export declare function shortid(): string
//export declare function hashSum(input): string
//
//export { shortid, hashSum }


/**
 * @todo support typescript
 */
export function getClass<T>(RNGClass, thisArgv, ...argv): T
{
	let o;

	if (thisArgv instanceof RNGClass)
	{
		// @ts-ignore
		o = (thisArgv.__proto__.constructor)
	}
	else
	{
		o = RNGClass
	}

	return o
}

/**
 * @todo support typescript
 */
export function cloneClass<T>(RNGClass, thisArgv, ...argv): T
{
	let o = getClass(RNGClass, thisArgv, ...argv)

	// @ts-ignore
	return new o(...argv)
}

export function hashArgv(args: any[]): string
{
	return String(args.join(';'));
}

/**
 * for non-strict check, try get a little
 */
export function array_unique_unsafe<T extends any>(arr: T[])
{
	return arr.filter((v, i, arr) => arr.indexOf(v) === i)
}


