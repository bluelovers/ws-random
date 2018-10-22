Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const seedrandom_1 = require("../../preset/seedrandom");
const simple_wrap_1 = require("../../src/simple-wrap");
const util_1 = require("../../src/util");
const Benchmark = require("benchmark");
exports.Benchmark = Benchmark;
const crypto = require("crypto");
const cryptorandom = require("math-random");
exports.tests = {
    Math: simple_wrap_1.simpleWrap(util_1._MathRandom),
    random: __1.default,
    seedrandom: seedrandom_1.default,
    'math-random2': __1.default.newUse('math-random2'),
    'xor128': __1.default.newUse('xor128'),
    cryptorandom: simple_wrap_1.simpleWrap(cryptorandom),
    cryptorandom2: simple_wrap_1.simpleWrap(cryptorandom2),
};
function getMethods(random) {
    return Object
        .getOwnPropertyNames(Object.getPrototypeOf(random))
        .filter(function (v) {
        return ![
            'constructor',
            'rng',
            'clone',
            'use',
            'newUse',
            'cloneUse',
            'patch',
            'unpatch',
            '_memoize',
            'reset',
            '_rng',
            '_cache',
        ].includes(v);
    });
}
exports.getMethods = getMethods;
function sortBenchmarkResult(ls) {
    return ls.filter('successful')
        .sort(function (a, b) {
        a = a.stats;
        b = b.stats;
        return (a.mean + a.moe > b.mean + b.moe ? 1 : -1);
    });
}
exports.sortBenchmarkResult = sortBenchmarkResult;
function formatBenchmarkResult(v) {
    const pm = '\xb1';
    let result = v.name;
    let hz = v.hz;
    let size = v.stats.sample.length;
    let stats = v.stats;
    result += ' x ' + Benchmark.formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec ' + pm +
        stats.rme.toFixed(2) + '% (' + size + ' run' + (size == 1 ? '' : 's') + ' sampled)';
    return result;
}
exports.formatBenchmarkResult = formatBenchmarkResult;
const MATH_POW_2_32 = Math.pow(2, 32);
function cryptorandom2() {
    let buf = crypto
        .randomBytes(4)
        .readUInt32BE(0);
    return buf / MATH_POW_2_32;
}
exports.default = exports.tests;
