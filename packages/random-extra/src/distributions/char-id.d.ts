/**
 * Created by user on 2018/11/9/009.
 */
/// <reference types="node" />
import { Random } from '../random';
import { ENUM_ALPHABET } from '@lazy-random/shared-lib';
declare const _default: (random: Random, char?: ENUM_ALPHABET | string | Buffer | number, size?: number) => () => string;
export default _default;
