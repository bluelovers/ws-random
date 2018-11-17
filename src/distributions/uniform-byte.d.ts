import { Random } from '../random';
export default function uniformByte(random: Random, toStr: true): () => string;
export default function uniformByte(random: Random, toStr?: false): () => number;
export default function uniformByte(random: Random, toStr?: boolean): (() => string) | (() => number);
