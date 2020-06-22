/**
 * Created by user on 2018/11/22/022.
 */

import random, { dfSumFloat } from 'random-extra';
export { dfSumFloat as create } from 'random-extra';

export function randomSumFloat(size: number, sum?: number, min?: number, max?: number)
{
	return dfSumFloat(size, sum, min, max)()
}

export default randomSumFloat
