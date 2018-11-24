/**
 * Created by user on 2018/11/16/016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />
const _local_dev_1 = require("../_local-dev");
const random_1 = require("../../lib/random");
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
    describe(`import`, () => {
        it(`import default`, function () {
            let r = require('../..').default;
            _local_dev_1.expect(r).is.instanceof((random_1.Random));
            _local_dev_1.expect(r).to.deep.equal(random_1.random);
        });
        it(`require`, function () {
            let r = require('../..');
            _local_dev_1.expect(r).is.instanceof((random_1.Random));
            _local_dev_1.expect(r).to.deep.equal(random_1.random);
        });
        it(`random = random.default`, function () {
            let r = require('../..');
            _local_dev_1.expect(r.default).is.instanceof((random_1.Random));
            _local_dev_1.expect(r.default).to.deep.equal(random_1.random);
        });
    });
});
