import { Random } from '../random';
import RNG from '../rng'

export default (random: Random) =>
{
	return () =>
	{
		return (random.next() >= 0.5)
	}
}
