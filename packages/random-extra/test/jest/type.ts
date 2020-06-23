import {
	matcherHint,
	printExpected,
	printReceived,
	MatcherHintOptions,
	matcherErrorMessage,
	EXPECTED_COLOR, printWithType, RECEIVED_COLOR,
} from 'jest-matcher-utils';
import check from 'check-types';
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import CustomMatcher = jest.CustomMatcher;
import ExpectExtendMap = jest.ExpectExtendMap;
import MatcherState = jest.MatcherState;
import { printCloseTo } from 'expect/build/print';
import MatcherUtils = jest.MatcherUtils;
import { expectInDelta } from '../../src/util/assers';

const types = ['number', 'string', 'boolean', 'object', 'array', 'date', 'function', 'float'];

export interface ICheckTypesMatchers
{
	toBeNumber: CustomMatcher,
	toBeFloat: CustomMatcher,
	toBeInteger: CustomMatcher,

	toBeString: CustomMatcher,
	toBeBoolean: CustomMatcher,
	toBeObject: CustomMatcher,
	toBeArray: CustomMatcher,
	toBeDate: CustomMatcher,
	toBeFunction: CustomMatcher

	toBeCloseToWithDelta: CustomMatcher
}

declare global
{

	namespace jest
	{

		interface Matchers<R> extends Record<keyof ICheckTypesMatchers, () => R>
		{
			toBeCloseToWithDelta(expected: number, delta: number, numDigits?: number): R;
		}

	}

}

export const checkTypesMatchers = types.reduce((a, type) =>
{

	a[`toBe${type.replace(/^[a-z]/, (s) => s.toUpperCase())}`] = (received: any) =>
	{
		let bool = check[type](received)

		return bool ? {
			message: () => (
				`expected ${received} to be ${type}`
			),
			pass: true,
		} : {
			message: () => (`expected ${received} not to be ${type}`),
			pass: false,
		};
	}

	return a
}, {} as ICheckTypesMatchers & ExpectExtendMap);

checkTypesMatchers.toBeCloseToWithDelta = function (
	this: MatcherUtils,
	received: number,
	expected: number,
	delta?: number,
	precision: number = 2,
)
{
	const matcherName = 'toBeCloseTo';
	const secondArgument = arguments.length === 3 ? 'precision' : undefined;
	// @ts-ignore
	const isNot = this.isNot;
	const options: MatcherHintOptions = {
		isNot,
		// @ts-ignore
		promise: this.promise,
		secondArgument,
		secondArgumentColor: (arg: string) => arg,
	};

	if (typeof expected !== 'number')
	{
		throw new Error(
			matcherErrorMessage(
				matcherHint(matcherName, undefined, undefined, options),
				`${EXPECTED_COLOR('expected')} value must be a number`,
				printWithType('Expected', expected, printExpected),
			),
		);
	}

	if (typeof received !== 'number')
	{
		throw new Error(
			matcherErrorMessage(
				matcherHint(matcherName, undefined, undefined, options),
				`${RECEIVED_COLOR('received')} value must be a number`,
				printWithType('Received', received, printReceived),
			),
		);
	}

	let pass = false;
	let expectedDiff = 0;
	let receivedDiff = 0;

	if (received === Infinity && expected === Infinity)
	{
		pass = true; // Infinity - Infinity is NaN
	}
	else if (received === -Infinity && expected === -Infinity)
	{
		pass = true; // -Infinity - -Infinity is NaN
	}
	else
	{
		expectedDiff = Math.pow(10, -precision) / 2;
		receivedDiff = Math.abs(expected - received);
		pass = expectInDelta(received, expected, delta)
	}

	const message = pass
		? () =>
			matcherHint(matcherName, undefined, undefined, options) +
			'\n\n' +
			`Expected: not ${printExpected(expected)}\n` +
			(receivedDiff === 0
				? ''
				: `Received:     ${printReceived(received)}\n` +
				'\n' +
				printCloseTo(receivedDiff, expectedDiff, precision, isNot))
		: () =>
			matcherHint(matcherName, undefined, undefined, options) +
			'\n\n' +
			`Expected: ${printExpected(expected)}\n` +
			`Received: ${printReceived(received)}\n` +
			'\n' +
			printCloseTo(receivedDiff, expectedDiff, precision, isNot);

	return { message, pass };
}

export default checkTypesMatchers
