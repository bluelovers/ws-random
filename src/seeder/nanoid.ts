/**
 * Created by user on 2018/10/21/021.
 */

import _nanoid = require('nanoid/non-secure')

export function nanoid(input?, ...argv): string
{
	return _nanoid()
}

export default nanoid
