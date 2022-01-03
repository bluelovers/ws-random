import { _MathRandom } from '@lazy-random/original-math-random';
import { floatToString } from '@lazy-num/float-to-string';

type IFnRandomFloat = () => number;

export function seedFloatByDate(date: Date, fnRandomFloat: IFnRandomFloat)
{
	return date.valueOf() + (fnRandomFloat ?? _MathRandom)();
}

export function seedFloatByNow(fnRandomFloat?: IFnRandomFloat)
{
	return seedFloatByDate(new Date(), fnRandomFloat);
}

export function seedStringByDate(date: Date, fnRandomFloat?: IFnRandomFloat)
{
	return floatToString(seedFloatByDate(date, fnRandomFloat));
}

export function seedStringByNow(fnRandomFloat?: IFnRandomFloat)
{
	return floatToString(seedFloatByDate(new Date(), fnRandomFloat));
}
