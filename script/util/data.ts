import __root_ws from '../../__root_ws';

import { subtreePush, IOptionsCommon } from '@git-lazy/subtree';

export type IModuleName = 'random-extra' | string

export function _handle(module_name: IModuleName)
{
	let _ok: boolean = true;

	let options: IOptionsCommon = {
		name: module_name,
		prefix: `packages/${module_name}`,
		cwd: __root_ws,
	} as any;

	switch (module_name)
	{
		case 'random-extra':
			options.remote = `https://github.com/bluelovers/random.git`;
			break;
		default:
			_ok = false;
			break;
	}

	return {
		module_name,
		_ok,
		options,
	}
}
