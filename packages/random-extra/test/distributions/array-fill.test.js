/**
 * Created by user on 2018/11/16/016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _local_dev_1 = require("../_local-dev");
const __1 = require("../..");
// @ts-ignore
describe(_local_dev_1.relative(__filename), () => {
    let currentTest;
    const r = __1.default;
    beforeEach(function () {
        currentTest = this.currentTest;
        //console.log('it:before', currentTest.title);
        //console.log('it:before', currentTest.fullTitle());
    });
    // @ts-ignore
    describe(`byte`, () => {
        const fn = __1.default.dfArrayFill();
        const tests = [
            ['Array', new Array(10)],
            ['Uint8Array', new Uint8Array(10)],
            ['Buffer', Buffer.alloc(10)],
        ];
        tests.forEach(function (arr) {
            it(`${arr[0]}`, function () {
                // @ts-ignore
                let ret = fn(arr[1]);
                _local_dev_1.expect(ret).have.lengthOf(10);
            });
        });
    });
});
