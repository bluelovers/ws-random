/**
 * Created by user on 2021/12/9.
 */

import { copySync } from 'fs-extra';
import { __root } from '../__root';
import { join } from 'path';

copySync(join(__root, 'src/index.d.ts'), join(__root, 'dist/index.d.ts'));
