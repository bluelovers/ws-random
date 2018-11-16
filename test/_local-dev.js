Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const _chai = require("chai");
// @ts-ignore
//import { expect, assert } from 'chai';
const chai_asserttype_extra_1 = require("chai-asserttype-extra");
//import ChaiPlugin = require('chai-asserttype-extra');
const chai = chai_asserttype_extra_1.default.install(_chai);
exports.chai = chai;
let { expect, assert } = chai;
exports.expect = expect;
exports.assert = assert;
// @ts-ignore
const path = require("path");
exports.path = path;
// @ts-ignore
const util = require("util");
exports.util = util;
// @ts-ignore
exports.rootDir = path.join(__dirname, '..');
function relative(filename) {
    return path.relative(exports.rootDir, filename);
}
exports.relative = relative;
function mochaAsync(fn) {
    return async (done) => {
        try {
            await fn();
            done();
        }
        catch (err) {
            done(err);
        }
    };
}
exports.mochaAsync = mochaAsync;
const self = require("./_local-dev");
exports.default = self;
