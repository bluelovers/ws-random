import random from '../../src'
import { tests } from '../benchmark';

const methods_int = {
	int: [0, 100],
	integer: [0, 100],
	byte: [0, 255],
};

const methods_float = {
	srand: [0, 1],
	srandom: [0, 1],
	rand: [0, 1],
	random: [0, 1],
	next: [0, 1],
	float: [0, 1],
};

[
	methods_int,
	methods_float,
].forEach(function (current_methods)
{
	describe(current_methods === methods_int ? `int` : `float`, () =>
	{
		Object.keys(current_methods)
			.forEach(function (method)
			{

				describe(method, () =>
				{

					[
						'random',
						'seedrandom',
						'xor128',
						'math-random2',
					].forEach(function (name)
					{

						it(`${name}.${method}() in [ ${current_methods[method].join(', ')} ]`, () =>
						{
							let max = current_methods[method][0], min = current_methods[method][1], a: number;

							let lib = tests[name]

							for (let i = 0; i < 10000; ++i)
							{
								const v = lib[method]()

								max = Math.max(v, max)
								min = Math.min(v, min)

								if (v !== 1 && v !== max && v !== min)
								{
									a = v
								}
							}

							expect(min).toBeGreaterThanOrEqual(current_methods[method][0])
							expect(max).toBeLessThanOrEqual(current_methods[method][1])

							if (current_methods === methods_float)
							{
								expect(a)
									.toBeLessThan(current_methods[method][1])
								;
								expect(a)
									.toBeGreaterThan(current_methods[method][0])
								;

								expect(min)
									.toBeGreaterThan(0)
								;
								expect(min)
									.toBeLessThan(0.001)
								;

								expect(max)
									.toBeGreaterThanOrEqual(0.9)
								;
								expect(max)
									.toBeLessThan(1)
								;
							}
							else if (current_methods === methods_int)
							{
								expect(min).toEqual(current_methods[method][0])
								expect(max).toEqual(current_methods[method][1])

								if (current_methods[method][1] > 1)
								{

									expect(a)
										.toBeLessThan(current_methods[method][1])
									;

									expect(a)
										.toBeGreaterThan(current_methods[method][0])
									;

									expect(a)
										.toBeGreaterThan(1)
									;

								}
							}
						});
					})

				})

			})
		;
	})

});

