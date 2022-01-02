import { _MathRandom } from '@lazy-random/original-math-random';
import { floatToString } from '@lazy-num/float-to-string';

export function seedFloatByDate(date: Date)
{
	return date.valueOf() + _MathRandom();
}

export function seedFloatByNow()
{
	return seedFloatByDate(new Date());
}

export function seedStringByDate(date: Date)
{
	return floatToString(seedFloatByDate(date));
}

export function seedStringByNow()
{
	return floatToString(seedFloatByDate(new Date()));
}
