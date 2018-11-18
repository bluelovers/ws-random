/**
 * Created by user on 2018/11/16/016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />
const _local_dev_1 = require("../_local-dev");
const random_1 = require("../../src/random");
// @ts-ignore
describe(_local_dev_1.relative(__filename), () => {
    let currentTest;
    const r = random_1.random;
    beforeEach(function () {
        currentTest = this.currentTest;
        //console.log('it:before', currentTest.title);
        //console.log('it:before', currentTest.fullTitle());
    });
    // @ts-ignore
    describe(`random number list by expected sum`, () => {
        it(`dfSumInt(3)`, function () {
            const size = 3;
            const expected_sum = 6;
            const d = random_1.random.dfSumInt(size);
            let cache = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                cache[String(v)] = v;
            }
            const vs = Object.values(cache);
            vs
                .forEach(function (v) {
                const sum = v.reduce((a, b) => a + b);
                _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                _local_dev_1.expect(v).length(size);
            });
        });
        it(`dfSumInt(3, sum = 21)`, function () {
            const size = 3;
            const expected_sum = 21;
            const d = random_1.random.dfSumInt(size, expected_sum);
            let cache = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                cache[String(v)] = v;
            }
            const vs = Object.values(cache);
            vs
                .forEach(function (v) {
                const sum = v.reduce((a, b) => a + b);
                _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                _local_dev_1.expect(v).length(size);
            });
        });
        it(`dfSumInt(3, sum = -21)`, function () {
            const size = 3;
            const expected_sum = -21;
            const d = random_1.random.dfSumInt(size, expected_sum);
            let cache = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                cache[String(v)] = v;
            }
            const vs = Object.values(cache);
            //console.log(vs);
            vs
                .forEach(function (v) {
                const sum = v.reduce((a, b) => a + b);
                _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                _local_dev_1.expect(v).length(size);
            });
        });
        it(`dfSumInt(3, null, 1, 6)`, function () {
            const size = 3;
            const expected_sum = 6;
            const min = 1;
            const max = 6;
            const evs = [1, 2, 3];
            const d = random_1.random.dfSumInt(size, null, min, max);
            let cache = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                cache[String(v)] = v;
            }
            const vs = Object.values(cache);
            vs
                .forEach(function (v) {
                const sum = v.reduce((a, b) => a + b);
                _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                _local_dev_1.expect(v).to.have.members(evs);
                _local_dev_1.expect(v).length(size);
            });
        });
        it(`dfSumInt(3, null, 0, 6)`, function () {
            const size = 3;
            const expected_sum = 6;
            const min = 0;
            const max = 6;
            const d = random_1.random.dfSumInt(size, null, min, max);
            let cache = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                cache[String(v)] = v;
            }
            const vs = Object.values(cache);
            vs
                .forEach(function (v) {
                const sum = v.reduce((a, b) => a + b);
                _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                _local_dev_1.expect(v).length(size);
            });
        });
        it(`dfSumFloat(3)`, function () {
            const size = 3;
            const min = 1;
            const max = 6;
            const expected_sum = 6;
            const d = random_1.random.dfSumFloat(size);
            let cache = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                cache[String(v)] = v;
            }
            const vs = Object.values(cache);
            vs
                .forEach(function (v) {
                const sum = v.reduce((a, b) => a + b);
                _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                _local_dev_1.expect(v).length(size);
            });
        });
        it(`dfSumFloat(3, sum = 21)`, function () {
            const size = 3;
            const min = 1;
            const max = 6;
            const expected_sum = 21;
            const d = random_1.random.dfSumFloat(size, expected_sum);
            let cache = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                cache[String(v)] = v;
            }
            const vs = Object.values(cache);
            vs
                .forEach(function (v) {
                const sum = v.reduce((a, b) => a + b);
                _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                _local_dev_1.expect(v).length(size);
            });
        });
        0 && it(`dfSumFloat(3, sum = -21)`, function () {
            const size = 3;
            const expected_sum = -21;
            const d = random_1.random.dfSumFloat(size, expected_sum);
            let cache = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                cache[String(v)] = v;
            }
            const vs = Object.values(cache);
            vs
                .forEach(function (v) {
                const sum = v.reduce((a, b) => a + b);
                _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                _local_dev_1.expect(v).length(size);
            });
        });
        it(`dfSumFloat(3, null, 1, 6)`, function () {
            const size = 3;
            const min = 1;
            const max = 6;
            const expected_sum = 6;
            const d = random_1.random.dfSumFloat(size, null, min, max);
            let cache = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                cache[String(v)] = v;
            }
            const vs = Object.values(cache);
            vs
                .forEach(function (v) {
                const sum = v.reduce((a, b) => a + b);
                _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                _local_dev_1.expect(v).length(size);
            });
        });
    });
});
