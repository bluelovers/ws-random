import { df_v3b } from '../src/index';

describe(`int-list`, () =>
{
	const actual_size = 16 as const;
	const actual_rest = [
		2654435769, 1013904242, 3668340011
	] as const;

	([
		df_v3b,
	]).forEach(fn =>
	{

		test(fn.name, () =>
		{

			const seedFn: () => number = fn(0, ...actual_rest);

			let actual: number[] = [];

			for (let i = 0; i < actual_size; i++)
			{
				actual[i] = seedFn();
			}

			expect(actual).toMatchSnapshot();

			const seedFn2: () => number = fn(1, ...actual_rest);

			let actual2: number[] = [];

			for (let i = 0; i < actual_size; i++)
			{
				actual2[i] = seedFn2();
			}

			expect(actual).not.toStrictEqual(actual2);

			expect(actual2).toMatchSnapshot();

		});

	})

})
