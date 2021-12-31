import { newRngSeedRandom } from '@lazy-random/util-test';
import { dfArrayFill } from '../src/index';

describe(`dfArrayFill`, () =>
{
	const fn = dfArrayFill(newRngSeedRandom());

	const tests = [
		['Array', new Array(10)],
		['Uint8Array', new Uint8Array(10)],
		['Buffer', Buffer.alloc(10)],
	] as const;

	tests.forEach(function (arr)
	{
		it(`${arr[0]}`, () =>
		{
			let ret = fn(arr[1]);

			expect(ret).toHaveLength(10);
			expect(ret).toMatchSnapshot()
		});
	});
});
