describe(`void`, () =>
{

	test(`dummy`, () => {});

	([

	]).forEach(fn =>
	{

		test(fn.name, () =>
		{

			let actual: any = fn();

			expect(actual).toMatchSnapshot();

		});

	})

})
