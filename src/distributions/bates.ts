import ow from 'ow-lite'
import { Random } from '../random';
import RNG from '../rng'

export default (random: Random, n: number) =>
{
  ow(n, ow.number.integer.positive)
  const irwinHall = random.irwinHall(n)

  return () =>
  {
    return irwinHall() / n
  }
}
