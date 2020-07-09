/**
 * Created by user on 2020/7/10.
 */
import { outputFile } from 'fs-extra';
import { join } from 'path';

let i, j, k, len , l;

const chars = (function() {
	var j, results;
	results = [];
	for (i = j = 0; j < 10; i = ++j) {
		results.push(String(i));
	}
	return results;
})();



for (i = j = 65; j <= 90; i = ++j) {
	chars.push(String.fromCharCode(i));
}

for (i = k = 97; k <= 122; i = ++k) {
	chars.push(String.fromCharCode(i));
}

const map = {};

for (i = l = 0, len = chars.length; l < len; i = ++l) {
	let char = chars[i];
	map[char] = i;
}

export {}

let lines: string[] = [];

lines.push('');

lines.push(`export const chars = ${JSON.stringify(chars)};`);

lines.push('');

lines.push(`export const map = ${JSON.stringify(map, null, `\t`)};`);

lines.push('');

outputFile(join(__dirname, '../..', 'lib', 'data.ts'), lines.join('\n'));
