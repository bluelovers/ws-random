
import { name, version } from '../../package.json';
import { outputFileSync } from 'fs-extra';
import { join } from 'path';

const file = join(__dirname, '../..', 'src', 'util', 'random-seed-str.data.ts')

outputFileSync(file, `\n\nexport = ${JSON.stringify({
	name, 
	version,
}, null, "\t")}\n\n`)

