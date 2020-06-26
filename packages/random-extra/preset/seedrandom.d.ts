/**
 * Created by user on 2018/10/20/020.
 */
import { Random } from '../src/random';
import { RNGSeedRandom } from '../src/generators/seedrandom';
export declare const seedrandom: Random<RNGSeedRandom>;
export { seedrandom as random };
export default seedrandom;
