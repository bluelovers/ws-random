import { df_mulberry32, df_splitmix32 } from '../src/index';
import { df_xfnv1a } from '@lazy-random/seed-algorithm';

describe(`number`, () =>
{
	const _t1 = df_xfnv1a('apple')();
	const _t2 = df_xfnv1a('applE')();

	([
		df_mulberry32,
		df_splitmix32,
	]).forEach(fn =>
	{

		test(fn.name, () =>
		{

			const seedFn: () => number = fn(_t1)

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

			const seedFn2: () => number = fn(_t2)

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
