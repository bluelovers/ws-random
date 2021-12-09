import { floatToString } from '../src/index';

describe(`floatToString`, () =>
{

	[
		[0.37309237516003946, '0.37309237516003946'],
	].forEach(n =>
	{

		test(`${n[0]}`, () =>
		{
			let argv = [n[0]].flat() as Parameters<typeof floatToString>;

			let actual = floatToString(...argv);
			let expected = n[1];

			typeof expected !== 'undefined' && expect(actual).toStrictEqual(expected);
			expect(actual).toMatchSnapshot();

		});

	})

})
