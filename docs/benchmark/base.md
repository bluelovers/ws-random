# benchmark

[index.ts](../../test/benchmark/index.ts)

-----------------------
next ()
=======================

Math.next => 0.26052197461146376  
random.next => 0.2551746875425709  
seedrandom.next => 0.3497525301686901  
math-random2.next => 0.964546200556923  
xor128.next => 0.2691157041117549  
cryptorandom.next => 0.463811659719795  
cryptorandom2.next => 0.005775196943432093  
randomOrigin.next => 0.6448731477593757

-----------------------
Fastest is xor128.next  
Slowest is cryptorandom.next

-----------------------
xor128.next x 55,551,513 ops/sec ±4.53% (83 runs sampled)  
randomOrigin.next x 51,575,728 ops/sec ±2.08% (86 runs sampled)  
math-random2.next x 46,713,632 ops/sec ±1.76% (89 runs sampled)  
random.next x 46,412,573 ops/sec ±5.00% (86 runs sampled)  
Math.next x 32,576,279 ops/sec ±4.18% (84 runs sampled)  
seedrandom.next x 19,331,660 ops/sec ±4.71% (86 runs sampled)  
cryptorandom2.next x 443,949 ops/sec ±2.14% (82 runs sampled)  
cryptorandom.next x 371,586 ops/sec ±2.28% (83 runs sampled)

-----------------------
next ()
=======================

Math.next => 0.29925593244181226  
random.next => 0.11563044267321865  
seedrandom.next => 0.6599628813243227  
math-random2.next => 0.5750825665738226  
xor128.next => 0.7809274243190885  
cryptorandom.next => 0.2936411816626787  
cryptorandom2.next => 0.17776839807629585  
randomOrigin.next => 0.12687977234529524

-----------------------
Fastest is random.next  
Slowest is cryptorandom.next

-----------------------
random.next x 48,242,854 ops/sec ±1.32% (88 runs sampled)  
math-random2.next x 45,929,911 ops/sec ±1.74% (86 runs sampled)  
xor128.next x 39,945,938 ops/sec ±2.44% (83 runs sampled)  
randomOrigin.next x 37,534,459 ops/sec ±5.92% (83 runs sampled)  
Math.next x 32,823,865 ops/sec ±1.78% (84 runs sampled)  
seedrandom.next x 19,763,353 ops/sec ±2.33% (88 runs sampled)  
cryptorandom2.next x 458,903 ops/sec ±3.87% (83 runs sampled)  
cryptorandom.next x 384,197 ops/sec ±1.81% (87 runs sampled)

-----------------------
random ()
=======================

Math.random => 0.19167607989343582  
random.random => 0.7290764204846203  
seedrandom.random => 0.6973001613088098  
math-random2.random => 0.5244864208963071  
xor128.random => 0.9882513587363064  
cryptorandom.random => 0.18677345337346196  
cryptorandom2.random => 0.2548170902300626  
randomOrigin.random => is undefined

-----------------------
Fastest is random.random  
Slowest is cryptorandom.random

-----------------------
random.random x 46,142,036 ops/sec ±3.92% (85 runs sampled)  
Math.random x 25,236,824 ops/sec ±4.11% (85 runs sampled)  
xor128.random x 20,108,274 ops/sec ±2.72% (85 runs sampled)  
math-random2.random x 19,015,602 ops/sec ±4.20% (81 runs sampled)  
seedrandom.random x 12,649,081 ops/sec ±3.80% (84 runs sampled)  
cryptorandom2.random x 444,804 ops/sec ±3.01% (83 runs sampled)  
cryptorandom.random x 378,734 ops/sec ±1.93% (86 runs sampled)

-----------------------
float ()
=======================

Math.float => 0.8374224534491108  
random.float => 0.16074333727716605  
seedrandom.float => 0.7320365827421329  
math-random2.float => 0.6107432816590257  
xor128.float => 0.16822982882149518  
cryptorandom.float => 1.2823560438118875  
cryptorandom2.float => 1.1298547144979239  
randomOrigin.float => 0.67075708131348

-----------------------
Fastest is Math.float  
Slowest is cryptorandom.float

-----------------------
Math.float x 24,462,182 ops/sec ±2.24% (88 runs sampled)  
randomOrigin.float x 4,793,903 ops/sec ±2.45% (92 runs sampled)  
random.float x 4,320,993 ops/sec ±1.37% (86 runs sampled)  
math-random2.float x 3,651,319 ops/sec ±1.87% (82 runs sampled)  
xor128.float x 3,646,169 ops/sec ±6.06% (81 runs sampled)  
seedrandom.float x 3,284,206 ops/sec ±1.56% (88 runs sampled)  
cryptorandom2.float x 492,069 ops/sec ±1.77% (88 runs sampled)  
cryptorandom.float x 402,579 ops/sec ±2.45% (88 runs sampled)

-----------------------
int (0, 100)
=======================

Math.int => 8  
random.int => 88  
seedrandom.int => 15  
math-random2.int => 86  
xor128.int => 92  
cryptorandom.int => 22  
cryptorandom2.int => 54  
randomOrigin.int => 44

-----------------------
Fastest is Math.int  
Slowest is cryptorandom.int

-----------------------
Math.int x 5,072,948 ops/sec ±2.76% (89 runs sampled)  
randomOrigin.int x 2,190,479 ops/sec ±1.17% (87 runs sampled)  
math-random2.int x 2,124,001 ops/sec ±1.97% (93 runs sampled)  
random.int x 2,094,328 ops/sec ±2.16% (88 runs sampled)  
xor128.int x 2,048,942 ops/sec ±1.87% (87 runs sampled)  
seedrandom.int x 1,739,397 ops/sec ±5.46% (82 runs sampled)  
cryptorandom2.int x 414,394 ops/sec ±1.56% (87 runs sampled)  
cryptorandom.int x 360,655 ops/sec ±2.74% (84 runs sampled)

-----------------------
integer (0, 100)
=======================

Math.integer => 18  
random.integer => 68  
seedrandom.integer => 75  
math-random2.integer => 68  
xor128.integer => 41  
cryptorandom.integer => 13  
cryptorandom2.integer => 41  
randomOrigin.integer => 25

-----------------------
Fastest is Math.integer  
Slowest is cryptorandom.integer

-----------------------
Math.integer x 4,538,163 ops/sec ±3.76% (82 runs sampled)  
randomOrigin.integer x 2,203,464 ops/sec ±1.81% (85 runs sampled)  
xor128.integer x 2,079,234 ops/sec ±2.63% (88 runs sampled)  
random.integer x 2,058,360 ops/sec ±3.27% (84 runs sampled)  
seedrandom.integer x 1,993,627 ops/sec ±0.90% (91 runs sampled)  
math-random2.integer x 1,994,918 ops/sec ±1.97% (88 runs sampled)  
cryptorandom2.integer x 411,209 ops/sec ±3.11% (86 runs sampled)  
cryptorandom.integer x 356,141 ops/sec ±2.62% (86 runs sampled)

-----------------------
boolean (0.5)
=======================

Math.boolean => true  
random.boolean => false  
seedrandom.boolean => true  
math-random2.boolean => true  
xor128.boolean => true  
cryptorandom.boolean => false  
cryptorandom2.boolean => false  
randomOrigin.boolean => false

-----------------------
Fastest is Math.boolean  
Slowest is cryptorandom.boolean

-----------------------
Math.boolean x 5,959,002 ops/sec ±2.65% (90 runs sampled)  
randomOrigin.boolean x 4,515,292 ops/sec ±2.67% (82 runs sampled)  
random.boolean x 3,915,362 ops/sec ±2.42% (87 runs sampled)  
xor128.boolean x 3,748,699 ops/sec ±2.37% (89 runs sampled)  
math-random2.boolean x 3,596,912 ops/sec ±3.70% (85 runs sampled)  
seedrandom.boolean x 3,242,781 ops/sec ±3.76% (88 runs sampled)  
cryptorandom2.boolean x 401,943 ops/sec ±1.77% (85 runs sampled)  
cryptorandom.boolean x 372,793 ops/sec ±1.97% (88 runs sampled)

-----------------------
byte ()
=======================

Math.byte => 108  
random.byte => 243  
seedrandom.byte => 78  
math-random2.byte => 52  
xor128.byte => 175  
cryptorandom.byte => 52  
cryptorandom2.byte => 232  
randomOrigin.byte => is undefined

-----------------------
Fastest is Math.byte  
Slowest is cryptorandom.byte

-----------------------
Math.byte x 18,515,895 ops/sec ±1.64% (87 runs sampled)  
random.byte x 10,497,985 ops/sec ±1.26% (88 runs sampled)  
math-random2.byte x 8,455,877 ops/sec ±1.79% (85 runs sampled)  
xor128.byte x 8,470,179 ops/sec ±4.03% (88 runs sampled)  
seedrandom.byte x 7,110,991 ops/sec ±2.13% (85 runs sampled)  
cryptorandom2.byte x 460,678 ops/sec ±2.93% (87 runs sampled)  
cryptorandom.byte x 370,894 ops/sec ±3.32% (83 runs sampled)

-----------------------
bytes (1)
=======================

Math.bytes => 16  
random.bytes => 117  
seedrandom.bytes => 194  
math-random2.bytes => 200  
xor128.bytes => 54  
cryptorandom.bytes => 83  
cryptorandom2.bytes => 110  
randomOrigin.bytes => is undefined

-----------------------
Fastest is Math.bytes  
Slowest is cryptorandom.bytes

-----------------------
Math.bytes x 4,458,003 ops/sec ±3.24% (87 runs sampled)  
xor128.bytes x 3,405,323 ops/sec ±1.69% (87 runs sampled)  
math-random2.bytes x 3,364,074 ops/sec ±1.37% (87 runs sampled)  
random.bytes x 3,414,018 ops/sec ±3.14% (86 runs sampled)  
seedrandom.bytes x 2,995,836 ops/sec ±2.77% (85 runs sampled)  
cryptorandom2.bytes x 412,169 ops/sec ±2.78% (87 runs sampled)  
cryptorandom.bytes x 343,159 ops/sec ±1.99% (85 runs sampled)

-----------------------
seed ()
=======================

Math.seed => [object Object]  
random.seed => [object math-random2]  
seedrandom.seed => [object seedrandom]  
math-random2.seed => [object math-random2]  
xor128.seed => [object xor128]  
cryptorandom.seed => [object Object]  
cryptorandom2.seed => [object Object]  
randomOrigin.seed => is undefined

-----------------------
Fastest is Math.seed  
Slowest is seedrandom.seed

-----------------------
Math.seed x 55,020,609 ops/sec ±2.84% (92 runs sampled)  
random.seed x 48,494,801 ops/sec ±5.45% (83 runs sampled)  
cryptorandom2.seed x 37,461,676 ops/sec ±5.13% (85 runs sampled)  
cryptorandom.seed x 34,870,456 ops/sec ±5.77% (79 runs sampled)  
math-random2.seed x 3,176,313 ops/sec ±5.16% (81 runs sampled)  
xor128.seed x 1,919,494 ops/sec ±2.89% (91 runs sampled)  
seedrandom.seed x 37,185 ops/sec ±5.02% (82 runs sampled)

