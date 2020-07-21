import { Random } from '../random';
import { IOptionsItemByWeight, IWeightEntrie, IObjectInput } from './internal/item-by-weight';
declare function itemByWeightUnique<T extends unknown>(random: Random, arr: T[], size: number, options?: IOptionsItemByWeight<T>): () => IWeightEntrie<T>[];
declare function itemByWeightUnique<T extends unknown, K extends string = string>(random: Random, arr: IObjectInput<T, K>, size: number, options?: IOptionsItemByWeight<T, K>): () => IWeightEntrie<T, K>[];
export default itemByWeightUnique;
