import RNG from '../rng'

export default (random: RNG) =>
{
	return () =>
	{
		return (random.next() >= 0.5)
	}
}
