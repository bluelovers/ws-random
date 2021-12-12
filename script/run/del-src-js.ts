import FastGlob from '@bluelovers/fast-glob/bluebird';
import { remove } from 'fs-extra';
import { join } from 'path';

FastGlob.async([
	'packages/@lazy-num/*/src/**/*.js',
	'packages/@lazy-random/*/src/**/*.js',
	'packages/random-sum-float/src/**/*.js',
	'packages/num-is-zerosrc/**/*.js',
], {
	cwd: join(__dirname, '../..'),
	absolute: true,
}).each(file => {
	console.log(file)
	return remove(file)
});
