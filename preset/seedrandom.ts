/**
 * Created by user on 2018/10/20/020.
 */

import _random from '../src/random'
import RNGSeedRandom, {  } from '../src/generators/seedrandom';

export const seedrandom = _random.newUse('seedrandom')

export { seedrandom as random }

export default seedrandom
