import { Random } from '../random';
export default function uniformBytes(random: Random, size: number, toStr: true): () => string[];
export default function uniformBytes(random: Random, size: number, toStr?: false): () => number[];
export default function uniformBytes(random: Random, size: number, toStr?: boolean): (() => string[]) | (() => number[]);
