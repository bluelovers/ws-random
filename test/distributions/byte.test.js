/**
 * Created by user on 2018/11/16/016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
    describe(`byte`, () => {
        it(`random.byte(): number`, function () {
            let ret = random_1.random.byte();
            _local_dev_1.expect(ret).is.integer
                .gte(0)
                .lte(255);
        });
        it(`random.byte(toStr = true): string`, function () {
            let ret = random_1.random.byte(true);
            _local_dev_1.expect(ret)
                //.is.a('string')
                .is.string
                .lengthOf(2);
        });
    });
    describe(`bytes`, () => {
        it(`random.bytes(): number[]`, function () {
            let ret = random_1.random.bytes();
            _local_dev_1.expect(ret).is.array
                .lengthOf.gte(1);
            for (let i in ret) {
                _local_dev_1.expect(ret[i]).is.integer
                    .gte(0)
                    .lte(255);
            }
        });
        it(`random.bytes(size = 5): number[]`, function () {
            let ret = random_1.random.bytes(5);
            _local_dev_1.expect(ret).is.array
                .lengthOf(5);
            for (let i in ret) {
                _local_dev_1.expect(ret[i]).is.integer
                    .gte(0)
                    .lte(255);
            }
        });
        it(`random.bytes(size = 5, toStr = true): string[]`, function () {
            let ret = random_1.random.bytes(5, true);
            _local_dev_1.expect(ret).is.array
                .lengthOf(5);
            for (let i in ret) {
                _local_dev_1.expect(ret[i]).is.string
                    .lengthOf(2);
            }
        });
    });
});
