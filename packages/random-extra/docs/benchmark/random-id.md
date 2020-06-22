# benchmark

[shortid.perf.ts](../../test/benchmark/random-id.perf.ts)

Fastest is xor128.dfCharID  
Slowest is shortid

-----------------------
xor128.dfCharID x 2,247,425 ops/sec ±4.01% (84 runs sampled)  
random.dfCharID x 2,044,920 ops/sec ±5.13% (77 runs sampled)  
math-random2.dfCharID x 1,941,745 ops/sec ±4.46% (88 runs sampled)  
seedrandom.dfCharID x 1,306,799 ops/sec ±4.26% (87 runs sampled)  
nanoid x 413,117 ops/sec ±1.33% (87 runs sampled)  
shortid x 45,968 ops/sec ±2.31% (82 runs sampled)
