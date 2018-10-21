import { Random } from '../random';
import uniformInt from './uniform-int';

export default function uniformByte(random: Random)
{
	return uniformInt(random, 0, 255)
}

// @ts-ignore
Object.freeze(exports)
