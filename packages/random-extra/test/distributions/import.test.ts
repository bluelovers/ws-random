import random, { Random } from '../../src'

// @ts-ignore
describe(`import`, () =>
{
	it(`import default`, () =>
	{
		let r = require('../..').default;

		expect(r).toBeInstanceOf(Random);
		expect(r).toEqual(random)
	});

	it(`require`, () =>
	{
		let r = require('../..');

		expect(r).toBeInstanceOf(Random);
		expect(r).toEqual(random)
	});

	it(`random = random.default`, () =>
	{
		let r = require('../..');

		expect(r.default).toBeInstanceOf(Random);
		expect(r.default).toEqual(random)
	});

});

