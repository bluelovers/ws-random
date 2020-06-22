/**
 * Created by user on 2018/11/16/016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />
const _local_dev_1 = require("../_local-dev");
const __1 = require("../..");
const benchmark_1 = require("../benchmark");
// @ts-ignore
describe(_local_dev_1.relative(__filename), () => {
    let currentTest;
    const r = __1.default;
    beforeEach(function () {
        currentTest = this.currentTest;
        //console.log('it:before', currentTest.title);
        //console.log('it:before', currentTest.fullTitle());
    });
    const methods_int = {
        int: [0, 100],
        integer: [0, 100],
        byte: [0, 255],
    };
    const methods_float = {
        srand: [0, 1],
        srandom: [0, 1],
        rand: [0, 1],
        random: [0, 1],
        next: [0, 1],
        float: [0, 1],
    };
    [
        methods_int,
        methods_float,
    ].forEach(function (current_methods) {
        describe(current_methods === methods_int ? `int` : `float`, () => {
            Object.keys(current_methods)
                .forEach(function (method) {
                describe(method, () => {
                    [
                        'random',
                        'seedrandom',
                        'xor128',
                        'math-random2',
                    ].forEach(function (name) {
                        it(`${name}.${method}() in [ ${current_methods[method].join(', ')} ]`, () => {
                            let max = current_methods[method][0], min = current_methods[method][1], a;
                            let lib = benchmark_1.tests[name];
                            for (let i = 0; i < 10000; ++i) {
                                const v = lib[method]();
                                max = Math.max(v, max);
                                min = Math.min(v, min);
                                if (v !== 1 && v !== max && v !== min) {
                                    a = v;
                                }
                            }
                            _local_dev_1.expect(min).to.gte(current_methods[method][0]);
                            _local_dev_1.expect(max).to.lte(current_methods[method][1]);
                            if (current_methods === methods_float) {
                                _local_dev_1.expect(a).to
                                    .lt(current_methods[method][1])
                                    .gt(current_methods[method][0]);
                                _local_dev_1.expect(min).to.gt(0).lt(0.001);
                                _local_dev_1.expect(max).to.gte(0.9).lt(1);
                            }
                            else if (current_methods === methods_int) {
                                _local_dev_1.expect(min).to.deep.eq(current_methods[method][0]);
                                _local_dev_1.expect(max).to.deep.eq(current_methods[method][1]);
                                if (current_methods[method][1] > 1) {
                                    _local_dev_1.expect(a).to
                                        .lt(current_methods[method][1])
                                        .gt(current_methods[method][0])
                                        .gt(1);
                                }
                            }
                        });
                    });
                });
            });
        });
    });
});
