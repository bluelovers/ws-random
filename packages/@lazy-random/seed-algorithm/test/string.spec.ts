import { df_xfnv1a, df_xfnv1a_2, df_xmur3, df_xmur3a } from '../src/index';

describe(`string`, () =>
{

	([
		df_xfnv1a,
		df_xfnv1a_2,
		df_xmur3,
		df_xmur3a,
	]).forEach(fn =>
	{

		test(fn.name, () =>
		{

			const seedFn: () => number = fn('apple')

			let actual = [
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
				seedFn(),
			];

			expect(actual).toMatchSnapshot();

			const seedFn2: () => number = fn('applE')

			let actual2 = [
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
				seedFn2(),
			];

			expect(actual).not.toStrictEqual(actual2);

			expect(actual2).toMatchSnapshot();

		});

	})

})
