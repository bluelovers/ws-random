/**
 * Created by user on 2018/11/16/016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />
const rng_1 = require("../../src/rng");
const _local_dev_1 = require("../_local-dev");
const src_1 = require("../../src/");
const seedrandomOrigin = require("seedrandom");
const seedrandom_1 = require("../../src/generators/seedrandom");
const req_1 = require("../../src/util/req");
// @ts-ignore
describe(_local_dev_1.relative(__filename), () => {
    let currentTest;
    const r = src_1.default;
    beforeEach(function () {
        currentTest = this.currentTest;
        //console.log('it:before', currentTest.title);
        //console.log('it:before', currentTest.fullTitle());
    });
    // @ts-ignore
    describe(`'hello.' 0.9282578795792454`, () => {
        let seed = 'hello.';
        const expected = 0.9282578795792454;
        const count = 10000;
        let val;
        it(`RNGSeedRandom`, function () {
            _local_dev_1.expect(seedrandom_1.default.create('hello.', null)).is.instanceof(rng_1.default);
        });
        // @ts-ignore
        it(`all seedrandom(seed) should has same value`, function () {
            val = [
                src_1.default.newUse(seedrandomOrigin('hello.')),
                src_1.default.newUse('seedrandom', 'hello.', null),
                src_1.default.newUse(seedrandom_1.default.create('hello.', null))
            ].reduce(function (pre, rnd, idx) {
                let value = rnd.float();
                if (pre !== null) {
                    _local_dev_1.expect(value, idx.toString()).to.deep.eql(pre);
                    _local_dev_1.expect(value, idx.toString()).to.be.closeTo(pre, 0.000001);
                    _local_dev_1.expect(value, idx.toString()).to.be.closeTo(pre + 1 - 1, pre + 1 - 1);
                }
                return value;
            }, expected);
        });
        it(`rnd.float() = ${expected}`, function () {
            _local_dev_1.expect(val).to.deep.eql(expected);
        });
    });
    describe(`test sub seedrandom`, () => {
        const subs = [
            'alea', 'tychei', 'xor128', 'xor4096', 'xorshift7', 'xorwow'
        ];
        const methods = ['quick', 'int32', 'double'];
        subs.forEach(function (libName) {
            it(`RNGSeedRandom.createLib('${libName}', seed, opts)`, () => {
                let seed = 'hello.';
                let opts = null;
                const r = seedrandom_1.default.createLib(libName, seed, opts);
                // @ts-ignore
                const _seedrandom = r._seedrandom;
                let s = _seedrandom(seed, opts);
                //console.log(libName, s.quick(), r.next());
                _local_dev_1.expect(s).to.have.all.keys(methods);
                _local_dev_1.expect(r.next()).to.not.be.NaN;
                _local_dev_1.expect(r.next()).to.float.gt(0).lt(1);
                _local_dev_1.expect(_seedrandom).to.deep.equal(req_1.tryRequire('seedrandom')[libName]);
                _local_dev_1.expect(_seedrandom).is.function();
            });
        });
        subs.forEach(function (libName) {
            it(`random.newUse('seedrandom', seed, opts, '${libName}')`, () => {
                let seed = 'hello.';
                let opts = null;
                const r = src_1.default.newUse('seedrandom', seed, opts, libName);
                // @ts-ignore
                const _seedrandom = r.rng._seedrandom;
                let s = _seedrandom(seed, opts);
                //console.log(libName, s.quick(), r.next());
                _local_dev_1.expect(s).to.have.all.keys(methods);
                _local_dev_1.expect(r.next()).to.not.be.NaN;
                _local_dev_1.expect(r.next()).to.float.gt(0).lt(1);
                _local_dev_1.expect(_seedrandom).to.deep.equal(req_1.tryRequire('seedrandom')[libName]);
                _local_dev_1.expect(_seedrandom).is.function();
            });
        });
    });
});
