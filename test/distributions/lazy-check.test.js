/**
 * Created by user on 2018/11/16/016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />
const util_1 = require("../../src/util");
const _local_dev_1 = require("../_local-dev");
const __1 = require("../../");
function getDefaultArgv(method) {
    let argv = [];
    let dfArgv = [];
    switch (method) {
        case 'arrayIndex':
        case 'arrayItem':
        case 'arrayShuffle':
        case 'arrayUnique':
        case 'dfArrayIndex':
        case 'dfArrayItem':
        case 'dfArrayShuffle':
        case 'dfArrayUnique':
            argv = [[11, 22, 33, 44, 55]];
            dfArgv = argv.slice();
            break;
        case 'itemByWeight':
        case 'dfItemByWeight':
            argv = [[1, 2, 1, 3, 3, 4, 1.5]];
            break;
        case 'sumInt':
        case 'sumFloat':
        case 'dfSumInt':
        case 'dfSumFloat':
            argv = [3];
            break;
        case 'arrayFill':
            argv = [Array.from({
                    length: 10
                })];
            break;
        case 'dfArrayFill':
            // @ts-ignore
            dfArgv = [Array.from({
                    length: 10
                })];
            break;
    }
    return {
        argv,
        dfArgv,
    };
}
// @ts-ignore
describe(_local_dev_1.relative(__filename), () => {
    let currentTest;
    const r = __1.default;
    beforeEach(function () {
        currentTest = this.currentTest;
        //console.log('it:before', currentTest.title);
        //console.log('it:before', currentTest.fullTitle());
    });
    let ks = Object
        .getOwnPropertyNames(Object.getPrototypeOf(__1.default))
        .filter(function (v) {
        return !([
            'constructor',
            'rng',
            'clone',
            'use',
            'newUse',
            'cloneUse',
            'patch',
            'unpatch',
            'next',
            '_memoize',
            'reset',
            '_rng',
            '_cache',
            'seed',
            'seedable',
        ].includes(v) || v.indexOf('_') === 0);
    })
        .reduce(function (a, method) {
        let Argv = getDefaultArgv(method);
        try {
            let ret = __1.default[method](...Argv.argv);
            let t2 = typeof ret;
            switch (t2) {
                case 'function':
                    a.distributions.push(method);
                    break;
                case 'number':
                    if (util_1.isFloat(ret)) {
                        a.float.push(method);
                    }
                    else {
                        a.number.push(method);
                    }
                    break;
                case 'boolean':
                    a.boolean.push(method);
                    break;
                case 'undefined':
                    a.crash.push(method);
                    break;
                case 'string':
                    a.string.push(method);
                    break;
                default:
                    if (Buffer.isBuffer(ret)) {
                        a.buffer.push(method);
                    }
                    else if (Array.isArray(ret)) {
                        a.array.push(method);
                    }
                    else {
                        a.value.push(method);
                    }
                    break;
            }
        }
        catch (e) {
            a.crash.push(method);
        }
        return a;
    }, {
        number: [],
        float: [],
        boolean: [],
        array: [],
        buffer: [],
        string: [],
        value: [],
        distributions: [],
        crash: [],
    });
    Object.keys(ks).forEach(function (cat) {
        describe(`${cat}`, () => {
            ks[cat].forEach(function (method) {
                it(`[${cat}] .${method}()`, () => {
                    let Argv = getDefaultArgv(method);
                    let ret = __1.default[method](...Argv.argv);
                    let type1 = typeof ret;
                    let is_df = method.indexOf('df') === 0;
                    let val;
                    _local_dev_1.expect(cat).not.equal('crash');
                    if (is_df) {
                        _local_dev_1.expect(type1).to.be.eq('function');
                    }
                    if (type1 === 'function') {
                        _local_dev_1.expect(is_df, `${method} ${type1}`).to.be.eq(true);
                    }
                    if (type1 === 'function') {
                        val = ret(...Argv.dfArgv);
                    }
                    else {
                        val = ret;
                    }
                    let type = typeof val;
                    _local_dev_1.expect(type).to.be.not.a('function');
                    _local_dev_1.expect(type).to.be.not.an('undefined');
                    _local_dev_1.expect(val).to.be.not.a('null');
                });
            });
        });
    });
});
