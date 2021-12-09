import { IRNG } from 'lib-r-math.js';

export function fakeLibRMathRng(fn: () => number): IRNG
{
	return {
		unif_rand(n?: number)
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
		},
	} as IRNG
}

export default fakeLibRMathRng
