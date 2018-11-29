import random from '../../index';
import { swapAlgorithm, swapAlgorithm2 } from '../../src/util/array';

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//let a = swapAlgorithm(arr.slice())
//let a4 = swapAlgorithm(arr.slice())

let a2 = swapAlgorithm2(arr.slice())

let a3 = random.arrayShuffle(arr.slice())

//console.log(a);
//console.log(a4);
console.log(a2, Uint8Array[Symbol.species]);
console.log(a3);

let t1 = Buffer.alloc(10)

t1[0] = 11;

let a5 = random.arrayShuffle(t1)

let c1 = Object.getPrototypeOf(a5)

console.log(t1, c1);
