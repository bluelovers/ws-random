/**
 * Created by user on 2018/10/19/019.
 */

import random from '../../'
import seedrandom from '../../preset/seedrandom'
import { randomSeedNum } from '../../src/util';

const xor128 = random.newUse('xor128')
const mathRandom2 = random.newUse('math-random2');

for (let i = 0; i < 200; i++)
{
//	console.log(random.int(0, 100));
}


[
	random,
	xor128,
	seedrandom,
].forEach(function (rnd)
{
	console.log(rnd.next(), rnd.random());
})
