//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { basename, extname } from 'path';
import { parseFloatString, parseFloatOnlyString, parseIntString } from '../src/index';

beforeAll(async () =>
{

});

describe(basename(__filename, extname(__filename)), () =>
{

	test.skip(`dummy`, () => {});

	test.each([

		'0',
		'0.0',
		'0.1',
		'.1',

		'+0',
		'+0.0',
		'+0.1',
		'+.1',

		'-0',
		'-0.0',
		'-0.1',
		'-.1',

	])(`%j`, (input) =>
	{
		let actual = parseFloatString(input);
		let expected;

		expect(typeof actual).toStrictEqual('number');

		let b;
		let c;

		try
		{
			b = parseFloatOnlyString(input);
		}
		catch (e)
		{

		}

		try
		{
			b = parseFloatOnlyString(input);
		}
		catch (e)
		{
			c = parseIntString(input)
		}

		expect({
			parseFloatString: actual,
			parseFloatOnlyString: b,
			parseIntString: c,
		}).toMatchSnapshot();

	});

})
