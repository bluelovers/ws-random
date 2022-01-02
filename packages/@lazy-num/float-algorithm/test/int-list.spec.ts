import { df_tyche, df_tychei } from '../src/algorithm/int-list/tyche';
import { df_sfc32 } from '../src/algorithm/int-list/sfc32';

describe(`int-list`, () =>
{
	const actual_size = 16 as const;
	const actual_rest = [
		2654435769, 1013904242, 3668340011
	] as const;

	([
		df_tyche,
		df_tychei,
		df_sfc32,
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
