
const reInt = /^[+-]?\d+$/;
const reFloatOnly = /^[+-]?(?:\d+)?\.\d+$/;
const reFloat = new RegExp(reInt.source + '|' + reFloatOnly.source);

export function isIntString<T extends `${number}` | string = `${number}`>(input: unknown): input is T
{
	return (typeof input === 'string' && reInt.test(input))
}

export function isFloatOnlyString<T extends `${number}` | string = `${number}`>(input: unknown | T): input is T
{
	return (typeof input === 'string' && reFloatOnly.test(input))
}

export function isFloatString<T extends `${number}` | string = `${number}`>(input: unknown | T): input is T
{
	return (typeof input === 'string' && reFloat.test(input))
}

export type IParseNumberFn = (<T extends `${number}` | string = `${number}`>(input: unknown | T) => input is T) | ((input: unknown) => input is`${number}`)

export function _parseNumberString<T extends number>(validFn: IParseNumberFn, input: unknown | T | `${T}`): T
{
	if (validFn(input))
	{
		return Number(input) as T
	}

	if (typeof input !== 'number')
	{
		throw new TypeError(`Invalid value: ${input}`)
	}

	return input as T
}

export function parseIntString<T extends number>(input: T): T
export function parseIntString<T extends number>(input: `${T}`): T
export function parseIntString<T extends number>(input: unknown | T | `${T}`): T
export function parseIntString<T extends number>(input: unknown | T | `${T}`): T
{
	return _parseNumberString(isIntString, input)
}

export function parseFloatOnlyString<T extends number>(input: T): T
export function parseFloatOnlyString<T extends number>(input: `${T}`): T
export function parseFloatOnlyString<T extends number>(input: unknown | T | `${T}`): T
export function parseFloatOnlyString<T extends number>(input: unknown | T | `${T}`): T
{
	return _parseNumberString(isFloatOnlyString, input)
}

export function parseFloatString<T extends number>(input: T): T
export function parseFloatString<T extends number>(input: `${T}`): T
export function parseFloatString<T extends number>(input: unknown | T | `${T}`): T
export function parseFloatString<T extends number>(input: unknown | T | `${T}`): T
{
	return _parseNumberString(isFloatString, input as any)
}

export default parseFloatString
