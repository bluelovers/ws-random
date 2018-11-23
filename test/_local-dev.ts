// @ts-ignore
import * as _chai from 'chai';
// @ts-ignore
//import { expect, assert } from 'chai';

import ChaiPlugin from 'chai-asserttype-extra'
//import ChaiPlugin = require('chai-asserttype-extra');

const chai = ChaiPlugin.install(_chai);
let { expect, assert } = chai;

export { chai, expect, assert }

// @ts-ignore
import * as path from 'path';
// @ts-ignore
import * as util from 'util';

export { path, util };

// @ts-ignore
export const rootDir: string = path.join(__dirname, '..');

export function relative(filename: string): string
{
	return path.relative(rootDir, filename);
}

export function mochaAsync(fn: Function)
{
	return async (done) =>
	{
		try
		{
			await fn();
			done();
		}
		catch (err)
		{
			done(err);
		}
	};
}

export const MY_DEBUG = process.argv.includes('--debug');

import * as self from './_local-dev';
export default self;
