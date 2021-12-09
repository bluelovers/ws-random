import { Random } from '../random';
import { IArrayInput02 } from '@lazy-random/shared-lib';
export default function arrayFill(random: Random, min?: number, max?: number, float?: boolean): <T extends IArrayInput02<number>>(arr: T) => T;
