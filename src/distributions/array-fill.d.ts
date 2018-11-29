/// <reference types="node" />
import { ITSArrayLikeWriteable } from 'ts-type';
import { Random } from '../random';
export default function arrayFill(random: Random, min?: number, max?: number, float?: boolean): <T extends ITSArrayLikeWriteable<number> | Float32Array | Float64Array | Int8Array | Int16Array | Int32Array | Uint8ClampedArray | Uint8Array | Uint16Array | Uint32Array | Buffer>(arr: T) => T;
