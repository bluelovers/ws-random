/**
 * Created by user on 2018/11/9/009.
 */
/// <reference types="node" />
import { Random } from '../random';
declare const _default: (random: Random<import("../rng").RNG>, char?: string | number | Buffer, size?: number) => () => string;
export default _default;
