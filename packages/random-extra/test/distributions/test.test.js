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
    it(`make sure test lib is support float check`, function () {
        _local_dev_1.expect(0.9).to.float.not.eql(0.8);
        _local_dev_1.expect(0.999).to.float.not.eql(0.998);
        _local_dev_1.expect(0.999).to.float.eql(0.999);
        _local_dev_1.expect(0.9).to.float.eql(0.9);
        _local_dev_1.expect(0.9282578795792454).to.float.not.deep.eql(0.9282578795792454 + 2 - 1 - 1);
        _local_dev_1.expect(0.9282578795792454).to.float.not.deep.eql(0.9282578795792453);
        _local_dev_1.expect(function () {
            _local_dev_1.expect(1).to.float;
        }).throw();
        _local_dev_1.expect(function () {
            _local_dev_1.expect(0.9).to.integer;
        }).throw();
    });
    it(`make sure test lib is support length check`, function () {
        let a = [1, 2, 3];
        _local_dev_1.expect(a).length(3);
        _local_dev_1.expect(a).length.gte(3);
        _local_dev_1.expect(() => {
            _local_dev_1.expect(a).length.gt(3);
        }).throw();
        _local_dev_1.expect('abc').length(3);
        _local_dev_1.expect('abc').string.lengthOf(3);
        _local_dev_1.expect('abc').string('abc').lengthOf(3);
        _local_dev_1.expect(() => {
            _local_dev_1.expect(a).length.not.gte(3);
        }).throw();
    });
    // @ts-ignore
    describe(`dfArrayUnique`, () => {
        const count = 10000;
        // @ts-ignore
        it(`dfArrayUnique`, function () {
            let arr = [1, 2, 3, 4];
            const d = r.dfArrayUnique(arr, 3, true);
            let cache = {};
            for (let i = 0; i < count; ++i) {
                const v = d();
                cache[v] = v;
            }
            Object.values(cache)
                .forEach(function (v) {
                _local_dev_1.expect(v).to.be.oneOf(arr);
            });
        });
        it(`return another when out of limit`, function () {
            let arr = [1, 2, 3, 4];
            let limit = 3;
            let arr2 = [7, 8, 9];
            const d = __1.default.dfArrayUnique(arr, limit, true, null, function () {
                return arr2;
            });
            let cache = {};
            let cache2 = {};
            for (let i = 0; i < 10000; ++i) {
                const v = d();
                if (i >= limit) {
                    cache2[v] = v;
                }
                else {
                    cache[v] = v;
                }
            }
            Object.values(cache)
                .forEach(function (v) {
                _local_dev_1.expect(v).to.be.oneOf(arr);
                _local_dev_1.expect(v).to.not.oneOf(arr2);
            });
            Object.values(cache2)
                .forEach(function (v) {
                _local_dev_1.expect(v).to.be.oneOf(arr2);
                _local_dev_1.expect(v).to.not.oneOf(arr);
            });
        });
    });
});
