/**
 * Created by user on 2018/11/19/019.
 */

import libRmath = require('lib-r-math.js');
export { libRmath }

export function fakeLibRmathRng(fn: () => number)
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
	} as libRmath.IRNG
}
