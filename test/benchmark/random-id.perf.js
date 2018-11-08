/**
 * Created by user on 2018/11/9/009.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid = require("nanoid");
const shortid = require("shortid");
const _1 = require("./");
const debug_color2_1 = require("debug-color2");
const suite = (new _1.Benchmark.Suite);
shortid();
nanoid();
const random_charID = _1.default.random.charID();
const seedrandom_charID = _1.default.seedrandom.charID();
const math_random2_charID = _1.default['math-random2'].charID();
const xor128_charID = _1.default.xor128.charID();
suite
    .add(`shortid`, shortid)
    .add(`nanoid`, nanoid)
    .add(`random.charID`, random_charID)
    .add(`seedrandom.charID`, seedrandom_charID)
    .add(`math-random2.charID`, math_random2_charID)
    .add(`xor128.charID`, xor128_charID)
    .on('cycle', function (event) {
    //console.info(String(event.target));
})
    .on('complete', function () {
    let ls = _1.sortBenchmarkResult(this);
    debug_color2_1.default.ok('Fastest is ' + this.filter('fastest').map('name'), '  ');
    debug_color2_1.default.ok('Slowest is ' + this.filter('slowest').map('name'), '  ');
    debug_color2_1.default.grey(`\n-----------------------`);
    ls.forEach(function (v) {
        debug_color2_1.default.log(_1.formatBenchmarkResult(v), '  ');
    });
})
    .run();
