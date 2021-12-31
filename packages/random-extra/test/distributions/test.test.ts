import checkTypesMatchers from '../jest/type';

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



