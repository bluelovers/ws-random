import { RNGSfc32 } from '../src/index';

test(`[0, 2654435769, 1013904242, 3668340011]`, () =>
{
	let rng = new RNGSfc32([0, 2654435769, 1013904242, 3668340011]);

	let actual: number[] = [];

	for (let i = 0; i < 16; i++)
	{
		actual.push(rng.next())
	}

	expect((rng as any)._seed).toHaveLength(4);
	expect(rng).toMatchSnapshot();
	expect(actual).toMatchSnapshot();

});

test(`['apple','apple','apple','apple','apple']`, () =>
{
	let rng = new RNGSfc32(['apple', 'apple', 'apple', 'apple', 'apple']);

	let actual: number[] = [];

	for (let i = 0; i < 16; i++)
	{
		actual.push(rng.next())
	}

	expect((rng as any)._seed).toHaveLength(4);
	expect(rng).toMatchSnapshot();
	expect(actual).toMatchSnapshot();

});
