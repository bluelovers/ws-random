import { Random } from '../random';
import { IObjectInput, IWeightEntrie, IGetWeight } from './internal/item-by-weight';
declare function itemByWeight<T extends unknown>(random: Random, arr: T[], getWeight?: IGetWeight<T>, shuffle?: boolean, disableSort?: boolean): () => IWeightEntrie<T>;
declare function itemByWeight<T extends unknown, K extends string = string>(random: Random, arr: IObjectInput<T, K>, getWeight?: IGetWeight<T, K>, shuffle?: boolean, disableSort?: boolean): () => IWeightEntrie<T, K>;
export default itemByWeight;
