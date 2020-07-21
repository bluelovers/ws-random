import { Random } from '../random';
import { IObjectInput, IWeightEntrie, IGetWeight } from './internal/item-by-weight';
declare function itemByWeight<T extends unknown>(random: Random, arr: T[], getWeight?: IGetWeight<T>, shuffle?: boolean, disableSort?: boolean): () => IWeightEntrie<T>;
declare function itemByWeight<T extends unknown>(random: Random, arr: IObjectInput<T>, getWeight?: IGetWeight<T>, shuffle?: boolean, disableSort?: boolean): () => IWeightEntrie<T>;
export default itemByWeight;
