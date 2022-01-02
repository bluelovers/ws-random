import { seedFloatByNow, seedStringByNow } from '../src/index';

describe(`test`, () =>
{

	([
		seedFloatByNow,
		seedStringByNow,
	]).forEach(fn =>
	{

		test(fn.name, () =>
		{

			let actual: any = fn();

			expect(actual).toMatchSnapshot();

		});

	})

})
