/**
 * Created by user on 2018/11/19/019.
 */

import * as libRMath from 'lib-r-math.js';
import { IRNG } from 'lib-r-math.js';
export { libRMath }

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
