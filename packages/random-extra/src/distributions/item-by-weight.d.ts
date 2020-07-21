import { Random } from '../random';
import { IObjectInput, IWeightEntrie, IOptionsItemByWeight } from './internal/item-by-weight';
declare function itemByWeight<T extends unknown>(random: Random, arr: T[], options?: IOptionsItemByWeight<T>): () => IWeightEntrie<T>;
declare function itemByWeight<T extends unknown, K extends string = string>(random: Random, arr: IObjectInput<T, K>, options?: IOptionsItemByWeight<T, K>): () => IWeightEntrie<T, K>;
export default itemByWeight;
