/**
 * @todo support typescript
 */
export function getClass<T>(RNGClass: any, thisArgv: any, ...argv: any[]): T
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
export function cloneClass<T>(RNGClass: any, thisArgv: any, ...argv: any[]): T
{
	let o = getClass(RNGClass, thisArgv, ...argv)

	// @ts-ignore
	return new o(...argv)
}

export default cloneClass
