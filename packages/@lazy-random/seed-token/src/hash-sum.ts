
import _hashSum from 'hash-sum';

export function hashSum(input, ...argv): string
{
	return _hashSum(input, ...argv)
}

export default hashSum
