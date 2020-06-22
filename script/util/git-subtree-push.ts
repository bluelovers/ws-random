/**
 * Created by user on 2020/5/13.
 */
import { crossSpawnGitAsync } from '@git-lazy/spawn'
import console from 'debug-color2/logger'
import __root_ws from '../../__root_ws';
import { unlinkSync, pathExistsSync } from 'fs-extra';
import { name } from './add-to-postpublish-task';
import createCacheName from './create-cache-name';
import { subtreePush, IOptionsCommon } from '@git-lazy/subtree';
import { _handle } from './data';

export async function gitSubtreePush(module_name: 'runes2' | string)
{

	let { _ok, options } = _handle(module_name)

	if (_ok)
	{
		await subtreePush(options);
	}

	let file = createCacheName('subtree', module_name);
	if (pathExistsSync(file))
	{

		(_ok ? console : console.red).debug(`[subtree:script]`, `del`, module_name);
		unlinkSync(file);
	}
}
