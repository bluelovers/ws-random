Object.defineProperty(exports, "__esModule", { value: true });
/**
 * make easy replace to other ow like lib
 */
//import ow from 'ow-lite-ts'
//import ow = require('ow-lite-ts');
const _chai = require("chai");
//import { Assertion } from 'chai'
//import { expect, assert } from 'chai'
const chai_asserttype_extra_1 = require("chai-asserttype-extra");
const chai = chai_asserttype_extra_1.ChaiPlugin.install(_chai);
const expect = chai.expect;
exports.expect = expect;
exports.default = expect;
// @ts-ignore
Object.freeze(exports);
