import { IArrayInput02 } from '../type';
import { Random } from '../random';
export default function arrayFill(random: Random, min?: number, max?: number, float?: boolean): <T extends IArrayInput02<number>>(arr: T) => T;
