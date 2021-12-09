// @ts-ignore
import _nanoid from 'nanoid/non-secure';

export function nanoid(input?, ...argv): string
{
	return _nanoid()
}

export default nanoid;
