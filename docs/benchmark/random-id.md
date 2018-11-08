# benchmark

[shortid.perf.ts](../../test/benchmark/random-id.perf.ts)

Fastest is xor128.charID  
Slowest is shortid

-----------------------
xor128.charID x 2,389,450 ops/sec ±1.81% (86 runs sampled)  
random.charID x 2,300,164 ops/sec ±1.44% (86 runs sampled)  
math-random2.charID x 2,105,753 ops/sec ±0.72% (91 runs sampled)  
seedrandom.charID x 1,419,763 ops/sec ±1.09% (90 runs sampled)  
nanoid x 440,305 ops/sec ±0.36% (90 runs sampled)  
shortid x 47,389 ops/sec ±1.08% (89 runs sampled)
