import anybase from '../index';

test(`2 11 8`, () =>
{

	let actual = anybase(2, 11, 8);
	let expected = '1001';

	expect(actual).toStrictEqual(expected);

});

test(`2 11 8 8`, () =>
{

	let actual = anybase(2, 11, 8, 8);
	let expected = '00001001';

	expect(actual).toStrictEqual(expected);

});

test(`2 1 2 2`, () =>
{

	let actual = anybase(2, 1, 2, 2);
	let expected = '01';

	expect(actual).toStrictEqual(expected);

});

test(`16 10`, () =>
{

	let actual = anybase(16, 10);
	let expected = 'A';

	expect(actual).toStrictEqual(expected);

});

describe(`ignore case when base <= 16`, () =>
{

	test(`10 0a 16`, () =>
	{

		let actual = anybase(10, '0a', 16);
		let expected = '10';

		expect(actual).toStrictEqual(expected);

	});

	test(`10 0A 16`, () =>
	{

		let actual = anybase(10, '0A', 16);
		let expected = '10';

		expect(actual).toStrictEqual(expected);

	});

})
