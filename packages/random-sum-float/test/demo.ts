
import randomSumFloat, { create } from '..';

let size = 3;
let sum = 10;
let min = 1;
let max = 10;

/**
 * recommend way, otherwise will slow
 */
let fn = create(size, sum, min, max);
let v: number[];

v = fn();

console.log(v, array_sum(v));
// => [ 2.828736460774711, 5.763831427698853, 1.407432111526436 ] 10

/**
 * will slow if not same [size, sum, min, max]
 */
v = randomSumFloat(size, sum, min, max);
// => [ 1.0521188269862214, 4.661026586341693, 4.286854586672085 ] 10

console.log(v, array_sum(v));

/**
 * auto create sum
 */
v = randomSumFloat(size, null, min, max);
// => [ 3.9067266610605182, 4.259092854483752, 3.834180484455729 ] 12

console.log(v, array_sum(v));

/**
 * auto create sum v2
 */
v = randomSumFloat(size);
// => [ 0.3641343986242387, 0.4843074708676399, 0.1515581305081214 ] 1

console.log(v, array_sum(v));

v = randomSumFloat(size, 0, -5, 10);
// => [ 2.879740922080848, -0.4913386492777585, -2.3884022728030896 ] 0

console.log(v, array_sum(v));

v = randomSumFloat(size, -10, -5, 10);
// => [ -4.429865487852505, -3.5847740400416157, -1.9853604721058797 ] -10

console.log(v, array_sum(v));

export function array_sum(na: number[])
{
	return na.reduce((a, b) => a + b)
}
