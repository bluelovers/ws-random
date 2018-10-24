/**
 * Created by user on 2018/10/24/024.
 */

import random from '../../'

const obj = {
	a: {
		w: 1,
	},
	b: {
		w: 2,
	},
	c: {
		w: 3,
	},
	d: {
		w: 4,
	},
	f: {
		w: 5,
	},
	1: {
		w: 1,
	},
	2: {
		w: 2,
	},
	3: {
		w: 3,
	},
	4: {
		w: 4,
	},
	5: {
		w: 5,
	},
}

const f1 = random.itemByWeight(obj, function (value, key)
{
	return value.w
})

for (let i = 0; i<10; i++)
{
	console.log(f1());
}

const arr = [
	1,
	3,
	5,
	1,
]

const f2 = random.itemByWeight(arr)

for (let i = 0; i<10; i++)
{
	console.log(f2());
}
