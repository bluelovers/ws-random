import { newRngMathRandom } from '@lazy-random/util-test';
import { dfUniformByte, dfUniformBytes } from '../src/index';

const rnd = newRngMathRandom();

describe(`byte`, () =>
{
	it(`random.byte(): number`, () =>
	{
		let ret = dfUniformByte(rnd)();

		expect(ret.toString()).toMatch(/^\d+$/)
		expect(ret).toBeGreaterThanOrEqual(0);
		expect(ret).toBeLessThanOrEqual(255);

	});

	it(`random.byte(toStr = true): string`, () =>
	{
		let ret = dfUniformByte(rnd, true)()

		//.is.a('string')
		expect(ret).toHaveLength(2);
	});
});

describe(`bytes`, () =>
{
	it(`random.bytes(): number[]`, () =>
	{
		let ret = dfUniformBytes(rnd, 1)()

		expect(ret[0]).toBeGreaterThanOrEqual(1);

		for (let i of ret)
		{
			expect(i.toString()).toMatch(/^\d+$/)
			expect(i).toBeGreaterThanOrEqual(0);
			expect(i).toBeLessThanOrEqual(255);
		}

	});

	it(`random.bytes(size = 5): number[]`, () =>
	{
		let ret = dfUniformBytes(rnd, 5)()

		expect(ret).toHaveLength(5);

		for (let i of ret)
		{
			expect(i.toString()).toMatch(/^\d+$/)
			expect(i).toBeGreaterThanOrEqual(0);
			expect(i).toBeLessThanOrEqual(255);
		}
	});

	it(`random.bytes(size = 5, toStr = true): string[]`, () =>
	{
		let ret = dfUniformBytes(rnd, 5, true)()

		expect(ret).toHaveLength(5);

		for (let i of ret)
		{
			expect(i).toHaveLength(2);
		}
	});
});

