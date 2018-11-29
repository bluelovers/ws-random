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
    describe(`import`, () => {
        it(`import default`, function () {
            let r = require('../..').default;
            _local_dev_1.expect(r).is.instanceof((__1.Random));
            _local_dev_1.expect(r).to.deep.equal(__1.default);
        });
        it(`require`, function () {
            let r = require('../..');
            _local_dev_1.expect(r).is.instanceof((__1.Random));
            _local_dev_1.expect(r).to.deep.equal(__1.default);
        });
        it(`random = random.default`, function () {
            let r = require('../..');
            _local_dev_1.expect(r.default).is.instanceof((__1.Random));
            _local_dev_1.expect(r.default).to.deep.equal(__1.default);
        });
    });
});
