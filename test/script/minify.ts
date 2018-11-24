/**
 * Created by user on 2018/11/25/025.
 */

import * as path from 'path';
import * as UglifyJS from 'uglify-es';
import * as fs from 'fs-extra';
import * as fg from 'fast-glob';
import Bluebird = require('bluebird');

const root = path.join(__dirname, '../..');
const root_out = path.join(root, 'lib');
const root_src = path.join(root, 'src');

Bluebird
	.resolve(fs.remove(root_out))
	.thenReturn(fg
		.async<string>([
			'**/*.js',
		], {
			cwd: root_src,
		}))
	.map(async function (name, index)
	{
		let code = await fs.readFile(path.join(root_src, name), 'utf8');

		let out = UglifyJS.minify(code, {
			compress: {
				dead_code: false,
				global_defs: {},
				ecma: 8,
				inline: true,
				keep_classnames: true,
				keep_fnames: true,
				keep_infinity: true,
				passes: 2,
				pure_getters: false,
				unused: false,
				warnings: true,
			},
			sourceMap: {
				url: "inline",
			},
			ecma: 8,
			output: {
				beautify: true,
			},
			keep_classnames: true,
			keep_fnames: true,
		});

		//console.log(out);
		//process.exit()

		await fs
			.outputFile(path.join(root_out, name), out.code)
		;

		console.log(index, name);
	})
	.thenReturn(fg
		.async<string>([
			'**/*.d.ts',
		], {
			cwd: root_src,
		}))
	.map(function (name, index)
	{
		return fs
			.copy(path.join(root_src, name), path.join(root_out, name), {
				preserveTimestamps: true,
				overwrite: true,
			})
			;
	})
	.tap(function ()
	{
		console.log(`done.`);
	})
;
