import random from '../..'

describe(`byte`, () =>
{
	it(`random.byte(): number`, () =>
	{
		let ret = random.byte()

		expect(ret.toString()).toMatch(/^\d+$/)
		expect(ret).toBeGreaterThanOrEqual(0);
		expect(ret).toBeLessThanOrEqual(255);

	});

	it(`random.byte(toStr = true): string`, () =>
	{
		let ret = random.byte(true)

		//.is.a('string')
		expect(ret).toHaveLength(2);
	});
});

describe(`bytes`, () =>
{
	it(`random.bytes(): number[]`, () =>
	{
		let ret = random.bytes()

		expect(ret[0]).toBeGreaterThanOrEqual(1)
		;

		for (let i of ret)
		{
			expect(i.toString()).toMatch(/^\d+$/)
			expect(i).toBeGreaterThanOrEqual(0);
			expect(i).toBeLessThanOrEqual(255);
		}

	});

	it(`random.bytes(size = 5): number[]`, () =>
	{
		let ret = random.bytes(5)

		expect(ret).toHaveLength(5)
		;

		for (let i of ret)
		{
			expect(i.toString()).toMatch(/^\d+$/)
			expect(i).toBeGreaterThanOrEqual(0);
			expect(i).toBeLessThanOrEqual(255);
		}
	});

	it(`random.bytes(size = 5, toStr = true): string[]`, () =>
	{
		let ret = random.bytes(5, true)

		expect(ret).toHaveLength(5)
		;

		for (let i of ret)
		{
			expect(i).toHaveLength(2);
		}
	});
});

