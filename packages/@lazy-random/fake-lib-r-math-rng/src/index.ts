// @ts-ignore
import { IRNG } from 'lib-r-math.js';

export function fakeLibRMathRng(fn: () => number): IRNG
{
	function unif_rand(n?: number)
	{
		if (n > 1)
		{
			let a = [];
			while (n--)
			{
				a[n] = fn()
			}
			return a;
		}

		return fn()
	}

	return {
		// @ts-ignore
		unif_rand,
		internal_unif_rand: unif_rand,
	} satisfies IRNG
}

export default fakeLibRMathRng
