/**
 * Created by user on 2018/11/22/022.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />
const util_1 = require("../src/util");
const _local_dev_1 = require("./_local-dev");
// @ts-ignore
describe(_local_dev_1.relative(__filename), () => {
    let currentTest;
    beforeEach(function () {
        currentTest = this.currentTest;
        //console.log('it:before', currentTest.title);
        //console.log('it:before', currentTest.fullTitle());
    });
    // @ts-ignore
    describe(`isInt`, () => {
        let tests = {
            true: [
                0,
                1,
                -100000,
                2147483647,
                -2147483647,
            ],
            false: [
                0.1,
                Math.PI,
                NaN,
                Infinity,
                -Infinity,
                '10',
                true,
                false,
                [1],
            ],
        };
        Object.entries(tests)
            .forEach(function ([type, list]) {
            list.forEach(function (n) {
                let actual = util_1.isInt(n);
                let fn = _local_dev_1.expect(actual);
                if (type != 'true') {
                    fn = fn.not;
                }
                it(`${JSON.stringify(n)} => ${type}`, function () {
                    fn.ok;
                });
            });
        });
    });
});
