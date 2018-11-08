# benchmark

[index.ts](../../test/benchmark/index.ts)

-----------------------
next
=======================

Math.next => 0.7853905697828523  
random.next => 0.2224588154746907  
seedrandom.next => 0.2586260003143882  
math-random2.next => 0.26454004100563644  
xor128.next => 0.11009672866202891

-----------------------
Fastest is xor128.next  
Slowest is seedrandom.next

-----------------------
xor128.next x 118,842,631 ops/sec ±1.37% (89 runs sampled)  
Math.next x 92,857,455 ops/sec ±4.05% (87 runs sampled)  
random.next x 68,987,535 ops/sec ±3.32% (88 runs sampled)  
math-random2.next x 67,032,383 ops/sec ±1.89% (90 runs sampled)  
seedrandom.next x 25,078,173 ops/sec ±2.82% (91 runs sampled)

-----------------------
next
=======================

Math.next => 0.6283046642878405  
random.next => 0.8205406594020812  
seedrandom.next => 0.27937578728293133  
math-random2.next => 0.7893624607376357  
xor128.next => 0.8425724627450109

-----------------------
Fastest is Math.next  
Slowest is seedrandom.next

-----------------------
Math.next x 85,538,112 ops/sec ±1.16% (92 runs sampled)  
xor128.next x 72,660,404 ops/sec ±1.02% (90 runs sampled)  
random.next x 68,754,083 ops/sec ±1.81% (89 runs sampled)  
math-random2.next x 55,946,540 ops/sec ±4.08% (75 runs sampled)  
seedrandom.next x 25,190,725 ops/sec ±1.28% (87 runs sampled)

-----------------------
random
=======================

Math.random => 0.9635547170548808  
random.random => 0.4084337823538815  
seedrandom.random => 0.676167933921435  
math-random2.random => 0.9163634141186785  
xor128.random => 0.7246304880827665

-----------------------
Fastest is random.random  
Slowest is seedrandom.random

-----------------------
random.random x 61,762,316 ops/sec ±2.92% (80 runs sampled)  
Math.random x 61,344,595 ops/sec ±9.50% (65 runs sampled)  
xor128.random x 27,884,965 ops/sec ±3.68% (80 runs sampled)  
math-random2.random x 23,604,146 ops/sec ±3.12% (81 runs sampled)  
seedrandom.random x 14,752,937 ops/sec ±2.36% (83 runs sampled)

-----------------------
float
=======================

Math.float => 0.6112381424864659  
random.float => 0.06785426549701934  
seedrandom.float => 0.5557560482323259  
math-random2.float => 0.36170053055353035  
xor128.float => 0.3669947700109333

-----------------------
Fastest is Math.float  
Slowest is seedrandom.float

-----------------------
Math.float x 77,280,267 ops/sec ±3.45% (84 runs sampled)  
random.float x 4,731,758 ops/sec ±2.90% (81 runs sampled)  
xor128.float x 4,518,270 ops/sec ±3.66% (87 runs sampled)  
math-random2.float x 4,270,942 ops/sec ±2.29% (85 runs sampled)  
seedrandom.float x 3,740,973 ops/sec ±2.57% (88 runs sampled)

-----------------------
int
=======================

Math.int => 72  
random.int => 16  
seedrandom.int => 3  
math-random2.int => 67  
xor128.int => 29

-----------------------
Fastest is Math.int  
Slowest is seedrandom.int

-----------------------
Math.int x 62,986,843 ops/sec ±2.61% (91 runs sampled)  
random.int x 4,553,072 ops/sec ±2.59% (87 runs sampled)  
math-random2.int x 4,136,025 ops/sec ±3.14% (91 runs sampled)  
xor128.int x 3,906,460 ops/sec ±4.78% (84 runs sampled)  
seedrandom.int x 3,496,289 ops/sec ±3.93% (86 runs sampled)

-----------------------
integer
=======================

Math.integer => 67  
random.integer => 99  
seedrandom.integer => 34  
math-random2.integer => 22  
xor128.integer => 42

-----------------------
Fastest is Math.integer  
Slowest is seedrandom.integer

-----------------------
Math.integer x 63,076,141 ops/sec ±2.76% (91 runs sampled)  
random.integer x 4,567,257 ops/sec ±2.28% (93 runs sampled)  
xor128.integer x 4,288,601 ops/sec ±2.42% (87 runs sampled)  
math-random2.integer x 4,007,975 ops/sec ±2.12% (88 runs sampled)  
seedrandom.integer x 3,619,350 ops/sec ±3.49% (91 runs sampled)

-----------------------
boolean
=======================

Math.boolean => false  
random.boolean => false  
seedrandom.boolean => false  
math-random2.boolean => true  
xor128.boolean => true

-----------------------
Fastest is Math.boolean  
Slowest is seedrandom.boolean

-----------------------
Math.boolean x 36,445,545 ops/sec ±5.55% (86 runs sampled)  
random.boolean x 16,432,322 ops/sec ±5.87% (85 runs sampled)  
xor128.boolean x 11,319,050 ops/sec ±1.70% (88 runs sampled)  
math-random2.boolean x 11,181,925 ops/sec ±2.62% (87 runs sampled)  
seedrandom.boolean x 9,537,950 ops/sec ±1.09% (90 runs sampled)

-----------------------
byte
=======================

Math.byte => 28  
random.byte => 122  
seedrandom.byte => 156  
math-random2.byte => 230  
xor128.byte => 86

-----------------------
Fastest is Math.byte  
Slowest is seedrandom.byte

-----------------------
Math.byte x 64,134,782 ops/sec ±0.60% (91 runs sampled)  
random.byte x 19,360,419 ops/sec ±1.87% (88 runs sampled)  
xor128.byte x 14,789,705 ops/sec ±1.48% (94 runs sampled)  
math-random2.byte x 12,806,646 ops/sec ±4.63% (87 runs sampled)  
seedrandom.byte x 10,752,149 ops/sec ±0.59% (94 runs sampled)
