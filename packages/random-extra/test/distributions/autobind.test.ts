import random from '../..'

describe(`core-decorators<@autobind>`, () =>
{

	[
		'next',
		'random',
	].forEach((method) =>
	{

		it(`.${method}`, () =>
		{
			let fn = random[method];

			expect(fn).toBeInstanceOf(Function);
			expect(fn).toEqual(random[method])
			expect(typeof fn()).toStrictEqual('number');
		});

	});

	it(`.seed`, () =>
	{
		let fn = random.seed;

		expect(fn).toBeInstanceOf(Function);
		expect(fn).toEqual(random.seed)
		expect(fn()).toEqual(random);
	});

});

