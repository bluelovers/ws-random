import random from '../..'
import checkTypesMatchers from '../jest/type';

const r = random;

expect.extend(checkTypesMatchers);

it(`make sure test lib is support float check`, () =>
{
	expect(0.9).not.toStrictEqual(0.8)
	expect(0.999).not.toStrictEqual(0.998)
	expect(0.999).toStrictEqual(0.999)
	expect(0.9).toStrictEqual(0.9)

	expect(0.9282578795792454).not.toStrictEqual(0.9282578795792454 + 2 - 1 - 1);
	expect(0.9282578795792454).not.toStrictEqual(0.9282578795792453);

	expect(function ()
	{
		expect(1).toBeFloat();
	}).toThrowError()

	expect(function ()
	{
		expect(0.9).toBeInteger()
	}).toThrowError()
});

it(`make sure test lib is support length check`, () =>
{
	let a = [1, 2, 3];

	expect(a).toHaveLength(3)
	expect(a.length).toBeGreaterThanOrEqual(3)

	expect(() =>
	{
		expect(a.length).toBeGreaterThan(3)
	}).toThrowError()

	expect('abc').toHaveLength(3)

	expect('abc').toBe('abc');
	expect('abc').toHaveLength(3);

	expect(() =>
	{
		expect(a.length).not.toBeGreaterThanOrEqual(3)
	}).toThrowError()
});

// @ts-ignore
describe(`dfArrayUnique`, () =>
{
	const count = 10000;

	// @ts-ignore
	it(`dfArrayUnique`, () =>
	{
		let arr = [1, 2, 3, 4];

		const d = r.dfArrayUnique(arr, 3, true);

		let cache = {}

		for (let i = 0; i < count; ++i)
		{
			const v = d();

			cache[v] = v;
		}

		Object.values(cache)
			.forEach(function (v)
			{
				expect(v).toBeOneOf(arr)
			})
		;
	});

	it(`return another when out of limit`, () =>
	{
		let arr = [1, 2, 3, 4];
		let limit = 3;

		let arr2 = [7, 8, 9]

		const d = random.dfArrayUnique(arr, limit, true, null, function ()
		{
			return arr2
		});

		let cache = {}
		let cache2 = {}

		for (let i = 0; i < 10000; ++i)
		{
			const v = d()

			if (i >= limit)
			{
				cache2[v] = v;
			}
			else
			{
				cache[v] = v;
			}
		}

		Object.values(cache)
			.forEach(function (v)
			{
				expect(v).toBeOneOf(arr)
				expect(v).not.toBeOneOf(arr2)
			})
		;
		Object.values(cache2)
			.forEach(function (v)
			{
				expect(v).toBeOneOf(arr2)
				expect(v).not.toBeOneOf(arr)
			})
		;
	});

});

