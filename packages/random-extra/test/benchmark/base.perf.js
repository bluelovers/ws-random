/**
 * Created by user on 2018/10/22/022.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const debug_color2_1 = require("debug-color2");
const simple_wrap_1 = require("../../src/simple-wrap");
const methods = Object.keys(_1.default.Math)
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
        'seed',
    ].includes(v);
});
methods.unshift(methods[0]);
methods
    .forEach(function (method) {
    const argv = simple_wrap_1.defaultArgv[method] || [];
    const suite = (new _1.Benchmark.Suite);
    debug_color2_1.default.grey(`\n-----------------------`);
    debug_color2_1.default.log(method, `(${argv.join(', ')})`);
    debug_color2_1.default.grey(`=======================\n`);
    Object.keys(_1.default)
        .forEach(function (name) {
        const rng = _1.default[name];
        if (typeof rng[method] !== 'undefined') {
            rng[method](...argv);
            suite.add(`${name}.${method}`, function () {
                rng[method](...argv);
            });
            debug_color2_1.default.debug(`${name}.${method} => ${rng[method](...argv)}`, '  ');
        }
        else {
            debug_color2_1.default.debug(`skip: ${name}.${method} => is undefined`, '  ');
        }
    });
    debug_color2_1.default.grey(`\n-----------------------`);
    suite
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
});
