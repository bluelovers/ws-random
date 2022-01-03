import { seedFloatByDate, seedStringByDate } from '../src/index';

describe(`test`, () =>
{
	const date = new Date('2020-01-01');
	const fnRandomFloat = () => 0.111111111111;

	([
		seedFloatByDate,
		seedStringByDate,
	]).forEach(fn =>
	{

		test(fn.name, () =>
		{

			let actual: any = fn(date, fnRandomFloat);

			expect(actual).toMatchSnapshot();

		});

	})

})
