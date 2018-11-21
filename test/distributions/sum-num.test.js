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
    describe(`random integer number list by expected sum`, () => {
        _createTest(3, 6);
        _createTest(3, 21);
        _createTest(3, -21);
        _createTest(3, null, 1, 6, 6);
        _createTest(3, null, 0, 6, 6);
        _createTest(2, 5);
        _createTest(6, 13, -8, 15);
        _createTest(6, -13, -8, 15);
        _createTest(6, 0, -8, 15);
        _createTest(6, -14, -13, 15);
        function _createTest(size, sum, min, max, expected_sum) {
            expected_sum = typeof expected_sum === 'number' ? expected_sum : sum;
            it(`dfSumInt(${size}, ${sum}, ${min}, ${max}) => ${typeof expected_sum === 'number' ? expected_sum : 'unknow'}`, function () {
                const d = random_1.random.dfSumInt(size, sum, min, max);
                let cache = {};
                for (let i = 0; i < 10000; ++i) {
                    const v = d();
                    cache[String(v)] = v;
                    break;
                }
                const vs = Object.values(cache);
                vs
                    .forEach(function (v) {
                    //console.log(v, sum);
                    if (typeof expected_sum === 'number') {
                        const sum = v.reduce((a, b) => a + b);
                        _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                    }
                    _local_dev_1.expect(v).array.lengthOf(size);
                });
                _local_dev_1.expect(vs).array
                    .lengthOf.gt(0);
            });
        }
    });
    describe(`random float number list by expected sum`, () => {
        _createTest(3, undefined, undefined, undefined, 1);
        _createTest(3, 21);
        _createTest(3, -21);
        _createTest(3, null, 1, 6, 8);
        _createTest(3, null, -6, -1, -13);
        _createTest(3, 10, 1, 10);
        _createTest(3, null, 1, 10, 12);
        _createTest(3, 0, -5, 10);
        _createTest(3, -10, -5, 10);
        function _createTest(size, sum, min, max, expected_sum) {
            expected_sum = typeof expected_sum === 'number' ? expected_sum : sum;
            it(`dfSumFloat(${size}, ${sum}, ${min}, ${max}) => ${typeof expected_sum === 'number' ? expected_sum : 'unknow'}`, function () {
                const d = random_1.random.dfSumFloat(size, sum, min, max);
                let cache = {};
                for (let i = 0; i < 10000; ++i) {
                    const v = d();
                    cache[String(v)] = v;
                    break;
                }
                const vs = Object.values(cache);
                vs
                    .forEach(function (v) {
                    //console.log(v, sum);
                    if (typeof expected_sum === 'number') {
                        const sum = v.reduce((a, b) => a + b);
                        _local_dev_1.expect(sum).closeTo(expected_sum, 0.01);
                    }
                    _local_dev_1.expect(v).array.lengthOf(size);
                });
                _local_dev_1.expect(vs).array
                    .lengthOf.gt(0);
            });
        }
    });
});
