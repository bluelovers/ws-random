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
    describe(`core-decorators<@autobind>`, () => {
        [
            'next',
            'random',
        ].forEach((method) => {
            it(`.${method}`, function () {
                let fn = __1.default[method];
                _local_dev_1.expect(fn).is.an.function();
                _local_dev_1.expect(fn).to.deep.equal(__1.default[method]);
                _local_dev_1.expect(fn()).is.an.number();
            });
        });
        it(`.seed`, function () {
            let fn = __1.default.seed;
            _local_dev_1.expect(fn).is.an.function();
            _local_dev_1.expect(fn).to.deep.equal(__1.default.seed);
            _local_dev_1.expect(fn()).is.deep.equal(__1.default);
        });
    });
});
