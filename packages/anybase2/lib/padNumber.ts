
export function padNumber(returnValue: string, minimum_digits: number, maximum_digits: number)
{
	if (minimum_digits > 0)
	{
		returnValue = returnValue.padStart(minimum_digits, '0')
	}

	if (maximum_digits > 0 && returnValue.length > maximum_digits)
	{
		returnValue = returnValue.substr(0, maximum_digits);
	}

	return returnValue
}
