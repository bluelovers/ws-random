/**
 * Created by user on 2018/10/22/022.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../src/util");
const _1 = require("./");
const debug_color2_1 = require("debug-color2");
const simple_wrap_1 = require("../../src/simple-wrap");
const methods = [
    'next',
];
methods.unshift(methods[0]);
const tests = Object.assign({}, _1.default);
// @ts-ignore
tests.Math2 = {
    next: util_1._MathRandom,
};
methods
    .forEach(function (method, index) {
    const argv = simple_wrap_1.defaultArgv[method] || [];
    const suite = (new _1.Benchmark.Suite);
    debug_color2_1.default.grey(`\n-----------------------`);
    debug_color2_1.default.log(method, `(${argv.join(', ')})`);
    debug_color2_1.default.grey(`=======================\n`);
    Object.keys(tests)
        .forEach(function (name) {
        const rng = tests[name];
        if (typeof rng[method] !== 'undefined') {
            suite.add(`${name}.${method} ${index}`, function () {
                rng[method](...argv);
            });
            rng[method](...argv);
            //console.debug(`${name}.${method} => ${rng[method](...argv)}`, '  ');
        }
        else {
            debug_color2_1.default.debug(`skip: ${name}.${method} => is undefined`, '  ');
        }
    });
    debug_color2_1.default.grey(`\n-----------------------`);
    suite
        .on('cycle', function (event) {
        //				console.info(String(event.target));
    })
        .on('complete', function () {
        let ls = _1.sortBenchmarkResult(this);
        debug_color2_1.default.ok('Fastest is ' + this.filter('fastest').map('name'), '  ');
        debug_color2_1.default.ok('Slowest is ' + this.filter('slowest').map('name'), '  ');
        debug_color2_1.default.grey(`\n-----------------------`);
        ls.forEach(function (v, i) {
            debug_color2_1.default.log(i, _1.formatBenchmarkResult(v), '  ');
        });
    })
        .run();
});
