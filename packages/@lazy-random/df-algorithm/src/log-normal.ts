import { dfNormal } from './normal'

export function dfLogNormal(...args: Parameters<typeof dfNormal>)
{
	const normal = dfNormal(...args)

	return () =>
	{
		return Math.exp(normal())
	}
}

