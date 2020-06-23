import Big from 'big.js';

export function subAbs(actual: number, expected: number)
{
	//console.log(sub(expected, actual), typeof sub(expected, actual))
	return new Big(expected)
		.sub(actual)
		.abs().valueOf()
}

export function numberInDeltaUnsafe002(actual: number, expected: number, delta = 0.05)
{
	return Math.abs(expected - actual) <= delta
}
