import randomSumFloat, { create } from '../index';

const size = 3;
const sum = 10;
const min = 1;
const max = 10;

let v: number[];

describe(`create`, () =>
{
	let fn = create(size, sum, min, max)

	test(`fn();`, () =>
	{
		v = fn();

		let actual = array_sum(v);

		expect(actual).toStrictEqual(sum);

		check(v);
	});
})
test(`randomSumFloat(size, sum, min, max)`, () =>
{
	v = randomSumFloat(size, sum, min, max);

	let actual = array_sum(v);

	expect(actual).toStrictEqual(sum);

	check(v);
});

test(`auto create sum`, () =>
{
	v = randomSumFloat(size, sum, min, max);

	let actual = array_sum(v);

	expect(actual).toStrictEqual(sum);

	check(v);
});

test(`auto create sum v2`, () =>
{
	v = randomSumFloat(size);

	let actual = array_sum(v);

	expect(typeof actual).toStrictEqual('number');

	check(v);
});

test(`randomSumFloat(size, 0, -5, 10)`, () =>
{
	v = randomSumFloat(size, 0, -5, 10);

	let actual = array_sum(v);

	expect(actual).toStrictEqual(0);

	check(v);
});

test(`randomSumFloat(size, -10, -5, 10)`, () =>
{
	v = randomSumFloat(size, -10, -5, 10);

	let actual = array_sum(v);

	expect(actual).toStrictEqual(-10);

	check(v);
});

export function array_sum(na: number[])
{
	return na.reduce((a, b) => a + b)
}

export function check(v: number[])
{
	expect(Array.isArray(v)).toStrictEqual(true);
	expect(v.length).toBeGreaterThanOrEqual(1)
}
